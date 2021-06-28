/*
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████──██████─██████──────────██████─██████████████─██████████████─██████████─██████████████─██████──────────██████─██████████████─
─██░░░░░░░░░░██─██░░██──██░░██─██░░██████████──██░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░░░██─██░░██████████──██░░██─██░░░░░░░░░░██─
─██░░██████████─██░░██──██░░██─██░░░░░░░░░░██──██░░██─██░░██████████─██████░░██████─████░░████─██░░██████░░██─██░░░░░░░░░░██──██░░██─██░░██████████─
─██░░██─────────██░░██──██░░██─██░░██████░░██──██░░██─██░░██─────────────██░░██───────██░░██───██░░██──██░░██─██░░██████░░██──██░░██─██░░██─────────
─██░░██████████─██░░██──██░░██─██░░██──██░░██──██░░██─██░░██─────────────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██─██░░██████████─
─██░░░░░░░░░░██─██░░██──██░░██─██░░██──██░░██──██░░██─██░░██─────────────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██─██░░░░░░░░░░██─
─██░░██████████─██░░██──██░░██─██░░██──██░░██──██░░██─██░░██─────────────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██─██████████░░██─
─██░░██─────────██░░██──██░░██─██░░██──██░░██████░░██─██░░██─────────────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██████░░██─────────██░░██─
─██░░██─────────██░░██████░░██─██░░██──██░░░░░░░░░░██─██░░██████████─────██░░██─────████░░████─██░░██████░░██─██░░██──██░░░░░░░░░░██─██████████░░██─
─██░░██─────────██░░░░░░░░░░██─██░░██──██████████░░██─██░░░░░░░░░░██─────██░░██─────██░░░░░░██─██░░░░░░░░░░██─██░░██──██████████░░██─██░░░░░░░░░░██─
─██████─────────██████████████─██████──────────██████─██████████████─────██████─────██████████─██████████████─██████──────────██████─██████████████─
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
*/

/**
 * Summary. (use period)
 *
 * Description. (use period)
 *
 * @link   URL
 * @file   This files defines the MainGrid operations.
 * @author Mahmoud AbdelRahman
 * @since  x.x.x
 */

import { jsonView } from './jsonview.js';
import { calculateShallow } from './shallow.js';
import { calculateCloud } from './cloud.js';
import Plotly from 'plotly';
import $ from 'jquery';

var d3 = require('d3');

var reactContext;
var allComp;
var ACTIVE_COLOR;
var ERROR_COLOR;
var allEdges;
var comp_input_edges;
var comp_output_edges;
var edge_comp_matrix;
var parent_child_matrix;
var parent_child_matrix_fast_check;
var components_selection_data;
var runDeep;
var messageshown;
var mouseInsideOption;

function dummyToSetState() {
    reactContext = this;
    allComp = reactContext.state.allComp;
    ACTIVE_COLOR = reactContext.state.ACTIVE_COLOR;
    ERROR_COLOR = reactContext.state.ERROR_COLOR;
    allEdges = reactContext.state.allEdges;
    comp_input_edges = reactContext.state.comp_input_edges;
    comp_output_edges = reactContext.state.comp_output_edges;
    edge_comp_matrix = reactContext.state.edge_comp_matrix;
    parent_child_matrix = reactContext.state.parent_child_matrix;
    parent_child_matrix_fast_check = reactContext.state.parent_child_matrix_fast_check;
    components_selection_data = reactContext.state.components_selection_data;
    runDeep = reactContext.state.runDeep;
    mouseInsideOption = reactContext.state.mouseInsideOption;
    messageshown = reactContext.state.messageshown;
}



function uuidv4(ini) {
    return (
        ini +
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        })
    );
}

function addCircle() {
    var initCircle = {
        GUID: uuidv4('C'),
        element: null,
        CX: 0,
        CY: 0,
        Comp: null,
        type: 'data',
        path: null
    };

    return initCircle;
}

