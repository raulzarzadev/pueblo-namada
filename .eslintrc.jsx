module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended'
    //  'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {},
      { usePrettierrc: true }
    ], // Use our .prettierrc file as source
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'jsx-quotes': [1, 'prefer-single'],
    'react/jsx-max-props-per-line': [
      2,
      { maximum: 1, when: 'always' }
    ]
  }
}
