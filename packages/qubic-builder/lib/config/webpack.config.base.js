"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HtmlWebpackPlugin = require("html-webpack-plugin");
var utils_1 = require("./utils");
var baseConfig = {
    entry: {
        bundle: [utils_1.constants.paths.source],
    },
    output: {
        path: utils_1.constants.paths.outputDir,
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: utils_1.constants.regexp.typescript,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            silent: true,
                            useTranspileModule: true,
                            useBabel: true,
                            babelOptions: {
                                babelrc: false,
                                plugins: ['react-hot-loader/babel'],
                            },
                            babelCore: '@babel/core',
                        },
                    },
                ],
            },
            {
                test: utils_1.constants.regexp.css,
                exclude: utils_1.constants.regexp.cssModules,
                use: utils_1.buildStyleLoader(),
            },
            {
                test: utils_1.constants.regexp.cssModules,
                use: utils_1.buildStyleLoader({ cssModules: true }),
            },
            {
                test: utils_1.constants.regexp.files,
                loader: 'file-loader',
                options: {
                    name: '[sha512:hash:base64:7].[ext]',
                },
            },
            {
                test: utils_1.constants.regexp.graphql,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: utils_1.buildWebpackAliases(),
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: utils_1.constants.paths.template,
        }),
    ],
};
exports.default = baseConfig;
//# sourceMappingURL=webpack.config.base.js.map