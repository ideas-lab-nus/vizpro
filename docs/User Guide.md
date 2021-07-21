## Introduction

This is a React Component that serves as a fully fledged visual programming interface, ideal for simulation.
It can additionally be customized to a certain degree with user-defined functions on top of the host of base components provided for general use-cases.

## Table of Contents
* [Installation and Setup](#installation-and-setup)
* [Definitions](#definitions)
    * [Creating a new definition](#creating-a-new-definition)
    * [Saving a definition](#saving-a-definition)
    * [Clearing a definition](#clearing-a-definition)
    * [Downloading a definition](#downloading-a-definition)
    * [Opening a downloaded definition](#opening-a-downloaded-definition)
* [General Usage](#general-usage)
    * [Creating a new component](#creating-a-new-component)
    * [Setting inputs and outputs](#setting-inputs-and-outputs)
* [The Main Inputs](#the-main-inputs)
    * [Panel](#panel)
    * [Slider](#slider)
    * [Deep](#deep)
    * [File Upload](#file-upload)
    * [Toggle](#toggle)
    * [Option List](#option-list)
    * [List View](#list-view)
* [Shallow components](#shallow-components)
    * [Setting up a shallow component](#setting-up-a-shallow-component)
    * [Shallow components input/output schema](#shallow-components-inputoutput-schema)
* [Deep components](#deep-components)
    * [Setting up a deep component](#setting-up-a-deep-component)
    * [Deep components input/output schema](#deep-component-inputoutput-schema)
    * [Connecting to the cloud](#connecting-to-the-cloud)
    * [Connecting to local files](#connecting-to-local-files)

--------------------------------------------------------

## Installation and Setup

### For users with an existing React-based project

 - Use npm to install the package to the project
```
npm install --save {PackageName}
```
 - Import ToolName into the relevant file
```
import {ToolName} from '{PackageName}';
```

### For users with no existing project

 - The simplest and fastest way to get started is to use create-react-app with which you can set up a boilerplate React application. 

 - You’ll need to have [Node >= 10.16 and npm >= 5.6](https://nodejs.org/en/) on your machine. To create a project, run:

```
npx create-react-app my-app
cd my-app
npm start
```
 - In case you run into issues at this stage, you can read more about Create React App and React in depth [here](https://reactjs.org/docs/create-a-new-react-app.html)

 - Use npm to install the package to the project
```
npm install --save {PackageName}
```
 - Render the ToolName in `src/App.js` as shown;
```jsx
import React, { Component } from 'react'

import {ToolName} from '{PackageName}';

function App() {
  return (
    <ToolName />
  );
}
```
 - The localhost will automatically render the component on saving


## Definitions

#### A definition refers to the current project workspace you have created on the canvas. It includes the state of the canvas (inputs, components, connections etc.)

### Creating a new definition
 - Simply rendering the component gives you the ability to work on the canvas as you require. Jump to [General Usage](#general-usage) to learn how to use this tool

### Saving a definition
 - Using the `save` button in the top bar, you can save your current definition in your browser's local storage. This saved definition will be accessible on refresh and even on emptied cache and hard reload

### Clearing a definition
 - Using the `clear` button in the top bar, any saved definition in local storage will be permanently removed

### Downloading a definition
 - Using the `download` button in the top bar, the current definition can downloaded to your local computer as a `json` file

### Opening a downloaded definition
 - By passing in a downloaded project `json` as `props` to the ToolName, the definition can re-instated and work continued

## General Usage

#### The tool consists of 4 major sections:
 - The `Top Bar` gives you control over your definitions such as saving and clearing
 - The `Components Tab` on the left holds all the in-house components as well as user-defined ones. Components are categorized, and the current category can be toggled through the column at the right edge of this tab
 - The `Properties Tab` allows you to modify certain properties of select components, which can opened on double click of the specific component
 - The `Canvas` is where your components will be added and input/output modified as required

<p align="center">
<img src="https://user-images.githubusercontent.com/62249192/126499994-a29bf917-c9ca-4c4a-b72f-e017bfe3425d.png" alt="drawing" height="600" width="700"/>
</p>

<p style="text-align: center;">
A look at the rendered tool
</p>

### Creating a new component

A new component can be added onto the canvas by simply clicking on the relevant icon in the `Components Tab`. 
 - Hovering above component icons will identify each component with it's name.
 - Double cliicking select components, will open the `Properties Tab`

<p align="center">
<img src="https://user-images.githubusercontent.com/62249192/126466397-e8150b06-facb-4bb2-8456-1a104c2e9e96.png" alt="drawing" height="700" width="700"/>
</p>

<p style="text-align: center;">
Canvas state after adding a Panel and double clicking it
</p>

### Setting inputs and outputs

 - Flow of data from component to component can be set by connecting them with edges
 - Half circles on the right of a component represent output and left, input
 - An edge can be created by connecting these half circles
 - Edges can be deleted by selecting the red circle at the middle of a drawn edge

<p align="center">
<img src="https://user-images.githubusercontent.com/62249192/126503384-f5365f1e-85c4-4b7f-9ca4-94ff21b2062b.png" alt="drawing" height="200" width="700"/>
</p>

<p style="text-align: center;">
Slider output connected to a panel as input
</p>

## The Main Inputs

These are integral components that help with the input, selection and flow of data. They don't process input data according to a preset function like Shallow or Deep components.

### Panel

 - The `panel` can be used to input a variety of types including `text`, `json`, `html`, `list` and `plot`
    - `text` - Accepts free user input as string
    - `json` - Renders a visual tree view provided a valid object
    - `html` - Renders the given html provided it is valid
    - `list` - Accepts a list of values
    - `plot` - Renders a plot of the given input. Refer the plotly [site](https://plotly.com/javascript/) for formatting

<p align="center">
<img src="https://user-images.githubusercontent.com/62249192/126517678-908cf801-bb32-4fc9-b267-fa105d1066dc.png" alt="drawing" height="400" width="600"/>
</p>

<p style="text-align: center;">
The Panel Component and its Properties Tab
</p>

### Slider

 - The `slider` allows a sliding numerical input useful for simulation purposes
 - The `min`, `max`, `step` and `current value` can be set through the Properties Tab

<p align="center">
<img src="https://user-images.githubusercontent.com/62249192/126518189-c62a9134-c067-4928-a862-e9e18e16224d.png" alt="drawing" height="290" width="600"/>
</p>

<p style="text-align: center;">
The Slider Component and its Properties Tab
</p>

### Deep

 - The `deep` component is used when the function that is to be to run is either in the cloud or located as a local file accessible via the project backend. 
 - `input list` - Takes in the name of each input separated by a newline
 - `url`        - The url to which the GET request is routed to
 - More about setting up and usage at [Deep Components](#deep-components)

<p align="center">
<img src="https://user-images.githubusercontent.com/62249192/126520160-5f9202e8-152c-4e5a-ae27-194755752dde.png" alt="drawing" height="400" width="600"/>
</p>

<p style="text-align: center;">
The Deep Component and its Properties Tab
</p>

### File Upload

 - The `file upload` component allows local files to be uploaded
 - Uploaded files will saved in local storage until the project definition is cleared

<p align="center">
<img src="https://user-images.githubusercontent.com/62249192/126522037-c2454712-979e-40de-9464-f15c01c1be19.png" alt="drawing" height="300" width="500"/>
</p>

<p style="text-align: center;">
The File Upload Component
</p>

### Toggle

 - The `toggle` provides a basic true/false input when connected
 - The boolean toggles on double click

<p align="center">
<img src="https://user-images.githubusercontent.com/62249192/126522335-51829418-c7a6-4d43-af15-ad754bcaf35d.png" alt="drawing" height="300" width="500"/>
</p>

<p style="text-align: center;">
The Toggle Component
</p>

### Option List

- The `option list` provides a dropdown of options of which one can be selected
- The dropdown can specified as a list in a `panel` and connected to the `option list` input

<p align="center">
<img src="https://user-images.githubusercontent.com/62249192/126523370-cce179af-0f2e-408d-a16b-6d424590c70c.png" alt="drawing" height="300" width="500"/>
</p>

<p style="text-align: center;">
The Option List Component
</p>

### List View

- The `list view` functions similar to the `option list` but it allows multiple option selection and is rendered as a json tree view by default

<p align="center">
<img src="https://user-images.githubusercontent.com/62249192/126523764-c82cf85b-51e9-42b7-8029-77aafe6eab0a.png" alt="drawing" height="300" width="500"/>
</p>

<p style="text-align: center;">
The List View Component
</p>


## Shallow components
### Setting up a shallow component
### Shallow components input/output schema

## Deep components
### Setting up a deep component
### Deep components input/output schema
### Connecting to the cloud
### Connecting to local files