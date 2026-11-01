import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── COLOR SYSTEM ───────────────────────────────────────────────────────────
      colors: {
        gold: {
          50:  'rgb(var(--gold-50) / <alpha-value>)',
          100: 'rgb(var(--gold-100) / <alpha-value>)',
          200: 'rgb(var(--gold-200) / <alpha-value>)',
          300: 'rgb(var(--gold-300) / <alpha-value>)',
          400: 'rgb(var(--gold) / <alpha-value>)',
          DEFAULT: 'rgb(var(--gold) / <alpha-value>)',
          600: 'rgb(var(--gold-dark) / <alpha-value>)',
          700: 'rgb(var(--gold-700) / <alpha-value>)',
          800: 'rgb(var(--gold-800) / <alpha-value>)',
          900: 'rgb(var(--gold-900) / <alpha-value>)',
        },
        black: {
          DEFAULT: 'rgb(var(--surface-base) / <alpha-value>)',
          rich:    'rgb(var(--surface-rich) / <alpha-value>)',
        },
        charcoal: {
          DEFAULT: 'rgb(var(--surface-raised) / <alpha-value>)',
          light:   'rgb(var(--surface-card) / <alpha-value>)',
          medium:  'rgb(var(--surface-strong) / <alpha-value>)',
        },
        gray: {
          medium: 'rgb(var(--text-secondary) / <alpha-value>)',
          light:  'rgb(var(--text-muted) / <alpha-value>)',
          muted:  'rgb(var(--text-muted) / <alpha-value>)',
          border: 'rgb(var(--border-color) / <alpha-value>)',
        },
        warm: {
          white: 'rgb(var(--text-primary) / <alpha-value>)',
          off:   'rgb(var(--surface-base) / <alpha-value>)',
          cream: 'rgb(var(--surface-raised) / <alpha-value>)',
        },
      },

      // ─── TYPOGRAPHY ─────────────────────────────────────────────────────────────
      fontFamily: {
        arabic:  ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        english: ['var(--font-english)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-arabic)', 'var(--font-english)', 'system-ui', 'sans-serif'],
        mono:    ['monospace'],
      },
      fontSize: {
        // Display / Hero
        'display-2xl': ['clamp(3rem, 8vw, 7rem)',  { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl':  ['clamp(2.5rem, 6vw, 5rem)',{ lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-lg':  ['clamp(2rem, 4vw, 3.5rem)',{ lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        // Headings
        'heading-xl':  ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading-lg':  ['clamp(1.5rem, 2.5vw, 2rem)',  { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'heading-md':  ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3'  }],
        'heading-sm':  ['clamp(1rem, 1.5vw, 1.25rem)', { lineHeight: '1.4'  }],
        // Body
        'body-xl': ['1.125rem', { lineHeight: '1.7' }],
        'body-lg': ['1rem',     { lineHeight: '1.75' }],
        'body-md': ['0.9375rem',{ lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.65' }],
        // Labels / Captions
        'label':   ['0.75rem',  { lineHeight: '1.5', letterSpacing: '0.12em' }],
        'caption': ['0.6875rem',{ lineHeight: '1.5', letterSpacing: '0.08em' }],
      },

      // ─── SPACING ─────────────────────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
        '54': '13.5rem',
        '58': '14.5rem',
        '62': '15.5rem',
        '66': '16.5rem',
        '70': '17.5rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
      },

      // ─── ANIMATION ───────────────────────────────────────────────────────────────
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'premium':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo':  'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-premium': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(2rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%':   { opacity: '0', transform: 'translateX(-2rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'gold-shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'cursor-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.2)' },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':   'fade-in 0.6s ease forwards',
        'scale-in':  'scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-right': 'slide-in-right 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-left':  'slide-in-left  0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'gold-shimmer': 'gold-shimmer 3s linear infinite',
        'cursor-pulse': 'cursor-pulse 2s ease-in-out infinite',
      },

      // ─── BORDERS ─────────────────────────────────────────────────────────────────
      borderWidth: {
        '0.5': '0.5px',
        '3': '3px',
      },
      borderColor: {
        gold: 'rgb(var(--gold) / <alpha-value>)',
        'gold-subtle': 'rgb(var(--gold) / 0.3)',
        'gold-dim':    'rgb(var(--gold) / 0.15)',
      },

      // ─── BACKDROP ─────────────────────────────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
      },

      // ─── ASPECT RATIOS ───────────────────────────────────────────────────────────
      aspectRatio: {
        '3/4':   '3 / 4',
        '4/3':   '4 / 3',
        '16/10': '16 / 10',
        '21/9':  '21 / 9',
        '2/3':   '2 / 3',
      },

      // ─── Z-INDEX ─────────────────────────────────────────────────────────────────
      zIndex: {
        '1':    '1',
        '2':    '2',
        '60':   '60',
        '70':   '70',
        '80':   '80',
        '90':   '90',
        '100':  '100',
        'navbar': '200',
        'cursor': '9999',
        'modal':  '300',
        'horse':  '10',
      },

      // ─── CONTAINER ───────────────────────────────────────────────────────────────
      maxWidth: {
        'site':  '1440px',
        'prose': '72ch',
        'narrow': '960px',
      },
    },
  },
  plugins: [],
};

export default config;
