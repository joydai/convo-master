import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Duration from './Duration.js';
import Pie from './Pie.js';
import request from 'request';

class App extends Component {
  componentDidMount() {
    request.get('http://0f059779.ngrok.io/api/hello')
    .on('response', function(response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']) // 'image/png'
    })
  }

  generateRandomValue() {
    return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  }

  render() {
    // mock data
    let speakingPercentageData = [];
    for(let i = 1; i <= 4; i++) {
      speakingPercentageData.push({
        name: 'Person' + i,
        value: i, // value
      })
    };

    let durationData = [];
    for(let i = 0; i < 50; i++) {
      let start = this.generateRandomValue();
      let end = this.generateRandomValue() + start;
      console.log(start, end);
      durationData.push({
        name: 'Trace' + i,
        start, // value
        end,
      })
    };


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Pie speakingPercentageData={speakingPercentageData} />
        <Duration durationData={durationData} />
      </div>
    );
  }
}

export default App;
