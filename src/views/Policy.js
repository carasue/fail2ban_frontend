import React from 'react'
import PolicyStore from '../stores/PolicyStore.js'
import PolicyForm from './PolicyForm.js'
import * as Actions from '../Actions.js'

class Policy extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.onPolicyFormUpdate = this.onPolicyFormUpdate.bind(this);
    this.state = Object.assign({}, PolicyStore.getPolicyValues());
    Actions.get_policy();
  }

  onPolicyFormUpdate(new_req_count, new_req_duration, new_block_duration) {
    Actions.change_policy(new_req_count, new_req_duration, new_block_duration);
    Actions.get_policy();
  }

  componentDidMount() {
    PolicyStore.addChangeListener(this.onChange);
    Actions.get_policy();
  }
  componentDidUpdate() {
    Actions.get_policy();
  }

  componentWillUnmount() {
    PolicyStore.removeChangeListener(this.onChange);
  }

  onChange() {
    const newPolicyValues = Object.assign({}, PolicyStore.getPolicyValues());
    this.setState(newPolicyValues);
  }
  render() {
    return (
      <div>
        <h2>
          Policy
        </h2>
      <div>
          Current Policy: {this.state.req_count} request times 
          in {this.state.req_duration} minutes
          blocked for {this.state.block_duration} minutes
        </div>
        <PolicyForm onUpdate={this.onPolicyFormUpdate} req_count={0} req_duration={0} block_duration={0} />
      </div>
    )
  }
}

export default Policy;
