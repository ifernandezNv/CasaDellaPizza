import type { ParsedGraphQLSchemaMeta } from '../parseGraphQLSchema';
import type { ParsedPresetConfig, ScalarsOverridesType } from '../validatePresetConfig';
interface MergedConfig {
    userDefinedSchemaTypeMap: ParsedGraphQLSchemaMeta['userDefinedSchemaTypeMap'];
    externalResolvers: ParsedPresetConfig['externalResolvers'];
    scalarTypes: Record<string, ScalarsOverridesType>;
    typeMappers: Record<string, string>;
}
/**
 * validateAndMergeParsedConfigs is used to make sure all parsed configs do not incorrectly override each other.
 * Use this to ensure there's only one way of doing something. e.g.
 *   - scalarsOverrides must be used over externalResolvers to override scalars
 */
export declare const validateAndMergeParsedConfigs: ({ externalResolvers, parsedGraphQLSchemaMeta: { userDefinedSchemaTypeMap, pluginsConfig: { defaultScalarExternalResolvers, defaultScalarTypesMap, defaultTypeMappers, }, }, }: {
    externalResolvers: ParsedPresetConfig['externalResolvers'];
    parsedGraphQLSchemaMeta: ParsedGraphQLSchemaMeta;
}) => MergedConfig;
export {};
