/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jost)", "Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
};

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
      },
    },
  },
};
