"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTypeDefsFiles = void 0;
const path = require("path");
const utils_1 = require("../utils");
const generateTypeDefsContent_1 = require("./generateTypeDefsContent");
const generateTypeDefsFiles = ({ baseOutputDir, typeDefsFilePath, typeDefsFileMode, sourceMap, blacklistedModules, whitelistedModules, }) => {
    const filesContent = {};
    Object.values(sourceMap).forEach(({ moduleName, source, sourcePath }) => {
        const isWhitelisted = (0, utils_1.isWhitelistedModule)({
            moduleName,
            whitelistedModules,
            blacklistedModules,
        });
        if (typeDefsFileMode === 'merged') {
            appendSDLToFile({
                filesContent,
                filePath: path.posix.join(baseOutputDir, typeDefsFilePath),
                rawSDL: source.rawSDL,
            });
            return;
        }
        if (isWhitelisted && typeDefsFileMode === 'mergedWhitelisted') {
            appendSDLToFile({
                filesContent,
                filePath: path.posix.join(baseOutputDir, typeDefsFilePath),
                rawSDL: source.rawSDL,
            });
            return;
        }
        if (isWhitelisted && typeDefsFileMode === 'modules') {
            // sourcePath.dir is absolute which does not work well to use as filenames for Windows
            // example of cases where it does not work:
            //   - when `prettier` is run in afterAllFileWrite hooks with absolute Windows path
            const relativeSourcePathDir = path.posix.relative((0, utils_1.cwd)(), sourcePath.dir);
            appendSDLToFile({
                filesContent,
                filePath: path.posix.join(relativeSourcePathDir, typeDefsFilePath),
                rawSDL: source.rawSDL,
            });
            return;
        }
    });
    const result = {};
    Object.entries(filesContent).forEach(([filePath, content]) => {
        result[filePath] = {
            __filetype: 'file',
            content: (0, generateTypeDefsContent_1.generateTypeDefsContent)({ mergedSDL: content }),
            mainImportIdentifier: 'typeDefs',
        };
    });
    return result;
};
exports.generateTypeDefsFiles = generateTypeDefsFiles;
const appendSDLToFile = ({ rawSDL, filePath, filesContent, }) => {
    if (!rawSDL) {
        return;
    }
    if (!filesContent[filePath]) {
        filesContent[filePath] = '';
    }
    filesContent[filePath] += `${rawSDL}\n`;
};
//# sourceMappingURL=generateTypeDefsFiles.js.map