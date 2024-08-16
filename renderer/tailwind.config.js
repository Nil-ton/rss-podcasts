import * as colors from 'tailwindcss/colors'

module.exports = {
  content: [
    './renderer/app/**/*.{js,ts,jsx,tsx}',
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      background: '#000',
      'background-base': '#121212',
      'background-highlight': '#1f1f1f',
      'background-elevated-highligh': '#2a2a2a',
      'decorative-base': '#fff',
      'text-base': '#fff',
      'text-subdued': '#b3b3b3',
      'essential-subdued': '#7c7c7c',
      'essential-negative': '#ed2c3f',
      'essential-warning': '#ffa42b',
      'essential-positive': '#1ed760'
    },
    extend: {},
  },
  plugins: [],
}
