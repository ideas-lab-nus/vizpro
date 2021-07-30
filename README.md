# vizpro

> This npm package exports a React component that serves as a fully fledged visual programming interface, ideal for simulation.

[![NPM](https://img.shields.io/npm/v/vizpro.svg)](https://www.npmjs.com/package/vizpro)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation and Usage

Refer to the [User Guide](https://ideas-lab-nus.github.io/vizpro/) for details on how to use this package

## Development and Testing

`playground` is an internal CRA that can be used to test this React Component Package that currently exports the component `Canvas`.
        
 - Firstly clone this repo and change directory into the root of the project.

```
git clone https://github.com/ideas-lab-nus/vizpro.git
cd vizpro
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


## Contributors

<div class="image-cropper">
    <a href="https://github.com/MahmoudAbdelRahman">
        <img src="https://github.com/MahmoudAbdelRahman.png" height="40" width="40" style="margin: 10px 10px 10px 10px; border-radius: 40%;"> 
    </a>
    <a href="https://github.com/adChong">
        <img src="https://github.com/adChong.png" height="40" width="40" style="margin: 10px 10px 10px 10px; border-radius: 40%;">
    </a>
    <a href="https://github.com/vuminhhieunus2019">
        <img src="https://github.com/vuminhhieunus2019.png" height="40" width="40" style="margin: 10px 10px 10px 10px; border-radius: 40%;">
    </a>
    <a href="https://github.com/VimuthM">
        <img src="https://github.com/VimuthM.png" height="40" width="40" style="margin: 10px 10px 10px 10px; border-radius: 40%;">
    </a>
</div>
