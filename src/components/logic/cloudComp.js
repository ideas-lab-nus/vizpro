import { 
    selectComp, 
    addcomponent, 
    popupMessage, 
    runDeepFunction, 
    redrawDependents 
} from './functions.js';
import { uuidv4 } from './functions.js';
import $ from 'jquery';

var d3 = require('d3');
var addInputCirclesFunc;
var addOutputCirclesFunc;
var statusBar;
var Dummyrect;
var cirGroup;
var resize1;
var rect;
var playrect2;
var node;

function CreateNewCloud(
    reactContext,
    FromExisting = null,
    type = "cloud",
    kwargs = {shortName: "cloud", dfType: "dp"},
    inputList = [],
    outputList = [],
    color = '#0031E7'
) {
    var IDLE_COLOR = reactContext.state.IDLE_COLOR;
    var COMPONENT_RADIUS = reactContext.state.COMPONENT_RADIUS;

    var one_character_width = 8;
    var padding = 20;
    var titleMargin = 30;
    var titleMarginLeft = 30;
    var newcomp;

    if (FromExisting != null) {
        newcomp = FromExisting;
    } else {
        var longestInput = '';
        for (let index = 0; index < inputList.length; index++) {
            const curr = inputList[index].name;
            if (curr.length > longestInput.length) {
                longestInput = curr;
            }
        }

        var longestOutput = outputList.reduce(function (a, b) {
            return a.length > b.length ? a : b;
        }, '');

        var ThisComponentName = type;

        let n_inputs = inputList.length;
        let n_outputs = outputList.length;

        newcomp = addcomponent(uuidv4('C'), n_inputs, n_outputs, inputList, outputList);
        if (type == null) {
            ThisComponentName = $('div#addComp').attr('type');
        } else {
            ThisComponentName = type;
            newcomp.dftype = kwargs.dfType;
            newcomp.ShortName = kwargs.shortName;
            popupMessage(ThisComponentName + ' Component added');
        }

        newcomp.fill = color;
        newcomp.type = "cloud";
        newcomp.Name = "Cloud";
        newcomp.height = Math.max(80,
            titleMargin + Math.max(newcomp.inputs.length, newcomp.outputs.length + 1) * padding);
        newcomp.width = Math.max(100,
            (longestInput.length + longestOutput.length) * one_character_width + titleMarginLeft);

        // initiate the parent_children_matrix
        var guid = newcomp.GUID;
        var data = { ...reactContext.state.parent_child_matrix };
        data[guid] = [];
        reactContext.setState({
            parent_child_matrix: data
        });
    }

    var allContents = d3.select('#allCanvasContents');

    var cont = allContents.append('g').attr('class', 'component').attr('id', newcomp.GUID);

    var genX;
    var genY;

    node = cont
        .append('g')
        .attr(
            'class',
            newcomp.type +
                ' ' +
                newcomp.state +
                ' ' +
                newcomp.selection +
                ' ' +
                newcomp.view +
                ' ' +
                newcomp.GUID
        )
        .attr('id', 'comp-' + newcomp.GUID)
        .attr('transform', () => {
            if (FromExisting == null) {
                if (kwargs.X !== undefined && kwargs.Y !== undefined) {
                    newcomp.X = kwargs.X;
                    newcomp.Y = kwargs.Y;
                } else {
                    genX = Math.random() * 500 + 200;
                    genY = Math.random() * 500 + 200;
                    newcomp.X = genX;
                    newcomp.Y = genY;
                }
                return 'translate(' + newcomp.X + ', ' + newcomp.Y + ')';
            } else {
                return 'translate(' + FromExisting.X + ', ' + FromExisting.Y + ')';
            }
        });

    statusBar = node
        .append('g')
        // .attr('id', "cloudResizeHeight")
        .attr('transform', 'translate(0,' + (newcomp.height - 25) + ')');

    statusBar
        .append('rect')
        .attr('id', 'statusRect' + newcomp.GUID)
        .attr('width', newcomp.width + 2)
        .attr('x', -1.0)
        .attr('height', 40)
        .attr('fill', IDLE_COLOR)
        .attr('stroke-width', 1)
        .attr('rx', COMPONENT_RADIUS)
        .attr('ry', COMPONENT_RADIUS)
        .attr('opacity', 0.5);

    statusBar
        .append('text')
        .attr('class', 'statusTextClass')
        .attr('id', 'statusText' + newcomp.GUID)
        .attr('fill', 'black')
        .attr('x', 5)
        .attr('y', 37)
        .text('Idle...');

    function addInputCircles(newcomp) {
        var node = newcomp.node;
        var InputGroup = node.append('g').lower();
        for (let index = 0; index < newcomp.inputs.length; index++) {
            var inp = InputGroup.append('circle')
                .lower()
                .attr('cx', '0')
                .attr('cy', (index * padding + titleMargin).toString())
                .attr('fill', newcomp.fill)
                .attr('r', '7')
                .attr('stroke', newcomp.fill)
                .attr('stroke-width', '2')
                .attr('id', 'inputCirViual' + newcomp.GUID + '_' + index)
                .attr('class', 'inputCirVisual' + newcomp.GUID + ' ' + index)
                .attr('type', function () {
                    if (FromExisting == null) {
                        return 'text';
                    } else {
                        return FromExisting.inputs[index].type;
                    }
                });
        }
        
        InputGroup = node.append('g').lower();
        for (let index = 0; index < newcomp.inputs.length; index++) {
            inp = InputGroup.append('circle')
                .lower()
                .attr('cx', '0')
                .attr('cy', (index * padding + titleMargin).toString())
                .attr('fill', newcomp.fill)
                .attr('fill-opacity', '0.3')
                .attr('r', '15')
                .attr('id', 'inputCir' + newcomp.GUID + '_' + index)
                .attr('class', 'inputCir' + newcomp.GUID + ' ' + index)
                .attr('type', function () {
                    if (FromExisting == null) {
                        return 'text';
                    } else {
                        return FromExisting.inputs[index].type;
                    }
                });
        }

        var InputGroupText = node.append('g');

        for (let index = 0; index < newcomp.inputs.length; index++) {
            console.log(newcomp.inputs[index].Name)
            var inptext = InputGroupText.append('text')
                .attr('id', 'input-' + newcomp.GUID + '_' + index)
                .attr('class', 'inputTxt' + newcomp.GUID + ' ' + index)
                .attr(
                    'transform',
                    'translate(' + 10 + ' , ' + (index * padding + titleMargin + 5).toString() + ')'
                )
                .text(newcomp.inputs[index].Name)
                .attr('fill', 'black')
                .attr('type', function () {
                    newcomp.inputs[index].textObj = this.id;
                    if (FromExisting == null) {
                        return 'text';
                    } else {
                        return FromExisting.inputs[index].type;
                    }
                });
        }
    }

    addInputCirclesFunc = addInputCircles;

    function addOutputCircles(newcomp) {
        var node = newcomp.node;
        var OutputGroup = node.append('g').lower();
        for (let index = 0; index < newcomp.outputs.length; index++) {
            var out = OutputGroup.append('circle')
                .attr('cx', newcomp.width)
                .attr('cy', (index * padding + titleMargin).toString())
                .attr('fill', newcomp.fill)
                .attr('r', '7')
                .attr('stroke', newcomp.fill)
                .attr('stroke-width', '2')
                .attr('id', 'outputCirVisual' + newcomp.GUID + '_' + index)
                .attr('class', 'outputCirVisual' + newcomp.GUID + ' ' + index)
                .attr('type', function () {
                    if (FromExisting == null) {
                        return 'text';
                    } else {
                        return FromExisting.outputs[index].type;
                    }
                })
                .lower();
        }

        OutputGroup = node.append('g').lower();
        for (let index = 0; index < newcomp.outputs.length; index++) {
            out = OutputGroup.append('circle')
                .attr('cx', newcomp.width)
                .attr('cy', (index * padding + titleMargin).toString())
                .attr('fill', newcomp.fill)
                .attr('fill-opacity', '0.5')
                .attr('r', '12')
                .attr('id', 'outputCir' + newcomp.GUID + '_' + index)
                .attr('class', 'outputCir' + newcomp.GUID + ' ' + index)
                .attr('type', function () {
                    if (FromExisting == null) {
                        return 'text';
                    } else {
                        return FromExisting.outputs[index].type;
                    }
                });
        }

        var OutputGroupText = node.append('g');
        for (let index = 0; index < newcomp.outputs.length; index++) {
            var outtext = OutputGroupText.append('text')
                .attr('id', 'output-' + newcomp.GUID + '_' + index)
                .attr('class', 'outputTxt' + newcomp.GUID + ' ' + index)
                .attr(
                    'transform',
                    'translate(' +
                        (newcomp.width - newcomp.outputs[index].ShortName.length * 8 - 5).toString() +
                        ' , ' +
                        (index * padding + titleMargin + 5).toString() +
                        ')'
                )
                .text(newcomp.outputs[index].ShortName)
                .attr('fill', 'black')
                .attr('type', function () {
                    newcomp.outputs[index].circle = this;
                    if (FromExisting == null) {
                        return 'text';
                    } else {
                        newcomp.outputs[index].type = FromExisting.outputs[index].type;
                        return FromExisting.outputs[index].type;
                    }
                })
                .attr('type', function () {
                    newcomp.outputs[index].textObj = this.id;
                    if (FromExisting == null) {
                        return 'text';
                    } else {
                        return FromExisting.outputs[index].type;
                    }
                });
        }
    }

    addOutputCirclesFunc = addOutputCircles;    

    Dummyrect = node
        .append('rect')
        .attr('class', 'CompCBodyDummy ' + newcomp.GUID)
        .attr('id', 'dummyRect_' + newcomp.GUID)
        .attr('rx', COMPONENT_RADIUS + 1)
        .attr('ry', COMPONENT_RADIUS + 1)
        .attr('stroke-width', '3')
        .attr('stroke', newcomp.fill)
        .attr('width', newcomp.width)
        .attr('height', newcomp.height)
        .attr('fill', '#E8E8E8')
        .on('mousedown', () => {
            reactContext.setState({
                rectType: 'component'
            });
        });

    cirGroup = node.append('g')
        .attr('transform', () => {
            var x = newcomp.width;
            var y = newcomp.height;
            return 'translate(' + x.toString() + ',' + (y - 10).toString() + ')';
        });

    var Titlegroup = node.append('g').attr('transform', () => {
        return 'translate(0, 15)';
    });

    //Title rectangle
    Titlegroup.append('rect')
        .attr('width', newcomp.width - 2)
        .attr('height', 20)
        .attr('fill', newcomp.fill)
        .attr('x', 1.0)
        .attr('y', -14)
        .attr('rx', COMPONENT_RADIUS)
        .attr('ry', COMPONENT_RADIUS);

    Titlegroup.append('rect')
        .attr('width', newcomp.width - 2)
        .attr('height', 8)
        .attr('fill', newcomp.fill)
        .attr('x', 1.0)
        .attr('y', -2);

    resize1 = node.append('rect')
        .attr('width', newcomp.width - 2)
        .attr('height', newcomp.height - 2)
        .attr('x', 1.0)
        .attr('y', 1)
        .attr('rx', COMPONENT_RADIUS)
        .attr('ry', COMPONENT_RADIUS)
        .attr('stroke', newcomp.fill)
        .attr('fill-opacity', 0.0);

    var Title = Titlegroup.append('foreignObject')
        .attr('class', 'nodetitle node_title' + newcomp.GUID)
        .attr('id', 'node_title' + newcomp.GUID)
        .attr('x', 0)
        .attr('y', -10)
        .attr('width', newcomp.width)
        .attr('height', '20')
        .text(newcomp.Name);

    rect = node
        .append('rect')
        .attr('class', 'CompCBody ' + newcomp.GUID)
        .attr('id', newcomp.GUID)
        .attr('rx', COMPONENT_RADIUS)
        .attr('ry', COMPONENT_RADIUS)

        .attr('width', newcomp.width)
        .attr('height', newcomp.height)
        .attr('fill', newcomp.fill)
        .attr('fill-opacity', '0.01')
        .on('mousemove', function (event) {
            d3.select(event.currentTarget).attr('cursor', 'pointer');
        })
        .on('mouseout', function (event) {
            d3.select(event.currentTarget).attr('fill', newcomp.fill);
        })
        .on('dblclick', () => {})
        .on('mousedown', () => {
            reactContext.setState({
                rectType: 'component'
            });
        });

    var icon = node
        .append('g')
        .attr('transform', 'translate(' + (newcomp.width - 20).toString() + ',1)');

    var icon_foreing = icon
        .append('foreignObject')
        .attr('width', 18)
        .attr('height', 18)
        .attr('style', () => {
            return (
                `background-image:url(src/img/` +
                newcomp.Name +
                `.png);background-size: 15px;background-repeat: no-repeat;background-position: center;`
            );
        });

    playrect2 = node
        .append('rect')
        .attr('class', 'play ' + newcomp.GUID)
        .attr('id', 'play_' + newcomp.GUID)
        .attr('x', newcomp.width / 2.0 - 10)
        .attr('y', newcomp.height - 10)
        .attr('height', 20)
        .attr('width', 20)
        .attr('rx', COMPONENT_RADIUS)
        .attr('ry', COMPONENT_RADIUS)
        .attr('fill', newcomp.fill)
        .attr('stroke', newcomp.fill)
        .attr('stroke-width', '6')
        .style('cursor', 'pointer')
        .on('click', function () {
            console.log('start calculation');
            runDeepFunction(newcomp.GUID);
        });

    var playrect = node
        .append('svg')
        .attr('role', 'img')
        .attr('class', 'removableSVG' + newcomp.GUID)
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('width', 20)
        .attr('height', 20)
        .attr('x', newcomp.width / 2.0 - 10)
        .attr('y', newcomp.height - 10)
        .attr('viewBox', '0 0 512 512')
        .append('path')
        .attr('class', 'play ' + newcomp.GUID)
        .attr('fill', 'white')
        .attr(
            'd',
            'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z'
        )
        .on('click', function () {
            console.log('start calculation');
            runDeepFunction(newcomp.GUID);
        });            

    newcomp.addInputCirclesFunc = addInputCirclesFunc;
    newcomp.addOutputCirclesFunc = addOutputCirclesFunc;
    newcomp.statusBar = statusBar;
    newcomp.Dummyrect = Dummyrect;
    newcomp.cirGroup = cirGroup;
    newcomp.resize1 = resize1;
    newcomp.rect = rect;
    newcomp.playrect2 = playrect2;
    newcomp.node = node;
    
    addInputCirclesFunc(newcomp);
    addOutputCirclesFunc(newcomp);

    if (FromExisting == null) {
        var current_all_comp = reactContext.state.allComp.slice();
        console.log('Adding a generic comp' + newcomp);
        current_all_comp.push(newcomp);
        reactContext.setState({
            allComp: current_all_comp
        });
    }

    var current_comp_out = { ...reactContext.state.comp_output_edges };
    var current_comp_in = { ...reactContext.state.comp_input_edges };
    current_comp_out[newcomp.GUID] = new Array(newcomp.inputs.length);
    current_comp_in[newcomp.GUID] = new Array(newcomp.outputs.length);
    reactContext.setState({
        comp_input_edges: current_comp_in,
        comp_output_edges: current_comp_out
    });

    var current_components_selection = { ...reactContext.state.components_selection_data };
    current_components_selection[newcomp.GUID] = {
        x0: newcomp.X,
        y0: newcomp.Y,
        x1: newcomp.X + newcomp.width,
        y1: newcomp.Y + newcomp.height
    };
    reactContext.setState({
        components_selection_data: current_components_selection
    });
}

