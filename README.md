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
Besides using pre-defined components in the package, users can define their own components by passing the following details for that component in form of a dictionary as props:

### Required

- `type` : Allowed type values -> [`component`, `optionList`, `string`, `cloud`]
- `dftype` : Allowed dataflow values -> [`shlow`, `dp`]
- `category` : Allowed categories -> [`Basic`, `BuildSimHub`, `OsiSoft`, `Pandas`, `String Operations`]
- `inputList` : A list of dictionary for each input, each with attributes `name`, `shortName`, `desc`, `default_value`
- `outputList` : A list of dictionary for each output, each with attributes `name`, `shortName`, `desc`, `default_value`
- `name`: Attribute required for each entry in `inputList`, `outputList`

#### Shallow functions (type != `cloud`, dftype = `shlow`)

- `func` : The function that is executed when the component is connected to an input. 

`func` must return a dictionary of the form: 

```
{
  type:  [],
  value: []
}
```

where the length of both lists is the number of outputs in `outputList`. 

The `type` list gives the type of the corresponding entry in the `value` list, and allowed type values are [`text`, `html`, `json`, `list`, `plot`]

#### Cloud functions (type = `cloud`, dftype = `dp`)

- `url` : URL of the cloud function

### Optional

- `name` : Name
- `shname` : Short name
- `desc` : Description
- `color` : Color (in hex)
- `backgroundImage` : URL to the image

### Application

```jsx
    <Canvas  udo={newComps} />
```

where `newComps` is the list of components, each its own dictionary.

Check this example for more details:
In this example, two components called `Exponential` and `Multiply 2` are added to the tool.

In `App.js`:
```js
import React from 'react';
import { Canvas } from 'viz-vimuth';
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

For cloud functions: 
    - Ensure your function is public
    - Handle preflight requests as detailed here;
        https://cloud.google.com/functions/docs/writing/http#functions_http_cors-nodejs
        
Run at root:
1. `npm update && npm run build`
2. `npm run i-all` (This runs `npm install` for both the base and playground)
3. `npm run dev` (This builds the library to `dist` folder and starts the playground)

## Issues to address:

-   Request for cloud function is sync. Make it async and add a `loading` indicator
-   Factor out local title variables into constants file instead of state dictionary
-   Fix components that take a file upload as an input (need to create a new public URL using `URL.createObjectURL()` method)
