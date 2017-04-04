class MockStats {
  constructor () {
    this.assets = [
      {name: 'main.js', size: 123},
      {name: '0.js', size: 1234},
      {name: '1.js', size: 1235}
    ]
  }

  toJson () {
    return {
      assets: this.assets
    }
  }
}

module.exports = MockStats
