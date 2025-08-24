import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [typography],
  prefix: '',
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        green: {
          DEFAULT: '#32EDCB',
          100: '#0E5044',
          200: '#E5EAE5',
        },
        gray: {
          DEFAULT: '#EFEFEF',
          100: '#8F8787',
          200: '#E5EAE5',
          300: '#F7F7F7',
          400: '#888888',
          500: '#F1F1F1',
        },
      },
      fontSize: {
        15: ['15px', { lineHeight: '150%' }, { letterSpacing: '1px' }],
        20: ['20px', { lineHeight: '100%' }, { letterSpacing: '1px' }],
        25: ['25px', { lineHeight: '130%' }, { letterSpacing: '1px' }],
        30: ['30px', { lineHeight: '130%' }, { letterSpacing: '1px' }],
        40: ['40px', { lineHeight: '130%' }, { letterSpacing: '1px' }],
        60: ['60px', { lineHeight: '120%' }, { letterSpacing: '1px' }],
      },
    },
  },
}

export default config
