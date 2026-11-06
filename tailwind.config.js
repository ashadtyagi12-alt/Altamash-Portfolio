/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#07080D',
          surface: '#0D0F17',
          card: '#121520',
          cardLight: '#181C2A',
          border: 'rgba(255, 255, 255, 0.08)',
          borderSubtle: 'rgba(255, 255, 255, 0.04)',
        },
        coral: {
          DEFAULT: '#FF3B47',
          hover: '#FF1E2D',
          glow: 'rgba(255, 59, 71, 0.25)',
          muted: 'rgba(255, 59, 71, 0.12)',
        },
        text: {
          primary: '#F9FAFB',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        }
      },
      fontFamily: {
        display: ['Anton', 'Bebas Neue', 'Oswald', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      letterSpacing: {
        ultra: '0.25em',
        widest2: '0.2em',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1.5deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        }
      }
    },
  },
  plugins: [],
}