function addcomponent(
    guid,
    n_inputs = 4,
    n_outputs = 5,
    inputsIn = 5 * ['input'],
    outputsIn = 5 * ['output']
) {
    var inputs = [];
    var outputs = [];
    for (let index = 0; index < n_inputs; index++) {
        try {
            inputs.push({
                id: index,
                circle: null,
                textObj: null,
                Name: inputsIn[index].name,
                ShortName: inputsIn[index].shortName,
                Description: inputsIn[index].desc,
                Message: 'short description',
                type: 'item',
                datatype: 'int',
                value: inputsIn[index].default_value
            });
        } catch {
            inputs.push({
                id: index,
                circle: null,
                textObj: null,
                Name: '',
                ShortName: '',
                Description: '',
                Message: 'short description',
                type: 'item',
                datatype: 'int',
                value: ''
            });
        }
    }

    for (let index = 0; index < n_outputs; index++) {
        try {
            outputs.push({
                id: index,
                circle: null,
                textObj: null,
                Name: outputsIn[index],
                ShortName: outputsIn[index],
                Description: outputsIn[index].desc,
                Message: 'short description',
                type: 'item',
                datatype: 'int',
                value: null
            });
        } catch {
            outputs.push({
                id: index,
                circle: null,
                textObj: null,
                Name: '',
                ShortName: '',
                Description: '',
                Message: 'short description',
                type: 'item',
                datatype: 'int',
                value: null
            });
        }
    }
    var initComp = {
        GUID: guid,
        X: 0,
        Y: 0,
        width: 120,
        height: 50,
        Name: 'Component',
        ShortName: 'Comp',
        Description: 'Dummy component',
        Message: 'short description',
        numInputs: 3,
        numOutputs: 2,
        typeName: null,
        logo: null,
        type: 'component',
        state: 'unbound',
        status: 'idle',
        selection: 'selectable',
        view: 'visible', // hidden , disabled
        fill: '#303952',
        rect: null,
        inputs: inputs,
        outputs: outputs,
        dftype: 'dp',
        value: 'no value',
        child: false,
        log: {
            logText: ' Log message output.. '
        },
        optionListValues: {
            Option_0: 0,
            Option_1: 1,
            Option_2: 2.0
        }
    };

    return initComp;
} //End of addcomponent

/**
 * Gets the detail of a component given that the "by" value of that component equal to "value"
 * @param {*} value the value of the component need to be searched
 * @param {*} by the search field, by default, this field is the GUID of the component
 * @returns
 */
function selectComp(value, by = 'GUID') {
    let toreturn = null;
    allComp.forEach(element => {
        if (element[by] === value) {
            toreturn = element;
        }
    });
    return toreturn;
} // End of selectComp

function addEdgeCircle(theEdge, thisD) {
    var circ = d3
        .select('g#allPaths')
        .append('rect')
        .attr('id', 'pathCircle' + theEdge.path_id)
        .attr('rx', 100)
        .attr('ry', 100)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', 'red')
        .attr('opacity', 0.3)
        .attr('style', 'display:none')
        .on('mousemove', function (event) {
            d3.select(event.currentTarget).attr('opacity', 0.8);
            d3.select('path#' + theEdge.path_id)
                .attr('stroke', 'red')
                .attr('stroke-width', 4)
                .attr('stroke-dasharray', '5 5');
        })
        .on('mouseout', function (event) {
            d3.select(event.currentTarget).attr('opacity', 0.3);
            d3.select('path#' + theEdge.path_id)
                .attr('stroke', 'black')
                .attr('stroke-width', 5)
                .attr('stroke-dasharray', 4);
        })
        .on('mousedown', function (event) {
            deleteEdge(theEdge.path_id);
            console.log(theEdge.path_id);
            d3.select(event.currentTarget).remove();

            d3.select('path#' + theEdge.path_id).remove();
        });

    d3.select('#' + theEdge.path_id)
        .attr('stroke-width', '5')
        .attr('d', function () {
            return thisD.replace('L', 'C');
        })
        .attr('stroke', 'black')
        .attr('stroke-linecap', 'round')
        .attr('stroke-opacity', '0.5')
        .lower();

    try {
        handleEdgeMovement(theEdge.toComp[1]);
    } catch (error) {}

    try {
        handleEdgeMovement(theEdge.fromComp[1]);
    } catch (error) {}

    return circ;
}

function updateAll() {
    allEdges.forEach(element => {
        var thisD = $('path#' + element.path_id).attr('d');
        addEdgeCircle(element, thisD);
    });
} // End of updateAll

function returnCurveString(x1, y1, x2, y2) {
    var coalignValue;
    if (x2 < x1) {
        coalignValue = Math.abs(y2 - y1) / 5.0 + Math.abs(x2 - x1) * 1.5;
    } else {
        coalignValue = Math.abs(y2 - y1) / 5.0;
    }
    return (
        'M ' +
        x1 +
        ',' +
        y1 +
        ' ' +
        'C ' +
        ((x1 + x2) / 2.0 + coalignValue).toString() +
        ',' +
        y1 +
        ' ' +
        ((x1 + x2) / 2.0 - coalignValue).toString() +
        ',' +
        y2 +
        ' ' +
        x2 +
        ',' +
        y2
    );
} // End of returnCurveString

function getlocationFromTransform(trnsformText) {
    return trnsformText
        .replace('translate(', '')
        .replace(')', '')
        .split(',')
        .map(function (item) {
            return parseFloat(item, 10);
        });
} // End of getlocationFromTransform

