/*
───────────────────────────────────────────────────────────────────────────────────────────────
─██████─────────██████████████─████████──████████─██████████████─██████──██████─██████████████─
─██░░██─────────██░░░░░░░░░░██─██░░░░██──██░░░░██─██░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░░░██─
─██░░██─────────██░░██████░░██─████░░██──██░░████─██░░██████░░██─██░░██──██░░██─██████░░██████─
─██░░██─────────██░░██──██░░██───██░░░░██░░░░██───██░░██──██░░██─██░░██──██░░██─────██░░██─────
─██░░██─────────██░░██████░░██───████░░░░░░████───██░░██──██░░██─██░░██──██░░██─────██░░██─────
─██░░██─────────██░░░░░░░░░░██─────████░░████─────██░░██──██░░██─██░░██──██░░██─────██░░██─────
─██░░██─────────██░░██████░░██───────██░░██───────██░░██──██░░██─██░░██──██░░██─────██░░██─────
─██░░██─────────██░░██──██░░██───────██░░██───────██░░██──██░░██─██░░██──██░░██─────██░░██─────
─██░░██████████─██░░██──██░░██───────██░░██───────██░░██████░░██─██░░██████░░██─────██░░██─────
─██░░░░░░░░░░██─██░░██──██░░██───────██░░██───────██░░░░░░░░░░██─██░░░░░░░░░░██─────██░░██─────
─██████████████─██████──██████───────██████───────██████████████─██████████████─────██████─────
───────────────────────────────────────────────────────────────────────────────────────────────
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
import $ from 'jquery';
var d3 = require('d3');

function onMinimizeClick() {
    d3.select('#maximizeUpperBar').transition().style('display', 'block');

    d3.select('#minimizeUpperBar').style('display', 'none');

    d3.select('#TopPropertiesBar').transition().duration(200).style('top', '-60px');

    d3.select('#LeftPropertiesBar').transition().duration(200).style('top', '0px');

    d3.select('#PropertiesBar').transition().duration(200).style('top', '0px');

    d3.select('#LeftPropertiesBarSelector').transition().duration(200).style('top', '0px');

    d3.select('#PropertiesBarSelector').transition().duration(200).style('top', '0px');

    d3.select('.canvas_container').transition().duration(200).style('top', '0px');

    d3.select('#maximizeUpperBar')
        .transition()
        .duration(200)
        .style('right', '300px')
        .style('top', '61px');

    d3.select('#minimizeUpperBar')
        .transition()
        .duration(200)
        .style('right', '300px')
        .style('top', '61px');
}

function onMaximizeClick() {
    d3.select('#maximizeUpperBar').style('display', 'none');

    d3.select('#minimizeUpperBar').style('display', 'block');

    d3.select('#TopPropertiesBar').transition().duration(200).style('top', '0px');

    d3.select('#LeftPropertiesBar').transition().duration(200).style('top', '30px');

    d3.select('#PropertiesBar').transition().duration(200).style('top', '30px');

    d3.select('#LeftPropertiesBarSelector').transition().duration(200).style('top', '30px');

    d3.select('#PropertiesBarSelector').transition().duration(200).style('top', '30px');

    d3.select('.canvas_container').transition().duration(200).style('top', '30px');

    d3.select('#maximizeeUpperBar')
        .transition()
        .duration(200)
        .style('right', '0px')
        .style('top', '38px');

    d3.select('#minimizeUpperBar')
        .transition()
        .duration(200)
        .style('right', '0px')
        .style('top', '0px');

    d3.select('i#tomaximize').transition().duration(200).style('transform', 'rotate(180deg)');
}

function manageCanvas() {
    const reactContext = this;
    var svgContainer = d3.select('svg');
    var allContents = svgContainer.append('g').attr('id', 'allCanvasContents');

    var currentLeftColWidth = reactContext.state.currentLeftColWidth;
    var currentTopBarHeight = reactContext.state.currentTopBarHeight;
    var currentRightColWidth = reactContext.state.currentRightColWidth;
    var messageshown = reactContext.state.messageshown;
    var leftColumnIsSelected = reactContext.state.leftColumnIsSelected;
    var rightColIsdisplayed = reactContext.state.rightColIsdisplayed;
    var rightColumnIsSelected = reactContext.state.rightColumnIsSelected;
    var leftColIsdisplayed = reactContext.state.leftColIsdisplayed;

    var backgroundRectangle = allContents
        .append('rect')
        .attr('fill', 'url(#img122)')
        .attr('x', -1000)
        .attr('y', -1000)
        .attr('width', 6000)
        .attr('height', 6000)
        .style('cursor', 'default');

    allContents.append('g').attr('id', 'allPaths');

    svgContainer.call(
        d3
            .zoom()
            .filter(function (event) {
                return (
                    !(
                        reactContext.state.startDrag ||
                        reactContext.state.StringAnchorclicked ||
                        reactContext.state.SliderAnchorclicked ||
                        reactContext.state.edgeStarted ||
                        reactContext.state.selection_groud_selected
                    ) && event.button === 0
                );
            })
            .on('zoom', function (event) {
                if (!reactContext.state.startDrag) {
                    reactContext.setState({
                        canvasX: event.transform.x,
                        canvasY: event.transform.y
                    });
                    allContents.attr('transform', event.transform);
                }
            })
    );

    svgContainer.on('dblclick.zoom', null);

    $('div#definedComp').html(function () {
        var somearr = reactContext.state.udo_names;
        var text = '';
        for (const cat in reactContext.state.cats) {
            if (reactContext.state.cats.hasOwnProperty(cat)) {
                text += '<div id="catcard">';
                text +=
                    '<div id="catHead" style="background-color:' +
                    reactContext.state.cats[cat] +
                    '">' +
                    cat +
                    '</div>';
                text += '<div id="catbody">';
                // eslint-disable-next-line no-loop-func
                somearr.forEach(function (element, i) {
                    if (reactContext.state.udo_cats[i] === cat) {
                        text +=
                            '<button id="addComp" name="' +
                            element +
                            '" shName="' +
                            reactContext.state.udo_shortNames[i] +
                            '" desc=\'' +
                            reactContext.state.udo_desc[i] +
                            '\' type="' +
                            reactContext.state.udo_types[i] +
                            '" dftype="' +
                            reactContext.state.udo_dftypes[i] +
                            '" class="standardcat button" ><span style="background-color:' +
                            reactContext.state.udo_fill[i] +
                            ';color:' +
                            reactContext.state.udo_fill[i] +
                            ';border-radius:3px;">||</span> ' +
                            element +
                            '</button>';
                    }
                });
                text += '</div></div>';
            }
        }
        return text;
    });

    d3.select('div#LeftPropertiesBar')
        .style('width', () => {
            return currentLeftColWidth + 'px';
        })
        .style('top', () => {
            return currentTopBarHeight.toString() + 'px';
        });
    d3.select('div#LeftPropertiesBarSelector')
        .style('top', () => {
            return currentTopBarHeight.toString() + 'px';
        })
        .style('left', currentLeftColWidth + 'px');

    // d3.select('div#PropertiesBar')
    //     .style('width', () => {
    //         return currentRightColWidth + 'px';
    //     })
    //     .style('top', () => {
    //         return currentTopBarHeight.toString() + 'px';
    //     });
    d3.select('div#PropertiesBarSelector')
        .style('top', () => {
            return currentTopBarHeight.toString() + 'px';
        })
        .style('right', currentRightColWidth + 'px');

    d3.select('div#TopPropertiesBar').style('height', () => {
        return currentTopBarHeight + 'px';
    });

    var rightColAnchor = d3.select('div#PropertiesBarSelector').on('mousedown', function () {
        currentRightColWidth = parseInt($('div#PropertiesBar').css('width').replace('px', ''));
        rightColumnIsSelected = true;
    });

    var leftColAnchor = d3.select('div#LeftPropertiesBarSelector').on('mousedown', function () {
        currentLeftColWidth = parseInt($('div#LeftPropertiesBar').css('width').replace('px', ''));
        leftColumnIsSelected = true;
    });

    d3.select('body')
        .on('mousemove', function (event) {
            d3.select(event.currentTarget).style('cursor', 'auto');
            currentRightColWidth = window.innerWidth - 16 - event.clientX;
            currentLeftColWidth = event.clientX;
            if (rightColumnIsSelected) {
                d3.select('div#PropertiesBar').style('width', () => {
                    if (currentRightColWidth >= 50) {
                        if (!rightColIsdisplayed)
                            d3.select('div#PropertiesBar').style('display', 'block');
                        d3.select('div#PropertiesBarSelector').style('background-color', '#252525');
                        rightColIsdisplayed = true;
                        return currentRightColWidth.toString() + 'px';
                    } else {
                        rightColIsdisplayed = false;
                        d3.select('div#PropertiesBar').style('display', 'none');
                        d3.select('div#PropertiesBarSelector').style('background-color', '#1abc9c');
                    }
                });
                d3.select('div#PropertiesBarSelector').style('right', () => {
                    if (currentRightColWidth >= 50) {
                        return currentRightColWidth.toString() + 'px';
                    } else {
                        return (0).toString() + 'px';
                    }
                });
            }

            if (leftColumnIsSelected) {
                d3.select('body').style('cursor', 'ew-resize');
                d3.select('div#LeftPropertiesBar').style('width', () => {
                    if (currentLeftColWidth >= 50) {
                        if (!leftColIsdisplayed)
                            d3.select('div#LeftPropertiesBar').style('display', 'block');
                        d3.select('div#LeftPropertiesBarSelector').style(
                            'background-color',
                            '#252525'
                        );
                        leftColIsdisplayed = true;
                        return currentLeftColWidth.toString() + 'px';
                    } else {
                        leftColIsdisplayed = false;
                        d3.select('div#LeftPropertiesBar').style('display', 'none');
                        d3.select('div#LeftPropertiesBarSelector').style(
                            'background-color',
                            '#1abc9c'
                        );
                    }
                });
                d3.select('div#LeftPropertiesBarSelector').style('left', () => {
                    if (currentLeftColWidth >= 50) {
                        return currentLeftColWidth.toString() + 'px';
                    } else {
                        return (0).toString() + 'px';
                    }
                });
            }

            if (messageshown) {
                let trns = d3.transition().duration(500).ease(d3.easeLinear);

                d3.select('div#Addedmessage')
                    .transition(trns)
                    .style('opacity', () => {
                        messageshown = false;
                        return 0;
                    });

                d3.select('div#buttonClickedname')
                    .transition(trns)
                    .style('opacity', () => {
                        messageshown = false;
                        return 0;
                    });
            }
        })
        .on('mouseup', () => {
            if (rightColumnIsSelected) rightColumnIsSelected = false;

            if (leftColumnIsSelected) leftColumnIsSelected = false;
        });
}

export { onMaximizeClick, onMinimizeClick, manageCanvas };
