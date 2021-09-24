const colors = require('tailwindcss/colors')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    fontFamily: {
      sans: [
        '"Titillium Web"',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
      serif: [
        'ui-serif',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif'
      ],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace'
      ]
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colors
    },
    extend: {
      scale: {
        98: '.98',
        99: '.99',
        101: '1.01',
        102: '1.02'
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      backgroundOpacity: ['hover'],
      translate: ['active'],
      scale: ['active'],
      borderRadius: ['first', 'last']
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