function submitCloudEdit(compKey) {
    try {
        var cloudComp = selectComp(compKey);

        var name = $('input.cloudProp.Name').val();
        var inputs = $('textarea.cloudProp.Val').val();
        var url = $('input.cloudProp.url').val();

        cloudComp.inputNames = inputs;
        cloudComp.inputs = createInputDict(inputs.split('\n'));
        cloudComp.outputs = createOutputDict(["out"]);
        cloudComp.url = url;
        cloudComp.Name = name;
    
        d3.selectAll('circle.inputCirVisual' + cloudComp.GUID).remove();
        d3.selectAll('circle.inputCir' + cloudComp.GUID).remove();
        d3.selectAll('text.inputTxt' + cloudComp.GUID).remove();
        d3.selectAll('circle.outputCirVisual' + cloudComp.GUID).remove();
        d3.selectAll('circle.outputCir' + cloudComp.GUID).remove();
        d3.selectAll('text.outputTxt' + cloudComp.GUID).remove();

        addInputCirclesFunc(cloudComp);
        addOutputCirclesFunc(cloudComp);

        resize(cloudComp);

        $('foreignObject#node_title' + cloudComp.GUID).text(name);

        redrawDependents(compKey);
        $('div#propertiesBarContents').html('');
    } catch (error) {
        console.log(error);
        alert("Invalid JSON format!");
    }
}

