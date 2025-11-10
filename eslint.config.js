import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import globals from 'globals'

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  prettierConfig,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          usePrettierrc: false,
          fileInfoOptions: {
            withNodeModules: true
          }
        }
      ]
    }
  },
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser
      }
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-undef': 'off',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info']
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'vue/no-v-html': 'off',
      'vue/html-indent': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ]
    }
  }
])
