#!/usr/bin/env zx

/**
 * 检查是否有包需要发布
 * 返回需要发布的包信息，如果没有则返回空字符串
 */

import { getReleasePlan } from '@changesets/get-release-plan';
import path from 'path';

async function checkReleases() {
  try {
    // 获取当前工作目录
    const cwd = process.cwd();

    // 获取发布计划
    const releasePlan = await getReleasePlan(cwd);

    // 检查是否有包需要发布
    const releasesToPublish = releasePlan.releases.filter((release) => release.type !== 'none');

    if (releasesToPublish.length > 0) {
      // 输出需要发布的包信息
      console.log('需要发布的包：');
      releasesToPublish.forEach((release) => {
        console.log(
          `  - ${release.name}: ${release.oldVersion} → ${release.newVersion} (${release.type})`,
        );
      });

      // 返回包名列表，供后续脚本使用
      process.stdout.write(releasesToPublish.map((r) => r.name).join(','));
    } else {
      console.log('没有包需要发布');
      process.stdout.write('');
    }
  } catch (error) {
    console.error('检查发布计划时出错：', error);
    process.exit(1);
  }
}

// 执行检查
await checkReleases();
