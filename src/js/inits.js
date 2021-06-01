/*
────────────────────────────────────────────────────────────────────────────
─██████████─██████──────────██████─██████████─██████████████─██████████████─
─██░░░░░░██─██░░██████████──██░░██─██░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─
─████░░████─██░░░░░░░░░░██──██░░██─████░░████─██████░░██████─██░░██████████─
───██░░██───██░░██████░░██──██░░██───██░░██───────██░░██─────██░░██─────────
───██░░██───██░░██──██░░██──██░░██───██░░██───────██░░██─────██░░██████████─
───██░░██───██░░██──██░░██──██░░██───██░░██───────██░░██─────██░░░░░░░░░░██─
───██░░██───██░░██──██░░██──██░░██───██░░██───────██░░██─────██████████░░██─
───██░░██───██░░██──██░░██████░░██───██░░██───────██░░██─────────────██░░██─
─████░░████─██░░██──██░░░░░░░░░░██─████░░████─────██░░██─────██████████░░██─
─██░░░░░░██─██░░██──██████████░░██─██░░░░░░██─────██░░██─────██░░░░░░░░░░██─
─██████████─██████──────────██████─██████████─────██████─────██████████████─
────────────────────────────────────────────────────────────────────────────

*/

import {globalVars} from './constants.js';
import $ from "jquery";

var d3 = require("d3");

function manageCanvas() {
    var svgContainer = d3.select("svg");

    var allContents = svgContainer.append("g")
        .attr("id", "allCanvasContents");

    var backgroundRectangle = allContents.append("rect")
        .attr("fill", "url(#img122)")
        .attr("x", -1000)
        .attr("y", -1000)
        .attr("width", 6000)
        .attr("height", 6000)
        .style("cursor", "default")

    allContents.append("g")
        .attr("id", "allPaths");

    var something;
    svgContainer.call(d3.zoom().filter(function() {
        // if (startDrag || StringAnchorclicked || SliderAnchorclicked || edgeStarted || selection_groud_selected) {
            // return false;
        // } else {

            // return !d3.event.button;
        // }
        return true;
    }).on("zoom", function() {
        if (!startDrag) {
            allContents.attr("transform", d3.event.transform)
        }
    }));
}

// if (RetrievedData != undefined) {
//     if (RetrievedData.canvas_transform != undefined) {
//         allContents.attr("transform", RetrievedData.canvas_transform.transform);
//         svgContainer._groups[0][0].__zoom.k = RetrievedData.canvas_transform.kXY.k;
//         svgContainer._groups[0][0].__zoom.x = RetrievedData.canvas_transform.kXY.x;
//         svgContainer._groups[0][0].__zoom.y = RetrievedData.canvas_transform.kXY.y;
//     }
// }

// try {
//     if (RetrievedData.components != undefined) {
//         allComp = RetrievedData.components;

//         allComp.forEach(element => {
//             if (element.type == "component")
//                 CreateNewComponent(element);
//             else if (element.type == "slider")
//                 CreateNewSlider(element);
//             else if (element.type == "string")
//                 CreatenewString(element);
//             else if (element.type == "toggle")
//                 CreateNewToggle(element);
//             else if (element.type == "optionList")
//                 CreateNewOptionList(element);
//             else if (element.type == "fileUpload")
//                 CreateNewFileUpload(element);
//             else if (element.type == "listView")
//                 CreateNewListView(element);
//         });
//     }

// } catch (err) {
//     console.log(err);
// }


// try {
//     if (RetrievedData.edges != undefined) {
//         allEdges = RetrievedData.edges;
//         comp_input_edges = RetrievedData.comp_input_edges
//         comp_output_edges = RetrievedData.comp_output_edges
//         edge_comp_matrix = RetrievedData.edge_comp_matrix
//         parent_child_matrix = RetrievedData.parent_child_matrix
//         parent_child_matrix_fast_check = RetrievedData.parent_child_matrix_fast_check
//         root_components = RetrievedData.root_components
//         allEdges.forEach(element => {
//             CreatePathes(element);
//         })
//     }

