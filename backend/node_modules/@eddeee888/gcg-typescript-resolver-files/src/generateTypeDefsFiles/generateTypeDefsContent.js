"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTypeDefsContent = void 0;
const graphql_1 = require("graphql");
const generateTypeDefsContent = ({ mergedSDL, }) => {
    const documentNode = (0, graphql_1.parse)(mergedSDL);
    const documentNodeString = JSON.stringify(documentNode);
    return `import type { DocumentNode } from 'graphql';
  export const typeDefs = ${documentNodeString} as unknown as DocumentNode`;
};
exports.generateTypeDefsContent = generateTypeDefsContent;
//# sourceMappingURL=generateTypeDefsContent.js.map