#!/usr/bin/env node

const path = require('path');
const inquirer = require('inquirer');
const validate = require('validate-npm-package-name');
const Listr = require('listr');

const { copyTemplate, createFolder, installDependencies, toKebabCase } = require('./utils');

/** Script execution folder (project folder) */
const contextDir = process.cwd();

inquirer
  .prompt([
    {
      name: 'name',
      message: 'Project name?',
      default: 'quber-app',
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
  .then(({ name }) => {
    const projectFolder = path.join(contextDir, name);
    const tasks = new Listr([
      {
        title: 'Create folder',
        task: async () => await createFolder(contextDir, name),
      },
      {
        title: 'Prepare project layout',
        task: async () => await copyTemplate(contextDir, name),
      },
      {
        title: 'Install dependencies',
        task: async () => await installDependencies(projectFolder),
      },
    ]);

    tasks.run().catch((e) => {
      console.log('Installation failed, reason:\n');
      console.log(e.message);
    });
  });