// } catch (err) {
//     console.log(err);
// }


// $("div#definedComp").html(function() {
//     var somearr = udo_names;
//     var text = "";
//     for (const cat in cats) {
//         if (cats.hasOwnProperty(cat)) {
//             text += '<div id="catcard">'
//             text += '<div id="catHead" style="background-color:' + cats[cat] + '">' + cat + '</div>'
//             text += '<div id="catbody">'
//             somearr.forEach(function(element, i) {

//                 if (udo_cats[i] == cat) {
//                     text += '<button id="addComp" name="' + element + '" shName="' + udo_shortNames[i] + '" desc=\'' + udo_desc[i] + '\' type="' + udo_types[i] + '" dftype="' + udo_dftypes[i] + '" class="standardcat button" ><span style="background-color:' + udo_fill[i] + ';color:' + udo_fill[i] + ';border-radius:3px;">||</span> ' + element + '</button>'

//                 }
//             });
//             text += '</div></div>'
//         }
//     }
//     return text;
// });




// $("div#addComp").on('click', function(e) {
//     ThisComponentName = $(this).attr("name");
//     ThisComponenShortName = $(this).attr("shName");
//     ThisComponentDfType = $(this).attr("dftype");
//     ThisComponentType = $(this).attr("type");
//     ThisComponentDesc = $(this).attr("desc");

//     console.log(ThisComponentDesc)

//     if (ThisComponentType == "component") {
//         CreateNewComponent(null, ThisComponentName, {
//             "shortName": ThisComponenShortName,
//             "dfType": ThisComponentDfType
//         });
//     } else if (ThisComponentType == "optionList") {
//         CreateNewOptionList(null, ThisComponentDesc);
//     }

// });

// $("input#fileUploadFormToTheCloud").on("change", function(e) {
//     var thisFormId = $(this).attr("class");

//     var this_form_elemnt = $("#form_" + thisFormId);

//     var form_data = new FormData(this_form_elemnt[0]);
//     console.log(form_data)

//     var fileName = $(this).val();
//     console.log(fileName);

//     const thefileuploadajax = $.ajax({
//         "type": "POST",
//         "accepts": "text/json",
//         "url": "../upload/",
//         "data": form_data,
//         processData: false,
//         contentType: false,
//         "beforeSend": function(xhr, settings) {
//             $.ajaxSettings.beforeSend(xhr, settings);
//             d3.select("#fileUpload_status_" + thisFormId)
//                 .html("Uploading ..... ")

//         },
//         "success": function(res) {
//             console.log(res);
//             theCurrentComp = selectComp(thisFormId);
//             theCurrentComp.outputs[0].Name = res.FileName;
//             theCurrentComp.outputs[0].Description = { "Name": res.FileName, "size": res.FileSize, "url": res.publicURL };
//             theCurrentComp.outputs[0].value = res.publicURL;
//             d3.select("#fileUpload_status_" + thisFormId)
//                 .html("File Size : " + (res["FileSize"] / (1024 * 1024)).toString() + " MB " + "<a class='open_uploadedFile_link' href='" + res.publicURL + "' target='blank'>open</a>")

//             d3.select("#foreignObject_fileUpload" + thisFormId)
//                 .html(() => {
//                     return `
//                 <div id="TheContainedFile">` + res.FileName + `</div>
//                 <div id="TheContainedFile">Size :` + (res.FileSize / (1024 * 1024)).toFixed(4).toString() + ` MB</div>
//             `
//                 })
//             redrawDependents(thisFormId);
//         }

//     });
// }); // End of $("input#fileUploadFormToTheCloud").on("change", function(e) { ...

function HandleSelectedOption() {
    $("select#listviewSelect").on("change", function(e) {
        console.log("hello world ");
    });
}

function handleEdgeSelection() {
    d3.selectAll("path")
        .on("mousemove", function() {
            console.log("hello world")
        })
}

export {handleEdgeSelection};