import React, { Component } from 'react'
import {onMaximizeClick, onMinimizeClick} from './js/layout.js';

export default class Canvas extends Component {
    render() {
        return (
            <div>
                <div id="TopPropertiesBar">
                <a href="#" id="fileTheDef" class="menubarButtons">File</a>
                <a href="#" id="fileTheDef" class="menubarButtons">Edit</a>
                <a href="#" id="fileTheDef" class="menubarButtons">Help</a>
                <a href="#" id="saveTheDef" class="menubarButtons">Save</a>

                <div id="minimizeUpperBar" style={{display: "block"}} onclick={onMinimizeClick}>
                    <i id="tominimize" class="fa fa-caret-up" aria-hidden="true"></i>
                </div>
                <div id="maximizeUpperBar" style={{display: "none"}} onclick={onMaximizeClick}>
                    <i id="tomaximize" class="fa fa-caret-up" aria-hidden="true" style={{transform: [{ rotate: '180deg'}]}}></i>
                </div>
            </div>
            </div>
        )
    }
}


