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

//IMPORTANT : Fix for lines, 592, 617, 646 

import {CreateNewComponent} from './component.js';
import Plotly from 'plotly';
import $ from "jquery";

var d3 = require('d3');

var is_there_item_copied = false;
var copiedItem = null;

var is_there_item_cut = false;

var new_copied_component = null;
var cut_component_name = null;
var cut_component_sName = null;
var cut_component_dfType = null;
var cut_component_type = null;

var allComp;
var IDLE_COLOR;
var ACTIVE_COLOR;
var ERROR_COLOR;
var COMPONENT_RADIUS;
var allEdges;
var comp_input_edges;
var comp_output_edges;
var edge_comp_matrix;
var parent_child_matrix;
var parent_child_matrix_fast_check;
var root_components;
var components_selection_data;
var selected_components;
var runDeep;
var StringAnchorclicked;
var StringAnchorType;
var StringAnchorId;
var XANCHOR;
var YANCHOR;
var ANCHOR_WIDTH;
var SLIDER_START_POSITION;
var SLIDER_END_POSITION;
var anchorMouseXpos;
var anchorMouseYpos;
var SliderAnchorclicked;
var selectedSliderComponent;
var dragX;
var dragY;
var sliderRectId;
var initPos;
var startDrag;
var clickedId;
var rectType;
var deltaX;
var deltaY;
var clicked;
var edgeStarted;
var targetcircleIN;
var selectedcircleId;
var targetcircleId;
var selectedSliderAnchorId;
var xGrid;
var yGrid;
var mousex;
var mousey;
var initEdgex2;
var initEdgey2;
var componentClickX;
var componentClickY;
var textareaStarted;
var textAreaRectId;
var optionListStarted;
var optionlistRectid;
var justSelected;
var mouseInsideOption;
var is_component_selected;
var selected_component_id;
var rightColumnIsSelected;
var leftColumnIsSelected;
var topColumnIsSelected;
var rightColIsdisplayed;
var leftColIsdisplayed;
var is_edge_selected;
var currentTopBarHeight;
var currentLeftColWidth;
var currentRightColWidth;
var defVars;
var messageshown;
var Output;
var Input;
var toCircle;
var fromCircle;
var udo_names;
var udo_types;
var udo_desc;
var udo_shortNames;
var udo_inputs;
var udo_outputs;
var udo_fill;
var udo_dftypes;
var udo_cats;
var udo_subcats;
var cats;
var scats;

function dummyToSetState() {
    var reactContext = this;
    allComp = reactContext.state.allComp;
    IDLE_COLOR = reactContext.state.IDLE_COLOR
    ACTIVE_COLOR = reactContext.state.ACTIVE_COLOR
    ERROR_COLOR = reactContext.state.ERROR_COLOR
    COMPONENT_RADIUS = reactContext.state.COMPONENT_RADIUS
    allEdges = reactContext.state.allEdges
    comp_input_edges = reactContext.state.comp_input_edges
    comp_output_edges = reactContext.state.comp_output_edges
    edge_comp_matrix = reactContext.state.edge_comp_matrix
    parent_child_matrix = reactContext.state.parent_child_matrix
    parent_child_matrix_fast_check = reactContext.state.parent_child_matrix_fast_check
    root_components = reactContext.state.root_components
    components_selection_data = reactContext.state.components_selection_data
    selected_components = reactContext.state.selected_components
    runDeep = reactContext.state.runDeep
    StringAnchorclicked = reactContext.state.StringAnchorclicked
    StringAnchorType = reactContext.state.StringAnchorType
    StringAnchorId = reactContext.state.StringAnchorId
    XANCHOR = reactContext.state.XANCHOR
    YANCHOR = reactContext.state.YANCHOR
    ANCHOR_WIDTH = reactContext.state.ANCHOR_WIDTH
    SLIDER_START_POSITION = reactContext.state.SLIDER_START_POSITION
    SLIDER_END_POSITION = reactContext.state.SLIDER_END_POSITION
    anchorMouseXpos = reactContext.state.anchorMouseXpos
    anchorMouseYpos = reactContext.state.anchorMouseYpos
    SliderAnchorclicked = reactContext.state.SliderAnchorclicked
    selectedSliderComponent = reactContext.state.selectedSliderComponent
    dragX = reactContext.state.dragX
    dragY = reactContext.state.dragY
    sliderRectId = reactContext.state.sliderRectId
    initPos = reactContext.state.initPos
    startDrag = reactContext.state.startDrag
    clickedId = reactContext.state.clickedId
    rectType = reactContext.state.rectType
    deltaX = reactContext.state.deltaX
    deltaY = reactContext.state.deltaY
    clicked = reactContext.state.clicked
    edgeStarted = reactContext.state.edgeStarted
    targetcircleIN = reactContext.state.targetcircleIN
    selectedcircleId = reactContext.state.selectedcircleId
    targetcircleId = reactContext.state.targetcircleId
    selectedSliderAnchorId = reactContext.state.selectedSliderAnchorId
    xGrid = reactContext.state.xGrid
    yGrid = reactContext.state.yGrid
    mousex = reactContext.state.mousex
    mousey = reactContext.state.mousey
    initEdgex2 = reactContext.state.initEdgex2
    initEdgey2 = reactContext.state.initEdgey2
    componentClickX = reactContext.state.componentClickX
    componentClickY = reactContext.state.componentClickY
    textareaStarted = reactContext.state.textareaStarted
    textAreaRectId = reactContext.state.textAreaRectId
    optionListStarted = reactContext.state.optionListStarted
    optionlistRectid = reactContext.state.optionlistRectid
    justSelected = reactContext.state.justSelected
    mouseInsideOption = reactContext.state.mouseInsideOption
    is_component_selected = reactContext.state.is_component_selected
    selected_component_id = reactContext.state.selected_component_id
    rightColumnIsSelected = reactContext.state.rightColumnIsSelected
    leftColumnIsSelected = reactContext.state.leftColumnIsSelected
    topColumnIsSelected = reactContext.state.topColumnIsSelected
    rightColIsdisplayed = reactContext.state.rightColIsdisplayed
    leftColIsdisplayed = reactContext.state.leftColIsdisplayed
    is_edge_selected = reactContext.state.is_edge_selected
    currentTopBarHeight = reactContext.state.currentTopBarHeight
    currentLeftColWidth = reactContext.state.currentLeftColWidth
    currentRightColWidth = reactContext.state.currentRightColWidth
    defVars = reactContext.state.defVars
    messageshown = reactContext.state.messageshown
    udo_names = reactContext.state.udo_names
    udo_types = reactContext.state.udo_types
    udo_desc = reactContext.state.udo_desc
    udo_shortNames = reactContext.state.udo_shortNames
    udo_inputs = reactContext.state.udo_inputs
    udo_outputs = reactContext.state.udo_outputs
    udo_fill = reactContext.state.udo_fill
    udo_dftypes = reactContext.state.udo_dftypes
    udo_cats = reactContext.state.udo_cats
    udo_subcats = reactContext.state.udo_subcats
    cats = reactContext.state.cats
    scats = reactContext.state.scats
}

