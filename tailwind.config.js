const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
      },
    },
    height: {
      '50h': '50vh',
      '80h': '80vh',
      '90h': '90vh',
      '93h': '93vh',
      '95h': '95vh',
    },
    maxHeight: {
      '50h': '50vh',
      '80h': '80vh',
      '90h': '90vh',
      '93h': '93vh',
      '95h': '95vh',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
