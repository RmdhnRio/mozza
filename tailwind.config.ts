import type { Config } from 'tailwindcss';


const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #DDA5FF 0%, #FFBCBC 52%, #FFC73B 100%)',
      },

      borderRadius: {
        'hero-bl': '0 0 0 400px',
      },

      fontFamily: {
        plein: ['var(--font-plein)', 'Plein', 'sans-serif'],
        switzer: ['var(--font-switzer)', 'Switzer', 'sans-serif'],
      },
    },
  },
};
export default config;
