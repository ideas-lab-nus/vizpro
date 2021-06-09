import {selectComp, updateAll, redrawDependents, returnCurveString} from './functions.js';
import {addEdge} from './handle.js';
var d3 = require('d3');

var reactContext;
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

function dummyToSetStateEdge() {
    reactContext = this;
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

var edgeDragHandler = d3.drag()
        .on("start", onStart)
        .on("drag", onDrag)
        // .on("drag", (event, d) => {d.x = event.x; d.y = event.y})
        .on("end", onEnd)
        // .on("start.update drag.update end.update", update);

function onDrag(event, d) {
    d.x = event.x;
    d.y = event.y;     
    d3.select("#" + reactContext.state.selectedcircleId)
        .attr("d", function () {
            return returnCurveString(reactContext.state.initEdgex1, 
                                     reactContext.state.initEdgey1, 
                                     d.x, 
                                     d.y);
        })
        .attr("fill", "none")
        .attr("stroke-opacity", "0.2")
        .attr("interpolate", "basis");   
}

function onStart(event, d) {
    var allContents = d3.select("#allCanvasContents");
    reactContext.setState({
        targetcircleId: this.id,
    })

    var edgeStarted = reactContext.state.edgeStarted;
    var targetcircleIN = reactContext.state.targetcircleIN;
    var fromCircle = { ...reactContext.state.fromCircle };
    var comp_output_edges = { ...reactContext.state.comp_output_edges };
    var selectedcircleId;
    
    if (edgeStarted && targetcircleIN && this !== fromCircle.element) {
        // DUMMY, Nothing to do in this version. :D :D 
    } else {
        console.log("cond" + (this.classList[0] === "outputCir"))
        if (this.classList[0] === "outputCir") {
            console.log(comp_output_edges);
            if (comp_output_edges[this.classList[1]][this.classList[2]] === undefined) {
                selectedcircleId = this.id;
                reactContext.setState({
                    selectedcircleId: selectedcircleId,
                })
            } else {
                selectedcircleId = this.id + (comp_output_edges[this.classList[1]][this.classList[2]].length).toString();
                reactContext.setState({
                    selectedcircleId: selectedcircleId,
                })
            }
            reactContext.setState({
                edgeStarted: true,
            })

            var x = d3.pointer(event, allContents.node())[0];
            var y = d3.pointer(event, allContents.node())[1];

            var initEdgex1 = x;
            var initEdgey1 = y;

            d3.select("g#allPaths")
                .append("path")
                .attr("stroke-dasharray", "4")
                .attr("d", function() {
                    return "M " + initEdgex1 + " " + initEdgey1 + " L " + x + " " + y;
                })
                .attr('stroke', "black")
                .attr("stroke-width", "3")
                .attr("id", "Path" + selectedcircleId);
            fromCircle.element = this;                    
            reactContext.setState({
                selectedcircleId: "Path" + selectedcircleId,
                fromCircle: fromCircle,
                initEdgex1: initEdgex1,
                initEdgey1: initEdgey1
            })
        }
    }
}

function onEnd(event, d) {
    //This event is called when the mouse cursor is inside the input circle, this means that the line is now complete and ready to be created. 
    d.x = reactContext.state.initEdgex1;
    d.y = reactContext.state.initEdgey1;
    var edgeStarted = reactContext.state.edgeStarted;
    var allEdges = reactContext.state.allEdges;
    var targetcircleIN = reactContext.state.targetcircleIN;
    var fromCircle = { ...reactContext.state.fromCircle };
    var toCircle = { ...reactContext.state.toCircle };
    var comp_input_edges = { ...reactContext.state.comp_input_edges };
    var comp_output_edges = { ...reactContext.state.comp_output_edges };
    var root_components = reactContext.state.root_components;
    var parent_child_matrix = { ...reactContext.state.parent_child_matrix };
    var parent_child_matrix_fast_check = { ...reactContext.state.parent_child_matrix_fast_check };
    var selectedcircleId;

    // console.log(edgeStarted + targetcircleIN )
    console.log((this !== fromCircle.element))
    if (edgeStarted && targetcircleIN && this !== fromCircle.element && comp_input_edges[this.classList[1]][this.classList[2]] === undefined) {
        toCircle.element = this;
        reactContext.setState({
            toCircle: toCircle,
        })
        var toComponent = selectComp(toCircle.element.classList[1]);
        var fromComponent = selectComp(fromCircle.element.classList[1]);
        console.log(fromCircle.element.classList[2] +
            " " + fromCircle.element.classList[1] +
            " " + toCircle.element.classList[2] +
            " " + toCircle.element.classList[1]);

        console.log(parent_child_matrix_fast_check)
        if (!parent_child_matrix_fast_check.includes(fromCircle.element.classList[2] + " " + 
                                                     fromCircle.element.classList[1] + " " + 
                                                     toCircle.element.classList[2] + " " + 
                                                     toCircle.element.classList[1])) {
            var thisEdge = addEdge(fromCircle, toCircle, fromCircle.element.classList, toCircle.element.classList);
            var thisPath = d3.select("#" + selectedcircleId)

            thisEdge.path_id = thisPath["_groups"][0][0].id;

            if (comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]] === undefined) {
                comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]] = [thisEdge.path_id]
            } else {
                comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]].push(thisEdge.path_id)
            }
            if (comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]] === undefined) {
                comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]] = [thisEdge.path_id]
            } else {
                comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]].push(thisEdge.path_id)
            }

            // Datatree control. FIX UNCOMMENR
            var current_edge_comp_matrix = { ...reactContext.state.edge_comp_matrix };
            current_edge_comp_matrix[thisEdge.path_id] = {
                "from": fromCircle.element.classList[1],
                "to": toCircle.element.classList[1],
                "from_index": fromCircle.element.classList[2],
                "to_index": toCircle.element.classList[2]
            }

            reactContext.setState({
                comp_input_edges: comp_input_edges,
                comp_output_edges: comp_output_edges,
                edge_comp_matrix: current_edge_comp_matrix,
            })                    

            try {
                if (root_components[fromCircle.element.classList[1]] !== "branch") {
                    root_components[fromCircle.element.classList[1]] = "root"
                    reactContext.setState({
                        root_components: root_components,
                    })
                    toComponent.child = false;
                }
            } catch (err) {
                console.log(err)
            }

            parent_child_matrix_fast_check.push(fromCircle.element.classList[2] + " " + fromCircle.element.classList[1] + " " + toCircle.element.classList[2] + " " + toCircle.element.classList[1])
            parent_child_matrix[fromCircle.element.classList[1]].push([fromCircle.element.classList[2], toCircle.element.classList[1], toCircle.element.classList[2]])
            root_components[toCircle.element.classList[1]] = "branch"
            toComponent.child = true;
            allEdges.push(thisEdge);

            reactContext.setState({
                parent_child_matrix: parent_child_matrix,
                parent_child_matrix_fast_check: parent_child_matrix_fast_check,
                root_components: root_components,
                allEdges: allEdges,
                edgeStarted: false,
            })

            updateAll();
            redrawDependents(fromCircle.element.classList[1])
        } else {
            console.log("The problem in line 677")
        }
    } else {
        console.log("There is something wrong , may be in the if conditions. ")
    }    
}
//Fix state changes
function handleEdgeInitialization(context = 1) {
    console.log(context +" vs" + this);
    var reactContext = context === 1 ? this : context;
    var allComp = reactContext.state.allComp;
    var allContents = d3.select("#allCanvasContents");
    var toComponent = null;
    var fromComponent = null;
    var allCircles = d3.selectAll("circle")
        .on('mousedown', function(event) {
            console.log(this);
            reactContext.setState({
                targetcircleId: this.id,
            })

            var edgeStarted = reactContext.state.edgeStarted;
            var targetcircleIN = reactContext.state.targetcircleIN;
            var fromCircle = { ...reactContext.state.fromCircle };
            var comp_output_edges = { ...reactContext.state.comp_output_edges };
            var selectedcircleId;
            
            if (edgeStarted && targetcircleIN && this !== fromCircle.element) {
                // DUMMY, Nothing to do in this version. :D :D 
            } else {
                console.log("cond" + (this.classList[0] === "outputCir"))
                if (this.classList[0] === "outputCir") {
                    console.log(comp_output_edges);
                    if (comp_output_edges[this.classList[1]][this.classList[2]] === undefined) {
                        selectedcircleId = this.id;
                        reactContext.setState({
                            selectedcircleId: selectedcircleId,
                        })
                    } else {
                        selectedcircleId = this.id + (comp_output_edges[this.classList[1]][this.classList[2]].length).toString();
                        reactContext.setState({
                            selectedcircleId: selectedcircleId,
                        })
                    }
                    reactContext.setState({
                        edgeStarted: true,
                    })

                    var x = d3.pointer(event, allContents.node())[0];
                    var y = d3.pointer(event, allContents.node())[1];

                    var initEdgex1 = x;
                    var initEdgey1 = y;

                    d3.select("g#allPaths")
                        .append("path")
                        .attr("stroke-dasharray", "4")
                        .attr("d", function() {
                            return "M " + initEdgex1 + " " + initEdgey1 + " L " + x + " " + y;
                        }).attr('stroke', "black")
                        .attr("stroke-width", "3")
                        .attr("id", "Path" + selectedcircleId);
                    fromCircle.element = this;                    
                    reactContext.setState({
                        selectedcircleId: "Path" + selectedcircleId,
                        fromCircle: fromCircle,
                        initEdgex1: initEdgex1,
                        initEdgey1: initEdgey1
                    })
                }
            }
        })
        .on("mouseover", function() {
            reactContext.setState({
                targetcircleIN: true,
            })
        })
        .on("mouseout", function() {
            reactContext.setState({
                targetcircleIN: false,
            })
        })
        .on("mouseup", function() {
            //This event is called when the mouse cursor is inside the input circle, this means that the line is now complete and ready to be created. 
            var edgeStarted = reactContext.state.edgeStarted;
            var allEdges = reactContext.state.allEdges;
            var targetcircleIN = reactContext.state.targetcircleIN;
            var fromCircle = { ...reactContext.state.fromCircle };
            var toCircle = { ...reactContext.state.toCircle };
            var comp_input_edges = { ...reactContext.state.comp_input_edges };
            var comp_output_edges = { ...reactContext.state.comp_output_edges };
            var root_components = reactContext.state.root_components;
            var parent_child_matrix = { ...reactContext.state.parent_child_matrix };
            var parent_child_matrix_fast_check = { ...reactContext.state.parent_child_matrix_fast_check };
            var selectedcircleId;

            if (edgeStarted && targetcircleIN && this !== fromCircle.element && comp_input_edges[this.classList[1]][this.classList[2]] === undefined) {
                toCircle.element = this;
                reactContext.setState({
                    toCircle: toCircle,
                })
                toComponent = selectComp(toCircle.element.classList[1]);
                fromComponent = selectComp(fromCircle.element.classList[1]);
                console.log(fromCircle.element.classList[2] +
                    " " + fromCircle.element.classList[1] +
                    " " + toCircle.element.classList[2] +
                    " " + toCircle.element.classList[1]);

                console.log(parent_child_matrix_fast_check)
                if (!parent_child_matrix_fast_check.includes(fromCircle.element.classList[2] + " " + 
                                                             fromCircle.element.classList[1] + " " + 
                                                             toCircle.element.classList[2] + " " + 
                                                             toCircle.element.classList[1])) {
                    var thisEdge = addEdge(fromCircle, toCircle, fromCircle.element.classList, toCircle.element.classList);
                    var thisPath = d3.select("#" + selectedcircleId)

                    thisEdge.path_id = thisPath["_groups"][0][0].id;

                    if (comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]] === undefined) {
                        comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]] = [thisEdge.path_id]
                    } else {
                        comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]].push(thisEdge.path_id)
                    }
                    if (comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]] === undefined) {
                        comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]] = [thisEdge.path_id]
                    } else {
                        comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]].push(thisEdge.path_id)
                    }

                    // Datatree control. FIX UNCOMMENR
                    var current_edge_comp_matrix = { ...reactContext.state.edge_comp_matrix };
                    current_edge_comp_matrix[thisEdge.path_id] = {
                        "from": fromCircle.element.classList[1],
                        "to": toCircle.element.classList[1],
                        "from_index": fromCircle.element.classList[2],
                        "to_index": toCircle.element.classList[2]
                    }

                    reactContext.setState({
                        comp_input_edges: comp_input_edges,
                        comp_output_edges: comp_output_edges,
                        edge_comp_matrix: current_edge_comp_matrix,
                    })                    

                    try {
                        if (root_components[fromCircle.element.classList[1]] !== "branch") {
                            root_components[fromCircle.element.classList[1]] = "root"
                            reactContext.setState({
                                root_components: root_components,
                            })
                            toComponent.child = false;
                        }
                    } catch (err) {
                        console.log(err)
                    }

                    parent_child_matrix_fast_check.push(fromCircle.element.classList[2] + " " + fromCircle.element.classList[1] + " " + toCircle.element.classList[2] + " " + toCircle.element.classList[1])
                    parent_child_matrix[fromCircle.element.classList[1]].push([fromCircle.element.classList[2], toCircle.element.classList[1], toCircle.element.classList[2]])
                    root_components[toCircle.element.classList[1]] = "branch"
                    toComponent.child = true;
                    allEdges.push(thisEdge);

                    reactContext.setState({
                        parent_child_matrix: parent_child_matrix,
                        parent_child_matrix_fast_check: parent_child_matrix_fast_check,
                        root_components: root_components,
                        allEdges: allEdges,
                        edgeStarted: false,
                    })

                    updateAll();
                    redrawDependents(fromCircle.element.classList[1])
                } else {
                    console.log("The problem in line 677")
                }
            } else {
                console.log("There is something wrong , may be in the if conditions. ")
            }
        });
} // End of handleEdgeInitialization

export {dummyToSetStateEdge, onStart, onEnd, edgeDragHandler};