function ViewListRedrawing() {
    d3.selectAll('option#someSelection').on('click', function (e) {
        var id = this.classList[1];
        var selectedItems = [];
        var componentValue = [];
        var selectedOptions = $('option.listViewOption.' + id);
        for (let i = 0; i < selectedOptions.length; i++) {
            var currentValue = selectedOptions[i].value;
            var parsedcurrentValue;
            if (selectedOptions[i].selected) {
                if (isNaN(currentValue)) {
                    parsedcurrentValue = currentValue;
                } else if (currentValue.indexOf('.') === -1) {
                    parsedcurrentValue = parseInt(currentValue);
                } else {
                    parsedcurrentValue = parseFloat(currentValue);
                }

                componentValue.push([parsedcurrentValue, 1]);
                selectedItems.push(parsedcurrentValue);
            } else {
                if (isNaN(currentValue)) {
                    parsedcurrentValue = currentValue;
                } else if (currentValue.indexOf('.') === -1) {
                    parsedcurrentValue = parseInt(currentValue);
                } else {
                    parsedcurrentValue = parseFloat(currentValue);
                }
                componentValue.push([parsedcurrentValue, 0]);
            }
        }
        var the_selected_optionList_component = selectComp(id);
        the_selected_optionList_component.outputs[0].value = JSON.stringify(selectedItems);
        the_selected_optionList_component.value = componentValue;

        redrawDependents(id);
    });
} // End of ViewListRedrawing

function addOptionDropdownList(compId) {
    var optionListComp = selectComp(compId);
    var n = 0;
    var node = d3.select('g#comp-' + compId);
    var optionsGroup = d3.select('g#optionListOption-' + compId);
    optionsGroup.html('');
    for (const option in optionListComp.optionListValues) {
        if (optionListComp.optionListValues.hasOwnProperty(option)) {
            n += 1;
            var optionRect = optionsGroup
                .append('text')
                .attr('fill', 'black')
                .attr(
                    'class',
                    'optionListoptiontext ' +
                        optionListComp.GUID +
                        ' ' +
                        optionListComp.optionListValues[option] +
                        ' ' +
                        option
                )
                .attr('value', option)
                .attr('key', optionListComp.optionListValues[option])
                .attr('width', '180')
                .text(option)
                .attr('y', 15 + 20 * n)
                .attr('x', 5);
        }
    }
    n = 0;
    for (const option in optionListComp.optionListValues) {
        if (optionListComp.optionListValues.hasOwnProperty(option)) {
            n += 1;
            var optionRect2 = optionsGroup
                .append('rect')
                .attr('fill', 'white')
                .attr(
                    'class',
                    'optionListoption ' +
                        optionListComp.GUID +
                        ' ' +
                        optionListComp.optionListValues[option] +
                        ' ' +
                        option
                )
                .attr('value', option)
                .attr('key', optionListComp.optionListValues[option])
                .attr('id', 'optionListoption')
                .attr('width', '180')
                .attr('height', '20')
                .attr('y', 20 * n)
                .attr('opacity', '0.3')
                .attr('stroke', 'gray')
                .on('mousemove', function () {
                    reactContext.setState({
                        mouseInsideOption: true
                    });
                })
                .on('mouseout', function () {
                    reactContext.setState({
                        mouseInsideOption: false
                    });
                })
                .on('click', function () {
                    changeOptionListFinalValue(this);
                });
        }
    }
} // End of addOptionDropdownList

function changeOptionListFinalValue(el) {
    console.log(el.attributes.value.value);
    var thisComp = selectComp(el.classList[1]);
    thisComp.value = el.attributes.key.value;
    thisComp.Name = el.attributes.value.value;

    thisComp.outputs[0].value = el.classList[2];

    d3.select('text#option-' + el.classList[1])
        .text(el.classList[3])
        .attr('fill', 'black');

    redrawDependents(el.classList[1]);
} // End of changeOptionListFinalValue

function showDropDownList(hh) {
    addOptionDropdownList(hh);
} // End of showDropDownList

/**
 * on a parent changes, only draws all the children tree .
 * all the components --- inputs outpts object (to be sent later to the backend should be modified as well)
 * shallow values should be updated instantaneously
 * @param {String} parentComp the id of parent component
 */
