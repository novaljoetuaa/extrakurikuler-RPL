/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gravity: {
          surface: '#E3F2FD',
          border: '#90CAF9',
          primary: '#2196F3',
          dark: '#0D47A1',
        },
        // Fallback and semantic mapping to guarantee 100% color compliance
        brand: {
          50: '#E3F2FD',
          100: '#E3F2FD',
          200: '#90CAF9',
          300: '#90CAF9',
          400: '#2196F3',
          500: '#2196F3',
          600: '#2196F3',
          700: '#0D47A1',
          800: '#0D47A1',
          900: '#0D47A1',
          950: '#0D47A1',
        },
        // Palet lama (slate/stone/ink/cream) dipetakan ke tema biru utama
        // agar seluruh halaman (admin, galeri, 404, dsb.) konsisten
        // tanpa harus mengubah setiap class di seluruh file.
        slate: {
          50: '#F4F8FE',
          100: '#E3F2FD',
          200: '#BBDEFB',
          300: '#90CAF9',
          400: '#64B5F6',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1565C0',
          800: '#0D47A1',
          900: '#0D47A1',
          950: '#082B5C',
        },
        stone: {
          50: '#F4F8FE',
          100: '#E3F2FD',
          200: '#BBDEFB',
          300: '#90CAF9',
          400: '#64B5F6',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1565C0',
          800: '#0D47A1',
          900: '#0D47A1',
        },
        ink: '#0D47A1',
        cream: '#E3F2FD',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        solid: '0 2px 0 0 #90CAF9',
        card: '0 4px 12px 0 rgba(13, 71, 161, 0.08)',
        hover: '0 8px 24px 0 rgba(13, 71, 161, 0.14)',
        soft: '0 4px 16px 0 rgba(13, 71, 161, 0.08)',
        lift: '0 12px 32px 0 rgba(13, 71, 161, 0.16)',
        subtle: '0 1px 4px 0 rgba(13, 71, 161, 0.10)',
        glow: '0 0 0 4px rgba(33, 150, 243, 0.25)',
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
