"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postProcessFiles = void 0;
const path = require("path");
const utils_1 = require("../utils");
const getVariableStatementWithExpectedIdentifier_1 = require("./getVariableStatementWithExpectedIdentifier");
const ensureObjectTypeResolversAreGenerated_1 = require("./ensureObjectTypeResolversAreGenerated");
/**
 * postProcessFiles does static analysis on existing files OR to-be-generated files
 * e.g.
 * - Make sure correct variables are exported
 * - Make sure object types have field resolvers if mapper type's field cannot be used as schema type's field
 */
const postProcessFiles = ({ config: { tsMorph: { project }, fixObjectTypeResolvers, }, result, }) => {
    const sourceFilesToProcess = [];
    Object.entries(result.files).forEach(([filePath, file]) => {
        if (file.__filetype === 'file') {
            return;
        }
        const existingSourceFile = project.addSourceFileAtPathIfExists(filePath);
        if (existingSourceFile) {
            sourceFilesToProcess.push({
                sourceFile: existingSourceFile,
                resolverFile: file,
            });
            return;
        }
        // If cannot find existing source files, load files that need post-processing into sourceFilesToProcess
        if (file.__filetype === 'objectType') {
            const virtualSourceFile = project.createSourceFile(filePath, file.content);
            sourceFilesToProcess.push({
                sourceFile: virtualSourceFile,
                resolverFile: file,
            });
        }
    });
    sourceFilesToProcess.forEach(({ sourceFile, resolverFile }) => {
        const normalizedRelativePath = path.posix.relative((0, utils_1.cwd)(), sourceFile.getFilePath());
        // TODO: Check missing import
        // ...
        ensureExportedResolver(sourceFile, resolverFile);
        if (fixObjectTypeResolvers === 'smart' &&
            resolverFile.__filetype === 'objectType') {
            (0, ensureObjectTypeResolversAreGenerated_1.ensureObjectTypeResolversAreGenerated)(sourceFile, resolverFile);
        }
        // Overwrite existing files with fixes
        result.files[normalizedRelativePath] = Object.assign(Object.assign({}, resolverFile), { content: sourceFile.getText() });
    });
};
exports.postProcessFiles = postProcessFiles;
/**
 * Ensure correctly named resolvers are exported
 */
const ensureExportedResolver = (sourceFile, resolverFile) => {
    const { variableStatement, isExported } = (0, getVariableStatementWithExpectedIdentifier_1.getVariableStatementWithExpectedIdentifier)(sourceFile, resolverFile);
    if (!variableStatement) {
        // Did not find variable statement with expected identifier, add it to the end with a warning
        sourceFile.addStatements('/* WARNING: The following resolver was missing from this file. Make sure it is properly implemented or there could be runtime errors. */');
        sourceFile.addStatements(resolverFile.meta.variableStatement);
    }
    else if (variableStatement && !isExported) {
        // If has identifier but not exported
        // Add export keyword to statement
        const isExpectedIdentifierExported = Boolean(sourceFile
            .getExportedDeclarations()
            .get(resolverFile.mainImportIdentifier));
        if (!isExpectedIdentifierExported) {
            variableStatement.setIsExported(true);
        }
        // else, if identifier's been exported do nothing
    }
};
//# sourceMappingURL=postProcessFiles.js.map