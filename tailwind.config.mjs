import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [typography],
  prefix: '',
  theme: {
    extend: {
      colors: {},
      fontFamily: {},
    },
  },
}

export default config
