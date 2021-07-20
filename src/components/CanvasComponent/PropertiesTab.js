import React, { Component } from 'react';

export default class PropertiesTab extends Component {
    render() {
        return (
            <div id="PropertiesBar" data-testid="PropertiesBar">
                <div className="ccatheader"></div>
                <div data-testid='propertiesBarContents'
                className="ccbody" id="propertiesBarContents" style={{"width":"100%","overflow": "hidden"}}></div>
            </div>
        )
    }
}