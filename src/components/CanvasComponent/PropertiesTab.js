import React, { Component } from 'react';

export default class PropertiesTab extends Component {
    render() {
        return (
            <div id="PropertiesBar">
                <div className="ccatheader"></div>
                <div className="ccbody" id="propertiesBarContents" style={{"width":"100%"}}></div>
            </div>
        )
    }
}