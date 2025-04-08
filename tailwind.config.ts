import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        'tusker-grotesk': ['TuskerGrotesk', 'sans-serif'],
        redHatText: 'Red Hat Text',
        adventor: ['TeXGyreAdventor', 'sans-serif'],
      },
      colors: {
        giv: {
          50: '#F6F3FF',
          100: '#E7E1FF',
          500: '#5326EC',
          700: '#211985',
          800: '#1B1657',
        },
        pink: {
          500: '#E1458D',
        },
        success: {
          100: '#D2FFFB',
          500: '#37B4A9',
          600: '#2EA096',
          700: '#1B8C82',
        },
        link: {
          100: '#CAE9FF',
          700: '#2C66CD',
        },
        peach: '#FBBA80',
      },
      backgroundImage: {
        'particle-pattern': "url('/images/bg/particles.png')",
        'particle-pattern-small': "url('/images/bg/particles-s.png')",
      },
      boxShadow: {
        baseShadow: '0px 3px 20px 0px rgba(83, 38, 236, 0.13)',
        tabShadow: '0px 3px 20px 0px rgba(212, 218, 238, 0.40)',
        walletShadow: '0px 3px 20px 0px rgba(212, 218, 238, 0.70)',
        cardShadow: '0px 3px 20px 0px rgba(49, 11, 181, 0.45)',
        GIV400: '0px 3px 20px 0px rgba(83, 38, 236, 0.13)',
      },
      height: {
        'project-card-full': '450px',
        'project-card': '450px',
      },
    },
  },
  plugins: [],
};
export default config;
