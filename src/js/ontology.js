class Inhabitant {
    constructor(position, control_action, attributes, attitudes) {
        this.position = position;
        this.control_action = control_action;
        this.attributes = attributes;
        this.attitudes = attitudes;
    }
}//End of Inhabitant

class IndoorCondition {
    constructor(hygro_thermal, visual, acoustical, indoor_air_quality) {
        this.hygro_thermal = hygro_thermal;
        this.visual = visual;
        this.acoustical = acoustical;
        this.indoor_air_quality = indoor_air_quality;
    }
}//End of IndoorCondition

class ExternalCondition {
    constructor(hygro_thermal, visual, solar_radiation, acoustical, air_quality) {
        this.hygro_thermal = hygro_thermal;
        this.visual = visual;
        this.solar_radiation = solar_radiation;
        this.acoustical = acoustical;
        this.air_quality = air_quality;
    }
}//End of ExternalCondition

class ControlSystem {
    constructor(heating_cooling, ventilation, lighting, shading) {
        this.heating_cooling = heating_cooling;
        this.ventilation = ventilation;
        this.lighting = lighting;
        this.shading = shading;
    }
}//End of ControlSystem

class Equipment {
    constructor ( office, household ) {
        this.office = office;
        this.household = household;
    }

}//End of Equipment

class Energy {
    constructor ( heating_cooling, ventilation, lighting, equipment, generated_energy ) {
        this.heating_cooling = heating_cooling;
        this.ventilation = ventilation; 
        this.lighting = lighting;
        this.equipment = equipment; 
        this.generated_energy = generated_energy;
    }
}//End of Energy

class Monitored{
    constructor(category, subcategory, monitored_variable, value, actor, data_source, spatial_attribute, temporal_attribute) {
        this.category= category;
        this.subcategory = subcategory;
        this.monitored_variable = monitored_variable;
        this.value = value;
        this.actor = actor;
        this.data_source = data_source; 
        this.spatial_attribute = spatial_attribute;
        this.temporal_attribute = temporal_attribute; 
    }
}//End of MonitoredData

class Category {
    constructor(name = "generic") {
        this.name = name; 
    }
}//End of Category

class SubCategory {
    constructor( name = "generic") {
        this.name = name; 
    }
}//End of SubCategory

class MonitoredVariable {
    constructor ( name = "generic") {
         this.GUID = ["MonitoredVariable", uuidv4("MonitoredVariable_")];
         this.inputs = ["Name", "value", "actor", "dataSource", "note"];
         this.inputsTypes = ["stringTextbox", "generic", "actor", "dataSource", "string"]
         this.outputs = ["MonitoredVariable"];
         this.type = "MonitoredVariable";
         this.name = name;
         this.value = null; 
         this.actor = null;
         this.data_source = null;
         this.note = "no notes"; 
    }
}//End of MonitoredVariable

function addMonitoredVariable( ) {  
    CreateNewOntologyComponent(null);
}

$("button#addMonitoredData").on("click", ()=>{
    addMonitoredVariable();
})
