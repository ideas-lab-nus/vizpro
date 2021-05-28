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

import {components_selection_data,
    selected_components,
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
    xGrid, yGrid,
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
    mousex,
    mousey,
    messageshown,
    componentClickX,
    componentClickY,
    textareaStarted,
    textAreaRectId,
    optionListStarted,
    optionlistRectid,
    justSelected,
    mouseInsideOption,
    is_component_selected,
    selected_component_id} from './constants.js';
import {KeyPress, addcomponent, selectComp, CreatePathes, updateAll, toMoveEdgeEnds, returnCurveString,
    getlocationFromTransform, ViewListRedrawing, getAllChildes, repeatStringNumTimes, 
    addOptionDropdownList, changeOptionListFinalValue, showDropDownList, redrawDependents, 
    updatShallowCompRender, visualizeSpatialComponent, displaySelection, highlightSpatialZone, 
    drawPlotComponent, updateListViewDrawing, handleEdgeMovement, handlePathDeleteMovement, 
    edit_move_mode, objToHtmlTable, deleteComponent, deleteEdge, popupMessage, saveFile,
    itemListChangedFunction, componentStatus, moveComponent} from './functions.js';
import {allContents} from './layout.js';
import {theRequiredSliderGroup} from './slider.js';

var d3 = require("d3");

var selection_box_x = 0;
var selection_box_y = 0;

var temp_selected_xs = [];
var temp_selected_ys = []; 

var min_selected_x = 0;
var min_selected_y = 0;

var max_selected_x = 0;
var max_selected_y = 0; 

var selection_rectangle_group = null;
var selection_rectangle_group_rect = null; 
var selection_groud_selected = false; 

var horizontal_alignment_box = null; 
var vertical_alignment_box = null; 

const horizontal_align_box = {"W": 150.0, "H": 30.0 , "color": "#373f46", "opacity": 0.8, "radius":5.0}
const vertical_align_box = {"W": 30.0, "H": 150.0 , "color": "#373f46", "opacity": 0.8, "radius":5.0}



var selection_box_started = false;
var items_are_selected  = false; 
var selection_box = null;

