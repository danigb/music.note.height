# music.note.height

[![Build Status](https://travis-ci.org/danigb/music.note.height.svg?branch=master)](https://travis-ci.org/danigb/music.note.height)
[![Code Climate](https://codeclimate.com/github/danigb/music.note.height/badges/gpa.svg)](https://codeclimate.com/github/danigb/music.note.height)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm version](https://img.shields.io/npm/v/music.note.height.svg)](https://www.npmjs.com/package/music.note.height)
[![license](https://img.shields.io/npm/l/music.note.height.svg)](https://www.npmjs.com/package/music.note.height)
[![music.kit](https://img.shields.io/badge/music-kit-yellow.svg)](https://github.com/danigb/music.kit)

`music.note.height` is a small and fast library to convert between midi numbers <-> note names <-> frequencies. It's the bridge between midi, your app and your synthetizers.

```js
var note = require('music.note.height')
// get a note from midi
var name = note.fromMidi( ... )
// write it to the console
console.log(name)
// give it to your synth
synth.play(note.toFreq(name))
```

This is part of [music.kit](https://github.com/danigb/music.kit)

## Installation

#### For node

Install via npm: `npm install --save music.note.height` and require it.

#### Browsers

No distribution (yet). Use webpack, browserify or a similar tool.

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
