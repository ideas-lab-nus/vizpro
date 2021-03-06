import { 
    uuidv4, 
    redrawDependents, 
    selectComp 
} from '../functions.js';
import $ from 'jquery';
var d3 = require('d3');
var SLIDER_LENGTH;

const countDecimals = x => {
    if (Math.floor(x.valueOf()) === x.valueOf()) return 0;

    var str = x.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
}

function addSlider(guid, min = 0, max = 100, step = 1.0) {
    var initSlider = {
        GUID: guid,
        X: 0,
        Y: 0,
        width: 150,
        height: 30,
        Name: 'Slider',
        ShortName: 'Num',
        Description: 'Dummy Slider',
        Message: 'short description',
        inputs: [],
        outputs: [],
        min: min,
        max: max,
        value: 0,
        step: step,
        typeName: null,
        selection: 'selectable',
        view: 'visible', // hidden , disabled
        fill: 'url(#grad1ient)',
        rect: null,
        type: 'slider',
        dftype: 'shlow',
        child: false
    };

    return initSlider;
} //End of addSlider

function CreateNewSlider(reactContext, FromExisting = null) {
    SLIDER_LENGTH = reactContext.state.SLIDER_LENGTH;
    var newSlider;

    if (FromExisting != null) {
        newSlider = FromExisting;
    } else {
        newSlider = addSlider(uuidv4('S'), 0, 100, 1.0);
        //Fix dict creation
        var guid = newSlider.GUID;
        var data = { ...reactContext.state.parent_child_matrix };
        data[guid] = [];
        reactContext.setState({
            parent_child_matrix: data
        });
        newSlider.Name = 'Numeric';
        newSlider.value = 50.0;
        newSlider.anchorValue = SLIDER_LENGTH / 2;
    }

    newSlider.fill = '#bdc4c8';
    var titleMarginLeft = 5;
    newSlider.height = 20;
    newSlider.width = 250;
    newSlider.dftype = 'shlow';

    var allContents = d3.select('#allCanvasContents');

    var cont = allContents.append('g').attr('class', 'slider').attr('id', newSlider.GUID);

    var genX;
    var genY;

    var node = cont
        .append('g')
        .attr(
            'class',
            'SliderGroup ' + newSlider.selection + ' ' + newSlider.view + ' ' + newSlider.GUID
        )
        .attr('id', 'comp-' + newSlider.GUID)
        .attr('transform', () => {
            if (FromExisting == null) {
                genX = Math.random() * 500 + 200;
                genY = Math.random() * 500 + 200;
                newSlider.X = genX;
                newSlider.Y = genY;
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
        ])
        .on('mousedown', () => {
            reactContext.setState({
                rectType: 'slider'
            });
        });

    var OutputGroup = node.append('g');

    var out = OutputGroup.append('circle')
        .attr('cx', newSlider.width)
        .attr('cy', '10')
        .attr('fill', 'gray')
        .attr('r', '5')
        .attr('stroke', 'black')
        .attr('stroke-width', '2')
        .attr('id', 'outputCir' + newSlider.GUID)
        .attr('class', 'outputCir ' + newSlider.GUID + ' 0')
        .on('mousemove', function () {
            reactContext.setState({
                targetcircleIN: true
            });
        })
        .on('mouseout', function () {
            reactContext.setState({
                targetcircleIN: false
            });
        });

    var rect = node
        .append('rect')
        .attr('class', 'CompSBody ' + newSlider.GUID)
        .attr('id', newSlider.GUID)
        .attr('rx', '3')
        .attr('ry', '3')
        .attr('stroke-width', '2')
        .attr('stroke', '#3a4c69')
        .attr('width', newSlider.width)
        .attr('height', newSlider.height)
        .attr('fill', '#dddddd')
        .on('mousemove', function () {
            var current_slider = { ...reactContext.state.selectedSliderComponent };
            current_slider.rect = this;
            reactContext.setState({
                selectedSliderComponent: current_slider
            });
            d3.select(current_slider.rect).attr('cursor', 'pointer');
        })
        .on('mouseout', function () {
            newSlider.rect = this;
        })
        .on('dblclick', () => {})
        .on('mousedown', () => {
            reactContext.setState({
                rectType: 'slider'
            });
        });

    var ValueTextGroup = node.append('g').attr('transform', () => {
        return 'translate(-80, 0)';
    });

    var ValueTextRect = ValueTextGroup.append('rect')
        .attr('cx', '0')
        .attr('cy', '0')
        .attr('rx', '3')
        .attr('ry', '3')
        .attr('fill', 'black')
        .attr('width', '80')
        .attr('height', '20')
        .attr('opacity', '0.5');

    var ValueText = ValueTextGroup.append('text')
        .attr('id', 'sliderValueText_' + newSlider.GUID)
        .attr('class', 'sliderValueText ' + newSlider.GUID)
        .attr('transform', 'translate(2, 14)')
        .attr('fill', 'white')
        .text(newSlider.value.toString());

    var Titlegroup = node.append('g').attr('transform', () => {
        return 'translate(0, 15)';
    });

    var Title = Titlegroup.append('text')
        .attr('class', 'sliderTitle slider_title' + newSlider.GUID)
        .text(newSlider.Name)
        .attr('fill', 'black')
        .attr('transform', 'translate(' + titleMarginLeft / 2.0 + ', 0)');

    var SlidingGroup = node.append('g').attr('transform', 'translate(60, 0)');

    var slidingRectContainer = SlidingGroup.append('rect')
        .attr('height', '3')
        .attr('width', '185')
        .attr('rx', '2')
        .attr('ry', '2')
        .attr('transform', 'translate(0, 8)')
        .attr('stroke', '#677184');

    var slidingline = SlidingGroup.append('line')
        .attr('x1', '2')
        .attr('y1', '11')
        .attr('x2', '184')
        .attr('y2', '11')
        .attr('stroke', 'gray')
        .attr('stroke-width', '1');

    function anchorUpdate() {
        slidingAnchor.attr('transform', d => `translate(${d.x},3)`);
    }

    var anchorDragHandler = d3
        .drag()
        .on('start', (event, d) => rect.attr('stroke', 'red'))
        .on('drag', (event, d) => {
            var selectedSliderComponent = reactContext.state.selectedSliderComponent;
            var sliderRectId = reactContext.state.sliderRectId;
            var min = selectedSliderComponent.min;
            var max = selectedSliderComponent.max;
            var step = selectedSliderComponent.step;

            var slider_anchor_value;
            var slider_value;

            var slope = (max - min) / SLIDER_LENGTH;

            if (event.x <= 0) {
                slider_anchor_value = 0;
                slider_value = min;
            } else if (event.x >= SLIDER_LENGTH) {
                slider_anchor_value = SLIDER_LENGTH;
                slider_value = max;
            } else {
                var scaledValue = event.x * slope;
                var rounded = Math.round(scaledValue/step) * step;
                slider_value = rounded + min;
                slider_anchor_value = slider_value / slope;
            }

            selectedSliderComponent.anchorValue = slider_anchor_value;
            d.x = slider_anchor_value;

            d3.select('#sliderValueText_' + sliderRectId.replace('SliderAnchor_', '')).text(
                slider_value.toFixed(countDecimals(step))
            );

            selectedSliderComponent.value = slider_value;
            reactContext.setState({
                selectedSliderComponent: selectedSliderComponent
            });
            redrawDependents(selectedSliderComponent.GUID);
        })
        .on('end', (event, d) => rect.attr('stroke', '#3a4c69'))
        .on('start.update drag.update end.update', anchorUpdate);

    var slidingAnchor = SlidingGroup.append('rect')
        .attr('id', 'SliderAnchor_' + newSlider.GUID)
        .attr('data-testid', 'slider-anchor')
        .attr('width', '10')
        .attr('height', '15')
        .attr('rx', '5')
        .attr('ry', '5')
        .attr('fill', '#3a4d69')
        .style('cursor', 'pointer')
        .attr('transform', 'translate(' + newSlider.anchorValue.toString() + ', 3)')
        .data([
            {
                x: newSlider.anchorValue,
                y: 3
            }
        ])
        .on('mousemove', function (event) {
            d3.select(event.currentTarget)
                .attr('fill', 'url(#gradientlsider)')
                .attr('cursor', 'pointer')
                .attr('stroke', 'black');
        })
        .on('mouseleave', function (event) {
            d3.select(event.currentTarget).attr('fill', '#3a4d69').attr('stroke', 'none');
        })
        .on('mousedown', function () {
            reactContext.setState({
                sliderRectId: this.id,
                selectedSliderComponent: newSlider
            });
        })
        .on('mouseup', function () {
            reactContext.setState({
                selectedSliderComponent: null
            });
        })
        .call(anchorDragHandler);

    newSlider.slidingAnchor = slidingAnchor
    //Make a copy of the current states
    var current_comp_out = { ...reactContext.state.comp_output_edges };
    var current_comp_in = { ...reactContext.state.comp_input_edges };
    current_comp_out[newSlider.GUID] = new Array(1);
    current_comp_in[newSlider.GUID] = new Array(1);
    reactContext.setState({
        comp_input_edges: current_comp_in,
        comp_output_edges: current_comp_out
    });

    if (FromExisting == null) {
        //Make a copy of the array
        var current_all_comp = reactContext.state.allComp.slice();
        current_all_comp.push(newSlider);
        reactContext.setState({
            allComp: current_all_comp
        });
    }

    //Moving the slider body
    var allcomp = d3.selectAll('g.SliderGroup').on('mousedown', function (d, i) {
        reactContext.setState({
            rectType: 'slider'
        });
    });

    var current_components_selection = { ...reactContext.state.components_selection_data };
    current_components_selection[newSlider.GUID] = {
        x0: newSlider.X,
        y0: newSlider.Y,
        x1: newSlider.X + newSlider.width,
        y1: newSlider.Y + newSlider.height
    };
    reactContext.setState({
        components_selection_data: current_components_selection
    });
}

/**
 * Double click the slider => the property bar appears
 * Handles the event when the Save button on the property bar is clicked
 * @param {String} compKey The ID of the clicked components
 */
function submitSliderEdit(reactContext, compKey) {
    const guidList = [];
    reactContext.state.allComp.forEach(e => guidList.push(e.GUID));
    if (guidList.includes(compKey)) {
        var slider_component = selectComp(compKey);

        const minInput = parseFloat($('input#new_slider_min_value').val());
        const maxInput = parseFloat($('input#new_slider_max_value').val());
        const stepInput = parseFloat($('input#new_slider_step_value').val());
        const currValInput = parseFloat($('input#new_slider_current_value').val());

        if (isNaN(minInput) || isNaN(maxInput) || isNaN(currValInput)) {
            $('div#propertiesBarLog').html(`
                <div id="error" data-testid="error">Please enter all fields.</div>
            `)
        } else if (minInput >= maxInput) {
            $('div#propertiesBarLog').html(`
                <div id="error" data-testid="error">The min value must be smaller than the max value.</div>
            `)
        } else if (minInput > currValInput || maxInput < currValInput) {
            $('div#propertiesBarLog').html(`
                <div id="error" data-testid="error">The current value must be between the min value and the max value.</div>
            `)
        } else if (stepInput <= 0) {
            $('div#propertiesBarLog').html(`
                <div id="error" data-testid="error">The step value must be a positive value.</div>
            `)
        } else {
            slider_component.min = minInput;
            slider_component.max = maxInput;
            slider_component.step = stepInput;
            slider_component.value = currValInput;

            var slope = (maxInput - minInput) / SLIDER_LENGTH;
            var slider_anchor_value = currValInput / slope;
            slider_component.anchorValue = slider_anchor_value;

            slider_component.slidingAnchor
                .data([
                    {
                        x: slider_anchor_value,
                        y: 3
                    }
                ])
                
            d3.select('rect#SliderAnchor_' + slider_component.GUID).attr('transform', function () {
                return 'translate(' + slider_anchor_value.toString() + ',3)';
            });

            d3.select('#sliderValueText_' + slider_component.GUID.replace('SliderAnchor_', '')).text(
                slider_component.value.toFixed(countDecimals(currValInput))
            );

            redrawDependents(slider_component.GUID);
            $('div#propertiesBarContents').html('');
        }
    } else {
        $('div#propertiesBarContents').html('');
    }
}

export { CreateNewSlider, submitSliderEdit };
