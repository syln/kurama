#!/usr/bin/env node

const program = require('commander'),
    kyuubi = require('../lib/index.js'),
    appInfo = require('../package.json');

program
    .version(appInfo.version)
    .usage('九尾，是一个全面的前端开发助手' + '[options] <packages>')
    .parse(process.argv);

program
    .command('init [cmd]')
    .description('create a new project')
    .option('-i, init [type]', 'create project')
    .action((cmd, options) => {
        kyuubi(cmd, options)
    }).on('--help', function() {
        console.log('nothing to show')
    });

//默认不传参数输出help
if (!process.argv[2]) {
    program.help();
    console.log('params required');
}

program.parse(process.argv);