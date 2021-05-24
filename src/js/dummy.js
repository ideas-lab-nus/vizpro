var controls, renderer, renderer2, camera, camera2, offsetX, offsetY, scene, scene2, stats;
var raycaster, mouse = new THREE.Vector2(),
    INTERSECTED;
var CANVAS_WIDTH = 100,
    CANVAS_HEIGHT = 100,
    CAM_DISTANCE = 150;
var geometry, line_geometry, layerStructs, controls, selected_node, raycaster_zone;
var constructs = undefined,
    materials = undefined,
    glazings,
    dirLight,
    showMaterialNotif = false;

var layerHide = {},
    materialSelectMap = {};
var arrayCollection = {},
    floorChildren = {};
var floorCollection = [];

var hvacZonings = {},
    hvacZoningTrees = {},
    hvacZoningZones = {},
    hvacZoningCounts = {},
    hvacZoneBasedInfo = {},
    hvac_sub_systems = {};
var hvacZoningMethod;

var hasShading = false;
var hasMultiplier = false;

var hightlightmaterial,
    lastClickedGeometry,
    markermaterial,
    wallMaterial,
    innerWallMaterial,
    floorMaterial,
    ceilingMaterial,
    roofMaterial,
    winDoowMaterial,
    meshFaceMaterial,
    multipliers;

var solar_intensity = [0.04, 0.12, 0.20, 0.28, 0.36, 0.44, 0.52, 0.6, 0.68, 0.76, 0.84, 0.92, 1, 0.92, 0.84, 0.76, 0.68, 0.60, 0.52, 0.44, 0.36, 0.28, 0.20, 0.12];
var solar_setting;

var zone_loads, zones_info = {};

var project_id;
var branch_id;
var commit_id;

var socket;

