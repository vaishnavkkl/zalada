import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f6f8f2',
          100: '#e9efdc',
          200: '#d2ddbb',
          300: '#b6c896',
          400: '#9ab272',
          500: '#7f9958',
          600: '#657b45',
          700: '#4d5f35',
          800: '#3a4728',
          900: '#2a341d',
        },
        brand: {
          DEFAULT: '#2F6B3F',
          mid:     '#3d8a53',
          light:   '#5aab70',
          pale:    '#e8f5ec',
          faint:   '#f3faf5',
        },
      },
      scale: {
        '108': '1.08',
      },
      boxShadow: {
        soft:  '0 18px 40px rgba(47, 107, 63, 0.12)',
        glass: '0 24px 55px rgba(47, 107, 63, 0.20)',
      },
    },
  },
  plugins: [],
}

export default config
