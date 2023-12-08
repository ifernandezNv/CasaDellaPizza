import type { GenerateResolverFilesContext } from './types';
/**
 * postProcessFiles does static analysis on existing files OR to-be-generated files
 * e.g.
 * - Make sure correct variables are exported
 * - Make sure object types have field resolvers if mapper type's field cannot be used as schema type's field
 */
export declare const postProcessFiles: ({ config: { tsMorph: { project }, fixObjectTypeResolvers, }, result, }: GenerateResolverFilesContext) => void;
