module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true
  },

  plugins: ['react', 'prettier'],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ]
}
