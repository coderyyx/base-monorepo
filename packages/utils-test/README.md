# @base-one/utils-test

> 工具库 utils-test

## 特性

- 🚀 **TypeScript 支持**: 完整的类型定义和智能提示
- 🎯 **Vue 2.7 兼容**: 基于 Vue 2.7 Composition API
- 🔧 **现代化构建**: 基于 Rollup + TypeScript 的构建体系
- 📦 **模块化设计**: 支持按需导入，减少打包体积
- 🛡️ **类型安全**: 严格的 TypeScript 类型检查

## 快速开始

### 安装

```bash
pnpm add @base-one/vue-hooks-ts
# or
npm i @base-one/vue-hooks-ts
```

### 使用

```ts
// 在 Vue 组件中使用
import { useCounter, useLocalStorage, useDebounce } from '@base-one/vue-hooks-ts';
import { ref } from 'vue';

export default {
  setup() {
    // 计数器
    const { count, increment, decrement } = useCounter({
      min: 0,
      max: 10,
      initialValue: 5,
    });

    // 本地存储
    const theme = useLocalStorage('theme', { defaultValue: 'light' });

    // 防抖
    const searchText = ref('');
    const debouncedSearch = useDebounce(searchText, { delay: 500 });

    return {
      count,
      increment,
      decrement,
      theme,
      searchText,
      debouncedSearch,
    };
  },
};
```

## API 文档

### useInstance()

获取当前 Vue 实例。

**返回值:**

- `proxy`: 当前组件的代理对象
- `instance`: 完整的组件实例

**示例:**

```ts
import { useInstance } from '@base-one/vue-hooks-ts';

export default {
  setup() {
    const { proxy, instance } = useInstance();

    // 访问组件实例
    console.log(proxy.$el);

    return {};
  },
};
```

### useCounter(options?)

计数器 Hook，提供计数相关的响应式数据和方法。

**参数:**

- `options` (可选): 配置选项
  - `min`: 最小值，默认 `-Infinity`
  - `max`: 最大值，默认 `Infinity`
  - `initialValue`: 初始值，默认 `0`

**返回值:**

- `count`: 当前计数值
- `increment`: 增加方法
- `decrement`: 减少方法
- `reset`: 重置方法
- `setValue`: 设置值方法

**示例:**

```ts
import { useCounter } from '@base-one/vue-hooks-ts';

export default {
  setup() {
    const { count, increment, decrement, reset } = useCounter({
      min: 0,
      max: 100,
      initialValue: 10,
    });

    return { count, increment, decrement, reset };
  },
};
```

### useLocalStorage(key, options?)

本地存储 Hook，提供响应式的 localStorage 数据。

**参数:**

- `key`: 存储键名
- `options` (可选): 配置选项
  - `defaultValue`: 默认值
  - `serializer`: 自定义序列化器

**返回值:**

- 响应式的存储值

**示例:**

```ts
import { useLocalStorage } from '@base-one/vue-hooks-ts';

export default {
  setup() {
    // 基本使用
    const theme = useLocalStorage('theme', { defaultValue: 'light' });

    // 自定义序列化器
    const user = useLocalStorage('user', {
      defaultValue: { name: '', age: 0 },
      serializer: {
        read: (value) => JSON.parse(value),
        write: (value) => JSON.stringify(value),
      },
    });

    return { theme, user };
  },
};
```

### useDebounce(value, options?)

防抖 Hook，延迟更新值。

**参数:**

- `value`: 需要防抖的响应式值
- `options` (可选): 配置选项
  - `delay`: 延迟时间（毫秒），默认 `300`
  - `immediate`: 是否立即执行，默认 `false`

**返回值:**

- 防抖后的响应式值

**示例:**

```ts
import { useDebounce } from '@base-one/vue-hooks-ts';
import { ref } from 'vue';

export default {
  setup() {
    const searchText = ref('');
    const debouncedSearch = useDebounce(searchText, {
      delay: 500,
      immediate: false,
    });

    return { searchText, debouncedSearch };
  },
};
```

