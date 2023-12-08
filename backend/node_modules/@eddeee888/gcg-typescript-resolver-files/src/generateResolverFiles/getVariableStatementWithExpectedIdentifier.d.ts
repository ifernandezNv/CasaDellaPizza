import type { SourceFile, VariableStatement } from 'ts-morph';
import type { ResolverFile } from './types';
export declare const getVariableStatementWithExpectedIdentifier: (sourceFile: SourceFile, resolverFile: ResolverFile) => {
    variableStatement: VariableStatement | undefined;
    isExported: boolean;
};
