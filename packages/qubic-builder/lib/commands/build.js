"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = require('@qubic/dev-utils').logger;
var SizePlugin = require('size-plugin');
var Dotenv = require("dotenv-webpack");
var merge = require("webpack-merge");
var ora = require("ora");
var webpack = require("webpack");
var webpack_config_prod_1 = require("../config/webpack.config.prod");
var utils_1 = require("../config/utils");
/**
 * Prepare production config
 */
var prepareProdConfig = function (_a) {
    var _b = _a.env, env = _b === void 0 ? 'production' : _b;
    var config = merge(webpack_config_prod_1.default, {
        plugins: [
            new Dotenv({
                path: utils_1.buildDotenvPath(env),
                silent: true,
                systemvars: true,
            }),
        ],
    });
    return config;
};
/**
 * Build project using Webapck
 */
var startBuild = function (_a) {
    var _b = _a.env, env = _b === void 0 ? 'production' : _b;
    var config = prepareProdConfig({ env: env });
    var spinner = ora("Building " + env + "...\n").start();
    var compiler = webpack(config);
    // No deprecation errors unless built-in webpack.ProgressPlguin dosen't use hooks api
    // @ts-ignore
    process.noDeprecation = true;
    compiler.apply(new webpack.ProgressPlugin(function (precentage) {
        var computedPrecentage = (precentage * 100).toFixed(0);
        spinner.text = "Building " + env + " " + computedPrecentage + "%...\n";
    }));
    compiler.hooks.afterEmit.tap('Qubic', function () {
        spinner.stop();
    });
    compiler.run(function (error, stats) {
        if (error || stats.hasErrors()) {
            // Handle errors here
            logger.br();
            logger.error('Compilation failed, reason:\n');
            spinner.stop();
            return console.log(error || 'Unknown error :(');
        }
        // Done processing
        spinner.stop();
    });
    compiler.apply(new SizePlugin());
};
exports.startBuild = startBuild;
//# sourceMappingURL=build.js.map