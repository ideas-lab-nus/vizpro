# Developer Guide

This guide dives into how this package is constructed. 

While React is used to organize the structure of the application, d3.js is the main library working behind the scenes that allows the creation of components and handles all the visualization aspects.

React is incorporated to allow this application to be packaged and served on npm easily.

If you're here in pursuit of adding or modifying functionality of the visual programming interface, you can skip to [D3.js](#d3js) where the most of the logic sits. It is still recommended to read the [React](#react) segment as well to grasp a complete idea of how this tool works :)

---

## React

### Export

The `Canvas` component is exported from the package within `src/index.js`

---

### `Canvas` Component

> Location : `src/components/Canvas.js`

This is the React Component that represents the tool. It comprises of 3 sub-components, namely the  `Grid`, `TopBar` and `LeftContainer` which are all defined and imported from the `./CanvasComponent` folder. The `LeftContainer` also has 2 sub-components, which are `ComponentTab` and `PropertyTab`.

The entire state of the application is stored and bound to this component.

Within the constructor, all required javascript functions are bound to the component, such that these functions have access to the react context (and thereby state) at runtime.

As the component is first mounted, initialization functions are run:

 - `addAllUdo` : Adds any user-defined components that are passed in as props
 - `manageCanvas` : Initialises the grid with relevant event listeners
 - `loadData` : Loads existing project data from local storage if available
 - `addGenericComponentIcon` : Adds icons for defined components
 - `addRightToggleButton` : Add the category toggle buttons
 - `loadScript` : Loads plotly.js for plotting

Within the render function, functions that are to be re-run on state change are called and the component is rendered comprising of the aforementioned sub-components. 

**Note:** Bound functions are passed as props into these sub-components. They cannot be directly imported from a sub-component as it will not have access to state.

---

### `Grid` Component

> Location : `src/components/CanvasComponent/Grid.js`
- The main grid is where all the components and edges are added for simulation.
- The main grid supports zoom and drag operations that allows users to have many components in one definition. These operations are handled by the `manageGrid()` function in `src/components/logic/mainGrid.js`.

---

### `TopBar` Component

> Location : `src/components/CanvasComponent/TopBar.js`

- The `TopBar` has 5 different buttons :
    - `Help`: Direct user to the User Guide page.
    - `Save`: Save a definition to the browser's local storage so that the definition is not deleted after the page is reloaded.
    - `Clear`: Clear all the data that is saved in the local storage and automatically reload the page with a blank canvas.
    - `Download`: Similar to `Save` but the data is stored in the user's local computer in JSON format.
    - `Upload`: Open a definition that is previously downloaded from a local computer.

- All the functions that handle these events are located in `src/components/logic/saveAndLoadData.js`.

- There is also a toggle button in the top right corner that allow users to hide and expose the `TopBar`. These actions are handled by the `onMinimizeClick()` and `onMaximizeClick()` functions in `src/components/logic/layout.js`.

---

### `LeftContainer` Component

> Location : `src/components/CanvasComponent/LeftContainer.js`

- The `LeftContainer` comprises of 2 sub-components, namely `ComponentTab` and `PropertyTab`.

---

### `ComponentTab` Component

> Location : `src/components/CanvasComponent/ComponentTab.js`

- The `ComponentTab` contains all the information about the pre-defined components and user-defined components.
- The toggle buttons on the right represents the categories of the components. There are 4 categories:

    - Basic : Contains 10 components :-
        - `Average`, `Add`, `Min`, `Max`, `Difference 2`, `JSON navigator`, `3d Visualizer`, `Image Display`, `YouTube Display` and `Plot Panel`.
    - User Definitions : Contains all components that are defined by users.
    - String Operations : Contains 2 components :-
        - `String To List` and `Replace`.
    - Main Inputs : Contains 7 integral components that help with input, output and flow of data :-
        - `Slider`, `Panel`, `Toggle`, `Option List`, `List View`, `File Upload` and `Deep`.

