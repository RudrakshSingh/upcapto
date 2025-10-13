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
        // Vibrant Gradient Color Palette
        'brand': {
          primary: '#6366F1',      // Indigo - Primary brand color
          secondary: '#8B5CF6',    // Purple - Secondary actions
          accent: '#06B6D4',        // Cyan - Success/CTA
          warning: '#F59E0B',      // Amber - Warnings
          error: '#EF4444',        // Red - Errors
          dark: '#1E293B',         // Dark Slate - Text
          light: '#F8FAFC',        // Light Gray - Backgrounds
        },
        'gradient': {
          primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          warm: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          cool: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          dark: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        },
        'neutral': {
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
        },
        // Legacy colors for compatibility
        'cred': {
          black: '#1E293B',
          white: '#FFFFFF',
          gray: {
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
          },
        },
        // Legacy colors for compatibility
        'primary': {
          navy: '#000000',
          'navy-light': '#333333',
          'navy-dark': '#000000',
        },
        'accent': {
          blue: '#000000',
          'blue-dark': '#000000',
          'blue-light': '#333333',
        },
        'secondary': {
          teal: '#6C757D',
          'teal-dark': '#495057',
          'teal-light': '#ADB5BD',
        },
        'background': {
          white: '#FFFFFF',
          'soft-white': '#F8F9FA',
        },
        'glass': 'rgba(255, 255, 255, 0.95)',
        'glass-border': 'rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'accent-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'warm-gradient': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'cool-gradient': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'cred-gradient': 'linear-gradient(135deg, #F8F9FA, #FFFFFF)',
        'cred-dark': 'linear-gradient(135deg, #000000, #333333)',
      },
      animation: {
        'cred-fade-in': 'credFadeIn 0.4s ease-out',
        'cred-slide-up': 'credSlideUp 0.5s ease-out',
        'cred-scale-in': 'credScaleIn 0.3s ease-out',
      },
      keyframes: {
        credFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        credSlideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        credScaleIn: {
          '0%': { transform: 'scale(0.98)', opacity: '0' },
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
        'cred': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'cred-lg': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'cred-xl': '0 8px 24px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
