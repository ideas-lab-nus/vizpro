/*
──────────────────────────────────────────────────────────────────────────────────────────
─────────────██████████████─██████████─██████─────────██████████████──────────────────────
─────────────██░░░░░░░░░░██─██░░░░░░██─██░░██─────────██░░░░░░░░░░██──────────────────────
─────────────██░░██████████─████░░████─██░░██─────────██░░██████████──────────────────────
─────────────██░░██───────────██░░██───██░░██─────────██░░██──────────────────────────────
─────────────██░░██████████───██░░██───██░░██─────────██░░██████████──────────────────────
─────────────██░░░░░░░░░░██───██░░██───██░░██─────────██░░░░░░░░░░██──────────────────────
─────────────██░░██████████───██░░██───██░░██─────────██░░██████████──────────────────────
─────────────██░░██───────────██░░██───██░░██─────────██░░██──────────────────────────────
─────────────██░░██─────────████░░████─██░░██████████─██░░██████████──────────────────────
─────────────██░░██─────────██░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██──────────────────────
─────────────██████─────────██████████─██████████████─██████████████──────────────────────
──────────────────────────────────────────────────────────────────────────────────────────
───────────────────────────────────────────────────────────────────────────────────────────
─██████──██████─██████████████─██████─────────██████████████─██████████████─████████████───
─██░░██──██░░██─██░░░░░░░░░░██─██░░██─────────██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░████─
─██░░██──██░░██─██░░██████░░██─██░░██─────────██░░██████░░██─██░░██████░░██─██░░████░░░░██─
─██░░██──██░░██─██░░██──██░░██─██░░██─────────██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─
─██░░██──██░░██─██░░██████░░██─██░░██─────────██░░██──██░░██─██░░██████░░██─██░░██──██░░██─
─██░░██──██░░██─██░░░░░░░░░░██─██░░██─────────██░░██──██░░██─██░░░░░░░░░░██─██░░██──██░░██─
─██░░██──██░░██─██░░██████████─██░░██─────────██░░██──██░░██─██░░██████░░██─██░░██──██░░██─
─██░░██──██░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─
─██░░██████░░██─██░░██─────────██░░██████████─██░░██████░░██─██░░██──██░░██─██░░████░░░░██─
─██░░░░░░░░░░██─██░░██─────────██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░████─
─██████████████─██████─────────██████████████─██████████████─██████──██████─████████████───
───────────────────────────────────────────────────────────────────────────────────────────

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
import { addcomponent, redrawDependents, selectComp } from './functions.js';
import { uuidv4 } from './handle.js';
import $ from 'jquery';
var d3 = require('d3');

function CreateNewFileUpload(reactContext, FromExisting = null, kwargs = null) {
	var newcomp;

	if (FromExisting == null) {
		newcomp = addcomponent(uuidv4('C'), 0, 1);
		var guid = newcomp.GUID;
		var data = { ...reactContext.state.parent_child_matrix };
		data[guid] = [];
		reactContext.setState({
			parent_child_matrix: data
		});
	} else {
		newcomp = FromExisting;
	}

	newcomp.fill = 'url(#fileUploadGradient)';
	newcomp.Name = 'False';
	var one_character_width = 8;
	var padding = 20;
	var titleMargin = 30;
	var titleMarginLeft = 30;
	newcomp.height = 25;
	newcomp.type = 'fileUpload';
	newcomp.dftype = 'shlow';

	// TODO : get the longest text in the component. and set the width based on this.
	newcomp.width = 300; //newcomp.Name.length * one_character_width + titleMarginLeft;

	var allContents = d3.select('#allCanvasContents');

	function update() {
		node.attr('transform', d => `translate(${d.x},${d.y})`);
	}

	var dragHandler = d3
		.drag()
		.on('start', (event, d) => Dummyrect.attr('stroke', 'red'))
		.on('drag', (event, d) => {
			d.x = event.x;
			d.y = event.y;
		})
		.on('end', (event, d) => Dummyrect.attr('stroke', '#3a4c69'))
		.on('start.update drag.update end.update', update);

	var cont = allContents.append('g').attr('class', 'component').attr('id', newcomp.GUID);

	var node = cont
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
				// if (kwargs.X != undefined && kwargs.Y != undefined && kwargs != null){
				//     newcomp.X = kwargs.X;
				//     newcomp.Y = kwargs.Y;
				// } else{
				var mousex = reactContext.state.mousex;
				var mousey = reactContext.state.mousey;
				newcomp.X = mousex + Math.random() * 500;
				newcomp.Y = mousey + Math.random() * 500;
				// }
				return 'translate(' + newcomp.X + ', ' + newcomp.Y + ')';
			} else {
				return 'translate(' + FromExisting.X + ', ' + FromExisting.Y + ')';
			}
		})
		.data([
			{
				x: FromExisting ? FromExisting.X : newcomp.X,
				y: FromExisting ? FromExisting.Y : newcomp.Y
			}
		]);

	var InputGroup = node.append('g');
	for (let index = 0; index < newcomp.inputs.length; index++) {
		var inp = InputGroup.append('circle')
			.lower()
			.attr('cx', '0')
			.attr('cy', newcomp.height / 2)
			.attr('fill', 'gray') //newcomp.fill)
			.attr('r', '5')
			.attr('stroke', 'black')
			.attr('stroke-width', '2')
			.attr('id', 'inputCir' + newcomp.GUID + '_' + index)
			.attr('class', 'inputCir ' + newcomp.GUID + ' ' + index)
			.attr('type', function () {
				newcomp.inputs[index].circle = reactContext.state.fromCircle;
				newcomp.inputs[index].circle.element = this.id;
				newcomp.inputs[index].circle.CX = 0;
				newcomp.inputs[index].circle.CY = index * padding + titleMargin;
				newcomp.inputs[index].type = 'input';
				return 'input';
			});
	}

	var OutputGroup = node.append('g');
	for (let index = 0; index < newcomp.outputs.length; index++) {
		var out = OutputGroup.append('circle')
			.attr('cx', newcomp.width)
			.attr('cy', newcomp.height / 2)
			.attr('fill', 'gray')
			.attr('r', '5')
			.attr('stroke', 'black')
			.attr('stroke-width', '2')
			.attr('id', 'outputCir' + newcomp.GUID + '_' + index)
			.attr('class', 'outputCir ' + newcomp.GUID + ' ' + index)
			.attr('type', function () {
				newcomp.outputs[index].circle = this;
				newcomp.outputs[index].type = 'output';
				return 'output';
			})
			.lower();
	}

	var rectstatus = node
		.append('rect')
		.attr('class', 'CompFBody statusRect ' + newcomp.GUID)
		.attr('id', 'statusRect' + newcomp.GUID)
		.attr('rx', '3')
		.attr('ry', '3')
		.attr('x', '50')
		.attr('y', newcomp.height - 5)
		.attr('width', newcomp.width - 50)
		.attr('height', 20)
		.attr('fill', '#242424')
		.attr('fill-opacity', '1.0');

	var fileUploadststus = node
		.append('foreignObject')
		.attr('id', 'fileUpload_status_' + newcomp.GUID)
		.attr('class', 'fileUpload_status ' + newcomp.GUID)
		.html(() => {
			if (newcomp.outputs[0].value == null || newcomp.outputs[0].value === undefined) {
				return 'File Size : None';
			} else {
				return (
					'File Size : ' +
					(newcomp.outputs[0].Description.size / (1024 * 1024)).toString() +
					" MB <a class='open_uploadedFile_link' href='" +
					newcomp.outputs[0].Description.url +
					"' target='blank'>open</a>"
				);
			}
		})
		.attr('x', '55')
		.attr('y', newcomp.height + 2)
		.attr('width', newcomp.width - 50)
		.attr('height', 15)
		.attr('fill', 'white');

	var Dummyrect = node
		.append('rect')
		.attr('class', 'CompFBodyDummy ' + newcomp.GUID)
		.attr('id', 'dummyRect_' + newcomp.GUID)
		.attr('rx', '3')
		.attr('ry', '3')
		//.attr("filter", "url(#f2")
		.attr('stroke-width', '1')
		.attr('stroke', 'black')
		.attr('width', newcomp.width)
		.attr('height', newcomp.height)
		.attr('fill', newcomp.fill);

	var cirGroup = node.append('g').attr('transform', () => {
		var x = newcomp.width;
		var y = newcomp.height;
		return 'translate(' + x.toString() + ',' + (y - 10).toString() + ')';
	});

	var log = cirGroup
		.append('text')
		.attr('id', 'nodeLog' + newcomp.GUID)
		.attr('class', 'nodeLog ' + newcomp.GUID)
		.attr('transform', 'translate(10, 10)')
		.text(newcomp.log.logText)
		.attr('fill', 'black')
		.style('display', 'none');

	var Titlegroup = node.append('g').attr('transform', () => {
		return 'translate(0, 15)';
	});

	node.append('rect')
		.attr('width', newcomp.width - 2)
		.attr('height', 10)
		.attr('x', 1)
		.attr('y', 1)
		.attr('rx', 2)
		.attr('ry', 2)
		.attr('fill', 'url(#gradient2)')
		.attr('fill-opacity', 0.4);

	var uploadButtong = node
		.append('foreignObject')
		.attr('id', 'foreignObject_fileUpload' + newcomp.GUID)
		.attr('class', 'foreignObject_fileUpload')
		.attr('width', newcomp.width)
		.attr('height', newcomp.height)
		.attr('y', '-1.1px')
		.html(() => {
			if (newcomp.outputs[0].value == null || newcomp.outputs[0].value === undefined) {
				return (
					`
            <form method="post" enctype="multipart/form-data" id="form_` +
					newcomp.GUID +
					`">
            <input id="fileUploadFormToTheCloud" class="` +
					newcomp.GUID +
					`" type="file" name="myFile">
            </form>
            `
				);
			} else {
				return (
					`
                <div id="TheContainedFile">` +
					newcomp.outputs[0].Description.Name +
					`</div>
                <div id="TheContainedFile">Size :` +
					(newcomp.outputs[0].Description.size / (1024 * 1024)).toFixed(4).toString() +
					` MB</div>
            `
				);
			}
		});

	var rect = node
		.append('rect')
		.attr('class', 'CompFBody ' + newcomp.GUID)
		.attr('id', newcomp.GUID)
		.attr('rx', '3')
		.attr('ry', '3')
		.attr('x', 90)
		.attr('width', newcomp.width - 90)
		.attr('height', newcomp.height)
		.attr('fill', newcomp.fill)
		.attr('fill-opacity', '0.01')
		.on('mousemove', function (event) {
			d3.select(event.currentTarget).attr('cursor', 'pointer');
		})
		.on('mouseout', function (event) {
			d3.select(event.currentTarget).attr('fill', newcomp.fill);
		});

	newcomp.value = newcomp.Name;

	if (FromExisting == null) {
		var current_all_comp = reactContext.state.allComp.slice();
		console.log('Adding a fileUpload' + newcomp);
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

function handleFileUpload() {
	$('input#fileUploadFormToTheCloud').on('change', function (e) {
		var thisFormId = $(this).attr('class');

		var this_form_elemnt = $('#form_' + thisFormId);

		var form_data = new FormData(this_form_elemnt[0]);
		console.log('uploading' + form_data);

		var fileName = $(this).val();
		console.log(fileName);

		const thefileuploadajax = $.ajax({
			type: 'POST',
			accepts: 'text/json',
			url: '../upload/',
			data: form_data,
			processData: false,
			contentType: false,
			beforeSend: function (xhr, settings) {
				// $.beforeSend(xhr, settings);
				d3.select('#fileUpload_status_' + thisFormId).html('Uploading ..... ');
			},
			success: function (res) {
				console.log(res);
				var theCurrentComp = selectComp(thisFormId);
				theCurrentComp.outputs[0].Name = res.FileName;
				theCurrentComp.outputs[0].Description = {
					Name: res.FileName,
					size: res.FileSize,
					url: res.publicURL
				};
				theCurrentComp.outputs[0].value = res.publicURL;
				d3.select('#fileUpload_status_' + thisFormId).html(
					'File Size : ' +
						(res['FileSize'] / (1024 * 1024)).toString() +
						" MB <a class='open_uploadedFile_link' href='" +
						res.publicURL +
						"' target='blank'>open</a>"
				);

				d3.select('#foreignObject_fileUpload' + thisFormId).html(() => {
					return (
						`
                    <div id="TheContainedFile">` +
						res.FileName +
						`</div>
                    <div id="TheContainedFile">Size :` +
						(res.FileSize / (1024 * 1024)).toFixed(4).toString() +
						` MB</div>
                `
					);
				});
				redrawDependents(thisFormId);
			}
		});
	});
}

export { CreateNewFileUpload, handleFileUpload };
