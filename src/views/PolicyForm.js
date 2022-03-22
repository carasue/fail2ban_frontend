import PolicyStore from '../stores/PolicyStore.js'
import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


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
        <Form onSubmit={this.handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Request Times:</Form.Label>
              <Form.Control size="sm" name="req_count" type="number" value={this.state.req_count} onChange={this.handleChange} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Request Duration:</Form.Label>
              <Form.Control size="sm" name="req_duration" type="number" value={this.state.req_duration} onChange={this.handleChange} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Blocked Duration:</Form.Label>
              <Form.Control size="sm" name="block_duration" type="number" value={this.state.block_duration} onChange={this.handleChange} />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default PolicyForm
