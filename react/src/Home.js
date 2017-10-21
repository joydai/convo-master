import React, { Component } from 'react';
import logo from './logo.svg';
import homelogo from './images/home.png'
import button from './images/startbutton.png'
import buttonpressed from './images/startbuttonpressed.png'
import './App.css';
import Upload from './Upload.js'
import Loading from './Loading.js'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className="body">
         <center>
          <h1><img src={homelogo} className="Upload-icon"  alt="homelogo" /></h1>
          
         <h2><Link to ='/upload'> <img src={button} className="button" alt="button" /></Link></h2>
         </center>
 
      </div>
    );
  }
}

export default Home;
