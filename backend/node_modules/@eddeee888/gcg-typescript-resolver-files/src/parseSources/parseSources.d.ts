/// <reference types="node" />
import * as path from 'path';
import type { Source } from '@graphql-tools/utils';
export interface ParsedSource {
    source: Source;
    sourcePath: path.ParsedPath;
    moduleName: string;
}
export interface ParseSourcesResult {
    sourceMap: Record<string, ParsedSource>;
}
export declare function parseSources(sources: Source[]): ParseSourcesResult;
