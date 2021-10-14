const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
      fontFamily: {
          sans: ['Roboto', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
          mono: ['Roboto Mono', 'monospace']
      },
      extend: {
          colors: {
              blueGray: colors.blueGray,
              coolGray: colors.coolGray,
              trueGray: colors.trueGray,
              warmGray: colors.warmGray,
              orange: colors.orange,
              amber: colors.amber,
              lime: colors.lime,
              emerald: colors.emerald,
              teal: colors.teal,
              cyan: colors.cyan,
              sky: colors.sky,
              violet: colors.violet,
              fuchsia: colors.fuchsia,
              rose: colors.rose,
          }
      },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}