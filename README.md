# Data Visualization
> A React library that allows users to visualize data

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save viz-vimuth
```

## Usage

```jsx
import React, { Component } from 'react'

import { Canvas } from 'viz-vimuth';

function App() {
  return (
    <Canvas />
  );
}
```

## Development and Testing:

`playground` is an internal cra that should be used to test this React Component Library that
currently exports the component `Canvas`

Run at root:
1. `npm update && npm run build`
2. `npm run i-all` (This runs `npm install` for both the base and playground)
3. `npm run dev` (This builds the library to `dist` folder and starts the playground)

## Issues to address:

-   \*\* Call to cloud function url is blocked by CORS issue. Temp workaround -> Install Chrome CORS extension
-   \*\* Request for cloud function is sync. Make it async and add a `loading` indicator
-   File Upload feature
-   Factor out local title variables into constants file instead of state dictionary

## To note:

-   All the information about the components is stored in `componentDetail.js` file.
-   All the hardcoded generic components are handled using `addGenericComponentIcon` in `leftPropertyBar.js` file.
