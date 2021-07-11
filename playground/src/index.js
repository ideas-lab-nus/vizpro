import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { spawn } from 'child_process'
// const {spawn} = require('child_process').spawn;

// var dataToSend;
// const process = spawn('python', ['C:/Users/vimut/RASE/xyz/xyz-npm/example.py'] )

// process.stdout.on('data', function (data) {
//     dataToSend = data.toString('utf8', 0, data.length);
//     console.log(dataToSend)
//     process.stdin.end();
//     process.stdout.destroy();
//     process.stderr.destroy();
// });

// // in close event we are sure that stream from child process is closed
// process.on('close', (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     console.log(dataToSend)
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
