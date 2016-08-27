# HEX with alpha to RGBA

Convert HEX to RGBA and back

## Installation

    npm install --save hex-and-rgba

## Usage

    var hexToRgba = require('hex-and-rgba').hexToRgba;
    var rgbaToHex = require('hex-and-rgba').rgbaToHex;

    var rgba = hexToRgba('#1B2B34cc');     // [ 27, 43, 52, 0.8 ]

    var hex  = rgbaToHex(27, 43, 52, 0.8); // #1b2b34cc

## Hex formats

	NOTE: alpha is an optional argument on both functions, 
	      and if not supplied it will only be returned for hexToRgba() [and as 100%]
	      as it is not required for a hex code (these are always 100% without an aplha value)

    accepted hex code -> understood hex color code + alpha as hex
    '#123' -> #112233
    '#1234' -> #112233 + 44 (same as chrome handles it, v1.1.0)
    '#123456' -> #123456
    '#12345678' -> #123456 + 78

## ES6 usage

	// array deconstruction:
	const [red,green,blue, alpha] = hexToRgba('#1B2B34cc');