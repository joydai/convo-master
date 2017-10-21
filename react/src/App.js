import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Duration from './Duration.js';
import request from 'request';

class App extends Component {
  componentDidMount() {
    request.get('http://localhost:5000/api/hello')
    .on('response', function(response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']) // 'image/png'
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Duration />
      </div>
    );
  }
}

export default App;
