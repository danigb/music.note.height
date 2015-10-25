var vows = require('vows')
var assert = require('assert')
var note = require('../')

vows.describe('music.note.height').addBatch({
  'parse': function () {
    assert.deepEqual(note.parse('C#4'), [0, 1, 4, 0])
    assert.deepEqual(note.parse('Bb'), [6, -1])
  },
  'note': function () {
    assert.equal(note('c'), 'C')
    assert.equal(note('bbb3'), 'Bbb3')
    assert.equal(note('fx'), 'F##')
    assert.equal(note([0, 1, 3, 0]), 'C#3')
  },
  'midi': {
    'fromMidi': function () {
      var notes = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73]
      .map(note.fromMidi).join(' ')
      assert.equal(notes, 'C4 Db4 D4 Eb4 E4 F4 F#4 G4 Ab4 A4 Bb4 B4 C5 Db5')
    },
    'toMidi': function () {
      assert.deepEqual('C4 D4 E4 F4 G4 A4 B4 C4'.split(' ').map(note.toMidi), [60, 62, 64, 65, 67, 69, 71, 60])
      assert.deepEqual('C#4 D#4 E#4 F#4 G#4 A#4 B#4 C#4'.split(' ').map(note.toMidi), [61, 63, 65, 66, 68, 70, 72, 61])
      assert.deepEqual('C##4 D##4 E##4 F##4 G##4 A##4 B##4 C##4'.split(' ').map(note.toMidi), [62, 64, 66, 67, 69, 71, 73, 62])
      assert.deepEqual('Cb4 Db4 Eb4 Fb4 Gb4 Ab4 Bb4 Cb4'.split(' ').map(note.toMidi), [59, 61, 63, 64, 66, 68, 70, 59])
      assert.deepEqual('Cbb3 Dbb3 Ebb3 Fbb3 Gbb3 Abb3 Bbb3 Cbb3'.split(' ').map(note.toMidi), [46, 48, 50, 51, 53, 55, 57, 46])
    },
    'toMidi: note class does not have midi': function () {
      assert.deepEqual('C D E F G A B C'.split(' ').map(note.toMidi), [ null, null, null, null, null, null, null, null ])
    },
    'toMidi: enharmonics': function () {
      assert.equal(note.toMidi('B#3'), note.toMidi('C4'))
      assert.equal(note.toMidi('B##3'), note.toMidi('Db4'))
    }
  }
}).export(module)
