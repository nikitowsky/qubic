"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var autoprefixer = require("autoprefixer");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
/**
 * Returns list of loaders for specific situation
 */
var buildStyleLoader = function (options) {
    if (options === void 0) { options = {}; }
    var _a = options.cssModules, cssModules = _a === void 0 ? false : _a, _b = options.extractFile, extractFile = _b === void 0 ? false : _b;
    var CSSLoader = {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
        },
    };
    var PostCSSLoader = {
        loader: 'postcss-loader',
        options: {
            plugins: function () { return [autoprefixer()]; },
        },
    };
    if (cssModules) {
        CSSLoader.options = __assign({}, CSSLoader.options, { localIdentName: '[local]___[hash:base64:5]', modules: true });
    }
    // Use inline styles in development, extract files in production
    var endpointLoader = extractFile ? MiniCssExtractPlugin.loader : 'style-loader';
    var loaders = [endpointLoader, CSSLoader, 'csso-loader', PostCSSLoader, 'sass-loader'];
    return loaders;
};
exports.default = buildStyleLoader;
//# sourceMappingURL=buildStyleLoader.js.map