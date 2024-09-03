/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // use colors only specified
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
    },
  },
  plugins: [],
}

