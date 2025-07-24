# @base-one/uitls-example

> 现代化的 JavaScript 工具库，支持 ESM 和 CommonJS 双格式

## 特性

- 🚀 **双格式支持**: 同时提供 ESM 和 CommonJS 格式
- 🌳 **Tree Shaking**: 支持按需导入，减少打包体积
- 🔧 **现代化构建**: 基于 Rollup + Babel 的构建体系
- 📦 **模块化设计**: 保持源码结构，便于调试和维护

## 快速开始

### 安装

```bash
pnpm add @base-one/uitls-example
# or
npm i @base-one/uitls-example
```

## 构建配置

### 技术栈

- **Rollup**: 现代化的模块打包器
- **Babel**: JavaScript 语法转译
- **@babel/preset-env**: 智能的语法转换
- **@babel/plugin-transform-runtime**: 避免全局污染

### 构建特性

1. **双格式输出**

   - `dist/esm/`: ES Module 格式，支持 Tree Shaking
   - `dist/lib/`: CommonJS 格式，兼容 Node.js 环境

2. **模块结构保持**

   - 使用 `preserveModules: true` 保持源码结构
   - 便于按需导入和调试

3. **外部依赖处理**

   - 自动识别 `dependencies` 和 `peerDependencies`
   - 避免将外部依赖打包到产物中

4. **Babel 转译**
   - 支持现代 JavaScript 语法
   - 运行时依赖自动注入

### 构建命令

```bash
# 构建所有格式
pnpm run build

# 仅构建 ESM 格式
pnpm run build:esm

# 仅构建 CommonJS 格式
pnpm run build:cjs

# 开发模式（监听文件变化）
pnpm run start
```

## 项目结构

```
packages/uitls-js/
├── src/
│   ├── index.js      # 主入口文件
│   └── add.js        # 工具函数模块
├── dist/
│   ├── esm/          # ES Module 格式
│   │   ├── index.js
│   │   └── add.js
│   └── lib/          # CommonJS 格式
│       ├── index.js
│       └── add.js
├── rollup.config.mjs # Rollup 构建配置
└── package.json
```

## 开发规范

### 1. 函数命名

- 使用 camelCase 命名
- 动词开头，准确描述功能
- 避免缩写，保持可读性

### 2. 模块组织

- 按功能分类组织代码
- 保持单一职责原则
- 每个模块独立导出

### 3. 文档规范

- 必须包含 JSDoc 注释
- 提供完整的参数和返回值说明
- 包含使用示例和边界情况

### 4. 代码质量

- 保持纯函数设计
- 避免副作用
- 注意浏览器和 Node.js 兼容性

## 构建产物说明

### 文件格式

- **ESM 格式** (`dist/esm/`)

  - 使用 `import/export` 语法
  - 支持 Tree Shaking
  - 适用于现代打包工具

- **CommonJS 格式** (`dist/lib/`)
  - 使用 `require/module.exports` 语法
  - 兼容 Node.js 环境
  - 适用于传统构建工具

### 优化特性

- **Tree Shaking**: 支持按需导入，减少最终打包体积
- **模块保持**: 保持源码结构，便于调试
- **外部依赖**: 自动排除外部依赖，避免重复打包

## 注意事项

### 1. 兼容性

- 支持 Node.js 14+ 和现代浏览器
- 使用 Babel 转译确保兼容性
- 注意运行时依赖的版本要求

### 2. 性能优化

- 利用 Tree Shaking 减少打包体积
- 避免不必要的依赖引入
- 合理使用外部依赖

### 3. 开发建议

- 优先使用 ESM 格式进行开发
- 充分利用 IDE 的类型提示
- 定期更新依赖版本

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

ISC License
