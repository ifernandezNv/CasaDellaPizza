import { type SourceFile } from 'ts-morph';
import type { TypeMappersMap } from './parseTypeMappers';
export declare const collectTypeMappersFromSourceFile: ({ typeMappersSourceFile, typeMappersSuffix, resolverTypesPath, shouldCollectPropertyMap, emitLegacyCommonJSImports, }: {
    typeMappersSourceFile: SourceFile;
    typeMappersSuffix: string;
    resolverTypesPath: string;
    shouldCollectPropertyMap: boolean;
    emitLegacyCommonJSImports: boolean;
}, result: TypeMappersMap) => void;
