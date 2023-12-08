"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNativeNamedType = void 0;
const graphql_1 = require("graphql");
const isNativeNamedType = (namedType) => {
    // "Native" NamedType in this context means the following:
    // 1. introspection types i.e. with `__` prefixes
    // 2. base scalars e.g. Boolean, Int, etc.
    // 3. Other natives (mostly base scalars) which was not defined in the schema i.e. no `astNode`
    if ((0, graphql_1.isSpecifiedScalarType)(namedType) ||
        (0, graphql_1.isIntrospectionType)(namedType) ||
        !namedType.astNode) {
        return true;
    }
    return false;
};
exports.isNativeNamedType = isNativeNamedType;
//# sourceMappingURL=isNativeNamedType.js.map