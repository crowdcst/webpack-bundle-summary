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
    fs.writeFile(this.filename, JSON.stringify(summary, null, 2))
  })
}

module.exports = BundleSummary
