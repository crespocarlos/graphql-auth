const LINT_ALL_WARNINGS = process.env.LINT_ALL_WARNINGS ? 1 : 0
const LINT_DEPENDENCIES = process.env.LINT_DEPENDENCIES ? 1 : 0

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:jsx-a11y/recommended',
    'prettier/@typescript-eslint'
  ],
  plugins: [
    'react',
    'html',
    'prettier',
    'import',
    'jsx-a11y',
    '@typescript-eslint',,
    'react-hooks'
  ],
  settings: {
    'html/indent': '0',
    es6: true,
    react: {
      version: 'detect'
    },
    propWrapperFunctions: ['forbidExtraProps'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
      }
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    google: true,
    shallow: true,
    mount: true,
    context: true,
    expect: true,
    jsdom: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    }
  },
  rules: {
    eqeqeq: ['error', 'smart'],
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'any'
      }
    ],
    'no-restricted-modules': ['error', 'chai'],
    'no-debugger': 'warn',

    'one-var': ['error', { initialized: 'never' }],
    'no-mixed-operators': 0,
    'no-var': 'error',
    'require-await': 'error',
    'no-restricted-globals': [
      'error',
      'addEventListener',
      'blur',
      'close',
      'closed',
      'confirm',
      'defaultStatus',
      'defaultstatus',
      'event',
      'external',
      'find',
      'focus',
      'frameElement',
      'frames',
      'history',
      'innerHeight',
      'innerWidth',
      'length',
      'localStorage',
      'location',
      'locationbar',
      'menubar',
      'moveBy',
      'moveTo',
      'name',
      'onblur',
      'onerror',
      'onfocus',
      'onload',
      'onresize',
      'onunload',
      'open',
      'opener',
      'opera',
      'outerHeight',
      'outerWidth',
      'pageXOffset',
      'pageYOffset',
      'parent',
      'print',
      'removeEventListener',
      'resizeBy',
      'resizeTo',
      'screen',
      'screenLeft',
      'screenTop',
      'screenX',
      'screenY',
      'scroll',
      'scrollbars',
      'scrollBy',
      'scrollTo',
      'scrollX',
      'scrollY',
      'self',
      'status',
      'statusbar',
      'stop',
      'toolbar',
      'top'
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-redux',
            importNames: ['connect'],
            message: 'Please use connect from @glass/core/store instead.'
          }
        ]
      }
    ],
    'no-useless-catch': 0,
    'require-atomic-updates': 0,

    // Import rules
    'import/first': 0,
    'import/no-deprecated': process.env.NODE_ENV === 'production' ? 0 : 1,
    'import/no-unresolved': ['error', { commonjs: true }],
    'import/named': 'error',

    // React
    'react/prop-types': 0,
    'react/no-deprecated': 'error',
    'react/jsx-no-target-blank': LINT_ALL_WARNINGS,
    'react/jsx-curly-brace-presence': [
      'error',
      { children: 'ignore', props: 'never' }
    ],
    'react/display-name': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',


    // Accessibility rules
    'jsx-a11y/click-events-have-key-events': LINT_ALL_WARNINGS,
    'jsx-a11y/alt-text': LINT_ALL_WARNINGS,
    'jsx-a11y/no-static-element-interactions': LINT_ALL_WARNINGS,
    'jsx-a11y/anchor-is-valid': LINT_ALL_WARNINGS,
    'jsx-a11y/no-onchange': LINT_ALL_WARNINGS,
    'jsx-a11y/no-noninteractive-element-interactions': LINT_ALL_WARNINGS,
    'jsx-a11y/no-autofocus': LINT_ALL_WARNINGS,
    'jsx-a11y/label-has-for': LINT_ALL_WARNINGS,
    'jsx-a11y/label-has-associated-control': LINT_ALL_WARNINGS,
    'jsx-a11y/media-has-caption': LINT_ALL_WARNINGS,
    'jsx-a11y/iframe-has-title': LINT_ALL_WARNINGS,
    'jsx-a11y/heading-has-content': LINT_ALL_WARNINGS,
    'jsx-a11y/anchor-has-content': LINT_ALL_WARNINGS,
    'jsx-a11y/no-noninteractive-tabindex': LINT_ALL_WARNINGS,
    'jsx-a11y/tabindex-no-positive': LINT_ALL_WARNINGS,
    'jsx-a11y/mouse-events-have-key-events': LINT_ALL_WARNINGS,

    ...(LINT_DEPENDENCIES
      ? {
          'local-rules/disallow-undeclared-imports': 'warn'
        }
      : {})
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        // done by the TS compiler
        'no-unused-vars': 'off',
        'import/no-unresolved': 'off',
        'import/named': 'off'
      }
    }
  ]
}
