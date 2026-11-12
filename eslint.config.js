import js from '@eslint/js';
import globals from 'globals';

// Lint the active house runtime and maintained verification scripts. Legacy
// Svelte components and their TypeScript need a separate migration/config.
export default [
  { ignores: ['build/**', 'dist/**', '.svelte-kit/**', '.generated-static/**', 'node_modules/**', 'test-results/**'] },
  {
    files: ['src/*.js', 'src/enhanced/*.js', 'scripts/*.mjs'],
    ...js.configs.recommended,
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: { ...js.configs.recommended.rules, 'no-unused-vars': 'off' }
  }
];
