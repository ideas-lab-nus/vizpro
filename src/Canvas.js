import React from 'react';
import ScriptTag from 'react-script-tag';
import { globalVars } from './js/constants.js';
import { onMaximizeClick, onMinimizeClick } from './js/layout.js';
import { CreateNewSlider } from './js/slider.js';
import { CreateNewOptionList } from './js/optionlist.js';
import { CreateNewPanel } from './js/panel.js';
import { CreateNewToggle } from './js/toggle.js';
import { CreateNewFileUpload, handleFileUpload } from './js/fileUpload.js';
import { CreateNewListView } from './js/listView.js';
import { manageCanvas } from './js/layout.js'; 
import { manageGrid } from './js/mainGrid.js';
import { dummyToSetState } from './js/functions.js';
import Grid from './Grid';      
import { handleComponentSelection, 
         handleTheClickOnAllComponents, 
         handleEdgeInitialization, 
         handleDoubleClick } from './js/handle.js';
import { addGenericComponentIcon, addRightToggleButton } from './js/leftPropertyBar.js';
import { saveData, loadData, clearData, downloadData } from './js/saveAndLoadData.js';

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
        this.manageGrid = manageGrid.bind(this);
        this.dummyToSetState = dummyToSetState.bind(this);
        this.addGenericComponentIcon = addGenericComponentIcon.bind(this);
        this.saveData = saveData.bind(this);
        this.loadData = loadData.bind(this);
        this.downloadData = downloadData.bind(this);
    }

    componentDidMount() {
        this.manageCanvas();
        this.loadData();
        this.addGenericComponentIcon();
        addRightToggleButton();
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
        console.log(this.state);
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
                    <a id="fileTheDef" className="menubarButtons">File</a>
                    <a id="fileTheDef" className="menubarButtons">Edit</a>
                    <a id="fileTheDef" className="menubarButtons">Help</a>
                    <a id="saveTheDef" className="menubarButtons" onClick={() => this.saveData()}>Save</a>
                    <a id="fileTheDef" className="menubarButtons" onClick={() => clearData()}>Clear</a>
                    <a id="saveTheDef" className="menubarButtons" onClick={() => this.downloadData()}>Download</a>

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
                                    <span className="currentTab componentTab" style={{marginLeft: "3px"}}> Main Inputs</span> 
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer componentTab Basic 0" style={{display:"none"}} />                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer componentTab BSH -1" style={{display:"none"}} />                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer componentTab Osi -1" style={{display:"none"}} />                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer componentTab Pandas -1" style={{display:"none"}} />                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer componentTab StringOps -1" style={{display:"none"}} />  
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer componentTab Input 0">
                                    
                                    <div id="addSlider" onClick={() => CreateNewSlider(this)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/983/983840.png)"}}>&nbsp;<span id="hint">Slider</span></div>
                                    <div id="addPanel" onClick={() => CreateNewPanel(this)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/2274978.png)"}}>&nbsp;<span id="hint">Panel</span></div>
                                    <div id="addToggle" onClick={() => CreateNewToggle(this)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/1465/1465907.png)"}}>&nbsp;<span id="hint">Toggle</span></div>
                                    <div id="addOptionList" onClick={() => CreateNewOptionList(this)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/1085/1085805.png)"}}>&nbsp;<span id="hint">Option list</span></div>
                                    <div id="addListView" onClick={() => CreateNewListView(this)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/checklist.png)"}}>&nbsp;<span id="hint">List view</span></div>
                                    <div id="addFile" onClick={() => CreateNewFileUpload(this)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/2329/2329379.png)"}}>&nbsp;<span id="hint">File upload</span></div>
                                    
                                </div>
                                
                                <div id="toolbar_container_1_2_2" className="toolbarRightToggleNavigator 1" />
                            </div>                        
                        
                        </div>
                    </div>
                    
                    <div id="leftbarcontainer">
                        <div id="toolbar_container_1" className="toolBarContainer 1">
                            <div id="toolbar_container_1_1" className="toolBarContainer 1 1">
                                <div id="toolbar_container_1_1_1" className="toolbarTopToggleContainer">
                                        
                                    <div className="toolbarTopToggleItem 1">
                                        <div className="toptoggleitem 99098379-d5ab-4bc3-bc0e-b8353c952845 f56e635d-c2a6-48ec-9b93-26b76b890390 selected"> Properties</div>
                                    </div>
                                    
                                </div>
                            </div>
                                
                            <div id="toolbar_container_1_2" className="TabToolBox 99098379-d5ab-4bc3-bc0e-b8353c952845 f56e635d-c2a6-48ec-9b93-26b76b890390">
                                
                                <div id="toolbar_container_1_2_0" className="toolbarbuttonsContainer">
                                    &nbsp; Properties <span className="currentTab 99098379-d5ab-4bc3-bc0e-b8353c952845">&nbsp;</span> 
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer 99098379-d5ab-4bc3-bc0e-b8353c952845 140dfea1-7a19-4663-a905-38ff58c8c82f 0">
                                                                                                    
                                </div>
                                
                                <div id="toolbar_container_1_2_2" className="toolbarRightToggleNavigator 2">
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/404b5524d84a49838ce63a1fe8a2b7e7.png)"}}><span id="hint">Properties</span></div>
                                    
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