import React, { Component } from 'react';
import { clearData } from '../logic/saveAndLoadData.js';
import { onMaximizeClick, onMinimizeClick } from '../logic/layout.js';

export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.saveData = this.props.saveData;
        this.downloadData = this.props.downloadData;
    }

    render() {
        return (
            <div id="TopPropertiesBar">
                <a data-testid='fileTheDef' id="fileTheDef" className="menubarButtons">File</a>
                <a data-testid='fileTheDef' id="fileTheDef" className="menubarButtons">Edit</a>
                <a data-testid='fileTheDef' id="fileTheDef" className="menubarButtons">Help</a>
                <a data-testid='fileTheDef' id="saveTheDef" className="menubarButtons" onClick={() => this.saveData()}>Save</a>
                <a data-testid='fileTheDef' id="fileTheDef" className="menubarButtons" onClick={() => clearData()}>Clear</a>
                <a data-testid='fileTheDef' id="saveTheDef" className="menubarButtons" onClick={() => this.downloadData()}>Download</a>

                <div data-testid="minimize" id="minimizeUpperBar" style={{display: "block"}} onClick={() => onMinimizeClick()}>
                    <i id="tominimize" className="fa fa-caret-up" aria-hidden="true"></i>
                </div>
                <div data-testid='maximize' id="maximizeUpperBar" style={{display: "none"}} onClick={() => onMaximizeClick()}>
                    <i id="tomaximize" className="fa fa-caret-up" aria-hidden="true" style={{transform: [{ rotate: '180deg'}]}}></i>
                </div>
            </div>
        )
    }
}