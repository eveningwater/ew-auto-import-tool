use anyhow::{Context, Result};
use std::fs;
use std::path::Path;

use crate::types::{PackageJson, PackageManager, ProjectInfo};

/// 检查项目结构
pub fn check_project(project_path: &Path) -> Result<ProjectInfo> {
    let mut result = ProjectInfo::default();

    // 检查package.json是否存在
    let package_json_path = project_path.join("package.json");
    if !package_json_path.exists() {
        result
            .errors
            .push("未找到package.json文件，请确保在Vue项目根目录中运行此工具".to_string());
        return Ok(result);
    }

    // 读取package.json
    let package_json_content =
        fs::read_to_string(&package_json_path).context("读取package.json失败")?;
    let package_json: PackageJson =
        serde_json::from_str(&package_json_content).context("解析package.json失败")?;

    // 检查是否为Vue项目
    let has_vue_dep = package_json
        .dependencies
        .as_ref()
        .map(|deps| deps.contains_key("vue"))
        .unwrap_or(false);
    let has_vue_dev_dep = package_json
        .dev_dependencies
        .as_ref()
        .map(|deps| deps.contains_key("vue"))
        .unwrap_or(false);

    if !has_vue_dep && !has_vue_dev_dep {
        result
            .errors
            .push("未检测到Vue依赖，请确保这是一个Vue项目".to_string());
    } else {
        result.is_vue = true;
    }

    // 检查是否使用Vite
    let has_vite_dev_dep = package_json
        .dev_dependencies
        .as_ref()
        .map(|deps| deps.contains_key("vite"))
        .unwrap_or(false);

    if !has_vite_dev_dep {
        result
            .errors
            .push("未检测到Vite依赖，此工具仅支持Vite项目".to_string());
    } else {
        result.is_vite = true;

        // 查找vite.config文件
        let vite_config_ts_path = project_path.join("vite.config.ts");
        let vite_config_js_path = project_path.join("vite.config.js");

        if vite_config_ts_path.exists() {
            result.vite_config_path = Some(vite_config_ts_path);
        } else if vite_config_js_path.exists() {
            result.vite_config_path = Some(vite_config_js_path);
        } else {
            result
                .errors
                .push("未找到vite.config.ts或vite.config.js文件".to_string());
        }
    }

    // 检查是否使用TypeScript
    let ts_config_path = project_path.join("tsconfig.json");
    if ts_config_path.exists() {
        result.has_typescript = true;
        result.ts_config_path = Some(ts_config_path);
    }

    // 检测包管理器
    let yarn_lock_path = project_path.join("yarn.lock");
    let pnpm_lock_path = project_path.join("pnpm-lock.yaml");

    if yarn_lock_path.exists() {
        result.package_manager = PackageManager::Yarn;
    } else if pnpm_lock_path.exists() {
        result.package_manager = PackageManager::Pnpm;
    } else {
        result.package_manager = PackageManager::Npm;
    }

    // 判断项目是否有效
    result.is_valid = result.is_vue && result.is_vite && result.vite_config_path.is_some();

    Ok(result)
}
