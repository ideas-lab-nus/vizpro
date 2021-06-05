import React from 'react';
import ScriptTag from 'react-script-tag';
import {onMaximizeClick, onMinimizeClick} from './js/layout.js';
import {CreateNewSlider} from './js/slider.js';
import {CreateNewPanel} from './js/panel.js';
import {CreateNewToggle} from './js/toggle.js';
import {CreateNewFileUpload, handleFileUpload} from './js/fileUpload.js';
import {setCurrentCagegory, showThisPanel} from './js/insert.js';   
import {manageCanvas} from './js/layout.js'; 
import {manageGrid} from './js/mainGrid.js';
import {dummyToSetState} from './js/functions.js';
import Grid from './Grid';      
import {handleComponentSelection, handleTheClickOnAllComponents, 
    handleEdgeInitialization, handleDoubleClick} from './js/handle.js';

function addCircle() {
    var initCircle = {
        "GUID": uuidv4("C"),
        "element": null,
        "CX": 0,
        "CY": 0,
        "Comp": null,
        "type": "data",
        "path": null,
    }

    return initCircle;
};

function uuidv4(ini) {
    return ini + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}

const globalVars = {
    fromCircle: addCircle(),
    toCircle: addCircle(),
    selection_rectangle_group_rect: null,
    doubleClicked: false,
    date:"km now",
    IDLE_COLOR: "#dfd4b1",
    ACTIVE_COLOR: "green",
    ERROR_COLOR: "red",
    COMPONENT_RADIUS: 1,
    allComp: [],
    allEdges: [],
    comp_input_edges: {},
    comp_output_edges: {},
    edge_comp_matrix: {},
    parent_child_matrix: {},
    parent_child_matrix_fast_check: [],
    root_components: {},
    components_selection_data: {},
    selected_components: [],
    runDeep: false,
    StringAnchorclicked: false,
    StringAnchorType: null,
    StringAnchorId: "",
    XANCHOR: 0,
    YANCHOR: 1,
    XYANCHOR: 2,
    ANCHOR_WIDTH: 10,
    SLIDER_START_POSITION: 60 - 60,
    SLIDER_END_POSITION: 238 - 60,
    anchorMouseXpos: 0,
    anchorMouseYpos: 0,
    SliderAnchorclicked: false,
    selectedSliderComponent: null,
    dragX: 0,
    dragY: 0,
    sliderRectId: "",
    componentClickX: 0,
    componentClickY: 0,
    initPos: null,
    startDrag: false,
    clickedId: "",
    rectType: "",
    deltaX: 0,
    deltaY: 0,
    clicked: false,
    edgeStarted: false,
    targetcircleIN: false,
    selectedcircleId: "",
    targetcircleId: "",
    selectedSliderAnchorId: "",
    xGrid: 0,
    yGrid: 0,
    mousex: 0,
    mousey: 0,
    initEdgex2: 0,
    initEdgey2: 0,

    // text global variables.
    textareaStarted: false,
    textAreaRectId: "",
    optionListStarted: false,
    optionlistRectid: "",
    justSelected: null,
    mouseInsideOption: false,

    //selected component variables.
    is_component_selected: false,
    selected_component_id: "",
    rightColumnIsSelected: false,
    leftColumnIsSelected: false,
    topColumnIsSelected: false,
    rightColIsdisplayed: true,
    leftColIsdisplayed: true,
    is_edge_selected: false,
    currentTopBarHeight: 30,
    currentLeftColWidth: 225,
    currentRightColWidth: 50,
    defVars: {},
    messageshown: false,

    udo_names: [],
    udo_types: [],
    udo_desc: [],
    udo_shortNames: [],
    udo_inputs: [],
    udo_outputs: [],
    udo_fill: [],
    udo_dftypes: [],
    udo_cats: [],
    udo_subcats: [],
    cats: {},
    scats: {},
}

