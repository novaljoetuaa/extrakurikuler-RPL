/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gravity: {
          surface: '#F8FAFC',
          border: '#CBD5E1',
          primary: '#334155',
          dark: '#0F172A',
        },
        // Fallback and semantic mapping to guarantee 100% color compliance
        brand: {
          50: '#F1F5F9',
          100: '#E2E8F0',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475569',
          600: '#334155',
          700: '#1E293B',
          800: '#0F172A',
          900: '#020617',
          950: '#020617',
        },
        // Palet lama (slate/stone/ink/cream) dinetralkan ke abu-abu
        // (sebelumnya dipetakan ke tema biru).
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        ink: '#111827',
        cream: '#F1F5F9',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        solid: '0 2px 0 0 #CBD5E1',
        card: '0 4px 12px 0 rgba(15, 23, 42, 0.08)',
        hover: '0 8px 24px 0 rgba(15, 23, 42, 0.14)',
        soft: '0 4px 16px 0 rgba(13, 71, 161, 0.08)',
        lift: '0 12px 32px 0 rgba(13, 71, 161, 0.16)',
        subtle: '0 1px 4px 0 rgba(15, 23, 42, 0.10)',
        glow: '0 0 0 4px rgba(15, 23, 42, 0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'scale-in': 'scale-in 0.3s ease-out both',
        shake: 'shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
}
