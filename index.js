'use strict'

var parser = require('music.note.parser')

// Semitones from C to C D E F G A B
var SEMITONES = [ 0, 2, 4, 5, 7, 9, 11 ]
// Chromatic melodic scale
var CHROMATIC = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B' ]

function arr (p) { return Array.isArray(p) ? p : parser(p) }

/**
 * Get the note in scienific notation or null if not a valid note
 *
 * @param {String} note - the note
 * @return {String} the scientific notation string or null if not a valid note
 *
 * @example
 * note('c#') // => 'C#'
 * note('fx') // => 'F##'
 * note('bbb') // => 'Bbb'
 * note('m') // => null
 */
function note (src) {
  return parser.build(arr(src))
}

note.parse = function (note) {
  var p = arr(note)
  return p && p.length !== 3 ? p : null
}
note.build = parser.build

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
 * note.fromMidi(69) // => 'A4'
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
 * note.toMidi('A4') // => 69
 * note.toMidi('A3') // => 57
 */
note.toMidi = function (note) {
  var p = Array.isArray(note) ? note : parser(note)
  if (!p || (!p[2] && p[2] !== 0)) return null
  return SEMITONES[p[0]] + p[1] + 12 * (p[2] + 1)
}

/**
 * Get the pitch of a given frequency using a custom tuning
 *
 * It will round the frequency to the nearest pitch frequency. Use `cents` function
 * if you need to know the difference between the the frequency and the note.
 *
 * This function can be partially applied
 *
 * @name fromCustomFreq
 * @function
 * @param {Float} tuning - the frequency of A4
 * @param {Float} freq - the frequency of the note you want
 * @return {String} the note name
 *
 * @see fromFreq
 * @see cents
 *
 * @example
 * var fromFreq = note.fromCustomFreq(444)
 * fromFreq(222) // => 'A3'
 */
note.fromCustomFreq = function (t, f) {
  var tuning = t || 440
  if (arguments.length > 1) return note.fromCustomFreq(tuning)(f)

  return function (freq) {
    var lineal = 12 * ((Math.log(freq) - Math.log(tuning)) / Math.log(2))
    var midi = Math.round(69 + lineal)
    return note.fromMidi(midi)
  }
}

/**
 * Get the pitch of a given frequency.
 *
 * It will round the frequency to the nearest pitch frequency. Use `cents` function
 * if you need to know the difference between the the frequency and the note.
 *
 * @name fromFreq
 * @function
 * @param {Float} freq - the frequency
 * @return {String} the pitch
 *
 * @see fromCustomFreq
 *
 * @example
 * note.fromFreq(440) // => 'A4'
 * note.fromFreq(443) // => 'A4'
 * note.cents(443, 'A4') // => ... to get the difference
 */
note.fromFreq = note.fromCustomFreq(440)

// decimal number
var NUM = /^\d+(?:\.\d+)?$/
/**
 * Get the pitch frequency in herzs with custom concert tuning
 *
 * This function is currified so it can be partially applied
 *
 * @param {Float} tuning - the frequency of A4 (null means 440)
 * @param {String|Array} pitch - the note name
 * @return {Float} the frequency of the note
 *
 * @example
 * var toFreq = note.toCustomFreq(444)
 * toFreq('A2') // => 111
 */
note.toCustomFreq = function (tuning, p) {
  tuning = tuning || 440
  if (arguments.length > 1) return note.toCustomFreq(tuning)(p)
  return function (p) {
    if (NUM.test(p)) return +p
    var midi = note.toMidi(p)
    if (!midi) return null
    return Math.pow(2, (midi - 69) / 12) * tuning
  }
}

/**
 * Get the pitch frequency in hertzs (using 440 as concert pitch)
 *
 * @name toFreq
 * @function
 * @param {String} pitch - the pitch
 * @return {Float} - the pitch frequency
 *
 * @example
 * note.toFreq('A4') // => 440
 * note.toFreq('A3') // => 222
 */
note.toFreq = note.toCustomFreq(440)

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
 * note.cents(440, 444) // => 15.66
 * note.cents('A4', 444) // => 15.66
 * note.cents('A4', 'A#4') // => 100
 */
note.cents = function (from, to, decimals) {
  var dec = decimals ? Math.pow(10, decimals) : 100
  var fromFreq = note.toFreq(from)
  var toFreq = note.toFreq(to)
  return Math.floor(1200 * (Math.log(toFreq / fromFreq) * dec / Math.log(2))) / dec
}

if (typeof module === 'object' && module.exports) module.exports = note
if (typeof window !== 'undefined') window.note = note