function KeyPress(event, e) {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
        popupMessage("Ctrl+z");

    };
    if (evtobj.keyCode == 89 && evtobj.ctrlKey) {
        popupMessage("Ctrl+y");
    }
    if (evtobj.keyCode == 67 && evtobj.ctrlKey) {//Ctrl + C copy
        popupMessage("Ctrl+c");
        is_there_item_copied = true;
        is_there_item_cut = false;

        copiedItem = clickedId;

    }
    if (evtobj.keyCode == 88 && evtobj.ctrlKey) {
        popupMessage("Ctrl+x");
        is_there_item_cut = true;
        is_there_item_copied = false;

        copiedItem = clickedId;
        new_copied_component = selectComp(copiedItem)
        cut_component_name = new_copied_component.Name;
        cut_component_sName = new_copied_component.shortName;
        cut_component_dfType = new_copied_component.dfType;
        cut_component_type = new_copied_component.type;

        deleteComponent(clickedId);

    };
    if (evtobj.keyCode == 86 && evtobj.ctrlKey) {
        if (is_there_item_copied) {
            new_copied_component = selectComp(copiedItem);
            if (new_copied_component.type == "component")
                CreateNewComponent(null, new_copied_component.Name, {
                    "shortName": new_copied_component.shortName,
                    "dfType": new_copied_component.dfType,
                    "X": mousex,
                    "Y": mousey
                });

        } else if (is_there_item_cut) {
            if (cut_component_type == "component")
                CreateNewComponent(null, cut_component_name, {
                    "shortName": cut_component_sName,
                    "dfType": cut_component_dfType,
                    "X": mousex,
                    "Y": mousey
                });
        }
        popupMessage("Ctrl+v");
    }

    if (evtobj.keyCode == 83 && evtobj.ctrlKey) {
        e.preventDefault();
        saveFile();
    }

    if (evtobj.keyCode == 78 && evtobj.ctrlKey) {

        $(document).on("keydown", (ev) => {
            ev.preventDefault();
        });
        var answer = window.confirm("You are leaving, Save changes ?")
        if (answer) {
            saveFile();
            window.location.href = '/def';
        } else {
            window.location.href = "/def";
        }


    }

} // End of KeyPress

document.onkeydown = KeyPress;

$("a#saveTheDef").on("click", function(e) {
    e.preventDefault();
    saveFile();

});

function addcomponent(guid, n_inputs = 4, n_outputs = 5, inputsIn = 5 * ["input"], outputsIn = 5 * ["output"]) {
    var inputs = []
    var outputs = []
    for (let index = 0; index < n_inputs; index++) {

        try {
            inputs.push({
                "id": index,
                "circle": null,
                "textObj": null,
                "Name": inputsIn[index].name,
                "ShortName": inputsIn[index].shortName,
                "Description": inputsIn[index].desc,
                "Message": "short description",
                "type": "item",
                "datatype": "int",
                "value": inputsIn[index].default_value,
            })
        } catch {
            inputs.push({
                "id": index,
                "circle": null,
                "textObj": null,
                "Name": "",
                "ShortName": "",
                "Description": "",
                "Message": "short description",
                "type": "item",
                "datatype": "int",
                "value": "",
            })
        }

    }

    for (let index = 0; index < n_outputs; index++) {
        try {
            outputs.push({
                "id": index,
                "circle": null,
                "textObj": null,
                "Name": outputsIn[index],
                "ShortName": outputsIn[index],
                "Description": outputsIn[index].desc,
                "Message": "short description",
                "type": "item",
                "datatype": "int",
                "value": null,
            })
        } catch {
            outputs.push({
                "id": index,
                "circle": null,
                "textObj": null,
                "Name": "",
                "ShortName": "",
                "Description": "",
                "Message": "short description",
                "type": "item",
                "datatype": "int",
                "value": null,
            })
        }

    }
    var initComp = {
        "GUID": guid,
        "X": 0,
        "Y": 0,
        "width": 120,
        "height": 50,
        "Name": "Component",
        "ShortName": "Comp",
        "Description": "Dummy component",
        "Message": "short description",
        "numInputs": 3,
        "numOutputs": 2,
        "typeName": null,
        "logo": null,
        "type": "component",
        "state": "unbound",
        "status": "idle",
        "selection": "selectable",
        "view": "visible", // hidden , disabled
        "fill": "#303952",
        "rect": null,
        "inputs": inputs,
        "outputs": outputs,
        "dftype": "dp",
        "value": "no value",
        "child": false,
        "log": {
            "logText": " Log message output.. "
        },
        "optionListValues": {
            "Option_0": 0,
            "Option_1": 1,
            "Option_2": 2.0,
        }
    };

    return initComp;
} //End of addcomponent

