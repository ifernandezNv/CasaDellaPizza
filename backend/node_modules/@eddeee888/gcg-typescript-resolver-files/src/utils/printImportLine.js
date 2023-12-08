"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printImportLine = void 0;
function printImportLine({ isTypeImport, module, moduleType, namedImports, defaultImport, emitLegacyCommonJSImports, }) {
    const typeImportKeyword = isTypeImport ? 'type' : '';
    const hasDefaultImport = Boolean(defaultImport);
    const hasNamedImports = namedImports.length > 0;
    const namedImportsString = hasNamedImports
        ? `{ ${namedImports.map(printNamedImportSpecifier).join(',')} }`
        : '';
    let fileExt = '';
    if (moduleType !== 'preserve') {
        const isFile = moduleType === 'file';
        fileExt = emitLegacyCommonJSImports || !isFile ? '' : '.js';
    }
    return `import ${typeImportKeyword} ${defaultImport || ''} ${hasDefaultImport && hasNamedImports ? ',' : ''} ${namedImportsString} from '${normalizeModuleExtensionForImport(module)}${fileExt}';`;
}
exports.printImportLine = printImportLine;
const normalizeModuleExtensionForImport = (module) => {
    if (module.endsWith('.ts')) {
        return module.split('.').slice(0, -1).join('.');
    }
    return module;
};
const printNamedImportSpecifier = (namedImport) => {
    if (typeof namedImport === 'string') {
        return namedImport;
    }
    if (namedImport.propertyName === namedImport.identifierName) {
        return namedImport.identifierName;
    }
    return `${namedImport.propertyName} as ${namedImport.identifierName}`;
};
//# sourceMappingURL=printImportLine.js.map