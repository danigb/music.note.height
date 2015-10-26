# music.note.height

[![Build Status](https://travis-ci.org/danigb/music.note.height.svg?branch=master)](https://travis-ci.org/danigb/music.note.height)
[![Test Coverage](https://codeclimate.com/github/danigb/music.note.height/badges/coverage.svg)](https://codeclimate.com/github/danigb/music.note.height/coverage)
[![Coverage](https://codeclimate.com/github/danigb/music.note.height/badges/gpa.svg)](https://codeclimate.com/github/danigb/music.note.height)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm version](https://img.shields.io/npm/v/music.note.height.svg)](https://www.npmjs.com/package/music.note.height)
[![license](https://img.shields.io/npm/l/music.note.height.svg)](https://www.npmjs.com/package/music.note.height)
[![distribution](https://img.shields.io/badge/dist-2.3kb-blue.svg)](https://github.com/danigb/music.kit)
[![music.kit](https://img.shields.io/badge/music-kit-yellow.svg)](https://github.com/danigb/music.kit)

`music.note.height` is a small (2.3kb) and fast library to convert between midi numbers <-> note names <-> frequencies. It's the bridge between midi, your app and your synthetizers.

```js
var note = require('music.note.height')
// get a note from midi
var name = note.fromMidi(69) // => 'A4'
// write it to the console
console.log(name) // => prints 'A4'
// give it to your synth
note.toFreq(name) // => 440
```

This is part of [music.kit](https://github.com/danigb/music.kit)

## Features

- Note name to midi and midi to note name conversion
- Note name to frequency and frequency to note name conversion
- Frequency conversion with custom tunnings (different from A4 = 440hz)
- Use scientific pitch by default. You can use your own note name parser
- Calculate frequency deviations in cents

## Installation

Install via npm: `npm install --save music.note.height` and require it. Or grab the browser ready distribution file [here](https://github.com/danigb/music.note.height/blob/master/dist/music.note.height.min.js)

## Usage

#### Note names

The `note` function returns the [scientific notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation) of a given note if valid. Can be used to check if its a valid note:

```js
note('bbb') // => 'Bbb'
note('fx4') // => 'F##4'

if (note(str) !== null) { /* valid pitch str */ }
```

#### Working with midi

You have two functions for converting from and to midi numbers:

```js
note.toMidi('A4') // => '69'
note.fromMidi(69) // => 'A4'
```

#### Working with frequencies

The same way, you have two frequency related functions:

```js
note.toFreq('A4') // => 440
note.fromFreq(440) // => 'A4'
```

#### Using different pitch notation

In the case scientific notation is not what you need, you can always use [pitch array notation](https://github.com/danigb/pitch-array) for every function that expects a string:

```js
note.toFreq([5, 0, 3]) // => 220
```

Also you can covert from scientific notation to pitch array notation with the `parse` function:

```js
note.parse('A3') // => [5, 0, 3]
```

#### More...

This is part of [music.kit](https://github.com/danigb/music.kit)

## Documentation

[Generated documentation here](https://github.com/danigb/music.note.height/blob/master/API.md)

## License

MIT License
