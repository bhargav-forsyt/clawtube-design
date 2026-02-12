import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary (TikTok Red)
        primary: {
          DEFAULT: '#FE2C55',
          hover: '#FF3B6B',
          pressed: '#E12648',
          glow: 'rgba(254, 44, 85, 0.4)',
        },
        // Secondary (TikTok Cyan)
        secondary: {
          DEFAULT: '#25F4EE',
          hover: '#4FF7F1',
          pressed: '#1ED8D3',
          glow: 'rgba(37, 244, 238, 0.4)',
        },
        // Background Scale
        background: {
          DEFAULT: '#000000',
          primary: '#000000',
          secondary: '#0F0F0F',
          tertiary: '#161823',
          elevated: '#1C1F2E',
        },
        // Surface
        surface: {
          glass: 'rgba(15, 15, 23, 0.85)',
        },
        // Border
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          hover: 'rgba(255, 255, 255, 0.2)',
        },
        // Text
        foreground: {
          DEFAULT: '#FFFFFF',
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.65)',
          tertiary: 'rgba(255, 255, 255, 0.45)',
          inverse: '#000000',
        },
        // Semantic
        success: {
          DEFAULT: '#00D084',
          bg: 'rgba(0, 208, 132, 0.15)',
        },
        warning: {
          DEFAULT: '#FFB800',
          bg: 'rgba(255, 184, 0, 0.15)',
        },
        error: {
          DEFAULT: '#FF4D4F',
          bg: 'rgba(255, 77, 79, 0.15)',
        },
        info: {
          DEFAULT: '#25F4EE',
          bg: 'rgba(37, 244, 238, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display': ['32px', { lineHeight: '1.1', fontWeight: '600' }],
        'h1': ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'h2': ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['18px', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['16px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        'overline': ['11px', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0.1em' }],
      },
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.5)',
        'xl': '0 16px 48px rgba(0, 0, 0, 0.6)',
        'glow-primary': '0 0 20px rgba(254, 44, 85, 0.4)',
        'glow-secondary': '0 0 20px rgba(37, 244, 238, 0.4)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      transitionDuration: {
        'instant': '0ms',
        'fast': '100ms',
        'normal': '200ms',
        'slow': '300ms',
        'slower': '400ms',
        'slowest': '600ms',
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(254, 44, 85, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(254, 44, 85, 0.6)' },
        },
        'spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'fade-out': 'fade-out 150ms ease-in',
        'slide-up': 'slide-up 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-down': 'slide-down 200ms ease-in',
        'scale-in': 'scale-in 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'scale-out': 'scale-out 150ms ease-in',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      minHeight: {
        'touch': '44px',
        'touch-comfortable': '48px',
      },
      minWidth: {
        'touch': '44px',
        'touch-comfortable': '48px',
      },
    },
  },
  plugins: [],
}

export default config
