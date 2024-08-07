import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        giv: {
          500: "#5326EC",
          800: "#1B1657",
        },
        pink: {
          500: "#E1458D",
        },
        success: {
          100: "#D2FFFB",
          500: "#37B4A9",
          600: "#2EA096",
          700: "#1B8C82",
        },
        peach: "#FBBA80",
      },
      backgroundImage: {
        "particle-pattern": "url('/images/bg/particles.png')",
      },
    },
  },
  plugins: [],
};
export default config;
