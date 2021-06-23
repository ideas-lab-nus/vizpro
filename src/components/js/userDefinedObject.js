import {details} from './componentDetail.js';
import {shallow_functions} from './shallow.js';
/**
 * Adds a new user defined object. This function is called in componentDidMount in the main Canvas
 * @param {String} name the component's name
 * @param {String} shname the component's short name
 * @param {String} desc the component's description
 * @param {String} type the component's type (must be Component/OptionList/String)
 * @param {String} dftype the component's depth type (must be shlow or dp)
 * @param {String} category the component's category (must be either Basic/BuildSimHub/OsiSoft/Pandas/String Operations)
 * @param {List} inputList the component's input list. It is a list of dictionary. "name" attribute is compulsory, 
 * other attribute such as short name, description, input type and default value are optional
 * @param {List} outputList the component's output list. It is a list of dictionary. "name" attribute is compulsory, 
 * other attribute such as short name and description are optional
 * @param {String} color the component's color in hex code. The default color is #F23322 (orange)
 * @param {*} backgroundImage the component's icon in the left property bar. This field is optional.
 * @param {*} calledFunc the corresponding function for that component
 */
var typeList = ['component', 'optionList', 'string'];
var dftypeList = ['shlow', 'dp'];
var categoryList = ['Basic', 'BuildSimHub', 'OsiSoft', 'Pandas', 'String Operations'];
function addNewUdo(name, shname, desc, type, dftype, category, inputList, outputList, color = "#F23322", backgroundImage = "", calledFunc = null) {
    //check requirements
    if (typeList.includes(type) && dftypeList.includes(dftype) && categoryList.includes(category)) {
        let nameCheck = true;
        for (let index = 0; index < inputList.length; index++) {
            const element = inputList[index];
            if (element.name === undefined) {
                nameCheck = false;
                break;
            }
        }
        for (let index = 0; index < outputList.length; index++) {
            const element = outputList[index];
            if (element.name === undefined) {
                nameCheck = false;
                break;
            }
        }
        if (nameCheck) {
            let newComp = {
                name: name,
                shname: shname,
                desc: desc,
                type: type,
                dftype: dftype,
                category: category,
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
        } else {
            console.log('All elements in input and output list must have "name" attribute');
        }
    } else {
        console.log("Check the type/dftype/category again");
    }
}

export {addNewUdo};