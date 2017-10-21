import React, { Component } from 'react';
import Dashboard from './Dashboard.js';
import Home from './Home.js';
// import './App.css';
// import Duration from './Duration.js';
// import Pie from './Pie.js';
// import request from 'request';
import { Route, Switch } from 'react-router'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    );
  }
}

export default App;
