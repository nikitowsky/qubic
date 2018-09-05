"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var constants_1 = require("./constants");
/**
 * Returns path to `.env` file
 *
 * @param {string} env Environment variable (ex. `production`, `stage`, `development`)
 */
var buildDotenvPath = function (env) {
    if (env === void 0) { env = 'development'; }
    return path.join(constants_1.contextDir, ".env." + env);
};
exports.default = buildDotenvPath;
//# sourceMappingURL=buildDotenvPath.js.map