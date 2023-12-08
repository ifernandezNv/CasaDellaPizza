"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRootObjectType = void 0;
const isRootObjectType = (typeName) => typeName === 'Query' ||
    typeName === 'Mutation' ||
    typeName === 'Subscription';
exports.isRootObjectType = isRootObjectType;
//# sourceMappingURL=isRootObjectType.js.map