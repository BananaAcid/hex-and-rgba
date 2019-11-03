#!/usr/bin/env node

(async()=>{
    // remove node binary and script name from params
    let args = global.args || process.argv.slice(2);

    // check if -s was given as param
    let arg = -1, arg2 = -1,
        mod = 0;

    if (!!~(arg = args.indexOf('-s')))
        mod = 's';
    else if (!!~(arg = args.indexOf('-t')))
        mod = 't';
    else if (!!~(arg = args.indexOf('-n')))
        mod = 'n';
        
    if (arg !== -1)
        args.splice(arg, 1);

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
        console.info(`\nusage: ${name} [-stni] <aHex>`);
        console.info(`\nparams:`);
        console.info(`  -s      out as css rgba string`);
        console.info(`  -t      out as tab seperated rgba parts`);
        console.info(`  -n      out as newline seperated rgba parts`);
        console.info(`  -i      use pipe in content`);
        console.info(`\nexamples:`);
        console.info(o.s + ` ${name} "#cc7b7b7b"                => [ 123, 123, 123, 0.8 ]`);
        console.info(o.s + ` ${name} cc7b7b7b                   => [ 123, 123, 123, 0.8 ]`);
        console.info(o.s + ` ${name} cc 7b 7b 7b                => [ 123, 123, 123, 0.8 ]`);
        console.info(o.s + ` ${name} cc7b7b7b    -s             => rgba(123,123,123,0.8)`);
        console.info(o.s + ` ${name} something                  => false`);
        console.info(o.s + ` echo #cc7b7b7b | ${name} -i        => [ 123, 123, 123, 0.8 ]`);
        console.info('');
    }
    else {
        let HAR = require('../index.js');

        try {
            let p = args.length == 1 ? args.pop() : args.join(''); 

            if (p[0] != '#') p = '#' + p; // prefix with '#' if needed
            let result = HAR.aHexToRgba( p );
            
            if (result === false) {
                process.stderr.write('false\n');
                process.exit(1);
            }
            else {
                if (mod == 's')
                    console.log(result.toString());
                else if (mod == 't')
                    console.log(result.join('\t'));
                else if (mod == 'n')
                    console.log(result.join('\n'));
                else {
                    console.log(JSON.stringify(result));        // output json array
                }
            }
        }
        catch (e) {
            process.stderr.write('false\n');
            process.exit(2);
        }
    }
})();