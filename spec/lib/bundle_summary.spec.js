/* eslint-env jasmine */

'use strict'

const BundleSummary = require('../../lib/bundle_summary.js')
const pkg = require('../../package.json')
const MockStats = require('../support/mock_stats')

describe('BundleSummary', function () {
  describe('constructor', function () {
    const bundleSummary = new BundleSummary()

    it('should assign the correct version number', function () {
      expect(bundleSummary.VERSION).toEqual(pkg.version)
    })

    it('should set the default filename to "bundle-summary.json"', function () {
      expect(bundleSummary.filename).toEqual('bundle-summary.json')
    })
  })

  describe('summarizeStats', function () {
    const bundleSummary = new BundleSummary()
    const mockStats = new MockStats()

    it('should generate the correct summary and be sorted', function (done) {
      bundleSummary.summarizeStats(mockStats).then(summary => {
        expect(summary).toEqual({
          'main.js': '0.1K',
          '0.js': '1.2K',
          '1.js': '1.2K',
          '$total': '2.6K'
        })
        expect(Object.keys(summary)).toEqual([
          '$total',
          '0.js',
          '1.js',
          'main.js'
        ])
        done()
      })
    })
  })

  describe('shouldKeepAsset', function () {
    describe('custom', function () {
      const bundleSummary = new BundleSummary({
        filter: (assetName) => assetName !== '0.js'
      })

      it('should generate the correct summary', function () {
        expect(
          bundleSummary.shouldKeepAsset('0.js')
        ).toEqual(false)

        expect(
          bundleSummary.shouldKeepAsset('1.js')
        ).toEqual(true)
      })
    })

    describe('default', function () {
      const bundleSummary = new BundleSummary({})

      it('should generate the correct summary', function () {
        expect(
          bundleSummary.shouldKeepAsset('0.js')
        ).toEqual(true)

        expect(
          bundleSummary.shouldKeepAsset('1.js')
        ).toEqual(true)

        expect(
          bundleSummary.shouldKeepAsset('something.html')
        ).toEqual(false)
      })
    })

    describe('no filter', function () {
      const bundleSummary = new BundleSummary({filter: false})

      it('should generate the correct summary', function () {
        expect(
          bundleSummary.shouldKeepAsset('0.js')
        ).toEqual(true)

        expect(
          bundleSummary.shouldKeepAsset('1.js')
        ).toEqual(true)

        expect(
          bundleSummary.shouldKeepAsset('something.html')
        ).toEqual(true)
      })
    })
  })

  describe('formatBytes', function () {
    it('should round small numbers to 1 decimal', function () {
      const bundleSummary = new BundleSummary()
      const size = 123
      expect(bundleSummary.formatBytes(size)).toEqual('0.1K')
      expect(size).toEqual(123) // don't mutate the original variable
    })

    it('should round big numbers to 1 decimal', function () {
      const bundleSummary = new BundleSummary()
      expect(bundleSummary.formatBytes(1234565)).toEqual('1234.6K')
    })
  })
})
