import React, { Component } from 'react';
import Plotly from 'plotly.js/dist/plotly-cartesian';

class Duration extends Component {
  constructor(props) {
    super(props);
    this.speakerColor = {};
    this.colorIndex = 0;
  }

  pickColor(speaker) {
    let colors = [
      '#1f77b4',  // muted blue
      '#ff7f0e',  // safety orange
      '#2ca02c',  // cooked asparagus green
      '#d62728',  // brick red
      '#9467bd',  // muted purple
      '#8c564b',  // chestnut brown
      '#e377c2',  // raspberry yogurt pink
      '#7f7f7f',  // middle gray
      '#bcbd22',  // curry yellow-green
      '#17becf'   // blue-teal
    ];
    if (!this.speakerColor[speaker]) {
      this.speakerColor[speaker] = colors[this.colorIndex];
      this.colorIndex++;
      if (this.colorIndex > colors.length) {
        this.colorIndex = 0;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('willreceive');
    let durationData = nextProps.durationData;
    let data = [];
    for(let i = 0; i < durationData.length; i++) {
      this.pickColor(durationData[i].speaker);
      data.push({
        x: [durationData[i].end_time - durationData[i].start_time], // value
        y: ['track'],
        legendgroup: durationData[i].speaker,
        text: durationData[i].speaker,
        name: durationData[i].speaker, // category
        orientation: 'h', // horizontal
        marker: {color: this.speakerColor[durationData[i].speaker]},
        // textposition: 'auto',
        // hoverinfo: 'none',
        type: 'bar'
      })
    }

    this.myPlot.data = data;
    Plotly.redraw(this.myPlot);
    console.log(Plotly.d3.color());
  }

  componentWillUpdate() {
    console.log('willupdate');
  }

  componentDidMount() {
    //var data = [trace1, trace2, trace3, trace4];
    let layout = {
      font: {
        size: 16,
        color: '#fff'
      },
      paper_bgcolor: 'rgba(36,36,36,0)',
      plot_bgcolor: 'rgba(36,36,36,0)',
      title: 'Speaking Duration',
      height: 300,
      xaxis: {title: 'Time (s)'},
      yaxis: {showticklabels: false},
      showlegend: false,
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
