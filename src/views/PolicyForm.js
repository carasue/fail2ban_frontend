import PolicyStore from '../stores/PolicyStore.js'
import React from 'react'

class PolicyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({},PolicyStore.getPolicyValues());
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.props.onUpdate(this.state.req_count, this.state.req_duration, this.state.block_duration)
    event.preventDefault();
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
          <label>
            Request Times:
            <input name="req_count" type="number" value={this.state.req_count} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            Request Duration:
            <input name="req_duration" type="number" value={this.state.req_duration} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            Blocked Duration:
            <input name="block_duration" type="number" value={this.state.block_duration} onChange={this.handleChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default PolicyForm
