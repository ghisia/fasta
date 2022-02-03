#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const CHOICES = ['Dockerized', 'Typescript', 'Normal'];
// const CHOICESINSIDE = fs.readdirSync(`${__dirname}/templates`);
const CURR_DIR = process.cwd();
const shell = require('shelljs');
const { on } = require('events');

const QUESTIONSONE = [
    {
        name: 'stack-choice',
        type: 'list',
        message: 'Please choose your project category to use?',
        choices: CHOICES,
    }
];


inquirer.prompt(QUESTIONSONE)
    .then(answers => {
        if(answers['stack-choice'] === 'Dockerized'){
            const CHOICESINSIDE = ['django-docker', 'laravel-docker', 'mern-docker', 'pern-docker', 'mevn-docker'];
            askQuestions(CHOICESINSIDE);
        }else if(answers['stack-choice'] === 'Typescript'){
            const CHOICESINSIDE = ['mern-ts', 'pern-ts', 'mevn-ts'];
            askQuestions(CHOICESINSIDE);
        }else{
            const CHOICESINSIDE = ['mern', 'pern', 'mevn', 'django', 'laravel'];
            askQuestions(CHOICESINSIDE);
        }
    })

    const askQuestions = (CHOICESINSIDE) => {
        const QUESTIONS = [
            {
                name: 'project-choice',
                type: 'list',
                message: 'Please choose the stack you want to use?',
                choices: CHOICESINSIDE
            },
            {
                name: 'project-name',
                type: 'input', 
                message: 'Project name:',
                validate: (input) => {
                    if(/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                    else return 'Project name must only include letters, numbers, underscores and hashes.'
                }
            }
        ];

        inquirer.prompt(QUESTIONS)
            .then(answers => {
                const projectChoice = answers['project-choice']
                const projectName = answers['project-name'];
                const templatePath = `${__dirname}/templates/${projectChoice}`;

                if(fs.existsSync(projectName)){
                    console.log(`Folder ${projectName} exists. Delete or use another name.`);
                    return false;
                } else {
                    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
                    createDirContents(templatePath, projectName);
                    installDependencies(projectName, projectChoice)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const createDirContents = (templatePath, newProjectPath) => {
        const filesToCreate = fs.readdirSync(templatePath);
        
        filesToCreate.forEach(file => {
            const originalFilePath = `${templatePath}/${file}`;
    
            const stats = fs.statSync(originalFilePath);
    
    
            if(stats.isFile()){
                const contents = fs.readFileSync(originalFilePath, 'utf8');
                
                const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
                fs.writeFileSync(writePath, contents, 'utf8');
    
            }else if(stats.isDirectory()){
                fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
    
                createDirContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
            }

            
        });
    };


    const installDependencies = (proName, proChoice) => {
        shell.cd(`${CURR_DIR}/${proName}`);
        if(proChoice === 'laravel-docker'){
            const result = shell.exec('docker-compose up');
            if(result.code !== 0){
                return false;
            }
        }else if(proChoice === 'django-docker'){
            const result= shell.exec('docker-compose up');
            if(result.code === 0){
                return false;
            }
        }else if(proChoice === 'mern-docker'){
            const result= shell.exec('docker-compose up -d');
            if(result.code === 0){
                return false;
            }
        }else if(proChoice === 'pern-docker'){
            const result= shell.exec('npm run docker:up');
            if(result.code === 0){
                return false;
            }
        }else if(proChoice === 'mevn-docker'){
            const result= shell.exec('docker-compose up');
            if(result.code === 0){
                return false;
            }
        }else if(proChoice === 'django'){
            inquirer.prompt([
                {
                    name: 'message',
                    message: 'Since you chose django you have to start your env and start the app. Evaluate well your app.'
                }
            ])
        }else if(proChoice === 'laravel'){
            inquirer.prompt([
                {
                    name: 'message',
                    message: 'Since you chose laravel you have to install dependencies and start the app. do a small tour in your codes to know what\' going.'
                }
            ])
        }else{
            const result = shell.exec('yarn');
            if(result.code !== 0){
                return false;
            }

            if(proChoice === 'mern' || proChoice === 'pern') {
                const result1 = shell.exec('yarn run create');
                if(result1.code !== 0){
                    return false;
                }
            }
        }

        return true;
    };
