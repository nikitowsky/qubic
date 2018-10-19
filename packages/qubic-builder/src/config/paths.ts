import * as path from 'path';

const cwd = process.cwd();

const paths: Record<string, string> = {
  dist: path.join(cwd, 'dist'),
  entry: path.join(cwd, 'src/index.tsx'),
  template: path.join(cwd, 'public/index.html'),
  tsconfig: path.join(cwd, 'tsconfig.json'),
};

export default paths;
