# Base Monorepo

一个基于 pnpm 的现代化前端 monorepo 项目，专注于 Vue 2.7 生态系统的组件库、工具库和开发配置的统一管理与发布。

## 🏗️ 项目架构

```
base-monorepo/
├── 📦 packages/          # 核心包（可发布）
│   ├── eslint-config/    # ESLint 配置包
│   ├── hooks/           # Vue 2.7 Composition API hooks 库
│   ├── prettier-config/ # Prettier 配置包
│   └── tailwind/        # Tailwind CSS 配置与主题包
├── 🎯 apps/             # 应用程序
│   └── playground/      # Storybook 演示与开发环境
├── 📚 examples/         # 示例项目模板
│   ├── cli-ts/         # CLI 工具模板（TypeScript）
│   ├── hooks/          # Hooks 示例模板
│   ├── ui/            # UI 组件示例模板
│   └── utils-ts/      # 工具库示例模板
├── 🛠️ scripts/         # 构建与开发脚本
└── 🔧 配置文件
```

## 🚀 核心特性

### 📋 开发工具链

- **包管理**: pnpm workspace 多包管理
- **构建工具**: Vite + TypeScript + SWC
- **代码质量**: ESLint + Prettier + Husky + lint-staged
- **版本管理**: Changesets 自动化版本发布
- **CI/CD**: GitHub Actions 自动构建与发布 → [详细工作流分析](./CI-WORKFLOW-ANALYSIS.md)

### 🎨 UI & 样式

- **Vue 2.7**: 支持 Composition API
- **样式方案**: CSS Modules + Sass + Tailwind CSS
- **设计系统**: 统一主题配置与色彩体系

### 🔌 核心包能力

#### `@base-one/hooks` - Vue Hooks 库

```bash
pnpm add @base-one/hooks
```

- ✅ 基于 Vue 2.7 Composition API
- ✅ TypeScript 类型支持
- ✅ Tree-shaking 友好
- ✅ VueUse 集成

**主要功能**:

- `useFinalModal` - 模态框管理 hook
- `useInstance` - 组件实例访问 hook

#### `@base-one/eslint-config` - ESLint 配置

```bash
pnpm add -D @base-one/eslint-config
```

- ✅ Vue 2.7 规则配置
- ✅ Prettier 集成
- ✅ TypeScript 支持

#### `@base-one/prettier-config` - 代码格式化配置

```bash
pnpm add -D @base-one/prettier-config
```

- ✅ 统一代码风格
- ✅ 导入排序优化
- ✅ Vue 文件格式化

#### `@base-one/tailwind` - Tailwind 配置包

```bash
pnpm add -D @base-one/tailwind
```

- ✅ 预设主题配置
- ✅ 自定义插件集成
- ✅ 设计令牌系统

## 🛠️ 开发指南

### 环境要求

- Node.js: `20.17.0`
- pnpm: `9.15.4`

### 快速开始

```bash
# 克隆项目
git clone <repository-url>
cd base-monorepo

# 安装依赖
pnpm install

# 启动开发环境
pnpm run playground:start
```

### 📦 创建新包

使用内置脚本快速创建新包：

```bash
pnpm run new
```

脚本支持 4 种包类型：

- **工具库** (`utilsTs`) - TypeScript 工具函数集合
- **组件库** (`ui`) - Vue 组件集合
- **CLI 工具** (`cliTs`) - 命令行工具
- **Hooks 库** (`hooks`) - Vue Composition API hooks

### 🏗️ 构建与发布

```bash
# 添加变更记录
pnpm changeset

# 推送变更记录到远程仓库自动触发 CI/CD 流程，执行包的构建与发布
```

> 💡 **CI/CD 详细说明**：查看 [GitHub Actions 工作流分析](./CI-WORKFLOW-ANALYSIS.md) 了解完整的发布流程、安全机制和使用指南。

### 📱 开发调试

#### Playground 演示环境

```bash
cd apps/playground
pnpm start  # 启动 Storybook 开发服务器
```

## 🔧 配置说明

### Workspace 配置

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*' # 核心包
  - 'examples/*' # 示例模板
  - 'apps/*' # 应用程序
```

### Changesets 配置

```json
{
  "access": "public",           # npm 公开发布
  "baseBranch": "main",        # 主分支
  "updateInternalDependencies": "patch",
  "ignore": ["@base/playground", "@base/*-example"]
}
```

### ESLint 使用

```js
// .eslintrc.js
module.exports = {
  extends: ['@base-one/eslint-config/vue'],
};
```

### Prettier 使用

```js
// .prettierrc.js
module.exports = require('@base-one/prettier-config');
```

### Tailwind 使用

```js
// tailwind.config.js
const { preset } = require('@base-one/tailwind');

module.exports = {
  presets: [preset],
  content: ['./src/**/*.{vue,js,ts}'],
};
```

## 📝 开发规范

### 命名约定

- **目录**: `kebab-case` (如: `component-name`)
- **文件**: `kebab-case.vue` (Vue 组件)
- **包名**: `@base-one/package-name`
- **函数**: `camelCase` (如: `useFinalModal`)

### 代码风格

- 使用 Composition API (Vue 2.7)
- TypeScript 类型安全
- 函数式编程优先
- 单一职责原则

### 提交规范

```bash
# 使用 conventional commits
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建/工具链更新
```

## 🔗 生态集成

### Vue 2.7 生态

- **状态管理**: 支持 Pinia/Vuex
- **路由**: Vue Router 3.x
- **工具库**: VueUse 11+ (Vue 2.7 兼容版本)
- **数据获取**: @tanstack/vue-query

### 构建工具

- **开发服务器**: Vite 6+
- **TypeScript**: 5.8+
- **构建优化**: SWC/esbuild

## 📊 项目状态

| 包名 | 版本 | 状态 | 描述 |
| --- | --- | --- | --- |
| @base-one/hooks | ![npm](https://img.shields.io/npm/v/@base-one/hooks) | ✅ | Vue 2.7 Hooks 库 |
| @base-one/eslint-config | ![npm](https://img.shields.io/npm/v/@base-one/eslint-config) | ✅ | ESLint 配置 |
| @base-one/prettier-config | ![npm](https://img.shields.io/npm/v/@base-one/prettier-config) | ✅ | Prettier 配置 |
| @base-one/tailwind | ![npm](https://img.shields.io/npm/v/@base-one/tailwind) | 🔧 | Tailwind 配置 |

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支: `git checkout -b feature/amazing-feature`
3. 提交变更: `git commit -m 'feat: add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 创建 Pull Request

---

<div align="center">
  <sub>Built with ❤️ by Base Team</sub>
</div>
