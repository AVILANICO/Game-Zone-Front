/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
  './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
  extend: {
    
    screens:{
      'xsm': {'min': '320px', 'max': '427px'},
      'xxsm':{'min': '427px', 'max': '887px'},
      'md': {'min': '887px', 'max': '4000px'}
      
    },

      colors:{
      primary: "#222",
      secundary: "#fff",
      acento: "#222",

      btn1:'#F9A8D4',
      btn2:'#F472B6',
    },
  
      fontFamily: {
        'montserrat': ['Montserrat'],
    }
  }
  },
  variants: {},
  plugins: []
}
