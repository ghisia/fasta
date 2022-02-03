#!/usr/bin/env node
const { default: axios } = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const CURR_DIR = process.cwd();
const shell = require('shelljs');

const QUESTIONS = [
    {
        name: 'confirm',
        type: 'confirm',
        message: 'DO you want to deploy this update?, reply with Y/N: '
    }
]

inquirer.prompt(QUESTIONS)
    .then((answers) => {
        const confirmed = answers['confirm'];
        
        if(confirmed){
            shell.exec('git init');
            shell.exec('git add .');
            shell.exec('git commit -m "My other commit to deploy"');
            shell.exec('git push heroku main');
        }
        
    })