function selectComp(value, by = "GUID") {
    let toreturn = null
    allComp.forEach(element => {
        if (element[by] === value) {
            toreturn = element
        }
    });
    return toreturn;
} // End of selectComp

function CreatePathes(theEdge) {
    d3.select("g#allPaths")
        .append("path")
        .attr("d", function() {
            return theEdge.d;

        }).attr('stroke', "black")
        .attr("stroke-width", "5")
        .attr("id", theEdge.path_id)
        // .attr("stroke-dasharray", "2 2")
        .attr("stroke", "rgb(48, 57, 82)")
        .attr("stroke-linecap", "round")
        .attr("fill", "none")
        .attr("stroke-opacity", "0.6").lower();

    updateAll();
} //End of CreatePathes

function updateAll(FromExisting = null) {
    allEdges.forEach(element => {

        var thisD = $("path#" + element.path_id).attr("d");
        // //////console.log(thisD)
        d3.select("#" + element.path_id)
            .attr("stroke-width", "5")
            .attr("d", function() {
                return thisD.replace("L", "C");
            })
            .attr("stroke", "black")
            .attr("stroke-linecap", "round")
            .attr("stroke-opacity", "0.5").lower();


        d3.select("g#allPaths")
            .append("circle")
            .attr("id", "C" + element.path_id)
            .attr("r", 5)
            .attr("fill", "red")
            .attr("opacity", 0.3)
            .attr("style", "display:none")
            .on("mouseover", function() {
                d3.select(this).attr("opacity", 0.8)
                d3.select("path#" + element.path_id)
                    .attr("stroke", "red")
                    .attr("stroke-width", 4)
                    .attr("stroke-dasharray", "5 5")
            })
            .on("mouseout", function() {
                d3.select(this)
                    .attr("opacity", 0.3)
                d3.select("path#" + element.path_id)
                    .attr("stroke", "black")
                    .attr("stroke-width", 5)
                    .attr("stroke-dasharray", 0)
            })
            .on("mousedown", function() {

                deleteEdge(element.path_id);
                d3.select(this)
                    .remove()

                d3.select("path#" + element.path_id)
                    .remove();

            })
        try {
            handleEdgeMovement(element.toComp[1])
        } catch (error) {}

        try {
            handleEdgeMovement(element.fromComp[1])
        } catch {}
    });
} // End of updateAll

function toMoveEdgeEnds(mainObj) {
    mainObj.inputs.forEach(input => {});
} // End of toMoveEdgeEnds

function returnCurveString(x1, y1, x2, y2) {
    var coalignValue = 10.0;
    if (x2 < x1) {
        coalignValue = Math.abs(y2 - y1) / 5.0 + (Math.abs(x2 - x1) * 1.5);
    } else {
        coalignValue = Math.abs(y2 - y1) / 5.0;
    }
    return "M " + x1 + "," + y1 + " " +
        "C " + (((x1 + x2) / 2.0) + coalignValue).toString() + "," + y1 +
        " " + (((x1 + x2) / 2.0) - coalignValue).toString() + "," + y2 +
        " " + x2 + "," + y2;
} // End of returnCurveString

function getlocationFromTransform(trnsformText) {
    return trnsformText.replace("translate(", "").replace(")", "").split(",").map(function(item) {
        return parseFloat(item, 10);
    });
} // End of getlocationFromTransform

function ViewListRedrawing() {
    d3.selectAll("option#someSelection").on("click", function(e) {
        var id = this.classList[1];
        var selectedItems = [];
        var componentValue = [];
        var selectedOptions = $("option.listViewOption." + id);
        for (let i = 0; i < selectedOptions.length; i++) {
            var currentValue = selectedOptions[i].value;
            var parsedcurrentValue;
            if (selectedOptions[i].selected) {
                if (isNaN(currentValue)) {
                    parsedcurrentValue = currentValue;
                } else if (currentValue.indexOf(".") == -1) {
                    parsedcurrentValue = parseInt(currentValue);
                } else {
                    parsedcurrentValue = parseFloat(currentValue);
                }

                componentValue.push([parsedcurrentValue, 1]);
                selectedItems.push(parsedcurrentValue);

            } else {

                if (isNaN(currentValue)) {
                    parsedcurrentValue = currentValue;
                } else if (currentValue.indexOf(".") == -1) {
                    parsedcurrentValue = parseInt(currentValue);
                } else {
                    parsedcurrentValue = parseFloat(currentValue);
                }
                componentValue.push([parsedcurrentValue, 0])
            }
        }
        var the_selected_optionList_component = selectComp(id);
        the_selected_optionList_component.outputs[0].value = JSON.stringify(selectedItems);
        the_selected_optionList_component.value = componentValue;

        redrawDependents(id);
    });
} // End of ViewListRedrawing

function getAllChildes(parent, n = 0) {
    let par = selectComp(parent)
    let text = ""
    if (parent_child_matrix[parent].length > 0) // This means that this parent has already childs
    {
        parent_child_matrix[parent].forEach(function(element, i) { //iterate through all those childs. 
            text += "\n" + repeatStringNumTimes("\t", n) + par.Name + "--> " + getAllChildes(element[1], n + 1);
        });
    } else {
        text = par.Name;
    }

    return text
} // End of getAllChildes

function repeatStringNumTimes(string, times) {
    if (times < 0)
        return "";
    if (times === 1)
        return string;
    else
        return string + repeatStringNumTimes(string, times - 1);
} // End of repeatStringNumTimes

