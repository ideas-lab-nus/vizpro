import {
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
    dragX,
    dragY,
    startDrag,
    clickedId,
    rectType,
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
    fromCircle
    } from './constants.js';
import {selectComp, updateAll, ViewListRedrawing, showDropDownList, redrawDependents} from './functions.js';
import {allContents} from './layout.js';
import $ from "jquery";
var d3 = require('d3');

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function handleComponentSelection() {
    const reactContext = this;
    allComp.forEach(element => {
        if (element.type == "component" || element.type == "toggle" || element.type == "fileUpload") {
            d3.select("g#comp-" + element.GUID)
                .on("click", function() {
                    d3.select("rect#" + element.GUID)
                        .attr("stroke-width", "15")
                        .attr("stroke", "#0064ffa8");

                    reactContext.setState({  
                        selected_component_id: element.GUID,
                    });
                })

            d3.select("rect#" + element.GUID)
                .on("focusout", () => {
                    d3.select("rect#" + element.GUID)
                        .attr("stroke-width", "0")
                        .attr("stroke", "none");
                })
        } else if (element.type == "string") {
            d3.select("rect#" + element.GUID)
                .on("click", function() {

                    d3.select("rect#" + element.GUID)
                        .attr("stroke-width", "2")
                        .attr("stroke", "#0064ffa8");

                    d3.select("rect#statusRect" + element.GUID)
                        .attr("fill", "#0081ff")
                        
                    reactContext.setState({  
                        selected_component_id: element.GUID,
                    });
                })

            d3.select("rect.CompBody." + element.GUID + ".a")
                .on("click", function() {

                    d3.select("rect#" + element.GUID)
                        .attr("stroke-width", "2")
                        .attr("stroke", "#0064ffa8");

                    d3.select("rect#statusRect" + element.GUID)
                        .attr("fill", "#0081ff")

                    reactContext.setState({  
                        selected_component_id: element.GUID,
                    });
                })

            d3.select("rect#" + element.GUID)
                .on("focusout", () => {
                    d3.select("rect#" + element.GUID)
                        .attr("stroke-width", "0")
                        .attr("stroke", "none");

                    d3.select("rect#statusRect" + element.GUID)
                        .attr("fill", "#525252")
                })

            d3.select("rect#overlaySelector" + element.GUID)
                .on("focusout", () => {
                    d3.select("rect#" + element.GUID)
                        .attr("stroke-width", "0")
                        .attr("stroke", "none");


                    d3.select("rect#statusRect" + element.GUID)
                        .attr("fill", "#525252")
                })

        } else if (element.type == "slider") {
            d3.select("rect#" + element.GUID)
                .on("click", function() {
                    d3.select("rect#" + element.GUID)
                        .attr("stroke-width", "2")
                        .attr("stroke", "#0064ffa8");
                    
                    reactContext.setState({  
                        selected_component_id: element.GUID,
                    });
                })
                .on("focusout", () => {
                    d3.select("rect#" + element.GUID)
                        .attr("stroke-width", "1")
                        .attr("stroke", "black");
                })

        } else if (element.type == "optionList") {
            d3.select("g#comp-" + element.GUID)
                .on("click", function() {
                    d3.select("rect#" + element.GUID)
                        .attr("stroke-width", "2")
                        .attr("stroke", "#0064ffa8");

                    showDropDownList(element.GUID);

                    reactContext.setState({                        
                        selected_component_id: element.GUID,
                        optionListStarted: true,
                        optionlistRectid: element.GUID,
                    }); 
                });

            d3.select("rect#" + element.GUID)
                .on("focusout", () => {
                    d3.select("rect#" + element.GUID)
                        .attr("stroke-width", "0")
                        .attr("stroke", "none");
                })

        }
    });

    ViewListRedrawing();
} // End of handleComponentSelection

function handleTheClickOnAllComponents() {
    // console.log("all component clicked");
    const reactContext = this;
    var allcomp = d3.selectAll("rect.CompBody")
        .on('mousedown', function(d, i) {
            var coordinates = d3.pointer(this);
            
            var pos = $("g#comp-" + this.id.replace("overlaySelector", ""))
                .attr("transform")
                .split("translate(")[1]
                .replace(")", "")
                .split(",")
                .map(function(item) {
                    return parseFloat(item, 10);
                });
            
            reactContext.setState({
                dragX: pos[0],
                dragY: pos[1],  
                componentClickX: coordinates[0],
                componentClickY: coordinates[1],
                clicked: true,
                startDrag : true,
                clickedId : this.id.replace("overlaySelector", ""),
                selected_components : [this.id.replace("overlaySelector", "")],
                rectType : "component",
            });            
        })

} // End of handleTheClickOnAllComponents

