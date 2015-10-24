'use strict'

var notation = require('music.notation')

// Semitones from C to C D E F G A B
var SEMITONES = [ 0, 2, 4, 5, 7, 9, 11 ]
// Chromatic melodic scale
var CHROMATIC = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B' ]

function note (src) {
  return notation.str(note.parse(src))
}

note.parse = function (note) {
  var arr = notation.arr(note)
  return arr && arr.length !== 3 ? arr : null
}
note.build = notation.str

/**
 * Get the pitch of the given midi number
 *
 * This method doesn't take into account diatonic spelling. Always the same
 * pitch class is given to the same midi number.
 *
 * @name fromMidi
 * @function
 * @param {Integer} midi - the midi number
 * @return {String} the pitch
 *
 * @example
 * pitch.fromMidi(69) // => 'A4'
 */
note.fromMidi = function (midi) {
  var name = CHROMATIC[midi % 12]
  var oct = Math.floor(midi / 12) - 1
  return name + oct
}

/**
 * Get the midi number of a pitch
 *
 * @name toMidi
 * @function
 * @param {String|Array} pitch - the pitch string (or pitch array)
 * @return {Integer} the midi number
 *
 * @example
 * pitch.toMidi('A4') // => 69
 * pitch.toMidi('A3') // => 57
 */
note.toMidi = notation.op(function (p) {
  if (!p[2] && p[2] !== 0) return null
  return SEMITONES[p[0]] + p[1] + 12 * (p[2] + 1)
})

/**
 * Get the pitch of a given frequency.
 *
 * It will round the frequency to the nearest pitch frequency. Use `cents` function
 * if you need to know the difference between the the frequency and the pitch.
 *
 * @name fromFreq
 * @function
 * @param {Float} freq - the frequency
 * @return {String} the pitch
 *
 * @see cents
 *
 * @example
 * pitch.fromFreq(440) // => 'A4'
 * pitch.fromFreq(443) // => 'A4'
 * pitch.cents(443, 'A4') // => ... to get the difference
 */
note.fromFreq = function (freq, tuning) {
  tuning = tuning || 440
  var lineal = 12 * ((Math.log(freq) - Math.log(tuning)) / Math.log(2))
  var midi = Math.round(69 + lineal)
  return note.fromMidi(midi)
}

// decimal number
var NUM = /^\d+(?:\.\d+)?$/
/**
 * Get the pitch frequency in hertzs
 *
 * @name toFreq
 * @function
 * @param {String} pitch - the pitch
 * @param {Integer} tuning - optional tuning, 440 by default
 * @return {Float} - the pitch frequency
 *
 * @example
 * pitch.toFreq('A4') // => 440
 * pitch.toFreq('A3', 444) // => 222
 */
note.toFreq = function (p, tuning) {
  if (NUM.test(p)) return +p
  var midi = note.toMidi(p)
  if (!midi) return null
  tuning = tuning || 440
  return Math.pow(2, (midi - 69) / 12) * tuning
}

/**
 * Get the distance in cents between pitches or frequencies
 *
 * @name cents
 * @function
 * @param {String|Integer} from - first pitch or frequency
 * @param {String|Integer} to - other pitch or frequency
 * @param {Integer} decimals - the decimal precision (2 by default)
 * @return {Integer} the distance in cents
 *
 * @example
 * cents(440, 444) // => 15.66
 * cents('A4', 444) // => 15.66
 * cents('A4', 'A#4') // => 100
 */
note.cents = function (from, to, decimals) {
  var dec = decimals ? Math.pow(10, decimals) : 100
  var fromFreq = note.toFreq(from)
  var toFreq = note.toFreq(to)
  return Math.floor(1200 * (Math.log(toFreq / fromFreq) * dec / Math.log(2))) / dec
}

module.exports = note
