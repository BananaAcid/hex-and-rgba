#!/usr/bin/env node

// remove node binary and script name from params
let args = process.argv.slice(2);


let arg = -1,
    mod = false;

if (!!~(arg = args.indexOf('-h')))
    mod = 'h';
else if (!!~(arg = args.indexOf('-ah')))
    mod = 'ah';
else if (!!~(arg = args.indexOf('-r')))
    mod = 'r';
else if (!!~(arg = args.indexOf('-ra')))
    mod = 'ra';

if (arg !== -1)
    args.splice(arg, 1);


global.args = args;


if (!args.length || !mod) {
    let package = require('../package.json');

    let o = (process.platform == "win32" || process.platform == "win64") ? {s: '\>', e: ''} : {s: '$', e: ''}; 
    let name = process.argv.pop().split(/[\/|\\]/).pop().replace('.js','') + o.e;

    console.info(`${name} (${package.name} v${package.version})`);
    console.info(`Nabil Redmann <repo@BananaAcid.de>`);
    console.info(`${package.homepage}`);
    console.info(`\nusage: ${name} [-hahrra] [-stni] <value>`);
    console.info(`\nparams:`);
    console.info(`  -h      hex to rgba`);
    console.info(`  -ah     ahex to rgba`);
    console.info(`  -r      rgba to hex`);
    console.info(`  -ra     rgba to ahex`);
    console.info(`  -s      out as css rgba string`);
    console.info(`  -t      out as tab seperated rgba parts`);
    console.info(`  -n      out as newline seperated rgba parts`);
    console.info(`  -i      use pipe in content`);
    console.info(`\nexamples:`);
    console.info(o.s + ` ${name} -h "#7b7b7bcc"                => [ 123, 123, 123, 0.8 ]`);
    console.info(o.s + ` ${name} -h 7b7b7bcc                   => [ 123, 123, 123, 0.8 ]`);
    console.info(o.s + ` ${name} -h 7b 7b 7b cc                => [ 123, 123, 123, 0.8 ]`);
    console.info(o.s + ` ${name} -h 7b7b7bcc    -s             => rgba(123,123,123,0.8)`);
	console.info(o.s + ` ${name} -r "rgba(123,123,123, .8);"   => #7b7b7bcc`);
	console.info(o.s + ` ${name} -r 123,123,123,.8             => #7b7b7bcc`);
	console.info(o.s + ` ${name} -r 123,123,123                => #7b7b7b`);
	console.info(o.s + ` ${name} -r 123 123 123                => #7b7b7b`);
    console.info(o.s + ` ${name} -ah "#cc7b7b7b"               => [ 123, 123, 123, 0.8 ]`);
    console.info(o.s + ` ${name} -ah cc7b7b7b                  => [ 123, 123, 123, 0.8 ]`);
    console.info(o.s + ` ${name} -ah cc 7b 7b 7b               => [ 123, 123, 123, 0.8 ]`);
    console.info(o.s + ` ${name} -ah cc7b7b7b  -s              => rgba(123,123,123,0.8)`);
	console.info(o.s + ` ${name} something                     => false`);
    console.info('');
}
else {

	if (mod == 'r')
		require('./rgbatohex.js');

    if (mod == 'ra')
		require('./rgbatoahex.js');

    if (mod == 'h')
		require('./hextorgba.js');

    if (mod == 'ah')
        require('./ahextorgba.js');

}