import { 
    selectComp,
    componentStatus,
    updatShallowCompRender,
    redrawDependents
} from './functions.js';
import $ from 'jquery';

var d3 = require('d3');
var cloudComp;
var ch;;
var element;

async function calculateCloud(comp, chx, elementx) {
    ch = chx;
    element = elementx;
    d3.select('div#PleaseWaitOverLay').style('display', 'block');
    cloudComp = selectComp(comp.GUID);
    var functionName = cloudComp.Name;
    var args = cloudComp.inputs.map(input => input.value);
    var url = cloudComp.url;
    console.log(args, url)

    d3.select('rect#statusRect' + comp.GUID).attr('fill', '#aa0000')
    // cloudComp.state = 'Fetching...'
    d3.select('text#statusText' + comp.GUID).attr('fill', '#ffffff').text('Fetching...')
    // const result = await callBackendPy(args, url);
    await callBackendPy(args, url);
    d3.select('rect#statusRect' + comp.GUID).attr('fill', '#02521b')
    // cloudComp.state = 'Active'
    d3.select('text#statusText' + comp.GUID).attr('fill', '#6cff13').text('Active')
    // const result = absolute(args, url);

    // try {
    //     cloudComp.outputs.forEach(function (output, i) {
    //         output.type = result['type'][i];
    //         output.value = result['value'][i];
    //         console.log(result);
    //     });
    //     return "niceeeee"
    //     d3.select('div#PleaseWaitOverLay').style('display', 'block');
    // } catch (error) {
    //     console.log(error);
    //     alert(error);
    //     return "wahh"
    //     d3.select('div#PleaseWaitOverLay').style('display', 'none');
    // }
}

function absolute(args, url) {
    var log_ = 'Success';
    var queryStr = '';
    for (let i = 1; i <= args.length; i++) {
        queryStr += '&p' + i + '=' + args[i - 1];
    }
    //Replace first  & with  ?
    var urlCall = url + queryStr.replace('&', '?');

    const req = $.ajax({
        type: 'GET',
        dataType: 'json',
        async: false,
        url: urlCall,
        // data: JSON.stringify(data),
        // "headers": headers,
        beforeSend: function (xhr, settings) {}
    });

    console.log(req, req.responseText);
    return {
        type: ['text', 'text'],
        value: [req.responseText, log_]
    };
}

function callBackendPy(args, url) {
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
                    value: [null, "Ran into an issue :("]
                };
            }            
        )
        .then(
            (result) => {
                try {
                    cloudComp.outputs.forEach(function (output, i) {
                        output.type = result['type'][i];
                        output.value = result['value'][i];
                        console.log(result);
                    });
                } catch (error) {
                    console.log(error);
                    alert(error);
                }

                ch.inputs[element[2]].value = cloudComp.outputs[element[0]].value;
                ch.inputs[element[2]].type = cloudComp.outputs[element[0]].type;

                componentStatus(cloudComp.GUID, 'green');
                updatShallowCompRender(ch);
                redrawDependents(ch.GUID);

            }
        )
    console.log("whyyyy")
    return result
}

export { calculateCloud };
