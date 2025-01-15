/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "backgroundImage":{
        "welcome":"url(https://solar-training.org/ghana/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-02-at-10.45.41-PM-e1638971744836.jpeg)"
      }
    },
  },
  plugins: [],
};
