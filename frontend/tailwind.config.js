const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
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
