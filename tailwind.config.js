// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Isso garante que o Tailwind também veja o conteúdo do index.html
    "./src/**/*.{js,ts,jsx,tsx}", // Rastreia todos os arquivos JS/TS/JSX/TSX dentro de src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
