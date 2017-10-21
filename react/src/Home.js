import React, { Component } from 'react';
import logo from './logo.svg';
import homelogo from './images/home.png'
import button from './images/startbutton.png'
import './App.css';
import Upload from './Upload.js'
import Loading from './Loading.js'

class Home extends Component {
  render() {
    return (
      <div className="App">
         <img src={homelogo} className="Upload-icon"  alt="homelogo" />
         <button><img src="./img/google.png" alt="my image" onClick={this.myfunction} /></button>
          <Upload /> 
      </div>
    );
  }
}

export default Home;
