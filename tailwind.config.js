const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './public/infoData.json',
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        '@media-hover': {'raw': '(hover: hover)'},
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        btnet: '#e60012',
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      minWidth: {
        '36': '9rem',
      },
      maxWidth: {
        '3/4': '75%',
      },
      maxHeight: {
        '3/4': '75%',
      },
      boxShadow: {
        'inner': 'inset 0 -30px 30px -10px rgb(0 0 0 / 0.1);',
      },
    },
    container: {
      center: true,
      screens: {
        sm: '600px',
        md: '728px',
        lg: '900px',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities, addComponents, e, config }) {
      const newUtilities = {
        '.horizontal-tb': {
          writingMode: 'horizontal-tb',
        },
        '.vertical-rl': {
          writingMode: 'vertical-rl'
        },
        '.vertical-lr': {
          writingMode: 'vertical-lr'
        }
      }
      addUtilities(newUtilities)
    }),
  ]
}
