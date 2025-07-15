# @base/playground

## 简介

@base/playground 是一个基于 Storybook 的开发调试和演示环境，用于展示和开发本 monorepo 中的各个 package。

## 开发调试

### 启动开发服务

```bash
# 在 playground 目录下运行
pnpm start
```

这将启动 Storybook 开发服务器，默认端口为 6006。

### 配置别名

如需热更新调试其他 package，请在 `vite.config.js` 中添加相应的别名配置：

```js
resolve: {
  alias: {
    '@base/your-package': resolve(__dirname, '../../path/to/your/package'),
  },
}
```

### 热更新开发

得益于 Vite 的热更新特性，你可以实时查看修改效果：

1. 在 `src` 目录下创建新的组件目录
2. 添加 stories 文件
3. 在浏览器中实时预览修改

## 组件演示

### 目录结构

```
src/
  ├── component-name/
  │   ├── arg-types.js    # 组件参数定义
  │   ├── demo/           # 示例代码
  │   └── index.stories.js # Story 配置
  └── index.mdx          # 文档入口
```

### 添加新组件演示

1. 创建组件目录
2. 定义组件参数
3. 编写示例代码
4. 配置 stories

## 构建文档

```bash
# 构建静态文档站点
pnpm build
```

构建后的文件将输出到 `dist` 目录。

## 现有组件
