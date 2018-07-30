# HEX with alpha to RGBA

Convert HEX to RGBA and back

## Installation
```sh
    npm install --save hex-and-rgba
```
## Usage
```js
    var rgbaToHex   = require('hex-and-rgba').rgbaToHex;
    var hexToRgba   = require('hex-and-rgba').hexToRgba;
    var isValidHex  = require('hex-and-rgba').isValidHex;
    var isValidRgba = require('hex-and-rgba').isValidRgba;

    var hex  = rgbaToHex(27, 43, 52, 0.8);          // '#1b2b34cc'
    var rgba = hexToRgba('#1B2B34cc');              // [ 27, 43, 52, 0.8 ]

    var rbaStr = 'c: ' + hexToRgba('#1B2B34cc');    // 'c: rgba(27,43,52,0.8)'
    var rbaStr = hexToRgba('#1B2B34cc').toString(); // 'rgba(27,43,52,0.8)'

    var isHex  = isValidHex('#1B2B34cc');           // true
    var isRgba = isValidRgba(27, 43, 52, 0.8);      // true
```
## ES6 + ESM usage
```js
    // single function import
    import {hexToRgba} from 'hex-and-rgba';
    
    // array deconstruction:
    const [red,green,blue, alpha] = hexToRgba('#1B2B34cc');

    // in template string usage
    let info = `css rgba color value: ${hexToRgba('#1B2B34cc')}`;
    // will output 'css rgba color value: rgba(27,43,52,0.8)'
```
## Note

- alpha is an optional argument on both functions,
  and if not supplied it will only be returned for hexToRgba() [and as 100%]
  as it is not required for a hex code (these are always 100% without an aplha value)
- hex codes will always be in lowercase
- check out the tests file for examples - it has the expected results appended
- hexToRgba will output an `rgba()` string if accessed as string and will the alpha value will always have 1 decimal (0 -> 0.0, 1 -> 1.0)

## Hex formats

    accepted hex code -> understood hex color code + alpha as hex
    '#123' -> #112233
    '#1234' -> #112233 + 44 (same as chrome handles it, v1.1.0)
    '#123456' -> #123456
    '#12345678' -> #123456 + 78

## Changes

1.3.0 - 30 Jul 2018
added AMD, CommonJS, Browser module support, ESM/MJS support,
added hexToRgba to convert to string as 'rgba(r,g,b,a)' when accessed as string

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