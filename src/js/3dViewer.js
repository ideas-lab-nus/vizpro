function getGeometryData(project_api_key, tracking) {
	var project_id, branch_id, commit_id;

	var socket = new WebSocket(
		'wss://my.buildsim.io/GeometryGenerator?project_api_key=' +
			project_api_key +
			'&tracking=' +
			tracking
	);
	// console.log(socket)
	socket.onmessage = function (event) {
		var data = JSON.parse(event.data);
		switch (data['status']) {
			case 'error':
				console.log('Socket receive error status');
				alert(data['error_msg']);
				break;
			case 'ready':
				console.log('Socket receive ready status');
				socket.send(
					JSON.stringify({
						project_id: project_id,
						branch_id: branch_id,
						commit_id: commit_id,
						src: '',
						type: 'init'
					})
				);
				break;
			case 'geometry':
				var geo = data['geometry'];
				passGeometry(geo['geometry']);
				console.log(geo['geometry']);
				return JSON.stringify(geo['geometry']);
				break;

			default:
				console.log('Socket receive unknown status');
		}
	};

	return 'Hello world';
}

function View3DsomThing(project_api_key, tracking, output) {
	var project_id, branch_id, commit_id;

	var geo;

	var hvacZonings = {},
		hvacZoningTrees = {},
		hvacZoningZones = {},
		hvacZoningCounts = {},
		hvacZoneBasedInfo = {};

	var layerHide = {};

	var multipliers;

	var offsetX, offsetY, scene;

	var trakingParts = tracking.split('-');
	project_id = parseInt(trakingParts[0]);
	branch_id = parseInt(trakingParts[1]);
	commit_id = parseInt(trakingParts[2]);

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0xffffff, 1, 5000);
	scene.fog.color.setHSL(0.6, 0, 1);

	function passGeometry(data) {
		geometry = data;
		var offsets = geometry['OFFSETS'];
		layerStructs = geometry['DATUM_STRUCTS'];
		offsetX = offsets['X'];
		offsetY = offsets['Y'];

		$.each(layerStructs, function (index, value) {
			layerHide[index] = false;
		});
	}

	var socket = new WebSocket(
		'wss://my.buildsim.io/GeometryGenerator?project_api_key=' +
			project_api_key +
			'&tracking=' +
			tracking
	);
	socket.onmessage = function (event) {
		var data = JSON.parse(event.data);
		switch (data['status']) {
			case 'error':
				alert(data['error_msg']);
				break;
			case 'ready':
				socket.send(
					JSON.stringify({
						project_id: project_id,
						branch_id: branch_id,
						commit_id: commit_id,
						src: '',
						type: 'init'
					})
				);
				break;
			case 'model_path':
				$('#model_path').html(data['path']);
				break;
			case 'geometry':
				hvacZonings = data['hvacZonings'];
				hvacZoneBasedInfo = data['hvac_zone_based_info'];
				multipliers = data['multipliers'];
				if (multipliers) {
					$('#toggle_multiplier_container').show();
				}

				var hvac_id = 1;
				$.each(hvacZonings, function (name, controls) {
					var count = 0;
					var trees = {};

					$.each(controls, function (idx, control) {
						var type = control['type'];
						trees[idx] = {
							id: '' + idx + '',
							parent: '#',
							text: '' + control['name'] + '',
							li_attr: {
								type: type + '_datum',
								layer: '' + idx + ''
							}
						};
						count = idx;
					});

					var new_tab = $('<li>');
					new_tab.html(
						'<a data-toggle="tab" href="#tab_hvac_' +
							hvac_id +
							'" id="hvac_tab_' +
							hvac_id +
							'" aria-expanded="true" class="tab_tab_link">' +
							name +
							'</a>'
					);

					hvacZoningTrees[name] = trees;
					hvacZoningZones[name] = {};
					hvacZoningCounts[name] = count + 1;

					hvac_id++;
				});

				geo = data['geometry'];
				passGeometry(geo['geometry']);
				break;

			default:
				console.log('Socket receive unknown status');
				console.log('Unknown status: ' + data['status']);
		}
	};

	return geo;
}
