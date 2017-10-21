import React, { Component } from 'react';
import Plotly from 'plotly.js/dist/plotly-cartesian';

class Duration extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('willreceive');

    let durationData = nextProps.durationData;
    let data = [];
    for(let i = 0; i < durationData.length; i++) {
      // console.log('duration', durationData[i].end - durationData[i].start);
      data.push({
        x: [durationData[i].end_time - durationData[i].start_time], // value
        y: ['track'],
        text: durationData[i].speaker,
        name: durationData[i].speaker, // category
        orientation: 'h', // horizontal
        // textposition: 'auto',
        // hoverinfo: 'none',
        type: 'bar'  
      })
    }

    this.myPlot.data = data;
    Plotly.redraw(this.myPlot);
  }

  componentWillUpdate() {
    console.log('willupdate');
  }

  componentDidMount() {
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

    Plotly.newPlot('speaking-duration', [], layout, config);
    this.myPlot = this.barChart;
    this.myPlot.on('plotly_click', function(data){
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
