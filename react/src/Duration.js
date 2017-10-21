import React, { Component } from 'react';
import Plotly from 'plotly.js/dist/plotly-cartesian';

class Duration extends Component {
  componentDidMount() {
    let durationData = this.props.durationData;
    let data = [];
    for(let i = 0; i < durationData.length; i++) {
      console.log('duration', durationData[i].end - durationData[i].start);
      data.push({
        x: [durationData[i].end - durationData[i].start], // value
        y: ['track'],
        text: durationData[i].name,
        name: 'Trace' + i, // category
        orientation: 'h', // horizontal
        // textposition: 'auto',
        hoverinfo: 'none',
        type: 'bar'  
      })
    }

    //var data = [trace1, trace2, trace3, trace4];
    let layout = {
      title: 'Speaking Duration',
      height: 250,
      xaxis: {title: 'Time'},
      yaxis: {showticklabels: false},
      showlegend: true,
      barmode: 'relative',
      hovermode: 'closest', //  when we click, it'll tell us which trace is clicked
    };

    let config = {
      showLink: false,
      displayModeBar: false,
      scrollZoom: true
    };

    Plotly.newPlot('speaking-duration', data, layout, config);
    let myPlot = this.barChart;
    myPlot.on('plotly_click', function(data){
      console.log('clicked', data);
      alert('You clicked ' + data.points[0].data.name);
    });
  }

  render() {
    return (
      <div id="speaking-duration"
        ref={(bar) => { this.barChart = bar; }}>
      </div>
    );
  }
}

export default Duration;