function addOptionDropdownList(compId) {
    var optionListComp = selectComp(compId)
    var n = 0;
    var node = d3.select("g#comp-" + compId);
    var optionsGroup = d3.select("g#optionListOption-" + compId);
    optionsGroup.html("");
    for (const option in optionListComp.optionListValues) {
        if (optionListComp.optionListValues.hasOwnProperty(option)) {
            n += 1;
            var optionRect = optionsGroup.append('text')
                .attr("fill", "black")
                .attr("class", "optionListoptiontext " + optionListComp.GUID + " " + optionListComp.optionListValues[option] + " " + option)
                .attr("value", option)
                .attr("key", optionListComp.optionListValues[option])
                .attr("width", "180")
                .text(option)
                .attr("y", 15 + (20 * n))
                .attr("x", 5);
        }
    }
    var n = 0;
    for (const option in optionListComp.optionListValues) {
        if (optionListComp.optionListValues.hasOwnProperty(option)) {
            n += 1;
            var optionRect = optionsGroup.append('rect')
                .attr("fill", "white")
                .attr("class", "optionListoption " + optionListComp.GUID + " " + optionListComp.optionListValues[option] + " " + option)
                .attr("value", option)
                .attr("key", optionListComp.optionListValues[option])
                .attr("id", "optionListoption")
                .attr("width", "180")
                .attr("height", "20")
                .attr("y", 20 * n)
                .attr("opacity", "0.3")
                .attr("stroke", "gray")
                .attr("onclick", "changeOptionListFinalValue(this)")
                .on("mouseover", function() {
                    mouseInsideOption = true;
                })
                .on("mouseout", function() {
                    mouseInsideOption = false;
                })

        }
    }
} // End of addOptionDropdownList

function changeOptionListFinalValue(el) {
    console.log(el.attributes.value.value);
    var thisComp = selectComp(el.classList[1])
    thisComp.value = el.attributes.key.value
    thisComp.Name = el.attributes.value.value

    thisComp.outputs[0].value = el.classList[2]

    d3.select("text#option-" + el.classList[1])
        .text(el.classList[3])
        .attr("fill", "black");

    redrawDependents(el.classList[1]);
} // End of changeOptionListFinalValue

function showDropDownList(hh) {
    addOptionDropdownList(hh)
} // End of showDropDownList

function redrawDependents(parent) {
    // on a parent changes, only draws all the children tree .
    // all the components --- inputs outpts object (to be sent later to the backend should be modified as well)
    // shallow values should be updated instantaniously 
    console.log('inside redraw dep function');
    let par = selectComp(parent);
    console.log(parent_child_matrix);

    if (parent_child_matrix[parent].length > 0) // This means that this parent has already childs
    {

        if (par.dftype == "shlow") {
            parent_child_matrix[parent].forEach(function(element, i) { //iterate through all those childs.
                let ch = selectComp(element[1]);
                if (par.type == "slider") {
                    ch.inputs[element[2]].value = par.value;
                } else if (par.type == "string" || par.type == "fileUpload") {
                    ch.inputs[element[2]].value = par.outputs[element[0]].value;
                } else if (par.type == "listView") {
                    ch.inputs[element[2]].value = par.outputs[element[0]].value;
                    console.log(ch.inputs[element[2]])
                    ch.inputs[element[2]].type = "json";
                } else if (par.type == "toggle" || par.type == "optionList") {
                    ch.inputs[element[2]].value = par.value;
                } else if (par.type == "component") {
                    try {
                        //calculateShallow(par.GUID);
                        ch.inputs[element[2]].value = par.outputs[element[0]].value;
                        ch.inputs[element[2]].type = par.outputs[element[0]].type;
                        componentStatus(par.GUID, ACTIVE_COLOR);

                    } catch (error) {
                        console.log(error)
                        componentStatus(par.GUID, ERROR_COLOR);
                    }

                }
                updatShallowCompRender(ch);
                redrawDependents(ch.GUID);

                console.log("case1 _ parent is shallow")
            });
        } else if (par.dftype == "dp") {
            console.log("case 2")
            par.state = "unbound"
            parent_child_matrix[parent].forEach(function(element, i) { //iterate through all those childs.
                let ch = selectComp(element[1]);
                if (par.type == "component" && runDeep == true) {
                    runDeep = false;

                    if (par.state == "unbound") {
                        //calculateDeep(par.GUID);
                        par.state = "active"
                    }


                }
                ch.inputs[element[2]].value = par.outputs[element[0]].value;
                ch.inputs[element[2]].type = par.outputs[element[0]].type;
                console.log(element)
                console.log(par.outputs[element[0]])

                componentStatus(par.GUID, ACTIVE_COLOR);
                updatShallowCompRender(ch);
                redrawDependents(ch.GUID);
            });

        }

    }

} // End of redrawDependents

