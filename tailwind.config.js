/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060f22',
          900: '#0b1a33',
          800: '#0f2545',
          700: '#15335c',
          600: '#1c4276',
        },
        steel: {
          50: '#f4f6f9',
          100: '#e7ebf1',
          200: '#ccd5e1',
          300: '#a9b6c9',
          400: '#7c8ba3',
          500: '#5b6c85',
        },
        cyan: {
          400: '#3fd6e8',
          500: '#1ab8cf',
          600: '#0f95a9',
        },
        amber: {
          400: '#f2a340',
          500: '#e2882a',
        },
      },
      fontFamily: {
        display: ['"Archivo"', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-lines':
          'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
    },
  },
  plugins: [],
}
