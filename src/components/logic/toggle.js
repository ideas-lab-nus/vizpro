/*
───────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████████████─██████████████─██████████████─██████─────────██████████████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██─────────██░░░░░░░░░░██─
─██████░░██████─██░░██████░░██─██░░██████████─██░░██████████─██░░██─────────██░░██████████─
─────██░░██─────██░░██──██░░██─██░░██─────────██░░██─────────██░░██─────────██░░██─────────
─────██░░██─────██░░██──██░░██─██░░██─────────██░░██─────────██░░██─────────██░░██████████─
─────██░░██─────██░░██──██░░██─██░░██──██████─██░░██──██████─██░░██─────────██░░░░░░░░░░██─
─────██░░██─────██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─██░░██─────────██░░██████████─
─────██░░██─────██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─██░░██─────────██░░██─────────
─────██░░██─────██░░██████░░██─██░░██████░░██─██░░██████░░██─██░░██████████─██░░██████████─
─────██░░██─────██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─
─────██████─────██████████████─██████████████─██████████████─██████████████─██████████████─
───────────────────────────────────────────────────────────────────────────────────────────
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
import { addcomponent, uuidv4 } from './functions.js';
var d3 = require('d3');

function CreateNewToggle(reactContext, FromExisting = null) {
    var newcomp;

    if (FromExisting == null) {
        newcomp = addcomponent(uuidv4('C'), 0, 1);
        var guid = newcomp.GUID;
        var data = { ...reactContext.state.parent_child_matrix };
        data[guid] = [];
        reactContext.setState({
            parent_child_matrix: data
        });
    } else {
        newcomp = FromExisting;
    }

    newcomp.fill = '#2c3e50';
    newcomp.Name = 'False';
    var padding = 20;
    var titleMargin = 30;
    newcomp.height = 20;
    newcomp.type = 'toggle';
    newcomp.dftype = 'shlow';

    // TODO : get the longest text in the component. and set the width based on this.
    newcomp.width = 80; //newcomp.Name.length * one_character_width + titleMarginLeft;

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
                newcomp.inputs[index].circle = reactContext.state.fromCircle;
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
        .attr('class', 'CompTBodyDummy ' + newcomp.GUID)
        .attr('id', 'dummyRect_' + newcomp.GUID)
        .attr('rx', '3')
        .attr('ry', '3')
        .attr('stroke-width', '1')
        .attr('stroke', 'black')
        .attr('width', newcomp.width)
        .attr('height', newcomp.height)
        .attr('fill', newcomp.fill);

    var cirGroup = node.append('g').attr('transform', () => {
        var x = newcomp.width;
        var y = newcomp.height;
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

    var Titlegroup = node.append('g').attr('transform', () => {
        return 'translate(0, 15)';
    });

    var Title = Titlegroup.append('text')
        .attr('class', 'nodetitle node_title' + newcomp.GUID)
        .text(newcomp.Name)
        .attr('fill', '#ecf0f1')
        .attr(
            'transform',
            'translate(' + (newcomp.width / 2.0 - newcomp.Name.length * 4.0).toString() + ', 0)'
        );

    var rect = node
        .append('rect')
        .attr('class', 'CompTBody ' + newcomp.GUID)
        .attr('id', newcomp.GUID)
        .attr('rx', '3')
        .attr('ry', '3')
        .attr('width', newcomp.width)
        .attr('height', newcomp.height)
        .attr('fill', newcomp.fill)
        .attr('fill-opacity', '0.01')
        .on('mousemove', function (event) {
            d3.select(event.currentTarget)
                .attr('cursor', 'pointer');
        })
        .on('mouseout', function (event) {
            d3.select(event.currentTarget).attr('fill', newcomp.fill);
        });

    newcomp.value = newcomp.Name;

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

export { CreateNewToggle };
