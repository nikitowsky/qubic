"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
// TODO: Rename to CONTEXT_DIR
/** Script execution folder (project folder) */
var contextDir = process.cwd();
exports.contextDir = contextDir;
/**
 * Important files paths
 */
var paths = {
    outputDir: path.join(contextDir, 'dist'),
    source: path.join(contextDir, 'src/index.tsx'),
    template: path.join(contextDir, 'src/index.html'),
};
exports.paths = paths;
/**
 * Regular expressions for Webpack
 */
var regexp = {
    css: /\.(css|scss|sass)$/,
    cssModules: /\.module\.(css|scss|sass)$/,
    files: /\.(png|jpg|jpeg|webp|gif|svg|woff|woff2|eot|ttf)$/,
    graphql: /\.(graphql|gql)$/,
    typescript: /\.(ts|tsx)$/,
};
exports.regexp = regexp;
//# sourceMappingURL=constants.js.map