class MockStats {
  constructor () {
    this.assets = [
      {name: '1.js', size: 1235},
      {name: 'main.js', size: 123},
      {name: '0.js', size: 1234}
    ]
  }

  toJson () {
    return {
      assets: this.assets
    }
  }
}

module.exports = MockStats
