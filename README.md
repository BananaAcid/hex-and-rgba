# HEX with alpha to RGBA

Convert HEX to RGBA and back

## Installation
```sh
npm install --save hex-and-rgba
```

## Usage
```js
var rgbaToHex   = require('hex-and-rgba').rgbaToHex;
var rgbaToAHex   = require('hex-and-rgba').rgbaToAHex;
var hexToRgba   = require('hex-and-rgba').hexToRgba;
var aHexToRgba  = require('hex-and-rgba').aHexToRgba;
var isValidHex  = require('hex-and-rgba').isValidHex;
var isValidRgba = require('hex-and-rgba').isValidRgba;

var hex  = rgbaToHex(27, 43, 52, 0.8);           // '#1b2b34cc'
var rgba = hexToRgba('#1B2B34cc');               // [ 27, 43, 52, 0.8 ]

var rbaStr = 'c: ' + hexToRgba('#1B2B34cc');     // 'c: rgba(27,43,52,0.8)'
var rbaStr = hexToRgba('#1B2B34cc').toString();  // 'rgba(27,43,52,0.8)'
var rbaStr = aHexToRgba('#cc1B2B34').toString(); // 'rgba(27,43,52,0.8)'

var isHex  = isValidHex('#1B2B34cc');            // true
var isRgba = isValidRgba(27, 43, 52, 0.8);       // true
```

## Vanilla usage in browser
```html
<script src="vendor/hex-and-rgba/index.js></script>
```
```js
var rgbaToHex = hexAndRgba.rgbaToHex;
var hex  = rgbaToHex(27, 43, 52, 0.8);  // '#1b2b34cc'
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
- aHexToRgba(), rgbaToAHex(): for aHEX (ARGB, AARRGGBB) used on [Android](https://developer.android.com/guide/topics/resources/more-resources.html#Color), the alpha value is first instead of last. 

## Hex formats
```
accepted hex code -> understood hex color code + alpha as hex
'#123' -> #112233
'#1234' -> #112233 + 44 (same as chrome handles it, v1.1.0)
'#123456' -> #123456
'#12345678' -> #123456 + 78
```

## Examples
```js
rgbaToHex(27, 43, 52)             ==  '#1B2B34'  
rgbaToHex(27, 43, 52, 1)          ==  '#1B2B34ff'
rgbaToHex(27, 43, 52, 0.8)        ==  '#1B2B34cc'
rgbaToHex(27, '++', 52, 0.8)      ==  false                 // wrong type at idx 1
rgbaToHex(27, 43, 52, 0.8, 11)    ==  false                 // too many params
rgbaToAHex(27, 43, 52)            ==  '#1B2B34'  
rgbaToAHex(27, 43, 52, 1)         ==  '#ff1B2B34'
rgbaToAHex(27, 43, 52, 0.8)       ==  '#cc1B2B34'
rgbaToAHex(27, '++', 52, 0.8)     ==  false                 // wrong type at idx 1
rgbaToAHex(27, 43, 52, 0.8, 11)   ==  false                 // too many params
hexToRgba('#1B2')                 ==  [17, 187, 34, 1.0]
hexToRgba('#1B2c')                ==  [17, 187, 34, 0.8]
hexToRgba('#1B2B34')              ==  [27,  43, 52, 1.0]
hexToRgba('#1B2B34cc')            ==  [27,  43, 52, 0.8]
hexToRgba('#1B2+')                ==  false                 // not allowed chars
aHexToRgba('#1B2')                ==  [17, 187, 34, 1.0]
aHexToRgba('#c1B2')               ==  [17, 187, 34, 0.8]
aHexToRgba('#1B2B34')             ==  [27,  43, 52, 1.0]
aHexToRgba('#cc1B2B34')           ==  [27,  43, 52, 0.8]
aHexToRgba('#+1B2')               ==  false                 // not allowed chars
isValidHex('#1B2B34cc')           ==  true 
isValidHex('#cc1B2B34')           ==  true 
isValidHex('#1B2+-<.#')           ==  false                 // not allowed chars
isValidRgba(27, 43, 52, 0.8)      ==  true 
isValidRgba(27, 43, 52, 0.8, 11)  ==  false                 // too many params
hexToRgba('#1B2') + ''            ==  'rgba(17,187,34,1.0)'
hexToRgba('#1B2c') + ''           ==  'rgba(17,187,34,0.8)'
hexToRgba('#1B2c').toString()     ==  'rgba(17,187,34,0.8)'


