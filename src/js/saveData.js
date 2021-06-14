import $ from 'jquery';
import {CreatePaths} from './functions.js';
import {CreateNewComponent} from './component.js';
import {CreateNewOptionList} from './optionlist.js';
import {CreateNewSlider} from './slider.js';
import {CreateNewPanel} from './panel.js';
import {CreateNewToggle} from './toggle.js';
import {CreateNewFileUpload} from './fileUpload.js';
import {CreateNewListView} from './listView.js';
var d3 = require('d3');

function saveData() {
    console.log('Save button clicked');
    var allContents = d3.select("#allCanvasContents");
    var svgContainer = d3.select("svg");
    this.state.allEdges.forEach(element => {
        element["d"] = $("path#" + element.path_id).attr("d");
    });
    var data = {
        "components": this.state.allComp,
        "edges": this.state.allEdges,
        "comp_input_edges": this.state.comp_input_edges,
        "comp_output_edges": this.state.comp_output_edges,
        "edge_comp_matrix": this.state.edge_comp_matrix,
        "parent_child_matrix": this.state.parent_child_matrix,
        "parent_child_matrix_fast_check": this.state.parent_child_matrix_fast_check,
        "root_components": this.state.root_components,
        "canvas_transform": {
            "transform": allContents.attr("transform"),
            "kXY": svgContainer._groups[0][0].__zoom
        },
        "currentRightColWidth": parseFloat(d3.select("div#PropertiesBar").style("width")),
        "currentLeftColWidth": parseFloat(d3.select("div#LeftPropertiesBar").style("width"))
    }
    console.log(data);
    const fileData = JSON.stringify(data);
    // const blob = new Blob([fileData], {type: "text/plain"});
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.download = 'saveData.json';
    // link.href = url;
    // link.click();
    var storage = window.localStorage;
    storage.setItem("data", fileData);
    console.log('successfully saved data');
}

function loadData() {
    console.log('inside load data');
    var allData = JSON.parse(window.localStorage.getItem("data"));
    console.log(allData);
    const reactContext = this;
    console.log(allData.components);
    var allContents = d3.select("#allCanvasContents");
    var svgContainer = d3.select("svg");
    if (allData !== undefined) {
        if (allData.canvas_transform !== undefined) {
            console.log(allData.canvas_transform.kXY);
            //currently having error with this
            // allContents.attr("transform", allData.canvas_transform.transform);
            // svgContainer._groups[0][0].__zoom.k = allData.canvas_transform.kXY.k;
            // svgContainer._groups[0][0].__zoom.x = allData.canvas_transform.kXY.x;
            // svgContainer._groups[0][0].__zoom.y = allData.canvas_transform.kXY.y;
        }
    }
    if (allData.components !== undefined) {
        var allComp = allData.components;    
        reactContext.setState({
            allComp: allComp,
        });
        console.log(reactContext);
        allComp.forEach(element => {
            if (element.type === "component")
                CreateNewComponent(reactContext, element); //to be handle later
            else if (element.type === "slider")
                CreateNewSlider(reactContext, element);
            else if (element.type === "string")
                CreateNewPanel(reactContext, element);
            else if (element.type === "toggle")
                CreateNewToggle(element);
            else if (element.type === "optionList")
                 CreateNewOptionList(reactContext, element); //to be handle later
            else if (element.type === "fileUpload")
                CreateNewFileUpload(element);
            else if (element.type === "listView")
                CreateNewListView(element);
        });
    }
    if (allData.edges !== undefined) {
        var allEdges = allData.edges;
        allEdges.forEach(element => { CreatePaths(element); })
    }
}

export {saveData, loadData};