/*
───────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████─────────██████████─████████████───██████████████─████████████████───
─██░░░░░░░░░░██─██░░██─────────██░░░░░░██─██░░░░░░░░████─██░░░░░░░░░░██─██░░░░░░░░░░░░██───
─██░░██████████─██░░██─────────████░░████─██░░████░░░░██─██░░██████████─██░░████████░░██───
─██░░██─────────██░░██───────────██░░██───██░░██──██░░██─██░░██─────────██░░██────██░░██───
─██░░██████████─██░░██───────────██░░██───██░░██──██░░██─██░░██████████─██░░████████░░██───
─██░░░░░░░░░░██─██░░██───────────██░░██───██░░██──██░░██─██░░░░░░░░░░██─██░░░░░░░░░░░░██───
─██████████░░██─██░░██───────────██░░██───██░░██──██░░██─██░░██████████─██░░██████░░████───
─────────██░░██─██░░██───────────██░░██───██░░██──██░░██─██░░██─────────██░░██──██░░██─────
─██████████░░██─██░░██████████─████░░████─██░░████░░░░██─██░░██████████─██░░██──██░░██████─
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░██─██░░░░░░░░████─██░░░░░░░░░░██─██░░██──██░░░░░░██─
─██████████████─██████████████─██████████─████████████───██████████████─██████──██████████─
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

//TODO : save and retrieve the slider values. 
function CreateNewSlider(FromExisting = null) {

    // const SLIDER_START_POSITION = 60;
    // const SLIDER_END_POSITION = 184;

    if (FromExisting != null) {
        var newSlider = FromExisting;


    } else {
        var newSlider = addSlider(uuidv4("S"), 0, 100, 1.0);
        parent_child_matrix[newSlider.GUID] = []
        newSlider.Name = "Numeric";
        newSlider.value = 50.00;
        newSlider.anchorValue = ((184 - 60) / 2.0) + 30 //((60+184)/2.0)-30

    }

    newSlider.fill = "#bdc4c8";
    one_character_width = 8;
    padding = 20;
    titleMargin = 30;
    titleMarginLeft = 5;
    newSlider.height = 20;
    newSlider.width = 250;
    newSlider.dftype = "shlow";

    // .attr("transform", "translate(" + (60 + (newSlider.value * 100) / (184 - 60)).toString() + ", 3)")




    var cont = allContents.append("g")
        .attr("class", "slider")
        .attr("id", newSlider.GUID);

    var node = cont
        .append("g")
        .attr("class", "SliderGroup" + " " + newSlider.selection + " " + newSlider
            .view + " " + newSlider.GUID)
        .attr("id", "comp-" + newSlider.GUID)
        .attr("transform", () => {
            if (FromExisting == null) {
                let genX = Math.random() * 500 + 200;
                let genY = Math.random() * 500 + 200;
                newSlider.X = genX;
                newSlider.Y = genY;
                return "translate(" + genX + ", " + genY + ")";
            } else {
                return "translate(" + FromExisting.X + ", " + FromExisting.Y + ")";
            }
        }).on("mousedown", () => {
            rectType = "slider";
        });

    var OutputGroup = node.append('g');

    var out = OutputGroup.append('circle')
        .attr("cx", newSlider.width)
        .attr("cy", "10")
        .attr("fill", "gray") //newcomp.fill)
        .attr("r", "5")
        .attr("stroke", "black")
        .attr("stroke-width", "2")
        .attr("id", "outputCir" + newSlider.GUID)
        .attr("class", "outputCir " + newSlider.GUID + " 0");

    var rect = node.append('rect')
        .attr("class", "CompBody " + newSlider.GUID)
        .attr("id", newSlider.GUID)
        .attr("rx", "3")
        .attr("ry", "3")
        //.attr("filter", "url(#f2")
        .attr("stroke-width", "2")
        .attr("stroke", "#3a4c69")
        .attr("width", newSlider.width)
        .attr("height", newSlider.height)
        // .attr("fill", newSlider.fill)
        .attr("fill", "url(#gradientlsider)")
        // .attr("filter", "url('#svgshadow')")
        .on("mouseover", function() {
            newSlider.rect = this;
            d3.select(newSlider.rect)
                // .attr("fill", "#303952")
                .attr("cursor", "pointer");
        })
        .on("mouseout", function() {
            newSlider.rect = this;
            d3.select(newSlider.rect).attr("fill", "url(#gradientlsider)")
        })
        .on("dblclick", () => {
            ////////console.log("You dobule clicked me ");
        })
        .on("mousedown", () => {
            //////console.log('hello world');
            rectType = "slider";

        });


    var ValueTextGroup = node.append("g")
        .attr("transform", () => {
            return ("translate(-80, 0)")
        });

    var ValueTextRect = ValueTextGroup.append("rect")
        .attr("cx", "0")
        .attr("cy", "0")
        .attr("rx", "3")
        .attr("ry", "3")
        .attr("fill", "black")
        .attr("width", "80")
        .attr("height", "20")
        .attr("opacity", "0.5");

    var ValueText = ValueTextGroup.append("text")
        .attr("id", "sliderValueText_" + newSlider.GUID)
        .attr("class", "sliderValueText " + newSlider.GUID)
        .attr("transform", "translate(2, 14)")
        .attr("fill", "white")
        .text(newSlider.value.toString());

    var Titlegroup = node.append("g")
        .attr("transform", () => {
            return "translate(0, 15)";
        });

    var Title = Titlegroup.append("text")
        .attr("class", "sliderTitle slider_title" + newSlider.GUID)
        .text(newSlider.Name)
        .attr("fill", "black")
        .attr("transform", "translate(" + titleMarginLeft / 2.0 + ", 0)")

    var SlidingGroup = node.append("g")
        .attr("transform", "translate(60, 0)");

    var slidingRectContainer = SlidingGroup.append("rect")
        // .attr("fill", "#576579")
        .attr("height", "3")
        .attr("width", "185")
        .attr("rx", "2")
        .attr("ry", "2")
        .attr("transform", "translate(0, 8)")
        .attr("stroke", "#677184")

    var slidingline = SlidingGroup.append("line")
        .attr("x1", "2")
        .attr("y1", "11")
        .attr("x2", "184")
        .attr("y2", "11")
        // .attr("d", "M 0,0 L 190,0")
        .attr("stroke", "gray")
        .attr("stroke-width", "1")

    var slidingAnchor = SlidingGroup.append("rect")
        .attr("id", "SliderAnchor_" + newSlider.GUID)
        .attr("width", "10")
        .attr("height", "15")
        .attr("rx", "5")
        .attr("ry", "5")
        .attr("fill", "#3a4d69")
        .style("cursor", "pointer")
        .attr("transform", "translate(" + (newSlider.anchorValue).toString() + ", 3)")
        .on("mouseover", function() {
            d3.select(this)
                .attr("fill", "url(#gradientlsider)")
                .attr("cursor", "pointer")
                .attr("stroke", "black");
        })
        .on("mouseleave", function() {
            d3.select(this)
                .attr("fill", "#3a4d69")
                .attr("stroke", "none");
        })
        .on("mousedown", function() {
            sliderRectId = this.id;
            SliderAnchorclicked = true;
            selectedSliderComponent = newSlider;

        })
        .on("mouseup", function() {
            SliderAnchorclicked = false;
            selectedSliderComponent = null;
        });

    comp_output_edges[newSlider.GUID] = new Array(1);
    comp_input_edges[newSlider.GUID] = new Array(1);

    if (FromExisting == null)
        allComp.push(newSlider);

    theRequiredSliderGroup = undefined;


    //Moving the slider body
    var allcomp = d3.selectAll("g.SliderGroup")
        .on('mousedown', function(d, i) {
            theRequiredSliderGroup = this;
            rectType = "slider";
        });

    components_selection_data[newSlider.GUID] = { "x0": newSlider.X, "y0": newSlider.Y, "x1": newSlider.X + newSlider.width, "y1": newSlider.Y + newSlider.height };


    handleTheClickOnAllComponents();
    handleEdgeInitialization();
    handleComponentSelection();
    HandleDoubleClick();
}

$("div#addSlider").on('click', function(e) {
    CreateNewSlider();
});