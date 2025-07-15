import { resolve } from 'path';

import vue from '@vitejs/plugin-vue2';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      // 增加需要演示的 package 别名，以使用热更新调试
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``,
      },
    },
  },
  plugins: [vue()],
});
