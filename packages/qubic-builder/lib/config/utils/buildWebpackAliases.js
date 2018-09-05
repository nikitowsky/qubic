"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var constants_1 = require("./constants");
/**
 * Builds Webpack-friendly aliases based on your `tsconfig.json`
 */
var buildWebpackAliases = function () {
    var tsConfigPath = path.join(constants_1.contextDir, 'tsconfig.json');
    var tsConfig = require(tsConfigPath);
    var compilerOptions = tsConfig.compilerOptions;
    var _a = compilerOptions, baseUrl = _a.baseUrl, paths = _a.paths;
    var webpackAliases = {};
    if (baseUrl && paths) {
        // Resolve system-relative path for `baseUrl`
        var sourcesRootDir_1 = path.join(constants_1.contextDir, baseUrl);
        Object.entries(paths).forEach(function (alias) {
            var key = alias[0].replace('/*', '');
            // As long Webpack dosen't support array as alias (like tsConfig does), we always use first alias path
            var pathToAlias = alias[1][0].replace('/*', '');
            // Build Webpack-friendly alias config
            webpackAliases[key] = path.join(sourcesRootDir_1, pathToAlias);
        });
    }
    return webpackAliases;
};
exports.default = buildWebpackAliases;
//# sourceMappingURL=buildWebpackAliases.js.map