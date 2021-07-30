# Data Visualization

> A React component that serves as a fully fledged visual programming interface, ideal for simulation.

[![NPM](https://img.shields.io/npm/v/data-viz.svg)](https://www.npmjs.com/package/data-viz)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation and Usage

Refer to the [User Guide](https://ideas-lab-nus.github.io/data-viz/) for details on how to use this package

## Development and Testing:

`playground` is an internal CRA that can be used to test this React Component Package that currently exports the component `Canvas`.
        
 - Firstly clone this repo and change directory into the root of the project.

```
git clone https://github.com/ideas-lab-nus/data-viz.git
cd data-viz
```

 - Run the following at root of the repository to start the React app:

```
npm update && npm run build
npm run i-all
npm run dev
```
 - The main aspects and logic of the package are within the `src` folder and changes made to any file, will immediately be reflected in the `playground` on saving.
 - Refer to the [Developer Guide](./docs/docs/dev.md) to get an understanding of the codebase.
 - Run `npm run test` at root to run all the test cases.
 - Run `npm run coverage` at root to run all the test cases and receive a coverage report.
 - Run `npm run deploy` at root to deploy changes to github pages.
 - A new version can be published by signing into the npm account, incrementing the version number in `package.json` and running `npm publish`.