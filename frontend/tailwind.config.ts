/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#fbfcfd',
        backgroundContainer: '#F4F4F4',
        backgroundInput: '#EDEDED',
        accent: '#D82148',
        error: 'red',
        borderSecondary: '#d7dbdf',
      }
    },
  },
  plugins: [],
}
