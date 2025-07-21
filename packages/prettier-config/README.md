# @base-one/prettier-config

统一的 Prettier 代码格式化配置，支持 CommonJS 和 ESM 两种模块格式。

## 安装

```bash
pnpm add -D @base-one/prettier-config
```

## 使用方法

### CommonJS 项目

```js
// .prettierrc.js
module.exports = require('@base-one/prettier-config');
```

### ESM 项目

```js
// .prettierrc.js
export default (await import('@base-one/prettier-config')).default;
```

或者使用 `import` 语法：

```js
// .prettierrc.js
import config from '@base-one/prettier-config';
export default config;
```

### package.json 配置

```json
{
  "prettier": "@base-one/prettier-config"
}
```

## 配置特性

- ✅ **导入排序**：使用 `@ianvs/prettier-plugin-sort-imports` 自动排序导入语句
- ✅ **Package.json 格式化**：使用 `prettier-plugin-packagejson` 格式化 package.json
- ✅ **Vue 优先**：Vue 相关导入优先排序
- ✅ **路径别名支持**：支持 `@/` 路径别名
- ✅ **双格式支持**：同时支持 CommonJS 和 ESM 项目

## 导入排序规则

```js
importOrder: [
  '^vue', // Vue 相关导入优先
  '', // 空行分隔
  '<THIRD_PARTY_MODULES>', // 第三方模块
  '', // 空行分隔
  '^@/(.*)$', // 路径别名
  '^[./]', // 相对路径导入
];
```

## 配置选项

| 选项            | 值        | 说明             |
| --------------- | --------- | ---------------- |
| `semi`          | `true`    | 语句末尾添加分号 |
| `singleQuote`   | `true`    | 使用单引号       |
| `trailingComma` | `'all'`   | 多行时尾随逗号   |
| `printWidth`    | `100`     | 行宽限制         |
| `proseWrap`     | `'never'` | 不自动换行       |
| `endOfLine`     | `'lf'`    | 使用 LF 换行符   |

## 模块格式支持

本包同时支持 CommonJS 和 ESM 格式：

- **CommonJS**: `index.cjs` (默认)
- **ESM**: `index.js`

Node.js 会根据项目的 `package.json` 中的 `"type"` 字段自动选择合适的格式：

- 无 `"type"` 字段或 `"type": "commonjs"` → 使用 CommonJS
- `"type": "module"` → 使用 ESM

## 示例

### 格式化前

```js
import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import './styles.css';
import { formatDate } from '@/utils/date';
import axios from 'axios';

const Component = {
  data() {
    return {
      message: 'Hello World',
    };
  },
};
```

### 格式化后

```js
import { computed, ref } from 'vue';

import axios from 'axios';
import { useQuery } from '@tanstack/vue-query';

import { formatDate } from '@/utils/date';

import './styles.css';

const Component = {
  data() {
    return {
      message: 'Hello World',
    };
  },
};
```