function updatShallowCompRender(ch) {
    console.log(ch)
    if (ch.type == "string") {
        if (ch.inputs[0].type == "html") {
            $("foreignObject#textbody_" + ch.GUID).html(ch.inputs[0].value)

        } else if (ch.inputs[0].type == "json") {
            /*
            To be handle later
            $("foreignObject#textbody_" + ch.GUID).html('<div id="jsonTreeViewer' + ch.GUID + '"></div>')
            jsonView.format(ch.inputs[0].value, "div#jsonTreeViewer" + ch.GUID);
            */

        } else if (ch.inputs[0].type == "text") {
            $("foreignObject#textbody_" + ch.GUID).html("<pre>" + ch.inputs[0].value + "</pre>");

        } else if (ch.inputs[0].type == "htmlLoad") {

            $("foreignObject#textbody_" + ch.GUID).html('<div id="3DViewer' + ch.GUID + '"></div>')
            $("div#3DViewer" + ch.GUID).load(ch.inputs[0].value, function(data) {
                console.log(data)
            });
        } else if (ch.inputs[0].type == "plot") {
            var data = JSON.parse(ch.inputs[0].value);
            drawPlotComponent(data, ch);

        } else if (ch.inputs[0].type == "spatial") {
            var data = JSON.parse(ch.inputs[0].value);
            var unparseData = ch.inputs[0].value;
            visualizeSpatialComponent(data, unparseData, ch);
        }
        $("foreignObject#panel_status_" + ch.GUID).text("type : " + ch.inputs[0].type)
        ch.outputs[0].value = ch.inputs[0].value;
        ch.outputs[0].type = ch.inputs[0].type;

    } else if (ch.type == "optionList") {

        ch.optionListValues = JSON.parse(ch.inputs[0].value);

    } else if (ch.type == "listView") {

        var newValues = []
        for (let i = 0; i < JSON.parse(ch.inputs[0].value).length; i++) {
            const element = JSON.parse(ch.inputs[0].value)[i];
            newValues.push([element, 0])

        }
        console.log(newValues);
        ch.value = newValues;
        ch.inputs[0].value = newValues;
        ch.outputs[0].value = newValues;

        updateListViewDrawing(ch);


    }
} // End of updatShallowCompRender

function visualizeSpatialComponent(data, unparseData, comp) {
    $("foreignObject#textbody_" + comp.GUID).html('<div id="vis_area' + comp.GUID + '" style="height:4%"></div><div id="vis_canvas' + comp.GUID + '" style="height:92%">vis</div>')

    var options = `<select id='spatial_select_` + comp.GUID + `' onchange= 'displaySelection(` + unparseData + `, "` + comp.GUID + `")'>`
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            options += `<option  value="` + key + `">` + key + `</option>`
        }
    }
    options += `</select>`
    $("div#vis_area" + comp.GUID).html(options);
} // End of visualizeSpatialComponent

function displaySelection(data, id) {

    var x = document.getElementById("spatial_select_" + id).value;
    var spaces_in_level = `<select id="spatial_zone_selection_list_` + id + `" onchange="highlightSpatialZone('` + id + `')">`
    data[x].forEach(element => {
        spaces_in_level += `<option value="` + element.name + `">` + element.name + `</option>`
    });
    spaces_in_level += `</select>`
    d3.select("div#vis_canvas" + id).html(`<div id="spatial_canvas_floor_zones" style="height:3%">` + spaces_in_level + "<div>")
        .append("svg")
        .attr("id", "floor_plan_display" + id)

    data[x].forEach(element => {
        d3.select("svg#floor_plan_display" + id)
            .attr("width", "100%")
            .attr("height", "100%")
            .append("path")
            .attr("id", "fpp_" + element.name)
            .attr("stroke", "black")
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("d", () => {
                var pathString = "M"
                for (let i = 0; i < element.coords.length; i++) {
                    if (i < element.coords.length - 1) {
                        pathString += " " + (element.coords[i][0] * 10 + 500).toString() + " " + (element.coords[i][1] * 10 + 300).toString() + " L";
                    } else {
                        pathString += " " + (element.coords[i][0] * 10 + 500).toString() + " " + (element.coords[i][1] * 10 + 300).toString() + " Z";
                    }
                }
                return pathString;
            })
    });
} // End of displaySelection

function highlightSpatialZone(id) {
    var selected_zone = document.getElementById("spatial_zone_selection_list_" + id).value;


    var a = document.getElementById("floor_plan_display" + id);
    console.log(a)
        // Get the SVG document inside the Object tag
    var svgDoc = a.contentDocument;

    // Get one of the SVG items by ID;
    var svgItem = a.getElementById("fpp_" + selected_zone);
    console.log(svgItem)
        // Set the colour to something else
    svgItem.setAttribute("fill", "green");
} // End of highlightSpatialZone

function drawPlotComponent(data, comp) {
    $("foreignObject#textbody_" + comp.GUID).html('<div id="plot_area' + comp.GUID + '" style="width:100%; height:100%;"></div>')
    if (data != null && Array.isArray(data)) {

        if (data[0].type == "scatter") {
            if ("layout" in data[0]) {
                Plotly.newPlot("plot_area" + comp.GUID, data[0].data, data[0].layout, {
                    "responsive": true
                });
            } else {
                Plotly.newPlot("plot_area" + comp.GUID, data[0].data, {
                    "responsive": true
                });
            }
        } else if (data[0].type == "bar") {

            data[0].data.forEach(dataElement => {
                var maxValue = Math.max(...dataElement.y);
                dataElement["marker"] = {
                    "color": []
                }
                dataElement.y.forEach(dataValue => {
                    dataElement.marker.color.push(d3.interpolateGnBu(dataValue / maxValue))
                });
            });
            if ("layout" in data[0]) {
                Plotly.newPlot("plot_area" + comp.GUID, data[0].data, data[0].layout, {
                    "responsive": true
                });
            } else {
                Plotly.newPlot("plot_area" + comp.GUID, data[0].data, {
                    "responsive": true
                });
            }
        } else {
            if ("layout" in data[0]) {
                Plotly.newPlot("plot_area" + comp.GUID, data[0].data, data.layout, {
                    "responsive": true
                });
            } else {
                Plotly.newPlot("plot_area" + comp.GUID, data[0].data, {
                    "responsive": true
                });
            }
        }

    } else if (data != null) {


        if (data.type == "scatter") {
            if ("layout" in data) {
                Plotly.newPlot("plot_area" + comp.GUID, data.data, data.layout, {
                    "responsive": true
                });
            } else {
                Plotly.newPlot("plot_area" + comp.GUID, data.data, {
                    "responsive": true
                });
            }
        } else if (data.type == "bar") {

            data.data.forEach(dataElement => {
                var maxValue = Math.max(...dataElement.y);
                dataElement["marker"] = {
                    "color": []
                }
                dataElement.y.forEach(dataValue => {
                    dataElement.marker.color.push(d3.interpolateGnBu(dataValue / maxValue))
                });
            });
            if ("layout" in data) {
                Plotly.newPlot("plot_area" + comp.GUID, data.data, data.layout, {
                    "responsive": true
                });
            } else {
                Plotly.newPlot("plot_area" + comp.GUID, data.data, {
                    "responsive": true
                });
            }
        } else {
            if ("layout" in data) {
                Plotly.newPlot("plot_area" + comp.GUID, data.data, data.layout, {
                    "responsive": true
                });
            } else {
                Plotly.newPlot("plot_area" + comp.GUID, data.data, {
                    "responsive": true
                });
            }
        }
    } else {
        Plotly.newPlot("plot_area" + comp.GUID, [{
            "x": ["1", "2", "3"],
            "y": [1.0, 2.0, 3.0],
            "type": "bar"
        }], {
            "title": "Dummy plot"
        }, {
            "responsive": true
        })
    }
} // End of drawPlotComponent