- All the components under `Basic` and `String Operations` categories are shallow generic components. 

    - The creation of these components are handled in `src/components/logic/mainComponents/component.js`.
    - The information about these components (the component JSONs) are stored in `src/components/logic/componentDetails.js`.
    - The functions that correspond to these shallow components are located in `src/components/logic/shallow.js`. 
    - When a shallow component is active (outputs are connected), the function `calculateShallow(compId)`, where `compId` is the ID of the selected component, is called. 
    - The mapping between the name of the component and its function, is defined by the `shallow_functions` variable.
    - The respective function is called to process the input and return an output.

- The creation and handling of all the main inputs are done within the `src/components/logic/mainComponent/` folder.

---

### `PropertiesTab` Component

> Location : `src/components/CanvasComponent/PropertiesTab.js`

 - Only `Slider`, `Panel`, `Option List` and `Deep` components have the `PropertyTab`.
 - The `PropertyTab` appears when a component is double clicked.
 - The `PropertyTab` allows the user to change values that are displayed and used within these components.
 - The content of the `PropertyTab` of these components vary by component:
    - `Slider` :
        - Min value
        - Max value
        - Step
        - Current value
    - `Panel` : 
        - Panel name
        - Display value
        - Panel type button (`text`, `html`, `json`, `list`, `panel`)
    - `Option List` : 
        - Option List dictionary
        - Preview session
        - Log output
    - `Deep` : 
        - Function name
        - Input list
        - Deep function URL
 - The application of these properties are handled by a `submit{Component}Edit()` function that is defined inside the respective Component file inside the `src/components/logic/mainComponent/` folder.
 - The double click event of these components is handled by `handleDoubleClick()` function in `src/components/logic/handle.js`.

---

## D3.js

All d3.js logic is within the `src/components/logic/` folder. Note that paths referenced in this section are relative to this `logic` folder.

### `constants.js`

The dictionary representing the initial state of a project is created and exported for use in the `Canvas` component. All the required state variables are maintained within this dictionary.

### `componentDetail.js`

The component JSONs for the pre-defined shallow functions are declared. In addition, data for the category toggle buttons are defined as well.

### `mainGrid.js`

The function `manageGrid` is defined which handles mouse events on the grid and relates it to the state such as a startDrag, edgeStarted or textAreaStarted. Functions to handle alignment are also defined.

### `layout.js`

The function `manageCanvas` is defined which adds the zoom event listener to the grid and also the `onMaximizeClick` and `onMinimizeClick` functions.

### `handle.js`

Four critical functions are defined:

 - `handleTheClickOnAllComponents` : Sets the appropriate states when a mousedown event occurs on any component.
 - `handleEdgeInitialization` : Handles the creation of an edge if drag was started and stopped on an input and output. 
 - `handleComponentSelection` : Defines different onClick event listeners for each component type.
 - `handleDoubleClick` : Handles the property tab opening on double click and application of changed properties.

### `leftPropertyBar.js`

Includes functions that adds in the toggle buttons in the `ComponentTab` and also adds the component icons to the relevant categories.

### `userDefinedObject.js`

Handles the addition of user defined functions to the `User Definitions` category of the `ComponentTab`.

### `saveAndLoadData.js`

All the functionality provided by the `TopBar` component is included here. 

Downloading of the project JSON, reading local storage and recreating provided data is accomplished here.

### `deep.js`, `shallow.js`

These 2 files handle the running of the relevant function when a component is active.

`deep.js` makes the GET request to the provided url with the parameters and returns the response while `shallow.js` runs the respective function in real-time.

### `functions.js`

This file contains a host of utility functions.

Since most of these utilities require access to the state of the project, a dummy function (`dummyToSetState`) has been introduced to set a local state within this file for the functions to refer to when called.

A few of the critical functions are :

 - `selectComp` : Given a GUID, it returns the component JSON
 - `redrawDependents` : Redraws the entire project with respect to the `parent_child_matrix`
 - `updateShallowCompRender` : Renders the results of a shallow component
 - `handleEdgeMovement` : Reconstructs the path of an edge when either connection is moved
 - `deleteComponent` : Deletes all traces of a component from all the state variables
 - `deleteEdge` : Deletes the selected the edge and updated parent-child relationships accordingly

### `mainComponents/`

All the main input components are defined within this folder. `component.js` refers to a generic component.

In addition, `mainComponents.js` collates all the exports for ease of use in the other files as these functions are usually used together.