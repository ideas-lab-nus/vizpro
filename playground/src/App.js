import React from 'react';
import { Canvas } from 'viz-vimuth';

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function exponential(args) {
    let input = args[0];
    console.log(input);
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
            { name: 'input', shortName: 'in_01', desc: 'first input', default_value: '10.0' }
        ],
        outputList: [
            { name: 'output_', shortName: 'out_', desc: 'product' },
            { type: 'float', name: 'log_', shortName: 'log', desc: 'log output' }
        ],
        color: '#F23322',
        backgroundImage: '',
        func: exponential,
    },
];

const App = ()  => {

    return (
        <Canvas udo={newComps}/>
    );
}

export default App;