function updateListViewDrawing(comp) {
    d3.select("foreignObject#listView-" + comp.GUID)
        .html(() => {
            var selectedOptions = [];
            var ListItemsvalueReturn = `<select id="listviewSelect" class="listView ` + comp.GUID + `" size="5"  multiple>`;
            comp.value.forEach(option => {

                if (option[1] == 0) {
                    ListItemsvalueReturn += `<option id="someSelection" class="listViewOption ` + comp.GUID + `" value="` + option[0] + `">` + option[0] + `</option>`
                } else {
                    ListItemsvalueReturn += `<option id="someSelection" class="listViewOption ` + comp.GUID + `" value="` + option[0] + `" selected>` + option[0] + `</option>`
                    selectedOptions.push(option[0]);
                }
            });
            comp.outputs[0].value = JSON.stringify(selectedOptions);
            ListItemsvalueReturn += `</select>`
            return ListItemsvalueReturn;
        })

    ViewListRedrawing();
} // End of updateListViewDrawing

function handleEdgeMovement(objID, x = null, y = null) {
    var element = selectComp(objID);
    if (element != null && element.GUID == objID) {
        if (x !== null && y !== null) {
            element.X = x;
            element.Y = y;
        }


        for (let index = 0; index < comp_input_edges[objID].length; index++) {
            if (comp_input_edges[objID][index] != undefined) {
                comp_input_edges[objID][index].forEach(inputElement => {
                    var circleindex = index;

                    var rectId = objID;

                    var rectpos = $("#comp-" + rectId).attr("transform")
                        .replace("translate(", "").replace(")", "")
                        .split(",").map(function(item) {
                            return parseFloat(item, 10);
                        });
                    var xy2 = $("#" + inputElement).attr("d").split(
                        " ")[1].split(",").map(function(item) {
                        return parseFloat(item, 10);
                    });
                    var padding = 20;
                    var titleMargin = 30;
                    var thenewEdge = d3.select("#" + inputElement)
                        .attr("d", function() {

                            if (element.type == "component") {
                                var itisthelocation = returnCurveString(
                                    xy2[0], xy2[1], rectpos[0],
                                    rectpos[1] + (circleindex *
                                        padding + titleMargin));


                                handlePathDeleteMovement(inputElement, xy2, [rectpos[0], rectpos[1] + (circleindex * padding + titleMargin)])

                            } else if (element.type == "string" || element.type == "toggle" || element.type == "fileUpload" || element.type == "slider" || element.type == "optionList" || element.type == "listView") {
                                itisthelocation = returnCurveString(
                                    xy2[0],
                                    xy2[1],
                                    rectpos[0],
                                    rectpos[1] + element.height / 2);


                                handlePathDeleteMovement(inputElement, xy2, [rectpos[0], rectpos[1] + element.height / 2])


                            }

                            return itisthelocation;
                        });
                });
            }
        }
        for (let index = 0; index < comp_output_edges[objID].length; index++) {

            if (comp_output_edges[objID][index] != undefined) {
                comp_output_edges[objID][index].forEach(
                    outputElement => {
                        var circleindex = index;
                        var rectId = objID;
                        var rectpos = $("#comp-" + rectId).attr("transform")
                            .replace("translate(", "").replace(")", "")
                            .split(",").map(function(item) {
                                return parseFloat(item, 10);
                            });
                        var rectwidth = $("rect#dummyRect_" + rectId).attr("width");
                        var xy2 = $("#" + outputElement).attr("d").split(
                            " ")[5].split(",").map(function(item) {
                            return parseFloat(item, 10);
                        });
                        var padding = 20;
                        var titleMargin = 30;
                        var thenewEdge = d3.select("#" + outputElement)
                            .attr("d", function() {

                                if (element.type == "component") {
                                    var itisthelocation = returnCurveString(
                                        rectpos[0] + parseFloat(rectwidth), rectpos[1] + (circleindex * padding + titleMargin), xy2[0], xy2[1]);

                                    handlePathDeleteMovement(outputElement, [
                                        rectpos[0] + parseFloat(rectwidth),
                                        rectpos[1] + (circleindex * padding + titleMargin)
                                    ], [
                                        xy2[0],
                                        xy2[1]
                                    ])
                                } else if (element.type == "slider") {
                                    itisthelocation = returnCurveString(rectpos[0] + parseFloat(250),
                                        rectpos[1] + 10,
                                        xy2[0],
                                        xy2[1]);

                                    handlePathDeleteMovement(outputElement, [
                                        rectpos[0] + parseFloat(250),
                                        rectpos[1] + 10
                                    ], [
                                        xy2[0],
                                        xy2[1]
                                    ])
                                } else if (element.type == "string" || element.type == "toggle" || element.type == "optionList" || element.type == "listView" || element.type == "fileUpload") {
                                    itisthelocation = returnCurveString(rectpos[0] + parseFloat(rectwidth),
                                        rectpos[1] + element.height / 2,
                                        xy2[0],
                                        xy2[1]);

                                    handlePathDeleteMovement(outputElement, [
                                        rectpos[0] + parseFloat(rectwidth),
                                        rectpos[1] + element.height / 2
                                    ], [
                                        xy2[0],
                                        xy2[1]
                                    ])
                                }
                                return itisthelocation;
                            });
                    }
                );
            }
        }
    }
} // End of handleEdgeMovement

