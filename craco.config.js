const Dotenv = require('dotenv-webpack');
const Tailwindcss = require('tailwindcss');
const Autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  style: {
    postcss: {
      plugins: [Tailwindcss, Autoprefixer],
    },
  },
  webpack: {
    plugins: [new Dotenv()],
    alias: {
      '@helpers': `${__dirname}/src/helpers/`,
      '@custom-hooks': `${__dirname}/src/custom-hooks/`,
      '@components': `${__dirname}/src/components/`,
      '@features': `${__dirname}/src/features/`,
      '@services': `${__dirname}/src/services/`,
      '@assets': `${__dirname}/src/assets/`,
    },
  },
};