function redrawDependents(parentComp) {
    console.log('redrawing dependents');
    let parent = selectComp(parentComp);

    if (parent_child_matrix[parentComp].length === 0) {
        // This means that this parent has no children
        return;
    }

    if (parent.dftype === 'shlow') {
        parent_child_matrix[parentComp].forEach(function (element, i) {
            //iterate through all those childs.
            let ch = selectComp(element[1]);
            if (parent.type === 'slider') {
                console.log('setting slider value to child');
                ch.inputs[element[2]].value = parent.value;
            } else if (parent.type === 'string' || parent.type === 'fileUpload') {
                ch.inputs[element[2]].value = parent.outputs[element[0]].value;
            } else if (parent.type === 'listView') {
                ch.inputs[element[2]].value = parent.outputs[element[0]].value;
                console.log(ch.inputs[element[2]]);
                ch.inputs[element[2]].type = 'json';
            } else if (parent.type === 'toggle' || parent.type === 'optionList') {
                ch.inputs[element[2]].value = parent.value;
            } else if (parent.type === 'component') {
                try {
                    calculateShallow(parent.GUID);
                    ch.inputs[element[2]].value = parent.outputs[element[0]].value;
                    ch.inputs[element[2]].type = parent.outputs[element[0]].type;
                    componentStatus(parent.GUID, ACTIVE_COLOR);
                } catch (error) {
                    console.log(error);
                    componentStatus(parent.GUID, ERROR_COLOR);
                }
            }
            updatShallowCompRender(ch);
            redrawDependents(ch.GUID);
        });
    } else if (parent.dftype === 'dp') {
        console.log('Cloud comp');
        parent.state = 'unbound';
        parent_child_matrix[parentComp].forEach(function (element, i) {
            //iterate through all those childs.
            let ch = selectComp(element[1]);
            if (parent.type === 'component' && runDeep === true) {
                reactContext.setState({
                    runDeep: false
                });
                if (parent.state === 'unbound') {
                    //Previously calculate deep
                    calculateCloud(parent.GUID);
                    parent.state = 'active';
                }
            }
            ch.inputs[element[2]].value = parent.outputs[element[0]].value;
            ch.inputs[element[2]].type = parent.outputs[element[0]].type;

            componentStatus(parent.GUID, ACTIVE_COLOR);
            updatShallowCompRender(ch);
            redrawDependents(ch.GUID);
        });
    } else if (parent.dftype === 'cloud') {
        //TODO if deep and cloud functions remain separate
    }
} // End of redrawDependents

function updatShallowCompRender(ch) {
    if (ch.type === 'string') {
        if (ch.inputs[0].type === 'html') {
            $('foreignObject#textbody_' + ch.GUID).html(ch.inputs[0].value);
        } else if (ch.inputs[0].type === 'json') {
            $('foreignObject#textbody_' + ch.GUID).html(
                '<div id="jsonTreeViewer' + ch.GUID + '"></div>'
            );
            jsonView.format(ch.inputs[0].value, 'div#jsonTreeViewer' + ch.GUID);
        } else if (ch.inputs[0].type === 'text') {
            $('foreignObject#textbody_' + ch.GUID).html('<pre>' + ch.inputs[0].value + '</pre>');
        } else if (ch.inputs[0].type === 'htmlLoad') {
            $('foreignObject#textbody_' + ch.GUID).html('<div id="3DViewer' + ch.GUID + '"></div>');
            $('div#3DViewer' + ch.GUID).load(ch.inputs[0].value, function (data) {
                console.log(data);
            });
        } else if (ch.inputs[0].type === 'plot') {
            let data = JSON.parse(ch.inputs[0].value);
            drawPlotComponent(data, ch);
        } else if (ch.inputs[0].type === 'spatial') {
            let data = JSON.parse(ch.inputs[0].value);
            let unparseData = ch.inputs[0].value;
            visualizeSpatialComponent(data, unparseData, ch);
        }
        $('foreignObject#panel_status_' + ch.GUID).text('type : ' + ch.inputs[0].type);
        ch.outputs[0].value = ch.inputs[0].value;
        ch.outputs[0].type = ch.inputs[0].type;
    } else if (ch.type === 'optionList') {
        ch.optionListValues = JSON.parse(ch.inputs[0].value);
    } else if (ch.type === 'listView') {
        var newValues = [];
        for (let i = 0; i < JSON.parse(ch.inputs[0].value).length; i++) {
            const element = JSON.parse(ch.inputs[0].value)[i];
            newValues.push([element, 0]);
        }
        console.log(newValues);
        ch.value = newValues;
        ch.inputs[0].value = newValues;
        ch.outputs[0].value = newValues;

        updateListViewDrawing(ch);
    }
} // End of updatShallowCompRender

function visualizeSpatialComponent(data, unparseData, comp) {
    $('foreignObject#textbody_' + comp.GUID).html(
        '<div id="vis_area' +
            comp.GUID +
            '" style="height:4%"></div><div id="vis_canvas' +
            comp.GUID +
            '" style="height:92%">vis</div>'
    );

    var options =
        `<select id='spatial_select_` +
        comp.GUID +
        `' onchange= 'displaySelection(` +
        unparseData +
        `, "` +
        comp.GUID +
        `")'>`;
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            options += `<option  value="` + key + `">` + key + `</option>`;
        }
    }
    options += `</select>`;
    $('div#vis_area' + comp.GUID).html(options);
} // End of visualizeSpatialComponent

