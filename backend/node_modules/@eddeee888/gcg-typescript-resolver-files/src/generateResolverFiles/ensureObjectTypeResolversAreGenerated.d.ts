import { type SourceFile } from 'ts-morph';
import type { ObjectTypeFile } from './types';
/**
 * Ensure objectTypeResolver files have all the resolvers due to mismatched types
 */
export declare const ensureObjectTypeResolversAreGenerated: (sourceFile: SourceFile, resolverFile: ObjectTypeFile) => void;
