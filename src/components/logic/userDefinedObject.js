import { details } from './componentDetail.js';
import { shallow_functions } from './shallow.js';
/**
 * Adds a new user defined object. This function is called in componentDidMount in the main Canvas
 * @param {String} name the component's name
 * @param {String} shname the component's short name
 * @param {String} desc the component's description
 * @param {String} type the component's type (must be Component/OptionList/String)
 * @param {String} dftype the component's depth type (must be shlow or dp)
 * @param {String} category the component's category (must be either Basic/BuildSimHub/String Operations)
 * @param {List} inputList the component's input list. It is a list of dictionary. "name" attribute is compulsory, 
 * other attributes such as short name, description, input type and default value are optional
 * @param {List} outputList the component's output list. It is a list of dictionary. "name" attribute is compulsory, 
 * other attributes such as short name and description are optional
 * @param {String} color the component's color in hex code. The default color is #F23322 (orange)
 * @param {String} backgroundImage the URL of the component's icon in the left property bar. This field is optional.
 * @param {Function} calledFunc the corresponding function for that component.
 */
var typeList = ['component', 'optionList', 'string', 'deep'];
var dftypeList = ['shlow', 'dp'];
var categoryList = ['Basic', 'User Definitions', 'String Operations'];

function addNewUdo(name, shname, desc, type, dftype, category, inputList, outputList, color = "#F23322", backgroundImage = "", calledFunc = undefined, url) {
    //check requirements
    if (!typeList.includes(type)) {
        throw new Error('Pass a valid type');
    }
    if (!dftypeList.includes(dftype)) {
        throw new Error('Pass a valid dftype');
    }
    if (!categoryList.includes(category)) {
        throw new Error('Pass a valid category');
    }

    var undefInputs = inputList.filter(elem => elem.name === undefined);
    var undefOutputs = outputList.filter(elem => elem.name === undefined);
    
    if (undefInputs.length + undefOutputs.length !== 0) {
        throw new Error('Each input/output must have a "name" attribute');
    }

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
        backgroundImage: backgroundImage,
        url: url
    };

    details.push(newComp);

    if (dftype === 'shlow') {
        if (calledFunc !== undefined) {
            shallow_functions[name] = calledFunc;
        } else {
            throw new Error('Shallow functions require a function reference');
        }
    } else { //Already dftype is verified to be one of two
        if (url !== undefined) {
            
        } else {
            throw new Error('Deep functions require a url');
        }
    }
}

/**
 * Take a list of components that are passed by props and append all of them to the database
 * @param {List} list a list of dictionary, containing the information about the components
 */
function addAllUdo(list) {
    if (list !== undefined) {
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            let name = element.name.toString();
            let shname = element.shname === undefined ? '' : element.shname.toString();
            let desc = element.desc === undefined ? '' : element.desc.toString();
            let type = element.type;
            let dftype = element.dftype;
            let category = "User Definitions";
            let inputList = element.inputList;
            let outputList = element.outputList;
            let color = element.color === undefined ? '#F23322' : element.color.toString();
            let backgroundImage = element.backgroundImage === undefined ? '' : element.backgroundImage.toString();
            let calledFunc = element.func;
            let url = element.url;
            try {
                addNewUdo(name, shname, desc, type, dftype, category, inputList, outputList, color, backgroundImage, calledFunc, url);
            } catch (e) {
                console.error(e.message);
                alert(e.message)
            }
        }
    }
}
export { addAllUdo };