function displaySelection(data, id) {
    var x = document.getElementById('spatial_select_' + id).value;
    var spaces_in_level =
        `<select id="spatial_zone_selection_list_` +
        id +
        `" onchange="highlightSpatialZone('` +
        id +
        `')">`;
    data[x].forEach(element => {
        spaces_in_level += `<option value="` + element.name + `">` + element.name + `</option>`;
    });
    spaces_in_level += `</select>`;
    d3.select('div#vis_canvas' + id)
        .html(`<div id="spatial_canvas_floor_zones" style="height:3%">` + spaces_in_level + '<div>')
        .append('svg')
        .attr('id', 'floor_plan_display' + id);

    data[x].forEach(element => {
        d3.select('svg#floor_plan_display' + id)
            .attr('width', '100%')
            .attr('height', '100%')
            .append('path')
            .attr('id', 'fpp_' + element.name)
            .attr('stroke', 'black')
            .attr('fill', 'none')
            .attr('stroke-width', 1)
            .attr('d', () => {
                var pathString = 'M';
                for (let i = 0; i < element.coords.length; i++) {
                    if (i < element.coords.length - 1) {
                        pathString +=
                            ' ' +
                            (element.coords[i][0] * 10 + 500).toString() +
                            ' ' +
                            (element.coords[i][1] * 10 + 300).toString() +
                            ' L';
                    } else {
                        pathString +=
                            ' ' +
                            (element.coords[i][0] * 10 + 500).toString() +
                            ' ' +
                            (element.coords[i][1] * 10 + 300).toString() +
                            ' Z';
                    }
                }
                return pathString;
            });
    });
} // End of displaySelection

function highlightSpatialZone(id) {
    var selected_zone = document.getElementById('spatial_zone_selection_list_' + id).value;

    var a = document.getElementById('floor_plan_display' + id);
    console.log(a);
    // Get the SVG document inside the Object tag
    var svgDoc = a.contentDocument;

    // Get one of the SVG items by ID;
    var svgItem = a.getElementById('fpp_' + selected_zone);
    console.log(svgItem);
    // Set the colour to something else
    svgItem.setAttribute('fill', 'green');
} // End of highlightSpatialZone

function drawPlotComponent(data, comp) {
    $('foreignObject#textbody_' + comp.GUID).html(
        '<div id="plot_area' + comp.GUID + '" style="width:100%; height:100%;"></div>'
    );
    if (data != null && Array.isArray(data)) {
        if (data[0].type === 'scatter') {
            if ('layout' in data[0]) {
                Plotly.newPlot('plot_area' + comp.GUID, data[0].data, data[0].layout, {
                    responsive: true
                });
            } else {
                Plotly.newPlot('plot_area' + comp.GUID, data[0].data, {
                    responsive: true
                });
            }
        } else if (data[0].type === 'bar') {
            data[0].data.forEach(dataElement => {
                var maxValue = Math.max(...dataElement.y);
                dataElement['marker'] = {
                    color: []
                };
                dataElement.y.forEach(dataValue => {
                    dataElement.marker.color.push(d3.interpolateGnBu(dataValue / maxValue));
                });
            });
            if ('layout' in data[0]) {
                Plotly.newPlot('plot_area' + comp.GUID, data[0].data, data[0].layout, {
                    responsive: true
                });
            } else {
                Plotly.newPlot('plot_area' + comp.GUID, data[0].data, {
                    responsive: true
                });
            }
        } else {
            if ('layout' in data[0]) {
                Plotly.newPlot('plot_area' + comp.GUID, data[0].data, data.layout, {
                    responsive: true
                });
            } else {
                Plotly.newPlot('plot_area' + comp.GUID, data[0].data, {
                    responsive: true
                });
            }
        }
    } else if (data != null) {
        if (data.type === 'scatter') {
            if ('layout' in data) {
                Plotly.newPlot('plot_area' + comp.GUID, data.data, data.layout, {
                    responsive: true
                });
            } else {
                Plotly.newPlot('plot_area' + comp.GUID, data.data, {
                    responsive: true
                });
            }
        } else if (data.type === 'bar') {
            data.data.forEach(dataElement => {
                var maxValue = Math.max(...dataElement.y);
                dataElement['marker'] = {
                    color: []
                };
                dataElement.y.forEach(dataValue => {
                    dataElement.marker.color.push(d3.interpolateGnBu(dataValue / maxValue));
                });
            });
            if ('layout' in data) {
                Plotly.newPlot('plot_area' + comp.GUID, data.data, data.layout, {
                    responsive: true
                });
            } else {
                Plotly.newPlot('plot_area' + comp.GUID, data.data, {
                    responsive: true
                });
            }
        } else {
            if ('layout' in data) {
                Plotly.newPlot('plot_area' + comp.GUID, data.data, data.layout, {
                    responsive: true
                });
            } else {
                Plotly.newPlot('plot_area' + comp.GUID, data.data, {
                    responsive: true
                });
            }
        }
    } else {
        Plotly.newPlot(
            'plot_area' + comp.GUID,
            [
                {
                    x: ['1', '2', '3'],
                    y: [1.0, 2.0, 3.0],
                    type: 'bar'
                }
            ],
            {
                title: 'Dummy plot'
            },
            {
                responsive: true
            }
        );
    }
} // End of drawPlotComponent

