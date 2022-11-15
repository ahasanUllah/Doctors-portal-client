/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {},
   },
   plugins: [require('daisyui')],
   daisyui: {
      themes: [
         {
            myThemes: {
               primary: '#19D3AE',

               secondary: '#0FCFEC',

               accent: '#3A4256',

               neutral: '#23222B',

               'base-100': '#FCFCFD',

               info: '#7EBFE7',

               success: '#1AC79B',

               warning: '#EEC658',

               error: '#F15337',
            },
         },
      ],
   },
};
