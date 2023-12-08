import { Project } from 'ts-morph';
import type { ParseSourcesResult } from '../parseSources';
import type { NodePropertyMap } from '../utils';
export interface ParseTypeMappersParams {
    sourceMap: ParseSourcesResult['sourceMap'];
    resolverTypesPath: string;
    typeMappersFileExtension: string;
    typeMappersSuffix: string;
    tsMorphProject: Project;
    shouldCollectPropertyMap: boolean;
    emitLegacyCommonJSImports: boolean;
}
export interface TypeMapperDetails {
    schemaType: string;
    typeMapperName: string;
    typeMapperPropertyMap: NodePropertyMap;
    configImportPath: string;
}
export type TypeMappersMap = Record<string, TypeMapperDetails>;
export declare const parseTypeMappers: ({ sourceMap, resolverTypesPath, typeMappersFileExtension, typeMappersSuffix, tsMorphProject, shouldCollectPropertyMap, emitLegacyCommonJSImports, }: ParseTypeMappersParams) => TypeMappersMap;
