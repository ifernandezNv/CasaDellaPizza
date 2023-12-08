"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWhitelistedModule = void 0;
const isWhitelistedModule = ({ moduleName, whitelistedModules, blacklistedModules, }) => {
    if (blacklistedModules.includes(moduleName)) {
        return false;
    }
    const isInWhitelistedModule = 
    // whitelistedModules is empty a.k.a. all are whitelisted
    whitelistedModules.length === 0
        ? true
        : whitelistedModules.includes(moduleName);
    return isInWhitelistedModule;
};
exports.isWhitelistedModule = isWhitelistedModule;
//# sourceMappingURL=isWhitelistedModule.js.map