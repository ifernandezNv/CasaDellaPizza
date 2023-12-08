"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectTypeMappersFromSourceFile = void 0;
const path = require("path");
const ts_morph_1 = require("ts-morph");
const utils_1 = require("../utils");
const collectTypeMappersFromSourceFile = ({ typeMappersSourceFile, typeMappersSuffix, resolverTypesPath, shouldCollectPropertyMap, emitLegacyCommonJSImports, }, result) => {
    // Look for interfaces with exported keywords
    typeMappersSourceFile.getInterfaces().forEach((interfaceDeclaration) => {
        if (!interfaceDeclaration.hasExportKeyword()) {
            return;
        }
        addTypeMapperDetailsIfValid({
            declarationNode: interfaceDeclaration,
            identifierNode: interfaceDeclaration.getNameNode(),
            typeMappersSuffix,
            typeMappersFilePath: typeMappersSourceFile.getFilePath(),
            resolverTypesPath,
            shouldCollectPropertyMap,
            emitLegacyCommonJSImports,
        }, result);
    });
    // Look for exported types with exported keywords
    typeMappersSourceFile.getTypeAliases().forEach((typeAlias) => {
        if (!typeAlias.hasExportKeyword()) {
            return;
        }
        const identifierNode = typeAlias.getNameNode();
        addTypeMapperDetailsIfValid({
            declarationNode: typeAlias,
            identifierNode,
            typeMappersSuffix,
            typeMappersFilePath: typeMappersSourceFile.getFilePath(),
            resolverTypesPath,
            shouldCollectPropertyMap,
            emitLegacyCommonJSImports,
        }, result);
    });
    // Look for named exports e.g.
    //   - export { something } from 'module';
    //   - export type { something } from 'module';
    //   - export { something, somethingelse as somethingelse2 }'
    typeMappersSourceFile.getExportDeclarations().forEach((exportDeclaration) => {
        exportDeclaration.getNamedExports().forEach((namedExport) => {
            let identifierNode = namedExport.getNameNode();
            const aliasNode = namedExport.getAliasNode();
            if (aliasNode) {
                identifierNode = aliasNode;
            }
            addTypeMapperDetailsIfValid({
                declarationNode: null,
                identifierNode,
                typeMappersSuffix,
                typeMappersFilePath: typeMappersSourceFile.getFilePath(),
                resolverTypesPath,
                shouldCollectPropertyMap,
                emitLegacyCommonJSImports,
            }, result);
        });
    });
    typeMappersSourceFile.getClasses().forEach((classDeclaration) => {
        if (!classDeclaration.hasExportKeyword()) {
            return;
        }
        const identifierNode = classDeclaration.getNameNode();
        if (!identifierNode) {
            // Anonymous class is skipped
            return;
        }
        addTypeMapperDetailsIfValid({
            declarationNode: null,
            identifierNode,
            typeMappersSuffix,
            typeMappersFilePath: typeMappersSourceFile.getFilePath(),
            resolverTypesPath,
            shouldCollectPropertyMap,
            emitLegacyCommonJSImports,
        }, result);
    });
};
exports.collectTypeMappersFromSourceFile = collectTypeMappersFromSourceFile;
const addTypeMapperDetailsIfValid = ({ declarationNode, identifierNode, typeMappersSuffix, typeMappersFilePath, resolverTypesPath, shouldCollectPropertyMap, emitLegacyCommonJSImports, }, result) => {
    const identifierName = identifierNode.getText();
    if (!identifierName.endsWith(typeMappersSuffix)) {
        return;
    }
    const [schemaType] = identifierName.split(typeMappersSuffix);
    if (!schemaType) {
        return;
    }
    /**
     * We MUST use path.relative() instead of path.posix.relative() here
     * Reason being `typeMappersFilePath` is a file system path e.g. C://Windows/Path/To/File or /Unix/path/to/file
     * path.relative works correctly but returns inconsistent path seperator e.g. relative\\path\\windows or relative/path/unix
     *
     * Therefore, we need to split/join to normalise the path to posix path e.g relative/path/unix
     */
    const relativePath = path
        .relative(path.dirname(resolverTypesPath), typeMappersFilePath)
        .split(path.sep)
        .join(path.posix.sep);
    const parsedRelativePathFromResolverTypesToSourceFile = path.parse(relativePath);
    const relativeImportPathFromResolverTypesToSourceFile = (0, utils_1.normalizeRelativePath)(path.posix.join(parsedRelativePathFromResolverTypesToSourceFile.dir, parsedRelativePathFromResolverTypesToSourceFile.name));
    const fileExtension = emitLegacyCommonJSImports ? '' : '.js';
    const configImportPath = `${relativeImportPathFromResolverTypesToSourceFile}${fileExtension}#${identifierName}`;
    if (result[schemaType]) {
        throw new Error(`GraphQL type "${schemaType}" has duplicated "${identifierName}" mappers:\n  - ${configImportPath}\n  - ${result[schemaType].configImportPath}`);
    }
    let typeMapperPropertyMap = {};
    if (shouldCollectPropertyMap) {
        const originalDeclarationNode = getOriginalDeclarationNode(declarationNode, identifierNode);
        typeMapperPropertyMap = (0, utils_1.getNodePropertyMap)(originalDeclarationNode);
    }
    result[schemaType] = {
        schemaType,
        typeMapperName: identifierName,
        typeMapperPropertyMap,
        configImportPath,
    };
};
const getOriginalDeclarationNode = (declarationNode, identifierNode) => {
    if (!declarationNode) {
        return identifierNode.getDefinitionNodes()[0];
    }
    // InterfaceDeclaration
    if (declarationNode.isKind(ts_morph_1.SyntaxKind.InterfaceDeclaration)) {
        return declarationNode;
    }
    // TypeAliasDeclaration
    const typeNode = declarationNode.getTypeNodeOrThrow();
    const node = ts_morph_1.Node.isTypeReference(typeNode) // If type alias is a reference, go to definition using `getDefinitionNodes`
        ? identifierNode.getDefinitionNodes()[0]
        : declarationNode;
    return node;
};
//# sourceMappingURL=collectTypeMappersFromSourceFile.js.map