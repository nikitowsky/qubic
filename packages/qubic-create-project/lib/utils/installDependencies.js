"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
/**
 * Decide what package manager to use
 */
var getPackageManager = function () {
    var packageManager = 'npm';
    var stdout = child_process_1.spawnSync('yarn', ['-v']).stdout;
    var version = stdout.toString();
    var major = parseInt(version[0]);
    if (version && major >= 1) {
        packageManager = 'yarn';
    }
    return packageManager;
};
/**
 * Install packages
 *
 * @param {string} directory
 */
var installDependencies = function (directory) {
    var packageManager = getPackageManager();
    var packagesToInstall = [
        '@qubic/builder@2.0.0-beta.12',
        'react',
        'react-dom',
        'react-hot-loader',
        '@types/react',
        '@types/react-dom',
        '@types/react-hot-loader',
        'typescript',
    ];
    var commands = {
        yarn: ['add'].concat(packagesToInstall),
        npm: ['install', '--save'].concat(packagesToInstall),
    };
    try {
        var command = commands[packageManager];
        return child_process_1.spawnSync(packageManager, command, {
            cwd: directory,
            stdio: 'inherit',
        });
    }
    catch (e) {
        throw new Error('Unable to install depenencies, check out your internet connection');
    }
};
exports.default = installDependencies;
//# sourceMappingURL=installDependencies.js.map