var mainGrid = d3.select("#mainGrid")
.style("backgroud-color", function () {
    var xGrid = this.offsetLeft;
    var yGrid = this.offsetTop;
    return "white";
})
.on("mousedown", () => {
    if (
        optionListStarted &&
        ! startDrag && 
        !mouseInsideOption
    ) {
        d3.selectAll("rect.optionListoption").style("display","none");
        d3.selectAll("text.optionListoptiontext").style("display","none");
        optionListStarted = false;
        mouseInsideOption = false;
    }
})
.on("keydown", function() {
    if (d3.event.keyCode == 46) { //delete
        popupMessage("Delete")
        console.log("I'm standing here ...");
        if (selected_components.length > 1) {
            console.log("You will delete ")
        }
        if (selectComp(selected_component_id).type == "fileUpload") {
            if (window.confirm("Are you sure you want to delete this file from the database? ")) {
                console.log("You should detele the file from the database now... ")
                deleteComponent(selected_component_id);
            } else {
                console.log("not deleted. ")
            }
        } else {
            deleteComponent(selected_component_id);
        }
    }
})
.on("dblclick", function()
{
    d3.select("div#buttonClickedname").text("dblclick").style("opacity", ()=>{ messageshown = true; return 1});

    mousex = d3.mouse(allContents.node())[0];
    mousey = d3.mouse(allContents.node())[1];
    d3.select("body")
    .append("option")
})
.on("contextmenu", function (d, i) {
    d3.event.preventDefault();
    popupMessage("RMB");
    selection_box_started = true; 
    selection_box_x = d3.mouse(allContents.node())[0];
    selection_box_y = d3.mouse(allContents.node())[1];

    
    selection_box = allContents.append("polyline"); 
})
.on('mousemove', function () {
        
    var mousex = d3.mouse(allContents.node())[0];
    var mousey = d3.mouse(allContents.node())[1];
    
    var x = mousex - componentClickX;
    var y = mousey - componentClickY;
    if (startDrag) {
        moveComponent(clickedId, x, y)
    }
    if (edgeStarted) {
        d3.select("#" + selectedcircleId)
            .attr("d", function () {
                //return returnCurveString(initEdgex1, initEdgey1, mousex - 2, mousey - 2);
                return returnCurveString(x, y, mousex - 2, mousey - 2);
            }).attr("fill", "none")
            .attr("stroke-opacity", "0.2")
            .attr("interpolate", "basis");
    }

    if (SliderAnchorclicked) {


        var coordinates = d3.mouse(theRequiredSliderGroup);
        var componentClickX = coordinates[0];
        var componentClickY = coordinates[1];


            var sliderLineStartingpositionX = 60;
            var sliderLineStartingpositionY = 3.0;
            var sliderLineEndingpositionX = 238;
            var sliderLineEndingpositionY = 3.0;

            var slider_anchor_value = selectedSliderComponent.value;

            var the_slider_slope = (selectedSliderComponent.max-selectedSliderComponent.min)/(SLIDER_END_POSITION-SLIDER_START_POSITION)
            var y_intersection = selectedSliderComponent.min - (the_slider_slope*SLIDER_START_POSITION);
            var slider_value = componentClickX * the_slider_slope + y_intersection; 

            var sliderY1 = selectedSliderComponent.max;                                                  

            var ax = (selectedSliderComponent.max)/(sliderLineEndingpositionX - sliderLineStartingpositionX); 

            if (componentClickX <= sliderLineStartingpositionX) {

                slider_anchor_value = 0;
                slider_value = selectedSliderComponent.min;
                 
            } else if (componentClickX >= sliderLineEndingpositionX) {

                slider_anchor_value = sliderLineEndingpositionX-sliderLineStartingpositionX;
                slider_value = selectedSliderComponent.max;


            } else {
                slider_anchor_value = componentClickX - sliderLineStartingpositionX;
            }
            selectedSliderComponent.anchorValue = slider_anchor_value;

            d3.select("#" + sliderRectId)
                .attr("transform", function () {
                    return "translate(" + (slider_anchor_value).toString() + "," +sliderLineStartingpositionY+")";
                });

            d3.select("#sliderValueText_"+sliderRectId.replace("SliderAnchor_",""))
            .text((slider_value).toFixed(6));

            selectedSliderComponent.value = slider_value;

            redrawDependents(selectedSliderComponent.GUID)
        }

        if (textareaStarted) {
            var selectedRect = getlocationFromTransform(d3.select("g#comp-"+textAreaRectId).attr("transform"));
            var textA = d3.select("#TextAreaSelector")
            .style("position", "absolute")
            .style("height", (parseFloat(d3.select("rect#"+textAreaRectId).attr("height"))-50).toString()+"px")
            .style("left", selectedRect[0]+4+"px")
            .style("top", selectedRect[1]+17+"px")
            .style("border", "none"); 
        }
        if (optionListStarted) {
            selectedRect = getlocationFromTransform(d3.select("g#comp-"+optionlistRectid).attr("transform"));
            textA = d3.select("#optionListSelectItems"+optionlistRectid)
            .style("position", "absolute")
            .style("height", (parseFloat(d3.select("rect#"+optionlistRectid).attr("height"))-50).toString()+"px")
            .style("left", selectedRect[0]+20+"px")
            .style("top", selectedRect[1]+1+"px");
        }

        if(StringAnchorclicked) {
            if (StringAnchorType == YANCHOR) { 
                //TODO : encabsulate this in a function.
                var newHeight = mousey - anchorMouseYpos;
                if (newHeight > 20)
                newHeight = mousey - anchorMouseYpos;
                else
                newHeight = 22;

                var thisComp = selectComp(StringAnchorId)
                thisComp.height = newHeight;

                d3.select("rect#dummyRect_"+StringAnchorId)
                    .attr("height",newHeight);

                d3.select("rect#"+StringAnchorId)
                .attr("height",newHeight );

                d3.select("rect#statusRect"+StringAnchorId)
                .attr("y", newHeight-20)

                d3.select("foreignObject#panel_status_"+StringAnchorId)
                .attr("y",newHeight+2);

                d3.select("rect#overlaySelector"+StringAnchorId)
                .attr("height", newHeight-5)

                d3.select("rect.yAnchor." + StringAnchorId)
                .attr("y", newHeight-ANCHOR_WIDTH);

                d3.select("rect.xAnchor." + StringAnchorId)
                .attr("height", thisComp.height-ANCHOR_WIDTH);

                d3.select("rect.xyAnchor." + StringAnchorId)
                .attr("x", thisComp.width-ANCHOR_WIDTH)
                .attr("y", thisComp.height-ANCHOR_WIDTH);

                d3.select("foreignObject#textbody_" + StringAnchorId)
                .attr("height", thisComp.height-ANCHOR_WIDTH-5)

                d3.select("foreignObject#panel_edit_mode"+StringAnchorId)
                .attr("y", newHeight + 2)

                d3.select("g#logCirGroup_" + StringAnchorId)
                .attr("transform", () => {
                    x = thisComp.width;
                    y = thisComp.height;
                    return "translate(" + (x).toString() + "," + (y - 10).toString() + ")";
                });
                d3.select("circle#outputCir"+StringAnchorId+"_0")
                .attr("cy", thisComp.height/2);

                d3.select("circle#inputCir"+StringAnchorId+"_0")
                .attr("cy", thisComp.height/2);

            } else if (StringAnchorType == XANCHOR) { 

                //TODO : encabsulate this in a function.
                var newWidth = mousex - anchorMouseXpos;
                if (newWidth > 200)
                newWidth = mousex - anchorMouseXpos;
                else
                newWidth = 201;

                thisComp = selectComp(StringAnchorId)
                thisComp.width = newWidth;

                d3.select("rect#dummyRect_"+StringAnchorId)
                    .attr("width",newWidth);

                d3.select("rect#statusRect"+StringAnchorId)
                .attr("width",newWidth-50);

                d3.select("rect.CompBody."+StringAnchorId+".a")
                .attr("width",newWidth);

                d3.select("foreignObject#panel_status_"+StringAnchorId)
                .attr("width",newWidth-50);

                d3.select("rect.xAnchor."+StringAnchorId)
                .attr("x", newWidth-ANCHOR_WIDTH);

                d3.select("rect.yAnchor."+StringAnchorId)
                .attr("width", thisComp.width-ANCHOR_WIDTH);

                d3.select("rect.xyAnchor."+StringAnchorId)
                .attr("x", thisComp.width-ANCHOR_WIDTH)
                .attr("y", thisComp.height-ANCHOR_WIDTH);

                d3.select("foreignObject#textbody_"+StringAnchorId)
                .attr("width", thisComp.width - 4 - ANCHOR_WIDTH )

                d3.select("g#logCirGroup_"+StringAnchorId)
                .attr("transform", () => {
                    x = thisComp.width;
                    y = thisComp.height;
                    return "translate(" + (x).toString() + "," + (y - 10).toString() + ")";
                });

                d3.select("foreignObject#panel_edit_mode"+StringAnchorId)
                .attr("x", newWidth - 30)


                d3.select("circle#outputCir"+StringAnchorId+"_0")
                .attr("cx", thisComp.width);

            }
        }

        if (selection_box_started) {
            var x1 = selection_box_x; 
            var y1 = selection_box_y;

            var x2 = d3.mouse(allContents.node())[0];
            var y2 = selection_box_y; 

            var x3 = d3.mouse(allContents.node())[0];
            var y3 = d3.mouse(allContents.node())[1];

            var x4 = selection_box_x; 
            var y4 = d3.mouse(allContents.node())[1];

            
            selection_box.attr("x", selection_box_x)
            .attr("points", () => {
                return x1 + "," + y1 + " " +
                x2 + "," + y2 + " " +
                x3 + "," + y3 + " " +
                x4 + "," + y4 + " " +
                x1 + "," + y1 + " " ;
            })
            .attr("fill", ()=>{
                if (x1 > x2)
                return "#2a2a48";
                else
                return "#a95b54";

            })
            .attr("stroke", "black")
            .attr("stroke-dasharray", "4 4")
            .attr("stroke-width", 1)
            .attr("fill-opacity", 0.1);
        }
        handleEdgeMovement(StringAnchorId);
})
.on('mouseup', function () {
    if (startDrag) {
        
        var just_moved_component = selectComp(clickedId);
        try {
            //This needs to move to a separate function . 
            components_selection_data[clickedId] = {"x0": just_moved_component.X, "y0": just_moved_component.Y, "x1": just_moved_component.X+just_moved_component.width, "y1": just_moved_component.Y + just_moved_component.height};

            just_moved_component = null; 
        } catch (error) {
            console.log(error);
        }
        startDrag = false;
    }
    if (edgeStarted) {
        edgeStarted = false;
        var theEdge = d3.select("#" + selectedcircleId).remove();
    }
    if (StringAnchorclicked) {
        var modified_string_comp = selectComp(StringAnchorId);
        components_selection_data[StringAnchorId] = {"x0": modified_string_comp.X, "y0": modified_string_comp.Y, "x1": modified_string_comp.X+modified_string_comp.width, "y1": modified_string_comp.Y + modified_string_comp.height};
        StringAnchorclicked = false;
    }
    if (SliderAnchorclicked) {
        SliderAnchorclicked = false;
    }
    if(selection_box_started) {
        selection_box.remove();
        selected_components = [];

        temp_selected_xs = [];
        temp_selected_ys = [];
    
    
        min_selected_x = 0;
        min_selected_y = 0;
    
        max_selected_x = 0;
        max_selected_y = 0; 
    

        for (const key in components_selection_data) {
            if (components_selection_data.hasOwnProperty(key)) {
                if(components_selection_data[key].x0 > selection_box_x &&
                     components_selection_data[key].y0 > selection_box_y &&
                     components_selection_data[key].x1 < d3.mouse(allContents.node())[0] &&
                     components_selection_data[key].y1 < d3.mouse(allContents.node())[1])
                     {
                         temp_selected_xs.push(components_selection_data[key].x0);
                         temp_selected_xs.push(components_selection_data[key].x1);
                         temp_selected_ys.push(components_selection_data[key].y0);
                         temp_selected_ys.push(components_selection_data[key].y1);
                         selected_components.push(key);
                     }      
            }
        }
        console.log(selected_components);                     
        highlightSelection(selected_components)
        selection_box_started =false;
    }

    if (selection_groud_selected) {
        selection_groud_selected = false; 
    }
});


