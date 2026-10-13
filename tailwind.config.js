/*
 * css/tailwind.css is built from this file. Rebuild it after adding or changing
 * Tailwind classes in htmlfiles/ or js/, or the new classes will have no style:
 *
 *   npx tailwindcss@3.4.17 -c tailwind.config.js -i css/tailwind.src.css -o css/tailwind.css --minify
 */
module.exports = {
  darkMode: 'class',
  content: ['./htmlfiles/*.html', './js/**/*.js', './js/**/*.mjs'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        soft: 'rgb(var(--foreground-soft) / <alpha-value>)',
        muted: 'rgb(var(--foreground-muted) / <alpha-value>)',
        line: 'rgb(var(--border) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
};
