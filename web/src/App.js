import React, { Component } from 'react';
import Join from './Join';
import Chat from './Chat';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: undefined
    }

    this.handler = this.handler.bind(this);
  }

  render() {
    return (
      <div className="app">
        {
          this.state.username ? <Chat username={this.state.username} /> : <Join handler={this.handler} />
        }
      </div>
    );
  }

  handler(username) {
    this.setState({
      username: username
    });
  }
}

export default App;
