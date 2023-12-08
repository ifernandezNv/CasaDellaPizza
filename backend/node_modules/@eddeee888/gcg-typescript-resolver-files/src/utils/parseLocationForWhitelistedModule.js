"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLocationForWhitelistedModule = void 0;
const isWhitelistedModule_1 = require("./isWhitelistedModule");
const parseLocationForWhitelistedModule = ({ location, sourceMap, whitelistedModules, blacklistedModules, }) => {
    if (!location) {
        throw new Error('Location is invalid');
    }
    const sourceFilename = location.source.name;
    const sourceFile = sourceMap[sourceFilename];
    if (!sourceFile) {
        throw new Error(`Unable to find ${sourceFilename} in sourceMap`);
    }
    const isWhitelisted = (0, isWhitelistedModule_1.isWhitelistedModule)({
        moduleName: sourceFile.moduleName,
        whitelistedModules,
        blacklistedModules,
    });
    return isWhitelisted ? sourceFile : undefined;
};
exports.parseLocationForWhitelistedModule = parseLocationForWhitelistedModule;
//# sourceMappingURL=parseLocationForWhitelistedModule.js.map