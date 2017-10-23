import React, { Component } from 'react';
import Plotly from 'plotly.js/dist/plotly-cartesian';

class Pie extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('pie componentWillReceiveProps');
    let speakingPercentageData = nextProps.speakingPercentageData;
    let data = [];
    let values = [];
    let labels = [];
    for(let i = 0; i < speakingPercentageData.length; i++) {
      values.push(speakingPercentageData[i].duration);
      labels.push(speakingPercentageData[i].speaker);
    }

    data.push({
      values,
      labels,
      type: 'pie'
    })

    this.myPlot.data = data;
    Plotly.redraw(this.myPlot);
  }

  componentDidMount() {
    //var data = [trace1, trace2, trace3, trace4];
    let layout = {
      height: 550,
      width: 550,
      font: {
        size: 16,
        color: '#fff'
      },
      paper_bgcolor: 'rgba(36,36,36,0)',
      plot_bgcolor: 'rgba(36,36,36,0)'
    };

    let config = {
      showLink: false,
      displayModeBar: false
    };

    Plotly.newPlot('speaking-percentage', [], layout, config);
    this.myPlot = this.pieChart;
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
