"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dev_utils_1 = require("@qubic/dev-utils");
var Dotenv = require("dotenv-webpack");
var merge = require("webpack-merge");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var chalk_1 = require("chalk");
var webpack_config_dev_1 = require("../config/webpack.config.dev");
var utils_1 = require("../config/utils");
/** TODO: Move to dev-utils */
var decorateLink = function (link) {
    return chalk_1.default.cyan.underline(link);
};
/**
 * Prepare development server config
 */
var prepareDevConfig = function (options) {
    var config = merge(webpack_config_dev_1.default, {
        entry: {
            bundle: ["webpack-dev-server/client?" + options.url, 'webpack/hot/dev-server'],
        },
        plugins: [
            new Dotenv({
                path: utils_1.buildDotenvPath(options.env),
                silent: true,
                systemvars: true,
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
    });
    return config;
};
/**
 * Start development server based on Webpack Dev Server
 */
var startServer = function (options) {
    // Define development server default options
    var env = options.env;
    // Webpack Dev Server options
    var webpackDevServerOptions = {
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true,
        inline: true,
        noInfo: true,
        overlay: true,
        port: options.port || 8000,
    };
    // Build URLs, use local to open browser tab
    var _a = utils_1.prepareURLs(webpackDevServerOptions.port), local = _a.local, network = _a.network;
    // Webpack compiler
    var config = prepareDevConfig({ url: local, env: env });
    var compiler = webpack(config);
    // Define Webpack Dev Server instance
    var devServer = new WebpackDevServer(compiler, webpackDevServerOptions);
    var isInteractive = process.stdout.isTTY;
    devServer.listen(webpackDevServerOptions.port, webpackDevServerOptions.host, function (error) {
        if (error) {
            dev_utils_1.logger.error(error);
        }
        try {
            utils_1.openTab(local);
        }
        catch (e) {
            dev_utils_1.logger.warning(e.message, '\n');
        }
        if (isInteractive) {
            dev_utils_1.clearConsole();
        }
        dev_utils_1.logger.info('You can visit your development server:\n');
        local && console.log('   Local:  ', decorateLink(local));
        network && console.log('   Network:', decorateLink(network));
        dev_utils_1.logger.br();
        ['SIGINT', 'SIGTERM'].forEach(function (signal) {
            process.on(signal, function () {
                devServer.close();
                process.exit();
            });
        });
    });
};
exports.startServer = startServer;
//# sourceMappingURL=dev.js.map