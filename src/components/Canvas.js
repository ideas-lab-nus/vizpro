import React from 'react';
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
import { saveData, loadData, downloadData, uploadSavedData } from './logic/saveAndLoadData.js';
import { addAllUdo } from './logic/userDefinedObject.js';
import './App.css';

var loadScript = function(src) {
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    document.body.appendChild(tag);
}

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
        this.uploadSavedData = uploadSavedData.bind(this);
    }

    componentDidMount() {
        addAllUdo(this.props.udo);
        this.manageCanvas();
        this.loadData();
        this.addGenericComponentIcon();
        addRightToggleButton();         
        loadScript("https://cdn.plot.ly/plotly-latest.min.js"); 
    }

    render() {
        
        this.dummyToSetState();
        this.manageGrid();
        this.handleComponentSelection();
        this.handleDoubleClick();
        this.handleEdgeInitialization();
        this.handleTheClickOnAllComponents();
                
        return (
            <div style={{
                backgroundColor: '#2b3d50',
                width: '100vw',
                height: '100vh',
              }}>               

                <Grid />   

                <TopBar saveData={this.saveData} downloadData={this.downloadData} uploadSavedData={this.uploadSavedData}/>

                <LeftContainer context={this}/>  
            </div>
        )
    }
}