rgbaToHex([17, 187, 34, 1.0])               == '#11BB22'                      // using an array as argument
rgbaToArray('rgba(255,55, 255, 1.0);')      == [255, 55, 255, 1.0]            // getting an array from RGBA css string (semicolon is ignored)
rgbaToArray('abc 255, 55, 255, 1.0').toString() == 'rgba(255,55,255,1.0)'  // use it to clean up a string
```

## Commandline usage (Bash, Windows)
`hex-and-rgba [-srha] <value>` (bridge to `rgbatohex`, `hextorgba` and `ahextorgba`)
```bash
# without package installation, only node must be installed 
$ npx hex-and-rgba -r "rgba(....)"
#
# or
#
$ npm i hex-and-rgba -g
$ hex-and-rgba -r "rgba(....)"
$ hex-and-rgba -h "#1B2B34cc"
$ hex-and-rgba -h -s "#1B2B34cc"
$ hex-and-rgba -a "#cc1B2B34cc"
$ hex-and-rgba -a -s "#cc1B2B34"

  -h      hex to rgba
  -ah     ahex to rgba
  -r      rgba to hex
  -ra     rgba to ahex
```

params for the specific commands
```
  -s      out as css rgba string (for hex* commands only)
  -t      out as tab seperated rgba parts (for hex* commands only)
  -n      out as newline seperated rgba parts (for hex* commands only)
  -i      use pipe in content
```

`rgbatohex <rgba>`
```bash
$ npm i hex-and-rgba -g
$ rgbatohex "rgba(....)"
$ rgbatohex 123,123,123,1.0      
$ rgbatohex 123 123 123 1.0
```

`rgbatoahex <rgba>`
```bash
$ npm i hex-and-rgba -g
$ rgbatoahex "rgba(....)"
$ rgbatoahex 123,123,123,1.0      
$ rgbatoahex 123 123 123 1.0
```

`hextorgba [-s] <hex>`
```bash
$ npm i hex-and-rgba -g
$ hextorgba "#1B2B34cc"
$ hextorgba 1B2B34cc
$ hextorgba 1B 2B 34 cc
```
default out: `[ 123, 123, 123, 0.8 ]`
with `-s` as css rgba: `rgba(123,123,123,0.8)`

`ahextorgba [-s] <ahex>`
```bash
$ npm i hex-and-rgba -g
$ ahextorgba "#cc1B2B34"
$ ahextorgba cc1B2B34
$ ahextorgba cc 1B 2B 34
```
default out: `[ 123, 123, 123, 0.8 ]`
with `-s` as css rgba: `rgba(123,123,123,0.8)`

## Changes

1.4.2 - 03 Nov 2019 
bumped version
changed readme

1.4.1 - 03 Nov 2019
added rgbaToAHex()
changed apha float to be a max of 3 digits after 0
added -t param to commandline to output as tab seperated rgba
removed commandline color commands for piping
changed to properly use stderr
added -i param to commandline to use piped in content
changed min requirement to node 7.6 (for command line scripts, include still requires 0.11.16)

1.4.0 - 03 Nov 2019
added aHex added (Android style HEX)
added aHex commandline script

1.3.3 - 13 Jan 2019
added commandline scripts

1.3.2 - 21 Nov 2018
added rgbaToHex to use an array with RGBA as param
added rgbaToArray to parse an css rgba string
changed functions not refering to this, so using the functions from a variable would work without bind (easier on browser)

1.3.1 - 30 Jul 2018
added explanations to Readme.md

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
