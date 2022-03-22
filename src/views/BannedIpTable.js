import React from 'react'
import BannedIpStore from '../stores/BannedIpStore.js'
import * as Actions from '../Actions.js'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class BannedIpTable extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.state = {bannedIps: new Array()};
    var bannedIps = BannedIpStore.getBannedIps();
    Actions.get_blacklist();
    for(let i=0; i<bannedIps.length; i++) {
      var bannedIp = Object.assign({}, bannedIps[i]);
      this.state.bannedIps.push(bannedIp);
    }
  }

  onChange() {
    const newBannedIps = Object.assign({}, BannedIpStore.getBannedIps());
    console.log(newBannedIps);
    this.setState(newBannedIps);
  }

  componentDidMount() {
    BannedIpStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    BannedIpStore.removeChangeListener(this.onChange);
  }


  removeIp(id, event) {
    Actions.remove_ip(id);
    event.preventDefault();
  }

  render() {
    const bannedIpTable = this.state.bannedIps.map((bannedIp) =>
      <tbody>
        <tr key={bannedIp.id}>
          <td> {bannedIp.id} </td>
          <td> {bannedIp.ip} </td>
          <td> {bannedIp.start_t.toDateString()} </td>
          <td> {bannedIp.duration} </td>
      {bannedIp.removed ? 
          <td>yes</td>
        :
          <td>no</td>
      }

      <td>
        <Form onSubmit={(e) => this.removeIp(bannedIp.id, e)}>
          <Button type="submit">
            remove
          </Button>
        </Form>
      </td>
        </tr>
    </tbody>
      );
    return (
      <div>
        <h2>
          Blacklist
        </h2>
        <Table striped borderless hover size="sm">
          <thead>
            <tr>
              <th> id </th>
              <th> ip </th>
              <th> start time </th>
              <th> duration(min) </th>
              <th> removed </th>
              <th> remove button </th>
            </tr>
          </thead>
            {bannedIpTable}
        </Table>
    </div>
    )
  }

}

export default BannedIpTable;
