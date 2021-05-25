/*
───────────────────────────────────────────────────────────────────────────────────────────────
─██████─────���───██████████████─████████──████████─██████████████─██████──██████─██████████████─
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
import {currentLeftColWidth, currentTopBarHeight, currentRightColWidth, messageshown,
    leftColumnIsSelected, rightColIsdisplayed, rightColumnIsSelected, leftColIsdisplayed} 
    from './constants.js';
import $ from "jquery";
// import {event as currentEvent} from 'd3-selection';
var d3 = require("d3");
// import * as d3 from 'd3';

d3.select("div#LeftPropertiesBar").style("width", () => { return currentLeftColWidth + "px" }).style("top", () => { return (currentTopBarHeight).toString() + "px" })
d3.select("div#LeftPropertiesBarSelector").style("top", () => { return (currentTopBarHeight).toString() + "px" }).style("left", currentLeftColWidth + "px")


d3.select("div#PropertiesBar").style("width", () => { return currentRightColWidth + "px" }).style("top", () => { return (currentTopBarHeight).toString() + "px" })
d3.select("div#PropertiesBarSelector").style("top", () => { return (currentTopBarHeight).toString() + "px" }).style("right", currentRightColWidth + "px")

d3.select("div#TopPropertiesBar").style("height", () => { return currentTopBarHeight + "px" })

var rightColAnchor = d3.select("div#PropertiesBarSelector")
    .on("mousedown", function() {
        currentRightColWidth = parseInt($("div#PropertiesBar").css("width").replace("px", ""));
        rightColumnIsSelected = true;
    });


var leftColAnchor = d3.select("div#LeftPropertiesBarSelector")
    .on("mousedown", function() {
        currentLeftColWidth = parseInt($("div#LeftPropertiesBar").css("width").replace("px", ""));
        leftColumnIsSelected = true;
    });

/*
d3.select("body")
    .on("mousemove", function(evt) {
        d3.select(this).style("cursor", "auto");
        currentRightColWidth = window.innerWidth - 16 - d3.event.clientX;
        currentLeftColWidth = d3.event.clientX;
        if (rightColumnIsSelected) {
            d3.select("div#PropertiesBar")
                .style("width", () => {
                    if (currentRightColWidth >= 50) {
                        if (!rightColIsdisplayed)
                            d3.select("div#PropertiesBar").style("display", "block");
                        d3.select("div#PropertiesBarSelector").style("background-color", "#252525")

                        rightColIsdisplayed = true;
                        return (currentRightColWidth).toString() + "px";

                    } else {
                        rightColIsdisplayed = false;
                        d3.select("div#PropertiesBar").style("display", "none");
                        d3.select("div#PropertiesBarSelector").style("background-color", "#1abc9c")
                    }
                });
            d3.select("div#PropertiesBarSelector")
                .style("right", () => {
                    if (currentRightColWidth >= 50)
                        return (currentRightColWidth).toString() + "px";
                    else
                        return (0).toString() + "px";

                });
        }

        if (leftColumnIsSelected) {
            d3.select("body").style("cursor", "ew-resize");
            d3.select("div#LeftPropertiesBar")
                .style("width", () => {
                    if (currentLeftColWidth >= 50) {
                        if (!leftColIsdisplayed)
                            d3.select("div#LeftPropertiesBar").style("display", "block");
                        d3.select("div#LeftPropertiesBarSelector").style("background-color", "#252525")
                        leftColIsdisplayed = true;
                        return currentLeftColWidth.toString() + "px";
                    } else {

                        leftColIsdisplayed = false;
                        d3.select("div#LeftPropertiesBar").style("display", "none");
                        d3.select("div#LeftPropertiesBarSelector").style("background-color", "#1abc9c")

                    }
                });

            d3.select("div#LeftPropertiesBarSelector")
                .style("left", () => {
                    if (currentLeftColWidth >= 50) {
                        return currentLeftColWidth.toString() + "px";
                    } else {
                        return (0).toString() + "px";
                    }
                });
        }

        if (messageshown) {
            let trns = d3.transition()
                .duration(500)
                .ease(d3.easeLinear);


            d3.select("div#Addedmessage")
                .transition(trns)
                .style("opacity", () => {
                    messageshown = false;
                    return 0
                })

            d3.select("div#buttonClickedname")
                .transition(trns)
                .style("opacity", () => {
                    messageshown = false;
                    return 0
                })
        }

    })
    .on("mouseup", () => {
        if (rightColumnIsSelected)
            rightColumnIsSelected = false;

        if (leftColumnIsSelected)
            leftColumnIsSelected = false;
    })
    */

