/*
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████──██████─██████████████─██████─────────██████─────────██████████████─██████──────────██████─
─██░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░░░██─██░░██─────────██░░██─────────██░░░░░░░░░░██─██░░██──────────██░░██─
─██░░██████████─██░░██──██░░██─██░░██████░░██─██░░██─────────██░░██─────────██░░██████░░██─██░░██──────────██░░██─
─██░░██─────────██░░██──██░░██─██░░██──██░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──────────██░░██─
─██░░██████████─██░░██████░░██─██░░██████░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──██████──██░░██─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──██░░██──██░░██─
─██████████░░██─██░░██████░░██─██░░██████░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──██░░██──██░░██─
─────────██░░██─██░░██──██░░██─██░░██──██░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██████░░██████░░██─
─██████████░░██─██░░██──██░░██─██░░██──██░░██─██░░██████████─██░░██████████─██░░██████░░██─██░░░░░░░░░░░░░░░░░░██─
─██░░░░░░░░░░██─██░░██──██░░██─██░░██──██░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██████░░██████░░██─
─██████████████─██████──██████─██████──██████─██████████████─██████████████─██████████████─██████──██████──██████─
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
*/

/**
 * Summary. (use period)
 *
 * This file is used to define functions for the basic components that are JavaScript based, and run on the front-end.
 *
 * @link   URL
 * @file   This files defines the MyClass class.
 * @author Adrian Chong, Mahmoud AbdelRahman,
 * @since  x.x.x
 */

import $ from 'jquery';
import { uuidv4 } from './handle.js';
import { objToHtmlTable, selectComp } from './functions.js';

var shallow_functions = {
    //Basics
    // Arithmetic functions
    Average: average,
    Add: add,
    Multiply: multiply,
    'Add 2': add2,
    'Multiply 2': multiply2,
    'divide 2': divide2,
    'Difference 2': subtract2,
    'power 2': exponent2,
    '&&': and,
    '||': or,
    '==': equal,
    '>': greater,
    '<': less,
    //'Exponential': exponential,
    // String operations
    Split: split,
    Join: join,
    Includes: includes,
    Replace: replace,
    'String to Json': str2Json,
    // List
    String_to_List: str2lst,
    Max: max,
    Min: min,
    // Json objects
    'Json Navigator': jsonNavigator,
    // Plotting
    'Plot Panel': plot_panel_comp,

    // 3D viewer
    'Draw 3d Model': draw3dModel,

    // OSI Soft
    'OSI Extract TimeSeries Data': osiExtractTimeSeriesData,
    '3dVisualizer': draw3dObject,
    'Image Display': imDisplay,
    'YouTube Display': youTubeDisplay
};

/**
 * Function to check if numeric or string input is a valid number after parsing
 * @return {boolean} True if n is a valid number and False otherwise
 */
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * @return {boolean} True if n is boolean and False otherwise
 */
function isBoolean(n) {
    return typeof n === 'boolean';
}

/**
 * @return {JSON} if param n is a valid Javascript object
 */
function parseString(n) {
    try {
        if (typeof n === 'string' || n instanceof String) {
            n = JSON.parse(n);
        }
        return n;
    } catch (error) {
        console.log(error);
    }
}

/*
 * Preconditions to check that args is an array and array.length is not
 * less than number of inputs n
 */
function inputPreconditions(args, n) {
    // args = parseString(args); // args is always a normal list
    if (!(args instanceof Array)) {
        throw new TypeError('args must be an array ');
    }
}

/*
ARITHMETIC OPERATORS
*/
// dictionary to store basic math operators
var operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => a ** b,
    '&&': (a, b) => a && b,
    '||': (a, b) => a || b,
    '==': (a, b) => a === b,
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    split: (a, b) => a.split(b),
    join: (a, b) => a.concat(b),
    includes: (a, b) => a.includes(b)
};

/**
 * @param {array} args - An array of inputs to an object where
 *                 args[0] is an array of floats/string
 * @param {function} operator - Mathematical operator to apply to array
 * @return {float} the result of applying operator to the array args
 */
