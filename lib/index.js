'use strict'

const fs = require('fs')

function BundleSummary (options) {
  options = options || {}
  this.filename = options.filename || 'bundle-stats.json'
}

BundleSummary.prototype.apply = function (compiler) {
  const summary = {}
  compiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.assets.forEach(asset => {
      summary[asset.name] = asset.size
    })
    fs.writeFile(this.filename, JSON.stringify(summary, null, 2), err => {
      if (err) {
        console.error('Error writing file:', this.filename)
        return
      }
      console.log('Wrote bundle-summary stats to:', this.filename)
    })
  })
}

module.exports = BundleSummary
