/** @type {import('tailwindcss').Config} */
module.exports = {
  // 根据组件所属业务选择合适的 preset
  ...require('@base-one/tailwind').preset,
  content: ['./src/**/*.{vue,html,js}'],
  // 自行判定前缀是否可与宿主项目一致
  prefix: 'tw-',
};
