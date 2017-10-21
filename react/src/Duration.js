import React, { Component } from 'react';
import createPlotlyComponent from 'react-plotlyjs';
//See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

class Duration extends Component {

  render() {
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

    return (
      <PlotlyComponent className="stacked-duration" data={data} layout={layout} config={config}/>
    );
  }
}

export default Duration;