### useThrottle(value, options?)

节流 Hook，限制值的更新频率。

**参数:**

- `value`: 需要节流的响应式值
- `options` (可选): 配置选项
  - `delay`: 节流时间（毫秒），默认 `300`
  - `immediate`: 是否立即执行，默认 `true`

**返回值:**

- 节流后的响应式值

**示例:**

```ts
import { useThrottle } from '@base-one/vue-hooks-ts';
import { ref } from 'vue';

export default {
  setup() {
    const scrollPosition = ref(0);
    const throttledScroll = useThrottle(scrollPosition, {
      delay: 100,
      immediate: true,
    });

    return { scrollPosition, throttledScroll };
  },
};
```

## 构建配置

### 技术栈

- **Rollup**: 现代化的模块打包器
- **TypeScript**: 类型安全的 JavaScript 超集
- **Babel**: JavaScript 语法转译
- **@rollup/plugin-typescript**: TypeScript 支持

### 构建特性

1. **双格式输出**

   - `dist/esm/`: ES Module 格式，支持 Tree Shaking
   - `dist/lib/`: CommonJS 格式，兼容 Node.js 环境
   - `dist/types/`: TypeScript 类型定义文件

2. **类型安全**

   - 完整的 TypeScript 类型定义
   - 严格的类型检查
   - 智能的 IDE 提示

3. **模块结构保持**
   - 使用 `preserveModules: true` 保持源码结构
   - 便于按需导入和调试

### 构建命令

```bash
# 构建所有格式
pnpm run build

# 仅构建 ESM 格式
pnpm run build:esm

# 仅构建 CommonJS 格式
pnpm run build:cjs

# 仅生成类型定义
pnpm run build:types

# 开发模式（监听文件变化）
pnpm run start
```

## 项目结构

```
packages/vue-hooks-ts/
├── src/
│   ├── index.ts           # 主入口文件
│   ├── use-instance.ts    # 实例获取 Hook
│   ├── use-counter.ts     # 计数器 Hook
│   ├── use-local-storage.ts # 本地存储 Hook
│   ├── use-debounce.ts    # 防抖 Hook
│   └── use-throttle.ts    # 节流 Hook
├── types/
│   └── vue.d.ts           # Vue 类型声明
├── dist/
│   ├── esm/               # ES Module 格式
│   ├── lib/               # CommonJS 格式
│   └── types/             # TypeScript 类型定义
├── rollup.config.mjs      # Rollup 构建配置
├── tsconfig.json          # TypeScript 配置
└── package.json
```

## 开发规范

### 1. 类型定义

- 为所有函数参数和返回值定义明确的类型
- 使用泛型提高代码复用性
- 提供完整的 JSDoc 注释

### 2. Hook 设计

- 遵循 Vue Composition API 最佳实践
- 保持纯函数设计，避免副作用
- 提供合理的默认值和配置选项

### 3. 错误处理

- 在适当的时机抛出有意义的错误
- 提供清晰的错误信息
- 考虑边界情况和异常处理

### 4. 性能优化

- 合理使用 `watch` 和 `computed`
- 及时清理定时器和事件监听器
- 避免不必要的响应式数据创建

## 注意事项

### 1. Vue 版本要求

- 需要 Vue 2.7+ 版本
- 确保项目已启用 Composition API

### 2. TypeScript 配置

- 确保 `tsconfig.json` 包含 Vue 类型
- 建议启用严格模式进行类型检查

### 3. 浏览器兼容性

- 部分 Hook 依赖现代浏览器 API
- 注意 localStorage 和 setTimeout 的兼容性

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingHook`)
3. 提交更改 (`git commit -m 'Add some AmazingHook'`)
4. 推送到分支 (`git push origin feature/AmazingHook`)
5. 打开 Pull Request

## 许可证

ISC License