$(function() {
    THREE.Triangulation.setLibrary('earcut');

    var project_api_key = getUrlParameter("project_api_key");
    if (project_api_key) {
        var model_api_key = getUrlParameter("model_api_key");
        var tracking = getUrlParameter("tracking");
        $.ajax({
            type: 'GET',
            url: './GetModelIds',
            data: {
                project_api_key: project_api_key,
                model_api_key: model_api_key,
                track_token: tracking
            },
            success: function(data) {
                if (data['status'] === 'success') {
                    project_id = data['project_id'];
                    branch_id = data['branch_id'];
                    commit_id = data['commit_id'];
                } else {
                    if (data['error_msg']) {
                        popInfo("Error", data['error_msg']);
                    }
                }
            },
            async: false
        })
    }

    project_id = project_id || window.opener.$("#select_project_id").val();
    branch_id = branch_id || window.opener.$("#select_branch_id").val();
    commit_id = commit_id || window.opener.$("#select_commit_id").val();

    //Load scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 1, 5000);
    scene.fog.color.setHSL(0.6, 0, 1);

    //renderer
    var canvas = document.getElementById("geometry");
    var canvasWidth = document.getElementById("geometry_wrapper").offsetWidth;
    var canvasHeight = document.getElementById("geometry_wrapper").offsetHeight;

    renderer = new THREE.WebGLRenderer({
        alpha: 1,
        antialias: true,
        preserveDrawingBuffer: true
    });
    renderer.sortObjects = false;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasWidth, 500);
    renderer.setClearColor(scene.fog.color);
    renderer.physicallyBasedShading = true;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.renderReverseSided = false;
    canvas.parentNode.replaceChild(renderer.domElement, canvas);

    //camera
    camera = new THREE.PerspectiveCamera(50, canvasWidth / 500, 1, 2000);
    camera.position.set(-35, -50, 10);
    camera.up = new THREE.Vector3(0, 0, 1);
    scene.add(camera);

    // raycaster
    raycaster = new THREE.Raycaster();

    ////////////////LIGHTING//////////////////////////////
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 100, 0);
    scene.add(hemiLight);

    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(0, 1, 1);
    dirLight.position.multiplyScalar(50);
    scene.add(dirLight);

    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    var d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;
    dirLight.shadowDarkness = 0.35;
    ////////////////LIGHTING//////////////////////////////

    /////////////////////SKY/////////////////////////////
    var vertexShader = document.getElementById('vertexShader').textContent;
    var fragmentShader = document.getElementById('fragmentShader').textContent;
    var uniforms = {
        topColor: {
            value: new THREE.Color(0x0077ff)
        },
        bottomColor: {
            value: new THREE.Color(0xffffff)
        },
        offset: {
            value: 33
        },
        exponent: {
            value: 0.6
        }
    };
    uniforms.topColor.value.copy(hemiLight.color);
    scene.fog.color.copy(uniforms.bottomColor.value);
    var skyGeo = new THREE.SphereGeometry(4000, 32, 15);
    var skyMat = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        side: THREE.FrontSide
    });
    var sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);
    /////////////////////SKY/////////////////////////////

    ////////////////////GROUND//////////////////////////
    var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
    var groundMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x050505
    });
    groundMat.color.setHSL(180, 62.5, 96.9);
    groundMat.side = THREE.DoubleSide;
    groundMat.transparent = true;
    groundMat.opacity = 0.7;

    var ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.z = 0;
    ground.receiveShadow = true;
    ground.castShadow = true;
    scene.add(ground);
    ////////////////////GROUND//////////////////////////

    // controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.rotateSpeed = 1;

    // texture loader
    var textureLoader = new THREE.TextureLoader();
    var maxAnisotropy = renderer.getMaxAnisotropy();

    var wall_texture = textureLoader.load("./3D/wall_texture.gif");
    wall_texture.anisotropy = maxAnisotropy;
    wall_texture.wrapS = wall_texture.wrapT = THREE.RepeatWrapping;
    wall_texture.repeat.set(1, 1);

    wallMaterial = new THREE.MeshPhongMaterial({
        color: 0x666666
    });

    wallMaterial.side = THREE.DoubleSide;

    innerWallMaterial = new THREE.MeshPhongMaterial({
        color: 0xB2B2B2
    });

    innerWallMaterial.side = THREE.DoubleSide;

    var floor_texture = textureLoader.load("./3D/floor_texture.gif");
    floor_texture.anisotropy = maxAnisotropy;
    floor_texture.wrapS = floor_texture.wrapT = THREE.RepeatWrapping;
    floor_texture.repeat.set(1, 1);

    floorMaterial = new THREE.MeshPhongMaterial({
        color: 0x666666
    });

    floorMaterial.side = THREE.BackSide;

    var roof_texture = textureLoader.load("./3D/roof_texture.gif");
    roof_texture.anisotropy = maxAnisotropy;
    roof_texture.wrapS = roof_texture.wrapT = THREE.RepeatWrapping;
    roof_texture.repeat.set(1, 1);

    roofMaterial = new THREE.MeshPhongMaterial({
        color: 0x96AEBE
    });

    roofMaterial.side = THREE.DoubleSide;

    var ceiling_texture = textureLoader.load("./3D/ceiling_texture.gif");
    ceiling_texture.anisotropy = maxAnisotropy;
    ceiling_texture.wrapS = ceiling_texture.wrapT = THREE.RepeatWrapping;
    ceiling_texture.repeat.set(1, 1);

    ceilingMaterial = new THREE.MeshPhongMaterial({
        color: 0x96AEBE
    });

    ceilingMaterial.side = THREE.FrontSide;

    //*
    winDoorMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff
    });
    winDoorMaterial.transparent = true;
    winDoorMaterial.opacity = 0.1;
    winDoorMaterial.side = THREE.DoubleSide;

    meshFaceMaterial = new THREE.MeshFaceMaterial([wallMaterial]);
    meshFaceMaterial.side = THREE.DoubleSide;

    //highlight material for zone
    zoneHightLightmaterial = new THREE.MeshBasicMaterial({
        color: 0x0c578b
    });
    zoneHightLightmaterial.side = THREE.DoubleSide;
    zoneHightLightmaterial.transparent = true;
    zoneHightLightmaterial.opacity = 0.7;
    zoneHightLightmaterial.overdraw = true;

    //MultiplyBlending
    zoneHightLightmaterial.blending = THREE["MultiplyBlending"];

    markermaterial = new THREE.MeshBasicMaterial({
        color: 0x999999
    });
    markermaterial.side = THREE.DoubleSide;

    //highlight material for wall
    hightlightmaterial = new THREE.MeshBasicMaterial({
        color: 0xFE2E2E
    });
    hightlightmaterial.side = THREE.DoubleSide;
    hightlightmaterial.transparent = true;
    hightlightmaterial.opacity = 0.7;
    hightlightmaterial.overdraw = true;

    //axis small window
    container2 = document.getElementById('inset');
    renderer2 = new THREE.WebGLRenderer();
    renderer2.setClearColor(0xf0f0f0, 1);
    renderer2.setSize(60, 60);
    container2.appendChild(renderer2.domElement);
    scene2 = new THREE.Scene();
    camera2 = new THREE.PerspectiveCamera(50, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000);
    camera2.up = camera.up;
    axes2 = new THREE.AxisHelper(100);
    scene2.add(axes2);
    animate();

    axes2.scale.z = 0.5;

    window.addEventListener('resize', function() {
        var viewSize = 20;
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        camera.left = canvasWidth / -2 * viewSize;
        camera.right = canvasWidth / 2 * viewSize;
        camera.top = canvasHeight / 2 * viewSize;
        camera.bottom = canvasHeight / -2 * viewSize;
        camera.aspect = canvasWidth / canvasHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasWidth, canvasHeight);
    });

    $("#geometry_wrapper").click(function() {
        if (raycaster_zone) {
            var lvl = parseInt($("#floors_level").val());
            var zones = floorChildren[lvl];

            if (zones !== null) {
                $.each(zones, function(i, v) {
                    if (v["text"] === raycaster_zone) {
                        var zone_id = v["id"];
                        $("#floors_zone").val(zone_id);
                        $("#floors_zone").change();

                        raycaster_zone = false;
                        return;
                    }
                });
            }

            raycaster_zone = false;
        }
    });

    window.addEventListener('mousemove', function(event) {
        if (!event) event = window.event;
        if (event.shiftKey) {
            var offset = $("#geometry_wrapper").offset();
            mouse.x = ((event.clientX - offset.left) / canvasWidth) * 2 - 1;
            mouse.y = -((event.clientY - offset.top) / canvasHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            if (!selected_node) {
                return;
            }

            var surfaces = scene.getObjectByName(selected_node["text"] + "_surfaces").children;
            var intersects = raycaster.intersectObjects(surfaces);
            if (intersects.length > 0) {
                var intersected = intersects[0].object;
                if (intersected["zone_name"]) {
                    raycaster_zone = intersected["zone_name"];

                    dehighlight(["highlight", "highlight2"]);

                    var surfaces = geometry["ZONE_" + intersected["zone_name"].toLowerCase()];
                    $.each(surfaces, function(index, data) {
                        highlight(geometry["SURFACE_" + index], "highlight2", 1, undefined);
                    });
                }
            }
        }
    });

    var caseInsensitiveStringInArray = function(val, arr) {
        var res = false;
        $.each(arr, function(i, v) {
            if (v.toLowerCase() === val.toLowerCase()) {
                res = true;
                return;
            }
        });
        return res;
    }

    var src = getUrlParameter('type');
    var queryStr = false;
    var projectAPIKey = getUrlParameter('project_api_key');
    if (projectAPIKey) {
        queryStr = "project_api_key=" + projectAPIKey;
    }
    socket = new WebSocket(buildSocketUrl('GeometryGenerator', queryStr));
    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        if (data["redirect"]) {
            window.location.href = data["location"];
            return;
        }
        switch (data['status']) {
            case "error":
                console.log("Socket receive error status");
                alert(data["error_msg"]);
                break;
            case "ready":
                console.log("Socket receive ready status");
                socket.send(JSON.stringify({
                    'project_id': project_id,
                    'branch_id': branch_id,
                    'commit_id': commit_id,
                    'src': src,
                    'type': 'init'
                }));
                break;
            case "model_path":
                console.log("Socket receive model_path status");
                $("#model_path").html(data['path']);
                break;
            case "geometry":
                console.log("Socket receive geometry status");
                hvacZonings = data['hvacZonings'];
                hvacZoneBasedInfo = data['hvac_zone_based_info'];
                multipliers = data["multipliers"];
                if (multipliers) {
                    $("#toggle_multiplier_container").show();
                }

                var hvac_id = 1;
                $.each(hvacZonings, function(name, controls) {
                    var count = 0;
                    var trees = {};

                    $.each(controls, function(idx, control) {
                        var type = control['type'];
                        trees[idx] = {
                            "id": "" + idx + "",
                            "parent": "#",
                            "text": "" + control['name'] + "",
                            "li_attr": {
                                "type": type + "_datum",
                                "layer": "" + idx + ""
                            }
                        };
                        count = idx;
                    });

                    var new_tab = $("<li>");
                    new_tab.html('<a data-toggle="tab" href="#tab_hvac_' +
                        hvac_id +
                        '" id="hvac_tab_' +
                        hvac_id +
                        '" aria-expanded="true" class="tab_tab_link">' + name + '</a>');
                    $("#tabs_container").append(new_tab);

                    var new_tab_content = $("<div>").attr("id", "tab_hvac_" + hvac_id).attr("class", "tab-pane");
                    new_tab_content.html($("#hvac_tab_template").html().replace(/\$id\$/g, hvac_id));
                    $("#tabs_content_container").append(new_tab_content);

                    if (trees.length === 0) {
                        var level = $("<option>").attr("value", "-1").text("No HVAC System");
                        $("#hvac_system_" + hvac_id).append(level);
                    } else {
                        var level = $("<option>").attr("value", "-1").text("Select HVAC System");
                        $("#hvac_system_" + hvac_id).append(level);
                    }
                    $.each(trees, function(i, v) {
                        var level = $("<option>").attr("value", v["id"]).text(v["text"]);
                        $("#hvac_system_" + hvac_id).append(level);
                    });
                    $("#hvac_system_" + hvac_id).select2();
                    $("#hvac_system_" + hvac_id).next().css({
                        'width': '100%'
                    });
                    $("#hvac_system_" + hvac_id).change(function() {
                        updateHVACZone($(this));
                    });
                    $("#hvac_system_" + hvac_id).change();

                    $("#hvac_zones_" + hvac_id).change(function() {
                        hvacZoneHighlight($(this));
                    });

                    hvacZoningTrees[name] = trees;
                    hvacZoningZones[name] = {};
                    hvacZoningCounts[name] = count + 1;

                    hvac_id++;
                });

                var geo = data["geometry"];
                passGeometry(geo["geometry"]);

                eval(geo["javascript"]);

                animate();
                break;
            case "floors":
                console.log("Socket receive floors status");
                var data = data["floors"];

                var totalNodeCount = 0;
                var lvl1Pointer = 0;
                var lvl2Pointer = 0;
                var zones = data["zones"];

                //layerStructs is initialized on passGeometry() in 'geometry';
                var level = $("<option>").attr("value", "-1").text("Whole Building");
                $("#floors_level").append(level);

                $.each(layerStructs, function(index, value) {
                    var levelObj = {
                        "id": "" + totalNodeCount + "",
                        "parent": "#",
                        "text": "" + index + "",
                        "li_attr": {
                            "type": "datum",
                            "layer": "" + index + ""
                        }
                    };
                    arrayCollection[totalNodeCount] = levelObj;

                    if (value.indexOf('MULTI') < 0) {
                        var level = $("<option>").attr("value", totalNodeCount).text(index);
                        $("#floors_level").append(level);
                    }
                    totalNodeCount++;
                });
                $("#floors_level").select2();

                $.each(zones, function(i, zone) {
                    var zoneList = "";

                    // floor based
                    $.each(layerStructs, function(index, value) {
                        zoneList = value.split("&");
                        var temp = zoneList.pop(); // last of zoneList is not zone name, it's layer index
                        if (caseInsensitiveStringInArray(zone["zoneName"], zoneList)) {
                            var zoneObj = {
                                "id": totalNodeCount,
                                "parent": temp,
                                "text": "" + zone["zoneName"] + "",
                                "li_attr": {
                                    "type": "zone",
                                    "zone": "" + zone["zoneName"] + ""
                                }
                            };
                            arrayCollection[totalNodeCount] = zoneObj;
                            if (floorChildren[temp] === undefined) {
                                floorChildren[temp] = [];
                            }
                            floorChildren[temp].push(zoneObj);

                            lvl1Pointer = totalNodeCount;
                            totalNodeCount++;
                            var surfaces = zone["surfaces"];
                            if (surfaces != null) {
                                $.each(surfaces, function(j, surface) {
                                    var surfaceObj = {
                                        "id": totalNodeCount,
                                        "parent": "" + lvl1Pointer + "",
                                        "text": "" + surface["surfaceName"] + "",
                                        "li_attr": {
                                            "type": "wall",
                                            "surface": "" + surface["surfaceName"] + "",
                                            "construct": "" + surface["surfaceConstruction"] + ""
                                        }
                                    };
                                    arrayCollection[totalNodeCount] = surfaceObj;
                                    if (floorChildren[lvl1Pointer] === undefined) {
                                        floorChildren[lvl1Pointer] = [];
                                    }
                                    floorChildren[lvl1Pointer].push(surfaceObj);

                                    lvl2Pointer = totalNodeCount;
                                    totalNodeCount++;
                                    var fenestrations = surface["fenestrations"];
                                    if (fenestrations !== null) {
                                        $.each(fenestrations, function(k, fenestration) {
                                            var feneObj = {
                                                "id": totalNodeCount,
                                                "parent": "" + lvl2Pointer + "",
                                                "text": "" + fenestration["fenestrationName"] + "",
                                                "li_attr": {
                                                    "type": "fenestration",
                                                    "surface": "" + fenestration["fenestrationName"] + "",
                                                    "construct": "" + fenestration["fenestrationConstruction"] + ""
                                                }
                                            };
                                            arrayCollection[totalNodeCount] = feneObj;
                                            if (floorChildren[lvl2Pointer] === undefined) {
                                                floorChildren[lvl2Pointer] = [];
                                            }
                                            floorChildren[lvl2Pointer].push(feneObj);

                                            totalNodeCount++;
                                        });
                                    }
                                });
                            }
                        }
                    });

                    //hvac zoning based
                    $.each(hvacZonings, function(name, controls) {
                        var trees = hvacZoningTrees[name];
                        var count = hvacZoningCounts[name];
                        var map = hvacZoningZones[name];

                        $.each(controls, function(idx, control) {
                            zoneList = control['zones'].split("&");
                            var type = control['type'];

                            if (caseInsensitiveStringInArray(zone["zoneName"], zoneList)) {
                                var hvacZoneObj = {
                                    "id": "" + count + "",
                                    "parent": idx,
                                    "text": "" + zone["zoneName"] + "",
                                    "li_attr": {
                                        "type": type + "_zone",
                                        "zone": "" + zone["zoneName"] + ""
                                    }
                                };
                                trees[count] = hvacZoneObj
                                if (map[idx] === undefined) {
                                    map[idx] = [];
                                }
                                map[idx].push(hvacZoneObj);

                                lvl1Pointer = count;
                                count++;
                            }
                        });

                        hvacZoningTrees[name] = trees;
                        hvacZoningZones[name] = map;
                        hvacZoningCounts[name] = count;
                    });
                });

                $("#floors_level").change();

                floorCollection = arrayCollection;

                if (hasShading) {
                    $("#toggle_shading_container").show();
                }

                $('#prompt').remove();
                $("#switches").show();

                break;
            case "materials":
                console.log("Socket receive materials status");
                var data = data["materials"]["materials"];
                constructs = data["constructs"];
                materials = data["materials"];

                if (showMaterialNotif) {
                    $("#material_panel").html("<h4>Material detailed information is loaded</h4>");
                }

                break;
            case "hvac_zone":
                console.log("Socket receive hvac_zone status");
                var hvac_id = data['hvac_id'];
                var data = data['data']['zone'][0]['properties'];

                $('#hvac_system_info_' + hvac_id).html("");
                $('#hvac_sub_system_info_' + hvac_id).html("");

                var html = "<h4>Zone System Type: " + data['name'] + "</h4>"
                html += "<table class='table table-striped'>";
                $.each(data['properties'], function(index, value) {
                    var name = value['name'];
                    var val = value['value'];
                    var unit = value['unit'];
                    if (unit !== '') {
                        val = val + ' (' + unit + ')';
                    }
                    html += "<tr><td class='col-md-6'><b>" + name + "</b></td><td class='col-md-6'>" + val + "</td></tr>";
                });

                html += "</table>";

                $('#hvac_system_info_' + hvac_id).append(html);
                break;
            case "hvac_layer":
                console.log("Socket receive hvac_layer status");
                var hvac_id = data['hvac_id'];
                var data = data['data'];

                $('#hvac_system_info_' + hvac_id).html("");
                $('#hvac_sub_system_info_' + hvac_id).html("");

                var sub_systems = $("<table class='table table-striped'>" +
                    "<tr>" +
                    "<th>Sub system type</th>" +
                    "<th>Sub system name</th>" +
                    "</tr>" +
                    "</table>");
                var i = 2;

                var systems = data['system'];
                hvac_sub_systems = {};
                $.each(systems, function(i, sys) {
                    var sub_sys_type = sys['properties']['name'];
                    var sub_sys_name = sys['properties']['properties'][0]['value'];
                    $("<tr><td class='col-md-6'><b>" + sub_sys_type + "</b></td><td class='hvac_sys_info_data col-md-6' hvac_id='" + hvac_id + "'>" + sub_sys_name + "</td></tr>").appendTo($(sub_systems));

                    hvac_sub_systems[sub_sys_name] = sys['properties']['properties'];
                });
                $(sub_systems).appendTo($('#hvac_system_info_' + hvac_id));
                break;
            default:
                console.log("Socket receive unknown status");
                console.log("Unknown status: " + data['status']);
        }
    };

    function updateHVACZone(sys_select) {
        var hvac_id = sys_select.attr("id");
        hvac_id = hvac_id.substring(hvac_id.lastIndexOf("_") + 1);

        var system = $("#hvac_system_" + hvac_id + " option[value=" + sys_select.val() + "]").text();

        //clear highlight

        $("#hvac_zones_" + hvac_id).html("");
        var sysName = $("#hvac_tab_" + hvac_id).text();
        var zones = hvacZoningZones[sysName];
        if (zones !== undefined) {
            zones = zones[parseInt(sys_select.val())];
        }

        if (zones === undefined || zones.length === 0) {
            var level = $("<option>").attr("value", "-1").text("No Cover Zone");
            $("#hvac_zones_" + hvac_id).append(level);
        } else {
            var level = $("<option>").attr("value", "-1").text("Select Cover Zone");
            $("#hvac_zones_" + hvac_id).append(level);

            $.each(zones, function(i, v) {
                var level = $("<option>").attr("value", v["id"]).text(v["text"]);
                $("#hvac_zones_" + hvac_id).append(level);
            });
        }
        $("#hvac_zones_" + hvac_id).select2();
        $("#hvac_zones_" + hvac_id).next().css({
            'width': '100%'
        });

        /*************
         * HVAC info *
         *************/
        dehighlight(["highlight2"]);
        if (sys_select.val() !== "-1") {
            var zonings = hvacZonings[sysName];

            $.each(zonings, function(idx, zoning) {
                if (zoning['name'] === system) {
                    var zoneList = zoning['zones'].split('&');
                    $.each(zoneList, function(i, v) {
                        var surfaces = geometry["ZONE_" + v.toLowerCase()];
                        $.each(surfaces, function(index, data) {
                            highlight(geometry["SURFACE_" + index], "highlight2", 1, undefined);
                        });
                    });
                }
            });

            socket.send(JSON.stringify({
                'system_type': sysName,
                'system_name': system,
                'hvac_id': hvac_id,
                'type': 'hvac_info'
            }));
        }
    }

    function hvacZoneHighlight(zone_select) {
        dehighlight(["highlight2"]);
        if (zone_select.val() !== "-1") {
            var hvac_id = zone_select.attr("id");
            hvac_id = hvac_id.substring(hvac_id.lastIndexOf("_") + 1);

            var sys_id = $("#hvac_system_" + hvac_id).val();
            var system = $("#hvac_system_" + hvac_id + " option[value=" + sys_id + "]").text();
            var zone = $("#hvac_zones_" + hvac_id + " option[value=" + zone_select.val() + "]").text();

            var surfaces = geometry["ZONE_" + zone.toLowerCase()];
            $.each(surfaces, function(index, data) {
                highlight(geometry["SURFACE_" + index], "highlight2", 1, undefined);
            });

            var sysName = $("#hvac_tab_" + hvac_id).text();
            socket.send(JSON.stringify({
                'system_type': sysName,
                'system_name': system,
                'zone': zone,
                'hvac_id': hvac_id,
                'type': 'hvac_info'
            }));
        }
    }

    $("#floors_level").change(function() {
        var lvl = parseInt($(this).val());
        var zones = floorChildren[lvl];

        $("#floors_zone").html("");
        if (zones === undefined) {
            var level = $("<option>").attr("value", "-1").text("No Zones");
            $("#floors_zone").append(level);
        } else {
            var level = $("<option>").attr("value", "-1").text("Select Zones");
            $("#floors_zone").append(level);
            $.each(zones, function(i, v) {
                var level = $("<option>").attr("value", v["id"]).text(v["text"]);
                $("#floors_zone").append(level);
            });
        }

        $("#floors_zone").select2();
        $("#floors_zone").change();

        /************
         * Geometry *
         ************/
        if ($.inArray(lvl, multipliers) > -1 && !$("#toggle_multiplier").is(":checked")) {
            popInfo("", "You selected a multiplier level");
            return;
        } else {
            dehighlight(["highlight", "highlight2"]);
            if (lvl === -1) {
                $.each(layerStructs, function(index, value) {
                    visibilityControl(index, true, true);
                });
                selected_node = false;
            } else {
                var levelObj = arrayCollection[lvl];
                //only show the current datum
                $.each(layerStructs, function(index, value) {
                    visibilityControl(index, false, false);
                });
                visibilityControl(levelObj["text"], true, false);
                selected_node = levelObj;
            }
        }

        // reset zone load type
        $("#lengend_box").hide();
        $('input[name="load_type_switch"]').prop('checked', false);

        //Material
        $("#material_panel, #changeMaterial").html("");
    });

    $("#floors_zone").change(function() {
        var id = parseInt($(this).val());
        var surfaces = floorChildren[id];

        $("#floors_surface").html("");
        if (surfaces === undefined) {
            var level = $("<option>").attr("value", "-1").text("No Surfaces");
            $("#floors_surface").append(level);
        } else {
            var level = $("<option>").attr("value", "-1").text("Select Surface");
            $("#floors_surface").append(level);
            $.each(surfaces, function(i, v) {
                var level = $("<option>").attr("value", v["id"]).text(v["text"]);
                $("#floors_surface").append(level);
            });
        }

        $("#floors_surface").select2();
        $("#floors_surface").change();

        // Material
        $("#material_panel, #changeMaterial").html("");

        dehighlight(["highlight", "highlight2"]);
        if (id !== -1) {
            /************
             * Geometry *
             ************/
            var zoneObj = arrayCollection[id];

            var surfaces = geometry["ZONE_" + zoneObj["text"].toLowerCase()];
            $.each(surfaces, function(index, data) {
                highlight(geometry["SURFACE_" + index], "highlight2", 1, undefined);
            });

            // show zone info
            var zoneName = $(this).children("option").filter(":selected").text();
            var zone_info = zones_info[zoneName];

            if (zone_info) {
                var infoTable = $("<table class='table table-striped'></table>");
                infoTable.append("<tr><td><b>Zone Name</b></td><td>" + zoneName + "</td>");
                infoTable.append("<tr><td><b>Heating Load</b></td><td>" + readZoneInfo(zone_info, "heating_load") + "</td>");
                infoTable.append("<tr><td><b>Heating Supply Air Flow Rate</b></td><td>" + readZoneInfo(zone_info, "heatsupplyair") + "</td>");
                infoTable.append("<tr><td><b>Cooling Load</b></td><td>" + readZoneInfo(zone_info, "cooling_load") + "</td>");
                infoTable.append("<tr><td><b>Cooling Supply Air Flow Rate</b></td><td>" + readZoneInfo(zone_info, "coolsupplyair") + "</td>");
                infoTable.append("<tr><td><b>Zone Area</b></td><td>" + readZoneInfo(zone_info, "area") + "</td>");
                infoTable.append("<tr><td><b>Lighting Power Density</b></td><td>" + readZoneInfo(zone_info, "lighting") + "</td>");
                infoTable.append("<tr><td><b>Zone Occupancy</b></td><td>" + readZoneInfo(zone_info, "people") + "</td>");
                infoTable.append("<tr><td><b>Equipment Load</b></td><td>" + readZoneInfo(zone_info, "equipment") + "</td>");
                infoTable.append("<tr><td><b>Window Area</b></td><td>" + readZoneInfo(zone_info, "windowarea") + "</td>");
                infoTable.append("<tr><td><b>Above Wall Area</b></td><td>" + readZoneInfo(zone_info, "abovewallarea") + "</td>");
                infoTable.append("<tr><td><b>Underground Wall Area</b></td><td>" + readZoneInfo(zone_info, "undergroundwallarea") + "</td>");
                infoTable.append("<tr><td><b>Is Conditioned</b></td><td>" + readZoneInfo(zone_info, "conditioned") + "</td>");
                infoTable.append("<tr><td><b>Zone HVAC Heating</b></td><td>" + readZoneInfo(zone_info, "heatFromZoneHVAC") + "</td>");
                infoTable.append("<tr><td><b>Zone HVAC Cooling</b></td><td>" + readZoneInfo(zone_info, "coolFromZoneHVAC") + "</td>");
                infoTable.append("<tr><td><b>Central HVAC Heating</b></td><td>" + readZoneInfo(zone_info, "heatFromCentralHVAC") + "</td>");
                infoTable.append("<tr><td><b>Central HVAC Cooling</b></td><td>" + readZoneInfo(zone_info, "coolFromCentralHVAC") + "</td>");
                infoTable.append("<tr><td><b>Operation Hours</b></td><td>" + readZoneInfo(zone_info, "operationhour") + "</td>");

                $(infoTable).appendTo($('#material_panel'));
            }
        }
    });

    function readZoneInfo(zone_info, key) {
        var val = zone_info[key];
        if (!val) {
            return "Not Available";
        }
        return val['value'] + " " + val['unit'];
    }

    $("#floors_surface").change(function() {
        var id = parseInt($(this).val());
        var fenes = floorChildren[id];

        $("#floors_fene").html("");
        if (fenes === undefined || fenes.length === 0) {
            var empty = $("<option>").attr("value", "-1").text("No Fenestration");
            $("#floors_fene").append(empty);
        } else {
            var empty = $("<option>").attr("value", "-1").text("Select Fenestration");
            $("#floors_fene").append(empty);
            $.each(fenes, function(i, v) {
                var level = $("<option>").attr("value", v["id"]).text(v["text"]);
                $("#floors_fene").append(level);
            });
        }

        $("#floors_fene").select2();

        /************
         * Geometry *
         ************/
        dehighlight(["highlight"]);
        if (id !== -1) {
            var surObj = arrayCollection[id];
            var surfaceInfo = geometry["SURFACE_" + surObj["text"]];
            highlight(surfaceInfo, "highlight", 1, undefined);
        }

        /************
         * Material *
         ************/
        $("#material_panel, #changeMaterial").html("");
        showSurfaceMaterialInfo(id);
    });

    $("#floors_fene").change(function() {
        var id = parseInt($(this).val());
        var feneObj = arrayCollection[id];

        /************
         * Geometry *
         ************/
        dehighlight(["highlight"]);
        if (id === -1) {
            var surId = parseInt($("#floors_surface").val());
            if (surId !== -1) {
                var surObj = arrayCollection[surId];
                var surfaceInfo = geometry["SURFACE_" + surObj["text"]];
                highlight(surfaceInfo, "highlight", 1, undefined);
            }
        } else {
            dehighlight(["highlight"]);
            var surObj = arrayCollection[id];
            var surfaceInfo = geometry["SURFACE_" + surObj["text"]];
            highlight(surfaceInfo, "highlight", 2, undefined);
        }

        /************
         * Material *
         ************/
        $("#material_panel, #changeMaterial").html("");
        showSurfaceMaterialInfo(id);
    });

    function showSurfaceMaterialInfo(id) {
        if (id !== -1) {
            var surObj = arrayCollection[id];
            var construct = surObj.li_attr.construct;
            var info = constructs[construct];

            var materialTable = $("<table class='table table-striped'>" +
                "<tr>" +
                "<td colspan='2'><b>" + surObj["text"] + "</b></td>" +
                "</tr>" +
                "<tr>" +
                "<td><b>Construct Name:</b></td>" +
                "<td>" + info["Name"] + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td class='layer' layerOrder='OutsideLayer'><b>Outside Layer:</b></td>" +
                "<td class='info_data col-md-6'>" + info["Outside Layer"] + "</td>" +
                "</tr>" +
                "</table>");

            var i = 2;
            var content;
            while (true) {
                content = info["Layer " + i];
                if (content !== undefined) {
                    $("<tr><td class='layer' layerOrder='Layer" + i + "'><b>Layer" + i + ":</b></td><td class='info_data col-md-6'>" + content + "</td></tr>").appendTo($(materialTable));
                    i++;
                } else {
                    break;
                }
            }
            $(materialTable).appendTo($('#material_panel'));
        }
    }

    $("#show_building").click(function() {
        dehighlight(["highlight", "highlight2"]);

        //show whole building
        $.each(layerStructs, function(index, value) {
            visibilityControl(index, true, true);
        });
    });

    $.ajax({
        type: "POST",
        url: "./GetModelSolarInfo",
        data: {
            'project_id': project_id,
            'branch_id': branch_id,
            'commit_id': commit_id,
            'month': 1,
            'day': 1,
            'project_api_key': projectAPIKey
        },
        success: function(data) {
            if (data["redirect"]) {
                window.location.href = data["location"];
                return;
            }

            if (data['status'] === 'success') {
                solar_setting = data['data'];
                set_solar(12);
            } else {
                alert(data['error_msg']);
            }
        },
        dataType: 'json'
    });
    $.ajax({
        type: "POST",
        url: "./GeometryZoneLoad",
        data: {
            'project_id': project_id,
            'branch_id': branch_id,
            'commit_id': commit_id,
            'project_api_key': projectAPIKey
        },
        success: function(data) {
            if (data["redirect"]) {
                window.location.href = data["location"];
                return;
            }

            if (data['status'] === 'success') {
                zone_loads = data['data'];
                if (zone_loads['status'] === 'error') {
                    $("#load_switch").html(zone_loads['error_msg']);
                    zone_loads = undefined;
                } else {
                    var zone_info = zone_loads['zone_info']['data'];
                    $.each(zone_info, function(i, v) {
                        zones_info[v['name']] = v;
                    });
                }
            } else {
                alert(data['error_msg']);
            }
        },
        dataType: 'json'
    });
    set_days(1);

    $("#tabs_container").on('click', '.tab_tab_link', function() {
        var text = $(this).text();
        $("#load_switch").hide();
        dehighlight(["highlight", "highlight2"]);
        if (text === 'Floors') {
            if (hasShading && !$("#toggle_shading").is(":checked")) {
                $("#toggle_shading").click();
            }

            if (multipliers && !$("#toggle_multiplier").is(":checked")) {
                $("#toggle_multiplier").click();
            }

            //show whole building
            $.each(layerStructs, function(index, value) {
                visibilityControl(index, true, true);
            });

            $("#floors_level").val("-1");
            $("#floors_level").change();
            $("#floors_zone").val("-1");
            $("#floors_zone").change();
            $("#floors_zone").next().css('width', '100%');
            $("#floors_surface").val("-1");
            $("#floors_surface").change();
            $("#floors_surface").next().css('width', '100%');
            $("#floors_fene").val("-1");
            $("#floors_fene").change();
            $("#floors_fene").next().css('width', '100%');
        } else {
            if (hasShading && $("#toggle_shading").is(":checked")) {
                $("#toggle_shading").click();
            }
            if (multipliers && !$("#toggle_multiplier").is(":checked")) {
                $("#toggle_multiplier").click();
            }

            //show lines only
            $.each(layerStructs, function(index, value) {
                showLines(index);
            });

            var hvac_id = $(this).attr("id");
            hvac_id = hvac_id.substring(hvac_id.lastIndexOf("_") + 1);

            $("#hvac_system_" + hvac_id).val("-1");
            $("#hvac_system_" + hvac_id).change();
            $("#hvac_zones_" + hvac_id).val("-1");
            $("#hvac_zones_" + hvac_id).change();
            $("#hvac_zones_" + hvac_id).next().css('width', '100%');

            $("#hvac_system_info_" + hvac_id).html("");
            $("#hvac_sub_system_info_" + hvac_id).html("");
        }
    });

    //bold the text of changeable material to provide a better interaction experience
    $('body').on('mouseenter', '.info_data', function() {
        $(this).css('font-weight', 'bold');
    });
    $('body').on('mouseleave', '.info_data', function() {
        $(this).css('font-weight', 'normal');
    });

    $('body').on('mouseenter', '.hvac_sys_info_data', function() {
        $(this).css({
            'font-weight': 'bold',
            'cursor': 'pointer'
        });
    });
    $('body').on('mouseleave', '.hvac_sys_info_data', function() {
        $(this).css('font-weight', 'normal');
    });

    //for zone highlight
    $('body').on('mouseenter', '.dbmaterial', function() {
        $(this).addClass("highlight2");
    });
    $('body').on('mouseleave', '.dbmaterial', function() {
        $(this).removeClass("highlight2");
    });

    //on click changeable material name, pull on material info
    $('body').on('click', '.info_data', function() {
        html: getMaterialDetailedInfo($(this).text().trim(), $(this).closest('tr').find('.layer').attr('layerOrder'))
    });

    $('body').on('click', '.hvac_sys_info_data', function() {
        var sub_sys_name = $(this).text().trim();
        var info = hvac_sub_systems[sub_sys_name];
        var hvac_id = $(this).attr('hvac_id');

        $('#hvac_sub_system_info_' + hvac_id).html("");

        var html = "<table class='table table-striped'>";
        $.each(info, function(index, value) {
            var name = value['name'];
            var val = value['value'];
            var unit = value['unit'];
            if (unit !== '') {
                val = val + ' (' + unit + ')';
            }
            html += "<tr><td class='col-md-6'><b>" + name + "</b></td><td class='col-md-6'>" + val + "</td></tr>";
        });

        html += "</table>";

        $('#hvac_sub_system_info_' + hvac_id).append(html);
    });

    // original section
    $('#jstree').on('activate_node.jstree', function(e, data) {
        var node = data.node;

        //click on a zone, surface, fenestration label
        var showRoof = false;
        if (node.li_attr.type != 'datum') {
            while (node.parent != "#") {
                node = $('#jstree').jstree(true).get_node($('#jstree').jstree(true).get_parent(node));
            }

            //only show the current datum
            $.each(layerStructs, function(index, value) {
                visibilityControl(index, false, false);
            });
        } else {
            //click on a visible datum label
            if (!layerHide[node.text]) {
                //toggle visibility;
                $.each(layerStructs, function(index, value) {
                    if (layerHide[index]) {
                        showRoof = true;
                        visibilityControl(index, true, true);
                    } else {
                        visibilityControl(index, false, false);
                    }
                });
            }
            //click on a hidden datum label
            else {
                // hide all first
                $.each(layerStructs, function(index, value) {
                    visibilityControl(index, false, false);
                });
            }

            if (node.children.length > 0) {
                selected_node = node;
            } else {
                //platum layer, no zones
                selected_node = undefined;
            }
        }

        //display the selected datum
        visibilityControl(node.text, true, showRoof);

        geometryClick($(this));
        var zone = data.node.li_attr.zone;
        var surface = data.node.li_attr.surface;
        var type = data.node.li_attr.type;
        $("#material_panel, #changeMaterial").html("");
        if (zone) {
            var surfaces = geometry["ZONE_" + zone.toLowerCase()];
            $.each(surfaces, function(index, data) {
                highlight(geometry["SURFACE_" + index], "highlight2", 1, undefined);
            });
        }
        if (surface) {
            if (constructs === undefined) {
                showMaterialNotif = true;
                $('#material_panel').html("Material detailed information is still loading...");
                return;
            }

            var surfaceInfo = geometry["SURFACE_" + surface];
            highlight(surfaceInfo, "highlight", 1, undefined);

            var zone_attr = $('#' + data.node.parent).attr('zone');
            if (zone_attr) {
                var feneZone = geometry["ZONE_" + zone_attr.toLowerCase()];
                if (feneZone) {
                    $.each(feneZone, function(index, data) {
                        if (index != surface) {
                            highlight(geometry["SURFACE_" + index], "highlight2", 1, undefined);
                        }

                    });
                }
            }

            var construct = data.node.li_attr.construct;
            var type = data.node.li_attr.type;
            var info = constructs[construct];

            var materialTable = $("<table class='table table-striped'>" +
                "<tr>" +
                "<td>Construct Name:</td>" +
                "<td>" + info["Name"] + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td class='layer' layerOrder='OutsideLayer'>Outside Layer:</td>" +
                "<td class='info_data col-md-6'>" + info["Outside Layer"] + "</td>" +
                "</tr>" +
                "</table>");
            var i = 2;
            var content;
            while (true) {
                content = info["Layer " + i];
                if (content !== undefined) {
                    $("<tr><td class='layer' layerOrder='Layer" + i + "'>Layer" + i + ":</td><td class='info_data col-md-6'>" + content + "</td></tr>").appendTo($(materialTable));
                    i++;
                } else {
                    break;
                }
            }
            $(materialTable).appendTo($('#material_panel'));

        } else {
            //$(".info_data").click(function(){});
        }
    });

    $("#month_list").change(function() {
        set_days(parseInt($(this).val()));
    });

    $("#hour_bar").on("input", function() {
        set_solar($(this).val());
    });

    $("#day_list").change(function() {
        $("#update_solar_date").val("Updating");
        $("#hour_bar").prop("disabled", true);
        $.ajax({
            type: "POST",
            url: "./GetModelSolarInfo",
            data: {
                'project_id': project_id,
                'branch_id': branch_id,
                'commit_id': commit_id,
                'month': $("#month_list").val(),
                'day': $("#day_list").val(),
                'project_api_key': projectAPIKey
            },
            success: function(data) {
                if (data["redirect"]) {
                    window.location.href = data["location"];
                    return;
                }

                if (data['status'] === 'success') {
                    solar_setting = data['data'];
                    $("#update_solar_date").val("Update");
                    $("#hour_bar").prop("disabled", false);
                    set_solar($("#hour_bar").val());
                } else {
                    alert(data['error_msg']);
                }
            },
            dataType: 'json'
        });
    });

    $("#snap_shot").click(function() {
        var snapshot = renderer.domElement.toDataURL("image/jpeg");
        $.ajax({
            type: 'POST',
            url: './SaveSnapShot',
            data: {
                project_id: project_id,
                branch_id: branch_id,
                commit_id: commit_id,
                data: snapshot
            },
            success: function(data) {
                if (data['status'] === 'success') {
                    popInfo("", "Snapshot saved");
                    window.opener.update_commit_info();
                } else {
                    if (data['error_msg']) {
                        popInfo("Error", data['error_msg']);
                    } else if (data['redirect']) {
                        popInfo("Error", "Please login first to save the snapshot");
                    }
                }
            }
        });
    });

    $("input[name='load_type_switch']").change(function() {
        dehighlight(["highlight", "highlight2"]);

        var select = $(this).val();
        var load_data = zone_loads[select];

        var lvl = $("#floors_level").val();
        var level = $("#floors_level option[value=" + lvl + "]").text();
        var zones = geometry["DATUM_STRUCTS"][level].split('&');
        for (var i = 0; i < zones.length - 1; i++) {
            var zone = zones[i];
            var color = load_data[zone + "_color"];

            if (color) {
                var surfaces = geometry["ZONE_" + zone.toLowerCase()];
                $.each(surfaces, function(index, data) {
                    highlight(geometry["SURFACE_" + index], "highlight2", -1, color);
                });
            }
        }

        if (select === 'heating_load') {
            $("#red_value").html(zone_loads['heating_min'] + 'W');
            $("#blue_value").html(zone_loads['heating_max'] + 'W');
        } else if (select === 'cooling_load') {
            $("#red_value").html(zone_loads['cooling_max'] + 'W');
            $("#blue_value").html(zone_loads['cooling_min'] + 'W');
        }
        $("#lengend_box").show();
    });

    $("#toggle_shading").change(function() {
        if (hasShading) {
            var show = $(this).is(":checked");
            visibilityControl("LEVEL_-1", show, true);
        }
    });

    $("#toggle_multiplier").change(function() {
        if (multipliers) {
            var show = $(this).is(":checked");
            var selected_lvl = parseInt($("#floors_level").val());
            if (selected_lvl == -1) {
                $.each(multipliers, function(i, v) {
                    visibilityControl("LEVEL_" + v, show, true);
                });
            } else if ($.inArray(selected_lvl, multipliers) > -1) {
                visibilityControl("LEVEL_" + selected_lvl, show, false);
            }
        }
    });
});

