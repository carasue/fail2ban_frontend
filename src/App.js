import logo from './logo.svg';
import './App.css';
import React from 'react'
import Policy from './views/Policy.js'
import BannedIpTable from './views/BannedIpTable.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a class="App-logo" href="https://fontmeme.com/add-borders/"><img src="https://fontmeme.com/permalink/220321/d404677e571fc4deeae19a7c2199fba3.png"/></a>
        <BannedIpTable/>
        <Policy/>
      </header>

   </div>
  );
}

/*
class Policy extends React.Component {
  constructor(props) {
    super(props);
    this.onPolicyFormUpdate = this.onPolicyFormUpdate.bind(this);
    this.state = {
      req_count: props.req_count,
      req_duration: props.req_duration,
      block_duration: props.block_duration,
    };
  }

  onPolicyFormUpdate(new_req_count, new_req_duration, new_block_duration) {
    this.setState({
      req_count: new_req_count,
      req_duration: new_req_duration,
      block_duration: new_block_duration,
    });
    // #TODO: update on the server
  }

  render() {
    return (
      <div>
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


Policy.defaultProps = {
  req_count: 0,
  req_duration: 0,
   block_duration: 0,
};
  
class PolicyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      req_count: props.req_count,
      req_duration: props.req_duration,
      block_duration: props.block_duration,
    };

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
    alert('A policy was submitted: ' 
      + this.state.req_count + " request times in "
      + this.state.req_duration + " minutes and blocked for "
      + this.state.block_duration + " minutes"
    );
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

*/


export default App;
