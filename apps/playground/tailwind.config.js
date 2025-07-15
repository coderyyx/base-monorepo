const { theme } = require('@base-one/tailwind/src/themes');

const { basePlugin } = require('@base-one/tailwind/src/plugins/base');
const { ScrollbarPlugin } = require('@base-one/tailwind/src/plugins/scrollbar');

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