var someCircle = null; 
function highlightSelection(components_list) {
    if (selection_rectangle_group != null ) {
        selection_rectangle_group.remove();
        selection_rectangle_group = null;

        horizontal_alignment_box.remove();
        horizontal_alignment_box  = null; 

        vertical_alignment_box.remove();
        vertical_alignment_box = null; 

        selection_rectangle_group_rect.remove();
        selection_rectangle_group_rect = null; 

        someCircle.remove();
    }

        if ( components_list.length > 0 ) {
            min_selected_x = Math.min(...temp_selected_xs);
            max_selected_x = Math.max(...temp_selected_xs) - min_selected_x;



            console.log(temp_selected_xs)

            min_selected_y = Math.min(...temp_selected_ys);
            max_selected_y = Math.max(...temp_selected_ys) - min_selected_y;

            console.log(temp_selected_xs)
            someCircle= allContents.append("circle")
            .attr("cx", (min_selected_x + min_selected_x + max_selected_x)/2.0)
            .attr("cy", (min_selected_y + min_selected_y + max_selected_y)/2.0)
            .attr("r", 10)
            .attr("fill", "red")

            selection_rectangle_group = allContents.append("g")
            .attr("transform", "translate("+(min_selected_x-20)+","+(min_selected_y-20)+")")
            .attr("width", max_selected_x+40)
            .attr("height", max_selected_y+40)


            selection_rectangle_group_rect = selection_rectangle_group.append("rect")
            .attr("width", max_selected_x+40)
            .attr("height", max_selected_y+40)
            .attr("fill", "gray")
            .attr("rx", 25)
            .attr("ry", 25)
            .attr("fill-opacity", 0.3)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("stroke-opacity", 0.5)
            .style("cursor", "pointer")
            .on("mousedown", ()=>
            {
                selection_groud_selected = true; 
                console.log("you are in now .... ... ")
            })

            horizontal_alignment_box = showHorizontalAlignment(selection_rectangle_group);
            vertical_alignment_box = showVerticalAlignment (selection_rectangle_group);
        }
    


}

