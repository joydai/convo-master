import React, { Component } from 'react';
import createPlotlyComponent from 'react-plotlyjs';
//See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

class Pie extends Component {

  render() {
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

    return (
      <PlotlyComponent className="pie-data" data={data} layout={layout} config={config}/>
    );
  }
}

export default Pie;
