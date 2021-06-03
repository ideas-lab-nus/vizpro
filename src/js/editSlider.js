import {SLIDER_START_POSITION, SLIDER_END_POSITION} from './constants.js';
import {selectComp, redrawDependents} from './functions.js';
import $ from "jquery";
var d3 = require('d3');

function submitSliderEdit(compKey) {
    var slider_component = selectComp(compKey);
    slider_component.min = parseFloat($("input#new_slider_min_value").val())
    slider_component.max = parseFloat($("input#new_slider_max_value").val())   
    slider_component.value = parseFloat($("input#new_slider_current_value").val())

    var slider_anchor_slope = (SLIDER_END_POSITION-SLIDER_START_POSITION)/(slider_component.max-slider_component.min);
    var slider_anchor_y_intersection = (SLIDER_END_POSITION-SLIDER_START_POSITION) - (slider_anchor_slope*slider_component.max); 
    var slider_anchor_currrent_position = (slider_anchor_slope * slider_component.value) + slider_anchor_y_intersection;
    console.log(SLIDER_END_POSITION-SLIDER_START_POSITION)
    console.log("slope : "+ slider_anchor_slope);
    console.log("y_intersect : " + slider_anchor_y_intersection);

    
    d3.select("rect#SliderAnchor_" + slider_component.GUID)
            .attr("transform", function () {
                return "translate(" + (slider_anchor_currrent_position).toString() + ",3)";
            });

            d3.select("#sliderValueText_"+slider_component.GUID.replace("SliderAnchor_",""))
        .text((slider_component.value).toFixed(6));
    
        redrawDependents(slider_component.GUID);

        $("div#propertiesBarContents").html("");
        
}

export {submitSliderEdit};