# Webpack Bundle Summary

[![Build Status](https://travis-ci.org/crowdcst/webpack-bundle-summary.svg?branch=master)](https://travis-ci.org/crowdcst/webpack-bundle-summary)
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]


This plugin generates a JSON file with the name and size of each webpack asset.
Commit this file to source control so you can easily see how diffs impact
bundle size.

## Installation

Install with yarn or npm (you might want to save this in `devDependencies` instead of `dependencies`)

```javascript
yarn add webpack-bundle-summary --dev
```

or

```javascript
npm install webpack-bundle-summary --save-dev
```

## Usage

```javascript
const BundleSummary = require('webpack-bundle-summary')

// webpack config
plugins: [
  new BundleSummary(options)
]
//
//
```

### Options

All are optiona

```javascript
let options = {
  // the name of the file to output the bundle-summary to
  // default: 'bundle-summary.json'
  filename: //string,

  // a function to filter assetNames if you don't want all
  // assets to be output in the summary file
  // take an asset name and return a boolean
  // default: only .js files:
  //      (assetName)  => /\.js/.test(assetName)
  // set `filter: false` to keep all webpack assets
  filter: (assetName) => { }
}
// webpack config
plugins: [
  new BundleSummary(options)
]
```

Here is an example `bundle-summary.json`, generated from the [webpack-sandbox](github.com/crowdcst/webpack-sandbox) project:

```
{
  "$total": 6991,
  "0.js": 218,
  "1.js": 134,
  "main.js": 6639
}
```

[downloads-image]: https://img.shields.io/npm/dt/webpack-bundle-summary.svg
[npm-image]: https://img.shields.io/npm/v/webpack-bundle-summary.svg
[npm-url]: https://www.npmjs.com/package/webpack-bundle-summary
