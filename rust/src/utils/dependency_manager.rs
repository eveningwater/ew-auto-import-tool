use anyhow::{Context, Result};
use std::path::Path;
use std::process::Command;

use crate::types::{Library, PackageManager, get_library_config};

/// 安装依赖
pub fn install_dependencies(
    library: Library,
    project_path: &Path,
    package_manager: &PackageManager,
) -> Result<()> {
    let library_config = get_library_config(library);
    let dependencies = library_config.dependencies;

    // 构建安装命令
    let (cmd, install_cmd) = match package_manager {
        PackageManager::Npm => ("npm", "install"),
        PackageManager::Yarn => ("yarn", "add"),
        PackageManager::Pnpm => ("pnpm", "add"),
    };

    // 执行安装命令
    let status = Command::new(cmd)
        .current_dir(project_path)
        .arg(install_cmd)
        .args(&dependencies)
        .arg("--save")
        .status()
        .context(format!("执行 {} {} 命令失败", cmd, install_cmd))?;

    if !status.success() {
        anyhow::bail!("依赖安装失败，退出码: {:?}", status.code());
    }

    Ok(())
}