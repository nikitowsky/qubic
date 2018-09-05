"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = require('@qubic/dev-utils').logger;
var rimraf = require("rimraf");
var ora = require("ora");
var utils_1 = require("../config/utils");
var startClean = function () {
    var spinner = ora("Cleaning " + utils_1.constants.paths.outputDir + "...").start();
    rimraf(utils_1.constants.paths.outputDir, function () {
        spinner.stop();
        logger.info('Successfully cleaned');
    });
};
exports.startClean = startClean;
//# sourceMappingURL=clean.js.map