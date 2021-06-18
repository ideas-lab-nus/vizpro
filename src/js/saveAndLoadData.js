import $ from 'jquery';
import { addEdgeCircle } from './functions.js';
import { CreateNewComponent } from './component.js';
import { CreateNewOptionList } from './optionlist.js';
import { CreateNewSlider } from './slider.js';
import { CreateNewPanel } from './panel.js';
import { CreateNewToggle } from './toggle.js';
import { CreateNewFileUpload } from './fileUpload.js';
import { CreateNewListView } from './listView.js';
var d3 = require('d3');

function saveData() {
    var allContents = d3.select('#allCanvasContents');
    var svgContainer = d3.select('svg');
    this.state.allEdges.forEach(element => {
        element['d'] = $('path#' + element.path_id).attr('d');
        element['circleX'] = $('rect#pathCircle' + element.path_id).attr('x');
        element['circleY'] = $('rect#pathCircle' + element.path_id).attr('y');
    });
    var data = {
        components: this.state.allComp,
        edges: this.state.allEdges,
        comp_input_edges: this.state.comp_input_edges,
        comp_output_edges: this.state.comp_output_edges,
        edge_comp_matrix: this.state.edge_comp_matrix,
        parent_child_matrix: this.state.parent_child_matrix,
        parent_child_matrix_fast_check: this.state.parent_child_matrix_fast_check,
        root_components: this.state.root_components,
        canvas_transform: {
            transform: allContents.attr('transform'),
            kXY: svgContainer._groups[0][0].__zoom
        },
        currentRightColWidth: parseFloat(d3.select('div#PropertiesBar').style('width')),
        currentLeftColWidth: parseFloat(d3.select('div#LeftPropertiesBar').style('width'))
    };
    const fileData = JSON.stringify(data);
    var storage = window.localStorage;
    storage.setItem('data', fileData);
    alert('Successfully save data');
}

function clearData() {
    window.localStorage.clear();
    alert('All the saved data has been cleared. Please reload the page');
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
                //to be handle later
                else if (element.type === 'slider') CreateNewSlider(this, element);
                else if (element.type === 'string') CreateNewPanel(this, element);
                else if (element.type === 'toggle') CreateNewToggle(this, element);
                else if (element.type === 'optionList') CreateNewOptionList(this, element);
                //to be handle later
                else if (element.type === 'fileUpload') CreateNewFileUpload(this, element);
                else if (element.type === 'listView') CreateNewListView(this, element);
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

export { saveData, loadData, clearData };
