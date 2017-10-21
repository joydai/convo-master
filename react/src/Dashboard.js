import React, { Component } from 'react';
import request from 'request';
import Duration from './Duration.js';
import Pie from './Pie.js';

class Dashboard extends Component {
  generateRandomValue() {
    return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  }

  componentDidMount() {
    request.get('http://0f059779.ngrok.io/api/hello')
    .on('response', function(response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']) // 'image/png'
    })
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
      <div className="dashboard">
        <Pie speakingPercentageData={speakingPercentageData} />
        <Duration durationData={durationData} />
      </div>
    );
  }
}

export default Dashboard;
