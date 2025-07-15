#!/usr/bin/env zx

import getReleasePlan from '@changesets/get-release-plan';
import { isPrivatePackage } from './utils/workspace.mjs';

// 检查是否有变更需要发布
const { releases } = await getReleasePlan(process.cwd());

if (!releases.length) {
  process.exit(0);
}

// 过滤掉 private 包
const publicReleases = [];
for (const release of releases) {
  const isPrivate = await isPrivatePackage(release.name);
  if (!isPrivate) {
    publicReleases.push(release);
  }
}

if (!publicReleases.length) {
  console.log('No public packages to publish');
  process.exit(0);
}

// 格式化输出发布信息
const releaseInfo = publicReleases
  .map((release) => {
    return `📦 ${release.name} => ${release.newVersion}`;
  })
  .join('\n');

console.log(releaseInfo);
process.exit(0);
