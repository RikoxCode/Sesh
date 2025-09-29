const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const pluginImport = require('eslint-plugin-import');

module.exports = [
  // Global ignores (auch Prettier-/ESLint-Configs)
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      '**/.eslintrc.*',
      '**/.prettierrc.*',
      '**/*.config.*',
      '.husky/**',
      '.github/**',
      'docs/**',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Standard-Regeln für Code
  {
    files: ['**/*.{js,cjs,mjs,ts,tsx}'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: { import: pluginImport },
    rules: {
      'import/order': ['warn', { 'newlines-between': 'always' }],
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Sonderfall: eigene Config-Dateien im CJS-Stil
  {
    files: ['eslint.config.cjs', '*.config.cjs', '*.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: { module: 'writable', require: 'writable' },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
