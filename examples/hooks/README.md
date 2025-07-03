# Hooks 示例项目

> 基于 @base-ys/hooks 的 Hooks 示例项目模板

## 快速开始

```bash
pnpm add @base/hooks-example
# or
npm i @base/hooks-example
```

```js
import { useInstance } from '@base/hooks-example';
```

## 使用说明

### 参数及返回值

补充参数及返回值说明

### 示例

补充示例

## 构建产物

- 支持 Tree Shaking
- 提供 ESM/CJS 两种格式

```bash
dist/
  ├── esm/           # ES Module 格式
  └── lib/           # CommonJS 格式
```

## 开发规范

1. 函数命名

   - 使用 camelCase
   - 动词开头，准确描述功能

2. 模块组织

   - 按功能分类
   - 保持单一职责

3. 文档规范
   - 必须包含 JSDoc 注释
   - 提供完整的参数和返回值说明
   - 包含使用示例

## 注意事项

1. 代码开发

   - 注意兼容性

2. 可选：测试相关

   - 单元测试覆盖率要求
   - 提供完整的测试用例
