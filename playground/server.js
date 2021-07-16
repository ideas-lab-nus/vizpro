const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const {spawn, exec} = require('child_process');

// app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {    
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/woop', function (req, res) {
    var dataToSend;

    // const process = spawn('C:/Users/vimut/RASE/xyz/xyz-npm/playground/trial.bat')
    const process = spawn('python', Object.keys(req.query).map(key => req.query[key]))

    // exec('start C:/Users/vimut/RASE/xyz/xyz-npm/trial.bat', (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`exec error: ${error}`);
    //       return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    //     res.send(stdout);
    //     console.error(`stderr: ${stderr}`);
    //   });

    // const process = exec('start C:/Users/vimut/RASE/xyz/xyz-npm/trial.bat')
      
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

app.listen(8080);