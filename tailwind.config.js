/** Colors come from CSS variables (src/index.css) so Light/Dark switch instantly. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        page: 'var(--page)',
        card: 'var(--card)',
        sunk: 'var(--sunk)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        brand: 'var(--brand)',
        'brand-ink': 'var(--brand-ink)',
        tint: 'var(--tint)',
        warn: 'var(--warn)',
        'warn-tint': 'var(--warn-tint)',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'system-ui', '"Segoe UI"', 'Tahoma', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
