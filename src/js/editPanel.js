import {selectComp, redrawDependents, drawPlotComponent} from './functions.js';
import {jsonView} from './jsonview.js';
import $ from "jquery";
var d3 = require('d3');

function submitPanelEdit(compKey) {
    var StringComp = selectComp(compKey);
    var textVal = $("textarea.textarea.stringProperties").val();
    StringComp.inputs[0].type = $("input[name='type']:checked").val();
    if (StringComp.inputs[0].type === "json") {
        $("foreignObject#textbody_" + StringComp.GUID).html('<div id="jsonTreeViewer' + StringComp.GUID +
            '"></div>')
        jsonView.format(StringComp.inputs[0].value, "div#jsonTreeViewer" + StringComp.GUID);
    } else if (StringComp.inputs[0].type === "html") {
        d3.select("foreignObject#textbody_" + compKey)
            .html(textVal)
            .attr("fill", "black");
    } else if (StringComp.inputs[0].type === "plot") {
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

function cancelPanelEdit() {
    $("div#propertiesBarContents").html(""); 
}

export {submitPanelEdit, cancelPanelEdit};