import { 
    selectComp,
    componentStatus,
    updatShallowCompRender,
    redrawDependents
} from './functions.js';

var d3 = require('d3');
var deepComp;
var ch;
var element;

async function calculateDeep(comp, chx, elementx) {
    ch = chx;
    element = elementx;
    deepComp = selectComp(comp.GUID);
    var args = deepComp.inputs.map(input => input.value);
    var url = deepComp.url;

    d3.select('rect#statusRect' + comp.GUID).attr('fill', '#aa0000')
    d3.select('text#statusText' + comp.GUID).attr('fill', '#ffffff').text('Fetching...')

    await handleRequest(args, url);

    d3.select('rect#statusRect' + comp.GUID).attr('fill', '#02521b')
    d3.select('text#statusText' + comp.GUID).attr('fill', '#6cff13').text('Active')
}

function handleRequest(args, url) {
    var queryStr = '';
    for (let i = 1; i <= args.length; i++) {
        queryStr += '&p' + i + '=' + args[i - 1];
    }
    //Replace first  & with  ?
    var urlCall = url + queryStr.replace('&', '?');
    var result = fetch(urlCall)
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
                    value: [null, error]
                };
            }            
        )
        .then(result => setOutputs(result))
    return result
}

function setOutputs(result) {
    try {
        deepComp.outputs.forEach(function (output, i) {
            output.type = result['type'][i];
            output.value = result['value'][i];
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }

    ch.inputs[element[2]].value = deepComp.outputs[element[0]].value;
    ch.inputs[element[2]].type = deepComp.outputs[element[0]].type;

    componentStatus(deepComp.GUID, 'green');
    updatShallowCompRender(ch);
    redrawDependents(ch.GUID);
}

export { calculateDeep };
