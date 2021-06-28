import React, { Component } from 'react';
import { clearData } from './js/saveAndLoadData.js';
import { onMaximizeClick, onMinimizeClick } from './js/layout.js';

export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.saveData = this.props.saveData;
        this.downloadData = this.props.downloadData;
    }

    render() {
        return (
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
        )
    }
}