function showThisPanel(panel_id, id) {
    var allTabs = $("div.TabToolBox." + panel_id);
    for (i = 0; i < allTabs.length; i++) {
        if (allTabs[i].classList[1] == panel_id & allTabs[i].classList[2] == id) {
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
    for (i = 0; i < toolbarbuttonsContainer.length; i++) {
        if (toolbarbuttonsContainer[i].classList[2] == id) {
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
RetrievedData = '{{def.definition_user_saved | safe}}';
// let udo_names = [];
// let udo_types = [];
// let udo_desc = [];
// let udo_shortNames = [];
// let udo_inputs = [];
// let udo_outputs = [];
// let udo_fill = [];
// let udo_dftypes = [];
// let udo_cats = [];
// let udo_subcats = [];

// let cats = {};
// let scats = {};

// {%for c in categories %}
// cats["{{c.category_name}}"] = "{{c.category_color}}"

// {% endfor %}

// {%for sc in subCategories %}
// scats["{{sc.subcategory_name}}"] = "{{sc.subcategory_color}}" 
// {% endfor %}

// {% for u in udo %}
// udo_names.push("{{ u.component_name }}");
// udo_types.push("{{ u.component_type }}");
// udo_desc.push(`{{u.component_description|safe}}`);
// udo_inputs.push({{u.component_inputs | safe}});
// udo_shortNames.push("{{ u.component_shortName }}");
// udo_outputs.push({{u.component_outputs | safe}});
// udo_fill.push("{{ u.component_fill }}");
// udo_dftypes.push("{{u.component_dataflow_type}}");
// udo_cats.push("{{u.component_category}}");
// udo_subcats.push("{{u.component_sub_category}}"); 
// {% endfor %}

// console.log(cats)

//console.log(RetrievedData);
//console.log(udo_dftypes);
//console.log(udo_shortNames);


// let editUrl = "{% url 'def_edit' %}";
// let thisDefId = "{{ def.definition_guid }}";
// let saveUrl = "{% url 'def'%}"
// let gotoTheMoon = "{% url 'deep' %}"