function set_days(month) {
    $("#day_list").html("");
    var days = 30;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            days = 31;
            break;
        case 2:
            days = 28;
            break;
    }

    for (var i = 1; i <= days; i++) {
        $("#day_list").append("<option value='" + i + "'>" + i + "</option>");
    }
    $("#day_list").change();
}

function set_solar(hour) {
    $("#hour_display").html(hour);

    var solar = solar_setting[parseInt(hour)];

    //EnergyPlus Y-axis pointing north, X-axis pointing east
    var azimuth = parseFloat(solar["azimuth"]);
    dirLight.position.x = Math.sin(azimuth * Math.PI / 180) * 50;
    dirLight.position.y = Math.cos(azimuth * Math.PI / 180) * 50;

    var angle = 90 - parseFloat(solar["angle"]);
    if (angle < 0) {
        dirLight.position.z = 0;
    } else {
        dirLight.position.z = Math.tan(angle * Math.PI / 180) * 50;
    }

    dirLight.intensity = solar_intensity[hour];
}

function visibilityControl(level, isShow, showRoof) {
    if ($.inArray(level, multipliers) > -1) {
        isShow = isShow && $("#toggle_multiplier").is(":checked");
    }

    var object = scene.getObjectByName(level + '_lines', true);
    object.visible = isShow;

    var object = scene.getObjectByName(level + '_surfaces', true);
    object.visible = isShow;
    layerHide[level] = !isShow;

    $.each(object.children, function(i, obj) {
        if (obj.name === 'ceil_roof') {
            obj.visible = showRoof;
        }
    });

    if ($("#floors_level").val() === "-1") {
        $("#load_switch").hide();
        $("#lengend_box").hide();
        $('input[name="load_type_switch"]').prop('checked', false);
    } else {
        $("#load_switch").show();
    }

    if (showRoof) {
        selected_node = false;
    }
}

