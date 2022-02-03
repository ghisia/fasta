#!/usr/bin/env node
const { default: axios } = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const CURR_DIR = process.cwd();
const shell = require('shelljs');

const QUESTIONS = [
    {
        name: 'repo-name',
        type: 'input',
        message: 'Wow, seems like you want to create a git hub repo for this app. \nPlease enter the repo name:',
        validate: (input) => {
            if(/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name must only include letters, numbers, underscores and hashes.'
        }
    }
]

inquirer.prompt(QUESTIONS)
    .then((answers) => {
        const githubRepoName = answers['repo-name'];
        axios.post('https://api.github.com/user/repos', {
            name: githubRepoName
        }, 
        {
            headers: {
                "Authorization":"Bearer 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"
            }
        }).then((res) => {
            console.log({
                status: res.status,
                message: 'Great You have created a github repo',
                repo: res.data.clone_url
            });

            shell.exec('git init');
            shell.exec('git branch -M main');
            shell.exec(`git remote add origin ${res.data.clone_url}`);
            shell.exec('git add .');
            shell.exec('git commit -m "my first deploy with get-start-fast"');
            shell.exec('git push -u origin main');

        })
        .catch(err => console.log(err))
    })