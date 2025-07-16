# Scripts 使用说明

## commit-version.mjs

自动提交版本更新到 GitHub 的脚本。

### 功能

- 检查是否有文件变更
- 更新 pnpm 锁文件
- 自动提交变更
- 推送到 GitHub 远程仓库

### 环境变量配置

脚本支持以下环境变量之一（优先级从高到低）：

- `ACCESS_TOKEN` - GitHub Repository Secret（推荐用于 CI/CD）
- `GITHUB_TOKEN` - GitHub Personal Access Token
- `GH_TOKEN` - GitHub CLI token

### GitHub Token 获取方式

1. 访问 [GitHub Settings > Personal access tokens](https://github.com/settings/tokens)
2. 点击 "Generate new token"
3. 选择合适的权限（至少需要 `repo` 权限）
4. 复制生成的 token

### 使用方法

```bash
# 设置环境变量（任选一种）
export ACCESS_TOKEN=your_github_token_here
# 或者
export GITHUB_TOKEN=your_github_token_here

# 运行脚本
zx scripts/commit-version.mjs
```

### 在 GitHub CI/CD 中配置

#### 1. 在 GitHub 仓库中配置 Secret：

1. 进入仓库页面：`https://github.com/coderyyx/base-monorepo`
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 配置：
   ```
   Name: ACCESS_TOKEN
   Secret: ghp_your_actual_github_token_here
   ```

#### 2. 在 GitHub Actions 中使用：

```yaml
- name: Commit version changes
  env:
    ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
  run: zx scripts/commit-version.mjs
```

### 功能说明

- 脚本固定推送到 `main` 分支
- 使用固定的 GitHub 仓库地址：`https://github.com/coderyyx/base-monorepo.git`
- 提交信息包含 `[skip ci]` 标记，避免触发无限 CI 循环
- 包含详细的错误提示和进度信息

## create-lib.mjs

创建新包的脚本。

### 使用方法

```bash
pnpm new
```

或

```bash
zx scripts/create-lib.mjs
```
