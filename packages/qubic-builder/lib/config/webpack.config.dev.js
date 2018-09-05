"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge = require("webpack-merge");
var awesome_typescript_loader_1 = require("awesome-typescript-loader");
var webpack_config_base_1 = require("./webpack.config.base");
var devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [new awesome_typescript_loader_1.CheckerPlugin()],
};
exports.default = merge(webpack_config_base_1.default, devConfig);
//# sourceMappingURL=webpack.config.dev.js.map