module.exports = {
  pluginSearchDirs: false,
  plugins: [
    require('@ianvs/prettier-plugin-sort-imports'),
    require('prettier-plugin-packagejson'),
    require('prettier-plugin-tailwindcss'),
  ],
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  importOrder: ['^vue', '', '<THIRD_PARTY_MODULES>', '', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};
