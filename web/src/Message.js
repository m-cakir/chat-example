import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';


class Message extends Component {

  constructor(props) {
    super(props);

    this.state = {
      from: props.data.from,
      text: props.data.text
    }
  }

  isFromUser() {
    return this.state.from === 'USER';
  }

  render() {
    return (
      <Row className={`${this.isFromUser() ? 'flex-row-reverse align-self-end text-right bg-secondary text-white' : 'bg-light align-self-start text-left'} p-2 m-2`}>
        {this.state.text}
      </Row>
    );
  }
}

export default Message;
