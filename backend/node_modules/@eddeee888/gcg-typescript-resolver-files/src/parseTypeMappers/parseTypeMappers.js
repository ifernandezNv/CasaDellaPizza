"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTypeMappers = void 0;
const path = require("path");
const collectTypeMappersFromSourceFile_1 = require("./collectTypeMappersFromSourceFile");
const parseTypeMappers = ({ sourceMap, resolverTypesPath, typeMappersFileExtension, typeMappersSuffix, tsMorphProject, shouldCollectPropertyMap, emitLegacyCommonJSImports, }) => {
    const result = Object.entries(sourceMap).reduce((res, [_, { sourcePath }]) => {
        const typeMapperFilePath = path.posix.join(sourcePath.dir, `${sourcePath.name}${typeMappersFileExtension}`);
        const typeMappersSourceFile = tsMorphProject.addSourceFileAtPathIfExists(typeMapperFilePath);
        if (!typeMappersSourceFile) {
            return res;
        }
        (0, collectTypeMappersFromSourceFile_1.collectTypeMappersFromSourceFile)({
            typeMappersSourceFile,
            typeMappersSuffix,
            resolverTypesPath,
            shouldCollectPropertyMap,
            emitLegacyCommonJSImports,
        }, res);
        return res;
    }, {});
    return result;
};
exports.parseTypeMappers = parseTypeMappers;
//# sourceMappingURL=parseTypeMappers.js.map