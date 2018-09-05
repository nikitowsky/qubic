#!/usr/bin/env node

import { logger } from '@qubic/dev-utils';
import * as path from 'path';
import chalk from 'chalk';
const inquirer = require('inquirer') as any;
const validate = require('validate-npm-package-name') as any;

import { copyTemplate, createFolder, installDependencies, toKebabCase } from './utils';

/** Script execution folder (project folder) */
const contextDir = process.cwd();

inquirer
  .prompt([
    {
      name: 'name',
      message: 'Project name?',
      default: 'qubic-app',
      filter: (input: string) => toKebabCase(input),
      validate: (input: string) => {
        const validation = validate(input);

        if (validation.validForNewPackages && validation.validForOldPackages) {
          return true;
        }

        throw new Error("Package name isn't valid");
      },
    },
  ])
  .then(async ({ name }: { name: string }) => {
    const projectFolder = path.join(contextDir, name);

    logger.info(`Create folder ${chalk.yellow(projectFolder)}...`);

    // Create project folder
    await createFolder(contextDir, name);

    logger.info('Copy template...');

    // Copy project template
    await copyTemplate(contextDir, name);

    logger.info(`Install dependencies: ${chalk.yellow('qubic, react, typescript dependencies')}...`);
    logger.br();

    // Install dependencies
    const installation = installDependencies(projectFolder);

    try {
      // @ts-ignore
      installation.stdout.pipe(process.stdout);
    } catch (e) {
      // Do nothing on errors
    }

    logger.br();
    logger.info('Now you can start by following these commands:');
    logger.br();
    console.log(`   ${chalk.white(`cd ${name}`)}`);
    logger.br();
    console.log(`   ${chalk.white('yarn start')} - start development server`);
    console.log(`   ${chalk.white('yarn build')} - build project`);
    console.log(`   ${chalk.white('yarn clean')} - clean ${chalk.yellow('dist')} folder`);
  })
  .catch((e: Error) => {
    logger.error('Cannot init project, reason:', e.message);
  });
