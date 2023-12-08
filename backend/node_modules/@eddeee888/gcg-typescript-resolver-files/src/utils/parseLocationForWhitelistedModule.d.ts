import type { Location } from 'graphql';
import type { ParseSourcesResult, ParsedSource } from '../parseSources';
export interface ParseLocationForWhitelistedModule {
    location: Location | undefined;
    sourceMap: ParseSourcesResult['sourceMap'];
    whitelistedModules: string[];
    blacklistedModules: string[];
}
export declare const parseLocationForWhitelistedModule: ({ location, sourceMap, whitelistedModules, blacklistedModules, }: ParseLocationForWhitelistedModule) => ParsedSource | undefined;
