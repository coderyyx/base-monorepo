import { findWorkspacePackages } from '@pnpm/find-workspace-packages';

export async function getWorkspacePackages() {
  // 使用 @pnpm/find-workspace-packages 获取所有工作区包
  const workspacePackages = await findWorkspacePackages(process.cwd());

  // 构建包名到包信息的映射
  const packages = new Map();
  for (const pkg of workspacePackages) {
    packages.set(pkg.manifest.name, {
      path: pkg.dir,
      ...pkg.manifest,
    });
  }

  return packages;
}

export async function isPrivatePackage(pkgName) {
  try {
    const packages = await getWorkspacePackages();
    const pkg = packages.get(pkgName);

    if (!pkg) {
      console.warn(`Warning: Package ${pkgName} not found in workspace`);
      return false;
    }

    return !!pkg.private;
  } catch (error) {
    console.warn(`Warning: Could not determine private status for ${pkgName}:`, error);
    return false;
  }
}
