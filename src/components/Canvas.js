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
import { Helmet } from 'react-helmet';

var loadScript = function(src) {
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    document.body.appendChild(tag);
  }

var loadSvg = function() {
    var tag = document.createElement('div');
    tag.innerHTML =
        `<svg id="js-plotly-tester" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; left: -10000px; top: -10000px; width: 9000px; height: 9000px; z-index: 1;"><path class="js-reference-point" d="M0,0H1V1H0Z" style="stroke-width: 0; fill: black;"></path></svg>`
    
    // tag.id = "js-plotly-tester";
    // tag.xmlns = "http://www.w3.org/2000/svg" ;
    // tag.xmlnsXlink = "http://www.w3.org/1999/xlink";
    // tag.style = `'position': 'absolute',
    // 'left': '-10000px', 
    // 'top': '-10000px', 
    // 'width': '9000px', 
    // 'height': '9000px', 
    // 'z-index': '1'`;
    // var path = document.createElement('path');
    // path.className = "js-reference-point";
    // path.d = "M0,0H1V1H0Z";
    // path.style = `'stroke-width': '0', 'fill': 'black'`;
    // tag.appendChild(path)
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
        
        
        // loadSvg();
    }

    componentDidMount() {
        addAllUdo(this.props.udo);
        this.manageCanvas();
        this.loadData();
        this.addGenericComponentIcon();
        addRightToggleButton();         
        loadSvg();
        loadScript("https://cdn.plot.ly/plotly-latest.min.js"); 
    }

    print() {
        console.log(this.state);
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
                {/* <svg id="js-plotly-tester" 
                    xmlns="http://www.w3.org/2000/svg" 
                    xmlnsXlink="http://www.w3.org/1999/xlink" 
                    style={{'position': 'absolute',
                    'left': '-10000px', 
                    'top': '-10000px', 
                    'width': '9000px', 
                    'height': '9000px', 
                    'z-index': '1'}}>
                    <path className="js-reference-point" d="M0,0H1V1H0Z" style={{'stroke-width': '0', 'fill': 'black'}}></path>
                </svg> */}
                {/* <Helmet>
                    <script src="https://cdn.plot.ly/plotly-latest.min.js"  type="text/javascript"></script>
                </Helmet> */}
                {/* <ScriptTag>{this.print()}</ScriptTag> */}
                {/* <Helmet>
                <script type="text/javascript">
                    {`${this.dummyToSetState()};`}
                </script>
                </Helmet>
                <Helmet>
                <script type="text/javascript">
                    {`${this.manageGrid()}`}
                </script>
                </Helmet>
                <Helmet>
                <script type="text/javascript">
                    {`${this.handleComponentSelection()};`}
                </script>
                </Helmet>
                <Helmet>
                <script type="text/javascript">
                    {`${this.handleDoubleClick()};`}
                </script>
                </Helmet>
                <Helmet>
                <script type="text/javascript">
                    {`${this.handleEdgeInitialization()};`}
                </script>
                </Helmet>
                <Helmet>
                <script type="text/javascript">
                    {`${this.handleTheClickOnAllComponents()};`}
                </script>
                </Helmet> */}
                {/* <ScriptTag>{this.dummyToSetState()}</ScriptTag>
                <ScriptTag>{this.manageGrid()}</ScriptTag>
                <ScriptTag>{this.handleComponentSelection()}</ScriptTag>
                <ScriptTag>{this.handleDoubleClick()}</ScriptTag>
                <ScriptTag>{this.handleEdgeInitialization()}</ScriptTag>
                <ScriptTag>{this.handleTheClickOnAllComponents()}</ScriptTag>                 */}
                

                <Grid />   

                <TopBar saveData={this.saveData} downloadData={this.downloadData}/>

                <LeftContainer context={this}/>  
            </div>
        )
    }
}