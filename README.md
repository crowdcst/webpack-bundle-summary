# Webpack Bundle Summary

Generate a JSON file with the name and size of each webpack asset. The default
filename is `bundle-stats.json`. Commit this file to source control, with each
new commit and when a new pull request is opened you can easily see how the
new code affects the size of each chunk.

## Installation

Install with yarn or npm (you might want to save this in `devDependencies` instead of `dependencies`)

```
yarn add webpack-bundle-summary --dev
```

or

```
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

options

```
options = {
  // the name of the file to output the bundle-summary to
  // default: 'bundle-summary.json'
  filename: 'my-bundle-summary.json',
  // a function to filter assetNames if you don't want all
  // assets to be output in the summary file
  // take an asset name and return a boolean
  // default: undefined
  filter: function (assetName) {
    return /\.js/.test(assetName)
  }
}
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
