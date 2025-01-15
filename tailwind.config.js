/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "backgroundImage":{
        "welcome":"url(./assets/ttu_logo.jpg)"
      }
    },
  },
  plugins: [],
};
