"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeRelativePath = void 0;
const normalizeRelativePath = (path) => {
    if (!path.startsWith('../') || !path.startsWith('./')) {
        return `./${path}`;
    }
    return path;
};
exports.normalizeRelativePath = normalizeRelativePath;
//# sourceMappingURL=normalizeRelativePath.js.map