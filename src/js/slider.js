/*
───────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████─────────██████████─████████████───██████████████─████████████████───
─██░░░░░░░░░░██─██░░██─────────██░░░░░░██─██░░░░░░░░████─██░░░░░░░░░░██─██░░░░░░░░░░░░██───
─██░░██████████─██░░██─────────████░░████─██░░████░░░░██─██░░██████████─██░░████████░░██───
─██░░██─────────██░░██───────────██░░██───██░░██──██░░██─██░░██─────────██░░██────██░░██───
─██░░██████████─██░░██───────────██░░██───██░░██──██░░██─██░░██████████─██░░████████░░██───
─██░░░░░░░░░░██─██░░██───────────██░░██───██░░██──██░░██─██░░░░░░░░░░██─██░░░░░░░░░░░░██───
─██████████░░██─██░░██───────────██░░██───██░░██──██░░██─██░░██████████─██░░██████░░████───
─────────██░░██─██░░██───────────██░░██───██░░██──██░░██─██░░██─────────██░░██──██░░██─────
─██████████░░██─██░░██████████─████░░████─██░░████░░░░██─██░░██████████─██░░██──██░░██████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░████─██░░░░░░░░░░██─██░░██──██░░░░░░██─
─██████████████─██████████████─██████████─████████████───██████████████─██████──██████████─
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

import {redrawDependents, selectComp, updateAll, moveComponent} from './functions.js';
import {addEdge} from './handle';
import {uuidv4} from './handle.js';
var d3 = require('d3');

var theRequiredSliderGroup = "";

function addSlider(guid, min = 0, max = 100, step = 1.0) {
    var initSlider = {
        "GUID": guid,
        "X": 0,
        "Y": 0,
        "width": 150,
        "height": 30,
        "Name": "Slider",
        "ShortName": "Num",
        "Description": "Dummy Slider",
        "Message": "short description",
        "inputs": [],
        "outputs": [],
        "min": min,
        "max": max,
        "value": 0,
        "step": step,
        "typeName": null,
        "selection": "selectable",
        "view": "visible", // hidden , disabled
        "fill": "url(#grad1ient)",
        "rect": null,
        "type": "slider",
        "dftype": "shlow",
        "child": false
    };

    return initSlider;
} //End of addSlider

//TODO : save and retrieve the slider values. 
function CreateNewSlider(reactContext, FromExisting = null) {
    var SLIDER_END_POSITION = reactContext.state.SLIDER_END_POSITION;
    var SLIDER_START_POSITION = reactContext.state.SLIDER_START_POSITION;
    var newSlider;

    if (FromExisting != null) {
        newSlider = FromExisting;
        console.log(newSlider);
    } else {
        newSlider = addSlider(uuidv4("S"), 0, 100, 1.0);
        //Fix dict creation
        var guid = newSlider.GUID;
        var data = { ...reactContext.state.parent_child_matrix };
        data[guid] = [];
        reactContext.setState({
            parent_child_matrix: data,
        })
        newSlider.Name = "Numeric";
        newSlider.value = 50.00;
        newSlider.anchorValue = (SLIDER_END_POSITION - SLIDER_START_POSITION) / 2;
    }

    newSlider.fill = "#bdc4c8";
    var one_character_width = 8;
    var padding = 20;
    var titleMargin = 30;
    var titleMarginLeft = 5;
    newSlider.height = 20;
    newSlider.width = 250;
    newSlider.dftype = "shlow";

    var allContents = d3.select("#allCanvasContents");

    function update() {
        // node.attr("transform", d => `translate(${d.x},${d.y})`);
    }

    var dragHandler = d3.drag()
       .on("start", (event, d) => rect.attr("stroke", "red"))
       .on("drag", (event, d) => {           
            moveComponent(reactContext.state.clickedId, event.x, event.y);
            d.x = event.x; 
            d.y = event.y;
        })
       .on("end", (event, d) => {
           rect.attr("stroke", "#3a4c69");           
       })
       .on("start.update drag.update end.update", update)

    var cont = allContents.append("g")
        .attr("class", "slider")
        .attr("id", newSlider.GUID);

    console.log(cont);
 
    var genX;
    var genY;

    var node = cont.append("g")
        .attr("class", "SliderGroup " + newSlider.selection + " " + newSlider
            .view + " " + newSlider.GUID)
        .attr("id", "comp-" + newSlider.GUID)
        .attr("transform", () => {
            if (FromExisting == null) {
                genX = Math.random() * 500 + 200;
                genY = Math.random() * 500 + 200;
                newSlider.X = genX;
                newSlider.Y = genY;
                return "translate(" + genX + ", " + genY + ")";
            } else {
                return "translate(" + FromExisting.X + ", " + FromExisting.Y + ")";
            }
        })
        .data([{
            x: FromExisting ? FromExisting.X : genX,
            y: FromExisting ? FromExisting.Y : genY,
        }])
        .on("mousedown", () => {
            reactContext.setState({
                rectType: "slider",
            })
        })

    var OutputGroup = node.append('g');

    var out = OutputGroup.append('circle')
        .attr("cx", newSlider.width)
        .attr("cy", "10")
        .attr("fill", "gray")
        .attr("r", "5")
        .attr("stroke", "black")
        .attr("stroke-width", "2")
        .attr("id", "outputCir" + newSlider.GUID)
        .attr("class", "outputCir " + newSlider.GUID + " 0")
        .on("mousemove", function() {
            reactContext.setState({
                targetcircleIN: true,
            })
        })
        .on("mouseout", function() {
            reactContext.setState({
                targetcircleIN: false,
            })
        })      

    var rect = node.append('rect')
        .attr("class", "CompSBody " + newSlider.GUID)
        .attr("id", newSlider.GUID)
        .attr("rx", "3")
        .attr("ry", "3")
        .attr("stroke-width", "2")
        .attr("stroke", "#3a4c69")
        .attr("width", newSlider.width)
        .attr("height", newSlider.height)
        .attr("fill", '#dddddd')
        .on("mousemove", function() {
            var current_slider = { ...reactContext.state.selectedSliderComponent };            
            current_slider.rect = this;
            reactContext.setState({
                selectedSliderComponent: current_slider,
            })
            d3.select(current_slider.rect)
                .attr("cursor", "pointer");
        })
        .on("mouseout", function() {
            newSlider.rect = this;
        })
        .on("dblclick", () => {
        })
        .on("mousedown", () => {
            reactContext.setState({
                rectType: "slider",
            })
        });


    var ValueTextGroup = node.append("g")
        .attr("transform", () => {
            return ("translate(-80, 0)")
        });

    var ValueTextRect = ValueTextGroup.append("rect")
        .attr("cx", "0")
        .attr("cy", "0")
        .attr("rx", "3")
        .attr("ry", "3")
        .attr("fill", "black")
        .attr("width", "80")
        .attr("height", "20")
        .attr("opacity", "0.5");

    var ValueText = ValueTextGroup.append("text")
        .attr("id", "sliderValueText_" + newSlider.GUID)
        .attr("class", "sliderValueText " + newSlider.GUID)
        .attr("transform", "translate(2, 14)")
        .attr("fill", "white")
        .text(newSlider.value.toString());

    var Titlegroup = node.append("g")
        .attr("transform", () => {
            return "translate(0, 15)";
        });

    var Title = Titlegroup.append("text")
        .attr("class", "sliderTitle slider_title" + newSlider.GUID)
        .text(newSlider.Name)
        .attr("fill", "black")
        .attr("transform", "translate(" + titleMarginLeft / 2.0 + ", 0)")

    var SlidingGroup = node.append("g")
        .attr("transform", "translate(60, 0)");

    var slidingRectContainer = SlidingGroup.append("rect")
        // .attr("fill", "#576579")
        .attr("height", "3")
        .attr("width", "185")
        .attr("rx", "2")
        .attr("ry", "2")
        .attr("transform", "translate(0, 8)")
        .attr("stroke", "#677184")

    var slidingline = SlidingGroup.append("line")
        .attr("x1", "2")
        .attr("y1", "11")
        .attr("x2", "184")
        .attr("y2", "11")
        // .attr("d", "M 0,0 L 190,0")
        .attr("stroke", "gray")
        .attr("stroke-width", "1")

    function anchorUpdate() {
        slidingAnchor.attr("transform", d => `translate(${d.x},3)`);
    }

    var anchorDragHandler = d3.drag()
        .on("start", (event, d) => rect.attr("stroke", "red"))
        .on("drag", (event, d) => {
            var selectedSliderComponent = reactContext.state.selectedSliderComponent;
            var sliderRectId = reactContext.state.sliderRectId;

            var slider_anchor_value;
            var slider_value;

            var the_slider_slope = (selectedSliderComponent.max - selectedSliderComponent.min) / (SLIDER_END_POSITION - SLIDER_START_POSITION);
            var y_intersection = selectedSliderComponent.min - (the_slider_slope * SLIDER_START_POSITION);

            if (event.x <= SLIDER_START_POSITION) {
                console.log("before")
                slider_anchor_value = 0;
                slider_value = selectedSliderComponent.min;                
            } else if (event.x >= SLIDER_END_POSITION) {
                console.log("after")
                slider_anchor_value = SLIDER_END_POSITION - SLIDER_START_POSITION;
                slider_value = selectedSliderComponent.max;
            } else {
                console.log("middle")
                slider_anchor_value = event.x - SLIDER_START_POSITION;
                slider_value = event.x * the_slider_slope + y_intersection;
            }
            
            selectedSliderComponent.anchorValue = slider_anchor_value;
            d.x = slider_anchor_value; 

            d3.select("#sliderValueText_" + sliderRectId.replace("SliderAnchor_",""))
            .text((slider_value).toFixed(6));

            selectedSliderComponent.value = slider_value;
            reactContext.setState({
                selectedSliderComponent: selectedSliderComponent,
            })
            redrawDependents(selectedSliderComponent.GUID);
        })
        .on("end", (event, d) => rect.attr("stroke", "#3a4c69"))
        .on("start.update drag.update end.update", anchorUpdate)

    var slidingAnchor = SlidingGroup.append("rect")
        .attr("id", "SliderAnchor_" + newSlider.GUID)
        .attr("width", "10")
        .attr("height", "15")
        .attr("rx", "5")
        .attr("ry", "5")
        .attr("fill", "#3a4d69")
        .style("cursor", "pointer")
        .attr("transform", "translate(" + (newSlider.anchorValue).toString() + ", 3)")
        .data([{
            x: newSlider.anchorValue,
            y: 3,
        }])
        .on("mousemove", function(event) {
            d3.select(event.currentTarget)
                .attr("fill", "url(#gradientlsider)")
                .attr("cursor", "pointer")
                .attr("stroke", "black");
        })
        .on("mouseleave", function(event) {
            d3.select(event.currentTarget)
                .attr("fill", "#3a4d69")
                .attr("stroke", "none");
        })
        .on("mousedown", function() {
            reactContext.setState({
                sliderRectId: this.id,
                // SliderAnchorclicked: true,
                selectedSliderComponent: newSlider,
            })
        })
        .on("mouseup", function() {
            reactContext.setState({
                // SliderAnchorclicked: false,
                selectedSliderComponent: null,
            })
        })
        .call(anchorDragHandler);    

    //Make a copy of the current states
    var current_comp_out = { ...reactContext.state.comp_output_edges};
    var current_comp_in = { ...reactContext.state.comp_input_edges};
    current_comp_out[newSlider.GUID] = new Array(1);
    current_comp_in[newSlider.GUID] = new Array(1);
    reactContext.setState({
        comp_input_edges: current_comp_in,
        comp_output_edges: current_comp_out,
    })

    if (FromExisting == null) {
        //Make a copy of the array
        var current_all_comp = reactContext.state.allComp.slice();
        console.log("Adding a slider" + newSlider);
        current_all_comp.push(newSlider);
        reactContext.setState({
            allComp: current_all_comp,
        })
    }

    //Moving the slider body
    var allcomp = d3.selectAll("g.SliderGroup")
        .on('mousedown', function(d, i) {
            reactContext.setState({
                rectType: "slider",
            })
        });

    var current_components_selection = { ...reactContext.state.components_selection_data };
    current_components_selection[newSlider.GUID] = {
        "x0": newSlider.X, 
        "y0": newSlider.Y, 
        "x1": newSlider.X + newSlider.width, 
        "y1": newSlider.Y + newSlider.height,
    };  
    reactContext.setState({
        components_selection_data: current_components_selection,
    });
}

export {CreateNewSlider};
