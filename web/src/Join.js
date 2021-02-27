import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';


class Join extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="App-body d-flex align-items-center flex-fill vh-100">
        <Container>
          <h1 className="text-center">Chat App</h1>
          <br/>
          <br/>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="fbUsername">
              <Form.Control type="text" placeholder="Username" ref={node => (this.inputUsername = node)}/>
            </Form.Group>
            <Button block={true} variant="primary" type="submit">Join</Button>
          </Form>
        </Container>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handler(this.inputUsername.value);
  }
}

export default Join;
