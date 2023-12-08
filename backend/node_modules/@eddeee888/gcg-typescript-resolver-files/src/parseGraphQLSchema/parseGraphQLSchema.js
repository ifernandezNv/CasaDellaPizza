"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGraphQLSchema = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const utils_1 = require("../utils");
const parseGraphQLSchema = ({ schemaAst, sourceMap, typeMappersMap, scalarsModule, scalarsOverrides, whitelistedModules, blacklistedModules, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const scalarResolverMap = scalarsModule
        ? yield getScalarResolverMapFromModule(scalarsModule)
        : {};
    return Object.entries(schemaAst.getTypeMap()).reduce((res, [schemaType, namedType]) => {
        var _a;
        if ((0, utils_1.isNativeNamedType)(namedType)) {
            if ((0, graphql_1.isSpecifiedScalarType)(namedType)) {
                handleNativeScalarType({ schemaType, result: res, scalarsOverrides });
            }
            return res;
        }
        const parsedSource = (0, utils_1.parseLocationForWhitelistedModule)({
            location: (_a = namedType.astNode) === null || _a === void 0 ? void 0 : _a.loc,
            sourceMap,
            whitelistedModules,
            blacklistedModules,
        });
        if (!parsedSource) {
            return res;
        }
        if ((0, graphql_1.isScalarType)(namedType)) {
            res.userDefinedSchemaTypeMap.scalar[schemaType] = true;
            handleScalarType({
                scalarResolverMap,
                schemaType,
                scalarsModule,
                scalarsOverrides,
                result: res,
            });
        }
        if (!(0, utils_1.isRootObjectType)(schemaType) && (0, graphql_1.isObjectType)(namedType)) {
            res.userDefinedSchemaTypeMap.object[schemaType] = true;
            // Wire up `mappers` config
            const typeMapperDetails = typeMappersMap[schemaType];
            if (typeMapperDetails) {
                res.pluginsConfig.defaultTypeMappers[typeMapperDetails.schemaType] =
                    typeMapperDetails.configImportPath;
            }
        }
        return res;
    }, {
        userDefinedSchemaTypeMap: {
            object: {},
            scalar: {},
        },
        pluginsConfig: {
            defaultScalarTypesMap: {},
            defaultScalarExternalResolvers: {},
            defaultTypeMappers: {},
        },
    });
});
exports.parseGraphQLSchema = parseGraphQLSchema;
const handleScalarType = ({ scalarResolverMap, schemaType, result, scalarsModule, scalarsOverrides, }) => {
    const scalarResolver = scalarResolverMap[schemaType];
    // Use found the scalar from scalar module
    if (scalarResolver) {
        if (scalarResolver.extensions.codegenScalarType &&
            typeof scalarResolver.extensions.codegenScalarType === 'string') {
            result.pluginsConfig.defaultScalarTypesMap[schemaType] =
                scalarResolver.extensions.codegenScalarType;
        }
        result.pluginsConfig.defaultScalarExternalResolvers[schemaType] = `~${scalarsModule}#${scalarResolver.name}Resolver`;
    }
    // If found scalar overrides, use them
    const override = scalarsOverrides[schemaType];
    if (override) {
        if (override.type) {
            result.pluginsConfig.defaultScalarTypesMap[schemaType] = override.type;
        }
        if (override.resolver) {
            result.pluginsConfig.defaultScalarExternalResolvers[schemaType] =
                override.resolver;
        }
    }
};
const getScalarResolverMapFromModule = (scalarsModule) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let module;
    try {
        module = yield Promise.resolve(`${scalarsModule}`).then(s => require(s));
    }
    catch (err) {
        if (err instanceof Error &&
            'code' in err &&
            err.code === 'MODULE_NOT_FOUND') {
            console.warn(utils_1.fmt.warn(`Unable to import \`${scalarsModule}\`. Install \`${scalarsModule}\` or you have to implement Scalar resolvers by yourself.`));
        }
    }
    if (!module || !module.resolvers) {
        return {};
    }
    return module.resolvers;
});
const handleNativeScalarType = ({ schemaType, result, scalarsOverrides, }) => {
    const override = scalarsOverrides[schemaType];
    // Note: only override the type i.e. same functionality as `typescript` plugin's scalars
    // I've never seen someone overriding native scalar's implementation so it's probably not a thing.
    if (override && override.type) {
        result.pluginsConfig.defaultScalarTypesMap[schemaType] = override.type;
    }
};
//# sourceMappingURL=parseGraphQLSchema.js.map