function accumulator(args, operator) {
    args = parseString(args); // --> this line is not needed as agrs will always be a list from the backend
    // preconditions
    // Assume args[0] is the input of interest and only args[0] is used
    inputPreconditions(args, 1);
    // args = parseString(args); ---> args is always a normal list, no need to validate it.

    // initialize variables
    var InputList = parseString(args[0]); // I would prefer to name it as the component name.
    var output = null;
    var log = 'Success!';
    var n;
    var i;

    for (i = 0; i < InputList.length; i++) {
        console.log(InputList[i]);
        n = parseFloat(InputList[i]); // convert string to float
        if (!isNumeric(n)) {
            log = n + ' is not numeric';
            return {
                type: ['text', 'text'],
                value: [null, log]
            };
        }
        if (i > 0) {
            output = operator(output, n);
            console.log(output);
        } else {
            output = n;
        }
    }
    return {
        type: ['text', 'text'],
        value: [output, log]
    };
}

/**
 * Mathematical operation between two numbers.
 * @param {array} args - An array of inputs to an object where
 *                 args[0] and args[1] are numbers
 * @param {function} operator - Mathematical operator to apply in the form
 *                           args[0] (operator) args[1]
 * @return {float} the result of applying operator
 */

function mathOperator(args, operator) {
    // preconditions
    // assumes args[0] and args[1] are accesible and are numeric
    inputPreconditions(args, 2);
    // args = parseString(args);

    // initialize variables
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

// TODO: test functions add/subtract/multiply/average
// TODO: include docstrings for functions add/subtract/multiply/average
/**
 * @return sum of all numbers in an Array
 */
function add(args) {
    return accumulator(args, operations['+']);
}

/**
 * @return product of all numbers in an Array
 */
function multiply(args) {
    return accumulator(args, operations['*']);
}

/**
 * @return args[0] + args[1]
 */
function add2(args) {
    return mathOperator(args, operations['+']);
}

/**
 * @return args[0] - args[1]
 */
function subtract2(args) {
    return mathOperator(args, operations['-']);
}

/**
 * @return args[0] * args[1]
 */
function multiply2(args) {
    return mathOperator(args, operations['*']);
}

/**
 * @return args[0] / args[1]
 */
function divide2(args) {
    return mathOperator(args, operations['/']);
}

/**
 * @return args[0] ** args[1]
 */
function exponent2(args) {
    return mathOperator(args, operations['^']);
}

function numericalListValidator(inputList) {
    for (let i = 0; i < inputList.length; i++) {
        var n = inputList[i];
        if (typeof n === 'string' || n instanceof String) {
            console.log('Someproblem here');
            inputList[i] = parseFloat(n);
        }
    }
    return inputList;
}

function sum(inputList) {
    inputList = parseString(inputList);
    inputList = numericalListValidator(inputList);
    var sum = 0;

    for (let i = 0; i < inputList.length; i++) {
        sum += inputList[i];
    }
    return sum;
}

function average(args) {
    var inputList = args[0];
    var average_output = null;
    var log_output = 'Success';
    try {
        //Validation:
        inputList = parseString(inputList);
        inputList = numericalListValidator(inputList);
        average_output = sum(inputList) / inputList.length;
    } catch (error) {
        log_output = error;
        average_output = null;
    }
    return {
        type: ['text', 'text'],
        value: [average_output, log_output]
    };
}

/*
LOGICAL and COMPARISON OPERATORS
*/

/**
 * @param {array} args - An array of inputs to an object where
 *                 args[0] and args[1] are inputs
 * @param {function} operator - logical/comparison operator to apply in the form
 *                           args[0] (operator) args[1]
 * @return {boolean} the result of applying operator
 */

function logCompareOperator(args, operator) {
    // preconditions
    // assumes args[0] and args[1] are accesible and are numeric
    inputPreconditions(args, 2);
    args = parseString(args);

    // initialize variables
    var log = 'Success!';
    var arg0 = parseString(args[0]);
    var arg1 = parseString(args[1]);
    var output = operator(arg0, arg1);
    if (!isBoolean(output)) {
        log = output + ' is not boolean';
        output = null;
    }
    return {
        type: ['text', 'text'],
        value: [output, log]
    };
}

/*
 * logical AND with short circuit
 * @return args[0] && args[0]
 */
function and(args) {
    return logCompareOperator(args, operations['&&']);
}

/*
 * logical OR with short circuit
 * @return args[0] && args[0]
 */
function or(args) {
    return logCompareOperator(args, operations['||']);
}

/*
COMPARISON OPERATORS
*/
// TODO: docstrings
function equal(args) {
    return logCompareOperator(args, operations['==']);
}

function greater(args) {
    return logCompareOperator(args, operations['>']);
}

function less(args) {
    return logCompareOperator(args, operations['<']);
}

/*
String functions
*/

/**
 * @param {array} args - An array of inputs to an object where
 * @return  {array} an array containing the split values
 */
function strOperator(args, operator) {
    args = parseString(args);
    // initialize variables
    var log = 'Success!';
    var arg0 = String(args[0]);
    var arg1 = String(args[1]);
    var output;
    try {
        output = operator(arg0, arg1);
    } catch (error) {
        output = NaN;
        log = error;
    }
    return {
        type: ['text', 'text'],
        value: [output, log]
    };
}

/**
 * @param {array} args - An array of inputs to an object where
 *                 args[0] is the string and args[1] is the dilimter
 * @return  {array} an array containing the split values
 */
function split(args) {
    return strOperator(args, operations['split']);
}

/**
 * @return  {String} A new String containing the text of the combined strings
 */
function join(args) {
    return strOperator(args, operations['join']);
}

/**
 * @return {boolean} true if the string contains the value,
 *                    otherwise it returns false
 */
function includes(args) {
    return strOperator(args, operations['includes']);
}

/**
 * @param {array} args - An array of inputs to an object where
 * @return {array} A new String, where the specified value(s)
 *               has been replaced by the new value
 */
function replace(args) {
    // initialize variables
    // inputs 3
    var main_text = String(args[0]);
    var old_string = String(args[1]);
    var new_string = String(args[2]);

    // outputs 3
    var help_ = `
    <div id="help_t3">about: </div>
    <div id="help_p">This component replaces all the occurences of a specific string in a text with newer one</div>

        <div id="help_t3">Inputs: </div>

            <div id="help_t4">main_text</div>
            <div id="help_p">The text body</div>

            <div id="help_t4">old_string</div>
            <div id="help_p">String to be replaced</div>

            <div id="help_t4">new_string</div>
            <div id="help_p">String to replace the old string</div>
    `;
    var new_text = null;
    var log = 'Success!';

    try {
        new_text = main_text.split(old_string).join(new_string); // This process replaces all the occurences of the old string in the text.
    } catch (error) {
        new_text = null;
        log = error;
    }
    return {
        type: ['html', 'text', 'text'],
        value: [help_, new_text, log]
    };
}

// this comments seems not updated
/**
 * This function returns the sum of two numbers.
 * @param    {array} args Inputs as a list of floats.
 * @return   {float} the average between two numbers args[0] and args[1].
 */
function str2lst(args) {
    //inputs
    var inputString = String(args[0]);

    //outputs
    var help_ = `
    <div id="help_t3">about: </div>
    <div id="help_p">This component converts a string-like list into a list eg : 
    <span id='code'>"[1, 2, 3, 4]"</span> will return <span id='code'>[1, 2, 3, 4]</span></div>

        <div id="help_t3">Inputs: </div>

            <div id="help_t4">inputString</div>
            <div id="help_p">a string-like list</div>

        <div id="help_t3">Outputs: </div>

            <div id="help_t4">list_</div>
            <div id="help_p">the parsed list</div>

    `;
    var log = 'Success';
    var list_ = null;

    try {
        list_ = JSON.parse(inputString);
    } catch (error) {
        list_ = NaN;
        log = error;
    }

    return {
        type: ['html', 'text', 'text'],
        value: [help_, list_, log]
    };
}

function str2Json(args) {
    //inputs
    var inputString = String(args[0]);

    //outputs
    var help_ = `
    <div id="help_t3">about: </div>
    <div id="help_p">This component converts a string-like json object into a json object eg : 
    <span id='code'>"{'name': 'SDE4' , 'height' : 24.0}"</span> will return <span id='code'>{'name': 'SDE4' , 'height' : 24.0}</span></div>

        <div id="help_t3">Inputs: </div>

            <div id="help_t4">inputString</div>
            <div id="help_p">a string-like json object</div>

        <div id="help_t3">Outputs: </div>

            <div id="help_t4">json_</div>
            <div id="help_p">the parsed json object</div>

    `;
    var json_ = null;
    var log = 'Success';

    try {
        json_ = JSON.parse(inputString);
    } catch (error) {
        json_ = NaN;
        log = error;
    }

    return {
        type: ['html', 'text', 'text'],
        value: [help_, json_, log]
    };
}

/**
 * This function returns the maximum value between a list of inputs.
 * @param {array} args - An array of Numbers (float/int).
 * @return {float} the average of all numbers in an array.
 */
function max(args) {
    // initialize variables
    var log = 'Success!';
    var output;

    try {
        if (typeof args[0] === 'string' || args[0] instanceof String) {
            args[0] = JSON.parse(args[0]);
        }
        console.log(args[0]);
        output = Math.max(...args[0]);
    } catch (error) {
        log = error;
        output = null;
    }
    return {
        type: ['text', 'text'],
        value: [output, log]
    };
}

/**
 * This function returns the minimum value between a list of inputs.
 * @param {array} args
 * @return {float} the average of all numbers in an array.
 */
function min(args) {
    console.log(args);
    // initialize variables
    var log = 'Success!';
    var output;

    try {
        if (typeof args[0] === 'string' || args[0] instanceof String) {
            args[0] = JSON.parse(args[0]);
        }
        console.log(args[0]);
        output = Math.min(...args[0]);
    } catch (error) {
        log = error;
        output = null;
    }

    return {
        type: ['text', 'text'],
        value: [output, log]
    };
}

function draw3dModel(args) {
    /**
     * This function returns the minimum value between a list of inputs.
     * @param {array} args
     * @return {json} json string indicating the 3d geometry
     */

    var tracking = args[0];

    var result_3d = null;
    var log = 'success';

    var project_id = parseInt(tracking.split('-')[0]);
    var branch_id = parseInt(tracking.split('-')[1]);
    var commit_id = parseInt(tracking.split('-')[2]);

    if (tracking == null || tracking === 'null') {
        log = 'drawing';
        result_3d =
            '<a href = "https://my.buildsim.io/IDF3DSimpleViewerSocket.html?project_id=' +
            project_id +
            '&branch_id=' +
            branch_id +
            '&commit_id=' +
            commit_id +
            '&stand_alone_token=b21df01da249eef60e56660f1d3f4bab-y8xlwk-19&full_screen=true">Open in new window</a>';
        $('div#propertiesBarContents').html(
            '<iframe src="https://my.buildsim.io/IDF3DSimpleViewerSocket.html?project_id=' +
                project_id +
                '&branch_id=' +
                branch_id +
                '&commit_id=' +
                commit_id +
                '&stand_alone_token=b21df01da249eef60e56660f1d3f4bab-y8xlwk-19&full_screen=true" style="width:100%; height:100vh;"></iframe>'
        );

        return {
            type: ['html', 'text'],
            value: [result_3d, log]
        };
    } else {
        try {
            project_id = parseInt(tracking.split('-')[0]);
            branch_id = parseInt(tracking.split('-')[1]);
            commit_id = parseInt(tracking.split('-')[2]);
            result_3d =
                '<a href = "https://my.buildsim.io/IDF3DSimpleViewerSocket.html?project_id=' +
                project_id +
                '&branch_id=' +
                branch_id +
                '&commit_id=' +
                commit_id +
                '&stand_alone_token=b21df01da249eef60e56660f1d3f4bab-y8xlwk-19&full_screen=true">Open in new window</a>';
            $('div#propertiesBarContents').html(
                '<iframe src="https://my.buildsim.io/IDF3DSimpleViewerSocket.html?project_id=' +
                    project_id +
                    '&branch_id=' +
                    branch_id +
                    '&commit_id=' +
                    commit_id +
                    '&stand_alone_token=b21df01da249eef60e56660f1d3f4bab-y8xlwk-19&full_screen=true" style="width:100%; height:100vh;"></iframe>'
            );

            $('div#propertiesBarContents').html(
                '<iframe src="https://my.buildsim.io/IDF3DSimpleViewerSocket.html?project_id=' +
                    project_id +
                    '&branch_id=' +
                    branch_id +
                    '&commit_id=' +
                    commit_id +
                    '&stand_alone_token=b21df01da249eef60e56660f1d3f4bab-y8xlwk-19&full_screen=true" style="width:100%; height:100vh;"></iframe>'
            );

            return {
                type: ['html', 'text'],
                value: [result_3d, log]
            };
        } catch (error) {
            result_3d = null;
            log = error;
            $('div#propertiesBarContents').html(
                '<iframe src="https://my.buildsim.io/IDF3DSimpleViewerSocket.html?project_id=' +
                    project_id +
                    '&branch_id=' +
                    branch_id +
                    '&commit_id=' +
                    commit_id +
                    '&stand_alone_token=b21df01da249eef60e56660f1d3f4bab-y8xlwk-19&full_screen=true" style="width:100%; height:100vh;"></iframe>'
            );

            return {
                type: ['html', 'text'],
                value: [result_3d, log]
            };
        }
    }
}

/**
 * This function allow user to select specific branch of a json object
 * @param {array} args
 * @param args[0]: input_json [string], the json input e.g. {0: "Google", 1: "Facebook", 2:{"data": "no-data", "value": 123}}
 * @param args[1]: path [list], a list or a list-like string that represents the path to the requird object . eg: [2, "data"]
 * @return {json} json string indicating the 3d geometry
 */
function jsonNavigator(args) {
    var input_json = args[0];
    var path = args[1];

    var output = null;
    var log = 'Success';

    try {
        input_json = parseString(input_json);
        path = parseString(path);
        if (path.length > 1) {
            output = path.reduce((a, b) => {
                return input_json[a][b];
            });
        } else {
            output = input_json[path[0]];
            console.log(output);
        }

        return {
            type: ['json', 'text'],
            value: [JSON.stringify(output), log]
        };
    } catch (error) {
        log = error;

        return {
            type: ['text', 'text'],
            value: [output, log]
        };
    }
}

/**
 * This function draws iframe
 * @param {array} args
 * @return {json}
 */
function draw3dObject(args) {
    var input_url = args[0];
    var outpur_iframe = '<iframe src="' + input_url + '"></iframe>';

    return {
        type: ['html'],
        value: [outpur_iframe]
    };
}

/**
 * This function accepts the OSI-soft data record and return a plot-ly
 * @param {array} args
 * @return {json}
 */
function osiExtractTimeSeriesData(args) {
    var input_data = args[0];
    var x = [];
    var y = [];
    var uniquePlotId = uuidv4('plot_');

    var help_ = `
    <div id="help_t3">about: </div>
    <div id="help_p">This component extracts the plotting data from OSIsoft end point</div>

        <div id="help_t3">Inputs: </div>

            <div id="help_t4">plot_</div>
            <div id="help_p">Timeseries plot </div>

            <div id="help_t4">to_html</div>
            <div id="help_p">table representing the data </div>

            <div id="help_t4">to_dict</div>
            <div id="help_p">data as json object </div>

            <div id="help_t4">time_stamps</div>
            <div id="help_p">list of time stamps </div>

            <div id="help_t4">data</div>
            <div id="help_p">list of data </div>

            <div id="help_t4">log_</div>
            <div id="help_p">Timeseries plot </div>

     `;
    var output_dataframe = null;
    var plot_ = null;
    var to_html = null;
    var to_dict = null;
    var time_stamps = null;
    var data = null;
    var log_ = 'Success';

    try {
        input_data = parseString(input_data);
        if (input_data != null) {
            for (const key in input_data['Items']) {
                if (input_data['Items'].hasOwnProperty(key)) {
                    const element = input_data['Items'][key];
                    x.push(element.Timestamp);
                    y.push(element.Value);
                }
            }
        }

        time_stamps = JSON.stringify(x);
        data = JSON.stringify(y);
        var objDict = { timestamp: x, data: y };
        to_html = objToHtmlTable(objDict);
        to_dict = JSON.stringify(objDict);

        output_dataframe = JSON.stringify(objDict);

        plot_ =
            "<div id='" +
            uniquePlotId +
            "' style='width:100%; height:100%'></div>" +
            `<script>
        x_values = ` +
            JSON.stringify(x).split('"').join("'") +
            `;
        y_values = ` +
            JSON.stringify(y).split('"').join("'") +
            `;
        var data = [{x: x_values,y: y_values,type: 'scatter'}];
        Plotly.newPlot('` +
            uniquePlotId +
            `', data, {responsive: true});`;

        console.log(plot_);
        return {
            type: ['html', 'html', 'html', 'json', 'json', 'json', 'text'],
            value: [help_, plot_, to_html, to_dict, time_stamps, data, log_]
        };
    } catch (error) {
        console.log(error);

        log_ = error;

        return {
            type: ['html', 'html', 'html', 'json', 'json', 'json', 'text'],
            value: [help_, plot_, to_html, to_dict, time_stamps, data, log_]
        };
    }
}

function imDisplay(args) {
    /**
     * This function draws iframe
     * @param {array} args
     * @return {html}
     */

    var _url = args[0];

    var image_ = null;

    if (_url == null) {
        image_ = `<img src="https://user-images.githubusercontent.com/6969514/60951247-4bac1200-a32b-11e9-8b66-02bc19953461.png" style="width:100%; height:100%">`;
        return {
            type: ['html'],
            value: [image_]
        };
    } else {
        image_ = `<img src="` + _url + `" style="width:100%; height:100%">`;
        return {
            type: ['html'],
            value: [image_]
        };
    }
}

//<iframe width="560" height="315" src="https://www.youtube.com/embed/05d6yEsfuNw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
function youTubeDisplay(args) {
    /**
     * This function draws iframe
     * @param {array} args
     * @return {html}
     */
    console.log('You are on this function youTubeDisplay');
    var _url = args[0];

    var youTube_ = null;

    if (_url == null) {
        youTube_ = `<img src="https://user-images.githubusercontent.com/6969514/60952698-50be9080-a32e-11e9-9aba-b5380f5cda01.png" style="width:100%; height:100%">`;
        return {
            type: ['html'],
            value: [youTube_]
        };
    } else {
        try {
            var videoId = _url.split('watch?v=')[1].split('&')[0];
            console.log(videoId);
            youTube_ =
                `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/` +
                videoId +
                `" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            return {
                type: ['html'],
                value: [youTube_]
            };
        } catch {
            youTube_ = `<img src="https://user-images.githubusercontent.com/6969514/60952698-50be9080-a32e-11e9-9aba-b5380f5cda01.png" style="width:100%; height:100%">`;
            return {
                type: ['html'],
                value: [youTube_]
            };
        }
    }
}

function plot_panel_comp(args) {
    var inputs = args[0];

    var plot = null;
    var log_ = '';

    return {
        type: ['plot', 'text'],
        value: [inputs, 'to be stated later .. ']
    };
}

/**
 * This is the core function that runs all the calculations and return the outputs to the components.
 * @param    {string} compId The component GUID.
 */
function calculateShallow(compId) {
    var thisComp = selectComp(compId); // selects the component that is under test.
    var inputGroup = []; // reads the inputs from the component and put them in a list to be mapped to the corresponding shallow function.
    thisComp.inputs.forEach(input => {
        inputGroup.push(input.value);
    });

    var d = shallow_functions[thisComp.Name](inputGroup);
    console.log(d);

    thisComp.outputs.forEach(function (output, i) {
        output.value = d['value'][i];
        output.type = d['type'][i];
    });
}

export { calculateShallow, shallow_functions };
