import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  //カスタムルール
  {
    rules: {
      //未使用変数をエラー
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      //anyを使うとエラー
      '@typescript-eslint/no-explicit-any': 'error',

      //console.logを警告
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      //constを使うべき
      'prefer-const': 'error',

      //varを使うとエラー
      'no-var': 'error',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
