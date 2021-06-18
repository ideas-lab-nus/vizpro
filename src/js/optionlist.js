/*
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████████████─██████████████─██████████─██████████████─██████──────────██████────██████─────────██████████─██████████████─██████████████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░░░██─██░░██████████──██░░██────██░░██─────────██░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─
─██░░██████░░██─██░░██████░░██─██████░░██████─████░░████─██░░██████░░██─██░░░░░░░░░░██──██░░██────██░░██─────────████░░████─██░░██████████─██████░░██████─
─██░░██──██░░██─██░░██──██░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██████░░██──██░░██────██░░██───────────██░░██───██░░██─────────────██░░██─────
─██░░██──██░░██─██░░██████░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██░░██████████─────██░░██─────
─██░░██──██░░██─██░░░░░░░░░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██░░░░░░░░░░██─────██░░██─────
─██░░██──██░░██─██░░██████████─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██████████░░██─────██░░██─────
─██░░██──██░░██─██░░██─────────────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██████░░██────██░░██───────────██░░██───────────██░░██─────██░░██─────
─██░░██████░░██─██░░██─────────────██░░██─────████░░████─██░░██████░░██─██░░██──██░░░░░░░░░░██────██░░██████████─████░░████─██████████░░██─────██░░██─────
─██░░░░░░░░░░██─██░░██─────────────██░░██─────██░░░░░░██─██░░░░░░░░░░██─██░░██──██████████░░██────██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░░░██─────██░░██─────
─██████████████─██████─────────────██████─────██████████─██████████████─██████──────────██████────██████████████─██████████─██████████████─────██████─────
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
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

import { addcomponent, selectComp, addOptionDropdownList } from './functions.js';
import { uuidv4, addCircle } from './handle.js';
import $ from 'jquery';
var d3 = require('d3');
var optionListComp;
var OptionListValues;

function CreateNewOptionList(
    reactContext,
    FromExisting = null,
    optionlist_predefined_items = null
) {
    var newcomp;

    if (FromExisting == null) {
        newcomp = addcomponent(uuidv4('C'), 1, 1);
        var guid = newcomp.GUID;
        var data = { ...reactContext.state.parent_child_matrix };
        data[guid] = [];
        reactContext.setState({
            parent_child_matrix: data
        });
        newcomp.Name = 'Select item';

        if (optionlist_predefined_items != null) {
            newcomp.optionListValues = JSON.parse(optionlist_predefined_items);
        }
    } else {
        newcomp = FromExisting;
    }

    newcomp.fill = 'white';
    var padding = 20;
    var titleMargin = 30;
    newcomp.height = 20;
    newcomp.type = 'optionList';
    newcomp.dftype = 'shlow';

    // TODO : get the longest text in the component. and set the width based on this.

    var allContents = d3.select('#allCanvasContents');

    newcomp.width = 200;

    var cont = allContents.append('g').attr('class', 'component').attr('id', newcomp.GUID);

    var genX;
    var genY;

    var node = cont
        .append('g')
        .attr(
            'class',
            newcomp.type +
                ' ' +
                newcomp.state +
                ' ' +
                newcomp.selection +
                ' ' +
                newcomp.view +
                ' ' +
                newcomp.GUID
        )
        .attr('id', 'comp-' + newcomp.GUID)
        .attr('transform', () => {
            if (FromExisting == null) {
                genX = Math.random() * 500 + 200;
                genY = Math.random() * 500 + 200;
                newcomp.X = genX;
                newcomp.Y = genY;
                return 'translate(' + genX + ', ' + genY + ')';
            } else {
                return 'translate(' + FromExisting.X + ', ' + FromExisting.Y + ')';
            }
        })
        .data([
            {
                x: FromExisting ? FromExisting.X : genX,
                y: FromExisting ? FromExisting.Y : genY
            }
        ]);

    var InputGroup = node.append('g');
    for (let index = 0; index < newcomp.inputs.length; index++) {
        var inp = InputGroup.append('circle')
            .lower()
            .attr('cx', '0')
            .attr('cy', newcomp.height / 2)
            .attr('fill', 'gray') //newcomp.fill)
            .attr('r', '5')
            .attr('stroke', 'black')
            .attr('stroke-width', '2')
            .attr('id', 'inputCir' + newcomp.GUID + '_' + index)
            .attr('class', 'inputCir ' + newcomp.GUID + ' ' + index)
            .attr('type', function () {
                newcomp.inputs[index].circle = addCircle();
                newcomp.inputs[index].circle.element = this.id;
                newcomp.inputs[index].circle.CX = 0;
                newcomp.inputs[index].circle.CY = index * padding + titleMargin;
                newcomp.inputs[index].type = 'input';
                return 'input';
            });
    }

    var OutputGroup = node.append('g');
    for (let index = 0; index < newcomp.outputs.length; index++) {
        var out = OutputGroup.append('circle')
            .attr('cx', newcomp.width)
            .attr('cy', newcomp.height / 2)
            .attr('fill', 'gray')
            .attr('r', '5')
            .attr('stroke', 'black')
            .attr('stroke-width', '2')
            .attr('id', 'outputCir' + newcomp.GUID + '_' + index)
            .attr('class', 'outputCir ' + newcomp.GUID + ' ' + index)
            .attr('type', function () {
                newcomp.outputs[index].circle = this;
                newcomp.outputs[index].type = 'output';
                return 'output';
            })
            .lower();
    }

    var Dummyrect = node
        .append('rect')
        .attr('class', 'CompOBodyDummy ' + newcomp.GUID)
        .attr('id', 'dummyRect_' + newcomp.GUID)
        .attr('rx', '3')
        .attr('ry', '3')
        //.attr("filter", "url(#f2")
        .attr('stroke-width', '1')
        .attr('stroke', 'black')
        .attr('width', newcomp.width)
        .attr('height', newcomp.height)
        .attr('fill', newcomp.fill);

    var cirGroup = node.append('g').attr('transform', () => {
        let x = newcomp.width;
        let y = newcomp.height;
        return 'translate(' + x.toString() + ',' + (y - 10).toString() + ')';
    });

    var log = cirGroup
        .append('text')
        .attr('id', 'nodeLog' + newcomp.GUID)
        .attr('class', 'nodeLog ' + newcomp.GUID)
        .attr('transform', 'translate(10, 10)')
        .text(newcomp.log.logText)
        .attr('fill', 'black')
        .style('display', 'none');

    var rect = node
        .append('rect')
        .attr('class', 'CompOBody ' + newcomp.GUID)
        .attr('id', newcomp.GUID)
        .attr('rx', '3')
        .attr('ry', '3')
        .attr('width', newcomp.width)
        .attr('height', newcomp.height)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', '1')
        .on('mousemove', function (event) {
            d3.select(event.currentTarget).attr('cursor', 'pointer');
        });

    var Titlegroup = node.append('g').attr('transform', () => {
        return 'translate(0, 15)';
    });

    var Title = Titlegroup.append('text')
        .attr('class', 'nodetitle node_title' + newcomp.GUID)
        .attr('id', 'option-' + newcomp.GUID)
        .text(newcomp.Name)
        .attr('fill', 'black')
        .attr('transform', 'translate(' + 20 + ', 0)');

    node.append('g').attr('id', 'optionListOption-' + newcomp.GUID);

    if (FromExisting == null) {
        var current_all_comp = reactContext.state.allComp.slice();
        console.log('Adding an option list' + newcomp);
        current_all_comp.push(newcomp);
        reactContext.setState({
            allComp: current_all_comp
        });
    }

    var current_comp_out = { ...reactContext.state.comp_output_edges };
    var current_comp_in = { ...reactContext.state.comp_input_edges };
    current_comp_out[newcomp.GUID] = new Array(newcomp.inputs.length);
    current_comp_in[newcomp.GUID] = new Array(newcomp.outputs.length);
    reactContext.setState({
        comp_input_edges: current_comp_in,
        comp_output_edges: current_comp_out
    });

    var current_components_selection = { ...reactContext.state.components_selection_data };
    current_components_selection[newcomp.GUID] = {
        x0: newcomp.X,
        y0: newcomp.Y,
        x1: newcomp.X + newcomp.width,
        y1: newcomp.Y + newcomp.height
    };
    reactContext.setState({
        components_selection_data: current_components_selection
    });
}

function submitOptionListEdit(compKey) {
    optionListComp = selectComp(compKey);
    OptionListValues = optionListComp['optionListValues'];
    $('textarea.textarea.optionlistProperties').text(function () {
        let optionListOptionsfromTextarea = '';
        let forTheHTMLpreview = '';
        for (const option in optionListComp['optionListValues']) {
            if (optionListComp['optionListValues'].hasOwnProperty(option)) {
                optionListOptionsfromTextarea +=
                    '<option value="' +
                    optionListComp['optionListValues'][option] +
                    '">' +
                    option +
                    '</option>';
                forTheHTMLpreview +=
                    option + '-->' + optionListComp['optionListValues'][option] + '<br>';
            }
        }
        $('div#propertiesBarLog').html(
            '<div id="success">Success:<br>' + forTheHTMLpreview + '</div>'
        );
        $('select#propertisBarSelecId').html(optionListOptionsfromTextarea);

        return JSON.stringify(optionListComp['optionListValues']);
    });

    $('textarea.textarea.optionlistProperties').on('focusout', function (e) {
        try {
            let thedict = JSON.parse($(this).val());
            OptionListValues = thedict;
            $('select#propertisBarSelecId').html(function () {
                let optionListOptionsfromTextarea = '';
                let forTheHTMLpreview = '';
                for (const option in thedict) {
                    if (thedict.hasOwnProperty(option)) {
                        optionListOptionsfromTextarea +=
                            '<option value="' + thedict[option] + '">' + option + '</option>';
                        forTheHTMLpreview += option + '-->' + thedict[option] + '<br>';
                    }
                }
                $('div#propertiesBarLog').html(
                    '<div id="success">Success:<br>' + forTheHTMLpreview + '</div>'
                );
                return optionListOptionsfromTextarea;
            });
        } catch {
            $('div#propertiesBarLog').html(
                '<div id="error">Error: check Dictionary syntax,<br>example : {"key1":value1, "key2":value2}</div>'
            );
        }
    });
}

function readyToGoSubmit(compKey) {
    optionListComp['optionListValues'] = OptionListValues;
    $('div#propertiesBarContents').html('');
    addOptionDropdownList(compKey);
}

export { CreateNewOptionList, submitOptionListEdit, readyToGoSubmit };
