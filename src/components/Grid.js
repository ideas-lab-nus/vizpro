import React, { Component } from 'react';
import grid2 from './img/grid2.png';

export default class Grid extends Component {
    render() {
        return (
            <svg height="10000" width="10000" >
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
            </svg>   
        )
    }
}
