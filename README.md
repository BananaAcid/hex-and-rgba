# HEX with alpha to RGBA

Convert HEX to RGBA and back

## Installation

    npm install --save hex-and-rgba

## Usage

    var rgbaToHex   = require('hex-and-rgba').rgbaToHex;
    var hexToRgba   = require('hex-and-rgba').hexToRgba;
    var isValidHex  = require('hex-and-rgba').isValidHex;
    var isValidRgba = require('hex-and-rgba').isValidRgba;

    var hex  = rgbaToHex(27, 43, 52, 0.8);       // #1b2b34cc
    var rgba = hexToRgba('#1B2B34cc');           // [ 27, 43, 52, 0.8 ]

    var isHex  = isValidHex('#1B2B34cc');        // true
    var isRgba = isValidRgba(27, 43, 52, 0.8);   // true

## ES6 usage

    // array deconstruction:
    const [red,green,blue, alpha] = hexToRgba('#1B2B34cc');

## Note

- alpha is an optional argument on both functions,
  and if not supplied it will only be returned for hexToRgba() [and as 100%]
  as it is not required for a hex code (these are always 100% without an aplha value)
- hex codes will always be in lowercase
- check out the tests file for examples - it has the expected results appended

## Hex formats

    accepted hex code -> understood hex color code + alpha as hex
    '#123' -> #112233
    '#1234' -> #112233 + 44 (same as chrome handles it, v1.1.0)
    '#123456' -> #123456
    '#12345678' -> #123456 + 78

## Changes

1.2.0 - 19 Mar 2017
added isValidHex() and isValidRgba(), 
added JSdoc comments for code completion supporting editors, 
added validation to RgbaToHex()

1.1.0 - 27 Aug 2016
added support for #1234 parsing, 
extended readme, 
bugfix for 3 digit codes, 
added tests

1.0.0 - 26 Aug 2015
initial