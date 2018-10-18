import * as path from 'path';
import * as Dotenv from 'dotenv';

const stringify = (obj: any) => {
  const computed = {};

  Object.keys(obj).forEach((key: any) => {
    Object.assign(computed, { [key]: JSON.stringify(obj[key]) });
  });

  return computed;
};

/**
 * Load invironment variables from `.env` files
 */
const getDotenv = (dotenv: string) => {
  const cwd = process.cwd();

  const { parsed: baseVars } = Dotenv.config({
    path: path.join(cwd, '.env'),
  });

  const { parsed: envVars } = Dotenv.config({
    path: path.join(cwd, `.env.${dotenv}`),
  });

  return {
    'process.env': {
      ...stringify(process.env),
      ...stringify(baseVars),
      ...stringify(envVars),
    },
  };
};

export default getDotenv;
