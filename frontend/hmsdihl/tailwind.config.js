/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom1': 'box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
      },
      colors: {
        // Add custom colors here
        // primary: "#f4f080", // A custom primary color
        // secondary: { 
        //   500: "#0e35a0",
        //   100: "#081F5E" }, 
        // accent: "#921eeb",
        // text: "#fcfbde",
        // background: "#0e0d01",
        // bgCard:"#262303",
        // primary50 : "#f4f080",
        primary: "#7d9c79", // A custom primary color
        secondary: { 
          500: "#a8cbb1",
          100: "#CCE0D1" }, 
        accent: "#8bb99c",
        text: "#0d100c",
        background: "#f6f8f6",
        bgCard:"#262303",
        primary50 : "#7d9c79",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Add Inter font
      },
    },
  },
  plugins: [],
};
