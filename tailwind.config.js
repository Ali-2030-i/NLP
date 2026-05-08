/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#22d3ee',
        'neon-indigo': '#818cf8',
      },
      backgroundImage: {
        'neural-pattern': 'radial-gradient(circle at center, rgba(34, 211, 238, 0.03) 0%, transparent 70%)',
      },
      animation: {
        'neural-pulse': 'neuralPulse 8s ease-in-out infinite',
      },
      keyframes: {
        neuralPulse: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
