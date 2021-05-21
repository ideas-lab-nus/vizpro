
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


function CreateNewOntologyComponent(FromExisting = null, newobj = new MonitoredVariable(), kwargs = {"someThing":null}) {
     //local title variables; Those should be later put in the visualization properties table. 
        one_character_width = 8;
        padding = 20;
        titleMargin = 30;
        titleMarginLeft = 30;
    if (FromExisting!= null) {
        var newcomp = FromExisting;
    }
    else {
        var newcomp = newobj;

        ThisComponentName = newcomp.type;
        newcomp.dftype = "shlow";
        newcomp.ShortName = newcomp.name;

        popupMessage(ThisComponentName + " Component added");


        newcomp.fill = "#0B2240"
        newcomp.Name = ThisComponentName;
        console.log(newcomp.inputs)
        console.log(newcomp.__proto__.constructor.name);
        newcomp.height = titleMargin + (Math.max(newcomp.inputs.length, newcomp.outputs.length + 1)) *padding;
        newcomp.width = 300;

        // initiate the parent_children_matrix
        parent_child_matrix[newcomp.GUID] =[]
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
                if (kwargs.X != undefined && kwargs.Y != undefined){
                    newcomp.X = kwargs.X;
                    newcomp.Y = kwargs.Y;
                } else{
                    newcomp.X = mousex + Math.random() * 500 ;
                    newcomp.Y = mousey + Math.random() * 500 ;
                }
                return "translate(" + newcomp.X  + ", " + newcomp.Y  + ")";
            }
            else
            {
                return "translate(" + FromExisting.X + ", " + FromExisting.Y + ")";
            }
        })

        var statusBar = node.append("g")
        .attr("transform", "translate(0,"+(newcomp.height-25)+")")
        
        statusBar.append("rect")
        .attr("id", "statusRect"+newcomp.GUID)
        .attr("width", (newcomp.width/2)+3)
        .attr("x", -1.0)
        .attr("height", 40)
        .attr("fill",IDLE_COLOR)//"#525252")// newcomp.fill)//
        .attr("stroke-width", 1)
        .attr("stroke", "#525252")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("opacity", 0.8)

        statusBar.append("text")
        .attr("class", "statusTextClass")
        .attr("id", "statusText"+newcomp.GUID)
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
            .attr("type", function () {
                return "input";
            });
    }

        var InputGroup = node.append('g');
    for (let index = 0; index < newcomp.inputs.length; index++) {
        var inp = InputGroup.append('circle').lower()
            .attr("cx", "0")
            .attr("cy", (index * padding + titleMargin).toString())
            .attr("fill", newcomp.fill)
            .attr("fill-opacity", "0.0")
            .attr("r", "20")
            .attr("id", "inputCir" + newcomp.GUID + "_" + index)
            .attr("class", "inputCir " + newcomp.GUID + " " + index)
            .attr("type", function () {
                return "input";
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
            .attr("type", function () {
                return "output";
            }).lower();
    }


    var OutputGroup = node.append('g');
    for (let index = 0; index < newcomp.outputs.length; index++) {
        var out = OutputGroup.append('circle')
            .attr("cx", newcomp.width)
            .attr("cy", (index * padding + titleMargin).toString())
            .attr("fill", newcomp.fill)
            .attr("fill-opacity", "0.0")
            .attr("r", "20")
            .attr("id", "outputCir" + newcomp.GUID + "_" + index)
            .attr("class", "outputCir " + newcomp.GUID + " " + index)
            .attr("type", function () {
                return "output";
            })
    }

    var Dummyrect = node.append('rect')
        .attr("class", "CompBodyDummy " + newcomp.GUID)
        .attr("id", "dummyRect_"+newcomp.GUID)
        .attr("rx", "3")
        .attr("ry", "3")
        //.attr("filter", "url(#f2)")
        .attr("stroke-width", "3")
        .attr("stroke", newcomp.fill)
        .attr("width",newcomp.width)
        .attr("height", newcomp.height)
        .attr("fill", "url(#grad1ient)")
        .on("mousedown",()=>
        {
            rectType = "component";                    
        })
    
    // Lower shadow rectangle
    node.append("rect")
    .attr("width", newcomp.width)
    .attr("height", 7)
    .attr("x", 1.5)
    .attr("y", newcomp.height-8.5)
    .attr("rx", 1.5)
    .attr("ry", 1.5)
    .attr("fill", "url(#gradient3)")
    .attr("fill-opacity", 0.5)

   

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

    Titlegroup.append("rect")
    .attr("width", newcomp.width-2)
    .attr("height", 20)
    .attr("fill", newcomp.fill)
    .attr("x", 1.0)
    .attr("y", -14)
    .attr("rx", 2)
    .attr("ry", 2)


    node.append("rect")
    .attr("width", newcomp.width-3)
    .attr("height", 10)
    .attr("x", 1.5)
    .attr("y", 0)
    .attr("rx", 2)
    .attr("ry", 2)
    .attr("fill", "url(#gradient2)")
    .attr("fill-opacity", 0.4)





    var Title = Titlegroup.append("text")
        .attr("class", "nodetitle node_title" + newcomp.GUID)
        .text(newcomp.Name)
        .attr("fill", "white")
        .attr("transform", "translate(10, 0)" );
         // Upper shadow rectangle
    
        var InputGroupText = node.append('g');

        for (let index = 0; index < newcomp.inputs.length; index++) {
            var inptext = InputGroupText.append('text')
                .attr("id", "input-" + newcomp.GUID + "_" + index)
                .attr("class", "inputTxt " + newcomp.GUID + " " + index)
                .attr("transform", "translate(" + 10 +
                    " , " + (index * padding + titleMargin + 5).toString() + ")")
                .text(newcomp.inputs[index])
                .attr("fill", "black")
                .attr("type", function () {
                    newcomp.inputs[index].textObj = this.id;
                    return "input";
                });

            }
                    
    var OutputGroupText = node.append('g');
    for (let index = 0; index < newcomp.outputs.length; index++) {
        var outtext = OutputGroupText.append('text')
            .attr("id", "output-" + newcomp.GUID + "_" + index)
            .attr("class", "outputTxt " + newcomp.GUID + " " + index)
            .attr("transform", "translate(" + (newcomp.width - (newcomp.outputs[index].length * 8)).toString() + " , " + (index * padding + titleMargin + 5).toString() +
                ")")
            .text(newcomp.outputs[index])
            .attr("fill", "black")
            .attr("type", function () {
                newcomp.outputs[index].circle = this;
                newcomp.outputs[index].type = "output";

                return "output";
            })
            .attr("type", function () {
                newcomp.outputs[index].textObj = this.id;
                return "output";
            });
    }

    var rect = node.append('rect')
        .attr("class", "CompBody " + newcomp.GUID)
        .attr("id", newcomp.GUID)
        .attr("rx", "3")
        .attr("ry", "3")

        .attr("width", newcomp.width)
        .attr("height", newcomp.height)
        .attr("fill", newcomp.fill)
        .attr("fill-opacity", "0.01")
        .on("mouseover", function () {
            d3.select(this)
                .attr("cursor", "pointer");
        })
        .on("mouseout", function () {
            d3.select(this).attr("fill", newcomp.fill)
        })
        .on("dblclick", () => {
        })
        .on("mousedown",()=>
        {
            rectType = "component";
            conosle.log(rectType);
        });

    console.log(newcomp);
    if (newcomp.dftype == 'dp') {

        var playrect2 = node.append('rect')
        .attr("class", "play " + newcomp.GUID)
        .attr("id", "play_"+newcomp.GUID)
        .attr("x", (newcomp.width/2.0-10))
        .attr("y", newcomp.height-10)
        .attr("height", 20)
        .attr("width", 20)
        .attr("rx", "10")
        .attr("ry", "10")
        .attr("fill", newcomp.fill)
        .attr("stroke", newcomp.fill)
        .attr("stroke-width", "10")
        .style("cursor", "pointer")
        .on("click", function()
        {
            console.log("start calculation")
            runDeepFunction(newcomp.GUID)

        });
        var playrect = node.append("svg")
        .attr("role","img")
        .attr("xmlns","http://www.w3.org/2000/svg")
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", (newcomp.width/2.0-10))
        .attr("y", newcomp.height-10)
        .attr("viewBox", "0 0 512 512")
        .append("path")
        .attr("class", "play " + newcomp.GUID)
        .attr("fill", "white")
        .attr("d", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z")
        .on("click", function()
        {
            console.log("start calculation")
            runDeepFunction(newcomp.GUID)
        });
    }

    var icon = node.append("g")
    .attr("transform", "translate("+(newcomp.width-25).toString()+",0)");
    
    icon_foreing = icon.append("foreignObject")
    .attr("width", 24)
    .attr("height", 24)
    .attr("style", ()=>{
        return `background-image:url(/static/base/img/variable.png);background-size: 22px;background-repeat: no-repeat;`
    })

    if (FromExisting == null) {
        allComp.push(newcomp);
    }

    comp_input_edges[newcomp.GUID] = new Array(newcomp.inputs.length);
    comp_output_edges[newcomp.GUID] = new Array(newcomp.outputs.length);
    components_selection_data[newcomp.GUID] = {"x0": newcomp.X, "y0": newcomp.Y, "x1": newcomp.X+newcomp.width, "y1": newcomp.Y + newcomp.height};

    var mainGrid = d3.select("#mainGrid");
        handleTheClickOnAllComponents();
        handleEdgeInitialization();
        handleComponentSelection();
        handleEdgeSelection();
}
