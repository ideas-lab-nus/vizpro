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
        * [Setting inputs](#setting-inputs)
        * [Setting outputs](#setting-outputs)
    * [The main inputs](#the-main-inputs)
        * [Panel](#panel)
            * [Panel types](#panel-types)
        * [Slider](#slider)
        * [File Upload](#file-upload)
        * [Toggle](#toggle)
        * [List options](#list-options)
        * [List](#list)
* [Shallow components](#shallow-components)
    * [Setting up a shallow component](#setting-up-a-shallow-component)
    * [Shallow components input/output schema](#shallow-components-inputoutput-schema)
* [Deep components](#deep-components)
    * [Setting up a deep component](#setting-up-a-deep-component)
    * [Deep components input/output schema](#deep-component-inputoutput-schema)
    * [Connecting to the cloud](#connecting-to-the-cloud)
    * [Connecting to a local python file](#connecting-to-a-local-python-file)

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
 - Simply rendering the component gives you ability to work on the canvas as you require. Jump to [General Usage](#general-usage) to learn how to use this tool

### Saving a definition
 - Using the `save` button in the top bar, you can save your current definition in your browser's local storage. This saved definition will be accessible on refresh and even on emptied cache and hard reload

### Clearing a definition
 - Using the `clear` button in the top bar, any saved definition in local storage will be permanently removed

### Downloading a definition
 - Using the `download` button in the top bar, the current definition can downloaded to your local computer as a `json` file

### Opening a downloaded definition
 - By passing in a downloaded project `json` as `props` to the ToolName, the definition can re-instated and work continued

## General Usage

#### The component consists of 4 major sections:
 - The `Top Bar` gives you control over your definitions such as saving and clearing
 - The `Components Tab` on the left holds all the in-house components as well as user-defined ones. Components are categorized, and the current category can be toggled through the column at the right edge of this tab
 - The `Properties Tab` allows you to modify certain properties of select components, which can opened on double click of the specific component
 - The `Canvas` is where your components will be added and input/output modified as required

![image](https://user-images.githubusercontent.com/62249192/126463471-4fd5a475-b499-45ec-bc6c-ac517e257635.png)
*A look at the rendered tool*

### Creating a new component

A new component can be added onto the canvas by simply clicking on the relevant icon in the `Components Tab`. 
 - Hovering above component icons will identify each component with it's name.
 - Double cliicking select components, will open the `Properties Tab`

<img src="https://user-images.githubusercontent.com/62249192/126466397-e8150b06-facb-4bb2-8456-1a104c2e9e96.png" alt="drawing" height="700" width="800"/>

*Canvas state after adding a `Panel` and double clicking it*

#### Setting inputs
#### Setting outputs

### The main inputs
#### Panel
##### Panel types
#### Slider
#### File Upload
#### Toggle
#### List options
#### List

## Shallow components
### Setting up a shallow component
### Shallow components input/output schema

## Deep components
### Setting up a deep component
### Deep components input/output schema
### Connecting to the cloud
### Connecting to a local python file