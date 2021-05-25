import React, { Component } from 'react'
import {onMaximizeClick, onMinimizeClick} from './js/layout.js';
import grid2 from './img/grid2.png';
//import {Helmet} from 'react-helmet';
//import {svgContainer} from './js/inits.js';

/*
                                <Helmet>
                                    <script>svgContainer</script>
                                </Helmet>
*/
export default class Canvas extends Component {
    render() {
        return (
            <div>
                <div class="canvas_container">
                    <div class="canvas_container_inner">
                        <div class="main_canvas_container canvas_body_container">
                            <div class="ui-designer-grid" id="mainGrid">
                                <svg height="10000" width="10000">
                                <defs>
                                    <filter id="f2" x="-40" y="-40" width="150%" height="150%" filterUnits="userSpaceOnUse">
                                        <feOffset result="offOut" in="SourceGraphics" dx="0" dy="0" />
                                        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1" />
                                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                                    </filter>

                                    <pattern id="img122" patternUnits="userSpaceOnUse" width="500" height="500">
                                        <image src={grid2} alt="gridBackground" x="0" y="0" width="500" height="500" />
                                    </pattern>

                                    <defs>
                                        <linearGradient id="grad1ient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stop-color="#dddddd" stop-opacity="1" />
                                        <stop offset="50%" stop-color="#eeeeee" stop-opacity="1" />
                                        <stop offset="100%" stop-color="dddddd" stop-opacity="1" />
                                        </linearGradient>
                                    </defs>

                                    <defs>
                                            <linearGradient id="fileUploadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stop-color="#344b62" stop-opacity="1" />
                                            <stop offset="10%" stop-color="#344b62" stop-opacity="1" />
                                            <stop offset="12%" stop-color="#2b3d50" stop-opacity="1" />
                                            <stop offset="88%" stop-color="#2b3d50" stop-opacity="1" />
                                            <stop offset="90%" stop-color="#23364a" stop-opacity="1" />
                                            <stop offset="100%" stop-color="#23364a" stop-opacity="1" />
                                            </linearGradient>
                                    </defs>

                                    <defs>
                                            <linearGradient id="gradientlsider" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stop-color="#eeeeee" stop-opacity="1" />
                                            <stop offset="20%" stop-color="#eeeeee" stop-opacity="1" />
                                            <stop offset="30%" stop-color="#dddddd" stop-opacity="1" />
                                            <stop offset="70%" stop-color="#dddddd" stop-opacity="1" />
                                            <stop offset="80%" stop-color="#cccccc" stop-opacity="1" />
                                            <stop offset="100%" stop-color="#cccccc" stop-opacity="1" />
                                            </linearGradient>
                                    </defs>

                                    <defs>
                                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
                                        <stop offset="10%" stop-color="#ffffff" stop-opacity="1" />
                                        <stop offset="30%" stop-color="#ffffff" stop-opacity="0.6" />
                                        <stop offset="80%" stop-color="#ffffff" stop-opacity="0.6" />
                                        </linearGradient>
                                    </defs>

                                    <defs>
                                        <linearGradient id="gradient2_2" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
                                        <stop offset="50%" stop-color="#ffffff" stop-opacity="0.0" />
                                        <stop offset="70%" stop-color="#ffffff" stop-opacity="0.0" />
                                        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.3" />
                                        </linearGradient>
                                    </defs>

                                    <defs>
                                        <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stop-color="#555555" stop-opacity="0" />
                                        <stop offset="28%" stop-color="#555555" stop-opacity="0.0" />
                                        <stop offset="30%" stop-color="#555555" stop-opacity="0.2" />
                                        <stop offset="80%" stop-color="#555555" stop-opacity="0.5" />
                                        </linearGradient>
                                    </defs>

                                    <defs>
                                        <linearGradient id="gradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stop-color="#373939" stop-opacity="1.0" />
                                        <stop offset="100%" stop-color="#023939" stop-opacity="1.0" />
                                        </linearGradient>
                                    </defs>
                                </defs>
                            
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
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


