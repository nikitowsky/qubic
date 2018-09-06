import { spawnSync } from 'child_process';

enum PackageManagers {
  YARN = 'yarn',
  NPM = 'npm',
}

type PackageManager = PackageManagers.YARN | PackageManagers.NPM;

/**
 * Decide what package manager to use
 */
const getPackageManager = (): PackageManager => {
  let packageManager = PackageManagers.NPM;

  const { stdout } = spawnSync(PackageManagers.YARN, ['-v']);
  const version = stdout.toString();
  const major = parseInt(version[0]);

  if (version && major >= 1) {
    packageManager = PackageManagers.YARN;
  }

  return packageManager;
};

export default getPackageManager;
