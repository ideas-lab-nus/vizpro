import {selectComp, componentStatus, updatShallowCompRender} from './functions.js';
import {parent_child_matrix, ACTIVE_COLOR, ERROR_COLOR, runDeep} from './constants.js';
import {calculateShallow} from './shallow.js';
import {calculateDeep} from './deep.js';

function redrawDependents(parent) {
    // on a parent changes, only draws all the children tree .
    // all the components --- inputs outpts object (to be sent later to the backend should be modified as well)
    // shallow values should be updated instantaniously

    let par = selectComp(parent);

    if (parent_child_matrix[parent].length > 0) {
        if (par.dftype === "shlow") {
            parent_child_matrix[parent].forEach(function(element, i) {
                //iterate through all those childs.
                let ch = selectComp(element[1]);
                if (par.type === "slider") {
                    ch.inputs[element[2]].value = par.value;
                } else if (par.type === "string" || par.type === "fileUpload") {
                    ch.inputs[element[2]].value = par.outputs[element[0]].value;
                } else if (par.type === "listView") {
                    ch.inputs[element[2]].value = par.outputs[element[0]].value;
                    console.log(ch.inputs[element[2]]);
                    ch.inputs[element[2]].type = "json";
                } else if (par.type === "toggle" || par.type === "optionList") {
                    ch.inputs[element[2]].value = par.value;
                } else if (par.type === "component") {
                    try {
                        calculateShallow(par.GUID);
                        ch.inputs[element[2]].value = par.outputs[element[0]].value;
                        ch.inputs[element[2]].type = par.outputs[element[0]].type;
                        componentStatus(par.GUID, ACTIVE_COLOR);
                    } catch (error) {
                        console.log(error);
                        componentStatus(par.GUID, ERROR_COLOR);
                    }
                }
                updatShallowCompRender(ch);
                redrawDependents(ch.GUID);

                console.log("case1 _ parent is shallow");
            });
        } else if (par.dftype === "dp" && runDeep === true) {
            par.state = "unbound";
            parent_child_matrix[parent].forEach(function(element, i) {
                //iterate through all those childs.
                var ch = selectComp(element[1]);
                if (par.type === "component") {
                    console.log(par);
                    if (par.state === "unbound") {
                        calculateDeep(par.GUID);
                        par.state = "active";
                    }

                    ch.inputs[element[2]].value = par.outputs[element[0]].value;
                    ch.inputs[element[2]].type = par.outputs[element[0]].type;
                    componentStatus(par.GUID, ACTIVE_COLOR);
                }
                updatShallowCompRender(ch);
                redrawDependents(ch.GUID);
            });
        } else {
            console.log("case4_parent is shallow component");

            if (par.type === "component" && par.dftype === "shlow") {
                try {
                    calculateShallow(parent);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
} // End of redrawDependents

export {redrawDependents};