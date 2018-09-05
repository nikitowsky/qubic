"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts incoming input to kebab-case string
 */
var toKebabCase = function (string) {
    return string
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
};
exports.default = toKebabCase;
//# sourceMappingURL=toKebabCase.js.map