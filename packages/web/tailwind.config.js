/* eslint-disable */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.tsx'],
  variants: {},
  theme: {
    // height: {
    // 	'100': '20rem'
    // },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      margin: {
        '70': '16.5rem',
      },
      spacing: {
        '3/10': '30%',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')()],
};
