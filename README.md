# HEX with alpha to RGBA

Convert HEX to RGBA and back

## Installation

    npm install --save hex-and-rgba

## Usage

    var hexToRgba = require('hex-and-rgba').hexToRgba;
    var rgbaToHex = require('hex-and-rgba').rgbaToHex;

    var rgba = hexToRgba('#1B2B34cc');  // [ 27, 43, 52, 0.8 ]

    var hex  = rgbaToHex(27, 43, 52, 0.8); // #1b2b34cc