function alignComponent(alignment) {

    selected_components.forEach(element => {
        var this_comp = selectComp(element);
        if (alignment == "left") {

            this_comp.X = min_selected_x;

        } else if (alignment == "right") {

            this_comp.X = max_selected_x + min_selected_x - this_comp.width;

        } else if (alignment == "center") {

            this_comp.X = (min_selected_x + min_selected_x + max_selected_x)/2.0 - this_comp.width/2.0;

        } else if (alignment == "top") {
    
        } else if (alignment == "bottom") {
    
        } else {
    
        }

        moveComponent(element, this_comp.X, this_comp.Y);

        components_selection_data[element].x0 = this_comp.X;
        components_selection_data[element].x1 = this_comp.X + this_comp.width;
        components_selection_data[element].y0 = this_comp.Y;
        components_selection_data[element].y1 = this_comp.Y + this_comp.height;


        
    });


}
function showHorizontalAlignment(selectionBox) {
    console.log(selectionBox.attr("width"))
    var horizAlignBox = selectionBox.append("rect")
    .attr("x", ((selectionBox.attr("width") - horizontal_align_box.W )/2.0))
    .attr("y", (-horizontal_align_box.H-5))
    .attr("width", horizontal_align_box.W)
    .attr("height", horizontal_align_box.H)
    .attr("fill", horizontal_align_box.color)
    .attr("rx", horizontal_align_box.radius)
    .attr("opacity", horizontal_align_box.opacity)

    selectionBox.append("foreignObject")
    .attr("id", "halign_box")
    
    .attr("x", ((selectionBox.attr("width") - horizontal_align_box.W )/2.0))
    .attr("width", horizontal_align_box.W)
    .attr("height", horizontal_align_box.H)
    .attr("y", (-horizontal_align_box.H-5))
    .html(`&nbsp;<a href="#" onclick="alignComponent('left')"><i class="fa fa-align-left"></i></a>
    <a href="#" onclick="alignComponent('center')" ><i class="fa fa-align-center"></i></a>
    <a href="#"  onclick="alignComponent('right')"><i class="fa fa-align-right"></i></a>
    <a href="#"><i class="fa fa-pause" aria-hidden="true"></i><i class="fa fa-pause" aria-hidden="true" style="margin-left: 3px;"></i></a>
    `)
    return horizAlignBox;
}



