import React, { Component } from 'react';
import request from 'request';
import Duration from './Duration.js';
import Pie from './Pie.js';
import './Chart.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      segments: [],
      speakingPercentageData: []
    };
  }

  componentDidMount() {
    request.get('http://0d90dd7e.ngrok.io/api/get_data', (err, res) => {
      // console.log(res.body) // 200
      let parsedBody = JSON.parse(res.body);
      let segments = parsedBody.segments;
      let durations = parsedBody.durations;
      this.setState({segments, speakingPercentageData: durations});
    })
  }

  generateRandomValue() {
    return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  }

  render() {
    // mock data
    // let speakingPercentageData = [];
    // for(let i = 1; i <= 4; i++) {
    //   speakingPercentageData.push({
    //     name: 'Person' + i,
    //     value: i, // value
    //   })
    // };

    // let durationData = [];
    // for(let i = 0; i < 50; i++) {
    //   let start = this.generateRandomValue();
    //   let end = this.generateRandomValue() + start;
    //   // console.log(start, end);
    //   durationData.push({
    //     name: 'Trace' + i,
    //     start, // value
    //     end,
    //   })
    // };
    console.log('segments', this.state.segments);
    return (
      <div className="dashboard">
        <Pie speakingPercentageData={this.state.speakingPercentageData} />
        <Duration durationData={this.state.segments} />
      </div>
    );
  }
}

export default Dashboard;
