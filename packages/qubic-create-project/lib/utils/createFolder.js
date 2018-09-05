"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var chalk_1 = require("chalk");
/**
 * Creates project folder
 *
 * @param {*} directory Where to create folder
 * @param {*} projectName Folder name
 */
var createFolder = function (directory, projectName) {
    var directoryPath = path.join(directory, projectName);
    var directoryAlreadyExist = fs.existsSync(directoryPath);
    if (!directoryAlreadyExist) {
        return fs.mkdir(directoryPath);
    }
    throw new Error("Folder " + chalk_1.default.white(projectName) + " already exists!");
};
exports.default = createFolder;
//# sourceMappingURL=createFolder.js.map