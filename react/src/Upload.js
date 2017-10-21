import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import uploadicon from './images/uploadicon.png';
// import request from 'request';
import request from 'superagent';

class Upload extends Component {
  constructor() {
    super()
    this.state = {
      accept: '',
      files: [],
      dropzoneActive: false
    }
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    console.log('GOT', files);
    // let file = files[0];
    // let formData = {
    //   my_file: file
    // };
    // request.post({url: 'http://0d90dd7e.ngrok.io/api/submit_audio', formData}, (err, res) => {
    // });
    const req = request.post('http://0d90dd7e.ngrok.io/api/submit_audio');
    files.forEach(file => {
        req.attach(file.name, file);
    });
    req.end(() => {
      console.log('DONE');
    });
    //change to Loading page
    // do stuff with files...
    this.setState({
      files,
      dropzoneActive: false
    });
  }

  applyMimeTypes(event) {
    this.setState({
      accept: ".mp3"
    });
  }

  render() {
    const { accept, files, dropzoneActive } = this.state;
    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff'
    };
    return (
      <Dropzone
        disableClick
        style={{position: "relative"}}
        accept={accept}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }
        <div>
          <h2><img src={uploadicon} className="Upload-icon" height='500' width='500' alt="uploadicon" /></h2>

          <h2>Dropped files</h2>
          <ul>
            {
              files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>

        </div>
      </Dropzone>
    



    );
  }
}



export default Upload;
