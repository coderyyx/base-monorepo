const { theme } = require('@base/tailwind/src/themes');

const { basePlugin } = require('@base/tailwind/src/plugins/base');
const { ScrollbarPlugin } = require('@base/tailwind/src/plugins/scrollbar');

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.{vue,html,js}'],
  theme: {
    ...theme,
  },
  plugins: [basePlugin, ScrollbarPlugin],
  corePlugins: {
    preflight: false,
  },
};