function updateListViewDrawing(comp) {
    d3.select('foreignObject#listView-' + comp.GUID).html(() => {
        var selectedOptions = [];
        var ListItemsvalueReturn =
            `<select id="listviewSelect" class="listView ` + comp.GUID + `" size="5"  multiple>`;
        comp.value.forEach(option => {
            if (option[1] === 0) {
                ListItemsvalueReturn +=
                    `<option id="someSelection" class="listViewOption ` +
                    comp.GUID +
                    `" value="` +
                    option[0] +
                    `">` +
                    option[0] +
                    `</option>`;
            } else {
                ListItemsvalueReturn +=
                    `<option id="someSelection" class="listViewOption ` +
                    comp.GUID +
                    `" value="` +
                    option[0] +
                    `" selected>` +
                    option[0] +
                    `</option>`;
                selectedOptions.push(option[0]);
            }
        });
        comp.outputs[0].value = JSON.stringify(selectedOptions);
        ListItemsvalueReturn += `</select>`;
        return ListItemsvalueReturn;
    });

    ViewListRedrawing();
} // End of updateListViewDrawing

function handleEdgeMovement(objID, x = null, y = null) {
    var element = selectComp(objID);
    if (element != null && element.GUID === objID) {
        if (x !== null && y !== null) {
            element.X = x;
            element.Y = y;
        }

        for (let index = 0; index < comp_input_edges[objID].length; index++) {
            if (
                comp_input_edges[objID][index] !== undefined &&
                comp_input_edges[objID][index] !== null
            ) {
                comp_input_edges[objID][index].forEach(inputElement => {
                    var circleindex = index;

                    var rectId = objID;

                    var rectpos = $('#comp-' + rectId)
                        .attr('transform')
                        .replace('translate(', '')
                        .replace(')', '')
                        .split(',')
                        .map(function (item) {
                            return parseFloat(item, 10);
                        });
                    var xy2 = $('#' + inputElement)
                        .attr('d')
                        .split(' ')[1]
                        .split(',')
                        .map(function (item) {
                            return parseFloat(item, 10);
                        });
                    var padding = 20;
                    var titleMargin = 30;
                    var thenewEdge = d3.select('#' + inputElement).attr('d', function () {
                        if (element.type === 'component') {
                            var itisthelocation = returnCurveString(
                                xy2[0],
                                xy2[1],
                                rectpos[0],
                                rectpos[1] + (circleindex * padding + titleMargin)
                            );

                            handlePathDeleteMovement(inputElement, xy2, [
                                rectpos[0],
                                rectpos[1] + (circleindex * padding + titleMargin)
                            ]);
                        } else if (
                            element.type === 'string' ||
                            element.type === 'toggle' ||
                            element.type === 'fileUpload' ||
                            element.type === 'slider' ||
                            element.type === 'optionList' ||
                            element.type === 'listView'
                        ) {
                            itisthelocation = returnCurveString(
                                xy2[0],
                                xy2[1],
                                rectpos[0],
                                rectpos[1] + element.height / 2
                            );

                            handlePathDeleteMovement(inputElement, xy2, [
                                rectpos[0],
                                rectpos[1] + element.height / 2
                            ]);
                        }

                        return itisthelocation;
                    });
                });
            }
        }
        for (let index = 0; index < comp_output_edges[objID].length; index++) {
            if (
                comp_output_edges[objID][index] !== undefined &&
                comp_output_edges[objID][index] !== null
            ) {
                comp_output_edges[objID][index].forEach(outputElement => {
                    var circleindex = index;
                    var rectId = objID;
                    var rectpos = $('#comp-' + rectId)
                        .attr('transform')
                        .replace('translate(', '')
                        .replace(')', '')
                        .split(',')
                        .map(function (item) {
                            return parseFloat(item, 10);
                        });
                    var rectwidth = $('rect#dummyRect_' + rectId).attr('width');
                    var xy2 = $('#' + outputElement)
                        .attr('d')
                        .split(' ')[5]
                        .split(',')
                        .map(function (item) {
                            return parseFloat(item, 10);
                        });
                    var padding = 20;
                    var titleMargin = 30;
                    var thenewEdge = d3.select('#' + outputElement).attr('d', function () {
                        if (element.type === 'component') {
                            var itisthelocation = returnCurveString(
                                rectpos[0] + parseFloat(rectwidth),
                                rectpos[1] + (circleindex * padding + titleMargin),
                                xy2[0],
                                xy2[1]
                            );

                            handlePathDeleteMovement(
                                outputElement,
                                [
                                    rectpos[0] + parseFloat(rectwidth),
                                    rectpos[1] + (circleindex * padding + titleMargin)
                                ],
                                [xy2[0], xy2[1]]
                            );
                        } else if (element.type === 'slider') {
                            itisthelocation = returnCurveString(
                                rectpos[0] + parseFloat(250),
                                rectpos[1] + 10,
                                xy2[0],
                                xy2[1]
                            );

                            handlePathDeleteMovement(
                                outputElement,
                                [rectpos[0] + parseFloat(250), rectpos[1] + 10],
                                [xy2[0], xy2[1]]
                            );
                        } else if (
                            element.type === 'string' ||
                            element.type === 'toggle' ||
                            element.type === 'optionList' ||
                            element.type === 'listView' ||
                            element.type === 'fileUpload'
                        ) {
                            itisthelocation = returnCurveString(
                                rectpos[0] + parseFloat(rectwidth),
                                rectpos[1] + element.height / 2,
                                xy2[0],
                                xy2[1]
                            );

                            handlePathDeleteMovement(
                                outputElement,
                                [
                                    rectpos[0] + parseFloat(rectwidth),
                                    rectpos[1] + element.height / 2
                                ],
                                [xy2[0], xy2[1]]
                            );
                        }
                        return itisthelocation;
                    });
                });
            }
        }
    }
} // End of handleEdgeMovement

