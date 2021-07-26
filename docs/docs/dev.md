# Developer Guide

This guide dives into how this package is constructed. 

While React is used to organize the structure of the application, d3.js is the main library working behind the scenes that allows the creation of components and handles all the visualization aspects.

React was incorporated to allow this application to be packaged and served on npm easily.

If you're here in pursuit of adding or modifying functionality of the visual programming interface, you can skip to [D3.js](#d3js) where the most of the logic sits. It is still recommended to read the [React](#react) segment as well to grasp a complete idea of how this tool works :)

---

## React

### Export

The `Canvas` component is exported from the package within `src/index.js`

---

### `Canvas` Component

> Location : `src/components.Canvas.js`

This is the React Component that represents the tool. It comprises of 3 sub-components, namely `Grid`, `TopBar` and `LeftContainer` which are all defined and imported from the `./CanvasComponent` folder.

The entire state of the application is stored and bound to this component.

Within the constructor, all required javascript functions are bound to the component, such that these functions have access to the react context (and thereby state) at runtime.

As the component is first mounted, initialization functions are run:

 - `addAllUdo` : Adds any user defined components that are passed in as props
 - `manageCanvas` : Initialises the grid with relevant event listeners
 - `loadData` : Loads existing project data from local storage if available
 - `addGenericComponentIcon` : Adds icons for defined components
 - `addRightToggleButton` : Add the category toggle buttons
 - `loadScript` : Loads plotly.js for plotting

Within the render function, functions that are to be re-run on state change are called and the component is rendered comprising of the aforementioned sub-components. 

Note: Bound functions are passed as props into these sub-components. They cannot be directly imported from a sub-component as it will not have access to state.

---

### `Grid` Component

> Location : `src/components/CanvasComponent/Grid.js`

---

### `TopBar` Component

> Location : `src/components/CanvasComponent/TopBar.js`

---

### `LeftContainer` Component

> Location : `src/components/CanvasComponent/LeftContainer.js`

---

### `ComponentTab` Component

> Location : `src/components/CanvasComponent/ComponentTab.js`

---

### `PropertiesTab` Component

> Location : `src/components/CanvasComponent/PropertiesTab.js`

---

## D3.js

