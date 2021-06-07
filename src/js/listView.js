/*
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████████████─██████████████─██████████─██████████████─██████──────────██████────██████─────────██████████─██████████████─██████████████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░░░██─██░░██████████──██░░██────██░░██─────────██░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─
─██░░██████░░██─██░░██████░░██─██████░░██████─████░░████─██░░██████░░██─██░░░░░░░░░░██──██░░██────██░░██─────────████░░████─██░░██████████─██████░░██████─
─██░░██──██░░██─██░░██──██░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██████░░██──██░░██────██░░██───────────██░░██───██░░██─────────────██░░██─────
─██░░██──██░░██─██░░██████░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██░░██████████─────██░░██─────
─██░░██──██░░██─██░░░░░░░░░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██░░░░░░░░░░██─────██░░██─────
─██░░██──██░░██─██░░██████████─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██████████░░██─────██░░██─────
─██░░██──██░░██─██░░██─────────────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██████░░██────██░░██───────────██░░██───────────██░░██─────██░░██─────
─██░░██████░░██─██░░██─────────────██░░██─────████░░████─██░░██████░░██─██░░██──██░░░░░░░░░░██────██░░██████████─████░░████─██████████░░██─────██░░██─────
─██░░░░░░░░░░██─██░░██─────────────██░░██─────██░░░░░░██─██░░░░░░░░░░██─██░░██──██████████░░██────██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░░░██─────██░░██─────
─██████████████─██████─────────────██████─────██████████─██████████████─██████──────────██████────██████████████─██████████─██████████████─────██████─────
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
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
import {addcomponent} from './functions.js';
import {uuidv4, addCircle} from './handle.js';
import {HandleSelectedOption} from './layout.js';
import "@fontsource/ubuntu-mono";
var d3 = require('d3');

function CreateNewListView(FromExisting = null, optionlist_predefined_items = null) {
    var reactContext = this;
    var newcomp;

    if (FromExisting == null) {
        newcomp = addcomponent(uuidv4("C"), 1, 1);
        var guid = newcomp.GUID;
        var data = { ...reactContext.state.parent_child_matrix };
        data[guid] = [];
        reactContext.setState({
            parent_child_matrix: data,
        });
        newcomp.Name = "Select item";
        newcomp.value = [
            ["dummy_Option1", 0],
            [1.022235, 1],
            [2235, 0],
            ["shouldBeSelected", 1],
            ["dummy_Option1", 0],
            [1.022235, 1],
            [2235, 0],
            ["shouldBeSelected", 1],
            ["dummy_Option1", 0],
            [1.022235, 1],
            [2235, 0],
            ["shouldBeSelected", 1]
        ]

        if (optionlist_predefined_items != null) {
            newcomp.optionListValues = JSON.parse(optionlist_predefined_items)
        }

    } else {
        newcomp = FromExisting;
    }

    newcomp.fill = "url(#grad1ient)";
    var one_character_width = 8;
    var padding = 20;
    var titleMargin = 30;
    var titleMarginLeft = 30;
    newcomp.height = 200;
    newcomp.type = "listView";
    newcomp.dftype = "shlow";


    // TODO : get the longest text in the component. and set the width based on this. 

    newcomp.width = 200;

    var allContents = d3.select("#allCanvasContents");

    function update() {
        node.attr("transform", d => `translate(${d.x},${d.y})`);
    }

    var dragHandler = d3.drag()
       .on("start", (event, d) => Dummyrect.attr("stroke", "red"))
       .on("drag", (event, d) => {d.x = event.x; d.y = event.y})
       .on("end", (event, d) => Dummyrect.attr("stroke", "#3a4c69"))
       .on("start.update drag.update end.update", update);

    var cont = allContents.append("g")
        .attr("class", "component")
        .attr("id", newcomp.GUID);

    var genX;
    var genY;

    var node = cont
        .append("g")
        .attr("class", newcomp.type + " " + newcomp.state + " " + newcomp.selection + " " + newcomp
            .view + " " + newcomp.GUID)
        .attr("id", "comp-" + newcomp.GUID)
        .attr("transform", () => {
            if (FromExisting == null) {
                genX = Math.random() * 500 + 200;
                genY = Math.random() * 500 + 200;
                newcomp.X = genX;
                newcomp.Y = genY;
                return "translate(" + genX + ", " + genY + ")";
            } else {
                return "translate(" + FromExisting.X + ", " + FromExisting.Y + ")";
            }
        })
        .data([{
            x: FromExisting ? FromExisting.X : genX,
            y: FromExisting ? FromExisting.Y : genY,
        }])
        .call(dragHandler);

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
                newcomp.inputs[index].circle = addCircle();
                newcomp.inputs[index].circle.element = this.id;
                newcomp.inputs[index].circle.CX = 0;
                newcomp.inputs[index].circle.CY = (index * padding + titleMargin);
                newcomp.inputs[index].type = "input";
                return "input";
            });
    }


    var OutputGroup = node.append('g');
    for (let index = 0; index < newcomp.outputs.length; index++) {
        var out = OutputGroup.append('circle')
            .attr("cx", newcomp.width)
            .attr("cy", newcomp.height / 2)
            .attr("fill", "gray") //newcomp.fill)
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

    var Dummyrect = node.append('rect')
        .attr("class", "CompLBodyDummy " + newcomp.GUID)
        .attr("id", "dummyRect_" + newcomp.GUID)
        .attr("rx", "3")
        .attr("ry", "3")
        //.attr("filter", "url(#f2")
        .attr("stroke-width", "1")
        .attr("stroke", "black")
        .attr("width", newcomp.width)
        .attr("height", newcomp.height)
        .attr("fill", "#CECECE");

    node.append("text")
        .attr("x", 5)
        .attr("y", 15)
        .text("listItems")
        .attr("fill", "black")
        .style('font-family', 'Ubuntu Mono');

    //listbox items
    node.append("foreignObject")
        .attr("class", "listView " + newcomp.GUID)
        .attr("id", "listView-" + newcomp.GUID)
        .attr("y", 20)
        .attr("x", 1)
        .attr("width", newcomp.width - 2)
        .attr("height", newcomp.height - 20)
        .html(() => {
            var selectedOptions = [];
            console.log(newcomp.value)
            var ListItemsvalueReturn = `<select id="listviewSelect" class="listView ` + newcomp.GUID + `" size="5"  multiple>`;
            newcomp.value.forEach(option => {

                if (option[1] == 0) {
                    ListItemsvalueReturn += `<option id="someSelection" class="listViewOption ` + newcomp.GUID + `" value="` + option[0] + `">` + option[0] + `</option>`
                } else {
                    ListItemsvalueReturn += `<option id="someSelection" class="listViewOption ` + newcomp.GUID + `" value="` + option[0] + `" selected>` + option[0] + `</option>`
                    selectedOptions.push(option[0]);
                }
            });
            newcomp.outputs[0].value = JSON.stringify(selectedOptions);
            ListItemsvalueReturn += `</select>`
            HandleSelectedOption();
            return ListItemsvalueReturn;
        })

    var rect = node.append('rect')
        .attr("class", "CompLBody " + newcomp.GUID)
        .attr("id", newcomp.GUID)
        .attr("rx", "3")
        .attr("ry", "3")
        .attr("width", newcomp.width)
        .attr("height", 20)
        .attr("fill", newcomp.fill)
        .attr("fill-opacity", "0.01")
        .on("mouseover", function() {
            d3.select(this)
                .attr("cursor", "pointer");
        })
        .on("mouseout", function() {
            d3.select(this).attr("fill", newcomp.fill)
        })

    node.append("g").attr("id", "optionListOption-" + newcomp.GUID)

    if (FromExisting == null) {
        var current_all_comp = reactContext.state.allComp.slice();
        console.log("Adding a list view" + newcomp);
        current_all_comp.push(newcomp);
        reactContext.setState({
            allComp: current_all_comp,
        });
    }

    var current_comp_out = { ...reactContext.state.comp_output_edges};
    var current_comp_in = { ...reactContext.state.comp_input_edges};
    current_comp_out[newcomp.GUID] = new Array(newcomp.inputs.length);
    current_comp_in[newcomp.GUID] = new Array(newcomp.outputs.length);
    reactContext.setState({
        comp_input_edges: current_comp_in,
        comp_output_edges: current_comp_out,
    });

    var current_components_selection = { ...reactContext.state.components_selection_data };
    current_components_selection[newcomp.GUID] = { 
        "x0": newcomp.X, 
        "y0": newcomp.Y, 
        "x1": newcomp.X + newcomp.width, 
        "y1": newcomp.Y + newcomp.height 
    };
    reactContext.setState({
        components_selection_data: current_components_selection,
    });
}

export {CreateNewListView};
