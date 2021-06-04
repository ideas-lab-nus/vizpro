//var compKey = "{{ comp_key }}";
import $ from "jquery";
var d3 = require('d3');
function submitOptionListEdit(compKey){
    var optionListComp = selectComp(compKey);
    var readyToGo = false;
    var OptionListValues = optionListComp["optionListValues"];
    // //console.log(OptionListValues)
    $("textarea.textarea.optionlistProperties").text(function () {
        optionListOptionsfromTextarea = ""
        forTheHTMLpreview = ""
        for (const option in optionListComp["optionListValues"]) {
            if (optionListComp["optionListValues"].hasOwnProperty(option)) {
                optionListOptionsfromTextarea += '<option value="' + optionListComp["optionListValues"][
                    option
                ] + '">' + option + '</option>';
                forTheHTMLpreview += option + "-->" + optionListComp["optionListValues"][option] + "<br>";
            }
        }
        $("div#propertiesBarLog").html('<div id="success">Success:<br>' + forTheHTMLpreview + '</div>')
        $("select#propertisBarSelecId").html(optionListOptionsfromTextarea);
        readyToGo = true;

        return JSON.stringify(optionListComp["optionListValues"]);
    });

    $("textarea.textarea.optionlistProperties").on("focusout", function (e) {
        try {
            let thedict = JSON.parse($(this).val());
            OptionListValues = thedict;
            $("select#propertisBarSelecId").html(function () {
                optionListOptionsfromTextarea = ""
                forTheHTMLpreview = ""
                for (const option in thedict) {
                    if (thedict.hasOwnProperty(option)) {
                        optionListOptionsfromTextarea += '<option value="' + thedict[option] + '">' +
                            option + '</option>';
                        forTheHTMLpreview += option + "-->" + thedict[option] + "<br>";
                    }
                }
                $("div#propertiesBarLog").html('<div id="success">Success:<br>' + forTheHTMLpreview +
                    '</div>')
                readyToGo = true;
                return optionListOptionsfromTextarea;
            });
        } catch {
            $("div#propertiesBarLog").html(
                '<div id="error">Error: check Dictionary syntax,<br>example : {"key1":value1, "key2":value2}</div>'
            )
            readyToGo = false;
        }

    });
}

function readyToGoSubmit() {
    optionListComp["optionListValues"] = OptionListValues;
    $("div#propertiesBarContents").html("");
    addOptionDropdownList(compKey)
    readyToGo = false;
}