/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
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
      fontSize: {
        'xxs': '0.625rem',
        's5': '0.5rem',
        'supsm':'0.4rem',
      },
      colors: {
        grayBkg: '#2e2e2e',
        grayBd: '#20201b',
        whiteSmk: '#EFEFEF',
        metallicLeft: '#D9D9D9',
        metallicRight: '#2e2e2e',
        grayMo: '#525252',
        filter: '#C3C3C3',
        bebe: '#bebebe',
      },
      height:{
        '8.5':'2.07rem',
        '125': '7.813rem',
        '29px': '1.812rem',
        '58px' : '3.625rem',
        screen: 'calc(var(--vh, 1vh) * 100)',
      },
      width:{
        '18': '4.5rem',
      },
      spacing: {
        'dims':'0.01rem',
        'midsh':'0.25px',
        'cstm':'0.41rem',
        '5px': '5px',
        '100': '25rem',
        '105': '26.25rem',
        '110': '27.5rem',
        '130':'32.5rem',
        '140': '35rem',
        '200': '50rem',
        '300': '75rem',
        '350': '87.5rem',
        "400": '100rem',
        'header-h': '5.438rem',
      },
      borderWidth: {
        '1/2': '0.5px',
        '3/4': '0.75px',
        'xs': '0.01px',
      },
      screens: {
        'mg':'300px',
        'xs':'343px',
        '1.2k':'1285px',
        '3xl': '1920px', // Custom breakpoint for 32" monitors or larger
        '34in': '2565px',
        '1.6k': '1680px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-linear': 'linear-gradient(var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'opacity': 'opacity',
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'grayBkg': '#2e2e2e',
        'grayBd': '#20201b',
      }),
      linearGradientColors: {
        metallic: ['to-r', 'metallicLeft', 'metallicRight'],
      },

    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
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
