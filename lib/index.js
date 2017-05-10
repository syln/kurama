const inquirer = require('inquirer');
const rootDir = process.cwd();
const childProcess = require('child_process');
const fs = require('fs');
const exists = require('fs').existsSync
const download = require('nodegit-clone');
const path = require('path');


const list = [{
    type: 'input',
    name: 'projectName',
    message: 'What\'s your project name',
    default: function() {
        return 'project'
    }
}, {
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


const processHandler = function(url, tmp) {
    console.log('start to create');
    let localPath = path.join(process.cwd(), tmp);

    download({ url, localPath }).then(repo => {
        console.log('done! enjoy it!')
    })
};

module.exports = (cmd, options) => {
    if (options.init = true) {
        inquirer.prompt(list).then((answers) => {
            let tmp = answers.projectName;

            if (exists(tmp)) {
                fs.rmdirSync(tmp)
            };

            if (answers.frame === 'Vue') {
                if (answers.project === 'multi-pages') {
                    processHandler('https://github.com/beyond-FE/cooking-vue.git', tmp);
                } else if (answers.project === 'SPA (single page app)') {
                    processHandler('https://github.com/beyond-FE/cooking-vue-spa.git', tmp);
                } else if (answers.project === 'BMS (background management system)') {
                    processHandler('https://github.com/beyond-FE/BMS-admin.git', tmp);
                }
            } else if (answers.frame === 'React') {
                if (answers.project == 'multi-pages') {
                    processHandler('https://github.com/beyond-FE/cooking-react.git', tmp)
                } else {
                    console.log('to be updated')
                }
            }
        })
    }
}