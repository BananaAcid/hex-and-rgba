'use strict';

// Note: it is not '#?' , because I want all HEX code strings to contain the leading hash char.
var validHex = new RegExp(/^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i);

/**
 * Check an RGBA value set for validity
 * @param {number} r    from 0 to 255
 * @param {number} g    from 0 to 255 
 * @param {number} b    from 0 to 255
 * @param {float}  [a]  from 0.0 to 1.0
 * @returns {boolean}
 */
module.exports.isValidRgba = function isValidRgba(r,g,b,a)
{
    return !!this.rgbaToHex.apply(this, arguments);
}

/**
 * Check a HEX code for validity
 * @param {string} hex  a HEX code string to check
 * @returns {boolean}
 */
module.exports.isValidHex = function isValidHex(hex)
{
    return validHex.test(hex);
}

/**
 * convert a RGBA value set to a HEX code string
 * @param {number} r    from 0 to 255
 * @param {number} g    from 0 to 255 
 * @param {number} b    from 0 to 255
 * @param {float}  [a]  from 0.0 to 1.0
 * @returns {string|false}  HEX code string in lowercase
 */
module.exports.rgbaToHex = function rgbaToHex(r,g,b,a)
{
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
 * convert a HEX code string to a RGBA value set
 * @param {string} hex  a HEX code string to check
 * @returns {Array|false}
 */
module.exports.hexToRgba = function hexToRgba(hex)
{
    if (! this.isValidHex(hex))
        return false;

    var code = hex.match(validHex)[1];

    if (code.length == 3 || code.length == 4)               // fix 3 and 4 letter codes
        code = code.match(/./g).reduce( function(i,e) { return i+e+e; }, '');

    var codePairs = code.match(/.{1,2}/g).map( function(e) { return parseInt(e, 16); });

    if (codePairs.length == 4)
        codePairs[3] = codePairs[3] / 255;
    else
        codePairs[3] = 1.0;

    return codePairs;
}