function showLines(level) {
    var object = scene.getObjectByName(level + '_lines', true);
    object.visible = true;

    var object = scene.getObjectByName(level + '_surfaces', true);
    object.visible = false;

    var object = scene.getObjectByName(level + '_Roof', true);
    if (object) {
        object.visible = false;
    }
}

function passGeometry(data) {
    geometry = data;
    var offsets = geometry["OFFSETS"];
    layerStructs = geometry["DATUM_STRUCTS"];
    offsetX = offsets["X"];
    offsetY = offsets["Y"];

    $.each(layerStructs, function(index, value) {
        layerHide[index] = false;
    });
}

function animate() {
    controls.update();

    camera2.position.copy(camera.position);
    camera2.position.sub(controls.target);
    camera2.position.setLength(CAM_DISTANCE);
    camera2.lookAt(scene2.position);

    render();
    renderer2.render(scene2, camera2);

    requestAnimationFrame(animate);
}

function render() {
    renderer.render(scene, camera);
}

//highlight a surface on click
function highlight(surface, hightlightName, hightlight_surface_offset, color) {
    var num = surface["num"];

    //get 3D points
    var pts = [];
    var coordinates;
    for (var i = 0; i < num; i++) {
        coordinates = surface["POINT_" + i].split(",");
        var x = parseFloat(coordinates[0]) + offsetX;
        var y = parseFloat(coordinates[1]) + offsetY;
        pts.push(new THREE.Vector3(x, y, parseFloat(coordinates[2])));
    }

    //get surface normal
    var normal;
    var v1 = new THREE.Vector3(pts[0].x - pts[1].x, pts[0].y - pts[1].y, pts[0].z - pts[1].z);
    for (var i = 2; i < pts.length; i++) {
        var v2 = new THREE.Vector3(pts[0].x - pts[i].x, pts[0].y - pts[i].y, pts[0].z - pts[i].z);
        normal = v1.cross(v2).normalize();
        if (normal.x !== 0 || normal.y !== 0 || normal.z !== 0) {
            break;
        }
    }

    if (normal.x === 0 && normal.y === 0 && normal.z === 0) {
        console.error("Cannot get surface normal vector");
        return;
    }

    //get rotation matrix to XY plane
    var quaternion = new THREE.Quaternion().setFromUnitVectors(normal, new THREE.Vector3(0, 0, 1));
    var matrix = new THREE.Matrix4().makeRotationFromQuaternion(quaternion);

    //get 2D points on XY plane, and z value
    var pts2D = [],
        z;
    var n_off_x = normal.x * 0.1 * hightlight_surface_offset,
        n_off_y = normal.y * 0.1 * hightlight_surface_offset,
        n_off_z = normal.z * 0.1 * hightlight_surface_offset;
    $.each(pts, function(i, v) {
        var v1 = new THREE.Vector3(v.x + n_off_x, v.y + n_off_y, v.z + n_off_z);
        var r = v1.applyMatrix4(matrix);
        pts2D.push(new THREE.Vector2(r.x, r.y));

        z = r.z;
    });

    // make mesh on XY plane
    var geometry = new THREE.ShapeBufferGeometry(new THREE.Shape(pts2D));

    var material;
    if (!color) {
        material = hightlightName === 'highlight' ? hightlightmaterial : zoneHightLightmaterial;
    } else {
        eval("material = new THREE.MeshBasicMaterial({color:" + color + "})");
        material.side = THREE.DoubleSide;
        material.transparent = true;
        material.opacity = 0.7;
        material.overdraw = true;
    }
    var mesh = new THREE.Mesh(geometry, material);

    //translate by z
    mesh.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, z));

    //rotate by inverse matrix
    mesh.applyMatrix(matrix.getInverse(matrix));

    //show mesh
    mesh.name = hightlightName;
    scene.add(mesh);
}

