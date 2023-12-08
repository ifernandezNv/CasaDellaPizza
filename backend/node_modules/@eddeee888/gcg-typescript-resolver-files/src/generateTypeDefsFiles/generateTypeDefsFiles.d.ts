import { StandardFile } from '../generateResolverFiles';
import type { ParseSourcesResult } from '../parseSources';
import { TypeDefsFileMode } from '../validatePresetConfig';
interface GenerateTypeDefsFilesParams {
    baseOutputDir: string;
    typeDefsFilePath: string;
    typeDefsFileMode: TypeDefsFileMode;
    sourceMap: ParseSourcesResult['sourceMap'];
    whitelistedModules: string[];
    blacklistedModules: string[];
}
export declare const generateTypeDefsFiles: ({ baseOutputDir, typeDefsFilePath, typeDefsFileMode, sourceMap, blacklistedModules, whitelistedModules, }: GenerateTypeDefsFilesParams) => Record<string, StandardFile>;
export {};
