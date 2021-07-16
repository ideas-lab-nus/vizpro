import {
    uuidv4,
    selectComp,
    updateAll,
    ViewListRedrawing,
    showDropDownList,
    redrawDependents
} from './functions.js';
import { 
    handleOptionListEdit,
    submitOptionListEdit,
    submitSliderEdit,
    submitPanelEdit,
    submitDeepEdit,
    cancelEdit
} from './mainComponents/mainComponents.js';

import $ from 'jquery';
var d3 = require('d3');

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
}

function addEdge(from, to, fromComp, toComp) {
    var initLink = {
        GUID: uuidv4('E'),
        path: null,
        path_id: '',
        circleX: 0,
        circleY: 0,
        from: from,
        to: to,
        fromComp: fromComp,
        toComp: toComp
    };
    return initLink;
}

function handleComponentSelection() {
    const reactContext = this;
    var allComp = reactContext.state.allComp;
    allComp.forEach(element => {
        if (
            element.type === 'component' ||
            element.type === 'toggle' ||
            element.type === 'fileUpload' ||
            element.type === 'listView' || 
            element.type === 'deep'
        ) {
            d3.select('g#comp-' + element.GUID).on('click', function () {
                d3.select('rect#' + element.GUID)
                    .attr('stroke-width', '2')
                    .attr('stroke', '#0064ffa8');

                reactContext.setState({
                    selected_component_id: element.GUID
                });
            });

            d3.select('rect#' + element.GUID).on('focusout', () => {
                d3.select('rect#' + element.GUID)
                    .attr('stroke-width', '0')
                    .attr('stroke', 'none');
            });
        } else if (element.type === 'string') {
            d3.selectAll('rect#' + element.GUID + ', rect.CompPBody.' + element.GUID + '.a').on(
                'click',
                function () {
                    d3.select('rect#' + element.GUID)
                        .attr('stroke-width', '2')
                        .attr('stroke', '#0064ffa8');

                    d3.select('rect#statusRect' + element.GUID).attr('fill', '#0081ff');

                    reactContext.setState({
                        selected_component_id: element.GUID
                    });
                }
            );

            d3.selectAll('rect#' + element.GUID + ', rect#overlaySelector' + element.GUID).on(
                'focusout',
                () => {
                    d3.select('rect#' + element.GUID)
                        .attr('stroke-width', '0')
                        .attr('stroke', 'none');

                    d3.select('rect#statusRect' + element.GUID).attr('fill', '#525252');
                }
            );
        } else if (element.type === 'slider') {
            d3.select('rect#' + element.GUID)
                .on('click', function () {
                    d3.select('rect#' + element.GUID)
                        .attr('stroke-width', '2')
                        .attr('stroke', '#0064ffa8');

                    reactContext.setState({
                        selected_component_id: element.GUID
                    });
                })
                .on('focusout', () => {
                    d3.select('rect#' + element.GUID)
                        .attr('stroke-width', '1')
                        .attr('stroke', 'black');
                });
        } else if (element.type === 'optionList') {
            d3.select('g#comp-' + element.GUID).on('click', function () {
                d3.select('rect#' + element.GUID)
                    .attr('stroke-width', '2')
                    .attr('stroke', '#0064ffa8');

                showDropDownList(element.GUID);

                reactContext.setState({
                    selected_component_id: element.GUID,
                    optionListStarted: true,
                    optionlistRectid: element.GUID
                });
            });

            d3.select('rect#' + element.GUID).on('focusout', () => {
                d3.select('rect#' + element.GUID)
                    .attr('stroke-width', '0')
                    .attr('stroke', 'none');
            });
        }
    });
    ViewListRedrawing();
} // End of handleComponentSelection

//Slider component id changed to CompSBody hence will not be picked up
//by this function. Lookout for side effects!
//Panel changed to CompPBody
//Toggle changed to CompTBody
//fileUpload changed to CompFBody
function handleTheClickOnAllComponents() {
    const reactContext = this;
    var allComp = reactContext.state.allComp;
    var allcomp = d3
        .selectAll(
            'rect.CompPBody, rect.CompSBody, rect.CompTBody, rect.CompOBody, rect.CompLBody, rect.CompFBody, rect.CompCBody'
        )
        .on('mousedown', function (event) {
            var coordinates = d3.pointer(event);

            var pos = $('g#comp-' + this.id.replace('overlaySelector', ''))
                .attr('transform')
                .split('translate(')[1]
                .replace(')', '')
                .split(',')
                .map(function (item) {
                    return parseFloat(item, 10);
                });

            reactContext.setState({
                dragX: pos[0],
                dragY: pos[1],
                componentClickX: coordinates[0],
                componentClickY: coordinates[1],
                clicked: true,
                startDrag: true,
                clickedId: this.id.replace('overlaySelector', ''),
                selected_components: [this.id.replace('overlaySelector', '')],
                rectType: 'component'
            });
        });
} // End of handleTheClickOnAllComponents

