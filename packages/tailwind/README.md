# @base-one/tailwind

> 游戏工具 Tailwind CSS 配置包

## 快速开始

```bash
pnpm add @base-one/tailwind -D
# or
npm i @base-one/tailwind -D
```

```js
// tailwind.config.js
const { preset } = require('@base-one/tailwind');

module.exports = {
  ...preset,
};
```

## 前置配置

### gpx 变量注入

需要注入 gpx css 变量，用于等比缩放适配：

手动注入 gpx 变量：

```js
document.documentElement.style.setProperty('--gpx', '0.01rem'); // M 且 rootFontSize 为 100px
document.documentElement.style.setProperty('--gpx', '1px'); // PC
```

## 工具类

### 基础工具类

#### Flex 布局

```css
/* 居中布局 */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 垂直居中 */
.flex-items-center {
  display: flex;
  align-items: center;
}

/* 水平居中 */
.flex-justify-center {
  display: flex;
  justify-content: center;
}
```

#### 绝对定位

```css
/* 绝对定位居中 */
.absolute-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/* 水平居中 */
.absolute-x-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* 垂直居中 */
.absolute-y-center {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

### 滚动条

#### xx 主题

```css
/* 默认滚动条 */
.scrollbar {
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.12);
  }
  &::-webkit-scrollbar-thumb:hover {
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.32);
  }
}
```

#### 隐藏滚动条

```css
.scrollbar-hide {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

## 开发指南

### 目录结构

```bash
src/
  ├── colors/         # 色板配置
  │   ├── index.js      # 原神色板
  ├── plugins/        # 工具类插件
  │   ├── base.js    # 基础工具类
  │   └── scrollbar.js # 滚动条样式
  ├── presets/        # 预设主题
  │   ├── index.js      # 预设主题
  ├── themes/         # 主题配置
  │   ├── gt.js      # 通用主题
  │   ├── index.js      # 原神主题
  └── index.js        # 入口文件
```

### 新增主题

1. 在 colors/ 下添加色板配置

   ```js
   // colors/game.js
   exports.gameColors = {
     game: {
       element: { ... },
       quality: { ... },
     },
     func: { ... },
   };
   ```

2. 在 themes/ 下添加主题配置

   ```js
   // themes/game.js
   exports.gameTheme = {
     colors: { ... },
     backgroundImage: { ... },
     fontFamily: { ... },
   };
   ```

3. 在 presets/ 下添加预设

   ```js
   // presets/game.js
   const { gameTheme } = require('../themes/game');
   const { gtThemeAdapter } = require('../themes/gt');
   const { basePlugin } = require('../plugins/base');

   exports.twPreset = {
     prefix: 'tw-',
     theme: {
       ...gameTheme,
       extend: { ...gtThemeAdapter() },
     },
     plugins: [basePlugin],
   };
   ```

4. 在 index.js 中导出

   ```js
   const { gamePreset } = require('./presets/game');

   module.exports = {
     gamePreset,
   };
   ```

### 新增工具类

1. 在 plugins/ 下创建插件

   ```js
   // plugins/custom.js
   exports.customPlugin = ({ addUtilities }) => {
     addUtilities({
       '.custom-class': {
         // 样式定义
       },
     });
   };
   ```

2. 在预设中引入插件

   ```js
   // presets/index.js
   const { customPlugin } = require('../plugins/custom');

   exports.twPreset = {
     // ...
     plugins: [basePlugin, customPlugin],
   };
   ```
