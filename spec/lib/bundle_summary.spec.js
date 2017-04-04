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

    it('should generate the correct summary', function (done) {
      bundleSummary.summarizeStats(mockStats).then(summary => {
        expect(summary).toEqual({
          'main.js': 123,
          '0.js': 1234,
          '1.js': 1235,
          '$total': 2592
        })
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
})
