import React from 'react'
import BannedIpStore from '../stores/BannedIpStore.js'
import * as Actions from '../Actions.js'

class BannedIpTable extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.state = {bannedIps: new Array()};
    var bannedIps = BannedIpStore.getBannedIps();
    console.log(bannedIps);
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
        <tr key={bannedIp.id}>
          <th> {bannedIp.id} </th>
          <th> {bannedIp.ip} </th>
          <th> {bannedIp.start_t.toDateString()} </th>
          <th> {bannedIp.duration} </th>
      {bannedIp.removed ? 
          <th>yes</th>
        :
          <th>no</th>
      }

      <th>
        <form onSubmit={(e) => this.removeIp(bannedIp.id, e)}>
          <button type="submit">
            remove
          </button>
        </form>
      </th>
        </tr>
      );
    return (
    <table>
      <tbody>
        <tr>
          <th> id </th>
          <th> ip </th>
          <th> start time </th>
          <th> duration(min) </th>
          <th> removed </th>
          <th> remove button </th>
        </tr>
        {bannedIpTable}
      </tbody>
    </table>
    )
  }

}

export default BannedIpTable;
