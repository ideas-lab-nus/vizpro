const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const {spawn, exec} = require('child_process');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
    var dataToSend;
    // spawn new child process to call the python script
    // const process = spawn('"C:/Users/vimut/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/System Tools/Command Prompt.lnk"', ['./trial.bat']);
    // const process = spawn('cmd', ['trial.bat']);
    const process = spawn('python', ['C:/Users/vimut/RASE/xyz/xyz-npm/example.py'] )
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

    // process.stdout.on('data', function(data) {
    //   console.log(data)
    // })
      
    // collect data from script
    process.stdout.on('data', function (data) {
        dataToSend = data.toString('utf8', 0, data.length);
        console.log(dataToSend)
        process.stdin.end();
        process.stdout.destroy();
        process.stderr.destroy();
    });
    
    // in close event we are sure that stream from child process is closed
    process.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        console.log(dataToSend)
        // send data to browser
        res.send(dataToSend)
    });

    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);