function changedefTitle() {

    let theguid = $("a#changeTitleName").attr("guid");
    let currentText = $("a#changeTitleName").text();

    $("span#DefenitionMainTitle").html(() => {
        return '<input id="TitleToBeChangedInput" type="text" value="' + currentText + '">'
    });
    d3.select("#TitleToBeChangedInput").node().focus();
    d3.select("#TitleToBeChangedInput")
        .on("focusout", function() {
            let newText = $("#TitleToBeChangedInput").val();
            $("span#DefenitionMainTitle").html(() => {
                editDefName(theguid, newText);
                return '<a href="#" id="changeTitleName" onclick="changedefTitle()" guid="' + theguid + '">' + newText + '</a> </span>'
            })
        })
        .on("keydown", function() {
            if (d3.event.keyCode === 13) {
                let newText = $("#TitleToBeChangedInput").val();
                $("span#DefenitionMainTitle").html(() => {
                    editDefName(theguid, newText)
                    return '<a href="#" id="changeTitleName" onclick="changedefTitle()" guid="' + theguid + '">' + newText + '</a> </span>'
                })
            } else if (d3.event.keyCode === 27) {
                $("span#DefenitionMainTitle").html(() => {
                    return '<a href="#" id="changeTitleName" onclick="changedefTitle()" guid="' + theguid + '">' + currentText + '</a> </span>'
                })
            }

        });
}

function editDefName(api_key, newName) {
    $.ajax({
        "type": "POST",
        "dataType": "json",
        "data": {
            "guid": api_key,
            "name": newName
        },
        "beforeSend": function(xhr, settings) {
            $.ajaxSettings.beforeSend(xhr, settings);
        },
        "success": function(result) {}
    })
}

function onMinimizeClick() {
    d3.select("#maximizeUpperBar").transition()
        .style("display", "block");

    d3.select("#minimizeUpperBar")
        .style("display", "none")

    d3.select("#TopPropertiesBar").transition()
        .duration(200)
        .style("top", "-60px");

    d3.select("#LeftPropertiesBar").transition()
        .duration(200)
        .style("top", "0px");

    d3.select("#PropertiesBar").transition()
        .duration(200)
        .style("top", "0px");

    d3.select("#LeftPropertiesBarSelector").transition()
        .duration(200)
        .style("top", "0px");

    d3.select("#PropertiesBarSelector").transition()
        .duration(200)
        .style("top", "0px");

    d3.select(".canvas_container").transition()
        .duration(200)
        .style("top", "0px");

    d3.select("#maximizeUpperBar").transition()
        .duration(200)
        .style("right", "300px")
        .style("top", "61px");

    d3.select("#minimizeUpperBar").transition()
        .duration(200)
        .style("right", "300px")
        .style("top", "61px");
}

function onMaximizeClick() {

    d3.select("#maximizeUpperBar")
        .style("display", "none");

    d3.select("#minimizeUpperBar")
        .style("display", "block")

    d3.select("#TopPropertiesBar").transition()
        .duration(200)
        .style("top", "0px");

    d3.select("#LeftPropertiesBar").transition()
        .duration(200)
        .style("top", "30px");

    d3.select("#PropertiesBar").transition()
        .duration(200)
        .style("top", "30px");

    d3.select("#LeftPropertiesBarSelector").transition()
        .duration(200)
        .style("top", "30px");

    d3.select("#PropertiesBarSelector").transition()
        .duration(200)
        .style("top", "30px");

    d3.select(".canvas_container").transition()
        .duration(200)
        .style("top", "30px");

    d3.select("#maximizeeUpperBar").transition()
        .duration(200)
        .style("right", "0px")
        .style("top", "38px");

    d3.select("#minimizeUpperBar").transition()
        .duration(200)
        .style("right", "0px")
        .style("top", "0px");

    d3.select("i#tomaximize")
        .transition()
        .duration(200)
        .style("transform", "rotate(180deg)");

}

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

    svgContainer.call(d3.zoom().filter(function() {
        // if (startDrag || StringAnchorclicked || SliderAnchorclicked || edgeStarted || selection_groud_selected) {
        //     return false;
        // } else {

        //     return !d3.event.button;
        // }
        return true;
    }).on("zoom", function(event) {
        // if (!startDrag) {
            allContents.attr("transform", event.transform)
        // }
    }));
}

export {onMaximizeClick, onMinimizeClick, manageCanvas};