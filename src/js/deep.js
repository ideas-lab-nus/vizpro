/*
─────────────────────────────────────────────────────────────
─████████████───██████████████─██████████████─██████████████─
─██░░░░░░░░████─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─
─██░░████░░░░██─██░░██████████─██░░██████████─██░░██████░░██─
─██░░██──██░░██─██░░██─────────██░░██─────────██░░██──██░░██─
─██░░██──██░░██─██░░██████████─██░░██████████─██░░██████░░██─
─██░░██──██░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─
─██░░██──██░░██─██░░██████████─██░░██████████─██░░██████████─
─██░░██──██░░██─██░░██─────────██░░██─────────██░░██─────────
─██░░████░░░░██─██░░██████████─██░░██████████─██░░██─────────
─██░░░░░░░░████─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██─────────
─████████████───██████████████─██████████████─██████─────────
─────────────────────────────────────────────────────────────
*/
/**
 * Summary. (use period)
 *
 * This file is used prepare data from component to be sent to the backend for deep computation. 
 *
 * @link   URL
 * @file   This files defines the MyClass class.
 * @author Author Name 
 * @since  x.x.x
 */





/**
 * This is the core function that runs all the calculations and return the outputs to the components. 
 * @param    {string} compId The component GUID.
 */
function calculateDeep(compId) {
    var functionName;
    var args;
    var thisComp;
    var result;
    d3.select("div#PleaseWaitOverLay").style("display", "block");
    thisComp = selectComp(compId);
    inputGroup = [];
    currentDeepComp = thisComp;
    thisComp.inputs.forEach(input => {
        inputGroup.push(input.value);
    });

    functionName = thisComp.Name;
    args = inputGroup;



    const req = $.ajax({
        "type": "POST",
        "dataType": "json",
        "async": false,
        "url": gotoTheMoon,
        "data": {
            "functionName": functionName,
            "params": JSON.stringify(args)
        },
        "beforeSend": function(xhr, settings) {

            $.ajaxSettings.beforeSend(xhr, settings);
        },

    });

    try {
        // console.log(req.responseText)
        result = JSON.parse(req.responseText);
        thisComp.outputs.forEach(function(output, i) {
            output.type = result["type"][i];
            output.value = result["value"][i];

            console.log(result)
        });


        d3.select("div#PleaseWaitOverLay").style("display", "none");


    } catch (error) {
        console.log(error)
        d3.select("div#PleaseWaitOverLay").style("display", "none");
    }
}