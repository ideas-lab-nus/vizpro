import React from 'react';
import ScriptTag from 'react-script-tag';
import { globalVars } from './logic/constants.js';
import { manageCanvas } from './logic/layout.js'; 
import { manageGrid } from './logic/mainGrid.js';
import { dummyToSetState } from './logic/functions.js';
import Grid from './CanvasComponent/Grid.js';   
import TopBar from './CanvasComponent/TopBar.js';  
import LeftContainer from './CanvasComponent/LeftContainer.js';
import { handleComponentSelection, 
         handleTheClickOnAllComponents, 
         handleEdgeInitialization, 
         handleDoubleClick } from './logic/handle.js';
import { addGenericComponentIcon, addRightToggleButton } from './logic/leftPropertyBar.js';
import { saveData, loadData, downloadData } from './logic/saveAndLoadData.js';
import {addAllUdo} from './logic/userDefinedObject.js';
import './App.css';

export default class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = globalVars;
        this.handleComponentSelection = handleComponentSelection.bind(this);
        this.handleDoubleClick = handleDoubleClick.bind(this);
        this.handleEdgeInitialization = handleEdgeInitialization.bind(this);
        this.handleTheClickOnAllComponents = handleTheClickOnAllComponents.bind(this);
        this.manageCanvas = manageCanvas.bind(this);
        this.manageGrid = manageGrid.bind(this);
        this.dummyToSetState = dummyToSetState.bind(this);
        this.addGenericComponentIcon = addGenericComponentIcon.bind(this);
        this.saveData = saveData.bind(this);
        this.loadData = loadData.bind(this);
        this.downloadData = downloadData.bind(this);
    }

    componentDidMount() {
        addAllUdo(this.props.udo);
        this.manageCanvas();
        this.loadData();
        this.addGenericComponentIcon();
        addRightToggleButton();
    }

    render() {
        return (
            <div style={{
                backgroundColor: '#2b3d50',
                width: '100vw',
                height: '100vh',
              }}>

                <ScriptTag>{this.dummyToSetState()}</ScriptTag>
                <ScriptTag>{this.manageGrid()}</ScriptTag>
                <ScriptTag>{this.handleComponentSelection()}</ScriptTag>
                <ScriptTag>{this.handleDoubleClick()}</ScriptTag>
                <ScriptTag>{this.handleEdgeInitialization()}</ScriptTag>
                <ScriptTag>{this.handleTheClickOnAllComponents()}</ScriptTag>                
                
                <Grid />   

                <TopBar saveData={this.saveData} downloadData={this.downloadData}/>

                <LeftContainer context={this}/>  
            </div>
        )
    }
}