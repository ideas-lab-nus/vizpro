---
layout: page
title: "server"
permalink: /data-viz/server/
---

```js
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const {spawn, exec} = require('child_process');

// app.use(express.static(path.join(__dirname, 'build')));

// Important for CORS configuration
app.use((req, res, next) => {    
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

// Testing route
app.get('/ping', function (req, res) {
    return res.send('pong');
});

// Route to run python files
app.get('/python', function (req, res) {
    var dataToSend;

    // The parameters received are mapped to an array
    const process = spawn('python', Object.keys(req.query).map(key => req.query[key]))
      
    process.stdout.on('data', function (data) {
        dataToSend = data.toString('utf8', 0, data.length);
        console.log(dataToSend)
        process.stdin.end();
        process.stdout.destroy();
        process.stderr.destroy();
    });
    
    process.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend)
    });

    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Route to run bat files
app.get('/bat', function (req, res) {
    var dataToSend;

    // exec('start {fullPath}/foo.bat', (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`exec error: ${error}`);
    //       return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    //     res.send(stdout);
    //     console.error(`stderr: ${stderr}`);
    //   });

    // Pass full path of bat file as parameter
    const process = exec('start {fullPath}/foo.bat')
      
    process.stdout.on('data', function (data) {
        dataToSend = data.toString('utf8', 0, data.length);
        console.log(dataToSend)
        process.stdin.end();
        process.stdout.destroy();
        process.stderr.destroy();
    });
    
    process.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend)
    });
});

// Route to run R scripts
app.get('/r', function (req, res) {
    var dataToSend;

    // Path to Rscript.exe
    const rPath = "C:/Program Files/R/R-4.1.0/bin/Rscript.exe";

    // Pass file path of R script via component
    const process = spawn(rPath, ["{fullPath}sampleR.txt"])

    process.stdout.on('data', function (data) {
        dataToSend = data.toString('utf8', 0, data.length);
        console.log(dataToSend)
        process.stdin.end();
        process.stdout.destroy();
        process.stderr.destroy();
    });
    
    process.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        console.log(dataToSend)
        res.send(dataToSend)
    });
});

app.listen(8080);
```