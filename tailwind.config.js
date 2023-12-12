/** @type {import('tailwindcss').Config} */

export default {
  purge: ['./index.html', './src/**/*.{vue,js}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      colors: {
        'bluish-gray': '#89b4f8',
        'yellowish-gray': '#ada89c',
      },
      spacing: {
        '2vw': '2vw',
        '5vw': '5vw',
        '6vw': '6vw',
      },
      maxWidth: {
        '300': '300px',
        '400': '400px',
        '1200': '1200px',
      }
    },
  },
  plugins: [],
}
