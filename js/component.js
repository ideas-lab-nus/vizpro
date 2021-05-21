/*
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████████████─██████──────────██████─██████████████─██████████████─██████──────────██████─██████████████─██████──────────██████─██████████████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██████████████░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██████████──██░░██─██░░░░░░░░░░██─██░░██████████──██░░██─██░░░░░░░░░░██─
─██░░██████████─██░░██████░░██─██░░░░░░░░░░░░░░░░░░██─██░░██████░░██─██░░██████░░██─██░░░░░░░░░░██──██░░██─██░░██████████─██░░░░░░░░░░██──██░░██─██████░░██████─
─██░░██─────────██░░██──██░░██─██░░██████░░██████░░██─██░░██──██░░██─██░░██──██░░██─██░░██████░░██──██░░██─██░░██─────────██░░██████░░██──██░░██─────██░░██─────
─██░░██─────────██░░██──██░░██─██░░██──██░░██──██░░██─██░░██████░░██─██░░██──██░░██─██░░██──██░░██──██░░██─██░░██████████─██░░██──██░░██──██░░██─────██░░██─────
─██░░██─────────██░░██──██░░██─██░░██──██░░██──██░░██─██░░░░░░░░░░██─██░░██──██░░██─██░░██──██░░██──██░░██─██░░░░░░░░░░██─██░░██──██░░██──██░░██─────██░░██─────
─██░░██─────────██░░██──██░░██─██░░██──██████──██░░██─██░░██████████─██░░██──██░░██─██░░██──██░░██──██░░██─██░░██████████─██░░██──██░░██──██░░██─────██░░██─────
─██░░██─────────██░░██──██░░██─██░░██──────────██░░██─██░░██─────────██░░██──██░░██─██░░██──██░░██████░░██─██░░██─────────██░░██──██░░██████░░██─────██░░██─────
─██░░██████████─██░░██████░░██─██░░██──────────██░░██─██░░██─────────██░░██████░░██─██░░██──██░░░░░░░░░░██─██░░██████████─██░░██──██░░░░░░░░░░██─────██░░██─────
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██──────────██░░██─██░░██─────────██░░░░░░░░░░██─██░░██──██████████░░██─██░░░░░░░░░░██─██░░██──██████████░░██─────██░░██─────
─██████████████─██████████████─██████──────────██████─██████─────────██████████████─██████──────────██████─██████████████─██████──────────██████─────██████─────
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
*/

/**
 * Summary. (use period)
 *
 * Description. (use period)
 *
 * @link   URL
 * @file   This files defines a component object.
 * @author Mahmoud AbdelRahman
 * @since  x.x.x
 */





