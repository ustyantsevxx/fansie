module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true
  },

  parserOptions: {
    sourceType: 'module'
  },

  plugins: ['react', 'prettier'],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'prettier'
  ]
}
