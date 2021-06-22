import $ from 'jquery';
import { CreateNewComponent } from './component.js';
import { details, tabIdMapping, toggleButtonInfo } from './componentDetail.js';
import { CreateNewOptionList } from './optionlist.js';

function addGenericComponentIcon() {
    for (let index = 0; index < details.length; index++) {
        const currInfo = details[index];
        var outputNameList = extractOutputName(currInfo.outputList);
        var newComp = addNewComponentIcon(
            this,
            'addComp',
            currInfo.name,
            currInfo.shname,
            currInfo.desc,
            currInfo.type,
            currInfo.dftype,
            'mainButtonItem 1 1',
            currInfo.backgroundImage,
            currInfo.inputList,
            outputNameList,
            currInfo.color
        );
        $(tabIdMapping[currInfo.category]).append(newComp);
    }
}

function addNewComponentIcon(
    reactContext,
    id,
    name,
    shname,
    desc,
    type,
    dftype,
    className,
    imageUrl,
    inputList,
    outputList,
    color
) {
    var newCompString =
        '<div id="' +
        id +
        '" name="' +
        name +
        '" shname="' +
        shname +
        '" desc="' +
        desc +
        '" type="' +
        type +
        '" dftype="' +
        dftype +
        '" class="' +
        className +
        '" style="background-image:url(' +
        imageUrl +
        ')">' +
        (imageUrl === '' ? name : ' &nbsp; ' + '<span id="hint">' + name + '</span>') +
        '</div>';
    var newComp = $(newCompString);
    newComp.on('click', () => {
        if (type === 'component') {
            let kwargs = { shortName: shname, dfType: dftype };
            CreateNewComponent(reactContext, null, name, kwargs, inputList, outputList, color);
        } else if (type === 'optionList') {
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

function addRightToggleButton() {
    var parentDiv = $('div.toolbarRightToggleNavigator.1');
    for (let index = 0; index < toggleButtonInfo.length; index++) {
        const currBtn = toggleButtonInfo[index];
        let newToggleString =
            '<div class="rightToggleButton 1" style="background-image:url(' +
            currBtn.backgroundImage +
            '"><span id="hint">' +
            currBtn.name +
            '</span></div>';
        let newToggle = $(newToggleString);
        newToggle.on('click', () => {
            setCurrentCategory('componentTab', currBtn.id, currBtn.name);
        });
        parentDiv.append(newToggle);
    }
}

function setCurrentCategory(panel_id, id, name) {
    var toolbarbuttonsContainer = $('div.toolbarbuttonsContainer.' + panel_id);
    for (var i = 0; i < toolbarbuttonsContainer.length; i++) {
        if (toolbarbuttonsContainer[i].classList[2] === id) {
            $('div.toolbarbuttonsContainer.' + panel_id + '.' + id).show();
            $('span.currentTab.' + panel_id).text(name);
        } else {
            $(
                'div.toolbarbuttonsContainer.' +
                    panel_id +
                    '.' +
                    toolbarbuttonsContainer[i].classList[2]
            ).hide();
        }
    }
}

export { addGenericComponentIcon, addRightToggleButton };
