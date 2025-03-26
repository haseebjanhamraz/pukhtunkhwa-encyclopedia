module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    '@next/next/no-head-element': 'error',
    'react/no-unescaped-entities': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-contradicting-classname': 'error',
    'tailwindcss/enforces-shorthand': 'warn',
    'tailwindcss/no-unnecessary-arbitrary-value': 'warn'
  }
} 