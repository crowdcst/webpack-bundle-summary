# Webpack Bundle Summary

Generate a JSON file with the name and size of each webpack asset. The default
filename is `bundle-stats.json`. Commit this file to source control, with each
new commit and when a new pull request is opened you can easily see how the
new code affects the size of each chunk.

## Usage

```javascript
const BundleSummary = require('webpack-bundle-summary')

/// webpack config
plugins: [
  new BundleSummary({filename: 'my-bundle-stats.json'})
]
///
```

That's it. Here is an example `bundle-stats.json`, generated from the [webpack-sandbox](github.com/crowdcst/webpack-sandbox) project:

```
{
  "0.js": 218,
  "1.js": 134,
  "main.js": 6639,
  "0.js.map": 446,
  "1.js.map": 277,
  "main.js.map": 6844
}
```
