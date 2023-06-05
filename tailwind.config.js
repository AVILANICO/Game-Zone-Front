/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
  './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
  extend: {
    
    screens:{
      'xsm': {'min': '320px', 'max': '767px'},
      'md': {'min': '768px', 'max': '4000px'},
      'xxsm':{'min': '320px', 'max': '540px'}
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
