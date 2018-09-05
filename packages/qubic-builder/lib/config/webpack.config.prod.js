"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge = require("webpack-merge");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack_config_base_1 = require("./webpack.config.base");
var utils_1 = require("./utils");
var prodConfig = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name].[hash].js',
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
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: utils_1.constants.regexp.css,
                exclude: utils_1.constants.regexp.cssModules,
                use: utils_1.buildStyleLoader({ extractFile: true }),
            },
            {
                test: utils_1.constants.regexp.cssModules,
                use: utils_1.buildStyleLoader({
                    cssModules: true,
                    extractFile: true,
                }),
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
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].chunk.css',
        }),
    ],
};
exports.default = merge.smartStrategy({ 'module.rules': 'replace' })(webpack_config_base_1.default, prodConfig);
//# sourceMappingURL=webpack.config.prod.js.map