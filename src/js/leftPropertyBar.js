import $ from 'jquery';
import {CreateNewComponent} from './component.js';
import {details, tabIdMapping} from './componentDetail.js';
import { CreateNewOptionList } from './optionlist.js';

function addGenericComponentIcon() {
    console.log('added');
    for (let index = 0; index < details.length; index++) {
        const currInfo = details[index];
        var outputNameList = extractOutputName(currInfo.outputList);
        var newComp = addNewComponentIcon(this, "addComp", currInfo.name, currInfo.shname, currInfo.desc, currInfo.type,
                    currInfo.dftype, "mainButtonItem 1 1", currInfo.backgroundImage, currInfo.inputList, outputNameList, currInfo.color)
        $(tabIdMapping[currInfo.category]).append(newComp);
    }
}

function addNewComponentIcon(reactContext, id, name, shname, desc, type, dftype, className, imageUrl, inputList, outputList, color) {
    var newCompString = '<div id="' + id + '" name="' + name + '" shname="' + shname + '" desc="' + desc + '" type="' + type
                + '" dftype="' + dftype + '" class="' + className + '" style="background-image:url(' + imageUrl + ')">' 
                + (imageUrl === "" ? name : (' &nbsp; ' + '<span id="hint">' + name + '</span>' ))
                + '</div>';
    var newComp = $(newCompString);
    newComp.on("click", () => {
        console.log(name + ' clicked');
        if (type === "component") {
            let kwargs = {"shortName": shname, "dfType": dftype};
            CreateNewComponent(reactContext, null, name, kwargs, inputList, outputList, color);
        } else if (type === "optionList") {
            CreateNewOptionList(reactContext, null, desc);
        }
    });
    return newComp;
}

function extractOutputName(array) {
    let output = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        output.push(element.name);
    }
    return output;
}

export {addGenericComponentIcon};