"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
/**
 * Folder where to copy
 *
 * @param {*} directory Path to copy
 * @param {*} projectName Project name
 */
var copyTemplate = function (directory, projectName) {
    var directoryPath = path.join(directory, projectName);
    var templatePath = path.join(__dirname, '../../template');
    var filesToCopy = ['src', 'package.json', 'tsconfig.json'];
    filesToCopy.forEach(function (fileName) {
        var pathToCopy = path.join(templatePath, fileName);
        var pathToPaste = path.join(directoryPath, fileName);
        fs.copy(pathToCopy, pathToPaste);
    });
};
exports.default = copyTemplate;
//# sourceMappingURL=copyTemplate.js.map