function handlePathDeleteMovement(pathId, xy1, xy2) {
    d3.select("circle#C" + pathId)
        .attr("cx", ((xy1[0] + xy2[0]) / 2.0).toString())
        .attr("cy", ((xy1[1] + xy2[1]) / 2.0).toString())
        .attr("style", "display:block");
} // End of handlePathDeleteMovement

function edit_move_mode(compId, mode) {
    const EDIT_MODE = 0;
    const DRAG_MODE = 1;
    if (mode == EDIT_MODE) {
        d3.select("rect#overlaySelector" + compId).style("display", "none")
        d3.select("a#changeEditMoveMode_" + compId).attr("onclick", "edit_move_mode(\'" + compId + "\', 1)").text("Edit Mode")
    } else {
        d3.select("rect#overlaySelector" + compId).style("display", "block")
        d3.select("a#changeEditMoveMode_" + compId).attr("onclick", "edit_move_mode(\'" + compId + "\', 0)").text("Drag Mode")
    }

} // End of edit_move_mode

function objToHtmlTable(object) {
    var col_length = 0;
    var keys = []
    var htmlQuery = `<table border="1" class="dataframe">` +
        `<thead> <tr style="text-align: right;"><th></th>`
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            htmlQuery += `<th>` + key + `</th>`
            keys.push(key)
            col_length = object[key].length;
        }
    }
    htmlQuery += `</tr></thead><tbody>`;

    for (let i = 0; i < col_length; i++) {
        htmlQuery += `<tr><th>` + i.toString() + `</th>`
        keys.forEach(element => {
            htmlQuery += `<td>` + object[element][i] + `</td>`
        });
        htmlQuery += `</tr>`
    }

    return htmlQuery;
} // End of objToHtmlTable

function deleteComponent(component_to_be_deleted) {
    var component_to_be_reset = selectComp(component_to_be_deleted);
    component_to_be_reset.value = null;

    console.log(parent_child_matrix_fast_check);
    component_to_be_reset.inputs.forEach((input) => {
        input.value = null;

    });

    component_to_be_reset.outputs.forEach((output) => {
        output.value = null;

    });
    delete components_selection_data[component_to_be_deleted]
    redrawDependents(component_to_be_deleted);



    for (let i = 0; i < parent_child_matrix_fast_check.length; i++) {
        var current_parent_child_object_asList = parent_child_matrix_fast_check[i].split(" ");
        if (current_parent_child_object_asList[1] == component_to_be_deleted) {
            parent_child_matrix_fast_check.splice(i, 1);
        }

    }

    comp_input_edges[component_to_be_deleted].forEach(element => {
        try {
            for (let i = 0; i < allEdges.length; i++) {
                element.forEach(thisEdgeId => {
                    d3.select("path#" + thisEdgeId).remove();
                    if (thisEdgeId == allEdges[i]["path_id"]) {
                        allEdges.splice(i, 1)
                    }
                    var otherComp = edge_comp_matrix[thisEdgeId]["from"];
                    var otherCompIndex = edge_comp_matrix[thisEdgeId]["from_index"];
                    comp_output_edges[otherComp][otherCompIndex] = undefined;
                    parent_child_matrix[otherComp] = [];
                });
            }
        } catch (err) {
            console.log(err)
        }
    });


    comp_output_edges[component_to_be_deleted].forEach(element => {
        try {
            for (let i = 0; i < allEdges.length; i++) {
                element.forEach(thisEdgeId => {
                    d3.select("path#" + thisEdgeId).remove();
                    if (thisEdgeId == allEdges[i]["path_id"]) {
                        allEdges.splice(i, 1)
                    }
                    var otherComp = edge_comp_matrix[thisEdgeId]["to"];
                    var otherCompIndex = edge_comp_matrix[thisEdgeId]["to_index"];
                    comp_input_edges[otherComp][otherCompIndex] = undefined;
                });
            }
        } catch (err) {
            console.log(err);
        }


    });

    for (let i = 0; i < allComp.length; i++) {
        if (allComp[i].GUID == component_to_be_deleted) {
            allComp.splice(i, 1)
        }
    }
    d3.select("#" + component_to_be_deleted).remove();
} // End of deleteComponent

