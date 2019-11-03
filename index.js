'use strict';


// Note: it is not '#?' , because I want all HEX code strings to contain the leading hash char.
var validHex = new RegExp(/^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i);

// array to rgba string converter
var rgbaArrToString = function() { 
    return 'rgba(' + this[0] + ',' + this[1] + ','+ this[2] + ','+ this[3].toFixed(1) + ')';
};

// global Object for export
var hexAndRgba = {},
    self = hexAndRgba;

/**
 * Check an RGBA value set for validity
 * @param {number} r    from 0 to 255
 * @param {number} g    from 0 to 255 
 * @param {number} b    from 0 to 255
 * @param {float}  [a]  from 0.0 to 1.0
 * @returns {boolean}
 */
hexAndRgba.isValidRgba = function isValidRgba(r,g,b,a)
{
    return !!self.rgbaToHex.apply(self, arguments);
}

/**
 * Check a HEX/aHex code for validity
 * @param {string} hex  a HEX/aHex code string to check
 * @returns {boolean}
 */
hexAndRgba.isValidHex = function isValidHex(hex)
{
    return validHex.test(hex);
}

/**
 * convert a RGBA value set to a HEX code string
 * @param {number} r    from 0 to 255
 * @param {number} g    from 0 to 255 
 * @param {number} b    from 0 to 255
 * @param {float}  [a]  from 0.0 to 1.0
 * @param {Array}  r    array with the RGBA values
 * @returns {string|false}  HEX code string in lowercase
 */
hexAndRgba.rgbaToHex = function rgbaToHex(r,g,b,a)
{
    if (arguments.length == 1 && Array.isArray(arguments[0]))
        return self.rgbaToHex.apply(null, arguments[0]);    // allow array as params substitution

    if (arguments.length < 3 || arguments.length > 4)       // arguments length check
        return false;

    var args = Array.prototype.slice.call(arguments);       // Arguments to Array conversion
    
    if (args.length == 4)                                   // is with optional alpha value
        args[3] = Math.floor(255 * args[3]);                // opacity float to 255-based value

    var parts = args.map(function(e){ var r = (+e).toString(16); r.length==1 && (r='0'+r); return r; }, []);
    
    return (!~parts.indexOf('NaN'))                         // if a part could not be converted to an int, there is a 'NaN'
        ? '#' + parts.join('')
        : false;
}

/**
 * convert a HEXa code string to a RGBA value set
 * @param {string} hex  a HEXa code string to check
 * @returns {Array|false}
 */
hexAndRgba.hexToRgba = function hexToRgba(hex)
{
    if (! self.isValidHex(hex))
        return false;

    var code = hex.match(validHex)[1];

    if (code.length == 3 || code.length == 4)               // fix 3 and 4 letter codes
        code = code.match(/./g).reduce( function(i,e) { return i+e+e; }, '');
                                                            // convert to int from hex
    var codePairs = code.match(/.{1,2}/g).map( function(e) { return parseInt(e, 16); });

    if (codePairs.length == 4)
        codePairs[3] = +(codePairs[3] / 255).toPrecision(3);
    else
        codePairs[3] = 1.0;

    // allow string access
    codePairs.toString = rgbaArrToString;

    return codePairs;
}

/**
 * convert a RGBA value set to a aHEX code string
 * @param {number} r    from 0 to 255
 * @param {number} g    from 0 to 255 
 * @param {number} b    from 0 to 255
 * @param {float}  [a]  from 0.0 to 1.0
 * @param {Array}  r    array with the RGBA values
 * @returns {string|false}  aHEX code string in lowercase
 */
hexAndRgba.rgbaToAHex = function rgbaToAHex(r,g,b,a)
{
    if (arguments.length == 1 && Array.isArray(arguments[0]))
        return self.rgbaToAHex.apply(null, arguments[0]);    // allow array as params substitution

    if (arguments.length < 3 || arguments.length > 4)       // arguments length check
        return false;

    var args = Array.prototype.slice.call(arguments);       // Arguments to Array conversion
    
    if (args.length == 4) {                                 // is with optional alpha value
        args[3] = Math.floor(255 * args[3]);                // opacity float to 255-based value
        var part = args.splice(3, 1)[0];                    // remove alpha part
        args.unshift(part);                                 // prepend alpha for aHEX
    }

    var parts = args.map(function(e){ var r = (+e).toString(16); r.length==1 && (r='0'+r); return r; }, []);
    
    return (!~parts.indexOf('NaN'))                         // if a part could not be converted to an int, there is a 'NaN'
        ? '#' + parts.join('')
        : false;
}

/**
 * convert a aHEX code string to a RGBA value set
 * @param {string} ahex  an aHEX code string to check (ARGB, AARRGGBB)
 * @returns {Array|false}
 */
hexAndRgba.aHexToRgba = function aHexToRgba(ahex)
{
    if (! self.isValidHex(ahex))
        return false;

    var code = ahex.match(validHex)[1];

    if (code.length == 3 || code.length == 4)               // fix 3 and 4 letter codes
        code = code.match(/./g).reduce( function(i,e) { return i+e+e; }, '');
                                                            // convert to int from hex
    var codePairs = code.match(/.{1,2}/g).map( function(e) { return parseInt(e, 16); });

    if (codePairs.length == 4) {
        codePairs[0] = +(codePairs[0] / 255).toPrecision(3);
        var part = codePairs.shift();
        codePairs.push(part);
    }
    else
        codePairs.push(1.0);

    // allow string access
    codePairs.toString = rgbaArrToString;

    return codePairs;
}

/**
 * get the RGBA values from an rgba String
 * @param {string} rgba
 * @returns {Array|false}
 */
hexAndRgba.rgbaToArray = function rgbaToArray(rgba)
{
                                                            // convert string to int
    var codePairs = rgba.match(/([0-9\.]+)/g).map( function(e) { return +e; });


    if (codePairs.length < 3 || codePairs.length > 4)       // arguments length check
        return false;

    // allow string access
    codePairs.toString = rgbaArrToString;

    return codePairs;
}


// AMD, CommonJS, Browser
if (typeof define === 'function' && define.amd) {
    define(function () {
        return hexAndRgba;
    });
}
else if (typeof module !== 'undefined' && module.exports) {
    module.exports = hexAndRgba;
}
else {
    window.hexAndRgba = hexAndRgba;
}