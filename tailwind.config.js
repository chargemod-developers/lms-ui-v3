/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgBlue: "#007AFF",
        whiteWith80Opacity:"#FFFFFF80",
        whiteWith25Opacity:"#FFFFFF40",
        whiteWith15Opacity:"#FFFFFF26",
        bgRed : "#E33629",
        mainBg : "#14171F",
        cardBg :"#1D222D",
        green:"#0EAC00"
      }
    },
  },
  plugins: [],
}