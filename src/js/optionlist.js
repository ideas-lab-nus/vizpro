/*
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████████████─██████████████─██████████─██████████████─██████──────────██████────██████─────────██████████─██████████████─██████████████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░░░██─██░░██████████──██░░██────██░░██─────────██░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─
─██░░██████░░██─██░░██████░░██─██████░░██████─████░░████─██░░██████░░██─██░░░░░░░░░░██──██░░██────██░░██─────────████░░████─██░░██████████─██████░░██████─
─██░░██──██░░██─██░░██──██░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██████░░██──██░░██────██░░██───────────██░░██───██░░██─────────────██░░██─────
─██░░██──██░░██─██░░██████░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██░░██████████─────██░░██─────
─██░░██──██░░██─██░░░░░░░░░░██─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██░░░░░░░░░░██─────██░░██─────
─██░░██──██░░██─██░░██████████─────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██──██░░██────██░░██───────────██░░██───██████████░░██─────██░░██─────
─██░░██──██░░██─██░░██─────────────██░░██───────██░░██───██░░██──██░░██─██░░██──██░░██████░░██────██░░██───────────██░░██───────────██░░██─────██░░██─────
─██░░██████░░██─██░░██─────────────██░░██─────████░░████─██░░██████░░██─██░░██──██░░░░░░░░░░██────██░░██████████─████░░████─██████████░░██─────██░░██─────
─██░░░░░░░░░░██─██░░██─────────────██░░██─────██░░░░░░██─██░░░░░░░░░░██─██░░██──██████████░░██────██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░░░██─────██░░██─────
─██████████████─██████─────────────██████─────██████████─██████████████─██████──────────██████────██████████████─██████████─██████████████─────██████─────
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
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



function CreateNewOptionList(FromExisting = null, optionlist_predefined_items = null) {

    if (FromExisting == null) {

        var newcomp = addcomponent(uuidv4("C"), 1, 1);
        parent_child_matrix[newcomp.GUID] = []
        newcomp.Name = "Select item";

        if (optionlist_predefined_items != null) {
            newcomp.optionListValues = JSON.parse(optionlist_predefined_items)
        }

    } else {

        var newcomp = FromExisting;
        console.log(newcomp)
    }

    newcomp.fill = "white";
    one_character_width = 8;
    padding = 20;
    titleMargin = 30;
    titleMarginLeft = 30;
    newcomp.height = 20;
    newcomp.type = "optionList";
    newcomp.dftype = "shlow";

    // TODO : get the longest text in the component. and set the width based on this. 

    newcomp.width = 200;

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
                let genX = Math.random() * 500 + 200;
                let genY = Math.random() * 500 + 200;
                newcomp.X = genX;
                newcomp.Y = genY;
                return "translate(" + genX + ", " + genY + ")";
            } else {
                return "translate(" + FromExisting.X + ", " + FromExisting.Y + ")";
            }
        })

    var InputGroup = node.append('g');
    for (let index = 0; index < newcomp.inputs.length; index++) {
        var inp = InputGroup.append('circle').lower()
            .attr("cx", "0")
            .attr("cy", newcomp.height / 2)
            .attr("fill", "gray") //newcomp.fill)
            .attr("r", "5")
            .attr("stroke", "black")
            .attr("stroke-width", "2")
            .attr("id", "inputCir" + newcomp.GUID + "_" + index)
            .attr("class", "inputCir " + newcomp.GUID + " " + index)
            .attr("type", function() {
                newcomp.inputs[index].circle = addCircle();
                newcomp.inputs[index].circle.element = this.id;
                newcomp.inputs[index].circle.CX = 0;
                newcomp.inputs[index].circle.CY = (index * padding + titleMargin);
                newcomp.inputs[index].type = "input";
                return "input";
            });
    }


    var OutputGroup = node.append('g');
    for (let index = 0; index < newcomp.outputs.length; index++) {
        var out = OutputGroup.append('circle')
            .attr("cx", newcomp.width)
            .attr("cy", newcomp.height / 2)
            .attr("fill", "gray") //newcomp.fill)
            .attr("r", "5")
            .attr("stroke", "black")
            .attr("stroke-width", "2")
            .attr("id", "outputCir" + newcomp.GUID + "_" + index)
            .attr("class", "outputCir " + newcomp.GUID + " " + index)
            .attr("type", function() {
                newcomp.outputs[index].circle = this;
                newcomp.outputs[index].type = "output";
                // //////////console.log(newcomp.outputs[index]);
                return "output";
            }).lower();
    }

    var Dummyrect = node.append('rect')
        .attr("class", "CompBodyDummy " + newcomp.GUID)
        .attr("id", "dummyRect_" + newcomp.GUID)
        .attr("rx", "3")
        .attr("ry", "3")
        .attr("filter", "url(#f2")
        .attr("stroke-width", "1")
        .attr("stroke", "black")
        .attr("width", newcomp.width)
        .attr("height", newcomp.height)
        .attr("fill", newcomp.fill)



    var cirGroup = node.append('g')
        .attr("transform", () => {
            x = newcomp.width;
            y = newcomp.height;
            return "translate(" + (x).toString() + "," + (y - 10).toString() + ")";
        });

    var log = cirGroup.append("text")
        .attr("id", "nodeLog" + newcomp.GUID)
        .attr("class", "nodeLog " + newcomp.GUID)
        .attr("transform", "translate(10, 10)")
        .text(newcomp.log.logText)
        .attr("fill", "black")
        .style("display", "none");


    var Titlegroup = node.append("g")
        .attr("transform", () => {
            return "translate(0, 15)";
        });


    var Title = Titlegroup.append("text")
        .attr("class", "nodetitle node_title" + newcomp.GUID)
        .attr("id", "option-" + newcomp.GUID)
        .text(newcomp.Name)
        .attr("fill", "black")
        .attr("transform", "translate(" + 20 + ", 0)");


    var rect = node.append('rect')
        .attr("class", "CompBody " + newcomp.GUID)
        .attr("id", newcomp.GUID)
        .attr("rx", "3")
        .attr("ry", "3")
        .attr("width", newcomp.width)
        .attr("height", newcomp.height)
        .attr("fill", newcomp.fill)
        .attr("fill-opacity", "0.01")
        // .attr("filter", "url('#svgshadow')")
        .on("mouseover", function() {
            // newcomp.rect = this;
            d3.select(this)
                // .attr("fill", "#303952")
                .attr("cursor", "pointer");
        })
        .on("mouseout", function() {
            // newcomp.rect = this;
            d3.select(this).attr("fill", newcomp.fill)
        }) //.attr("onclick", "showDropDownList('"+newcomp.GUID+"')");

    node.append("g").attr("id", "optionListOption-" + newcomp.GUID)

    if (FromExisting == null)
        allComp.push(newcomp);

    comp_input_edges[newcomp.GUID] = new Array(newcomp.inputs.length);
    comp_output_edges[newcomp.GUID] = new Array(newcomp.outputs.length);

    var mainGrid = d3.select("#mainGrid");
    components_selection_data[newcomp.GUID] = { "x0": newcomp.X, "y0": newcomp.Y, "x1": newcomp.X + newcomp.width, "y1": newcomp.Y + newcomp.height };

    handleTheClickOnAllComponents();
    handleEdgeInitialization();
    handleComponentSelection();
    HandleDoubleClick();

}

$("div#addOptionList").on('click', function(e) {
    CreateNewOptionList()
});