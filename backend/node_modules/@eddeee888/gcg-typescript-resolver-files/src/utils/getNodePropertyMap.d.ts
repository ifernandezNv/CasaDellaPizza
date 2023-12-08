import { Node } from 'ts-morph';
export type NodePropertyMap = Record<string, {
    name: string;
}>;
/**
 * Function to get properties of a Node in a map
 * If unable to find, returns empty object
 */
export declare const getNodePropertyMap: (node: Node | undefined) => NodePropertyMap;
