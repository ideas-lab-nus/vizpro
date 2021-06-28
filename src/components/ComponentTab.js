import React, { Component } from 'react';
import { CreateNewSlider } from './js/slider.js';
import { CreateNewOptionList } from './js/optionlist.js';
import { CreateNewPanel } from './js/panel.js';
import { CreateNewToggle } from './js/toggle.js';
import { CreateNewFileUpload } from './js/fileUpload.js';
import { CreateNewListView } from './js/listView.js';

export default class ComponentTab extends Component {
    render() {
        return (
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
                    
                    <div id="addSlider" onClick={() => CreateNewSlider(this.props.context)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/983/983840.png)"}}>&nbsp;<span id="hint">Slider</span></div>
                    <div id="addPanel" onClick={() => CreateNewPanel(this.props.context)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/2274978.png)"}}>&nbsp;<span id="hint">Panel</span></div>
                    <div id="addToggle" onClick={() => CreateNewToggle(this.props.context)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/1465/1465907.png)"}}>&nbsp;<span id="hint">Toggle</span></div>
                    <div id="addOptionList" onClick={() => CreateNewOptionList(this.props.context)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/1085/1085805.png)"}}>&nbsp;<span id="hint">Option list</span></div>
                    <div id="addListView" onClick={() => CreateNewListView(this.props.context)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/checklist.png)"}}>&nbsp;<span id="hint">List view</span></div>
                    <div id="addFile" onClick={() => CreateNewFileUpload(this.props.context)} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/2329/2329379.png)"}}>&nbsp;<span id="hint">File upload</span></div>
                    
                </div>
                
                <div id="toolbar_container_1_2_2" className="toolbarRightToggleNavigator 1" />
            </div>
        )
    }
}