import {
    uuidv4,
    addcomponent,
    selectComp,
    visualizeSpatialComponent,
    drawPlotComponent,
    redrawDependents,
    edit_move_mode,
    checkJSONValidity
} from '../functions.js';
import React from 'react';
import ReactJson from 'react-json-view';
import ReactDOM from 'react-dom';

import $ from 'jquery';
var d3 = require('d3');

//TODO : check this for the text overflow : https://bl.ocks.org/mbostock/1424037
function CreateNewPanel(reactContext, FromExisting = null) {
    var COMPONENT_RADIUS = reactContext.state.COMPONENT_RADIUS;
    var ANCHOR_WIDTH = reactContext.state.ANCHOR_WIDTH;
    var newcomp;

    if (FromExisting == null) {
        newcomp = addcomponent(uuidv4('C'), 1, 1);
        var guid = newcomp.GUID;
        var data = { ...reactContext.state.parent_child_matrix };
        data[guid] = [];
        reactContext.setState({
            parent_child_matrix: data
        });
        newcomp.Name = 'Panel';
        newcomp.width = 300;
    } else {
        newcomp = FromExisting;
        newcomp.value = newcomp.outputs[0].value;
    }

    newcomp.fill = 'white';
    newcomp.type = 'string';
    newcomp.dftype = 'shlow';

    newcomp.inputs[0].value = newcomp.value;

    var allContents = d3.select('#allCanvasContents');

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

    var rect = node
        .append('rect')
        .attr('class', 'CompPBody ' + newcomp.GUID)
        .attr('id', newcomp.GUID)
        .attr('rx', COMPONENT_RADIUS)
        .attr('ry', COMPONENT_RADIUS)
        .attr('y', '-15')
        .attr('width', () => {
            return 10 + newcomp.Name.length * 6;
        })
        .attr('height', newcomp.height + 10)
        .attr('fill', '#525252')
        .attr('fill-opacity', '1.0')
        .on('mouseover', function (event) {
            d3.select(event.currentTarget).attr('cursor', 'pointer');
        });

    var InputGroup = node.append('g');
    for (let index = 0; index < newcomp.inputs.length; index++) {
        var inp = InputGroup.append('circle')
            .lower()
            .attr('cx', '0')
            .attr('cy', newcomp.height / 2)
            .attr('fill', 'gray')
            .attr('r', '5')
            .attr('stroke', 'black')
            .attr('stroke-width', '2')
            .attr('id', 'inputCir' + newcomp.GUID + '_' + index)
            .attr('class', 'inputCir ' + newcomp.GUID + ' ' + index)
            .attr('type', function () {
                newcomp.inputs[index].circle = this;
                if (FromExisting == null) {
                    newcomp.inputs[index].type = 'text';
                }
                return 'input';
            })
            .on('mousemove', function () {
                reactContext.setState({
                    targetcircleIN: true
                });
            })
            .on('mouseout', function () {
                reactContext.setState({
                    targetcircleIN: false
                });
            })
            .lower();
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
            .on('mousemove', function () {
                reactContext.setState({
                    targetcircleIN: true
                });
            })
            .on('mouseout', function () {
                reactContext.setState({
                    targetcircleIN: false
                });
            })
            .lower();
    }

    var rectstatus = node
        .append('rect')
        .attr('class', 'CompPBody statusRect ' + newcomp.GUID)
        .attr('id', 'statusRect' + newcomp.GUID)
        .attr('rx', COMPONENT_RADIUS)
        .attr('ry', COMPONENT_RADIUS)
        .attr('x', '50')
        .attr('y', newcomp.height - 20)
        .attr('width', newcomp.width - 50)
        .attr('height', 35)
        .attr('fill', '#525252')
        .attr('fill-opacity', '1.0');

    var Panel_staus = node
        .append('foreignObject')
        .attr('id', 'panel_status_' + newcomp.GUID)
        .attr('class', 'panel_status ' + newcomp.GUID)
        .html('Type : ' + newcomp.inputs[0].type)
        .attr('x', '55')
        .attr('y', newcomp.height + 2)
        .attr('width', newcomp.width - 50)
        .attr('height', 15)
        .attr('fill', 'white');

    var Panel_staus2 = node
        .append('foreignObject')
        .attr('id', 'panel_edit_mode' + newcomp.GUID)
        .attr('class', 'panel_edit_mode ' + newcomp.GUID)
        .html(() => {
            return (
                '<h5 id="changeEditMoveMode_' +
                newcomp.GUID +
                '" style="color:white; margin-top:1px" ">Drag</h5>'
            );
        })
        .attr('x', newcomp.width - 30)
        .attr('y', newcomp.height + 2)
        .attr('width', 30)
        .attr('height', 15)
        .attr('fill', 'white')
        .on('click', () => edit_move_mode(newcomp.GUID, 0))
        .attr('style', 'cursor: pointer;');

    var Dummyrect = node
        .append('rect')
        .attr('class', 'CompPBodyDummy ' + newcomp.GUID)
        .attr('id', 'dummyRect_' + newcomp.GUID)
        .attr('rx', COMPONENT_RADIUS)
        .attr('ry', COMPONENT_RADIUS)
        //.attr("filter", "url(#f2")
        .attr('stroke-width', '1')
        .attr('stroke', 'black')
        .attr('width', newcomp.width)
        .attr('height', newcomp.height)
        .attr('fill', newcomp.fill);

    var Titlegroup = node.append('g').attr('transform', () => {
        return 'translate(0, 15)';
    });

    var Title = Titlegroup.append('text')
        .attr('class', 'nodetitle node_title' + newcomp.GUID)
        .attr('id', 'nodeTitle' + newcomp.GUID)
        .attr('data-testid', 'node-title')
        .text(newcomp.Name)
        .attr('fill', 'white')
        .attr('x', 5)
        .attr('y', -18);

    var textbody = node
        .append('foreignObject')
        .attr('id', 'textbody_' + newcomp.GUID)
        .attr('data-testid', 'textbody')
        .attr('class', 'textbody ' + newcomp.GUID)
        .attr('height', newcomp.height - ANCHOR_WIDTH - 5)
        .html(function () {
            if (newcomp.inputs[0].type === 'html' || newcomp.inputs[0].type === 'input') {
                return newcomp.inputs[0].value;
            } else if (newcomp.inputs[0].type === 'text') {
                return '<pre>' + newcomp.inputs[0].value + '</pre>';
            }
        })
        .attr('transform', 'translate(5, 5)')
        .attr('width', newcomp.width - 4 - ANCHOR_WIDTH);

    var data2;
    if (newcomp.inputs[0].type === 'json') {
        var compKey = newcomp.GUID;
        try {
            $('foreignObject#textbody_' + compKey).html(
                '<div id="jsonTreeViewer' + compKey + '"></div>'
            );
            var jsonStruct = typeof(newcomp.inputs[0].value) === 'string'
                                    ? JSON.parse(newcomp.inputs[0].value)
                                    : newcomp.inputs[0].value;
            // var jsonStruct = JSON.parse(newcomp.inputs[0].value);
            ReactDOM.render(<ReactJson src={jsonStruct} />, 
                document.getElementById('jsonTreeViewer' + compKey))
        } catch (e) {
            d3.select('foreignObject#textbody_' + compKey)
                .text(e)
                .attr('style', 'color: red');
        } 
    } else if (newcomp.inputs[0].type === 'plot') {
        data2 = JSON.parse(newcomp.inputs[0].value);
        drawPlotComponent(data2, newcomp);
    } else if (newcomp.inputs[0].type === 'spatial') {
        data2 = JSON.parse(newcomp.inputs[0].value);
        var unparseData = newcomp.inputs[0].value;
        visualizeSpatialComponent(data2, unparseData, newcomp);
    }

    //White Text Box
    var rect2 = node
        .append('rect')
        .attr('class', 'CompPBody ' + newcomp.GUID + ' a')
        .attr('id', 'overlaySelector' + newcomp.GUID)
        .attr('rx', COMPONENT_RADIUS)
        .attr('ry', COMPONENT_RADIUS)
        .attr('y', '0')
        .attr('width', newcomp.width - 5)
        .attr('height', newcomp.height - 5)
        .attr('fill', 'white') //"#ffeec7")
        .attr('fill-opacity', '0.15')
        .style('display', 'block')
        .on('mousemove', function (event) {
            d3.select(event.currentTarget).attr('cursor', 'pointer');
        });

    var resize = d3
        .drag()
        .on('start', (event, d) => Dummyrect.attr('stroke', 'red'))
        .on('end', (event, d) => Dummyrect.attr('stroke', '#3a4c69'))
        .on('drag', function (event, d) {
            var anchorMouseYpos = reactContext.state.anchorMouseYpos;
            var anchorMouseXpos = reactContext.state.anchorMouseXpos;
            var StringAnchorId = reactContext.state.StringAnchorId;
            var newHeight = event.y - anchorMouseYpos;

            if (newHeight <= 50) {
                newHeight = 52;
            }
            var newWidth = event.x - anchorMouseXpos;
            if (newWidth <= 300) {
                newWidth = 301;
            }

            d.x = newWidth;
            d.y = newHeight;
            d.width = newWidth;
            d.height = newHeight;

            var thisComp = selectComp(StringAnchorId);
            thisComp.height = newHeight;
            thisComp.width = newWidth;

            d3.select('rect#dummyRect_' + StringAnchorId)
                .attr('height', newHeight)
                .attr('width', newWidth);

            d3.select('rect#' + StringAnchorId).attr('height', newHeight);

            d3.select('rect.CompPBody.' + StringAnchorId + '.a').attr('width', newWidth);

            d3.select('rect#statusRect' + StringAnchorId)
                .attr('y', newHeight - 20)
                .attr('width', newWidth - 50);

            d3.select('foreignObject#panel_status_' + StringAnchorId)
                .attr('y', newHeight + 2)
                .attr('width', newWidth - 50);

            d3.select('rect#overlaySelector' + StringAnchorId).attr('height', newHeight - 5);

            d3.select('rect.xyAnchor.' + StringAnchorId)
                .attr('x', thisComp.width - ANCHOR_WIDTH)
                .attr('y', thisComp.height - ANCHOR_WIDTH);

            d3.select('foreignObject#textbody_' + StringAnchorId)
                .attr('height', thisComp.height - ANCHOR_WIDTH - 5)
                .attr('width', thisComp.width - 4 - ANCHOR_WIDTH);

            d3.select('foreignObject#panel_edit_mode' + StringAnchorId)
                .attr('y', newHeight + 2)
                .attr('x', newWidth - 30);

            d3.select('g#logCirGroup_' + StringAnchorId).attr('transform', () => {
                var x = thisComp.width;
                var y = thisComp.height;
                return 'translate(' + x.toString() + ',' + (y - 10).toString() + ')';
            });
            d3.select('circle#outputCir' + StringAnchorId + '_0')
                .attr('cy', thisComp.height / 2)
                .attr('cx', thisComp.width);

            d3.select('circle#inputCir' + StringAnchorId + '_0').attr('cy', thisComp.height / 2);

            for (const [comp, child] of Object.entries(reactContext.state.parent_child_matrix)) {
                if (child[0] === undefined) continue
                if (child[0][1] === StringAnchorId) {
                    redrawDependents(comp);
                    return;
                }
            }
            
            if (thisComp.inputs[0].type === 'plot') {
                var data = JSON.parse(thisComp.inputs[0].value);
                drawPlotComponent(data, thisComp);
                return;
            }
            
            console.log("Couldn't locate panel parent to redraw")
        });

    var rectanchorXY = node
        .append('rect')
        .attr('class', 'xyAnchor ' + newcomp.GUID)
        .data([
            {
                x: newcomp.width - ANCHOR_WIDTH,
                y: newcomp.height - ANCHOR_WIDTH,
                width: ANCHOR_WIDTH,
                height: ANCHOR_WIDTH
            }
        ])
        .attr('width', ANCHOR_WIDTH)
        .attr('height', ANCHOR_WIDTH)
        .attr('x', newcomp.width - ANCHOR_WIDTH)
        .attr('y', newcomp.height - ANCHOR_WIDTH)
        .attr('fill-opacity', 0.01)
        .attr('rx', COMPONENT_RADIUS)
        .attr('ry', COMPONENT_RADIUS)
        .on('mousedown', event => {
            reactContext.setState({
                anchorMouseXpos: d3.pointer(event)[0] - newcomp.width,
                anchorMouseYpos: d3.pointer(event)[1] - newcomp.height,
                StringAnchorId: newcomp.GUID
            });
        })
        .call(resize);

    if (FromExisting == null) {
        var current_all_comp = reactContext.state.allComp.slice();
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

function submitPanelEdit(reactContext, compKey) {
    const guidList = [];
    reactContext.state.allComp.forEach(e => guidList.push(e.GUID));
    var plotError = false;
    if (guidList.includes(compKey)) {
        var StringComp = selectComp(compKey);
        var textVal = $('textarea.textarea.stringProperties').val();
        StringComp.inputs[0].type = $("input[name='type']:checked").val();
        $('foreignObject#panel_status_' + compKey).text('Type : ' + StringComp.inputs[0].type);
        if (StringComp.inputs[0].type === 'json') { 
            try {
                $('foreignObject#textbody_' + compKey).html(
                    '<div id="jsonTreeViewer' + compKey + '"></div>'
                );
                var jsonStruct = checkJSONValidity(textVal);
                ReactDOM.render(<ReactJson src={jsonStruct} />, 
                    document.getElementById('jsonTreeViewer' + compKey))
            } catch (e) {
                d3.select('foreignObject#textbody_' + compKey)
                    .text(e)
                    .attr('style', 'color: red');
            }   
        } else if (StringComp.inputs[0].type === 'html') {
            d3.select('foreignObject#textbody_' + compKey)
                .html(textVal)
                .attr('fill', 'black')
                .attr('style', 'color: black');
        } else if (StringComp.inputs[0].type === 'plot') {
            try {
                var data = JSON.parse(textVal);
                drawPlotComponent(data, StringComp);
            } catch (e) {
                plotError = true;
            }
        } else {
            d3.select('foreignObject#textbody_' + compKey)
                .text(textVal)
                .attr('fill', 'black')
                .attr('style', 'color: black');;
        }

        StringComp.outputs[0].value = textVal;
        StringComp.inputs[0].value = textVal;
        StringComp.value = textVal;
        StringComp.Name = $('input.stringPanel.Name').val();

        redrawDependents(compKey);
    }
    if (plotError) {
        $('div#propertiesBarLog').html(
            '<div id="error" data-testid="error">Incorrect format for plot panel. Check Help for more details</div>'
        );
    } else {
        $('div#propertiesBarContents').html('');
    }
}

export { CreateNewPanel, submitPanelEdit };
