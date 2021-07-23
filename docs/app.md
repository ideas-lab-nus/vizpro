---
layout: page
title: "server"
permalink: /data-viz/app/
---

```js
import React from 'react';
import Canvas from 'data-viz';

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

const comps = [
    {
        name: 'Exponential',
        shname: 'exp',
        desc: 'e raise to the power x',
        type: 'component',
        dftype: 'shlow',
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
        type: 'deep',
        dftype: 'dp',
        inputList: [
            { name: 'num', shortName: 'in_01', desc: 'first input', default_value: '10.0' },
        ],
        outputList: [
            { name: 'output_', shortName: 'out_', desc: 'product' },
        ],
        color: '#F23322',
        backgroundImage: '',
        url: 'https://us-central1-golden-record-313910.cloudfunctions.net/absolute'
    }
];

const App = ()  => {
    return (
        <Canvas udo={comps} />
    );
}

export default App;
```