function handleEdgeInitialization() {
    var reactContext = this;
    var allContents = d3.select('#allCanvasContents');
    var toComponent = null;
    var fromComponent = null;
    var allCircles = d3
        .selectAll('circle')
        .on('mousedown', function (event) {
            reactContext.setState({
                targetcircleId: this.id
            });

            var edgeStarted = reactContext.state.edgeStarted;
            var targetcircleIN = reactContext.state.targetcircleIN;
            var fromCircle = { ...reactContext.state.fromCircle };
            var comp_output_edges = { ...reactContext.state.comp_output_edges };
            var selectedcircleId;

            if (edgeStarted && targetcircleIN && this !== fromCircle.element) {
                // DUMMY, Nothing to do in this version. :D :D
            } else {
                if (this.classList[0] === 'outputCir') {
                    if (
                        comp_output_edges[this.classList[1]][this.classList[2]] === undefined ||
                        comp_output_edges[this.classList[1]][this.classList[2]] === null
                    ) {
                        selectedcircleId = this.id;
                        reactContext.setState({
                            selectedcircleId: selectedcircleId
                        });
                    } else {
                        selectedcircleId =
                            this.id +
                            comp_output_edges[this.classList[1]][
                                this.classList[2]
                            ].length.toString();
                        reactContext.setState({
                            selectedcircleId: selectedcircleId
                        });
                    }
                    reactContext.setState({
                        edgeStarted: true
                    });

                    var x = d3.pointer(event, allContents.node())[0];
                    var y = d3.pointer(event, allContents.node())[1];

                    var initEdgex1 = x;
                    var initEdgey1 = y;

                    d3.select('g#allPaths')
                        .append('path')
                        .attr('stroke-dasharray', '4')
                        .attr('d', function () {
                            return 'M ' + initEdgex1 + ' ' + initEdgey1 + ' L ' + x + ' ' + y;
                        })
                        .attr('stroke', 'black')
                        .attr('stroke-width', '3')
                        .attr('id', 'Path' + selectedcircleId);

                    fromCircle.element = this;
                    reactContext.setState({
                        selectedcircleId: 'Path' + selectedcircleId,
                        fromCircle: fromCircle,
                        initEdgex1: initEdgex1,
                        initEdgey1: initEdgey1
                    });
                }
            }
        })
        .on('mousemove', function () {
            reactContext.setState({
                targetcircleIN: true
            });
        })
        .on('mouseout', function () {
            reactContext.setState({
                targetcircleIN: false
            });
        })
        .on('mouseup', function () {
            //This event is called when the mouse cursor is inside the input circle, this means that the line is now complete and ready to be created.
            var edgeStarted = reactContext.state.edgeStarted;
            var allEdges = reactContext.state.allEdges;
            var targetcircleIN = reactContext.state.targetcircleIN;
            var fromCircle = { ...reactContext.state.fromCircle };
            var toCircle = { ...reactContext.state.toCircle };
            var comp_input_edges = { ...reactContext.state.comp_input_edges };
            var comp_output_edges = { ...reactContext.state.comp_output_edges };
            var root_components = reactContext.state.root_components;
            var parent_child_matrix = reactContext.state.parent_child_matrix;
            var parent_child_matrix_fast_check = 
            reactContext.state.parent_child_matrix_fast_check
            ;
            var selectedcircleId = reactContext.state.selectedcircleId;
            console.log(edgeStarted ,
                targetcircleIN ,
                this !== fromCircle.element ,
                comp_input_edges[this.classList[1]][this.classList[2]] === undefined ,
                    comp_input_edges[this.classList[1]][this.classList[2]] === null)
            if (
                edgeStarted &&
                targetcircleIN &&
                this !== fromCircle.element &&
                (comp_input_edges[this.classList[1]][this.classList[2]] === undefined ||
                    comp_input_edges[this.classList[1]][this.classList[2]] === null)
            ) {
                toCircle.element = this;
                reactContext.setState({
                    toCircle: toCircle
                });
                toComponent = selectComp(toCircle.element.classList[1]);
                fromComponent = selectComp(fromCircle.element.classList[1]);

                console.log(parent_child_matrix_fast_check)
                console.log(fromCircle.element.classList[2] +
                    ' ' +
                    fromCircle.element.classList[1] +
                    ' ' +
                    toCircle.element.classList[2] +
                    ' ' +
                    toCircle.element.classList[1])
                if (
                    !parent_child_matrix_fast_check.includes(
                        fromCircle.element.classList[2] +
                            ' ' +
                            fromCircle.element.classList[1] +
                            ' ' +
                            toCircle.element.classList[2] +
                            ' ' +
                            toCircle.element.classList[1]
                    )
                ) {
                    var thisEdge = addEdge(
                        fromCircle,
                        toCircle,
                        fromCircle.element.classList,
                        toCircle.element.classList
                    );
                    var thisPath = d3.select('#' + selectedcircleId);

                    thisEdge.path_id = thisPath['_groups'][0][0].id;

                    if (
                        comp_input_edges[toCircle.element.classList[1]][
                            toCircle.element.classList[2]
                        ] === undefined ||
                        comp_input_edges[toCircle.element.classList[1]][
                            toCircle.element.classList[2]
                        ] === null
                    ) {
                        comp_input_edges[toCircle.element.classList[1]][
                            toCircle.element.classList[2]
                        ] = [thisEdge.path_id];
                    } else {
                        comp_input_edges[toCircle.element.classList[1]][
                            toCircle.element.classList[2]
                        ].push(thisEdge.path_id);
                    }
                    if (
                        comp_output_edges[fromCircle.element.classList[1]][
                            fromCircle.element.classList[2]
                        ] === undefined ||
                        comp_output_edges[fromCircle.element.classList[1]][
                            fromCircle.element.classList[2]
                        ] === null
                    ) {
                        comp_output_edges[fromCircle.element.classList[1]][
                            fromCircle.element.classList[2]
                        ] = [thisEdge.path_id];
                    } else {
                        comp_output_edges[fromCircle.element.classList[1]][
                            fromCircle.element.classList[2]
                        ].push(thisEdge.path_id);
                    }

                    // Datatree control. FIX UNCOMMENR
                    var current_edge_comp_matrix = { ...reactContext.state.edge_comp_matrix };
                    current_edge_comp_matrix[thisEdge.path_id] = {
                        from: fromCircle.element.classList[1],
                        to: toCircle.element.classList[1],
                        from_index: fromCircle.element.classList[2],
                        to_index: toCircle.element.classList[2]
                    };

                    reactContext.setState({
                        comp_input_edges: comp_input_edges,
                        comp_output_edges: comp_output_edges,
                        edge_comp_matrix: current_edge_comp_matrix
                    });

                    try {
                        if (root_components[fromCircle.element.classList[1]] !== 'branch') {
                            root_components[fromCircle.element.classList[1]] = 'root';
                            reactContext.setState({
                                root_components: root_components
                            });
                            toComponent.child = false;
                        }
                    } catch (err) {
                        console.log(err);
                    }

                    parent_child_matrix_fast_check.push(
                        fromCircle.element.classList[2] +
                            ' ' +
                            fromCircle.element.classList[1] +
                            ' ' +
                            toCircle.element.classList[2] +
                            ' ' +
                            toCircle.element.classList[1]
                    );
                    parent_child_matrix[fromCircle.element.classList[1]].push([
                        fromCircle.element.classList[2],
                        toCircle.element.classList[1],
                        toCircle.element.classList[2]
                    ]);
                    root_components[toCircle.element.classList[1]] = 'branch';
                    toComponent.child = true;
                    allEdges.push(thisEdge);

                    reactContext.setState({
                        parent_child_matrix: parent_child_matrix,
                        parent_child_matrix_fast_check: parent_child_matrix_fast_check,
                        root_components: root_components,
                        allEdges: allEdges,
                        edgeStarted: false
                    });
                    updateAll();
                    redrawDependents(fromCircle.element.classList[1]);
                } else {
                    console.log('Issue in parentchildmatrix (edgeInit)');
                }
            } else {
                console.log('Not entering if (edgeInit)');
            }
        });
} // End of handleEdgeInitialization

