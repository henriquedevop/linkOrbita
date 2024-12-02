// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        primary: '#6E44FF',
        secondary: "#560BAD",
        customGray: "#131313",
        textColor: "#FFF",
        bg: "#000",
      },
      backgroundImage: {
        'hero-bg': "url('/src/assets/herobg.svg')"
      }
    },
  },
  plugins: [],
};
