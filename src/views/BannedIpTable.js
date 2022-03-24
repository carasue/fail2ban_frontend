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
    this.removeIp = this.removeIp.bind(this);
    this.state = {'bannedIps': []};
    }

  onChange() {
    // #TO_ENHANCE: this will cause a fully change of the blacklist, 
    // if you want a smooth delete animation, 
    // you should compare and somewhat only delete that one,
    // I do not how to implement that using the setState yet.
    const blacklist = Object.assign({}, BannedIpStore.getBannedIps());
    const newBannedIps = new Array();
    for (let id in blacklist) {
      newBannedIps.push(blacklist[id]);
    }
    Actions.get_blacklist();
    this.setState({'bannedIps': newBannedIps});
  }

  componentDidMount() {
    BannedIpStore.addChangeListener(this.onChange);
    Actions.get_blacklist();
  }

 componentDidUpdate() {
    BannedIpStore.addChangeListener(this.onChange);
    Actions.get_blacklist();
  }

  componentWillUnmount() {
    BannedIpStore.removeChangeListener(this.onChange);
  }


  removeIp(ip, e) {
    Actions.remove_ip(ip);
    e.preventDefault();
  }

  render() {
    const bannedIpTable = this.state.bannedIps.map((bannedIp) =>
        <tr key={bannedIp.source}>
          <td> {bannedIp.source} </td>
          <td> {new Date(bannedIp.timestamp).toDateString()} </td>
          <td> {bannedIp.duration/60000000000} </td>
          <td>
            <Form onSubmit={(e) => this.removeIp(bannedIp.source, e)}>
                <Button type="submit">
                  remove
                </Button>
            </Form>
          </td>
        </tr>
      );
    return (
      <div>
        <h2>
          Blacklist
        </h2>
        <Table striped borderless hover size="sm">
          <thead>
            <tr key={0}>
              <th> ip </th>
              <th> start time </th>
              <th> duration(min) </th>
              <th> action </th>
            </tr>
          </thead>
          <tbody>
            {bannedIpTable}
          </tbody>
        </Table>
    </div>
    )
  }

}

export default BannedIpTable;