function handleEdgeInitialization() {
    var toComponent = null;
    var fromComponent = null;
    var allCircles = d3.selectAll("circle")
        .on('mousedown', function() {
            targetcircleId = this.id;
            if (edgeStarted && targetcircleIN && this != fromCircle.element) {
                // DUMMY, Nothing to do in this version. :D :D 
            } else {
                if (this.classList[0] == "outputCir") {
                    if (comp_output_edges[this.classList[1]][this.classList[2]] == undefined) {
                        selectedcircleId = this.id;
                    } else {
                        selectedcircleId = this.id + (comp_output_edges[this.classList[1]][this.classList[2]].length).toString();
                    }
                    edgeStarted = true;


                    var x = d3.mouse(allContents.node())[0];
                    var y = d3.mouse(allContents.node())[1];


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
                    selectedcircleId = "Path" + selectedcircleId;
                    fromCircle.element = this;
                }
            }
        })
        .on("mouseover", function() {
            targetcircleIN = true;
        })
        .on("mouseout", function() {
            targetcircleIN = false;
        })
        .on("mouseup", function() {
            //This event is called when the mouse cursor is inside the input circle, this means that the line is now complete and ready to be created. 

            if (edgeStarted && targetcircleIN && this != fromCircle.element && comp_input_edges[this.classList[1]][this.classList[2]] == undefined) {
                console.log(targetcircleIN)
                toCircle.element = this;
                console.log(toCircle);
                toComponent = selectComp(toCircle.element.classList[1]);
                fromComponent = selectComp(fromCircle.element.classList[1]);
                console.log(fromCircle.element.classList[2] +
                    " " + fromCircle.element.classList[1] +
                    " " + toCircle.element.classList[2] +
                    " " + toCircle.element.classList[1]);

                console.log(parent_child_matrix_fast_check)
                if (!parent_child_matrix_fast_check.includes(fromCircle.element.classList[2] +
                        " " + fromCircle.element.classList[1] +
                        " " + toCircle.element.classList[2] +
                        " " + toCircle.element.classList[1])) {
                    var thisEdge = addEdge(fromCircle, toCircle, fromCircle.element.classList, toCircle.element.classList);
                    var thisPath = d3.select("#" + selectedcircleId)

                    thisEdge.path_id = thisPath["_groups"][0][0].id;

                    if (comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]] == undefined) {
                        comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]] = [thisEdge.path_id]
                    } else {
                        comp_input_edges[toCircle.element.classList[1]][toCircle.element.classList[2]].push(thisEdge.path_id)
                    }
                    if (comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]] == undefined) {
                        comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]] = [thisEdge.path_id]
                    } else {
                        comp_output_edges[fromCircle.element.classList[1]][fromCircle.element.classList[2]].push(thisEdge.path_id)
                    }

                    // Datatree control
                    edge_comp_matrix[[thisEdge.path_id]] = {
                        "from": fromCircle.element.classList[1],
                        "to": toCircle.element.classList[1],
                        "from_index": fromCircle.element.classList[2],
                        "to_index": toCircle.element.classList[2]
                    }


                    try {
                        if (root_components[fromCircle.element.classList[1]] != "branch") {
                            root_components[fromCircle.element.classList[1]] = "root"
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



                    edgeStarted = false;
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

function handleDoubleClick() {
    // console.log("double clicked");
    const reactContext = this;
    allComp.forEach(element => {
        if (element.type === "string") {
            d3.select("g#comp-" + element.GUID)
                .on("dblclick", function() {
                    $("div#propertiesBarContents").load("../html/editString.html?compKey=" + element.GUID);
                    element.outputs[0].value = element.value;
                })
        } else if (element.type === "optionList") {
            d3.select("g#comp-" + element.GUID)
                .on("dblclick", function() {
                    $("div#propertiesBarContents").load("../html/editOptionList.html?compKey=" + element.GUID);
                    reactContext.setState({
                        optionListStarted: true,
                        optionlistRectid: element.GUID,
                    });
                })
        } else if (element.type === "slider") {
            d3.select("g#comp-" + element.GUID)
                .on("dblclick", function() {
                    // $("div#propertiesBarContents").load("./../html/editSlider.html?compKey=" + element.GUID);
                    // $("div#propertiesBarContents").load("./../html/editSlider.html");
                    if (!reactContext.state.doubleClicked) {
                        reactContext.setState({
                            doubleClicked: true,
                        });
                        $("div#propertiesBarContents").append(`
                        <div class="propertiesbarheader label">Slider</div>
                        <div id="numerical_slider_container"><div id="string_input_label">Min-value : </div><input type="number" id="new_slider_min_value" value="0.0"></div>
                        <div id="numerical_slider_container"><div id="string_input_label">Max-value: </div><input type="number" id="new_slider_max_value" value="100.0"></div>
                        <div id="numerical_slider_container"><div id="string_input_label">Step: </div><input type="number" id="new_slider_step_value" value="1"></div>
                        <div id="numerical_slider_container"><div id="string_input_label">Current-value: </div><input type="number" id="new_slider_current_value" value="0"></div>
                        <button id="sliderEditButton">Save</button>
                        <button id="cancelSliderEdit">Cancel</button>
                        `);
                    //On save, set double clicked to false
                    }
                });
        } else if (element.type === "toggle") {
            var currentToggle = selectComp(element.GUID);
            d3.select("g#comp-" + element.GUID)
                .on("dblclick", function() {
                    var toggleValue = $("text.nodetitle.node_title" + element.GUID).text();
                    d3.select("text.nodetitle.node_title" + element.GUID)
                        .text(function() {
                            if (toggleValue === "True") {
                                currentToggle.value = "False";
                                currentToggle.outputs[0].value = "False";
                                return "False"
                            } else {
                                currentToggle.value = "True";
                                currentToggle.outputs[0].value = "True";

                                return "True"
                            }

                        })
                        .attr("fill", () => {
                            if (toggleValue === "True") {
                                d3.select("#dummyRect_" + element.GUID)
                                    .attr("fill", "#2c3e50")
                                return "#ecf0f1";
                            } else {
                                d3.select("#dummyRect_" + element.GUID)
                                    .attr("fill", "#ecf0f1")
                                return "#2c3e50"
                            }
                        });

                    redrawDependents(currentToggle.GUID);
                })
        } 
        //TODO : else if other types than string, then you have to open the properties window.
    });
} // End of HandleDoubleClick

export {GetURLParameter, handleTheClickOnAllComponents, handleEdgeInitialization, 
    handleComponentSelection, handleDoubleClick};