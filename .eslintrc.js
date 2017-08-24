'use strict';

module.exports = {
  extends: ['react-app', 'msrose', 'msrose/react', 'msrose/jest'],
  rules: {
    'react/prop-types': 'off',
    // state explicitly to override react-app
    'no-unused-vars': ['error', { args: 'after-used' }]
  }
};
