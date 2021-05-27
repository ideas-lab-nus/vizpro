import React, { Component } from 'react'
import {onMaximizeClick, onMinimizeClick, manageCanvas} from './js/layout.js';
import {CreateNewSlider} from './js/slider.js';
import grid2 from './img/grid2.png';   
import {setCurrentCagegory, showThisPanel} from './js/insert.js';                             

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

                    <div id="minimizeUpperBar" style={{display: "block"}} onClick={() => onMinimizeClick()}>
                        <i id="tominimize" className="fa fa-caret-up" aria-hidden="true"></i>
                    </div>
                    <div id="maximizeUpperBar" style={{display: "none"}} onClick={() => onMaximizeClick()}>
                        <i id="tomaximize" className="fa fa-caret-up" aria-hidden="true" style={{transform: [{ rotate: '180deg'}]}}></i>
                    </div>
                </div>

                <div id="LeftPropertiesBar" style={{top: "30px"}}>
                    <div id="leftbarcontainer">
                        <div id="toolbar_container_1" className="toolBarContainer 1">

                            <div id="toolbar_container_1_1" className="toolBarContainer 1 1">
                                <div id="toolbar_container_1_1_1" className="toolbarTopToggleContainer">
                                    <div className="toolbarTopToggleItem 1">
                                        <div className="toptoggleitem b066a5eb-26dc-4359-8d22-3643444d08e4 00492f59-092c-4ee5-affb-8a5e36495e59 selected" 
                                        onClick={() => showThisPanel('b066a5eb-26dc-4359-8d22-3643444d08e4', '00492f59-092c-4ee5-affb-8a5e36495e59')}> 
                                            Components
                                        </div>
                                    </div>
                                        
                                    <div className="toolbarTopToggleItem 1">
                                        <div className="toptoggleitem b066a5eb-26dc-4359-8d22-3643444d08e4 7beee7af-f0e0-48fe-8827-a372bf8877a0" 
                                        onClick={() => showThisPanel('b066a5eb-26dc-4359-8d22-3643444d08e4', '7beee7af-f0e0-48fe-8827-a372bf8877a0')}> 
                                            Layout
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="toolbar_container_1_2" className="TabToolBox b066a5eb-26dc-4359-8d22-3643444d08e4 00492f59-092c-4ee5-affb-8a5e36495e59">
                                <div id="toolbar_container_1_2_0" className="toolbarbuttonsContainer">
                                    &nbsp; Components 
                                    <span className="currentTab b066a5eb-26dc-4359-8d22-3643444d08e4">&nbsp;</span> 
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 d2312a8b-63dc-4112-8a66-76996c150b0e 0" style={{display:"none"}}>
                                        
                                    <div id="addComp" name="Average" shname="AVG" desc="The average between two values" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/958f17e5cfad4cdbbe26dd5affbbbfa2.png)"}}>&nbsp;<span id="hint">Average</span></div>
                                        
                                    <div id="addComp" name="Add" shname="+" desc="Add two numbers." type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/e2c5a0d28dca45c38b0e96e6723e2bde.png)"}}>&nbsp;<span id="hint">Add</span></div>
                                        
                                    <div id="addComp" name="Max" shname="max" desc="Maximum value of a list of inputs." type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/96524490dcdf4317a9a3e80b9d4762ba.png)"}}>&nbsp;<span id="hint">Max</span></div>
                                        
                                    <div id="addComp" name="Min" shname="min" desc="Minimum value of a list of inputs" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/5d844dbee9f54f9ba9891082ac8a52c5.png)"}}>&nbsp;<span id="hint">Min</span></div>
                                        
                                    <div id="addComp" name="Difference 2" shname="Difference" desc="Substraction" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/f4fbd2bace8d4fb6b8982ccfaf310f63.png)"}}>&nbsp;<span id="hint">Difference 2</span></div>
                                                        
                                    <div id="addComp" name="Json Navigator" shname="jsonNav" desc="Select item from json object by path" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Json Navigator</div>
                                                    
                                    <div id="addComp" name="3dVisualizer" shname="3dvis" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>3dVisualizer</div>
                                        
                                    <div id="addComp" name="Image Display" shname="imshow" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Image Display</div>
                                        
                                    <div id="addComp" name="YouTube display" shname="YouTube" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>YouTube display</div>
                                            
                                    <div id="addComp" name="Plot Panel" shname="plot panel" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Plot Panel</div>
                                        
                                    <div id="addComp" name="Cloud" shname="Cloud" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Cloud</div>
                                    
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 094290f2-edaf-4396-b7b9-098ff208257f -1" style={{display:"none"}}>
                                    
                                    <div id="addComp" name="BuildingSimulationModel" shname="BSimM" desc="Integrate cloud simulation into BuildSim&#x27;s automated workflow" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/a65cdbfc93a7436c9c8c83308ed9b100.png)"}}>&nbsp;<span id="hint">BuildingSimulationModel</span></div>
                                        
                                    <div id="addComp" name="HVAC" shname="hvac" desc="Heating, ventilation, and air conditioning (HVAC) is the technology of indoor and vehicular environmental comfort." type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/784e631b9ba748f28eba825362b3add9.png)"}}>&nbsp;<span id="hint">HVAC</span></div>
                                                    
                                    <div id="addComp" name="BSH Project Model List" shname="bshPrj" desc="Get list of models under a project" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH Project Model List</div>
                                        
                                    <div id="addComp" name="BSH Model Commits" shname="bshModelCommits" desc="Access a model commit" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH Model Commits</div>
                                        
                                    <div id="addComp" name="BSH Run" shname="bsh_run" desc="Run simulation job" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH Run</div>
                                        
                                    <div id="addComp" name="BSH 3D Viewer" shname="3dviewer" desc="track_token" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH 3D Viewer</div>
                                        
                                    <div id="addComp" name="Draw 3d Model" shname="None" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Draw 3d Model</div>
                                                                
                                    <div id="addComp" name="BSH Get Model Details" shname="ModelDetails" desc="Retrieves model info and simulation results." type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH Get Model Details</div>
                                        
                                    <div id="addComp" name="BSH Parametric Study" shname="parametric_study" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH Parametric Study</div>
                                        
                                    <div id="addComp" name="BSH Spatial Representation" shname="SpatialRepr" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>BSH Spatial Representation</div>
                                        
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 11b3c35e-76a6-4c6b-8743-e86fe7f02403 -1" style={{display:"none"}}>
                                                    
                                    <div id="addComp" name="get OsiSoft" shname="get OsiSoft" desc="get data from a url" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>get OsiSoft</div>
                                                
                                    <div id="addComp" name="Get Data Tree" shname="getDTr" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>Get Data Tree</div>
                                        
                                    <div id="addComp" name="OSI Get Data List" shname="getDList" desc="Main function to get the list of nodes of different levels. 

            Arguments:
                    url {string} -- url to the piwebapi asset server" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>OSI Get Data List</div>
                                        
                                    <div id="addComp" name="OSI Get Attribute" shname="osi_getAttribute" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>OSI Get Attribute</div>
                                        
                                    <div id="addComp" name="OSI_StartTime" shname="starttime" desc="{&quot;Last_1_hours&quot;:&quot;-1h&quot;,&quot;Last_6_hours&quot;:&quot;-6h&quot;,&quot;Last_12_hours&quot;:&quot;-12h&quot;,&quot;Last_24_hours&quot;:&quot;-24h&quot;,&quot;Last_7_days&quot;:&quot;-7d&quot;,&quot;Last_15_days&quot;:&quot;-15d&quot;,&quot;Last_30_days&quot;:&quot;-30d&quot;,&quot;This_Year&quot;:&quot;01/01&quot;}" type="optionList" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>OSI_StartTime</div>
                                        
                                    <div id="addComp" name="OSI End Time" shname="osi_endTime" desc="{&quot;Now&quot;:&quot;*&quot;,&quot;Last_1_hours&quot;:&quot;*-1h&quot;,&quot;Last_6_hours&quot;:&quot;*-6h&quot;,&quot;Last_12_hours&quot;:&quot;*-12h&quot;,&quot;Last_24_hours&quot;:&quot;*-24h&quot;,&quot;Last_7_days&quot;:&quot;*-7d&quot;,&quot;Last_15_days&quot;:&quot;*-15d&quot;,
            &quot;Last_30_days&quot;:&quot;*-30d&quot;}" type="optionList" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>OSI End Time</div>
                                        
                                    <div id="addComp" name="OSI Extract TimeSeries Data" shname="timeSeriesData" desc="Extract timeseries data from a record" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>OSI Extract TimeSeries Data</div>
                                                        
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 c0e53dd4-d351-4f87-9ef9-219fe3b108a4 -1" style={{display:"none"}}>
                                                                                
                                    <div id="addComp" name="PANDAS DataFrame" shname="pd_dataFrame" desc="" type="component" dftype="dp" className="mainButtonItem 1 1" style={{backgroundImage: "url()"}}>PANDAS DataFrame</div>
                                                        
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 d3903696-cae5-4b0c-b6c0-0f57649e9253 -1" style={{display:"none"}}>
                                            
                                    <div id="addComp" name="String_to_List" shname="str2list" desc="Converts a list-like string into a list object." type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/9c0712eb82084d33af0519131126d0e7.png)"}}>&nbsp;<span id="hint">String_to_List</span></div>
                                                                        
                                    <div id="addComp" name="Replace" shname="replace" desc="" type="component" dftype="shlow" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/c5571f6199314a3daf2186534a545b13.png)"}}>&nbsp;<span id="hint">Replace</span></div>
                                                    
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 4949e5ab-6a97-4eed-b8a6-775b65053e41 0">
                                    
                                    <div id="addSlider" onClick={CreateNewSlider} className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/983/983840.png)"}}>&nbsp;<span id="hint">Slider</span></div>
                                    <div id="addString" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/2274978.png)"}}>&nbsp;<span id="hint">Panel</span></div>
                                    <div id="addToggle" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/1465/1465907.png)"}}>&nbsp;<span id="hint">Toggle</span></div>
                                    <div id="addOptionList" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/1085/1085805.png)"}}>&nbsp;<span id="hint">Option list</span></div>
                                    <div id="addListView" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/main_icons/checklist.png)"}}>&nbsp;<span id="hint">List view</span></div>
                                    <div id="addFile" className="mainButtonItem 1 1" style={{backgroundImage: "url(https://image.flaticon.com/icons/png/512/2329/2329379.png)"}}>&nbsp;<span id="hint">File upload</span></div>
                                    
                                </div>
                                
                                <div id="toolbar_container_1_2_2" className="toolbarRightToggleNavigator">
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/7e35adc61ca94a94b72d205029bbaf55.png)"}} onClick={() => setCurrentCagegory('b066a5eb-26dc-4359-8d22-3643444d08e4', 'd2312a8b-63dc-4112-8a66-76996c150b0e', 'Basic')}><span id="hint">Basic</span></div>
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/builsimhub.png)"}} onClick={() => setCurrentCagegory('b066a5eb-26dc-4359-8d22-3643444d08e4', '094290f2-edaf-4396-b7b9-098ff208257f', 'BuildSimHub')}><span id="hint">BuildSimHub</span></div>
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/osisoft.png)"}} onClick={() => setCurrentCagegory('b066a5eb-26dc-4359-8d22-3643444d08e4', '11b3c35e-76a6-4c6b-8743-e86fe7f02403', 'OsiSoft')}><span id="hint">OsiSoft</span></div>
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/958e37827b33418ea03f1e9875c7aa39.png)"}} onClick={() => setCurrentCagegory('b066a5eb-26dc-4359-8d22-3643444d08e4', 'c0e53dd4-d351-4f87-9ef9-219fe3b108a4', 'Pandas')}><span id="hint">Pandas</span></div>
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/00cebc445ced4d8d89cf842609040d43.png)"}} onclick={() => setCurrentCagegory('b066a5eb-26dc-4359-8d22-3643444d08e4', 'd3903696-cae5-4b0c-b6c0-0f57649e9253', 'String Operations')}><span id="hint">String Operations</span></div>
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/input.png)"}} onClick={() => setCurrentCagegory('b066a5eb-26dc-4359-8d22-3643444d08e4', '4949e5ab-6a97-4eed-b8a6-775b65053e41', 'Main Inputs')}><span id="hint">Main Inputs</span></div>
                                    
                                </div>
                            </div>


                                
                            <div id="toolbar_container_1_2" className="TabToolBox b066a5eb-26dc-4359-8d22-3643444d08e4 7beee7af-f0e0-48fe-8827-a372bf8877a0" style={{display:"none"}}>
                                
                                <div id="toolbar_container_1_2_0" className="toolbarbuttonsContainer">
                                    &nbsp; Layout  <span className="currentTab b066a5eb-26dc-4359-8d22-3643444d08e4">&nbsp;</span> 
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 d2312a8b-63dc-4112-8a66-76996c150b0e 0" style={{display:"none"}}>
                                        
                                    <div className="mainButtonItem 1 1">Average</div>
                                    
                                    <div className="mainButtonItem 1 1">Add</div>
                                        
                                    <div className="mainButtonItem 1 1">Max</div>
                                    
                                    <div className="mainButtonItem 1 1">Min</div>
                                    
                                    <div className="mainButtonItem 1 1">Difference 2</div>
                                                    
                                    <div className="mainButtonItem 1 1">Json Navigator</div>
                                                
                                    <div className="mainButtonItem 1 1">3dVisualizer</div>
                                    
                                    <div className="mainButtonItem 1 1">Image Display</div>
                                    
                                    <div className="mainButtonItem 1 1">YouTube display</div>
                                        
                                    <div className="mainButtonItem 1 1">Plot Panel</div>
                                        
                                    <div className="mainButtonItem 1 1">Cloud</div>
                                    
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer b066a5eb-26dc-4359-8d22-3643444d08e4 11b3c35e-76a6-4c6b-8743-e86fe7f02403 -1" style={{display:"none"}}>
                                                    
                                    <div className="mainButtonItem 1 1">get OsiSoft</div>
                                                
                                    <div className="mainButtonItem 1 1">Get Data Tree</div>
                                    
                                    <div className="mainButtonItem 1 1">OSI Get Data List</div>
                                        
                                    <div className="mainButtonItem 1 1">OSI Get Attribute</div>
                                    
                                    <div className="mainButtonItem 1 1">OSI_StartTime</div>
                                    
                                    <div className="mainButtonItem 1 1">OSI End Time</div>
                                    
                                    <div className="mainButtonItem 1 1">OSI Extract TimeSeries Data</div>
                                                        
                                </div>
                                
                                <div id="toolbar_container_1_2_2" className="toolbarRightToggleNavigator">
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/7e35adc61ca94a94b72d205029bbaf55.png)" }}><span id="hint">Basic</span></div>
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/osisoft.png)"}}><span id="hint">OsiSoft</span></div>
                                    
                                </div>
                                
                            </div>
                                
                        </div>
                    </div>
                    
                    <div id="leftbarcontainer">
                        <div id="toolbar_container_1" className="toolBarContainer 1">
                            <div id="toolbar_container_1_1" className="toolBarContainer 1 1">
                                <div id="toolbar_container_1_1_1" className="toolbarTopToggleContainer">
                                        
                                    <div className="toolbarTopToggleItem 1">
                                        <div className="toptoggleitem 99098379-d5ab-4bc3-bc0e-b8353c952845 f56e635d-c2a6-48ec-9b93-26b76b890390 selected" onClick={showThisPanel('99098379-d5ab-4bc3-bc0e-b8353c952845', 'f56e635d-c2a6-48ec-9b93-26b76b890390')}> Properties</div>
                                    </div>
                                    
                                </div>
                            </div>
                                
                            <div id="toolbar_container_1_2" className="TabToolBox 99098379-d5ab-4bc3-bc0e-b8353c952845 f56e635d-c2a6-48ec-9b93-26b76b890390">
                                
                                <div id="toolbar_container_1_2_0" className="toolbarbuttonsContainer">
                                    &nbsp; Properties <span className="currentTab 99098379-d5ab-4bc3-bc0e-b8353c952845">&nbsp;</span> 
                                </div>
                                
                                <div id="toolbar_container_1_2_1" className="toolbarbuttonsContainer 99098379-d5ab-4bc3-bc0e-b8353c952845 140dfea1-7a19-4663-a905-38ff58c8c82f 0">
                                                                                                    
                                </div>
                                
                                <div id="toolbar_container_1_2_2" className="toolbarRightToggleNavigator">
                                    
                                    <div className="rightToggleButton 1" style={{backgroundImage: "url(https://storage.googleapis.com/ghostbucket111/icons/404b5524d84a49838ce63a1fe8a2b7e7.png)"}} onclick={() => setCurrentCagegory('99098379-d5ab-4bc3-bc0e-b8353c952845', '140dfea1-7a19-4663-a905-38ff58c8c82f', 'Properties')}><span id="hint">Properties</span></div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}