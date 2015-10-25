var vows = require('vows')
var assert = require('assert')
var note = require('../')

vows.describe('frequencies').addBatch({
  'toFreq': {
    'toFreq': function () {
      assert.equal(note.toFreq('A4'), 440)
      assert.equal(note.toFreq('A3'), 220)
      assert.equal(note.toFreq('E4'), 329.6275569128699)
      assert.equal(note.toFreq('F4'), 349.2282314330039)
    },
    'map notes': function () {
      assert.deepEqual(['C3', 'D3', 'e3'].map(note.toFreq),
        [ 130.8127826502993, 146.8323839587038, 164.81377845643496 ])
    }
  },
  'fromFreq': function () {
    assert.equal(note.fromFreq(440), 'A4')
    assert.equal(note.fromFreq(220), 'A3')
    assert.equal(note.fromFreq(329.6275569128699), 'E4')
    assert.equal(note.fromFreq(330), 'E4')
    assert.equal(note.fromFreq(335), 'E4')
    assert.equal(note.fromFreq(340), 'F4')
    assert.equal(note.fromFreq(349.2282314330039), 'F4')
  },
  'fromCustomFreq with custom tuning': function () {
    assert.equal(note.fromCustomFreq(220, 110), 'A3')
  },
  'toCustomFreq partially applied': function () {
    assert.equal(note.toCustomFreq(440)('a3'), 220)
    assert.equal(note.toCustomFreq(444)('a3'), 222)
  },
  'toFreq custom tuning': function () {
    assert.equal(note.toCustomFreq(444, 'A4'), 444)
    assert.equal(note.toCustomFreq(222, 'A3'), 111)
  },
  'cents': function () {
    assert.equal(note.cents('A4', 'A#4'), 100)
    assert.equal(note.cents('A4', 444), 15.66)
  }
}).export(module)
