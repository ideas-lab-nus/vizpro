import React from 'react';
import ScriptTag from 'react-script-tag';
import { globalVars } from './js/constants.js';
import { handleFileUpload } from './js/fileUpload.js';
import { manageCanvas } from './js/layout.js'; 
import { manageGrid } from './js/mainGrid.js';
import { dummyToSetState } from './js/functions.js';
import Grid from './Grid';   
import TopBar from './TopBar.js';  
import LeftContainer from './LeftContainer.js';
import { handleComponentSelection, 
         handleTheClickOnAllComponents, 
         handleEdgeInitialization, 
         handleDoubleClick } from './js/handle.js';
import { addGenericComponentIcon, addRightToggleButton } from './js/leftPropertyBar.js';
import { saveData, loadData, downloadData } from './js/saveAndLoadData.js';
import './App.css';

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
            <div style={{
                backgroundColor: '#2b3d50',
                width: '100vw',
                height: '100vh',
              }}>
                  
                {/* <ScriptTag>{this.print()}</ScriptTag> */}
                <ScriptTag>{this.dummyToSetState()}</ScriptTag>
                <ScriptTag>{this.manageGrid()}</ScriptTag>
                <ScriptTag>{this.handleComponentSelection()}</ScriptTag>
                <ScriptTag>{this.handleDoubleClick()}</ScriptTag>
                <ScriptTag>{this.handleEdgeInitialization()}</ScriptTag>
                <ScriptTag>{this.handleTheClickOnAllComponents()}</ScriptTag>
                <ScriptTag>{this.handleFileUpload()}</ScriptTag>
                
                <Grid />   

                <TopBar saveData={this.saveData} downloadData={this.downloadData}/>

                <LeftContainer context={this}/>  
            </div>
        )
    }
}