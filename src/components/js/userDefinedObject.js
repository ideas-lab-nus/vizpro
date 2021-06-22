import {details} from './componentDetail.js';
import {shallow_functions} from './shallow.js';
function addNewUdo(name, shname, desc, type, dftype, category, subcategory, inputList, outputList, color, backgroundImage, calledFunc = null) {
    let newComp = {
        name: name,
        shname: shname,
        desc: desc,
        type: type,
        dftype: dftype,
        category: category,
        subcategory: subcategory,
        inputList: inputList,
        outputList: outputList,
        color: color,
        backgroundImage: backgroundImage
    };
    details.push(newComp);
    if (dftype === 'shlow') {
        shallow_functions[name] = calledFunc;
    } else if (dftype === 'dp') {
        //to be handle later
    }
}

export {addNewUdo};