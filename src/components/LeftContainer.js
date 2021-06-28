import React, { Component } from 'react';
import ComponentTab from './ComponentTab';
import PropertiesTab from './PropertiesTab';

export default class LeftContainer extends Component {
    render() {
        return (
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
                        
                        <ComponentTab context={this.props.context}/>                        
                    
                    </div>
                </div>
                
                <div id="leftbarcontainer">
                    <div id="toolbar_container_1" className="toolBarContainer 1">
                        <div id="toolbar_container_1_1" className="toolBarContainer 1 1">
                            <div id="toolbar_container_1_1_1" className="toolbarTopToggleContainer">                                    
                                <div className="toolbarTopToggleItem 1">
                                    <div className="toptoggleitem propertiesTab selected">
                                            Properties
                                    </div>
                                </div>                                
                            </div>
                        </div>
                            
                        <PropertiesTab/>
                        
                    </div>
                </div>            
            </div>
        )
    }
}