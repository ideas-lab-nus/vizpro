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

This is the React Component that represents the tool. It comprises of 3 sub-components, namely `Grid`, `TopBar` and `LeftContainer` which are all defined and imported from the `./CanvasComponent` folder. The `LeftContainer` also has 2 sub-components, which are `ComponentTab` and `PropertyTab`.

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
- The main grid supports zoom and drag operations that allows users to have many components in one definition. These operations are handled by `manageGrid()` function in `src/components/logic/mainGrid.js`.

---

### `TopBar` Component

> Location : `src/components/CanvasComponent/TopBar.js`

- The `TopBar` has 5 different buttons, which are
    - `Help`: Direct user to the User Guide page.
    - `Save`: Save a definition to the browser's local storage so that the definition is not deleted after the page is reloaded.
    - `Clear`: Clear all the data that is saved in the local storage and automatically reload the page with a blank canvas.
    - `Download`: Similar to `Save` but the data is stored in the user's local computer in JSON format.
    - `Upload`: Open a definition that is previously downloaded from a local computer.

- All the functions that handle these events are located in `src/components/logic/saveAndLoadData.js`.

- There is also a toggle button in the top right corner that allow users to hide and expose the `TopBar`. These actions are handled by `onMinimizeClick()` and `onMaximizeClick()` functions in `src/components/logic/layout.js`.

---

### `LeftContainer` Component

> Location : `src/components/CanvasComponent/LeftContainer.js`

- The `LeftContainer` comprises of 2 sub-components, namely `ComponentTab` and `PropertyBar`.

---

### `ComponentTab` Component

> Location : `src/components/CanvasComponent/ComponentTab.js`

- The `ComponentTab` contains all the information about the pre-defined components and user-defined components.
- The toggle buttons on the right reprensents the categories of the components. There are 4 categories:
    - Basic: Contains 10 components: `Average`, `Add`, `Min`, `Max`, `Difference 2`, `JSON navigator`, `3d Visualizer`, `Image Display`, `YouTube Display` and `Plot Panel`.
    - User Definitions: Contains all components that are defined by users.
    - String Operations: Contains 2 components: `String To List` and `Replace`.
    - Main Inputs: Contains 7 integral components that help with input, output and flow of data: `Slider`, `Panel`, `Toggle`, `Option List`, `List View`, `File Upload` and `Deep`.
- All the components under `Basic` and `String Operations` categories are shallow generic components. 
    - The creation of these components are handled in `src/components/logic/mainComponents/component.js`.
    - The information about these components (name, color, input list, output list, etc) are stored in form of JSON in `src/components/logic/componentDetails.js`.
    - The functions that handle the flow input and output for these shallow components are located in `src/components/logic/shallow.js`. When the output of the shallow components is connected, the function `calculateShallow(compId)`, where `compId` is the ID of the selected components, is called. Then, based on the name of the components and mapping that is defined by `shallow_functions` variable, respective function is called to handle the input and return the output.
- The creation and handler of user events of all the main inputs are handled by `src/components/logic/mainComponent/mainComponent.js`.

---

### `PropertiesTab` Component

> Location : `src/components/CanvasComponent/PropertiesTab.js`

- Only `Slider`, `Panel`, `Option List` and `Deep` components have the `PropertyTab`.
- The `PropertyTab` is appeared by double clicking the component.
- The `PropertyTab` allows user to change the value that is displayed in these components.
- The content of the `PropertyTab` of these components are different from each other:
    - `Slider`: min value input, max value input, step input and current value input.
    - `Panel`: panel name input, display value input, panel type button (`text`, `html`, `json`, `list`, `panel`)
    - `Option List`: option list dictionary input, preview session and log output.
    - `Deep`: function name input, input list and deep function URL input.
- The double click event of these components is handled by `handleDoubleClick()` function in ``src/components/logic/handle.js`.

---

## D3.js

