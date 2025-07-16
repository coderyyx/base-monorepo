#!/usr/bin/env zx

try {
  console.log('🔍 环境变量调试信息：');
  console.log(
    'GITHUB_TOKEN:',
    process.env.GITHUB_TOKEN ? `${process.env.GITHUB_TOKEN.substring(0, 8)}...` : '未设置',
  );
  console.log(
    'ACCESS_TOKEN:',
    process.env.ACCESS_TOKEN ? `${process.env.ACCESS_TOKEN.substring(0, 8)}...` : '未设置',
  );
  console.log(
    'GH_TOKEN:',
    process.env.GH_TOKEN ? `${process.env.GH_TOKEN.substring(0, 8)}...` : '未设置',
  );
  console.log('GITHUB_ACTOR:', process.env.GITHUB_ACTOR || '未设置');
  console.log('GITHUB_REPOSITORY:', process.env.GITHUB_REPOSITORY || '未设置');
  console.log('GITHUB_REF:', process.env.GITHUB_REF || '未设置');
  console.log('CI:', process.env.CI || '未设置');
  console.log('');

  // 检查 git 配置
  console.log('⚙️  Git 配置信息：');
  try {
    const gitUser = await $`git config user.name`;
    const gitEmail = await $`git config user.email`;
    console.log('Git user.name:', gitUser.stdout.trim());
    console.log('Git user.email:', gitEmail.stdout.trim());
  } catch (error) {
    console.log('Git 配置未设置或获取失败');
  }

  try {
    const remoteUrl = await $`git remote get-url origin`;
    console.log('Git remote origin:', remoteUrl.stdout.trim());
  } catch (error) {
    console.log('无法获取 git remote 信息');
  }
  console.log('');

  // 检查是否有文件变更
  const status = await $`git status --porcelain`;
  if (status.stdout.trim()) {
    // 固定推送到 main 分支
    const branchName = 'main';

    // 获取 GitHub token，支持多种环境变量名
    console.log('🔑 Token 获取过程：');
    const githubToken =
      process.env.GITHUB_TOKEN || process.env.ACCESS_TOKEN || process.env.GH_TOKEN;

    if (process.env.GITHUB_TOKEN) {
      console.log('✅ 使用 GITHUB_TOKEN');
    } else if (process.env.ACCESS_TOKEN) {
      console.log('✅ 使用 ACCESS_TOKEN');
    } else if (process.env.GH_TOKEN) {
      console.log('✅ 使用 GH_TOKEN');
    }

    if (!githubToken) {
      console.error(
        '❌ GitHub token 未找到，请设置以下环境变量之一: ACCESS_TOKEN, GITHUB_TOKEN, GH_TOKEN',
      );
      process.exit(1);
    }

    console.log(`🔗 使用的 token 长度: ${githubToken.length}`);
    console.log(`🔗 Token 前缀: ${githubToken.substring(0, 4)}...`);

    // 使用固定的 GitHub 仓库地址
    const repoUrl = `https://x-access-token:${githubToken}@github.com/coderyyx/base-monorepo.git`;
    console.log(`📍 仓库 URL: https://x-access-token:***@github.com/coderyyx/base-monorepo.git`);
    console.log('');

    console.log(`📦 更新依赖锁文件...`);
    await $`pnpm install --lockfile-only --no-frozen-lockfile`;

    console.log(`📝 提交变更...`);
    await $`git add .`;
    await $`git commit -m "chore: update versions [skip ci]"`;

    console.log(`🚀 推送到 GitHub (${branchName} 分支)...`);
    console.log(`📤 推送命令: git push [REPO_URL] HEAD:${branchName} --follow-tags`);

    try {
      await $`git push ${repoUrl} HEAD:${branchName} --follow-tags`;
      console.log(`✅ 版本更新已成功提交并推送到 GitHub`);
    } catch (pushError) {
      console.error('❌ 推送失败，详细信息:');
      console.error('Exit code:', pushError.exitCode);
      console.error('Stdout:', pushError.stdout);
      console.error('Stderr:', pushError.stderr);
      console.error('');
      console.error('💡 可能的解决方案:');
      console.error('1. 检查 GitHub Actions 权限设置');
      console.error('2. 确认 token 有 repo 写入权限');
      console.error('3. 检查分支保护规则');
      console.error('4. 验证仓库设置中的 Actions 权限');
      throw pushError;
    }
  } else {
    console.log('📄 没有文件变更，跳过提交');
  }
} catch (error) {
  console.error('❌ 提交版本失败:', error);
  process.exit(1);
}
