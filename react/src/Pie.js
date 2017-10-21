import React, { Component } from 'react';
import Plotly from 'plotly.js/dist/plotly-cartesian';

class Pie extends Component {
  componentDidMount() {
    let speakingPercentageData = this.props.speakingPercentageData;
    let data = [];
    let values = [];
    let labels = [];
    for(let i = 0; i < speakingPercentageData.length; i++) {
      values.push(speakingPercentageData[i].value);
      labels.push(speakingPercentageData[i].name);
    }

    data.push({
      values,
      labels,
      type: 'pie'
    })

    //var data = [trace1, trace2, trace3, trace4];
    let layout = {
      height: 400,
      width: 500
    };

    let config = {
      showLink: false,
      displayModeBar: false
    };

    Plotly.newPlot('speaking-percentage', data, layout, config);
  }

  render() {

    return (
      <div id='speaking-percentage'
        ref={(pie) => { this.pieChart = pie; }}>
      </div>
    );
  }
}

export default Pie;
