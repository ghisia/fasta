#!/usr/bin/env node
const { default: axios } = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const CURR_DIR = process.cwd();
const shell = require('shelljs');
const QUESTIONS = [
    {
        name: 'app-name',
        type: 'input',
        message: 'Wow, seems like you want to deploy this app on heroku. \nPlease enter the the heroku app name:',
        validate: (input) => {
            if(/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name must only include letters, numbers, underscores and hashes.'
        }
    }
]

inquirer.prompt(QUESTIONS)
    .then((answers) => {
        const appName = answers['app-name'];
        shell.exec('git init');
        shell.exec('git add .');
        shell.exec('git commit -m "My first COmmit to deploy on heroku"');
        shell.exec(`heroku create ${appName}`);
        shell.exec('git push heroku main');
        
    })