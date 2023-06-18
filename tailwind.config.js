/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'nhg': ['Neue Haas Grotesk', 'sans-serif'],
      },
      colors: {
        grayBkg: '#2e2e2e',
        grayBd: '#20201b',
      },
      height:{
        '125': '7.813rem',
      },
      spacing: {
        '5px': '5px',

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '@keyframes grow': {
          '0%': { transform: 'scale(0.5)', opacity: '0' }, // Change scale as needed
          '100%': { transform: 'scale(5)', opacity: '1'},
        },
        '.grow': {
          animationName: 'grow',
          animationDuration: '4s',
          animationTimingFunction: 'linear',
          animationFillMode: 'forwards',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
