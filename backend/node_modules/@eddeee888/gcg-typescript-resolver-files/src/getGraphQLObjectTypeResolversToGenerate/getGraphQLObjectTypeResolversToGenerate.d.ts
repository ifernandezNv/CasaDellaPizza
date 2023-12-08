import { type SourceFile } from 'ts-morph';
import type { TypeMappersMap } from '../parseTypeMappers';
export type GraphQLObjectTypeResolversToGenerate = Record<string, Record<string, {
    resolverName: string;
    resolverDeclaration: string;
}>>;
export declare const getGraphQLObjectTypeResolversToGenerate: ({ typesSourceFile, userDefinedSchemaObjectTypeMap, typeMappersMap, }: {
    typesSourceFile: SourceFile;
    typeMappersMap: TypeMappersMap;
    userDefinedSchemaObjectTypeMap: Record<string, true>;
}) => GraphQLObjectTypeResolversToGenerate;