function CreateNewComponent(FromExisting = null, type = null, kwargs = null) {
    //local title variables; Those should be later put in the visualization properties table. 
    one_character_width = 8;
    padding = 20;
    titleMargin = 30;
    titleMarginLeft = 30;
    if (FromExisting != null) {
        var newcomp = FromExisting;
    } else {


        inputdict = {}
        thoseInputNames = {}
        thoseOutputNames = {}


        for (let i = 0; i < udo_inputs.length; i++) {
            thisINp = [];
            for (var property in udo_inputs[i]) {
                if (udo_inputs[i].hasOwnProperty(property)) {
                    thisINp.push(udo_inputs[i][property]["name"])
                }
            }
            thoseInputNames[i] = thisINp;
        }
        for (let i = 0; i < udo_outputs.length; i++) {
            thisOUt = [];
            for (var property in udo_outputs[i]) {
                if (udo_outputs[i].hasOwnProperty(property)) {
                    thisOUt.push(udo_outputs[i][property]["name"])
                }
            }
            thoseOutputNames[i] = thisOUt;
        }

        for (let i = 0; i < udo_names.length; i++) {
            inputdict[udo_names[i]] = {
                "color": udo_fill[i],
                "inputs": udo_inputs[i],
                "longestInput": thoseInputNames[i].reduce(function(a, b) {
                    return a.length > b.length ? a : b
                }, ''),
                "outputs": thoseOutputNames[i],
                "longestOutput": thoseOutputNames[i].reduce(function(a, b) {
                    return a.length > b.length ? a : b
                }, ''),
            }
        }


        ThisComponentName = type;
        let n_inputs = Object.keys(inputdict[ThisComponentName].inputs).length
        let n_outputs = Object.keys(inputdict[ThisComponentName].outputs).length



        var newcomp = addcomponent(uuidv4("C"), n_inputs, n_outputs, inputdict[ThisComponentName].inputs, inputdict[ThisComponentName].outputs);
        if (type == null) {
            ThisComponentName = $("div#addComp").attr("type");
        } else {
            ThisComponentName = type;
            newcomp.dftype = kwargs.dfType;
            newcomp.ShortName = kwargs.shortName;

            popupMessage(ThisComponentName + " Component added");
        }

        console.log()

        newcomp.fill = inputdict[ThisComponentName].color; //allColors[Math.floor(Math.random() * allColors.length)];
        newcomp.Name = ThisComponentName;
        newcomp.height = titleMargin + (Math.max(newcomp.inputs.length, newcomp.outputs.length + 1)) * padding;
        newcomp.width = (inputdict[ThisComponentName].longestInput.length + inputdict[ThisComponentName].longestOutput.length) * one_character_width + titleMarginLeft;

        // initiate the parent_children_matrix
        parent_child_matrix[newcomp.GUID] = []
    }

    var cont = allContents.append("g")
        .attr("class", "component")
        .attr("id", newcomp.GUID);

    var node = cont
        .append("g")
        .attr("class", newcomp.type + " " + newcomp.state + " " + newcomp.selection + " " + newcomp
            .view + " " + newcomp.GUID)
        .attr("id", "comp-" + newcomp.GUID)
        .attr("transform", () => {
            if (FromExisting == null) {
                if (kwargs.X != undefined && kwargs.Y != undefined) {
                    newcomp.X = kwargs.X;
                    newcomp.Y = kwargs.Y;
                } else {
                    newcomp.X = mousex + Math.random() * 500;
                    newcomp.Y = mousey + Math.random() * 500;
                }


                return "translate(" + newcomp.X + ", " + newcomp.Y + ")";
            } else {
                return "translate(" + FromExisting.X + ", " + FromExisting.Y + ")";
            }
        })

    var statusBar = node.append("g")
        .attr("transform", "translate(0," + (newcomp.height - 25) + ")")

    statusBar.append("rect")
        .attr("id", "statusRect" + newcomp.GUID)
        .attr("width", newcomp.width + 2)
        .attr("x", -1.0)
        .attr("height", 40)
        .attr("fill", IDLE_COLOR) //"#525252")// newcomp.fill)//
        .attr("stroke-width", 1)
        // .attr("stroke", "#525252")
        .attr("rx", COMPONENT_RADIUS)
        .attr("ry", COMPONENT_RADIUS)
        .attr("opacity", 0.5)

    statusBar.append("text")
        .attr("class", "statusTextClass")
        .attr("id", "statusText" + newcomp.GUID)
        .attr("fill", "black")
        .attr("x", 5)
        .attr("y", 37)
        .text("Idle ..")



    var InputGroup = node.append('g');
    for (let index = 0; index < newcomp.inputs.length; index++) {
        var inp = InputGroup.append('circle').lower()
            .attr("cx", "0")
            .attr("cy", (index * padding + titleMargin).toString())
            .attr("fill", newcomp.fill)
            .attr("r", "7")
            .attr("stroke", newcomp.fill)
            .attr("stroke-width", "2")
            .attr("id", "inputCirViual" + newcomp.GUID + "_" + index)
            .attr("class", "inputCirVisual " + newcomp.GUID + " " + index)
            .attr("type", function() {
                if (FromExisting == null) {
                    return "text";
                } else {
                    return FromExisting.inputs[index].type;
                }

            });
    }

    var InputGroup = node.append('g');
    for (let index = 0; index < newcomp.inputs.length; index++) {
        var inp = InputGroup.append('circle').lower()
            .attr("cx", "0")
            .attr("cy", (index * padding + titleMargin).toString())
            .attr("fill", newcomp.fill)
            .attr("fill-opacity", "0.3")
            .attr("r", "15")
            .attr("id", "inputCir" + newcomp.GUID + "_" + index)
            .attr("class", "inputCir " + newcomp.GUID + " " + index)
            .attr("type", function() {
                if (FromExisting == null) {
                    return "text";
                } else {
                    return FromExisting.inputs[index].type;
                }
            });
    }

    var OutputGroup = node.append('g');
    for (let index = 0; index < newcomp.outputs.length; index++) {
        var out = OutputGroup.append('circle')
            .attr("cx", newcomp.width)
            .attr("cy", (index * padding + titleMargin).toString())
            .attr("fill", newcomp.fill)
            .attr("r", "7")
            .attr("stroke", newcomp.fill)
            .attr("stroke-width", "2")
            .attr("id", "outputCirVisual" + newcomp.GUID + "_" + index)
            .attr("class", "outputCirVisual " + newcomp.GUID + " " + index)
            .attr("type", function() {
                if (FromExisting == null) {
                    return "text";
                } else {
                    return FromExisting.outputs[index].type;
                }
            }).lower();
    }


    var OutputGroup = node.append('g');
    for (let index = 0; index < newcomp.outputs.length; index++) {
        var out = OutputGroup.append('circle')
            .attr("cx", newcomp.width)
            .attr("cy", (index * padding + titleMargin).toString())
            .attr("fill", newcomp.fill)
            .attr("fill-opacity", "0.5")
            .attr("r", "12")
            .attr("id", "outputCir" + newcomp.GUID + "_" + index)
            .attr("class", "outputCir " + newcomp.GUID + " " + index)
            .attr("type", function() {
                if (FromExisting == null) {
                    return "text";
                } else {
                    return FromExisting.outputs[index].type;
                }
            })
    }

    var Dummyrect = node.append('rect')
        .attr("class", "CompBodyDummy " + newcomp.GUID)
        .attr("id", "dummyRect_" + newcomp.GUID)
        .attr("rx", COMPONENT_RADIUS + 1)
        .attr("ry", COMPONENT_RADIUS + 1)
        .attr("stroke-width", "3")
        .attr("stroke", newcomp.fill)
        .attr("width", newcomp.width)
        .attr("height", newcomp.height)
        .attr("fill", "url(#grad1ient)")
        .on("mousedown", () => {
            rectType = "component";
        })



    var cirGroup = node.append('g')
        .attr("transform", () => {
            x = newcomp.width;
            y = newcomp.height;
            return "translate(" + (x).toString() + "," + (y - 10).toString() + ")";
        });


    var Titlegroup = node.append("g")
        .attr("transform", () => {
            return "translate(0, 15)";
        });


    //Title rectangle
    Titlegroup.append("rect")
        .attr("width", newcomp.width - 2)
        .attr("height", 20)
        .attr("fill", newcomp.fill)
        .attr("x", 1.0)
        .attr("y", -14)
        .attr("rx", COMPONENT_RADIUS)
        .attr("ry", COMPONENT_RADIUS)

    Titlegroup.append("rect")
        .attr("width", newcomp.width - 2)
        .attr("height", 8)
        .attr("fill", newcomp.fill)
        .attr("x", 1.0)
        .attr("y", -2);

    node.append("rect")
        .attr("width", newcomp.width - 2)
        .attr("height", newcomp.height - 2)
        .attr("x", 1.0)
        .attr("y", 1)
        .attr("rx", COMPONENT_RADIUS)
        .attr("ry", COMPONENT_RADIUS)
        .attr("stroke", newcomp.fill)
        .attr("fill-opacity", 0.0)



    var Title = Titlegroup.append('foreignObject')
        .attr("class", "nodetitle node_title" + newcomp.GUID)
        .attr("id", "node_title" + newcomp.GUID)
        .attr("x", 0)
        .attr("y", -10)
        .attr("width", newcomp.width)
        .attr("height", "20")
        .text(newcomp.Name)

    var InputGroupText = node.append('g');

    for (let index = 0; index < newcomp.inputs.length; index++) {
        var inptext = InputGroupText.append('text')
            .attr("id", "input-" + newcomp.GUID + "_" + index)
            .attr("class", "inputTxt " + newcomp.GUID + " " + index)
            .attr("transform", "translate(" + 10 +
                " , " + (index * padding + titleMargin + 5).toString() + ")")
            .text(newcomp.inputs[index].Name)
            .attr("fill", "black")
            .attr("type", function() {
                newcomp.inputs[index].textObj = this.id;
                if (FromExisting == null) {
                    return "text";
                } else {
                    return FromExisting.inputs[index].type;
                }
            });

    }

    var OutputGroupText = node.append('g');
    for (let index = 0; index < newcomp.outputs.length; index++) {
        var outtext = OutputGroupText.append('text')
            .attr("id", "output-" + newcomp.GUID + "_" + index)
            .attr("class", "outputTxt " + newcomp.GUID + " " + index)
            .attr("transform", "translate(" + (newcomp.width - (newcomp.outputs[index].ShortName.length * 8) - 5).toString() + " , " + (index * padding + titleMargin + 5).toString() +
                ")")
            .text(newcomp.outputs[index].ShortName)
            .attr("fill", "black")
            .attr("type", function() {
                newcomp.outputs[index].circle = this;
                if (FromExisting == null) {
                    return "text";
                } else {
                    newcomp.outputs[index].type = FromExisting.outputs[index].type
                    return FromExisting.outputs[index].type;
                }

            })
            .attr("type", function() {
                newcomp.outputs[index].textObj = this.id;
                if (FromExisting == null) {
                    return "text";
                } else {
                    return FromExisting.outputs[index].type;
                }
            });
    }

    var rect = node.append('rect')
        .attr("class", "CompBody " + newcomp.GUID)
        .attr("id", newcomp.GUID)
        .attr("rx", COMPONENT_RADIUS)
        .attr("ry", COMPONENT_RADIUS)

    .attr("width", newcomp.width)
        .attr("height", newcomp.height)
        .attr("fill", newcomp.fill)
        .attr("fill-opacity", "0.01")
        .on("mouseover", function() {
            d3.select(this)
                .attr("cursor", "pointer");
        })
        .on("mouseout", function() {
            d3.select(this).attr("fill", newcomp.fill)
        })
        .on("dblclick", () => {})
        .on("mousedown", () => {
            rectType = "component";
            conosle.log(rectType);
        });


    var icon = node.append("g")
        .attr("transform", "translate(" + (newcomp.width - 20).toString() + ",1)");

    icon_foreing = icon.append("foreignObject")
        .attr("width", 18)
        .attr("height", 18)
        .attr("style", () => {
            return `background-image:url(/static/base/img/` + newcomp.Name + `.png);background-size: 15px;background-repeat: no-repeat;background-position: center;`
        })

    if (newcomp.dftype == 'dp') {

        var playrect2 = node.append('rect')
            .attr("class", "play " + newcomp.GUID)
            .attr("id", "play_" + newcomp.GUID)
            .attr("x", (newcomp.width / 2.0 - 10))
            .attr("y", newcomp.height - 10)
            .attr("height", 20)
            .attr("width", 20)
            .attr("rx", COMPONENT_RADIUS)
            .attr("ry", COMPONENT_RADIUS)
            .attr("fill", newcomp.fill)
            .attr("stroke", newcomp.fill)
            .attr("stroke-width", "6")
            .style("cursor", "pointer")
            .on("click", function() {
                console.log("start calculation")
                runDeepFunction(newcomp.GUID)

            });

        var playrect = node.append("svg")
            .attr("role", "img")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", (newcomp.width / 2.0 - 10))
            .attr("y", newcomp.height - 10)
            .attr("viewBox", "0 0 512 512")
            .append("path")
            .attr("class", "play " + newcomp.GUID)
            .attr("fill", "white")
            .attr("d", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z")
            .on("click", function() {
                console.log("start calculation")
                runDeepFunction(newcomp.GUID)
            });
    }

    if (FromExisting == null) {
        allComp.push(newcomp);
    }
    comp_input_edges[newcomp.GUID] = new Array(newcomp.inputs.length);
    comp_output_edges[newcomp.GUID] = new Array(newcomp.outputs.length);

    components_selection_data[newcomp.GUID] = { "x0": newcomp.X, "y0": newcomp.Y, "x1": newcomp.X + newcomp.width, "y1": newcomp.Y + newcomp.height };

    var mainGrid = d3.select("#mainGrid");

    handleTheClickOnAllComponents();
    handleEdgeInitialization();
    handleComponentSelection();
    handleEdgeSelection();


}


function runDeepFunction(compId) {
    runDeep = true;
    redrawDependents(compId);
    runDeep = false;
}