# GitHub Actions 工作流分析 - 多包发布流程

## 概述

该 GitHub Actions 工作流文件(`release.yml`)是一个专为 monorepo 多包项目设计的自动化发布系统，支持快照版本发布、发布检查和生产环境发布三种核心功能。

## 快速参考表

| 任务名称 | 触发方式 | 执行分支 | 发布目标 | 主要用途 |
| --- | --- | --- | --- | --- |
| **snapshot-publish** | 自动：Push 到`test`/`feat/*`<br/>手动：选择快照发布 | `test`, `feat/*` | NPM (beta 标签) | 开发测试环境预发布 |
| **check-releases-packages** | 自动：Push 到`main`<br/>手动：选择检查发布 | `main` | 不发布，仅检查 | 发布前验证和预检查 |
| **production-publish-pkg** | 仅手动触发 | `main` | NPM (正式版本) | 生产环境正式发布 |

### 🔒 安全等级

- 🟢 **快照发布**：自动化程度高，适合频繁发布
- 🟡 **发布检查**：安全验证，防止错误发布
- 🔴 **生产发布**：最高安全级别，仅手动触发

## 工作流基本配置

### 名称和触发条件

```yaml
name: 多包发布流程

on:
  push:
    branches: ['test', 'feat/**', 'main']
  pull_request:
    branches: ['test', 'feat/**', 'main']
  workflow_dispatch:
    inputs:
      job_type:
        description: '选择要执行的任务'
        required: true
        default: 'snapshot-publish'
        type: choice
        options:
          - 'check-releases-packages'
          - 'production-publish-pkg'
```

**触发方式：**

1. **自动触发**：推送或 PR 到 `test`、`feat/**`、`main` 分支
2. **手动触发**：通过 GitHub Actions 界面，可选择具体执行的任务类型

### 权限设置

```yaml
permissions:
  contents: write # 允许读写仓库内容
  packages: write # 允许发布包
  pull-requests: write # 允许创建 PR
```

这些权限确保工作流可以：

- 修改代码和创建提交
- 发布 npm 包
- 操作 Pull Request

## 三大核心任务详解

### 1. 快照版本发布 (snapshot-publish)

**触发条件：**

- 手动触发且选择 `snapshot-publish`（默认选项）
- 推送到 `test` 或 `feat/*` 分支

**主要功能：**

- 构建和发布带有 `beta` 标签的快照版本
- 用于开发和测试环境的预发布

**关键步骤分析：**

1. **环境准备**

   ```bash
   # 安装指定版本的工具
   pnpm: 9.15.4
   Node.js: 20.17.0
   ```

2. **依赖管理**

   ```bash
   pnpm install --frozen-lockfile  # 确保依赖版本一致性
   ```

3. **构建过程**

   ```bash
   pnpm exec zx ./scripts/build.mjs  # 使用 zx 脚本构建所有包
   ```

4. **NPM 认证配置**

   ```bash
   # 配置 npm 认证信息
   echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
   echo "registry=https://registry.npmjs.org/" >> ~/.npmrc
   echo "always-auth=true" >> ~/.npmrc
   ```

5. **智能发布逻辑**

   ```bash
   # 只有检测到变更时才发布
   if [[ -n "$(pnpm exec zx ./scripts/check-releases.mjs)" ]]; then
     pnpm exec changeset version --snapshot beta
     pnpm exec changeset publish --tag beta --no-git-tag --snapshot
   fi
   ```

### 2. 发布检查 (check-releases-packages)

**触发条件：**

- 手动触发且选择 `check-releases-packages`（仅限 main 分支）
- 推送到 `main` 分支

**主要功能：**

- 检查是否有包需要发布
- 验证 changeset 配置的正确性
- 作为生产发布前的预检查

**检查逻辑：**

```bash
OUTPUT=$(pnpm exec zx ./scripts/check-releases.mjs)
if [[ -n "$OUTPUT" ]]; then
  echo "✅ 找到需要发布的包"
else
  echo "❌ 没有找到需要发布的包"
  exit 1  # 检查失败时退出
fi
```

**可能的检查结果：**

- ✅ 有包需要发布：显示待发布包列表
- ❌ 无包需要发布：可能原因包括无 changeset 文件、所有变更已发布、配置错误等

### 3. 生产环境发布 (production-publish-pkg)

**触发条件：**

- **仅支持手动触发**（安全考虑）
- 必须在 `main` 分支上执行
- 必须选择 `production-publish-pkg` 任务类型

**主要功能：**

- 正式版本发布到 npm
- 自动更新版本号
- 提交版本变更到 git

**完整发布流程：**

1. **发布前检查**

   ```bash
   OUTPUT=$(pnpm exec zx ./scripts/check-releases.mjs)
   ```

2. **构建包**

   ```bash
   pnpm exec zx ./scripts/build.mjs
   ```

3. **版本更新**

   ```bash
   pnpm exec changeset version  # 根据 changeset 更新版本号
   ```

4. **发布到 npm**

   ```bash
   pnpm exec changeset publish  # 发布到 npm registry
   ```

