#!/usr/bin/env node

import { logger } from '@qubic/dev-utils';
const inquirer = require('inquirer') as any;
const validate = require('validate-npm-package-name') as any;

import QubicCreator from './QubicCreator';
import { showInstructions, toKebabCase } from './utils';

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
  .then(({ name }: { name: string }) => {
    const creator = new QubicCreator({ name });

    creator.createFolder();
    creator.copyTemplate();
    creator.installDependencies();

    showInstructions();
  })
  .catch((e: Error) => {
    logger.error('Cannot init project, reason:', e.message);
  });
