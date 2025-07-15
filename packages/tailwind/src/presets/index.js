const { theme } = require('../themes');
const { gtThemeAdapter } = require('../themes/gt');

const { basePlugin } = require('../plugins/base');
const { ScrollbarPlugin } = require('../plugins/scrollbar');

exports.preset = {
  // 增加前缀 避免原子名称和代码名称冲突
  prefix: 'tw-',
  content: ['./src/**/*.{vue,html,js}'],
  theme: {
    ...theme,
    extend: { ...gtThemeAdapter() },
  },
  plugins: [basePlugin, ScrollbarPlugin],
  corePlugins: {
    preflight: false,
  },
};
