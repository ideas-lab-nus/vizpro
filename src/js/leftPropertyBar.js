import $ from 'jquery';
import {CreateNewComponent} from './component.js';

function addGenericComponentIcon() {
    console.log('added');
    var r = addNewComponentIcon(this, "addComp", "Average", "AVG", "The average between two values", "component", "shlow", "mainButtonItem 1 1", 
            "https://storage.googleapis.com/ghostbucket111/icons/958f17e5cfad4cdbbe26dd5affbbbfa2.png", "hint", 
            [{"name": "InputList", "shortName": "in_01", "desc": "first input", "default_value": "1.0"}], ["average", "log_"], "#F23322");
    $("div.toolbarbuttonsContainer.b066a5eb-26dc-4359-8d22-3643444d08e4.d2312a8b-63dc-4112-8a66-76996c150b0e").append(r);
}

function addNewComponentIcon(reactContext, id, name, shname, desc, type, dftype, className, imageUrl, spanId, inputList, outputList, color) {
    var newCompString = '<div id="' + id + '" name="' + name + '" shname="' + shname + '" desc="' + desc + '" type="' + type 
                + '" dftype="' + dftype + '" class="' + className + '" style="background-image:url(' + imageUrl + ')">&nbsp;<span id="' 
                + spanId + '">' + name + '</span></div>';
    console.log(newCompString);
    var newComp = $(newCompString);
    newComp.on("click", () => {
        console.log(reactContext);
        console.log(name + ' clicked');
        let kwargs = {"shortName": shname, "dfType": dftype};
        CreateNewComponent(reactContext, null, name, kwargs, inputList, outputList, color);
    });
    return newComp;
}

export {addGenericComponentIcon};