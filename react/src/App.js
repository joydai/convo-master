import React, { Component } from 'react';
import Dashboard from './Dashboard.js';
import Home from './Home.js';
import Upload from './Upload.js';
import Loading from './Loading.js';
import { Route, Switch } from 'react-router'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/upload" component={Upload}/>
        <Route exact path="/loading" component={Loading}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    );
  }
}

export default App;
