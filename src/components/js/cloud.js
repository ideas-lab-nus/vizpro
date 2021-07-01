import { selectComp } from './functions.js';
import $ from 'jquery';

var d3 = require('d3');

function calculateCloud(compId) {
    d3.select('div#PleaseWaitOverLay').style('display', 'block');
    var thisComp = selectComp(compId);
    var functionName = thisComp.Name;
    var args = thisComp.inputs.map(input => input.value);

    const result = mapFunction[functionName](args);

    try {
        thisComp.outputs.forEach(function (output, i) {
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

const mapFunction = {
    Absolute: absolute
};

function absolute(args) {
    var log_ = 'Success';
    var parameters = args[0];
    var url = args[1] + '/there?p1=' + parameters.toString();
    var data = { parameters: parameters.toString() };

    const req = $.ajax({
        type: 'POST',
        dataType: 'json',
        async: false,
        url: url,
        data: JSON.stringify(data),
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
