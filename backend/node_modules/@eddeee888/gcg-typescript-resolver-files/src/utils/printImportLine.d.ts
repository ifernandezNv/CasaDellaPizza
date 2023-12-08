export interface ImportLineMeta {
    isTypeImport: boolean;
    module: string;
    /**
     * moduleType
     *
     * @description Determines how the module should be treated when imported taking into consideration CJS vs ESM
     * - file: import is a file. For ESM, .js extension is added. For CJS, no extension is added.
     * - module: import is a module from `node_modules` or aliased e.g. `graphql-scalars` or `@org/your-module`. No extension is added.
     * - preserve: preserve what the config declares. This is only used when taking user's config or preset-controlled config e.g. `externalExternals` because the import could be either file or module
     */
    moduleType: 'file' | 'module' | 'preserve';
    namedImports: (string | {
        propertyName: string;
        identifierName: string;
    })[];
    defaultImport?: string;
    emitLegacyCommonJSImports: boolean;
}
export declare function printImportLine({ isTypeImport, module, moduleType, namedImports, defaultImport, emitLegacyCommonJSImports, }: ImportLineMeta): string;
