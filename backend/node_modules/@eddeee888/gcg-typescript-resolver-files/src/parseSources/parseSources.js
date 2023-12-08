"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSources = void 0;
const path = require("path");
function parseSources(sources) {
    return sources.reduce((result, source) => {
        if (!source.location) {
            throw new Error('Missing source location');
        }
        const sourcePath = path.parse(source.location);
        const moduleDir = sourcePath.dir;
        const moduleName = path.basename(moduleDir);
        result.sourceMap[source.location] = {
            source,
            sourcePath,
            moduleName,
        };
        return result;
    }, { sourceMap: {} });
}
exports.parseSources = parseSources;
//# sourceMappingURL=parseSources.js.map