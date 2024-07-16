/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        headline: "clamp(1.75rem, 1.5119rem + 1.1905vw, 3rem)",
        intro: "clamp(1rem, 0.9048rem + 0.4762vw, 1.5rem)",
        quote: "clamp(0.5rem, 0.4286rem + 0.3571vw, 0.875rem)",
        content: "clamp(0.8rem, 0.7619rem + 0.1905vw, 1rem)",
      },
      height: {
        projectBox: "clamp(4rem, 9rem, 9rem)",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
