# UI 组件示例项目

> 基于 @base-ys/ui 的组件示例项目模板

## 快速开始

```bash
pnpm add @base/ui-example
# or
npm i @base/ui-example
```

```js
import { Button } from '@base/ui-example';

import '@base/ui/dist/style.css';
```

## 使用说明

### Props

补充 Props 说明

### Events

补充 Events 说明

### Slots

补充 Slots 说明

## 构建产物

- 支持 Tree Shaking
- 提供 ESM/CJS 两种格式

```bash
dist/
  ├── esm/            # ES Module 格式
  ├── lib/            # CommonJS 格式
  └── style.css       # 样式文件
```

## 开发规范

1. 组件开发

   - 文件统一使用中横线命名
   - 模板中统一使用大驼峰引用组件
   - 使用 Composition API

2. 样式规范

   - 使用 CSS Module
   - 可选：使用 Tailwind CSS

3. 文档规范
   - 组件必须包含使用说明
   - 提供完整的 Props/Events/Slots 文档
