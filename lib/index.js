const inquirer = require('inquirer');
const process = require('child_process');
const ProgressBar = require('progress');

const list = [{
    type: 'list',
    name: 'frame',
    message: 'select a frame',
    choices: [
        'Vue',
        'React'
    ]
}, {
    type: 'list',
    name: 'project',
    message: 'select a project to create',
    choices: [
        'multi-pages',
        'SPA (single page app)',
        'BMS (background management system)'
    ]
}]


const processHandler = function(url) {
    console.log('start to create');
    process.exec(url, function(error, stdout, stderr) {
        if (error) {
            console.error('error: ' + error);
            return;
        }
        const bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: stderr.length
        });
        bar.tick(stderr.length);
        if (bar.complete) {
            console.log('done! enjoy it!')
        }
    })
};

module.exports = (cmd, options) => {
    if (options.init = true) {
        inquirer.prompt(list).then((answers) => {
            if (answers.frame === 'Vue') {
                if (answers.project === 'multi-pages') {
                    processHandler('git clone https://github.com/beyond-FE/cooking-vue.git');
                } else if (answers.project === 'SPA (single page app)') {
                    processHandler('git clone https://github.com/beyond-FE/cooking-vue-spa.git');
                } else if (answers.project === 'BMS (background management system)') {
                    processHandler('git clone https://github.com/beyond-FE/BMS-admin.git');
                }
            } else if (answers.frame === 'React') {
                if (answers.project == 'multi-pages') {
                    processHandler('git clone https://github.com/beyond-FE/cooking-react.git')
                } else {
                    console.log('to be updated')
                }
            }
        })
    }
}