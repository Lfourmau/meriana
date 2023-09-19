/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend:{
      colors: {
        transparent: 'transparent',
        'dark': '#171D23',
        'lighterdark': '#788488',
        'cyan': '#30DADA',
        'orange': '#F1861C',
        'right': '#1FADAD',
        'wrong': '#D61C46',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease',
      },
    }
  },
  plugins: [],
}

