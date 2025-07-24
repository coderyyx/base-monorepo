import { readFileSync } from 'fs';

import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const isESModule = process.env.BUILD_FORMAT === 'esm';

// 获取外部依赖
const external = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });

// Babel 配置
const babelConfig = {
  allowAllFormats: true,
  filename: 'src/index.ts', // 添加文件名配置
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
        modules: false,
      },
    ],
    '@babel/preset-typescript',
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
      sourcemap: false,
    }
  : {
      format: 'cjs',
      entryFileNames: '[name].js',
      exports: 'named',
      dir: 'dist/lib',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: false,
    };

export default {
  input: 'src/index.ts',
  output: outputConfig,
  external,
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false, // 使用 tsc 单独生成类型文件
      declarationMap: false,
      sourceMap: false,
      outDir: undefined, // 让 Rollup 控制输出目录
    }),
    getBabelOutputPlugin(babelConfig),
  ],
};
