//REQ: io.js

'use strict';


module.exports.rgbaToHex = function rgbaToHex(rgba_params_here)
{
    var arraytoHex = function(args) {
        return args.map(function(e){ var r = (+e).toString(16); r.length==1 && (r='0'+r); return r; }).join('');
    }

    var args = Array.prototype.slice.call(arguments);       // Arguments to Array conversion
    
    if (args.length == 4)                                   // is with alpha
        args[3] = Math.floor(255 * args[3]);                // opacity float to 255-based value

    return '#' + arraytoHex(args);
}


module.exports.hexToRgba = function hexToRgba(hex)
{
    var valid = new RegExp(/^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3})$/i);

    if (! valid.test(hex) )
        return false;

    var code = hex.match( valid )[1];

    if (code.length == 3)                                   // fix 3 letter codes
        code = code.match(/./g).map( function(e) { return e+e; });

    var codePairs = code.match(/.{1,2}/g).map( function(e) { return parseInt(e, 16); });

    if (codePairs.length == 4)
        codePairs[3] = codePairs[3] / 255;
    else
        codePairs[3] = 1.0;

    return codePairs;
}