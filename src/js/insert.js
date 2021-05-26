import $ from "jquery";

function showThisPanel(panel_id, id) {
    var allTabs = $("div.TabToolBox." + panel_id);
    for (var i = 0; i < allTabs.length; i++) {
        if (allTabs[i].classList[1] === panel_id & allTabs[i].classList[2] === id) {
            $("div.TabToolBox." + panel_id + "." + id).show();
            $("div.toptoggleitem." + panel_id + "." + id).addClass('selected');
        } else {
            $("div.TabToolBox." + panel_id + "." + allTabs[i].classList[2]).hide();
            $("div.toptoggleitem." + panel_id + "." + allTabs[i].classList[2]).removeClass('selected');
        }
    }
}

function setCurrentCagegory(panel_id, id, name) {
    var toolbarbuttonsContainer = $("div.toolbarbuttonsContainer." + panel_id);
    for (var i = 0; i < toolbarbuttonsContainer.length; i++) {
        if (toolbarbuttonsContainer[i].classList[2] === id) {
            $("div.toolbarbuttonsContainer." + panel_id + "." + id).show();
            $("span.currentTab." + panel_id).text(name) // <span class="currentTab {{panel.panel_guid}}">&nbsp;</span>
        } else {
            $("div.toolbarbuttonsContainer." + panel_id + "." + toolbarbuttonsContainer[i].classList[2]).hide();
        }
    }
}

window.onbeforeunload = function() {
    return 'Are you sure you want to leave?';
};

var csrftoken = '{{ csrf_token }}';
//var RetrievedData = '{{def.definition_user_saved | safe}}';

export {showThisPanel, setCurrentCagegory};