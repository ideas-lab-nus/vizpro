/*
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████──────────██████─██████████─██████████████─██████──────────██████─██████████████─████████████████───██████████─████████████───
─██░░██████████████░░██─██░░░░░░██─██░░░░░░░░░░██─██░░██████████──██░░██─██░░░░░░░░░░██─██░░░░░░░░░░░░██───██░░░░░░██─██░░░░░░░░████─
─██░░░░░░░░░░░░░░░░░░██─████░░████─██░░██████░░██─██░░░░░░░░░░██──██░░██─██░░██████████─██░░████████░░██───████░░████─██░░████░░░░██─
─██░░██████░░██████░░██───██░░██───██░░██──██░░██─██░░██████░░██──██░░██─██░░██─────────██░░██────██░░██─────██░░██───██░░██──██░░██─
─██░░██──██░░██──██░░██───██░░██───██░░██████░░██─██░░██──██░░██──██░░██─██░░██─────────██░░████████░░██─────██░░██───██░░██──██░░██─
─██░░██──██░░██──██░░██───██░░██───██░░░░░░░░░░██─██░░██──██░░██──██░░██─██░░██──██████─██░░░░░░░░░░░░██─────██░░██───██░░██──██░░██─
─██░░██──██████──██░░██───██░░██───██░░██████░░██─██░░██──██░░██──██░░██─██░░██──██░░██─██░░██████░░████─────██░░██───██░░██──██░░██─
─██░░██──────────██░░██───██░░██───██░░██──██░░██─██░░██──██░░██████░░██─██░░██──██░░██─██░░██──██░░██───────██░░██───██░░██──██░░██─
─██░░██──────────██░░██─████░░████─██░░██──██░░██─██░░██──██░░░░░░░░░░██─██░░██████░░██─██░░██──██░░██████─████░░████─██░░████░░░░██─
─██░░██──────────██░░██─██░░░░░░██─██░░██──██░░██─██░░██──██████████░░██─██░░░░░░░░░░██─██░░██──██░░░░░░██─██░░░░░░██─██░░░░░░░░████─
─██████──────────██████─██████████─██████──██████─██████──────────██████─██████████████─██████──██████████─██████████─████████████───
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
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

import {
    returnCurveString,
    getlocationFromTransform,
    handleEdgeMovement,
    deleteComponent,
    popupMessage,
    moveComponent,
    selectComp
} from './functions.js';

var d3 = require('d3');

var temp_selected_xs = [];
var temp_selected_ys = [];

var min_selected_x = 0;
var min_selected_y = 0;

var max_selected_x = 0;
var max_selected_y = 0;

var selection_rectangle_group = null;
var selection_rectangle_group_rect = null;

var horizontal_alignment_box = null;
var vertical_alignment_box = null;

const horizontal_align_box = { W: 150.0, H: 30.0, color: '#373f46', opacity: 0.8, radius: 5.0 };
const vertical_align_box = { W: 30.0, H: 150.0, color: '#373f46', opacity: 0.8, radius: 5.0 };

var reactContext;

function manageGrid() {
    reactContext = this;
    var allContents = d3.select('#allCanvasContents');
    var optionListStarted = reactContext.state.optionListStarted;
    var startDrag = reactContext.state.startDrag;
    var mouseInsideOption = reactContext.state.mouseInsideOption;
    var selected_component_id = reactContext.state.selected_component_id;

    var mainGrid = allContents
        .style('backgroud-color', function () {
            var xGrid = this.offsetLeft;
            var yGrid = this.offsetTop;
            return 'white';
        })
        .on('mousedown', () => {
            if (optionListStarted && !startDrag && !mouseInsideOption) {
                d3.selectAll('rect.optionListoption').style('display', 'none');
                d3.selectAll('text.optionListoptiontext').style('display', 'none');
                reactContext.setState({
                    optionListStarted: false,
                    mouseInsideOption: false
                });
            }
        })
        .on('keydown', function (event) {
            if (event.keyCode === 46) {
                //delete
                if (reactContext.state.selected_components.length > 1) {
                    console.log('You will delete ');
                }
                var elem = selectComp(selected_component_id);
                if (elem == null) {
                    console.log('Something went wrong, invalid selected component');
                    return;
                }
                if (elem.type === 'fileUpload') {
                    if (
                        window.confirm(
                            'Are you sure you want to delete this file from the database? '
                        )
                    ) {
                        console.log('You should delete the file from the database now... ');
                        deleteComponent(selected_component_id);
                    } else {
                        console.log('not deleted. ');
                    }
                } else {
                    deleteComponent(selected_component_id);
                }
            }
        })
        .on('dblclick', function (event) {
            d3.select('div#buttonClickedname')
                .text('dblclick')
                .style('opacity', () => {
                    reactContext.setState({ messageshown: true });
                    return 1;
                });
            reactContext.setState({
                mousex: d3.pointer(event, allContents.node())[0],
                mousey: d3.pointer(event, allContents.node())[1]
            });
            d3.select('body').append('option');
        })
        .on('mousemove', function (event) {
            var mousex = d3.pointer(event, allContents.node())[0];
            var mousey = d3.pointer(event, allContents.node())[1];
            reactContext.setState({
                mousex: mousex,
                mousey: mousey
            });
            if (reactContext.state.startDrag) {
                var x = mousex - reactContext.state.componentClickX;
                var y = mousey - reactContext.state.componentClickY;
                moveComponent(reactContext.state.clickedId, x, y);
            }
            if (reactContext.state.edgeStarted) {
                d3.select('#' + reactContext.state.selectedcircleId)
                    .attr('d', function () {
                        return returnCurveString(
                            reactContext.state.initEdgex1,
                            reactContext.state.initEdgey1,
                            mousex,
                            mousey
                        );
                    })
                    .attr('fill', 'none')
                    .attr('stroke-opacity', '0.2')
                    .attr('interpolate', 'basis');
            }

            var textAreaRectId = reactContext.state.textAreaRectId;
            var optionlistRectid = reactContext.state.optionlistRectid;

            if (reactContext.state.textareaStarted) {
                console.log('in here');
                var selectedRect = getlocationFromTransform(
                    d3.select('g#comp-' + textAreaRectId).attr('transform')
                );
                var textA = d3
                    .select('#TextAreaSelector')
                    .style('position', 'absolute')
                    .style(
                        'height',
                        (
                            parseFloat(d3.select('rect#' + textAreaRectId).attr('height')) - 50
                        ).toString() + 'px'
                    )
                    .style('left', selectedRect[0] + 4 + 'px')
                    .style('top', selectedRect[1] + 17 + 'px')
                    .style('border', 'none');
            }
            if (reactContext.state.optionListStarted) {
                selectedRect = getlocationFromTransform(
                    d3.select('g#comp-' + optionlistRectid).attr('transform')
                );
                textA = d3
                    .select('#optionListSelectItems' + optionlistRectid)
                    .style('position', 'absolute')
                    .style(
                        'height',
                        (
                            parseFloat(d3.select('rect#' + optionlistRectid).attr('height')) - 50
                        ).toString() + 'px'
                    )
                    .style('left', selectedRect[0] + 20 + 'px')
                    .style('top', selectedRect[1] + 1 + 'px');
            }
            handleEdgeMovement(reactContext.state.StringAnchorId);
        })
        .on('mouseup', function () {
            if (reactContext.state.startDrag) {
                try {
                    //This needs to move to a separate function .
                    var clickedId = reactContext.state.clickedId;
                    var just_moved_component = selectComp(clickedId);
                    var current_components_selection = {
                        ...reactContext.state.components_selection_data
                    };
                    current_components_selection[clickedId] = {
                        x0: just_moved_component.X,
                        y0: just_moved_component.Y,
                        x1: just_moved_component.X + just_moved_component.width,
                        y1: just_moved_component.Y + just_moved_component.height
                    };
                    reactContext.setState({
                        components_selection_data: current_components_selection
                    });
                    just_moved_component = null;
                } catch (error) {
                    console.log(error);
                }
                reactContext.setState({
                    startDrag: false
                });
            }
            if (reactContext.state.edgeStarted) {
                reactContext.setState({
                    edgeStarted: false
                });
                d3.select('#' + reactContext.state.selectedcircleId).remove();
            }
            if (reactContext.state.StringAnchorclicked) {
                var StringAnchorId = reactContext.state.StringAnchorId;
                var modified_string_comp = selectComp(StringAnchorId);
                current_components_selection = { ...reactContext.state.components_selection_data };
                current_components_selection[StringAnchorId] = {
                    x0: modified_string_comp.X,
                    y0: modified_string_comp.Y,
                    x1: modified_string_comp.X + modified_string_comp.width,
                    y1: modified_string_comp.Y + modified_string_comp.height
                };
                reactContext.setState({
                    components_selection_data: current_components_selection,
                    StringAnchorclicked: false
                });
            }
            if (reactContext.state.SliderAnchorclicked) {
                reactContext.setState({
                    SliderAnchorclicked: false
                });
            }

            if (reactContext.state.selection_groud_selected) {
                reactContext.setState({
                    selection_groud_selected: false
                });
            }
        });
}
//END

var someCircle;
function highlightSelection(components_list, temp_selected_xs, temp_selected_ys) {
    var allContents = d3.select('#allCanvasContents');
    if (selection_rectangle_group != null) {
        selection_rectangle_group.remove();
        selection_rectangle_group = null;

        horizontal_alignment_box.remove();
        horizontal_alignment_box = null;

        vertical_alignment_box.remove();
        vertical_alignment_box = null;

        selection_rectangle_group_rect.remove();
        selection_rectangle_group_rect = null;

        someCircle.remove();
    }

    if (components_list.length > 0) {
        min_selected_x = Math.min(...temp_selected_xs);
        max_selected_x = Math.max(...temp_selected_xs) - min_selected_x;

        min_selected_y = Math.min(...temp_selected_ys);
        max_selected_y = Math.max(...temp_selected_ys) - min_selected_y;

        someCircle = allContents
            .append('circle')
            .attr('cx', (min_selected_x + min_selected_x + max_selected_x) / 2.0)
            .attr('cy', (min_selected_y + min_selected_y + max_selected_y) / 2.0)
            .attr('r', 10)
            .attr('fill', 'red');

        selection_rectangle_group = allContents
            .append('g')
            .attr(
                'transform',
                'translate(' + (min_selected_x - 20) + ',' + (min_selected_y - 20) + ')'
            )
            .attr('width', max_selected_x + 40)
            .attr('height', max_selected_y + 40);

        selection_rectangle_group_rect = selection_rectangle_group
            .append('rect')
            .attr('width', max_selected_x + 40)
            .attr('height', max_selected_y + 40)
            .attr('fill', 'gray')
            .attr('rx', 25)
            .attr('ry', 25)
            .attr('fill-opacity', 0.3)
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('stroke-opacity', 0.5)
            .style('cursor', 'pointer')
            .on('mousedown', () => {
                reactContext.setState({
                    selection_groud_selected: true
                });
            });
        horizontal_alignment_box = showHorizontalAlignment(selection_rectangle_group);
        vertical_alignment_box = showVerticalAlignment(selection_rectangle_group);
    }
}

function alignComponent(alignment) {
    reactContext.state.selected_components.forEach(element => {
        var this_comp = selectComp(element);
        if (alignment === 'left') {
            this_comp.X = min_selected_x;
        } else if (alignment === 'right') {
            this_comp.X = max_selected_x + min_selected_x - this_comp.width;
        } else if (alignment === 'center') {
            this_comp.X =
                (min_selected_x + min_selected_x + max_selected_x) / 2.0 - this_comp.width / 2.0;
        } else if (alignment === 'top') {
            //TO BE HANDLE LATER
        } else if (alignment === 'bottom') {
            //TO BE HANDLE LATER
        } else {
            //TO BE HANDLE LATER
        }

        moveComponent(element, this_comp.X, this_comp.Y);

        var current_components_selection = { ...reactContext.state.components_selection_data };
        current_components_selection[element].x0 = this_comp.X;
        current_components_selection[element].x1 = this_comp.X + this_comp.width;
        current_components_selection[element].y0 = this_comp.Y;
        current_components_selection[element].y1 = this_comp.Y + this_comp.height;
        reactContext.setState({
            components_selection_data: current_components_selection
        });
    });
}

function showHorizontalAlignment(selectionBox) {
    var horizAlignBox = selectionBox
        .append('rect')
        .attr('x', (selectionBox.attr('width') - horizontal_align_box.W) / 2.0)
        .attr('y', -horizontal_align_box.H - 5)
        .attr('width', horizontal_align_box.W)
        .attr('height', horizontal_align_box.H)
        .attr('fill', horizontal_align_box.color)
        .attr('rx', horizontal_align_box.radius)
        .attr('opacity', horizontal_align_box.opacity);

    selectionBox
        .append('foreignObject')
        .attr('id', 'halign_box')
        .attr('x', (selectionBox.attr('width') - horizontal_align_box.W) / 2.0)
        .attr('width', horizontal_align_box.W)
        .attr('height', horizontal_align_box.H)
        .attr('y', -horizontal_align_box.H - 5)
        .html(`&nbsp;<a href="#" onclick="alignComponent('left')"><i class="fa fa-align-left"></i></a>
            <a href="#" onclick="alignComponent('center')" ><i class="fa fa-align-center"></i></a>
            <a href="#"  onclick="alignComponent('right')"><i class="fa fa-align-right"></i></a>
            <a href="#"><i class="fa fa-pause" aria-hidden="true"></i><i class="fa fa-pause" aria-hidden="true" style="margin-left: 3px;"></i></a>
            `);
    return horizAlignBox;
}

function showVerticalAlignment(selectionBox) {
    var vertAlignBox = selectionBox
        .append('rect')
        .attr('y', (selectionBox.attr('height') - vertical_align_box.H) / 2.0)
        .attr('x', -vertical_align_box.W - 5)
        .attr('width', vertical_align_box.W)
        .attr('height', vertical_align_box.H)
        .attr('fill', vertical_align_box.color)
        .attr('opacity', vertical_align_box.opacity)
        .attr('rx', vertical_align_box.radius);

    selectionBox
        .append('foreignObject')
        .attr('id', 'valign_box')
        .attr('y', (selectionBox.attr('height') - vertical_align_box.H) / 2.0)
        .attr('width', vertical_align_box.W)
        .attr('height', vertical_align_box.H)
        .attr('x', -vertical_align_box.W - 5)
        .html(`<a id="valign_icon" href="#"><i class="fa fa-align-left fa-rotate-90"></i></a>
            <a  id="valign_icon" href="#"><i class="fa fa-align-center fa-rotate-90"></i></a>
            <a id="valign_icon"  href="#"><i class="fa fa-align-right fa-rotate-90"></i></a>
            <a id="valign_icon"  href="#" style="margin-left: 5px;" ><i class="fa fa-pause fa-rotate-90" aria-hidden="true"></i>
            <i class="fa fa-pause fa-rotate-90" aria-hidden="true"></i></a>
            `);
    return vertAlignBox;
}

export { manageGrid };
