import {addCircle} from './handle.js';
const globalVars = {
    initEdgex1: 0,
    initEdgey1: 0,
    fromCircle: addCircle(),
    toCircle: addCircle(),
    selection_rectangle_group_rect: null,
    doubleClicked: false,
    date:"km now",
    IDLE_COLOR: "#dfd4b1",
    ACTIVE_COLOR: "green",
    ERROR_COLOR: "red",
    COMPONENT_RADIUS: 1,
    allComp: [],
    allEdges: [],
    comp_input_edges: {},
    comp_output_edges: {},
    edge_comp_matrix: {},
    parent_child_matrix: {},
    parent_child_matrix_fast_check: [],
    root_components: {},
    components_selection_data: {},
    selected_components: [],
    runDeep: false,
    StringAnchorclicked: false,
    StringAnchorType: null,
    StringAnchorId: "",
    XANCHOR: 0,
    YANCHOR: 1,
    XYANCHOR: 2,
    ANCHOR_WIDTH: 10,
    SLIDER_START_POSITION: 60 - 60,
    SLIDER_END_POSITION: 238 - 60,
    anchorMouseXpos: 0,
    anchorMouseYpos: 0,
    SliderAnchorclicked: false,
    selectedSliderComponent: null,
    dragX: 0,
    dragY: 0,
    sliderRectId: "",
    componentClickX: 0,
    componentClickY: 0,
    initPos: null,
    startDrag: false,
    clickedId: "",
    rectType: "",
    deltaX: 0,
    deltaY: 0,
    clicked: false,
    edgeStarted: false,
    targetcircleIN: false,
    selectedcircleId: "",
    targetcircleId: "",
    selectedSliderAnchorId: "",
    xGrid: 0,
    yGrid: 0,
    mousex: 0,
    mousey: 0,
    
    // text global variables.
    textareaStarted: false,
    textAreaRectId: "",
    optionListStarted: false,
    optionlistRectid: "",
    justSelected: null,
    mouseInsideOption: false,

    //selected component variables.
    is_component_selected: false,
    selected_component_id: "",
    rightColumnIsSelected: false,
    leftColumnIsSelected: false,
    topColumnIsSelected: false,
    rightColIsdisplayed: true,
    leftColIsdisplayed: true,
    is_edge_selected: false,
    currentTopBarHeight: 30,
    currentLeftColWidth: 225,
    currentRightColWidth: 50,
    defVars: {},
    messageshown: false,
    dataLoad: 0,
}

export {globalVars};