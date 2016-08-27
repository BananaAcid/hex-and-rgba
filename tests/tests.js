// my little tests suite.

var i = require('util').inspect;
//d('caption', 'element', 'expected-result');
var d = function(c,e,r) { console.log(c + ' => ' + i(e) + (r?' is as expected: '+( i(e).toLowerCase()==i(r).toLowerCase() ? 'true' : 'false -> '+i(e) ):'')); };


var HAR = require('../index.js');


// RGBA to HEX
d('27, 43, 52',      HAR.rgbaToHex(27, 43, 52),      '#1B2B34'  );
d('27, 43, 52, 1',   HAR.rgbaToHex(27, 43, 52, 1),   '#1B2B34ff');
d('27, 43, 52, 0.8', HAR.rgbaToHex(27, 43, 52, 0.8), '#1B2B34cc');

// HEX TO RGBA
d('#1B2',      HAR.hexToRgba('#1B2'),      [17, 187, 34, 1.0]);
d('#1B2c',     HAR.hexToRgba('#1B2c'),     [17, 187, 34, 0.8]);
d('#1B2B34',   HAR.hexToRgba('#1B2B34'),   [27,  43, 52, 1.0]);
d('#1B2B34cc', HAR.hexToRgba('#1B2B34cc'), [27,  43, 52, 0.8]);
