const px2gpx = require('@base-one/tailwind/src/postcss-px2gpx');
const tailwindcss = require('tailwindcss');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = () => {
  return {
    plugins: [
      tailwindcss(),
      postcssPresetEnv(),
      px2gpx({
        source: 'px',
        target: 'var(--gpx)',
      }),
    ],
  };
};
