import React from 'react';
import { Canvas } from 'viz-vimuth';
import { spawn } from 'child_process'
// const {spawn} = require('child_process');

var dataToSend;
const process = spawn('python', ['C:/Users/vimut/RASE/xyz/xyz-npm/example.py'] )

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
});

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function exponential(args) {
    let input = args[0];
    if (!isNumeric(input)) {
        return {
            type: ['text', 'text'],
            value: [null, input + " is not a number"]
        };
    } else {
        return {
            type: ['text', 'text'],
            value: [Math.E ** parseFloat(input), "Success"]
        };
    }
}

const newComps = [
    {
        name: 'Exponential',
        shname: 'exp',
        desc: 'e raise to the power x',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: 'Math',
        inputList: [
            { name: 'input', shortName: 'in_01', desc: 'first input', default_value: '10.0' },
        ],
        outputList: [
            { name: 'output_', shortName: 'out_', desc: 'product' },
            { type: 'float', name: 'log_', shortName: 'log', desc: 'log output' }
        ],
        color: '#F23322',
        backgroundImage: '',
        func: exponential,
    },
    {
        name: 'Cloud - Abs',
        shname: 'abs',
        type: 'cloud',
        dftype: 'dp',
        category: 'Basic',
        subcategory: 'Math',
        inputList: [
            { name: 'num', shortName: 'in_01', desc: 'first input', default_value: '10.0' },
        ],
        outputList: [
            { name: 'output_', shortName: 'out_', desc: 'product' },
        ],
        color: '#F23322',
        backgroundImage: '',
        url: 'https://us-central1-golden-record-313910.cloudfunctions.net/absolute'
    },    
];

const App = ()  => {

    return (
        <Canvas udo={newComps}/>
    );
}

export default App;