function handlePathDeleteMovement(pathId, xy1, xy2) {
    var circleX = ((xy1[0] + xy2[0]) / 2.0).toString() - 7.5;
    var circleY = ((xy1[1] + xy2[1]) / 2.0).toString() - 7.5;
    d3.select('rect#pathCircle' + pathId)
        .attr('x', circleX)
        .attr('y', circleY)
        .attr('style', 'display:block');
} // End of handlePathDeleteMovement

function objToHtmlTable(object) {
    var col_length = 0;
    var keys = [];
    var htmlQuery =
        `<table border="1" class="dataframe">` + `<thead> <tr style="text-align: right;"><th></th>`;
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            htmlQuery += `<th>` + key + `</th>`;
            keys.push(key);
            col_length = object[key].length;
        }
    }
    htmlQuery += `</tr></thead><tbody>`;

    for (let i = 0; i < col_length; i++) {
        htmlQuery += `<tr><th>` + i.toString() + `</th>`;
        keys.forEach(element => {
            htmlQuery += `<td>` + object[element][i] + `</td>`;
        });
        htmlQuery += `</tr>`;
    }

    return htmlQuery;
} // End of objToHtmlTable

function deleteComponent(component_to_be_deleted) {
    console.log('deleting component now');
    var component_to_be_reset = selectComp(component_to_be_deleted);
    if (component_to_be_reset.type === 'optionList') {
        reactContext.setState({
            optionListStarted: false
        });
    }
    console.log(component_to_be_reset.type);
    component_to_be_reset.value = null;

    console.log(parent_child_matrix_fast_check);
    component_to_be_reset.inputs.forEach(input => {
        input.value = null;
    });

    component_to_be_reset.outputs.forEach(output => {
        output.value = null;
    });

    delete components_selection_data[component_to_be_deleted];
    redrawDependents(component_to_be_deleted);

    for (let i = 0; i < parent_child_matrix_fast_check.length; i++) {
        var current_parent_child_object_asList = parent_child_matrix_fast_check[i].split(' ');
        if (current_parent_child_object_asList[1] === component_to_be_deleted) {
            parent_child_matrix_fast_check.splice(i, 1);
        }
    }

    comp_input_edges[component_to_be_deleted].forEach(element => {
        try {
            for (let i = 0; i < allEdges.length; i++) {
                element.forEach(thisEdgeId => {
                    d3.select('path#' + thisEdgeId).remove();
                    d3.select('rect#pathCircle' + thisEdgeId).remove();
                    if (thisEdgeId === allEdges[i]['path_id']) {
                        allEdges.splice(i, 1);
                        reactContext.setState({
                            allEdges: allEdges
                        });
                    }
                    var otherComp = edge_comp_matrix[thisEdgeId]['from'];
                    var otherCompIndex = edge_comp_matrix[thisEdgeId]['from_index'];
                    comp_output_edges[otherComp][otherCompIndex] = undefined;
                    parent_child_matrix[otherComp] = [];
                });
            }
        } catch (err) {
            console.log(err);
        }
    });

    comp_output_edges[component_to_be_deleted].forEach(element => {
        try {
            for (let i = 0; i < allEdges.length; i++) {
                element.forEach(thisEdgeId => {
                    d3.select('path#' + thisEdgeId).remove();
                    d3.select('rect#pathCircle' + thisEdgeId).remove();
                    if (thisEdgeId === allEdges[i]['path_id']) {
                        allEdges.splice(i, 1);
                        reactContext.setState({
                            allEdges: allEdges
                        });
                    }
                    var otherComp = edge_comp_matrix[thisEdgeId]['to'];
                    var otherCompIndex = edge_comp_matrix[thisEdgeId]['to_index'];
                    comp_input_edges[otherComp][otherCompIndex] = undefined;
                });
            }
        } catch (err) {
            console.log(err);
        }
    });

    reactContext.setState({
        comp_input_edges: comp_input_edges,
        comp_output_edges: comp_output_edges,
        parent_child_matrix: parent_child_matrix
    });

    for (let i = 0; i < allComp.length; i++) {
        if (allComp[i].GUID === component_to_be_deleted) {
            allComp.splice(i, 1);
            reactContext.setState({
                allComp: allComp
            });
        }
    }
    d3.select('#' + component_to_be_deleted).remove();
} // End of deleteComponent

