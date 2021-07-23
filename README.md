# Data Visualization
> A React component that serves as a fully fledged visual programming interface, ideal for simulation.

[![NPM](https://img.shields.io/npm/v/data-viz.svg)](https://www.npmjs.com/package/data-viz)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save data-viz
```

## Usage
Refer to [User Guide](https://ideas-lab-nus.github.io/data-viz/) for more information.

## Development and Testing:

`playground` is an internal cra that should be used to test this React Component Library that
currently exports the component `Canvas`

For cloud functions: 
    - Ensure your function is public
    - Handle preflight requests as detailed here;
        https://cloud.google.com/functions/docs/writing/http#functions_http_cors-nodejs
        
Run at root:
1. `npm update && npm run build`
2. `npm run i-all` (This runs `npm install` for both the base and playground)
3. `npm run dev` (This builds the library to `dist` folder and starts the playground)
4. `npm run test` to run all the test cases