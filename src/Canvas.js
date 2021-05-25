import React, { Component } from 'react'
import {onMaximizeClick, onMinimizeClick, manageCanvas} from './js/layout.js';
import { ReactComponent as Grid2 } from './img/grid2.svg';
import grid2 from './img/grid2.png';
import {Helmet} from 'react-helmet';
import ScriptTag from 'react-script-tag';

{/* <Helmet>
    <script src={svgContainer}></script>
</Helmet>                                 */}
// import {manageCanvas} from './js/layout.js';                              

export default class Canvas extends Component {
    render() {
        return (
            <div>
                <div className="canvas_container">
                    <div className="canvas_container_inner">
                        <div className="main_canvas_container canvas_body_container">
                            <div className="ui-designer-grid" id="mainGrid">  

                            <svg height="10000" width="10000" onLoad={manageCanvas}>
                                <defs>
                                        <pattern id="img122" patternUnits="userSpaceOnUse" width="500" height="500">
                                            <image className='rep' xlinkHref={grid2} x="0" y="0" width="500" height="500"/>
                                        </pattern>
                                        <filter id={this.props.filter_id} x="-40" y="-40" width="150%" height="150%" filterUnits="userSpaceOnUse">
                                            <feOffset result="offOut" in="SourceGraphics" dx="0" dy="0" />
                                            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1" />
                                            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                                        </filter>
                                        <defs>
                                            <linearGradient id="grad1ient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style={{'stopColour':'#dddddd', 'stopOpacity':'100%'}} />
                                            <stop offset="50%" style={{"stopColour":"#eeeeee", "stopOpacity":"100%"}} />
                                            <stop offset="100%" style={{"stopColour":"#dddddd", "stopOpacity":"100%"}} />
                                            </linearGradient>
                                        </defs>

                                        <defs>
                                            <linearGradient id="fileUploadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style={{"stopColour":"#344b62", "stopOpacity":"100%"}} />
                                            <stop offset="10%" style={{"stopColour":"#344b62", "stopOpacity":"100%"}} />
                                            <stop offset="12%" style={{"stopColour":"#2b3d50", "stopOpacity":"100%"}} />
                                            <stop offset="88%" style={{"stopColour":"#2b3d50", "stopOpacity":"100%"}} />
                                            <stop offset="90%" style={{"stopColour":"#23364a", "stopOpacity":"100%"}} />
                                            <stop offset="100%" style={{"stopColour":"#23364a", "stopOpacity":"100%"}} />
                                            </linearGradient>
                                        </defs>

                                        <defs>
                                            <linearGradient id="gradientlsider" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%"  style={{"stopColour":"#eeeeee", "stopOpacity":"100%"}} />
                                            <stop offset="20%" style={{"stopColour":"#eeeeee", "stopOpacity":"100%"}} />
                                            <stop offset="30%" style={{"stopColour":"#dddddd", "stopOpacity":"100%"}} />
                                            <stop offset="70%" style={{"stopColour":"#dddddd", "stopOpacity":"100%"}} />
                                            <stop offset="80%" style={{"stopColour":"#cccccc", "stopOpacity":"100%"}} />
                                            <stop offset="100%"style={{"stopColour":"#cccccc", "stopOpacity":"100%"}} />
                                            </linearGradient>
                                        </defs>

                                        <defs>
                                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%"  style={{"stopColour":"#ffffff", "stopOpacity":"100%"}} />
                                            <stop offset="10%" style={{"stopColour":"#ffffff", "stopOpacity":"100%"}}/>
                                            <stop offset="30%" style={{"stopColour":"#ffffff", "stopOpacity":"60%"}} />
                                            <stop offset="80%" style={{"stopColour":"#ffffff", "stopOpacity":"60%"}} />
                                            </linearGradient>
                                        </defs>

                                        <defs>
                                            <linearGradient id="gradient2_2" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%"  style={{"stopColour":"#ffffff", "stopOpacity":"100%"}} />
                                            <stop offset="50%" style={{"stopColour":"#ffffff", "stopOpacity":"0%"}} />
                                            <stop offset="70%" style={{"stopColour":"#ffffff", "stopOpacity":"0%"}} />
                                            <stop offset="100%"style={{"stopColour":"#ffffff", "stopOpacity":"30%"}} />
                                            </linearGradient>
                                        </defs>

                                        <defs>
                                            <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%"  style={{"stopColour":"#555555", "stopOpacity":"0%"}} />
                                            <stop offset="28%" style={{"stopColour":"#555555", "stopOpacity":"0%"}} />
                                            <stop offset="30%" style={{"stopColour":"#555555", "stopOpacity":"20%"}} />
                                            <stop offset="80%" style={{"stopColour":"#555555", "stopOpacity":"50%"}} />
                                            </linearGradient>
                                        </defs>

                                        <defs>
                                            <linearGradient id="gradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%"   style={{"stopColour":"#373939", "stopOpacity":"100%"}} />
                                            <stop offset="100%" style={{"stopColour":"#023939", "stopOpacity":"100%"}} />
                                            </linearGradient>
                                        </defs>
                                </defs>
                                
                                {/* <image className='img-circle' onLoad={manageCanvas} xlinkHref={grid2} x='0' y="0" height="1000" width="1000" fill="" id="juh"/> */}
                                {/* <ScriptTag type="text/javascript" src="./js/resource.js"></ScriptTag> */}
                                {/* <g id="allCanvasContents"><rect  fill="url(#img122)" x="-1000" y="-1000" width="6000" height="6000" 
                                    style={{"cursor": "default"}}></rect><g id="allPaths"></g></g> */}
                            </svg>   
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div id="TopPropertiesBar">
                    <a href="#" id="fileTheDef" className="menubarButtons">File</a>
                    <a href="#" id="fileTheDef" className="menubarButtons">Edit</a>
                    <a href="#" id="fileTheDef" className="menubarButtons">Help</a>
                    <a href="#" id="saveTheDef" className="menubarButtons">Save</a>

                    <div id="minimizeUpperBar" style={{display: "block"}} onClick={onMinimizeClick}>
                        <i id="tominimize" className="fa fa-caret-up" aria-hidden="true"></i>
                    </div>
                    <div id="maximizeUpperBar" style={{display: "none"}} onClick={onMaximizeClick}>
                        <i id="tomaximize" className="fa fa-caret-up" aria-hidden="true" style={{transform: [{ rotate: '180deg'}]}}></i>
                    </div>
                </div>
            </div>
        )
    }
}


