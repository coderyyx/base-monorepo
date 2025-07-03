#!/usr/bin/env zx

import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';

const TEMPLATE_MAP = {
  ui: 'examples/ui',
  hooks: 'examples/hooks',
  utilsTs: 'examples/utils-ts',
  cliTs: 'examples/cli-ts',
};

const TYPE_DESCRIPTIONS = {
  utilsTs: '工具库 - 提供独立的工具函数集合 (TypeScript)',
  ui: '组件库 - 提供可复用的 Vue 组件',
  cliTs: 'CLI 工具 - 提供命令行工具（TypeScript）',
  hooks: 'Hooks 库 - 提供可复用的组合式函数',
};

// 定义需要过滤的文件和目录
const FILTER = (src) => {
  const basename = path.basename(src);
  return !['node_modules', '.DS_Store', 'dist', 'coverage'].includes(basename);
};

async function main() {
  // 获取用户输入
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '请选择要创建的库类型:',
      choices: Object.entries(TYPE_DESCRIPTIONS).map(([value, name]) => ({
        name,
        value,
      })),
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入包名 (例如: @base/xxx 或 @mx/xxx 或 @ugc/xxx):',
      validate: (input) => {
        if (!input) return '包名不能为空';
        if (!input.startsWith('@base/') && !input.startsWith('@mx/') && !input.startsWith('@ugc/'))
          return '包名必须以 @ug/ 或 @base/ 或 @mx/ 或 @ugc/ 开头';
        return true;
      },
    },
    {
      type: 'input',
      name: 'description',
      message: '请输入包描述:',
      default: ({ type, name }) =>
        `${TYPE_DESCRIPTIONS[type].split(' - ')[0]} ${name
          .replace('@ug/', '')
          .replace('@base/', '')
          .replace('@mx/', '')
          .replace('@ugc/', '')}`,
    },
  ]);

  const { type, name, description } = answers;
  const shortName = name
    .replace('@base/', '')
  const targetDir = `packages/${shortName}`;

  // 复制模板，添加过滤器
  console.log('\n正在创建项目...');
  await fs.copy(TEMPLATE_MAP[type], targetDir, {
    filter: FILTER,
  });

  // 更新 package.json
  const pkgPath = path.join(targetDir, 'package.json');
  const pkg = await fs.readJson(pkgPath);

  Object.assign(pkg, {
    name,
    description,
    version: '0.0.0',
    private: false,
    publishConfig: {
      access: 'public'
    },
  });

  await fs.writeJson(pkgPath, pkg, { spaces: 2 });

  // 更新 README.md
  const readmePath = path.join(targetDir, 'README.md');
  let readme = await fs.readFile(readmePath, 'utf-8');

  readme = readme.replace(/# .*/, `# ${name}`).replace(/> .*/, `> ${description}`);

  await fs.writeFile(readmePath, readme);

  if (type === 'cdn') {
    const gitlabCiPath = path.join(targetDir, '.gitlab-ci.yml');
    let gitlabCi = await fs.readFile(gitlabCiPath, 'utf-8');

    gitlabCi = gitlabCi
      .replace(/cdn-example/g, shortName)
      .replace(/cdn_example/g, shortName.replace(/-/g, '_'))
      .replace(/CDN_EXAMPLE/g, shortName.toUpperCase().replace(/-/g, '_'));

    await fs.writeFile(gitlabCiPath, gitlabCi);
  }

  console.log('\n✨ 创建成功!');
  console.log(`\n下一步:\n`);
  console.log(`1. pnpm i`);
  console.log(`2. cd ${targetDir}`);
  console.log(`3. 完善 README.md 文档`);
  console.log(`4. 编写你的代码`);
}

main().catch(console.error);
