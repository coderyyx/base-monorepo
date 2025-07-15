#!/usr/bin/env zx

import getReleasePlan from '@changesets/get-release-plan';
import { isPrivatePackage } from './utils/workspace.mjs';

try {
  // 获取需要发布的包
  const releasePlan = await getReleasePlan(process.cwd());

  // 过滤掉 private 包
  const pkgs = [];
  for (const release of releasePlan.releases || []) {
    const isPrivate = await isPrivatePackage(release.name);
    if (!isPrivate) {
      pkgs.push(release.name);
    }
  }

  if (pkgs.length === 0) {
    console.log('No packages to publish');
    process.exit(0);
  }

  console.log('Packages to be published:', pkgs);

  // 构建 filter 参数
  const filterArgs = pkgs.map((pkg) => `--filter ${pkg}...`).join(' ');
  console.log('filterArgs:', filterArgs);

  // 安装子包依赖
  console.log('Installing package dependencies...');
  await $`pnpm ${filterArgs.split(' ')} install --frozen-lockfile`;

  // 构建包
  console.log('Building packages...');
  await $`pnpm ${filterArgs.split(' ')} build`;

  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