function showVerticalAlignment(selectionBox) {

    var vertAlignBox = selectionBox.append("rect")
    .attr("y", ((selectionBox.attr("height") - vertical_align_box.H )/2.0))
    .attr("x", (-vertical_align_box.W-5))
    .attr("width", vertical_align_box.W)
    .attr("height", vertical_align_box.H)
    .attr("fill", vertical_align_box.color)
    .attr("opacity", vertical_align_box.opacity)
    .attr("rx", vertical_align_box.radius)

    selectionBox.append("foreignObject")
    .attr("id", "valign_box")
    
    .attr("y", ((selectionBox.attr("height") - vertical_align_box.H )/2.0))
    .attr("width", vertical_align_box.W)
    .attr("height", vertical_align_box.H)
    .attr("x", (-vertical_align_box.W-5))
    .html(`<a id="valign_icon" href="#"><i class="fa fa-align-left fa-rotate-90"></i></a>
    <a  id="valign_icon" href="#"><i class="fa fa-align-center fa-rotate-90"></i></a>
    <a id="valign_icon"  href="#"><i class="fa fa-align-right fa-rotate-90"></i></a>
    <a id="valign_icon"  href="#" style="margin-left: 5px;" ><i class="fa fa-pause fa-rotate-90" aria-hidden="true"></i>
    <i class="fa fa-pause fa-rotate-90" aria-hidden="true"></i></a>
    `)

    return vertAlignBox;
}

export {selection_groud_selected};
