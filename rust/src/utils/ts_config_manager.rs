use anyhow::{Context, Result};
use serde_json::{json, Value};
use std::fs;
use std::path::Path;

/// 更新TypeScript配置
pub fn update_ts_config(project_path: &Path) -> Result<()> {
    let ts_config_path = project_path.join("tsconfig.json");

    // 检查tsconfig.json是否存在
    if !ts_config_path.exists() {
        println!("未找到tsconfig.json文件，跳过TypeScript配置更新");
        return Ok(());
    }

    // 读取tsconfig.json
    let ts_config_content = fs::read_to_string(&ts_config_path)
        .context("读取tsconfig.json失败")?;
    let mut ts_config: Value = serde_json::from_str(&ts_config_content)
        .context("解析tsconfig.json失败")?;

    // 检查include配置是否存在
    if !ts_config.get("include").is_some() {
        ts_config["include"] = json!([]);
    }

    // 添加声明文件到include配置
    let declaration_files = vec!["components.d.ts", "auto-imports.d.ts"];
    let mut updated = false;

    if let Some(include) = ts_config["include"].as_array_mut() {
        for file in declaration_files {
            if !include.iter().any(|v| v.as_str() == Some(file)) {
                include.push(json!(file));
                updated = true;
            }
        }
    }

    // 如果有更新，则写入文件
    if updated {
        let formatted_json = serde_json::to_string_pretty(&ts_config)
            .context("格式化tsconfig.json失败")?;
        fs::write(&ts_config_path, formatted_json)
            .context(format!("写入tsconfig.json失败: {:?}", ts_config_path))?;
        println!("已更新TypeScript配置文件: {:?}", ts_config_path);
    } else {
        println!("TypeScript配置已包含所需声明文件，无需更新");
    }

    Ok(())
}