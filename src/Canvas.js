import React from 'react';
import $ from "jquery";
import ScriptTag from 'react-script-tag';
import {onMaximizeClick, onMinimizeClick} from './js/layout.js';
import {CreateNewSlider} from './js/slider.js';
import {CreateNewOptionList} from './js/optionlist.js';
import {CreateNewPanel} from './js/panel.js';
import {CreateNewToggle} from './js/toggle.js';
import {CreateNewFileUpload, handleFileUpload} from './js/fileUpload.js';
import {CreateNewListView} from './js/listView.js';
import {setCurrentCagegory, showThisPanel} from './js/insert.js';  
import {CreateNewComponent} from './js/component.js'; 
import {manageCanvas} from './js/layout.js'; 
import {manageGrid} from './js/mainGrid.js';
import {dummyToSetState} from './js/functions.js';
import {globalVars} from './js/constants.js';
import Grid from './Grid';      
import {handleComponentSelection, handleTheClickOnAllComponents, 
    handleEdgeInitialization, handleDoubleClick} from './js/handle.js';

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
        this.CreateNewListView = CreateNewListView.bind(this);
        this.CreateNewOptionList = CreateNewOptionList.bind(this);
        this.CreateNewFileUpload = CreateNewFileUpload.bind(this);
        this.CreateNewComponent = CreateNewComponent.bind(this);
        this.manageGrid = manageGrid.bind(this);
        this.dummyToSetState = dummyToSetState.bind(this);
        this.addGenericComponentIcon = this.addGenericComponentIcon.bind(this);
    }

    componentDidMount() {
        this.manageCanvas();
        this.manageGrid();
        this.addGenericComponentIcon();
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
        console.log("all Comp is " + this.state.allComp);
    }

    addGenericComponentIcon() {
        console.log('added');
        this.CreateNewComponent = CreateNewComponent.bind(this);
        var r = $('<div id="addComp" name="Average" shname="AVG" desc="The average between two values" type="component" dftype="shlow" class="mainButtonItem 1 1" style="background-image:url(https://storage.googleapis.com/ghostbucket111/icons/958f17e5cfad4cdbbe26dd5affbbbfa2.png)">&nbsp;<span id="hint">Average</span></div>');
        r.on("click", () => {
            console.log('Average clicked');
            console.log(this);
            CreateNewComponent(this, null, "Average", {"shortName": "AVG", "dfType": "shlow"}, [{"name": "InputList", "shortName": "in_01", "desc": "first input", "default_value": "1.0"}], ["average", "log_"], "#F23322");
        });
        $("div.toolbarbuttonsContainer.b066a5eb-26dc-4359-8d22-3643444d08e4.d2312a8b-63dc-4112-8a66-76996c150b0e").append(r);
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
                                    &nbsp; Components {'>'} 
                                    <span className="currentTab b066a5eb-26dc-4359-8d22-3643444d08e4" style={{marginLeft: "3px"}}> &nbsp;</span> 
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 d2312a8b-63dc-4112-8a66-76996c150b0e 0" style={{display:"none"}}>
                                        
                                    
                                        
                                    <div onClick={() => this.CreateNewComponent(this, null, "Add", {"shortName": "+", "dfType": "shlow"}, [{"name": "InputList", "shortName": "in_01", "desc": "first input", "default_value": "1.0"}], ["sum_", "log_"], "#F23322")} 
                                    id="addComp" name="Add" shname="+" desc="Add two numbers." type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/e2c5a0d28dca45c38b0e96e6723e2bde.png)"}}>&nbsp;<span id="hint">Add</span></div>
                                        
                                    <div onClick={() => this.CreateNewComponent(this, null, "Max", {"shortName": "max", "dfType": "shlow"}, [{"name": "InputList", "shortName": "_list", "desc": "the input list", "default_value": "[0.0, 1.0, 2.0]"}], ["output_", "log_"], "#F23322")} 
                                    id="addComp" name="Max" shname="max" desc="Maximum value of a list of inputs." type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/96524490dcdf4317a9a3e80b9d4762ba.png)"}}>&nbsp;<span id="hint">Max</span></div>
                                        
                                    <div onClick={() => this.CreateNewComponent(this, null, "Min", {"shortName": "min", "dfType": "shlow"}, [{"name": "InputList", "shortName": "_list", "desc": "the input list", "default_value": "[0.0, 1.0, 2.0]"}], ["output_", "log_"], "#F23322")} 
                                    id="addComp" name="Min" shname="min" desc="Minimum value of a list of inputs" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/5d844dbee9f54f9ba9891082ac8a52c5.png)"}}>&nbsp;<span id="hint">Min</span></div>
                                        
                                    <div onClick={() => this.CreateNewComponent(this, null, "Difference 2", {"shortName": "Difference", "dfType": "shlow"}, [{"name": "in_01", "shortName": "in_01", "desc": "first input", "default_value": "10.0"}, {"name": "in_02", "shortName": "in_02", "desc": "second input", "default_value": "5.0"}], ["output_", "log_"], "#9B59B6")} 
                                    id="addComp" name="Difference 2" shname="Difference" desc="Substraction" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/f4fbd2bace8d4fb6b8982ccfaf310f63.png)"}}>&nbsp;<span id="hint">Difference 2</span></div>
                                                        
                                    <div onClick={() => this.CreateNewComponent(this, null, "Json Navigator", {"shortName": "jsonNav", "dfType": "shlow"}, [{"name": "input_json", "shortName": "input_json", "desc": "input_json", "default_value": "null"}, {"name": "path", "shortName": "path", "desc": "path", "default_value": "null"}], ["output_", "log_"], "#C0392B")} 
                                    id="addComp" name="Json Navigator" shname="jsonNav" desc="Select item from json object by path" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Json Navigator</div>
                                                    
                                    <div onClick={() => this.CreateNewComponent(this, null, "3dVisualizer", {"shortName": "3dvis", "dfType": "shlow"}, [{"name": "url", "shortName": "url", "default_value": "null"}], ["url"], "#E38A74")} 
                                    id="addComp" name="3dVisualizer" shname="3dvis" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>3dVisualizer</div>
                                        
                                    <div onClick={() => this.CreateNewComponent(this, null, "Image Display", {"shortName": "imshow", "dfType": "shlow"}, [{"name": "_url", "shortName": "url", "desc": "url", "default_value": "https://user-images.githubusercontent.com/6969514/60951247-4bac1200-a32b-11e9-8b66-02bc19953461.png"}], ["output_", "log_"], "#F23322")} 
                                    id="addComp" name="Image Display" shname="imshow" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Image Display</div>
                                        
                                    <div onClick={() => this.CreateNewComponent(this, null, "Youtube display", {"shortName": "Youtube", "dfType": "shlow"}, [{"name": "_url", "shortName": "_url", "desc": "youtube url","default_value": "null"}], ["url"], "#C0392B")} 
                                    id="addComp" name="YouTube display" shname="YouTube" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>YouTube display</div>
                                            
                                    <div onClick={() => this.CreateNewComponent(this, null, "Plot Panel", {"shortName": "plot panel", "dfType": "shlow"}, [{"name": "inputs", "shortName": "in", "default_value": "null", "desc": "in"}], ["url"], "#F1C40F")} 
                                    id="addComp" name="Plot Panel" shname="plot panel" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Plot Panel</div>
                                        
                                    <div onClick={() => this.CreateNewComponent(this, null, "Cloud", {"shortName": "Cloud", "dfType": "dp"}, [{"name": "number"}, {"name": "url"}], ["abs"], "#F0CA4D")} 
                                    id="addComp" name="Cloud" shname="Cloud" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Cloud</div>
                                    
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
                                    <div id="addOptionList" onClick={() => this.CreateNewOptionList()} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/1085/1085805.png)"}}>&nbsp;<span id="hint">Option list</span></div>
                                    <div id="addListView" onClick={() => this.CreateNewListView()} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/checklist.png)"}}>&nbsp;<span id="hint">List view</span></div>
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
                    <div className="ccatheader"><span id="customcomponentarrow">
                        <i className="fa fa-chevron-circle-down" aria-hidden="true"></i></span>  Properties
                    </div>
                    <div className="ccbody" id="propertiesBarContents" style={{"width":"100%"}}></div>
                </div>
            </div>
        )
    }
}