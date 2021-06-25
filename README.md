# Data Visualization
> A React library that allows users to visualize data

[![NPM](https://img.shields.io/npm/v/viz-vimuth.svg)](https://www.npmjs.com/package/viz-vimuth)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save viz-vimuth
```

## Usage

In `App.js`:
```jsx
import React, { Component } from 'react'

import { Canvas } from 'viz-vimuth';

function App() {
  return (
    <Canvas />
  );
}
```
Besides using pre-defined components in the package, users can defined their own components by providing the following details for that component in form of a dictionary:
- Name
- Short name
- Description (optional)
- Type: must be either `component`, `optionList` or `string`.
- Dataflow type: must be either `shlow`(shallow) or `dp`(deep).
- Category: must be either `Basic`, `BuildSimHub`, `OsiSoft`, `Pandas` or `String Operations`.
- Input list: a list a list of dictionary, "name" attribute is compulsory, other attributes such as short name, description, input type and default value are optional.
- Output list: a list of dictionary. "name" attribute is compulsory, other attributes such as short name and description are optional).
- Color (in hex value)
- icon image (optional): the URL to the image
- function: a function that is executed when the component is connected to an input. A function must return a dictionary that has 2 keys: `type` and `value`. The corresponding value of `type` is a list containing the return type of all the outputs. The return type must be either `text`, `html`, `json`, `list` or `plot`. The corresponding value of `value` is a list containing the value that will be displayed of all the outputs. The size of both lists must be the same as the size of the `output list`.

The details for all components must be put inside a single list (called `comps`).
Finally, call the `Canvas` component with `{udo: comps}` as props

Check this example for more details:
In this example, two component called `Exponential` and `Product 2` will be added to the list of components.

In `App.js`:
```js
import React from 'react';
import { Canvas } from 'viz-vimuth';
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function exponential(args) {
    console.log("inside exponential");
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

function multiply2(args) {
    var log = 'Success!';
    var arg0 = parseFloat(args[0]);
    var arg1 = parseFloat(args[1]);
    var output;
    if (!isNumeric(arg0) || !isNumeric(arg1)) {
        log = arg0 + ' or ' + arg1 + ' is not numeric';
        output = null;
    }
    output = operator(arg0, arg1);
    return {
        type: ['text', 'text'],
        value: [output, log]
    };
}

const comps = [
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
    {
        name: 'Multiply 2',
        shname: 'Multiply',
        desc: 'Multiply 2 numbers',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: 'Math',
        inputList: [
            { name: 'in_01', shortName: 'in_01', desc: 'first input', default_value: '10.0' },
            { name: 'in_02', shortName: 'in_02', desc: 'second input', default_value: '5.0' }
        ],
        outputList: [
            { name: 'output_', shortName: 'out_', desc: 'product' },
            { type: 'float', name: 'log_', shortName: 'log', desc: 'log output' }
        ],
        color: '#F23322',
        backgroundImage: ''
    },
];

const App = ()  => {
    return (
        <Canvas udo={comps} />
    );
}

export default App;

```

## Development and Testing:

`playground` is an internal cra that should be used to test this React Component Library that
currently exports the component `Canvas`

Run at root:
1. `npm update && npm run build`
2. `npm run i-all` (This runs `npm install` for both the base and playground)
3. `npm run dev` (This builds the library to `dist` folder and starts the playground)

## Issues to address:

-   Call to cloud function url is blocked by CORS issue. Temp workaround -> Install Chrome CORS extension
-   Request for cloud function is sync. Make it async and add a `loading` indicator
-   File Upload feature
-   Factor out local title variables into constants file instead of state dictionary

## To note:

-   All the information about the components is stored in `componentDetail.js` file.
-   All the hardcoded generic components are handled using `addGenericComponentIcon` in `leftPropertyBar.js` file.
