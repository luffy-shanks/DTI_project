/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kizunaa: {
          navy: {
            950: '#070F1E',
            900: '#0B192C',
            800: '#1E3E62',
            700: '#285181',
            600: '#386CA3',
          },
          amber: {
            400: '#FCD34D',
            500: '#F59E0B',
            600: '#D97706',
          },
          gold: '#FFB22C',
          sand: '#FAF8F5',
          coral: '#FF6B6B',
          emerald: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(11, 25, 44, 0.08), 0 4px 12px -2px rgba(11, 25, 44, 0.04)',
        'premium-hover': '0 20px 40px -10px rgba(11, 25, 44, 0.15), 0 8px 16px -4px rgba(11, 25, 44, 0.08)',
        'glow': '0 0 25px -5px rgba(255, 178, 44, 0.4)',
      }
    },
  },
  plugins: [],
}
