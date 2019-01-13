#! /usr/bin/node

let args = global.args || process.argv.slice(2);

if (!args.length) {
	let package = require('../package.json');

	let o = (process.platform == "win32" || process.platform == "win64") ? {s: '\>', e: '.exe'} : {s: '$', e: ''}; 
	let name = process.argv.pop().split(/[\/|\\]/).pop().replace('.js','') + o.e;

	console.info(`${name} (${package.name} v${package.version})`);
	console.info(`${package.author}`);
	console.info(`${package.homepage}`);
    console.info(`\nusage: ${name} <rgba>`);
    console.info(`\nexamples:`);
	console.info(o.s + ` ${name} "rgba(123,123,123, .8);"   => #7b7b7bcc`);
	console.info(o.s + ` ${name} 123,123,123,.8             => #7b7b7bcc`);
	console.info(o.s + ` ${name} 123,123,123                => #7b7b7b`);
	console.info(o.s + ` ${name} 123 123 123                => #7b7b7b`);
	console.info(o.s + ` ${name} something                  => false`);
    console.info('');
}
else {
	let HAR = require('../index.js');

	try {
		let p = args.length == 1 ? HAR.rgbaToArray( args.pop() ) : args; 
		let result = HAR.rgbaToHex( p );
		if (result === false)
			console.error(false);
		else
			console.log(result);
	}
	catch (e) {
		console.error(false);
	}
}