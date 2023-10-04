/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend:{
      colors: {
        transparent: 'transparent',
        'primary': '#171D23',
        'lighterdark': '#788488',
        'third': '#30DADA',
        'third': '#F1861C',
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

