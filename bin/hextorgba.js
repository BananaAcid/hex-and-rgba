#! /usr/bin/node

// remove node binary and script name from params
let args = global.args || process.argv.slice(2);

// check if -s was given as param
let mod = args.indexOf('-s');
if (mod !== -1)
    delete args[mod];
mod = mod != -1;

if (!args.length) {
    let package = require('../package.json');

    let o = (process.platform == "win32" || process.platform == "win64") ? {s: '\>', e: '.exe'} : {s: '$', e: ''}; 
    let name = process.argv.pop().split(/[\/|\\]/).pop().replace('.js','') + o.e;

    console.info(`${name} (${package.name} v${package.version})`);
    console.info(`${package.author}`);
    console.info(`${package.homepage}`);
    console.info(`\nusage: ${name} [-s] <hex>`);
    console.info(`\nparams:`);
    console.info(`  -s      as css rgba string`);
    console.info(`\nexamples:`);
    console.info(o.s + ` ${name} "#7b7b7bcc"                => [ 123, 123, 123, 0.8 ]`);
    console.info(o.s + ` ${name} 7b7b7bcc                   => [ 123, 123, 123, 0.8 ]`);
    console.info(o.s + ` ${name} 7b 7b 7b cc                => [ 123, 123, 123, 0.8 ]`);
    console.info(o.s + ` ${name} 7b7b7bcc    -s             => rgba(123,123,123,0.8)`);
    console.info(o.s + ` ${name} something                  => false`);
    console.info('');
}
else {
    let HAR = require('../index.js');

    try {
        let p = args.length == 1 ? args.pop() : args.join(''); 
        if (p[0] != '#') p = '#' + p; // prefix with '#' if needed
        let result = HAR.hexToRgba( p );
        
        if (result === false)
            console.error(false);
        else {
            if (!mod) {
                delete result['toString'];  // remove the to-rgba-string conversion function
                console.log(result);        // output array
            }
            else
                console.log(result.toString());
        }
    }
    catch (e) {
        console.error(false);
    }
}