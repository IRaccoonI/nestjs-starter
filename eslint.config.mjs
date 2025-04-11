import eslintNestJs from '@darraghor/eslint-plugin-nestjs-typed';
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint, { parser } from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: true,
      },
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-restricted-properties': [
        'warn',
        {
          object: 'em',
          property: 'remove',
          message: 'Используй softRemove вместо remove()',
        },
      ],
    },
  },
  {
    files: ['**/*.module.ts'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  eslintNestJs.configs.flatRecommended,
);
