/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
    },
    extend: {
      colors: {
        ink: {
          950: '#0f0f12',
          900: '#17171b',
          800: '#26262c',
          700: '#3a3a42',
          600: '#54545e',
          500: '#71717a',
          400: '#9a9aa3',
        },
        paper: {
          50: '#ffffff',
          100: '#faf9f7',
          200: '#f2f0ec',
          300: '#e7e4dd',
        },
        accent: {
          50: '#eef1ff',
          100: '#dfe3ff',
          300: '#aeb6ff',
          500: '#4a4ff2',
          600: '#3a3fd6',
          700: '#2f33ac',
          900: '#1d1f6b',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.8rem, 0.77rem + 0.15vw, 0.9rem)',
        'fluid-sm': 'clamp(0.95rem, 0.9rem + 0.2vw, 1.05rem)',
        'fluid-base': 'clamp(1rem, 0.96rem + 0.2vw, 1.125rem)',
        'fluid-lg': 'clamp(1.15rem, 1.08rem + 0.3vw, 1.35rem)',
        'fluid-xl': 'clamp(1.35rem, 1.2rem + 0.6vw, 1.75rem)',
        'fluid-2xl': 'clamp(1.65rem, 1.4rem + 1vw, 2.25rem)',
        'fluid-3xl': 'clamp(2rem, 1.6rem + 1.6vw, 3rem)',
        'fluid-4xl': 'clamp(2.4rem, 1.8rem + 2.4vw, 3.9rem)',
        'fluid-5xl': 'clamp(2.8rem, 2rem + 3.2vw, 4.75rem)',
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 15, 18, 0.04), 0 8px 24px -12px rgba(15, 15, 18, 0.08)',
        'card-hover': '0 4px 8px rgba(15, 15, 18, 0.05), 0 16px 32px -12px rgba(15, 15, 18, 0.12)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
