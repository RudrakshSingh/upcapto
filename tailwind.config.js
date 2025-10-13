/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Monochrome Color Palette
        'mono': {
          black: '#1A1A1A',
          white: '#FFFFFF',
          gray: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#CCCCCC',
            400: '#999999',
            500: '#666666',
            600: '#4D4D4D',
            700: '#333333',
            800: '#2A2A2A',
            900: '#1A1A1A',
          },
        },
        // Legacy colors for compatibility
        'primary': {
          navy: '#1A1A1A',
          'navy-light': '#333333',
          'navy-dark': '#1A1A1A',
        },
        'accent': {
          blue: '#666666',
          'blue-dark': '#4D4D4D',
          'blue-light': '#999999',
        },
        'secondary': {
          teal: '#666666',
          'teal-dark': '#4D4D4D',
          'teal-light': '#999999',
        },
        'background': {
          white: '#FFFFFF',
          'soft-white': '#FAFAFA',
        },
        'glass': 'rgba(255, 255, 255, 0.9)',
        'glass-border': 'rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'subtle-gradient': 'linear-gradient(135deg, #FAFAFA, #F5F5F5)',
        'mono-gradient': 'linear-gradient(135deg, #1A1A1A, #333333)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'subheading': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'subtle-lg': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'subtle-xl': '0 8px 24px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
