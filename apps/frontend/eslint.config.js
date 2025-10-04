// eslint.config.js
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  { ignores: ['dist', 'node_modules'] },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { window: 'readonly', document: 'readonly' },
    },
    plugins: { react: pluginReact },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
];
