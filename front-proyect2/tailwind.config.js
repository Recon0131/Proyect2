/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        Dark:"#040D12",
        greenDark: "#183D3D",
        greenGray: "#17292B",
        grayWhite: "#17292B",
        greenCard: "#191A19",
      },
      spacing: {
        'porcent': '-50%',
      },
      screens:{
        "movil":{"max":"450px"},

        "tablet":{"min":"451px","max":"1000px"},
      }
    },
  },
  plugins: [],
}