function cancelCloudEdit() {
    $('div#propertiesBarContents').html('');
}

function resize(newcomp) {
    var padding = 20;
    var titleMargin = 30;
    newcomp.height = Math.max(80,
        titleMargin + Math.max(newcomp.inputs.length, newcomp.outputs.length + 1) * padding);

    newcomp.statusBar
        .attr('transform', 'translate(0,' + (newcomp.height - 25) + ')');
    newcomp.Dummyrect
        .attr('height', newcomp.height);
    newcomp.cirGroup
        .attr('transform', () => {
            var x = newcomp.width;
            var y = newcomp.height;
            return 'translate(' + x.toString() + ',' + (y - 10).toString() + ')';
        });
    newcomp.resize1
        .attr('height', newcomp.height - 2);
    newcomp.rect
        .attr('height', newcomp.height);
    newcomp.playrect2
        .attr('y', newcomp.height - 10);

    d3.select('svg.removableSVG' + newcomp.GUID).remove();

    newcomp.node
        .append('svg')
        .attr('role', 'img')
        .attr('class', 'removableSVG' + newcomp.GUID)
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('width', 20)
        .attr('height', 20)
        .attr('x', newcomp.width / 2.0 - 10)
        .attr('y', newcomp.height - 10)
        .attr('viewBox', '0 0 512 512')
        .append('path')
        .attr('class', 'play ' + newcomp.GUID)
        .attr('fill', 'white')
        .attr(
            'd',
            'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z'
        )
        .on('click', function () {
            console.log('start calculation');
            runDeepFunction(newcomp.GUID);
        });   

}

