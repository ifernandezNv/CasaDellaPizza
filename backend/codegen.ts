import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: ['src/**/*.{ts,tsx,graphql}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    }
  },
  config: {
    enumAsTypes: true,
    preResolveTypes: true,
  },
  ignoreNoDocuments: true,
};

export default config;