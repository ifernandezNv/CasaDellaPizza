export type RootObjectType = 'Query' | 'Mutation' | 'Subscription';
export declare const isRootObjectType: (typeName: string) => typeName is RootObjectType;
