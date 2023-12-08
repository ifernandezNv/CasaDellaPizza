"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relativeModulePath = void 0;
const path = require("path");
const normalizeRelativePath_1 = require("./normalizeRelativePath");
const relativeModulePath = (from, to) => {
    const rawPath = path.posix.relative(from, to);
    return (0, normalizeRelativePath_1.normalizeRelativePath)(rawPath);
};
exports.relativeModulePath = relativeModulePath;
//# sourceMappingURL=relativeModulePath.js.map