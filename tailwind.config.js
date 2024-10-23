/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        dongle: ["Dongle", "sans-serif"],
      },
      colors: {
        bgBlue: "#007AFF",
        whiteWith50Opacity: "#FFFFFF80",
        whiteWith25Opacity: "#FFFFFF40",
        whiteWith15Opacity: "#FFFFFF26",
        bgRed: "#E33629",
        mainBg: "#14171F",
        cardBg: "#1D222D",
        green: "#0EAC00",
        modOrange: "#E28B2D"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in",
        fadeOut: "fadeOut 2s ease-in",
      },
    },
  },
  plugins: [],
};