function createOutputDict(outputsIn) {
    var outputs = [];
    for (let index = 0; index < outputsIn.length; index++) {
        try {
            outputs.push({
                id: index,
                circle: null,
                textObj: null,
                Name: outputsIn[index],
                ShortName: outputsIn[index],
                Description: outputsIn[index].desc,
                Message: 'short description',
                type: 'item',
                datatype: 'int',
                value: null
            });
        } catch {
            outputs.push({
                id: index,
                circle: null,
                textObj: null,
                Name: '',
                ShortName: '',
                Description: '',
                Message: 'short description',
                type: 'item',
                datatype: 'int',
                value: null
            });
        }
    }
    return outputs;
}

function createInputDict(inputsIn) {
    var inputs = [];
    for (let index = 0; index < inputsIn.length; index++) {
        try {
            inputs.push({
                id: index,
                circle: null,
                textObj: null,
                Name: inputsIn[index],
                ShortName: inputsIn[index].shortName,
                Description: inputsIn[index].desc,
                Message: 'short description',
                type: 'item',
                datatype: 'int',
                value: inputsIn[index].default_value
            });
        } catch {
            inputs.push({
                id: index,
                circle: null,
                textObj: null,
                Name: '',
                ShortName: '',
                Description: '',
                Message: 'short description',
                type: 'item',
                datatype: 'int',
                value: ''
            });
        }
    }
    return inputs;
}

export { CreateNewCloud, cancelCloudEdit, submitCloudEdit };