5. **Git 操作**
   ```bash
   pnpm exec zx ./scripts/commit-version.mjs  # 提交版本变更
   ```

## 安全机制和最佳实践

### 1. 分环境发布策略

- **开发/测试**：自动发布快照版本（beta 标签）
- **生产环境**：仅支持手动发布，增加安全性

### 2. 权限控制

- 生产发布必须在 `main` 分支
- 使用 GitHub Secrets 管理敏感信息（`NPM_TOKEN`, `ACCESS_TOKEN`）

### 3. 错误处理

- 检查发布前置条件
- 发布失败时提供明确的错误信息
- 保留构建产物便于问题排查

## 依赖的外部脚本

工作流依赖以下自定义脚本：

1. **`./scripts/build.mjs`** - 构建所有包
2. **`./scripts/check-releases.mjs`** - 检查待发布包
3. **`./scripts/commit-version.mjs`** - 提交版本变更

## 环境变量和密钥

### 必需的 GitHub Secrets：

- `NPM_TOKEN` - npm 发布认证令牌
- `ACCESS_TOKEN` - GitHub 访问令牌（用于 git 操作）

## 使用建议

### 1. 开发阶段

- 在 `feat/*` 分支开发
- 推送时自动触发快照版本发布
- 使用 `beta` 标签的包进行测试

### 2. 发布前检查

- 合并到 `main` 分支前，先检查是否有包需要发布
- 手动运行 `check-releases-packages` 验证发布准备情况

### 3. 生产发布

- 确保在 `main` 分支上操作
- 手动触发 `production-publish-pkg`
- 发布后验证 npm 上的包版本

## 故障排除

### 常见问题：

1. **"没有找到需要发布的包"**

   - 检查是否有 `.changeset` 文件
   - 验证 changeset 配置
   - 确认变更是否已经发布

2. **npm 发布失败**

   - 验证 `NPM_TOKEN` 是否有效
   - 检查包名是否冲突
   - 确认网络连接正常

3. **Git 操作失败**
   - 验证 `ACCESS_TOKEN` 权限
   - 检查分支保护规则
   - 确认 Git 配置正确

## 实际使用示例

### 场景一：功能开发和测试

```bash
# 1. 创建功能分支
git checkout -b feat/add-new-component

# 2. 开发并提交代码
git add .
git commit -m "feat: add new component"

# 3. 添加 changeset（如果需要发布）
pnpm changeset
# 选择要发布的包和版本类型（patch/minor/major）

# 4. 推送分支 - 自动触发快照发布
git push origin feat/add-new-component
```

**CI 执行流程：**

1. 自动触发 `snapshot-publish` 任务
2. 构建并发布带有 `beta` 标签的版本
3. 可以通过 `npm install @your-org/package@beta` 测试

### 场景二：准备生产发布

`feat/add-new-component` 分支 PR 到 `main` 分支

**CI 执行流程：**

1. 自动触发 `check-releases-packages` 任务
2. 检查是否有包需要发布
3. 如果检查通过，说明可以进行生产发布

### 场景三：生产环境发布

1. 在 GitHub Actions 界面手动触发工作流
2. 选择 `production-publish-pkg` 任务
3. 确认在 `main` 分支上执行

**CI 执行流程：**

1. 构建所有包
2. 根据 changeset 自动更新版本号
3. 发布到 npm registry
4. 提交版本变更到 git
5. 创建 git tags

### 实际输出示例

**快照发布成功输出：**

```
📦 Found packages to publish, creating snapshot version...
🚀 Publishing packages with beta tag:
  - @your-org/hooks@1.2.3-beta.1
  - @your-org/utils@2.1.0-beta.1
✅ Snapshot packages published successfully
```

**生产发布成功输出：**

```
📋 检测到需要发布的包：
  - @your-org/hooks (1.2.2 → 1.2.3)
  - @your-org/utils (2.0.1 → 2.1.0)

📦 构建包...
🔖 更新版本...
🚀 发布包...
💾 提交版本变更...
✅ 生产环境包发布完成
```

## 与 changeset 工作流集成

这个 CI 工作流与 [changeset](https://github.com/changesets/changesets) 深度集成：

### 1. 开发阶段

```bash
# 添加变更说明
pnpm changeset
```

### 2. changeset 文件示例

```markdown
---
'@your-org/hooks': minor
'@your-org/utils': patch
---

Add new useDebounce hook and fix utility function bug
```

### 3. 版本更新和发布

- **快照版本**：`changeset version --snapshot beta`
- **正式版本**：`changeset version`
- **发布**：`changeset publish`

## 总结

这个 GitHub Actions 工作流提供了：

✨ **完整的发布流水线**

- 开发环境快照发布
- 生产前检查验证
- 安全的生产发布

🛡️ **多层安全保障**

- 分支权限控制
- 手动审批生产发布
- 完整的错误处理

🔄 **自动化程度高**

- 自动构建和版本管理
- 智能检测发布需求
- 自动提交版本变更

这套工作流特别适合多包 monorepo 项目，能够有效管理包的版本发布，确保发布流程的安全性和可靠性。