function deleteEdge(edge_to_be_deleted) {
    var components_of_the_edge = edge_comp_matrix[edge_to_be_deleted];

    var fromComp = selectComp(components_of_the_edge["from"]) //.outputs[components_of_the_edge["from_index"]])
    var toComp = selectComp(components_of_the_edge["to"]) //.inputs[components_of_the_edge["to_index"]].value = null;
    console.log(toComp);
    toComp.inputs[components_of_the_edge["to_index"]].value = null;
    toComp.value = null;
    comp_input_edges[toComp.GUID][components_of_the_edge["to_index"]] = undefined;
    comp_output_edges[fromComp.GUID][components_of_the_edge["from_index"]] = undefined;

    for (let i = 0; i < parent_child_matrix[fromComp.GUID].length; i++) {

        console.log(parseInt(parent_child_matrix[fromComp.GUID][i][2]) == components_of_the_edge["to_index"])
        if (parseInt(parent_child_matrix[fromComp.GUID][i][2]) == components_of_the_edge["to_index"]) {
            parent_child_matrix[fromComp.GUID] = [];
        }
    }

    console.log(comp_output_edges)

    console.log(parent_child_matrix[fromComp.GUID]);
    updatShallowCompRender(toComp);
    updatShallowCompRender(fromComp);
    redrawDependents(components_of_the_edge["to"]);

    for (let i = 0; i < allEdges.length; i++) {
        if (edge_to_be_deleted == allEdges[i]["path_id"]) {
            allEdges.splice(i, 1)
        }
    };

    for (let i = 0; i < parent_child_matrix_fast_check.length; i++) {
        var current_parent_child_object_asList = parent_child_matrix_fast_check[i].split(" ");
        if (current_parent_child_object_asList[0] == components_of_the_edge["from_index"] && current_parent_child_object_asList[1] == fromComp.GUID) {
            parent_child_matrix_fast_check.splice(i, 1);
        }

    }
    redrawDependents(components_of_the_edge["to"]);
    delete edge_comp_matrix[edge_to_be_deleted];
} // End of deleteEdge

function popupMessage(message) {
    d3.select("div#buttonClickedname").text(message).style("opacity", () => {
        messageshown = true;
        return 0.8
    });
} // End of popupMessage

function saveFile() {
    allEdges.forEach(element => {
        element["d"] = $("path#" + element.path_id).attr("d");
    });

    console.log(parseFloat(d3.select("div#PropertiesBar").style("width")))
    var svgContainer = d3.select("svg");
    var allContents = d3.select("#allCanvasContents");
    var resss = ""
    $.ajax({
        "type": "POST",
        "dataType": "json",
        "url": "saveUrl", //dummy. refer def.html
        "accepts": "text",
        "data": {
            "api": "thisDefId", //dummy. refer def.html
            "da": JSON.stringify({
                "components": allComp,
                "edges": allEdges,
                "comp_input_edges": comp_input_edges,
                "comp_output_edges": comp_output_edges,
                "edge_comp_matrix": edge_comp_matrix,
                "parent_child_matrix": parent_child_matrix,
                "parent_child_matrix_fast_check": parent_child_matrix_fast_check,
                "root_components": root_components,
                "canvas_transform": {
                    "transform": allContents.attr("transform"),
                    "kXY": svgContainer._groups[0][0].__zoom
                },
                "currentRightColWidth": parseFloat(d3.select("div#PropertiesBar").style("width")),
                "currentLeftColWidth": parseFloat(d3.select("div#LeftPropertiesBar").style("width"))
            })
        },
        "beforeSend": function(xhr, settings) {
            $.ajaxSettings.beforeSend(xhr, settings);

        },
        "complete": function(res) {
            d3.select("div#Addedmessage")
                .text("Saved")
                .transition(1000)
                .style("opacity", () => {
                    messageshown = true;
                    return 1;
                })
            console.log(res.responseText);
        }
    })
} // End of saveFile

function itemListChangedFunction(id, value) {
    console.log(id);
    console.log(value);
} // End of itemListChangedFunction

function componentStatus(id, Compstauts) {
    if (Compstauts == "green") {
        d3.select("rect#statusRect" + id)
            .attr("fill", "#02521b");

        d3.select("text#statusText" + id)
            .text("Active")
            .attr("fill", "#6cff13");

    } else if (Compstauts == "#ffca28") {
        d3.select("rect#statusRect" + id)
            .attr("fill", Compstauts);
        d3.select("text#statusText" + id)
            .text("Idle ...")
            .attr("fill", "black");
    } else if (Compstauts == "red") {
        d3.select("rect#statusRect" + id)
            .attr("fill", "#fceecc");
        d3.select("text#statusText" + id)
            .text("Error")
            .attr("fill", "red");
    }
} // End of componentStatus

function moveComponent(id, x, y) {
    d3.select("#comp-" + id)
        .attr("transform", function() {
            return "translate(" + x + "," + y + ")"
        });
    handleEdgeMovement(id, x, y);
} // End of moveComponent

/**
 * This is the core function that runs all the calculations and return the outputs to the components.
 * @param    {string} compId The component GUID.
 */
//  function calculateShallow(compId) {
//     var thisComp = selectComp(compId); // selects the component that is under test.
//     console.log(thisComp);
//     var inputGroup = []; // reads the inputs from the component and put them in a list to be mapped to the corresponding shallow function.
//     thisComp.inputs.forEach(input => {
//         inputGroup.push(input.value);
//     });

//     var d = shallow_functions[thisComp.Name](inputGroup);

//     console.log("I don't know")

//     thisComp.outputs.forEach(function (output, i) {
//         output.value = d["value"][i];
//         output.type = d["type"][i];
//     });
// }

export {dummyToSetState, addcomponent, selectComp, CreatePathes, updateAll, toMoveEdgeEnds, returnCurveString,
    getlocationFromTransform, ViewListRedrawing, getAllChildes, repeatStringNumTimes, 
    addOptionDropdownList, changeOptionListFinalValue, showDropDownList, redrawDependents, 
    updatShallowCompRender, visualizeSpatialComponent, displaySelection, highlightSpatialZone, 
    drawPlotComponent, updateListViewDrawing, handleEdgeMovement, handlePathDeleteMovement, 
    edit_move_mode, objToHtmlTable, deleteComponent, deleteEdge, popupMessage, saveFile,
    itemListChangedFunction, componentStatus, moveComponent};