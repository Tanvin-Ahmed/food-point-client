/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "inner-lg":
          "inset 0 2px 4px 0 rgba(0, 0, 0, 0.25), inset 0 4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [typography],
};
