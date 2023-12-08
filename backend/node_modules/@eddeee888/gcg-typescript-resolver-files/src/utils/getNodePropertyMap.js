"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodePropertyMap = void 0;
const ts_morph_1 = require("ts-morph");
/**
 * Function to get properties of a Node in a map
 * If unable to find, returns empty object
 */
const getNodePropertyMap = (node) => {
    if (!node) {
        return {};
    }
    const properties = getNodeProperties(node);
    const nodePropertyMap = properties.reduce((res, { propertyName }) => {
        res[propertyName] = {
            name: propertyName,
        };
        return res;
    }, {});
    return nodePropertyMap;
};
exports.getNodePropertyMap = getNodePropertyMap;
const getNodeProperties = (node) => {
    if (node.isKind(ts_morph_1.SyntaxKind.InterfaceDeclaration)) {
        return node.getProperties().map((prop) => ({
            propertyName: prop.getName(),
        }));
    }
    else if (node.isKind(ts_morph_1.SyntaxKind.TypeAliasDeclaration)) {
        const typeNode = node.getTypeNodeOrThrow();
        const properties = [];
        collectTypeNodeProperties(typeNode, properties);
        return properties;
    }
    else if (node.isKind(ts_morph_1.SyntaxKind.ClassDeclaration)) {
        const properties = [];
        collectClassNodeProperties(node, properties);
        return properties;
    }
    return [];
};
const collectTypeNodeProperties = (typeNode, result) => {
    if (ts_morph_1.Node.isTypeLiteral(typeNode)) {
        typeNode.getProperties().forEach((prop) => {
            result.push({ propertyName: prop.getName() });
        });
    }
    else if (ts_morph_1.Node.isTypeReference(typeNode)) {
        typeNode
            .getType()
            .getProperties()
            .forEach((prop) => {
            result.push({ propertyName: prop.getName() });
        });
    }
    else if (ts_morph_1.Node.isIntersectionTypeNode(typeNode)) {
        typeNode.getTypeNodes().forEach((typeNode) => {
            collectTypeNodeProperties(typeNode, result); // May contain duplicated properties from different typeNodes. Will be deduped in getNodePropertyMap.
        });
    }
};
const collectClassNodeProperties = (classNode, result) => {
    const baseClass = classNode.getBaseClass();
    if (baseClass) {
        collectClassNodeProperties(baseClass, result);
    }
    classNode.getInstanceProperties().forEach((prop) => {
        if (prop.hasModifier(ts_morph_1.SyntaxKind.PrivateKeyword) ||
            prop.hasModifier(ts_morph_1.SyntaxKind.ProtectedKeyword)) {
            return;
        }
        if (prop.getName().startsWith('#')) {
            // ecma script private field is skipped
            return;
        }
        if (classNode.getGetAccessor(prop.getName())) {
            // getter is skipped
            return;
        }
        result.push({ propertyName: prop.getName() });
    });
};
//# sourceMappingURL=getNodePropertyMap.js.map