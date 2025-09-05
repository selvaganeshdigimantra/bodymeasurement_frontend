/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6750A4'
        }
      },
      borderRadius: {
        '2xl': '1.25rem'
      }
    },
  },
  plugins: [],
}
