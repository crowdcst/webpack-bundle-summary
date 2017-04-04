'use strict'

const fs = require('fs')
const pkg = require('../package.json')

function BundleSummary (options) {
  options = options || {}
  this.filename = options.filename || 'bundle-summary.json'
  // default keep every asset
  this.filter = options.filter || function () { return true }
}

BundleSummary.prototype.apply = function (compiler) {
  compiler.plugin('done', stats => {
    this.summarizeStats(stats).then((summary) => {
      fs.writeFile(this.filename, JSON.stringify(summary, null, 2), err => {
        if (err) {
          console.error('Error writing file:', this.filename)
          return
        }
        console.log('Wrote bundle-summary stats to:', this.filename)
      })
    })
  })
}

BundleSummary.prototype.summarizeStats = function (stats) {
  return new Promise((resolve, reject) => {
    const summary = {
      $total: 0
    }
    stats = stats.toJson()
    stats.assets.forEach(asset => {
      if (this.shouldKeepAsset(asset.name)) {
        summary[asset.name] = asset.size
        summary.$total += asset.size
      }
    })
    resolve(summary)
  })
}

BundleSummary.prototype.shouldKeepAsset = function (assetName) {
  return this.filter(assetName)
}

BundleSummary.prototype.VERSION = pkg.version

module.exports = BundleSummary
