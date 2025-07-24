import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import pkg from './package.json';

const isESModule = process.env.BUILD_FORMAT === 'esm';

// 获取外部依赖
const external = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });

// Babel 配置
const babelConfig = {
  allowAllFormats: true,
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
        modules: false,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: isESModule,
        version: '7.9.0',
      },
    ],
  ],
};

// 输出配置
const outputConfig = isESModule
  ? {
      format: 'es',
      entryFileNames: '[name].js',
      dir: 'dist/esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
    }
  : {
      format: 'cjs',
      entryFileNames: '[name].js',
      exports: 'named',
      dir: 'dist/lib',
      preserveModules: true,
      preserveModulesRoot: 'src',
    };

export default {
  input: 'src/index.js',
  output: outputConfig,
  external,
  plugins: [nodeResolve(), commonjs(), getBabelOutputPlugin(babelConfig)],
};
