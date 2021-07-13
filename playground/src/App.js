import React from 'react';
import { Canvas } from 'viz-vimuth';


async function callBackendPy(args) {
    return await fetch('/woop')
        .then(res => res.text())
        .then(
            (result) => {
                console.log(result)
                return {
                        type: ['text', 'text'],
                        value: [result, "Success"]
                }
            },
            (error) => {
                console.log(error)
                alert(error)
                return {
                    type: ['text', 'text'],
                    value: [null, "Ran into an issue :("]
                };
            }            
        )
}

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
    {
        name: 'Local .py',
        shname: 'loc',
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
        color: '#10C1D7',
        backgroundImage: '',
        func: callBackendPy,
    },
];

// const App = ()  => {    
//     return (
//         <Canvas udo={newComps}/>
//     );
// }

class App extends React.Component {
    render() {
        return (
            <Canvas udo={newComps}/>
        );
    }
}

export default App;