#!/usr/bin/env zx

try {
  // 检查是否有文件变更
  const status = await $`git status --porcelain`;
  if (status.stdout.trim()) {
    // 固定推送到 main 分支
    const branchName = 'main';

    // 获取 GitHub token，支持多种环境变量名
    const githubToken =
      process.env.GITHUB_TOKEN || process.env.ACCESS_TOKEN || process.env.GH_TOKEN;

    if (!githubToken) {
      console.error(
        '❌ GitHub token 未找到，请设置以下环境变量之一: ACCESS_TOKEN, GITHUB_TOKEN, GH_TOKEN',
      );
      process.exit(1);
    }

    // 使用固定的 GitHub 仓库地址
    const repoUrl = `https://x-access-token:${githubToken}@github.com/coderyyx/base-monorepo.git`;

    console.log(`📦 更新依赖锁文件...`);
    await $`pnpm install --lockfile-only --no-frozen-lockfile`;

    console.log(`📝 提交变更...`);
    await $`git add .`;
    await $`git commit -m "chore: update versions [skip ci]"`;

    console.log(`🚀 推送到 GitHub (${branchName} 分支)...`);
    await $`git push ${repoUrl} HEAD:${branchName} --follow-tags`;

    console.log(`✅ 版本更新已成功提交并推送到 GitHub`);
  } else {
    console.log('📄 没有文件变更，跳过提交');
  }
} catch (error) {
  console.error('❌ 提交版本失败:', error);
  process.exit(1);
}
