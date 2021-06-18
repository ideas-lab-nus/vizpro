import React, { Component } from 'react';
import { onMaximizeClick, onMinimizeClick } from './../../js/layout.js';

export default class TopPropertiesBar extends Component {
    render() {
        return (
            <div>
                <div id="TopPropertiesBar">
                    <a href="#" id="fileTheDef" className="menubarButtons">
                        File
                    </a>
                    <a href="#" id="fileTheDef" className="menubarButtons">
                        Edit
                    </a>
                    <a href="#" id="fileTheDef" className="menubarButtons">
                        Help
                    </a>
                    <a href="#" id="saveTheDef" className="menubarButtons">
                        Save
                    </a>

                    <div
                        id="minimizeUpperBar"
                        style={{ display: 'block' }}
                        onClick={onMinimizeClick}
                    >
                        <i id="tominimize" className="fa fa-caret-up" aria-hidden="true"></i>
                    </div>
                    <div
                        id="maximizeUpperBar"
                        style={{ display: 'none' }}
                        onClick={onMaximizeClick}
                    >
                        <i
                            id="tomaximize"
                            className="fa fa-caret-up"
                            aria-hidden="true"
                            style={{ transform: [{ rotate: '180deg' }] }}
                        ></i>
                    </div>
                </div>
            </div>
        );
    }
}
