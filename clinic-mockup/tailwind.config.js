/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef7f7",
          100: "#d6ecec",
          200: "#aedada",
          300: "#7ec2c3",
          400: "#4ea7a9",
          500: "#2f8b8d",
          600: "#226e70",
          700: "#1c5759",
          800: "#194547",
          900: "#143638",
        },
        accent: {
          400: "#e7b97a",
          500: "#d49a4a",
          600: "#b67d34",
        },
        ink: {
          900: "#0e1a1c",
          700: "#2a3a3c",
          500: "#5a6a6c",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(28, 87, 89, 0.25)",
      },
      keyframes: {
        kenburns: {
          "0%":   { transform: "scale(1) translate(0,0)" },
          "100%": { transform: "scale(1.12) translate(-1.5%, -1%)" },
        },
      },
      animation: {
        kenburns: "kenburns 8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
