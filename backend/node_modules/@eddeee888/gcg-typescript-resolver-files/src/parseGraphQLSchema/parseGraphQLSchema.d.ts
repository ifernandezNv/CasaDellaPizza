import { GraphQLSchema } from 'graphql';
import type { ParseSourcesResult } from '../parseSources';
import type { TypeMappersMap } from '../parseTypeMappers';
import type { ParsedPresetConfig, ScalarsOverridesType } from '../validatePresetConfig';
interface ParseGraphQLSchemaParams {
    schemaAst: GraphQLSchema;
    sourceMap: ParseSourcesResult['sourceMap'];
    typeMappersMap: TypeMappersMap;
    scalarsModule: ParsedPresetConfig['scalarsModule'];
    scalarsOverrides: ParsedPresetConfig['scalarsOverrides'];
    whitelistedModules: ParsedPresetConfig['whitelistedModules'];
    blacklistedModules: ParsedPresetConfig['blacklistedModules'];
}
export interface ParsedGraphQLSchemaMeta {
    userDefinedSchemaTypeMap: {
        object: Record<string, true>;
        scalar: Record<string, true>;
    };
    pluginsConfig: {
        defaultScalarTypesMap: Record<string, ScalarsOverridesType>;
        defaultScalarExternalResolvers: Record<string, string>;
        defaultTypeMappers: Record<string, string>;
    };
}
export declare const parseGraphQLSchema: ({ schemaAst, sourceMap, typeMappersMap, scalarsModule, scalarsOverrides, whitelistedModules, blacklistedModules, }: ParseGraphQLSchemaParams) => Promise<ParsedGraphQLSchemaMeta>;
export {};
