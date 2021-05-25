/*
───────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████████████─████████████████───██████████─██████──────────██████─██████████████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░░░██───██░░░░░░██─██░░██████████──██░░██─██░░░░░░░░░░██─
─██░░██████████─██████░░██████─██░░████████░░██───████░░████─██░░░░░░░░░░██──██░░██─██░░██████████─
─██░░██─────────────██░░██─────██░░██────██░░██─────██░░██───██░░██████░░██──██░░██─██░░██─────────
─██░░██████████─────██░░██─────██░░████████░░██─────██░░██───██░░██──██░░██──██░░██─██░░██─────────
─██░░░░░░░░░░██─────██░░██─────██░░░░░░░░░░░░██─────██░░██───██░░██──██░░██──██░░██─██░░██──██████─
─██████████░░██─────██░░██─────██░░██████░░████─────██░░██───██░░██──██░░██──██░░██─██░░██──██░░██─
─────────██░░██─────██░░██─────██░░██──██░░██───────██░░██───██░░██──██░░██████░░██─██░░██──██░░██─
─██████████░░██─────██░░██─────██░░██──██░░██████─████░░████─██░░██──██░░░░░░░░░░██─██░░██████░░██─
─██░░░░░░░░░░██─────██░░██─────██░░██──██░░░░░░██─██░░░░░░██─██░░██──██████████░░██─██░░░░░░░░░░██─
─██████████████─────██████─────██████──██████████─██████████─██████──────────██████─██████████████─
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

import $ from "jquery";
var d3 = require('d3');

//TODO : check this for the text overflow : https://bl.ocks.org/mbostock/1424037 
function CreatenewString(FromExisting = null) {
    if (FromExisting == null) {
        var newcomp = addcomponent(uuidv4("C"), 1, 1);
        parent_child_matrix[newcomp.GUID] = []

        newcomp.Name = "Panel";
        newcomp.width = 300;

    } else {
        //console.log(FromExisting);
        var newcomp = FromExisting;
        newcomp.value = newcomp.outputs[0].value;
        // newcomp.Name = FromExisting.Name;
        // newcomp.Name = "Panel";

    }

    newcomp.fill = "white"; //"#fbedcc";
    one_character_width = 8;
    padding = 20;
    titleMargin = 30;
    titleMarginLeft = 30;
    // newcomp.height = 100;//titleMargin + (Math.max(newcomp.inputs.length, newcomp.outputs.length + 1)) *padding;
    newcomp.type = "string";
    newcomp.dftype = "shlow";

    // newcomp.width = 200;
    //console.log(newcomp)
    newcomp.inputs[0].value = newcomp.value;

    // compPos = [Math.random() * 500 +200, Math.random() * 500 +200]
    var cont = allContents.append("g")
        .attr("class", "component")
        .attr("id", newcomp.GUID);

    var node = cont
        .append("g")
        .attr("class", newcomp.type + " " + newcomp.state + " " + newcomp.selection + " " + newcomp
            .view + " " + newcomp.GUID)
        .attr("id", "comp-" + newcomp.GUID)
        .attr("transform", () => {
            if (FromExisting == null) {
                let genX = Math.random() * 500 + 200;
                let genY = Math.random() * 500 + 200;
                newcomp.X = genX;
                newcomp.Y = genY;
                return "translate(" + genX + ", " + genY + ")";
            } else {
                return "translate(" + FromExisting.X + ", " + FromExisting.Y + ")";
            }
        })



    var rect = node.append('rect')
        .attr("class", "CompBody " + newcomp.GUID)
        .attr("id", newcomp.GUID)
        .attr("rx", COMPONENT_RADIUS)
        .attr("ry", COMPONENT_RADIUS)
        .attr("y", "-15")
        .attr("width", () => {
            // 
            return 10 + newcomp.Name.length * 6;
        })
        .attr("height", newcomp.height + 10)
        .attr("fill", "#525252")
        .attr("fill-opacity", "1.0")
        .on("mouseover", function() {
            d3.select(this)
                .attr("cursor", "pointer");
        })


    var InputGroup = node.append('g');
    for (let index = 0; index < newcomp.inputs.length; index++) {
        var inp = InputGroup.append('circle').lower()
            .attr("cx", "0")
            .attr("cy", newcomp.height / 2)
            .attr("fill", "gray") //newcomp.fill)
            .attr("r", "5")
            .attr("stroke", "black")
            .attr("stroke-width", "2")
            .attr("id", "inputCir" + newcomp.GUID + "_" + index)
            .attr("class", "inputCir " + newcomp.GUID + " " + index)
            .attr("type", function() {

                newcomp.inputs[index].circle = this;
                if (FromExisting == null) {

                    newcomp.inputs[index].type = "text";
                }
                return "input";
            }).lower();
    }



    var OutputGroup = node.append('g');
    for (let index = 0; index < newcomp.outputs.length; index++) {
        var out = OutputGroup.append('circle')
            .attr("cx", newcomp.width)
            .attr("cy", newcomp.height / 2)
            .attr("fill", "gray")
            .attr("r", "5")
            .attr("stroke", "black")
            .attr("stroke-width", "2")
            .attr("id", "outputCir" + newcomp.GUID + "_" + index)
            .attr("class", "outputCir " + newcomp.GUID + " " + index)
            .attr("type", function() {
                newcomp.outputs[index].circle = this;
                newcomp.outputs[index].type = "output";
                return "output";
            }).lower();
    }


    //7.5+newcomp.Name.length*7.5


    var rectstatus = node.append('rect')
        .attr("class", "CompBody statusRect " + newcomp.GUID)
        .attr("id", "statusRect" + newcomp.GUID)
        .attr("rx", COMPONENT_RADIUS)
        .attr("ry", COMPONENT_RADIUS)
        .attr("x", "50")
        .attr("y", newcomp.height - 20)
        .attr("width", newcomp.width - 50)
        .attr("height", 35)
        .attr("fill", "#525252")
        .attr("fill-opacity", "1.0")


    var Panel_staus = node.append('foreignObject')
        .attr("id", "panel_status_" + newcomp.GUID)
        .attr("class", "panel_status " + newcomp.GUID)
        .html("Type : " + newcomp.inputs[0].type)
        .attr("x", "55")
        .attr("y", newcomp.height + 2)
        .attr("width", newcomp.width - 50)
        .attr("height", 15)
        .attr("fill", "white")
        // .attr("width", newcomp.width - 4 - ANCHOR_WIDTH);


    var Panel_staus = node.append('foreignObject')
        .attr("id", "panel_edit_mode" + newcomp.GUID)
        .attr("class", "panel_edit_mode " + newcomp.GUID)
        .html(() => {
            return '<a id="changeEditMoveMode_' + newcomp.GUID + '" href="#" onclick="edit_move_mode(\'' + newcomp.GUID + '\', 0)">Edit</a>';
        })
        .attr("x", newcomp.width - 30)
        .attr("y", newcomp.height + 2)
        .attr("width", 30)
        .attr("height", 15)
        .attr("fill", "white")
        // .attr("width", newcomp.width - 4 - ANCHOR_WIDTH);


    var Dummyrect = node.append('rect')
        .attr("class", "CompBodyDummy " + newcomp.GUID)
        .attr("id", "dummyRect_" + newcomp.GUID)
        .attr("rx", COMPONENT_RADIUS)
        .attr("ry", COMPONENT_RADIUS)
        //.attr("filter", "url(#f2")
        .attr("stroke-width", "1")
        .attr("stroke", "black")
        .attr("width", newcomp.width)
        .attr("height", newcomp.height)
        .attr("fill", newcomp.fill)


    var Titlegroup = node.append("g")
        .attr("transform", () => {
            return "translate(0, 15)";
        });


    var Title = Titlegroup.append("text")
        .attr("class", "nodetitle node_title" + newcomp.GUID)
        .attr("id", "nodeTitle" + newcomp.GUID)
        .text(newcomp.Name)
        .attr("fill", "white")
        .attr("x", 5)
        .attr("y", -18)


    var textbody = node.append('foreignObject')
        .attr("id", "textbody_" + newcomp.GUID)
        .attr("class", "textbody " + newcomp.GUID)
        .attr("height", newcomp.height - ANCHOR_WIDTH - 5)
        .html(function() {

            if (newcomp.inputs[0].type == "html" || newcomp.inputs[0].type == "input") {
                return newcomp.inputs[0].value;
            } else if (newcomp.inputs[0].type == "text") {
                return "<pre>" + newcomp.inputs[0].value + "</pre>";
            }
        })
        .attr("transform", "translate(5, 5)")
        .attr("width", newcomp.width - 4 - ANCHOR_WIDTH);

    if (newcomp.inputs[0].type == "json") {
        $("foreignObject#textbody_" + newcomp.GUID).html('<div id="jsonTreeViewer' + newcomp.GUID + '"></div>')
        jsonView.format(newcomp.inputs[0].value, "div#jsonTreeViewer" + newcomp.GUID);
    } else if (newcomp.inputs[0].type == "plot") {
        data = JSON.parse(newcomp.inputs[0].value);
        drawPlotComponent(data, newcomp);
    } else if (newcomp.inputs[0].type == "spatial") {
        data = JSON.parse(newcomp.inputs[0].value);
        unparseData = newcomp.inputs[0].value;
        visualizeSpatialComponent(data, unparseData, newcomp);

    }


    var rect = node.append('rect')
        .attr("class", "CompBody " + newcomp.GUID + " a")
        .attr("id", "overlaySelector" + newcomp.GUID)
        .attr("rx", COMPONENT_RADIUS)
        .attr("ry", COMPONENT_RADIUS)
        .attr("y", "0")
        .attr("width", newcomp.width - 5)
        .attr("height", newcomp.height - 5)
        .attr("fill", "white") //"#ffeec7")
        .attr("fill-opacity", "0.15")
        .on("mouseover", function() {
            d3.select(this)
                .attr("cursor", "pointer");
        })

    var rectanchorX = node.append('rect')
        .attr("class", "xAnchor " + newcomp.GUID)
        .attr("width", ANCHOR_WIDTH)
        .attr("height", newcomp.height - ANCHOR_WIDTH)
        .attr("x", newcomp.width - ANCHOR_WIDTH)
        .attr("rx", COMPONENT_RADIUS)
        .attr("ry", COMPONENT_RADIUS)
        .attr("fill-opacity", 0.01)
        .on("mousedown", () => {
            StringAnchorclicked = true;
            StringAnchorType = XANCHOR;
            StringAnchorId = newcomp.GUID;
            anchorMouseXpos = d3.mouse(allContents.node())[0] - newcomp.width;
        });


    var rectanchorY = node.append('rect')
        .attr("class", "yAnchor " + newcomp.GUID)
        .attr("height", ANCHOR_WIDTH)
        .attr("width", newcomp.width - ANCHOR_WIDTH)
        .attr("y", newcomp.height - ANCHOR_WIDTH)
        .attr("fill-opacity", 0.01)
        .attr("rx", "3")
        .attr("ry", "3")
        .on("mousedown", () => {
            StringAnchorclicked = true;
            StringAnchorType = YANCHOR;
            StringAnchorId = newcomp.GUID;
            anchorMouseYpos = d3.mouse(allContents.node())[1] - newcomp.height;
        });

    var rectanchorXY = node.append('rect')
        .attr("class", "xyAnchor " + newcomp.GUID)
        .attr("width", ANCHOR_WIDTH)
        .attr("height", ANCHOR_WIDTH)
        .attr("x", newcomp.width - ANCHOR_WIDTH)
        .attr("y", newcomp.height - ANCHOR_WIDTH)
        .attr("fill-opacity", 0.01)
        .attr("rx", COMPONENT_RADIUS)
        .attr("ry", COMPONENT_RADIUS)
        .on("mousedown", () => {
            StringAnchorclicked = true;
            StringAnchorType = XYANCHOR;
            StringAnchorId = newcomp.GUID;
        });

    if (FromExisting == null) {
        allComp.push(newcomp);
    }
    comp_input_edges[newcomp.GUID] = new Array(newcomp.inputs.length);
    comp_output_edges[newcomp.GUID] = new Array(newcomp.outputs.length);


    components_selection_data[newcomp.GUID] = { "x0": newcomp.X, "y0": newcomp.Y, "x1": newcomp.X + newcomp.width, "y1": newcomp.Y + newcomp.height };


    var mainGrid = d3.select("#mainGrid");
    handleTheClickOnAllComponents();
    handleEdgeInitialization();
    handleComponentSelection();
    HandleDoubleClick();

}

$("div#addString").on('click', function(e) {
    CreatenewString();
});

export {CreatenewString};