#!/usr/bin/env node

let args = process.argv.slice(2);


let modH = args.indexOf('-h');
if (modH !== -1)
    delete args[modH];
modH = modH != -1;

let modR = args.indexOf('-r');
if (modR !== -1)
    delete args[modR];
modR = modR != -1;

global.args = args;


if (!args.length || (!modR && !modH)) {
    let package = require('../package.json');

    let o = (process.platform == "win32" || process.platform == "win64") ? {s: '\>', e: '.exe'} : {s: '$', e: ''}; 
    let name = process.argv.pop().split(/[\/|\\]/).pop().replace('.js','') + o.e;

    console.info(`${name} (${package.name} v${package.version})`);
    console.info(`Nabil Redmann <repo@BananaAcid.de>`);
    console.info(`${package.homepage}`);
    console.info(`\nusage: ${name} [-shr] <value>`);
    console.info(`\nparams:`);
    console.info(`  -h      hex to rgba`);
    console.info(`  -h -s   hex to rgba, out as css rgba string`);
    console.info(`  -r      rgba to hex`);
    console.info(`\nexamples:`);
    console.info(o.s + ` ${name} -h "#7b7b7bcc"                => [ 123, 123, 123, 0.8 ]`);
    console.info(o.s + ` ${name} -h 7b7b7bcc                   => [ 123, 123, 123, 0.8 ]`);
    console.info(o.s + ` ${name} -h 7b 7b 7b cc                => [ 123, 123, 123, 0.8 ]`);
    console.info(o.s + ` ${name} -h 7b7b7bcc    -s             => rgba(123,123,123,0.8)`);
	console.info(o.s + ` ${name} -r "rgba(123,123,123, .8);"   => #7b7b7bcc`);
	console.info(o.s + ` ${name} -r 123,123,123,.8             => #7b7b7bcc`);
	console.info(o.s + ` ${name} -r 123,123,123                => #7b7b7b`);
	console.info(o.s + ` ${name} -r 123 123 123                => #7b7b7b`);
	console.info(o.s + ` ${name} something                     => false`);
    console.info('');
}
else {

	if (modR)
		require('./rgbatohex.js');

	if (modH)
		require('./hextorgba.js');
}