'use strict'

const fs = require('fs')
const pkg = require('../package.json')
const DEFAULT_FILTER_RX = /\.js$/

function BundleSummary (options) {
  options = options || {}
  this.filename = options.filename || 'bundle-summary.json'
  // if filter is disabled then keep all assets
  if (options.filter === false) {
    this.filter = function () { return true }
  }
  // if a function is passed in then assign it to this.filter
  if (typeof options.filter === 'function') {
    this.filter = options.filter
  }
  // finally, if filter is undefined use the default
  // only keep .js assets
  if (typeof options.filter === 'undefined') {
    this.filter = (assetName) => DEFAULT_FILTER_RX.test(assetName)
  }
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