function handleDoubleClick() {
    const reactContext = this;
    var allComp = reactContext.state.allComp;
    allComp.forEach(element => {
        if (element.type === 'string') {
            d3.select('g#comp-' + element.GUID).on('dblclick', function () {
                if (!reactContext.state.doubleClicked) {
                    reactContext.setState({
                        doubleClicked: true
                    });
                    $('div#propertiesBarContents').append(`
                        <div class="propertiesbarheader title">String Panel Properties</div>
                        <div class="propertiesbarheader label">Name</div>
                        <input class="stringPanel Name"></textarea>
                        <hr>
                        <div class="propertiesbarheader label">Value</div>
                        <textarea class="textarea stringProperties" data-testid="textarea-string-properties"></textarea>
                        <hr>
                        <div class="propertiesbarheader label">Panel Type</div>
                        <form>
                            <input type="radio" name="type" id="string_radio_text" value="text" data-testid="text"> text<br>
                            <input type="radio" name="type" id="string_radio_html" value="html" data-testid="html"> html<br>
                            <input type="radio" name="type" id="string_radio_json" value="json" data-testid="json"> json<br>
                            <input type="radio" name="type" id="string_radio_list" value="list" data-testid="list"> list<br>
                            <input type="radio" name="type" id="string_radio_plot" value="plot" data-testid="plot"> plot <br>
                        </form>
                        <hr>
                        <div class="propertiesbarheader label">Log</div>
                        <div id="propertiesBarLog" class="log"></div>
                        <button id="panelEditButton">Apply</button>
                        <button id="cancelPanelEdit">Cancel</button>`
                    );

                    element.outputs[0].value = element.value;

                    var StringComp = selectComp(element.GUID);
                    $('input#string_radio_' + StringComp.inputs[0].type).prop('checked', true);
                    var newName;
                    $('input.stringPanel.Name').on('change keyup paste', function () {
                        newName = $('input.stringPanel.Name').val();
                        d3.select('text#nodeTitle' + StringComp.GUID).text(newName);
                        d3.select('rect#' + StringComp.GUID).attr('width', 10 + newName.length * 6);
                    });

                    if (StringComp.child) {
                        $('textarea.textarea.stringProperties').prop('disabled', true);
                        $('textarea.stringProperties').text(() => {
                            return StringComp.inputs[0].value;
                        });
                        $('body').on('mousemove', () => {
                            $('textarea.stringProperties').text(() => {
                                return StringComp.inputs[0].value;
                            });
                        });
                    } else {
                        $('textarea.stringProperties').text(() => {
                            return StringComp.inputs[0].value;
                        });
                    }

                    $('input.stringPanel.Name').val(StringComp.Name);

                    $('button#panelEditButton').on('click', function () {
                        submitPanelEdit(reactContext, element.GUID);
                        reactContext.setState({
                            doubleClicked: false
                        });
                    });
                    $('button#cancelPanelEdit').on('click', function () {
                        cancelEdit();
                        reactContext.setState({
                            doubleClicked: false
                        });
                    });
                }
            });
        } else if (element.type === 'optionList') {
            d3.select('g#comp-' + element.GUID).on('dblclick', function () {
                d3.select('rect#' + element.GUID)
                    .attr('stroke-width', '1')
                    .attr('stroke', 'black');

                reactContext.setState({
                    optionListStarted: true,
                    optionlistRectid: element.GUID
                });

                if (!reactContext.state.doubleClicked) {
                    reactContext.setState({
                        doubleClicked: true
                    });
                    $('div#propertiesBarContents').append(`
                        <div class="propertiesbar title">Option list properties</div>
                        <div class="propertiesbar label">options (as dictionary)</div>
                        <textarea class="textarea optionlistProperties"></textarea>
                        <hr>
                        <div class="propertiesbar label">
                            Preview:
                        </div>
                        <select id="propertisBarSelecId">

                        </select>
                        <hr>
                        <div class="propertiesbar label">
                            Log
                        </div>
                        <div id="propertiesBarLog" class="log"></div>
                        <button id="optionListEditButton">Apply</button>
                        <button id="cancelOptionListEdit">Cancel</button>`);

                    handleOptionListEdit(element.GUID);

                    $('button#optionListEditButton').on('click', function () {
                        submitOptionListEdit(reactContext, element.GUID);
                        reactContext.setState({
                            doubleClicked: false
                        });
                    });
                    $('button#cancelOptionListEdit').on('click', function () {
                        cancelEdit();
                        reactContext.setState({
                            doubleClicked: false
                        });
                    });
                }
            });
        } else if (element.type === 'slider') {
            d3.select('g#comp-' + element.GUID).on('dblclick', function () {
                if (!reactContext.state.doubleClicked) {
                    reactContext.setState({
                        doubleClicked: true
                    });

                    $('div#propertiesBarContents').append(`
                        <div class="propertiesbarheader label">Slider</div>
                        <div id="numerical_slider_container">
                            <div id="string_input_label">Min value </div>
                            <input type="number" id="new_slider_min_value" data-testid="min-input">
                        </div>
                        <div id="numerical_slider_container">
                            <div id="string_input_label">Max value </div>
                            <input type="number" id="new_slider_max_value" data-testid="max-input">
                        </div>
                        <div id="numerical_slider_container" data-testid="curr-val-container">
                            <div id="string_input_label">Current value </div>
                            <input type="number" id="new_slider_current_value" data-testid="curr-val-input">
                        </div>
                        <button id="sliderEditButton" style='margin-left: 10px; margin-top: 5px;' data-testid="save-changes">Save</button>
                        <button id="cancelSliderEdit" style='margin-top: 5px;' data-testid="cancel-changes">Cancel</button>
                        <div id="propertiesBarLog" class="log"></div>
                    `);
                    $('input#new_slider_min_value').val(element.min);
                    $('input#new_slider_max_value').val(element.max);
                    $('input#new_slider_current_value').val(element.value);

                    $('button#sliderEditButton').on('click', function (e) {
                        submitSliderEdit(reactContext, element.GUID);
                        reactContext.setState({
                            doubleClicked: false
                        });
                    });
                    $('button#cancelSliderEdit').on('click', function (e) {
                        cancelEdit();
                        reactContext.setState({
                            doubleClicked: false
                        });
                    });
                }
            });
        } else if (element.type === 'toggle') {
            var currentToggle = selectComp(element.GUID);
            d3.select('g#comp-' + element.GUID).on('dblclick', function () {
                var toggleValue = $('text.nodetitle.node_title' + element.GUID).text();
                d3.select('text.nodetitle.node_title' + element.GUID)
                    .text(function () {
                        if (toggleValue === 'True') {
                            currentToggle.value = 'False';
                            currentToggle.outputs[0].value = 'False';
                            return 'False';
                        } else {
                            currentToggle.value = 'True';
                            currentToggle.outputs[0].value = 'True';
                            return 'True';
                        }
                    })
                    .attr('fill', () => {
                        if (toggleValue === 'True') {
                            d3.select('#dummyRect_' + element.GUID).attr('fill', '#2c3e50');
                            return '#ecf0f1';
                        } else {
                            d3.select('#dummyRect_' + element.GUID).attr('fill', '#ecf0f1');
                            return '#2c3e50';
                        }
                    });
                redrawDependents(currentToggle.GUID);
            });
        } else if (element.type === 'deep') {
            d3.select('g#comp-' + element.GUID).on('dblclick', function () {
                if (!reactContext.state.doubleClicked) {
                    reactContext.setState({
                        doubleClicked: true
                    });
                    $('div#propertiesBarContents').append(`
                        <div class="propertiesbarheader title">Deep Function Properties</div>
                        <div class="propertiesbarheader label">Function Name</div>
                        <input class="deepProp Name"></textarea>
                        <hr>
                        <div class="propertiesbarheader label">Input List</div>
                        <textarea class="deepProp textarea stringProperties Val"></textarea>
                        <hr>
                        <div class="propertiesbarheader label">Deep function URL</div>
                        <input class="deepProp url"></textarea>
                        <div></div>
                        <div class="propertiesbarheader label">Log</div>
                        <div id="propertiesBarLog" class="log"></div>
                        <button id="deepEditButton">Apply</button>
                        <button id="cancelDeepEdit">Cancel</button>`);
                
                    var deepComp = selectComp(element.GUID);

                    $('input.deepProp.Name').val(deepComp.Name);
                    $('textarea.deepProp.Val').val(deepComp.inputNames);
                    $('input.deepProp.url').val(deepComp.url);

                    $('button#deepEditButton').on('click', function () {
                        submitDeepEdit(reactContext, element.GUID);
                        reactContext.setState({
                            doubleClicked: false
                        });
                    });
                    $('button#cancelDeepEdit').on('click', function () {
                        cancelEdit();
                        reactContext.setState({
                            doubleClicked: false
                        });
                    });
                }
            })
        }
        //TODO : else if other types than string, then you have to open the properties window.
    });
} // End of HandleDoubleClick

export {
    GetURLParameter,
    handleTheClickOnAllComponents,
    handleEdgeInitialization,
    handleComponentSelection,
    handleDoubleClick
};
