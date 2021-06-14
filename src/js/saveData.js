import $ from 'jquery';
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
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'saveData.json';
    link.href = url;
    link.click();
    console.log('successfully saved data');
    
}

export {saveData};