function deleteEdge(edge_to_be_deleted) {
    console.log('deleteEdge');
    var components_of_the_edge = edge_comp_matrix[edge_to_be_deleted];
    var fromComp = selectComp(components_of_the_edge['from']); //.outputs[components_of_the_edge["from_index"]])
    var toComp = selectComp(components_of_the_edge['to']); //.inputs[components_of_the_edge["to_index"]].value = null;
    toComp.inputs[components_of_the_edge['to_index']].value = null;
    toComp.value = null;
    comp_input_edges[toComp.GUID][components_of_the_edge['to_index']] = undefined;
    comp_output_edges[fromComp.GUID][components_of_the_edge['from_index']] = comp_output_edges[
        fromComp.GUID
    ][components_of_the_edge['from_index']].filter(pathId => pathId !== edge_to_be_deleted);

    for (let i = 0; i < parent_child_matrix[fromComp.GUID].length; i++) {
        if (
            parent_child_matrix[fromComp.GUID][i][2] === components_of_the_edge['to_index'] &&
            parent_child_matrix[fromComp.GUID][i][1] === toComp.GUID
        ) {
            parent_child_matrix[fromComp.GUID].splice(i, 1);
        }
    }

    updatShallowCompRender(toComp);
    updatShallowCompRender(fromComp);
    redrawDependents(components_of_the_edge['to']);

    allEdges = allEdges.filter(edge => edge['path_id'] !== edge_to_be_deleted);

    for (let i = 0; i < parent_child_matrix_fast_check.length; i++) {
        var parent_child_info = parent_child_matrix_fast_check[i].split(' ');
        if (
            parent_child_info[0] === components_of_the_edge['from_index'] &&
            parent_child_info[1] === fromComp.GUID
        ) {
            // && parent_child_info[3] === toComp.GUID
            parent_child_matrix_fast_check.splice(i, 1);
        }
    }

    redrawDependents(components_of_the_edge['to']);
    delete edge_comp_matrix[edge_to_be_deleted];

    reactContext.setState({
        comp_input_edges: comp_input_edges,
        comp_output_edges: comp_output_edges,
        parent_child_matrix: parent_child_matrix,
        edge_comp_matrix: edge_comp_matrix,
        allEdges: allEdges,
        parent_child_matrix_fast_check: parent_child_matrix_fast_check
    });
} // End of deleteEdge

function popupMessage(message) {
    d3.select('div#buttonClickedname')
        .text(message)
        .style('opacity', () => {
            messageshown = true;
            return 0.8;
        });
} // End of popupMessage

/**
 * Set the status of a generic component (idle, active, error) based on its color
 * @param {*} id the id of the component
 * @param {*} Compstatus the text color of the component
 */
function componentStatus(id, Compstatus) {
    if (Compstatus === 'green') {
        d3.select('rect#statusRect' + id).attr('fill', '#02521b');

        d3.select('text#statusText' + id)
            .text('Active')
            .attr('fill', '#6cff13');
    } else if (Compstatus === '#ffca28') {
        d3.select('rect#statusRect' + id).attr('fill', Compstatus);
        d3.select('text#statusText' + id)
            .text('Idle ...')
            .attr('fill', 'black');
    } else if (Compstatus === 'red') {
        d3.select('rect#statusRect' + id).attr('fill', '#fceecc');
        d3.select('text#statusText' + id)
            .text('Error')
            .attr('fill', 'red');
    }
} // End of componentStatus

function moveComponent(id, x, y) {
    d3.select('#comp-' + id).attr('transform', function () {
        return 'translate(' + x + ',' + y + ')';
    });
    handleEdgeMovement(id, x, y);
} // End of moveComponent

function runDeepFunction(compId) {
    reactContext.setState({
        runDeep: true
    });
    redrawDependents(compId);
    reactContext.setState({
        runDeep: false
    });
}

export {
    dummyToSetState,
    uuidv4,
    addCircle,
    addcomponent,
    selectComp,
    updateAll,
    returnCurveString,
    getlocationFromTransform,
    ViewListRedrawing,
    addOptionDropdownList,
    changeOptionListFinalValue,
    showDropDownList,
    redrawDependents,
    updatShallowCompRender,
    visualizeSpatialComponent,
    drawPlotComponent,
    updateListViewDrawing,
    handleEdgeMovement,
    handlePathDeleteMovement,
    objToHtmlTable,
    deleteComponent,
    deleteEdge,
    popupMessage,
    componentStatus,
    moveComponent,
    runDeepFunction,
    addEdgeCircle
};