export default class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = globalVars;
        this.handleComponentSelection = handleComponentSelection.bind(this);
        this.handleDoubleClick = handleDoubleClick.bind(this);
        this.handleEdgeInitialization = handleEdgeInitialization.bind(this);
        this.handleTheClickOnAllComponents = handleTheClickOnAllComponents.bind(this);
        this.handleFileUpload = handleFileUpload.bind(this);
        this.manageCanvas = manageCanvas.bind(this);
        this.CreateNewSlider = CreateNewSlider.bind(this);
        this.CreateNewPanel = CreateNewPanel.bind(this);
        this.CreateNewToggle = CreateNewToggle.bind(this);
        this.CreateNewFileUpload = CreateNewFileUpload.bind(this);
        this.manageGrid = manageGrid.bind(this);
        this.dummyToSetState = dummyToSetState.bind(this);
    }

    componentDidMount() {
        this.manageCanvas();
        this.manageGrid();
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    tick() {
        this.setState({
            date: new Date()
        });
    }

    print() {
        console.log("all Comp is " + this.state.allComp)
    }

    render() {
        return (
            <div>
                {/* <ScriptTag>{this.print()}</ScriptTag> */}
                <ScriptTag>{this.dummyToSetState()}</ScriptTag>
                <ScriptTag>{this.handleComponentSelection()}</ScriptTag>
                <ScriptTag>{this.handleDoubleClick()}</ScriptTag>
                <ScriptTag>{this.handleEdgeInitialization()}</ScriptTag>
                <ScriptTag>{this.handleTheClickOnAllComponents()}</ScriptTag>
                <ScriptTag>{this.handleFileUpload()}</ScriptTag>
                <div className="canvas_container canvas_container_inner main_canvas_container canvas_body_container">
                    <div className="ui-designer-grid" id="mainGrid">
                        <Grid />   
                    </div> 
                </div>
                <div id="TopPropertiesBar">
                    <a href="#" id="fileTheDef" className="menubarButtons">File</a>
                    <a href="#" id="fileTheDef" className="menubarButtons">Edit</a>
                    <a href="#" id="fileTheDef" className="menubarButtons">Help</a>
                    <a href="#" id="saveTheDef" className="menubarButtons">Save</a>

                    <div id="minimizeUpperBar" style={{display: "block"}} onClick={() => onMinimizeClick()}>
                        <i id="tominimize" className="fa fa-caret-up" aria-hidden="true"></i>
                    </div>
                    <div id="maximizeUpperBar" style={{display: "none"}} onClick={() => onMaximizeClick()}>
                        <i id="tomaximize" className="fa fa-caret-up" aria-hidden="true" style={{transform: [{ rotate: '180deg'}]}}></i>
                    </div>
                </div>

                <div id="LeftPropertiesBar" style={{top: "30px"}}>
                    <div id="leftbarcontainer">
                        <div id="toolbar_container_1" className="toolBarContainer 1">

                            <div id="toolbar_container_1_1" className="toolBarContainer 1 1">
                                <div id="toolbar_container_1_1_1" className="toolbarTopToggleContainer">
                                    <div className="toolbarTopToggleItem 1">
                                        <div className="toptoggleitem b066a5eb-26dc-4359-8d22-3643444d08e4 00492f59-092c-4ee5-affb-8a5e36495e59 selected" 
                                        onClick={() => showThisPanel('b066a5eb-26dc-4359-8d22-3643444d08e4', '00492f59-092c-4ee5-affb-8a5e36495e59')}> 
                                            Components
                                        </div>
                                    </div>      
                                </div>
                            </div>
                            
                            <div id="toolbar_container_1_2" className="TabToolBox b066a5eb-26dc-4359-8d22-3643444d08e4 00492f59-092c-4ee5-affb-8a5e36495e59">
                                <div id="toolbar_container_1_2_0" className="toolbarbuttonsContainer">
                                    &nbsp; Components
                                    <span className="currentTab b066a5eb-26dc-4359-8d22-3643444d08e4" style={{marginLeft: "3px"}}> &nbsp;</span> 
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 d2312a8b-63dc-4112-8a66-76996c150b0e 0" style={{display:"none"}}>
                                        
                                    <div id="addComp" name="Average" shname="AVG" desc="The average between two values" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/958f17e5cfad4cdbbe26dd5affbbbfa2.png)"}}>&nbsp;<span id="hint">Average</span></div>
                                        
                                    <div id="addComp" name="Add" shname="+" desc="Add two numbers." type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/e2c5a0d28dca45c38b0e96e6723e2bde.png)"}}>&nbsp;<span id="hint">Add</span></div>
                                        
                                    <div id="addComp" name="Max" shname="max" desc="Maximum value of a list of inputs." type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/96524490dcdf4317a9a3e80b9d4762ba.png)"}}>&nbsp;<span id="hint">Max</span></div>
                                        
                                    <div id="addComp" name="Min" shname="min" desc="Minimum value of a list of inputs" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/5d844dbee9f54f9ba9891082ac8a52c5.png)"}}>&nbsp;<span id="hint">Min</span></div>
                                        
                                    <div id="addComp" name="Difference 2" shname="Difference" desc="Substraction" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/f4fbd2bace8d4fb6b8982ccfaf310f63.png)"}}>&nbsp;<span id="hint">Difference 2</span></div>
                                                        
                                    <div id="addComp" name="Json Navigator" shname="jsonNav" desc="Select item from json object by path" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Json Navigator</div>
                                                    
                                    <div id="addComp" name="3dVisualizer" shname="3dvis" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>3dVisualizer</div>
                                        
                                    <div id="addComp" name="Image Display" shname="imshow" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Image Display</div>
                                        
                                    <div id="addComp" name="YouTube display" shname="YouTube" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>YouTube display</div>
                                            
                                    <div id="addComp" name="Plot Panel" shname="plot panel" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Plot Panel</div>
                                        
                                    <div id="addComp" name="Cloud" shname="Cloud" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Cloud</div>
                                    
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 094290f2-edaf-4396-b7b9-098ff208257f -1" style={{display:"none"}}>
                                    
                                    <div id="addComp" name="BuildingSimulationModel" shname="BSimM" desc="Integrate cloud simulation into BuildSim&#x27;s automated workflow" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/a65cdbfc93a7436c9c8c83308ed9b100.png)"}}>&nbsp;<span id="hint">BuildingSimulationModel</span></div>
                                        
                                    <div id="addComp" name="HVAC" shname="hvac" desc="Heating, ventilation, and air conditioning (HVAC) is the technology of indoor and vehicular environmental comfort." type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/784e631b9ba748f28eba825362b3add9.png)"}}>&nbsp;<span id="hint">HVAC</span></div>
                                                    
                                    <div id="addComp" name="BSH Project Model List" shname="bshPrj" desc="Get list of models under a project" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH Project Model List</div>
                                        
                                    <div id="addComp" name="BSH Model Commits" shname="bshModelCommits" desc="Access a model commit" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH Model Commits</div>
                                        
                                    <div id="addComp" name="BSH Run" shname="bsh_run" desc="Run simulation job" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH Run</div>
                                        
                                    <div id="addComp" name="BSH 3D Viewer" shname="3dviewer" desc="track_token" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH 3D Viewer</div>
                                        
                                    <div id="addComp" name="Draw 3d Model" shname="None" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Draw 3d Model</div>
                                                                
                                    <div id="addComp" name="BSH Get Model Details" shname="ModelDetails" desc="Retrieves model info and simulation results." type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH Get Model Details</div>
                                        
                                    <div id="addComp" name="BSH Parametric Study" shname="parametric_study" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH Parametric Study</div>
                                        
                                    <div id="addComp" name="BSH Spatial Representation" shname="SpatialRepr" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH Spatial Representation</div>
                                        
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 11b3c35e-76a6-4c6b-8743-e86fe7f02403 -1" style={{display:"none"}}>
                                                    
                                    <div id="addComp" name="get OsiSoft" shname="get OsiSoft" desc="get data from a url" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>get OsiSoft</div>
                                                
                                    <div id="addComp" name="Get Data Tree" shname="getDTr" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Get Data Tree</div>
                                        
                                    <div id="addComp" name="OSI Get Data List" shname="getDList" desc="Main function to get the list of nodes of different levels. 
            Arguments:
                    url {string} -- url to the piwebapi asset server" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>OSI Get Data List</div>
                                        
                                    <div id="addComp" name="OSI Get Attribute" shname="osi_getAttribute" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>OSI Get Attribute</div>
                                        
                                    <div id="addComp" name="OSI_StartTime" shname="starttime" desc="{&quot;Last_1_hours&quot;:&quot;-1h&quot;,&quot;Last_6_hours&quot;:&quot;-6h&quot;,&quot;Last_12_hours&quot;:&quot;-12h&quot;,&quot;Last_24_hours&quot;:&quot;-24h&quot;,&quot;Last_7_days&quot;:&quot;-7d&quot;,&quot;Last_15_days&quot;:&quot;-15d&quot;,&quot;Last_30_days&quot;:&quot;-30d&quot;,&quot;This_Year&quot;:&quot;01/01&quot;}" type="optionList" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>OSI_StartTime</div>
                                        
                                    <div id="addComp" name="OSI End Time" shname="osi_endTime" desc="{&quot;Now&quot;:&quot;*&quot;,&quot;Last_1_hours&quot;:&quot;*-1h&quot;,&quot;Last_6_hours&quot;:&quot;*-6h&quot;,&quot;Last_12_hours&quot;:&quot;*-12h&quot;,&quot;Last_24_hours&quot;:&quot;*-24h&quot;,&quot;Last_7_days&quot;:&quot;*-7d&quot;,&quot;Last_15_days&quot;:&quot;*-15d&quot;,
            &quot;Last_30_days&quot;:&quot;*-30d&quot;}" type="optionList" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>OSI End Time</div>
                                        
                                    <div id="addComp" name="OSI Extract TimeSeries Data" shname="timeSeriesData" desc="Extract timeseries data from a record" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>OSI Extract TimeSeries Data</div>
                                                        
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 c0e53dd4-d351-4f87-9ef9-219fe3b108a4 -1" style={{display:"none"}}>
                                                                                
                                    <div id="addComp" name="PANDAS DataFrame" shname="pd_dataFrame" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>PANDAS DataFrame</div>
                                                        
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 d3903696-cae5-4b0c-b6c0-0f57649e9253 -1" style={{display:"none"}}>
                                            
                                    <div id="addComp" name="String_to_List" shname="str2list" desc="Converts a list-like string into a list object." type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/9c0712eb82084d33af0519131126d0e7.png)"}}>&nbsp;<span id="hint">String_to_List</span></div>
                                                                        
                                    <div id="addComp" name="Replace" shname="replace" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/c5571f6199314a3daf2186534a545b13.png)"}}>&nbsp;<span id="hint">Replace</span></div>
                                                    
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 4949e5ab-6a97-4eed-b8a6-775b65053e41 0">
                                    
                                    <div id="addSlider" onClick={() => this.CreateNewSlider()} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/983/983840.png)"}}>&nbsp;<span id="hint">Slider</span></div>
                                    <div id="addPanel" onClick={() => this.CreateNewPanel()} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/2274978.png)"}}>&nbsp;<span id="hint">Panel</span></div>
                                    <div id="addToggle" onClick={() => this.CreateNewToggle()} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/1465/1465907.png)"}}>&nbsp;<span id="hint">Toggle</span></div>
                                    <div id="addOptionList" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/1085/1085805.png)"}}>&nbsp;<span id="hint">Option list</span></div>
                                    <div id="addListView" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/checklist.png)"}}>&nbsp;<span id="hint">List view</span></div>
                                    <div id="addFile" onClick={() => this.CreateNewFileUpload()} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/2329/2329379.png)"}}>&nbsp;<span id="hint">File upload</span></div>
                                    
                                </div>
                                
                                <div id="toolbar_container_1_2_2" className="toolbarRightToggleNavigator">
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/7e35adc61ca94a94b72d205029bbaf55.png)"}} onClick={() => setCurrentCagegory('b066a5eb-26dc-4359-8d22-3643444d08e4', 'd2312a8b-63dc-4112-8a66-76996c150b0e', 'Basic')}><span id="hint">Basic</span></div>
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/builsimhub.png)"}} onClick={() => setCurrentCagegory('b066a5eb-26dc-4359-8d22-3643444d08e4', '094290f2-edaf-4396-b7b9-098ff208257f', 'BuildSimHub')}><span id="hint">BuildSimHub</span></div>
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/osisoft.png)"}} onClick={() => setCurrentCagegory('b066a5eb-26dc-4359-8d22-3643444d08e4', '11b3c35e-76a6-4c6b-8743-e86fe7f02403', 'OsiSoft')}><span id="hint">OsiSoft</span></div>
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/958e37827b33418ea03f1e9875c7aa39.png)"}} onClick={() => setCurrentCagegory('b066a5eb-26dc-4359-8d22-3643444d08e4', 'c0e53dd4-d351-4f87-9ef9-219fe3b108a4', 'Pandas')}><span id="hint">Pandas</span></div>
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/00cebc445ced4d8d89cf842609040d43.png)"}} onClick={() => setCurrentCagegory('b066a5eb-26dc-4359-8d22-3643444d08e4', 'd3903696-cae5-4b0c-b6c0-0f57649e9253', 'String Operations')}><span id="hint">String Operations</span></div>
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/input.png)"}} onClick={() => setCurrentCagegory('b066a5eb-26dc-4359-8d22-3643444d08e4', '4949e5ab-6a97-4eed-b8a6-775b65053e41', 'Main Inputs')}><span id="hint">Main Inputs</span></div>
                                    
                                </div>
                            </div>                        
                        
                        </div>
                    </div>
                    
                    <div id="leftbarcontainer">
                        <div id="toolbar_container_1" className="toolBarContainer 1">
                            <div id="toolbar_container_1_1" className="toolBarContainer 1 1">
                                <div id="toolbar_container_1_1_1" className="toolbarTopToggleContainer">
                                        
                                    <div className="toolbarTopToggleItem 1">
                                        <div className="toptoggleitem 99098379-d5ab-4bc3-bc0e-b8353c952845 f56e635d-c2a6-48ec-9b93-26b76b890390 selected" onClick={showThisPanel('99098379-d5ab-4bc3-bc0e-b8353c952845', 'f56e635d-c2a6-48ec-9b93-26b76b890390')}> Properties</div>
                                    </div>
                                    
                                </div>
                            </div>
                                
                            <div id="toolbar_container_1_2" className="TabToolBox 99098379-d5ab-4bc3-bc0e-b8353c952845 f56e635d-c2a6-48ec-9b93-26b76b890390">
                                
                                <div id="toolbar_container_1_2_0" className="toolbarbuttonsContainer">
                                    &nbsp; Properties <span className="currentTab 99098379-d5ab-4bc3-bc0e-b8353c952845">&nbsp;</span> 
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer 99098379-d5ab-4bc3-bc0e-b8353c952845 140dfea1-7a19-4663-a905-38ff58c8c82f 0">
                                                                                                    
                                </div>
                                
                                <div id="toolbar_container_1_2_2" className="toolbarRightToggleNavigator">
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/404b5524d84a49838ce63a1fe8a2b7e7.png)"}} onClick={() => setCurrentCagegory('99098379-d5ab-4bc3-bc0e-b8353c952845', '140dfea1-7a19-4663-a905-38ff58c8c82f', 'Properties')}><span id="hint">Properties</span></div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="PropertiesBar" className="componentsCategory">
                    <div className="ccatheader"><span id="customcomponentarrow"><i className="fa fa-chevron-circle-down" aria-hidden="true"></i></span>Properties</div>
                    <div className="ccbody" id="propertiesBarContents" style={{"width":"100%"}}></div>
                </div>
            </div>
        )
    }
}