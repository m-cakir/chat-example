import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Message from './Message';
import io from "socket.io-client";

class Chat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: props.username,
      messages: []
      // messages: Array.from({ length: 5 }).reverse().map((e, i) => {
      //   return {
      //     id: 1000 + (5-i),
      //     from: ['USER', 'FRIEND'][Math.floor(Math.random() * 2)],
      //     text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      //   }
      // })
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  componentDidMount() {
    this.state.socket = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
      withCredentials: true
    });
    // this.state.socket.on('connect', () => console.log('connected'));
    this.state.socket.on('onMessage', this.showMessage);
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  render() {
    return (
      <div className="d-flex flex-column vh-100 ">
        <Container className="d-flex overflow-auto flex-column-reverse flex-column flex-fill p-2 bg-white text-dark">
          {this.state.messages.map((message, i) => {
            return (
              <Message key={message.id} data={message}></Message>
            )
          })}
        </Container>
        <Container className="pt-3">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="fcMessage">
              <Col xs={10}>
                <Form.Control type="text" placeholder="Type..." ref={node => (this.inputMessage = node)} />
              </Col>
              <Col xs={2} className="pl-0">
                <Button block={true} type="submit">&gt;</Button>
              </Col>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    this.state.socket.emit('onMessage', {
      text: this.inputMessage.value,
      username: this.state.username
    });

    this.inputMessage.value = '';
  }

  showMessage(message) {
    this.setState((state) => ({
      messages: [
        {
          ...message,
          from: message.username === state.username ? 'USER' : 'FRIEND'
        },
        ...state.messages
      ]
    }));
  }
}

export default Chat;
