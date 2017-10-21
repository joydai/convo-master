import React, { Component } from 'react';
import createPlotlyComponent from 'react-plotlyjs';
//See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

class Duration extends Component {
  componentDidMount() {
    console.log('hi');
  }

  render() {
    let data = [];
    for(let i = 0; i <= 4; i++) {
      data.push({
        x: [i], // value
        y: ['Test'],
        text: 'Trace' + i,
        name: 'Trace' + i, // category
        orientation: 'h', // horizontal
        textposition: 'auto',
        hoverinfo: 'none',
        type: 'bar'  
      })
    }



    //var data = [trace1, trace2, trace3, trace4];
    let layout = {
      xaxis: {title: 'Time'},
      showlegend: false,
      barmode: 'relative',
      title: 'Relative Barmode',
      hovermode: 'closest', //  when we click, it'll tell us which trace is clicked
    };

    let config = {
      showLink: false,
      displayModeBar: true
    };

    return (
      <PlotlyComponent className="stacked-duration" data={data} layout={layout} config={config}/>
    );
  }
}

export default Duration;
