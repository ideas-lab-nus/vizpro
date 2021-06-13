import React from 'react';
import ScriptTag from 'react-script-tag';
import {onMaximizeClick, onMinimizeClick} from './js/layout.js';
import {CreateNewSlider} from './js/slider.js';
import {CreateNewOptionList} from './js/optionlist.js';
import {CreateNewPanel} from './js/panel.js';
import {CreateNewToggle} from './js/toggle.js';
import {CreateNewFileUpload, handleFileUpload} from './js/fileUpload.js';
import {CreateNewListView} from './js/listView.js';
import {setCurrentCategory, showThisPanel} from './js/insert.js';  
import {CreateNewComponent} from './js/component.js'; 
import {manageCanvas} from './js/layout.js'; 
import {manageGrid} from './js/mainGrid.js';
import {dummyToSetState} from './js/functions.js';
import Grid from './Grid';      
import {handleComponentSelection, handleTheClickOnAllComponents, 
    handleEdgeInitialization, handleDoubleClick, addCircle} from './js/handle.js';
import {addGenericComponentIcon} from './js/leftPropertyBar.js';

const globalVars = {
    initEdgex1: 0,
    initEdgey1: 0,
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
        this.CreateNewListView = CreateNewListView.bind(this);
        this.CreateNewOptionList = CreateNewOptionList.bind(this);
        this.CreateNewFileUpload = CreateNewFileUpload.bind(this);
        this.CreateNewComponent = CreateNewComponent.bind(this);
        this.manageGrid = manageGrid.bind(this);
        this.dummyToSetState = dummyToSetState.bind(this);
        this.addGenericComponentIcon = addGenericComponentIcon.bind(this);
    }

    componentDidMount() {
        this.manageCanvas();
        this.addGenericComponentIcon();
        // this.manageGrid();
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
        console.log( this.state.parent_child_matrix);
    }

    render() {
        return (
            <div>
                {/* <ScriptTag>{this.print()}</ScriptTag> */}
                <ScriptTag>{this.dummyToSetState()}</ScriptTag>
                <ScriptTag>{this.manageGrid()}</ScriptTag>
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
                                        <div className="toptoggleitem componentTab selected"> 
                                            Components 
                                        </div>
                                    </div>      
                                </div>
                            </div>
                            
                            <div id="toolbar_container_1_2" className="TabToolBox componentTab">
                                <div id="toolbar_container_1_2_0" className="toolbarbuttonsContainer">
                                    &nbsp; Components {'>'}
                                    <span className="currentTab componentTab" style={{marginLeft: "3px"}}> &nbsp;Main Inputs</span> 
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer componentTab A 0" style={{display:"none"}} />                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer componentTab B -1" style={{display:"none"}} />                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer componentTab C -1" style={{display:"none"}} />                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer componentTab D -1" style={{display:"none"}} />                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer componentTab E -1" style={{display:"none"}} />  
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer componentTab F 0">
                                    
                                    <div id="addSlider" onClick={() => this.CreateNewSlider()} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/983/983840.png)"}}>&nbsp;<span id="hint">Slider</span></div>
                                    <div id="addPanel" onClick={() => this.CreateNewPanel()} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/2274978.png)"}}>&nbsp;<span id="hint">Panel</span></div>
                                    <div id="addToggle" onClick={() => this.CreateNewToggle()} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/1465/1465907.png)"}}>&nbsp;<span id="hint">Toggle</span></div>
                                    <div id="addOptionList" onClick={() => this.CreateNewOptionList(this)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/1085/1085805.png)"}}>&nbsp;<span id="hint">Option list</span></div>
                                    <div id="addListView" onClick={() => this.CreateNewListView()} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/checklist.png)"}}>&nbsp;<span id="hint">List view</span></div>
                                    <div id="addFile" onClick={() => this.CreateNewFileUpload()} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/2329/2329379.png)"}}>&nbsp;<span id="hint">File upload</span></div>
                                    
                                </div>
                                
                                <div id="toolbar_container_1_2_2" className="toolbarRightToggleNavigator">
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/7e35adc61ca94a94b72d205029bbaf55.png)"}} 
                                        onClick={() => setCurrentCategory('componentTab', 'A', 'Basic')}><span id="hint">Basic</span>
                                    </div>                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/builsimhub.png)"}} 
                                        onClick={() => setCurrentCategory('componentTab', 'B', 'BuildSimHub')}><span id="hint">BuildSimHub</span>
                                    </div>                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/osisoft.png)"}} 
                                        onClick={() => setCurrentCategory('componentTab', 'C', 'OsiSoft')}><span id="hint">OsiSoft</span>
                                    </div>                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/958e37827b33418ea03f1e9875c7aa39.png)"}} 
                                        onClick={() => setCurrentCategory('componentTab', 'D', 'Pandas')}><span id="hint">Pandas</span>
                                    </div>                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/00cebc445ced4d8d89cf842609040d43.png)"}} 
                                        onClick={() => setCurrentCategory('componentTab', 'E', 'String Operations')}><span id="hint">String Operations</span>
                                    </div>                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/input.png)"}} 
                                        onClick={() => setCurrentCategory('componentTab', 'F', 'Main Inputs')}><span id="hint">Main Inputs</span>
                                    </div>
                                    
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
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/404b5524d84a49838ce63a1fe8a2b7e7.png)"}} onClick={() => setCurrentCategory('99098379-d5ab-4bc3-bc0e-b8353c952845', '140dfea1-7a19-4663-a905-38ff58c8c82f', 'Properties')}><span id="hint">Properties</span></div>
                                    
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