//highlight a zone on click
function highlight2(surface) {
    var num = surface["num"];

    var geo = new THREE.Geometry();
    var coordinates;
    for (var i = 0; i < num; i++) {
        coordinates = surface["POINT_" + i].split(",");
        var x = parseFloat(coordinates[0]) + offsetX;
        var y = parseFloat(coordinates[1]) + offsetY;
        geo.vertices.push(new THREE.Vector3(x, y, coordinates[2]));
    }

    for (var i = 1; i + 1 < num; i++) {
        var face = new THREE.Face3(0, i, i + 1);
        geo.faces.push(face);
    }

    //var mesh = new THREE.Mesh(geo, zoneHightLightmaterial);
    var mesh = new THREE.Mesh(geo, wallMaterial);
    mesh.name = "highlight2";
    scene.add(mesh);
}

//reset previously selected zone/surface    
function dehighlight(tags) {
    var remove = new Array();
    $.each(scene.children, function(index, data) {
        if (data instanceof THREE.Mesh) {
            for (var i = 0; i < tags.length; i++) {
                if (data.name === tags[i]) {
                    remove.push(data);
                    break;
                }
            }
        }
    });
    $.each(remove, function(index, mesh) {
        scene.remove(mesh);
        mesh.geometry.dispose();
    });
}

