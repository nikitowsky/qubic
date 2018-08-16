#!/usr/bin/env node

const chalk = require('chalk');
const inquirer = require('inquirer');
const path = require('path');
const validate = require('validate-npm-package-name');

const { copyTemplate, createFolder, installDependencies, logger, toKebabCase } = require('./utils');

/** Script execution folder (project folder) */
const contextDir = process.cwd();

inquirer
  .prompt([
    {
      name: 'name',
      message: 'Project name?',
      default: 'qubic-app',
      filter: (input) => toKebabCase(input),
      validate: (input) => {
        const validation = validate(input);

        if (validation.validForNewPackages && validation.validForOldPackages) {
          return true;
        }

        throw new Error("Package name isn't valid");
      },
    },
  ])
  .then(async ({ name }) => {
    const projectFolder = path.join(contextDir, name);

    logger.info(`Create folder ${chalk.yellow(projectFolder)}...`);

    // Create project folder
    await createFolder(contextDir, name);

    logger.info('Copy template...');

    // Copy project template
    await copyTemplate(contextDir, name);

    logger.info(`Install dependencies:`);
    console.log(chalk.yellow(' - @qubic/builder'));
    console.log(chalk.yellow(' - react'));
    console.log(chalk.yellow(' - react-dom'));
    console.log(chalk.yellow(' - react-hot-loader'));
    console.log(chalk.yellow(' - typescript'));
    console.log('');

    // Install dependencies
    const installation = installDependencies(projectFolder);

    try {
      installation.stdout.pipe(process.stdout);
    } catch (e) {
      // Do nothing on errors
    }

    console.log();
    logger.info('Now you can start by following these commands:');
    console.log('');
    console.log(`   ${chalk.white(`cd ${name}`)}`);
    console.log('');
    console.log(`   ${chalk.white('yarn start')} - start development server`);
    console.log(`   ${chalk.white('yarn build')} - build project`);
    console.log(`   ${chalk.white('yarn clean')} - clean ${chalk.yellow('dist')} folder`);
  })
  .catch((e) => {
    logger.error('Cannot init project, reason:', e.message);
  });
