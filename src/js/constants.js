// /*
// █▀▀▀ █░░ █▀▀█ █▀▀▄ █▀▀█ █░░ 　 ▀█░█▀ █▀▀█ █▀▀█ ░▀░ █▀▀█ █▀▀▄ █░░ █▀▀ █▀▀ 
// █░▀█ █░░ █░░█ █▀▀▄ █▄▄█ █░░ 　 ░█▄█░ █▄▄█ █▄▄▀ ▀█▀ █▄▄█ █▀▀▄ █░░ █▀▀ ▀▀█ 
// ▀▀▀▀ ▀▀▀ ▀▀▀▀ ▀▀▀░ ▀░░▀ ▀▀▀ 　 ░░▀░░ ▀░░▀ ▀░▀▀ ▀▀▀ ▀░░▀ ▀▀▀░ ▀▀▀ ▀▀▀ ▀▀▀ 
// */


const IDLE_COLOR = "#dfd4b1";
const ACTIVE_COLOR = "green";
const ERROR_COLOR = "red";

const COMPONENT_RADIUS = 1;

var allComp = [];
var allEdges = [];
var comp_input_edges = {};
var comp_output_edges = {};
var edge_comp_matrix = {};
var parent_child_matrix = {};
var parent_child_matrix_fast_check = [];
var root_components = {}
var components_selection_data = {};
var selected_components = [];

var runDeep = false;

var StringAnchorclicked = false;
var StringAnchorType = null;
var StringAnchorId = "";
const XANCHOR = 0;
const YANCHOR = 1;
const ANCHOR_WIDTH = 5;


const SLIDER_START_POSITION = 60;
const SLIDER_END_POSITION = 244;


let anchorMouseXpos;
let anchorMouseYpos;

var SliderAnchorclicked = false;
var selectedSliderComponent = null;
var dragX = 0;
var dragY = 0;

var sliderRectId = "";
var componentClickX = 0;
var componentClickY = 0;


var initPos = null;
var startDrag = false;

var clickedId = "";
var rectType = "";

var deltaX = 0;
var deltaY = 0;
var clicked = false;

var edgeStarted = false;
var targetcircleIN = false;

var selectedcircleId = "";
var targetcircleId = "";
var selectedSliderAnchorId = "";

var xGrid = 0;
var yGrid = 0;

var mousex = 0;
var mousey = 0;

var initEdgex2 = 0;
var initEdgey2 = 0;

// text global variables.

var textareaStarted = false;
var textAreaRectId = "";

var optionListStarted = false;
var optionlistRectid = "";
var justSelected = null;
var mouseInsideOption = false;

// selected component variables.
var is_component_selected = false;
var selected_component_id = "";


var rightColumnIsSelected = false;
var leftColumnIsSelected = false;
var topColumnIsSelected = false;

var rightColIsdisplayed = true;
var leftColIsdisplayed = true;

var is_edge_selected = false;


var currentTopBarHeight = 30;
var currentLeftColWidth = 225;
var currentRightColWidth = 50;
/*
try {
    if (RetrievedData.currentRightColWidth != undefined) {
        currentRightColWidth = RetrievedData.currentRightColWidth;
    }
    if (RetrievedData.currentLeftColWidth != undefined) {
        currentLeftColWidth = RetrievedData.currentLeftColWidth;
    }
} catch (error) {

}
*/



var defVars = {}

var messageshown = false;

var Output = {
    "id": 0,
    "circle": null,
    "type": "output",
    "Name": "output1",
    "ShortName": "A",
    "Description": "output1",
    "Message": "short description",
    "type2": "item",
    "datatype": "int",
    "value": 0,
}


var Input = {
    "id": 0,
    "circle": null,
    "type": "input",
    "Name": "Input1",
    "ShortName": "X",
    "Description": "input1",
    "Message": "short description",
    "type2": "item",
    "datatype": "int",
    "value": 0,
}


function uuidv4(ini) {
    return ini + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}

function addEdge(from, to, fromComp, toComp) {
    var initLink = {
        "GUID": uuidv4("E"),
        "path": null,
        "path_id": "",
        "X1": 0,
        "Y1": 0,
        "X2": 10,
        "Y2": 10,
        "from": from,
        "to": to,
        "fromComp": fromComp,
        "toComp": toComp
    }

    return initLink;

}

function addCircle() {
    var initCircle = {
        "GUID": uuidv4("C"),
        "element": null,
        "CX": 0,
        "CY": 0,
        "Comp": null,
        "type": "data",
        "path": null,
    }

    return initCircle;
};



var fromCircle = addCircle();


var toCircle = addCircle();

let udo_names = [];
let udo_types = [];
let udo_desc = [];
let udo_shortNames = [];
let udo_inputs = [];
let udo_outputs = [];
let udo_fill = [];
let udo_dftypes = [];
let udo_cats = [];
let udo_subcats = [];

let cats = {};
let scats = {};

export {
IDLE_COLOR,
ACTIVE_COLOR,
ERROR_COLOR,
COMPONENT_RADIUS,
allComp,
allEdges,
comp_input_edges,
comp_output_edges,
edge_comp_matrix,
parent_child_matrix,
parent_child_matrix_fast_check,
root_components,
components_selection_data,
selected_components,
runDeep,
StringAnchorclicked,
StringAnchorType,
StringAnchorId,
XANCHOR,
YANCHOR,
ANCHOR_WIDTH,
SLIDER_START_POSITION,
SLIDER_END_POSITION,
anchorMouseXpos,
anchorMouseYpos,
SliderAnchorclicked,
selectedSliderComponent,
dragX,
dragY,
sliderRectId,
initPos,
startDrag,
clickedId,
rectType,
deltaX,
deltaY,
clicked,
edgeStarted,
targetcircleIN,
selectedcircleId,
targetcircleId,
selectedSliderAnchorId,
xGrid,
yGrid,
mousex,
mousey,
initEdgex2,
initEdgey2,
componentClickX,
componentClickY,
textareaStarted,
textAreaRectId,
optionListStarted,
optionlistRectid,
justSelected,
mouseInsideOption,
is_component_selected,
selected_component_id,
rightColumnIsSelected,
leftColumnIsSelected,
topColumnIsSelected,
rightColIsdisplayed,
leftColIsdisplayed,
is_edge_selected,
currentTopBarHeight,
currentLeftColWidth,
currentRightColWidth,
defVars,
messageshown,
Output,
Input,
uuidv4,
addEdge,
addCircle,
toCircle,
fromCircle,
udo_names,
udo_types,
udo_desc,
udo_shortNames,
udo_inputs,
udo_outputs,
udo_fill,
udo_dftypes,
udo_cats,
udo_subcats,
cats,
scats
}