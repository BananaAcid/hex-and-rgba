#!/usr/bin/env node

(async()=>{
	let args = global.args || process.argv.slice(2);

	let arg2 = -1;

	if (!!~(arg2 = args.indexOf('-i'))) {
		await new Promise(resolve=> {
			args.splice(arg2, 1);
			var buf = '';
			process.stdin.setEncoding('utf8');
			process.stdin.on('data', function (chunk) {
				buf += chunk;
			});
			process.stdin.on('end', function () {
				if (buf)
					args.push(buf.trim());
				
				resolve();
			}).resume();
		})
	}

		
	if (!args.length) {
		let package = require('../package.json');

		let o = (process.platform == "win32" || process.platform == "win64") ? {s: '\>', e: ''} : {s: '$', e: ''}; 
		let name = process.argv.pop().split(/[\/|\\]/).pop().replace('.js','') + o.e;

		console.info(`${name} (${package.name} v${package.version})`);
		console.info(`Nabil Redmann <repo@BananaAcid.de>`);
		console.info(`${package.homepage}`);
		console.info(`\nusage: ${name} [-i] <rgba>`);
		console.info(`  -i      use pipe in content`);
		console.info(`\nexamples:`);
		console.info(o.s + ` ${name} "rgba(123,123,123, .8);"   => #cc7b7b7b`);
		console.info(o.s + ` ${name} 123,123,123,.8             => #cc7b7b7b`);
		console.info(o.s + ` ${name} 123,123,123                => #7b7b7b`);
		console.info(o.s + ` ${name} 123 123 123                => #7b7b7b`);
		console.info(o.s + ` ${name} something                  => false`);
		console.info(o.s + ` echo 123,123,123,.8 | ${name} -i   => #cc7b7b7b`);
		console.info('');
	}
	else {
		let HAR = require('../index.js');

		try {
			let p = args.length == 1 ? HAR.rgbaToArray( args.pop() ) : args; 
			let result = HAR.rgbaToAHex( p );
			
			if (result === false) {
				process.stderr.write('false\n');
				process.exit(1);
			}
			else
				console.log(result);
		}
		catch (e) {
			process.stderr.write('false\n');
			process.exit(2);
		}
	}
})();