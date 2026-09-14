/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        surface: {
          0:   '#0a0e1a',  // deepest bg
          1:   '#111827',  // page bg
          2:   '#1a2236',  // card bg
          3:   '#1e2a40',  // elevated card
          4:   '#243048',  // hover state
          border: '#2a3a56',
        },
        // Brand accents
        accent: {
          cyan:   '#22d3ee',
          'cyan-dim': '#0e9ab5',
          amber:  '#f59e0b',
          'amber-dim': '#b45309',
          violet: '#8b5cf6',
          green:  '#10b981',
          red:    '#ef4444',
          orange: '#f97316',
        },
        // Device state colors
        device: {
          light:  '#fbbf24',
          fan:    '#60a5fa',
          thermo: '#f87171',
          lock:   '#34d399',
          plug:   '#a78bfa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-cyan':  'radial-gradient(ellipse at center, rgba(34,211,238,0.15) 0%, transparent 70%)',
        'glow-amber': 'radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-cyan':   '0 0 20px rgba(34,211,238,0.25)',
        'glow-amber':  '0 0 20px rgba(245,158,11,0.25)',
        'glow-violet': '0 0 20px rgba(139,92,246,0.25)',
        'glow-green':  '0 0 20px rgba(16,185,129,0.25)',
        'card':        '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':  '0 8px 32px rgba(0,0,0,0.6)',
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in':      'fadeIn 0.3s ease-out',
        'slide-in':     'slideIn 0.3s ease-out',
        'spin-slow':    'spin 3s linear infinite',
        'bounce-light': 'bounceSlight 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
};
