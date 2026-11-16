/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#1A6DFF', dark: '#1357CC' },
        sky: { soft: '#E6F0FF' },
        mint: { DEFAULT: '#DDF2F1' },
        ink: { DEFAULT: '#0D1726', soft: '#5B6677' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"PT Serif"', 'Georgia', 'serif'],
      },
      borderRadius: { pill: '999px' },
      boxShadow: { card: '0 12px 32px -12px rgba(13,23,38,.25)' },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        spin3d: { to: { transform: 'rotateY(360deg)' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: { float: 'float 5s ease-in-out infinite', spin3d: 'spin3d 14s linear infinite', fadeUp: '.5s ease-out both fadeUp' },
    },
  },
  plugins: [],
}
