"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cwd = void 0;
const path = require("path");
/**
 * It is process.cwd() but normalised for all OS
 */
const cwd = () => {
    return process.cwd().split(path.sep).join(path.posix.sep);
};
exports.cwd = cwd;
//# sourceMappingURL=cwd.js.map