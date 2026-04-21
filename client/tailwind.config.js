/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#EDF2F7',
          'light-secondary': '#DEE5EC',
          dark: '#000000',
          'dark-secondary': '#0A0A0A',
        },
        accent: {
          DEFAULT: '#7DD3FC',
          hover: '#38BDF8',
        },
        ink: {
          'light-primary': '#0F172A',
          'light-secondary': '#475569',
          'dark-primary': '#F8FAFC',
          'dark-secondary': '#94A3B8',
        },
        edge: {
          light: '#C9D3DD',
          dark: '#1E293B',
        },
        brand: {
          coral: '#FDBA74',
          mint: '#86EFAC',
          violet: '#C4B5FD',
          rose: '#FDA4AF',
        },
      },
      fontFamily: {
        sans: ['"Geist"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1152px',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-soft': 'pulseSoft 3.5s ease-in-out infinite',
        'gradient-pan': 'gradientPan 10s ease infinite',
        'bounce-down': 'bounceDown 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-6px)' },
          '50%': { transform: 'translateY(6px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        gradientPan: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        bounceDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
