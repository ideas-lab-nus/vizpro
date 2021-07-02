import { selectComp } from './functions.js';
import $ from 'jquery';

var d3 = require('d3');

function calculateCloud(compId) {
    d3.select('div#PleaseWaitOverLay').style('display', 'block');
    var cloudComp = selectComp(compId);
    var functionName = cloudComp.Name;
    var args = cloudComp.inputs.map(input => input.value);
    var url = cloudComp.url;
    console.log(args, url)
    const result = absolute(args, url);

    try {
        cloudComp.outputs.forEach(function (output, i) {
            output.type = result['type'][i];
            output.value = result['value'][i];
            console.log(result);
        });

        d3.select('div#PleaseWaitOverLay').style('display', 'none');
    } catch (error) {
        console.log(error);
        alert(error);
        d3.select('div#PleaseWaitOverLay').style('display', 'none');
    }
}

function absolute(args, url) {
    var log_ = 'Success';
    var queryStr = '';
    for (let i = 1; i <= args.length; i++) {
        queryStr += '&p' + i + '=' + args[i - 1];
    }
    //Replace first  & with  ?
    var urlCall = url + queryStr.replace('&', '?');
    // var data = { parameters: p1 };

    const req = $.ajax({
        type: 'POST',
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

export { calculateCloud };
