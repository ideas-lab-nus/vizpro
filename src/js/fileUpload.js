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


function CreateNewFileUpload(FromExisting = null, kwargs = null)

{
    if (FromExisting == null) {
        var newcomp = addcomponent(uuidv4("C"), 0, 1);
        parent_child_matrix[newcomp.GUID] = []
    } else {
        var newcomp = FromExisting;
    }
    newcomp.fill = "url(#fileUploadGradient)";
    newcomp.Name = "False";
    one_character_width = 8;
    padding = 20;
    titleMargin = 30;
    titleMarginLeft = 30;
    newcomp.height = 25;
    newcomp.type = "fileUpload";
    newcomp.dftype = "shlow";

    // TODO : get the longest text in the component. and set the width based on this. 
    newcomp.width = 300; //newcomp.Name.length * one_character_width + titleMarginLeft;

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
                // if (kwargs.X != undefined && kwargs.Y != undefined && kwargs != null){
                //     newcomp.X = kwargs.X;
                //     newcomp.Y = kwargs.Y;
                // } else{
                newcomp.X = mousex + Math.random() * 500;
                newcomp.Y = mousey + Math.random() * 500;
                // }


                return "translate(" + newcomp.X + ", " + newcomp.Y + ")";
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



    var rectstatus = node.append('rect')
        .attr("class", "CompBody statusRect " + newcomp.GUID)
        .attr("id", "statusRect" + newcomp.GUID)
        .attr("rx", "3")
        .attr("ry", "3")
        .attr("x", "50")
        .attr("y", newcomp.height - 5)
        .attr("width", newcomp.width - 50)
        .attr("height", 20)
        .attr("fill", "#242424")
        .attr("fill-opacity", "1.0")

    var fileUploadststus = node.append('foreignObject')
        .attr("id", "fileUpload_status_" + newcomp.GUID)
        .attr("class", "fileUpload_status " + newcomp.GUID)
        .html(() => {
            if (newcomp.outputs[0].value == null || newcomp.outputs[0].value == undefined) {
                return "File Size : None"
            } else {
                return "File Size : " + (newcomp.outputs[0].Description.size / (1024 * 1024)).toString() + " MB " + "<a class='open_uploadedFile_link' href='" + newcomp.outputs[0].Description.url + "' target='blank'>open</a>"
            }
        })
        .attr("x", "55")
        .attr("y", newcomp.height + 2)
        .attr("width", newcomp.width - 50)
        .attr("height", 15)
        .attr("fill", "white");



    var Dummyrect = node.append('rect')
        .attr("class", "CompBodyDummy " + newcomp.GUID)
        .attr("id", "dummyRect_" + newcomp.GUID)
        .attr("rx", "3")
        .attr("ry", "3")
        //.attr("filter", "url(#f2")
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

    node.append("rect")
        .attr("width", newcomp.width - 2)
        .attr("height", 10)
        .attr("x", 1.0)
        .attr("y", 1)
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("fill", "url(#gradient2)")
        .attr("fill-opacity", 0.4)


    var uploadButtong = node.append("foreignObject")
        .attr("id", "foreignObject_fileUpload" + newcomp.GUID)
        .attr("class", "foreignObject_fileUpload")
        .attr("width", newcomp.width)
        .attr("height", newcomp.height)
        .html(() => {
            if (newcomp.outputs[0].value == null || newcomp.outputs[0].value == undefined) {
                return `
            <form method="post" enctype="multipart/form-data" id="form_` + newcomp.GUID + `">
            <input id="fileUploadFormToTheCloud" class="` + newcomp.GUID + `" type="file" name="myFile">
            </form>

            `
            } else {
                return `
                <div id="TheContainedFile">` + newcomp.outputs[0].Description.Name + `</div>
                <div id="TheContainedFile">Size :` + (newcomp.outputs[0].Description.size / (1024 * 1024)).toFixed(4).toString() + ` MB</div>
            `
            }
        })



    var rect = node.append('rect')
        .attr("class", "CompBody " + newcomp.GUID)
        .attr("id", newcomp.GUID)
        .attr("rx", "3")
        .attr("ry", "3")
        .attr("x", 90)
        .attr("width", newcomp.width - 90)
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


    newcomp.value = newcomp.Name;

    if (FromExisting == null)
        allComp.push(newcomp);

    comp_input_edges[newcomp.GUID] = new Array(newcomp.inputs.length);
    comp_output_edges[newcomp.GUID] = new Array(newcomp.outputs.length);

    components_selection_data[newcomp.GUID] = { "x0": newcomp.X, "y0": newcomp.Y, "x1": newcomp.X + newcomp.width, "y1": newcomp.Y + newcomp.height };

    handleTheClickOnAllComponents();
    handleEdgeInitialization();
    handleComponentSelection();
    HandleDoubleClick();
}

$("div#addFile").on('click', function(e) {

    CreateNewFileUpload();
});