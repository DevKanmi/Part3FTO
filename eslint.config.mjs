// ...
import globals from 'globals';
import js from '@eslint/js'
import stylisticjs from '@stylistic/eslint-plugin-js'
// ...
export default [
  js.configs.recommended,
  {
    files: ["**/*.js"], //Look at all Js files in project folder
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,  // include all global variables defined in the globals.node settings such as the process.
      },
      ecmaVersion: "latest",
    },
  },
  {
    plugins : {
      '@stylistic/js': stylisticjs
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],
      'no-console': 'off',
    },
  },
  {
    ignores : ['dist/***']
  }
]