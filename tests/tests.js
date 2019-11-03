// my little tests suite.

var _ = require('util').inspect
  , i = function(o) {return Array.isArray(o) ? _(o.map(function(e) {return e})) : _(o);} // inspect also goes for hidden custom properties - filter out
    //d('caption', 'element', 'expected-result');
  , d = function(c,e,r) { console.log(c + ' => ' + i(e) + ' ---------------> ' + ( i(e).toLowerCase()==i(r).toLowerCase() ? 'OK' : 'failed, should be: '+i(r) )); }
  , h = function(h) { console.log(h + ':') }
  , x = function() { console.log('---') }
  ; 


var HAR = require('../index.js');


h('RGBA to HEX');
d('27, 43, 52',          HAR.rgbaToHex(27, 43, 52),          '#1B2B34'  );
d('27, 43, 52, 1',       HAR.rgbaToHex(27, 43, 52, 1),       '#1B2B34ff');
d('27, 43, 52, 0.8',     HAR.rgbaToHex(27, 43, 52, 0.8),     '#1B2B34cc');
d('27, "++", 52, 0.8',   HAR.rgbaToHex(27, '++', 52, 0.8),   false      );    // wrong type at idx 1
d('27, 43, 52, 0.8, 11', HAR.rgbaToHex(27, 43, 52, 0.8, 11), false      );    // too many params
x();

h('HEX TO RGBA');
d('#1B2',      HAR.hexToRgba('#1B2'),      [17, 187, 34, 1.0]);
d('#1B2c',     HAR.hexToRgba('#1B2c'),     [17, 187, 34, 0.8]);
d('#1B2B34',   HAR.hexToRgba('#1B2B34'),   [27,  43, 52, 1.0]);
d('#1B2B34cc', HAR.hexToRgba('#1B2B34cc'), [27,  43, 52, 0.8]);
d('#1B2+',     HAR.hexToRgba('#1B2+'),     false             );               // not allowed chars
x();

h('aHEX TO RGBA');
d('#1B2',      HAR.aHexToRgba('#1B2'),      [17, 187, 34, 1.0]);
d('#c1B2',     HAR.aHexToRgba('#c1B2'),     [17, 187, 34, 0.8]);
d('#1B2B34',   HAR.aHexToRgba('#1B2B34'),   [27,  43, 52, 1.0]);
d('#cc1B2B34', HAR.aHexToRgba('#cc1B2B34'), [27,  43, 52, 0.8]);
d('#+1B2',     HAR.aHexToRgba('#+1B2'),     false             );               // not allowed chars
x();

h('Test if it is a valid HEX');
d('#1B2B34cc', HAR.isValidHex('#1B2B34cc'), true );
d('#1B2+-<.#', HAR.isValidHex('#1B2+-<.#'), false);                           // not allowed chars
x();

h('Test if it is a valid RGBA');
d('27, 43, 52, 0.8',     HAR.isValidRgba(27, 43, 52, 0.8),     true );
d('27, 43, 52, 0.8, 11', HAR.isValidRgba(27, 43, 52, 0.8, 11), false);        // too many params
x();

h('accessing hexToRgba as string ( triggering .toString() )');
d('#1B2',      HAR.hexToRgba('#1B2')+'',          'rgba(17,187,34,1.0)');
d('#1B2c',     HAR.hexToRgba('#1B2c')+'',         'rgba(17,187,34,0.8)');
d('#1B2c',     HAR.hexToRgba('#1B2c').toString(), 'rgba(17,187,34,0.8)');
x();

h('array handling');
d('[27, 43, 52]',             HAR.rgbaToHex([27, 43, 52]),                     '#1B2B34'              );
d('[27, 43, 52, .8]',         HAR.rgbaToHex([27, 43, 52, 0.8]),                '#1B2B34cc'            );
d('rgba(255, 55, 255, 1.0);', HAR.rgbaToArray('rgba(255,55, 255, 1.0);'),      [255, 55, 255, 1.0]    );
d('rgba(255, 55, 255, 1.0);', HAR.rgbaToArray('rgba(255,55, 255, 1.0);') + '', 'rgba(255,55,255,1.0)' );
d('255 - 55 - 255 - 1.0',     HAR.rgbaToArray('255 - 55 - 255 - 1.0') + '',    'rgba(255,55,255,1.0)' );
x();

/*
Expected result

$ npm test

> hex-and-rgba@1.3.2 test D:\GitHub\hex-and-rgba
> node tests/tests.js

RGBA to HEX:
27, 43, 52 => '#1b2b34' ---------------> OK
27, 43, 52, 1 => '#1b2b34ff' ---------------> OK
27, 43, 52, 0.8 => '#1b2b34cc' ---------------> OK
27, "++", 52, 0.8 => false ---------------> OK
27, 43, 52, 0.8, 11 => false ---------------> OK
---
HEX TO RGBA:
#1B2 => [ 17, 187, 34, 1 ] ---------------> OK
#1B2c => [ 17, 187, 34, 0.8 ] ---------------> OK
#1B2B34 => [ 27, 43, 52, 1 ] ---------------> OK
#1B2B34cc => [ 27, 43, 52, 0.8 ] ---------------> OK
#1B2+ => false ---------------> OK
---
Test if it is a valid HEX:
#1B2B34cc => true ---------------> OK
#1B2+-<.# => false ---------------> OK
---
Test if it is a valid RGBA:
27, 43, 52, 0.8 => true ---------------> OK
27, 43, 52, 0.8, 11 => false ---------------> OK
---
accessing hexToRgba as string ( triggering .toString() ):
#1B2 => 'rgba(17,187,34,1.0)' ---------------> OK
#1B2c => 'rgba(17,187,34,0.8)' ---------------> OK
#1B2c => 'rgba(17,187,34,0.8)' ---------------> OK
---
array handling:
[27, 43, 52] => '#1b2b34' ---------------> OK
[27, 43, 52, .8] => '#1b2b34cc' ---------------> OK
rgba(255, 55, 255, 1.0); => [ 255, 55, 255, 1 ] ---------------> OK
rgba(255, 55, 255, 1.0); => 'rgba(255,55,255,1.0)' ---------------> OK
---
*/