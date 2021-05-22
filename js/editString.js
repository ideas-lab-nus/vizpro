compKey = GetURLParameter('compKey');
var StringComp = selectComp(compKey);
$("input#string_radio_"+StringComp.inputs[0].type).prop("checked", true);
console.log(StringComp.inputs[0].type)        
var newName;
$("input.stringPnanel.Name").on("change keyup paste", function () {
    newName = $("input.stringPnanel.Name").val();
    d3.select("text#nodeTitle" + StringComp.GUID).text(newName)
    // StringComp.Name = newName;
    d3.select("rect#" + StringComp.GUID).attr("width", 10 + newName.length * 6)
});


if (StringComp.child) {
    $("textarea.textarea.stringProperties").prop('disabled', true);
    $("textarea.stringProperties").text(() => {
        return StringComp.inputs[0].value;
    });
    $("body").on("mousemove", () => {
        $("textarea.stringProperties").text(() => {
            return StringComp.inputs[0].value;
        });
    });
} else {
    $("textarea.stringProperties").text(() => {
        return StringComp.inputs[0].value;
    });
}

$("input.stringPnanel.Name").val(StringComp.Name);

$("button#stringEditButton").on("click", function() { submitStringEdit(compKey); });

function submitStringEdit(compKey) {
    var StringComp = selectComp(compKey);
    var textVal = $("textarea.textarea.stringProperties").val();
    StringComp.inputs[0].type = $("input[name='type']:checked").val();
    if (StringComp.inputs[0].type == "json") {
        $("foreignObject#textbody_" + StringComp.GUID).html('<div id="jsonTreeViewer' + StringComp.GUID +
            '"></div>')
        jsonView.format(StringComp.inputs[0].value, "div#jsonTreeViewer" + StringComp.GUID);
    } else if (StringComp.inputs[0].type == "html") {
        d3.select("foreignObject#textbody_" + compKey)
            .html(textVal)
            .attr("fill", "black");
    } else if (StringComp.inputs[0].type == "plot") {
        var data = JSON.parse(textVal);
        drawPlotComponent(data, StringComp);
    } else {
        d3.select("foreignObject#textbody_" + compKey)
            .text(textVal)
            .attr("fill", "black");
    }

    StringComp.outputs[0].value = textVal;
    StringComp.inputs[0].value = textVal;
    StringComp.value = textVal;
    StringComp.Name = $("input.stringPnanel.Name").val();

    redrawDependents(compKey);

    $("div#propertiesBarContents").html("");
}