function getMaterialDetailedInfo(name, layerId) {
    $('#changeMaterial').html("");

    if (materials === undefined) {
        showMaterialNotif = true;
        $('#changeMaterial').html("Material detailed information is still loading...");
        return;
    }

    var surObj = arrayCollection[parseInt($("#floors_surface").val())];
    var surface = surObj.li_attr.surface.trim();
    var type = surObj.li_attr.type.trim();
    var constructName = surObj.li_attr.construct.trim();

    var hasRest = false;
    var modelMaterialId = constructName + "__" + layerId;
    var info = materialSelectMap[modelMaterialId];
    if (info === undefined || info["dbMaterailId"] === undefined) {
        info = materials[name];
    } else {
        info = materialSelectSave[info["dbMaterailId"]];
        hasRest = true;
    }
    var html = "<table class='table table-striped'>";
    $.each(info, function(index, value) {
        index = index.replace(/(?=(?!(\/)))([A-Z]{1})/g, ' $2').replace(/E P/g, 'EP');
        html += "<tr><td class='col-md-6'><b>" + index + "</b></td><td class='col-md-6'>" + value + "</td></tr>";
    });

    html += "</table>";

    activeSurface = surface;
    activeName = name;
    activeType = type;
    activeLayerId = layerId;
    activeConstruct = constructName;

    $('#changeMaterial').append(html);

    if (!hasRest) {
        $('body').find('#resetMaterial').addClass('disabled');
    }
}

function geometryClick(from) {
    dehighlight();
}

function popInfo(title, text) {
    swal({
        title: title,
        html: text
    });
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }

    return "";
}

function showThisPanel(id) {
    var allTabs = $("div.TabToolBox");
    for (i = 0; i < allTabs.length; i++) {
        if (allTabs[i].classList[1] == id) {

            $("div.TabToolBox." + id).show();
            $("div.toptoggleitem." + id).addClass('selected');

        } else {

            $("div.TabToolBox." + id).hide();
            $("div.toptoggleitem." + id).removeClass('selected');
        }
    }

    console.log($("div.toolBarContainer." + id));
}
