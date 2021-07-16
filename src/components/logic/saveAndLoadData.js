import $ from 'jquery';
import { addEdgeCircle } from './functions.js';
import {
    CreateNewComponent,
    CreateNewOptionList,
    CreateNewSlider,
    CreateNewPanel,
    CreateNewToggle,
    CreateNewFileUpload,
    CreateNewListView,
    CreateNewDeep
} from './mainComponents/mainComponents.js'
var d3 = require('d3');

function getCurrentData(reactContext) {
    var allContents = d3.select('#allCanvasContents');
    var svgContainer = d3.select('svg');
    reactContext.state.allEdges.forEach(element => {
        element['d'] = $('path#' + element.path_id).attr('d');
        element['circleX'] = $('rect#pathCircle' + element.path_id).attr('x');
        element['circleY'] = $('rect#pathCircle' + element.path_id).attr('y');
    });

    var data = {
        components: reactContext.state.allComp,
        edges: reactContext.state.allEdges,
        comp_input_edges: reactContext.state.comp_input_edges,
        comp_output_edges: reactContext.state.comp_output_edges,
        edge_comp_matrix: reactContext.state.edge_comp_matrix,
        parent_child_matrix: reactContext.state.parent_child_matrix,
        parent_child_matrix_fast_check: reactContext.state.parent_child_matrix_fast_check,
        root_components: reactContext.state.root_components,
        canvas_transform: {
            transform: allContents.attr('transform'),
            kXY: svgContainer._groups[0][0].__zoom
        },
        currentRightColWidth: parseFloat(d3.select('div#PropertiesBar').style('width')),
        currentLeftColWidth: parseFloat(d3.select('div#LeftPropertiesBar').style('width'))
    };
    const fileData = JSON.stringify(data);
    return fileData;
}
function saveData() {
    const fileData = getCurrentData(this);
    var storage = window.localStorage;
    storage.setItem('data', fileData);
    alert('Successfully save data');
}

function clearData() {
    window.localStorage.clear();
    alert('All the saved data has been cleared. The page will be reloaded');
    window.location.reload(true);
}

function downloadData() {
    const fileData = getCurrentData(this);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = "data.json";
    link.href = url;
    link.click();
}

function loadData() {
    var allData = JSON.parse(window.localStorage.getItem('data'));
    var allContents = d3.select('#allCanvasContents');
    var svgContainer = d3.select('svg');
    if (allData !== null) {
        if (allData.canvas_transform !== undefined && allData.canvas_transform !== null) {
            allContents.attr('transform', allData.canvas_transform.transform);
            svgContainer._groups[0][0].__zoom.k = allData.canvas_transform.kXY.k;
            svgContainer._groups[0][0].__zoom.x = allData.canvas_transform.kXY.x;
            svgContainer._groups[0][0].__zoom.y = allData.canvas_transform.kXY.y;
        }
        if (allData.components !== undefined && allData.components !== null) {
            var allComponents = allData.components;
            this.setState({
                allComp: allComponents
            });
            allComponents.forEach(element => {
                if (element.type === 'component') CreateNewComponent(this, element);
                else if (element.type === 'slider') CreateNewSlider(this, element);
                else if (element.type === 'string') CreateNewPanel(this, element);
                else if (element.type === 'toggle') CreateNewToggle(this, element);
                else if (element.type === 'optionList') CreateNewOptionList(this, element);
                else if (element.type === 'fileUpload')  CreateNewFileUpload(this, element);
                else if (element.type === 'listView') CreateNewListView(this, element);
                else if (element.type === 'deep') CreateNewDeep(this, element);
            });
        }
        if (allData.edges !== undefined && allData.edges !== null) {
            var allEdges = allData.edges;
            this.setState({
                allEdges: allData.edges,
                comp_input_edges: allData.comp_input_edges,
                comp_output_edges: allData.comp_output_edges,
                edge_comp_matrix: allData.edge_comp_matrix,
                parent_child_matrix: allData.parent_child_matrix,
                parent_child_matrix_fast_check: allData.parent_child_matrix_fast_check,
                root_components: allData.root_components
            });
            allEdges.forEach(element => {
                CreatePaths(element);
            });
        }
    }
}

function CreatePaths(theEdge) {
    d3.select('g#allPaths')
        .append('path')
        .attr('d', function () {
            return theEdge.d;
        })
        .attr('stroke', 'black')
        .attr('stroke-width', '5')
        .attr('id', theEdge.path_id)
        .attr('stroke-dasharray', '4')
        .attr('stroke-linecap', 'round')
        .attr('fill', 'none')
        .attr('stroke-opacity', '0.5')
        .lower();

    addEdgeCircle(theEdge, theEdge.d)
        .attr('x', theEdge.circleX)
        .attr('y', theEdge.circleY)
        .attr('style', 'display:block');
} //End of CreatePaths

export { saveData, loadData, clearData, downloadData };
