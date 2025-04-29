use std::path::PathBuf;
use serde::{Deserialize, Serialize};
use std::fmt;

/// 支持的组件库类型
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Library {
    ElementPlus,
    AntDesignVue,
    NaiveUi,
    Vant,
}

impl fmt::Display for Library {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Library::ElementPlus => write!(f, "Element Plus"),
            Library::AntDesignVue => write!(f, "Ant Design Vue"),
            Library::NaiveUi => write!(f, "Naive UI"),
            Library::Vant => write!(f, "Vant"),
        }
    }
}

impl Library {
    pub fn to_string(&self) -> String {
        match self {
            Library::ElementPlus => "element-plus".to_string(),
            Library::AntDesignVue => "ant-design-vue".to_string(),
            Library::NaiveUi => "naive-ui".to_string(),
            Library::Vant => "vant".to_string(),
        }
    }
}

/// 包管理器类型
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum PackageManager {
    Npm,
    Yarn,
    Pnpm,
}

impl fmt::Display for PackageManager {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            PackageManager::Npm => write!(f, "npm"),
            PackageManager::Yarn => write!(f, "yarn"),
            PackageManager::Pnpm => write!(f, "pnpm"),
        }
    }
}

/// 项目信息
#[derive(Debug)]
pub struct ProjectInfo {
    pub is_valid: bool,
    pub is_vue: bool,
    pub is_vite: bool,
    pub has_typescript: bool,
    pub package_manager: PackageManager,
    pub vite_config_path: Option<PathBuf>,
    pub ts_config_path: Option<PathBuf>,
    pub errors: Vec<String>,
}

impl Default for ProjectInfo {
    fn default() -> Self {
        Self {
            is_valid: false,
            is_vue: false,
            is_vite: false,
            has_typescript: false,
            package_manager: PackageManager::Npm,
            vite_config_path: None,
            ts_config_path: None,
            errors: Vec::new(),
        }
    }
}

/// 组件库配置
pub struct LibraryConfig {
    pub name: String,
    pub dependencies: Vec<String>,
    pub resolver_import: String,
    pub resolver_name: String,
}

/// 获取组件库配置
pub fn get_library_config(library: Library) -> LibraryConfig {
    match library {
        Library::ElementPlus => LibraryConfig {
            name: "element-plus".to_string(),
            dependencies: vec![
                "element-plus".to_string(),
                "unplugin-auto-import".to_string(),
                "unplugin-vue-components".to_string(),
            ],
            resolver_import: "import { ElementPlusResolver } from \"unplugin-vue-components/resolvers\";".to_string(),
            resolver_name: "ElementPlusResolver".to_string(),
        },
        Library::AntDesignVue => LibraryConfig {
            name: "ant-design-vue".to_string(),
            dependencies: vec![
                "ant-design-vue".to_string(),
                "unplugin-auto-import".to_string(),
                "unplugin-vue-components".to_string(),
            ],
            resolver_import: "import { AntDesignVueResolver } from \"unplugin-vue-components/resolvers\";".to_string(),
            resolver_name: "AntDesignVueResolver".to_string(),
        },
        Library::NaiveUi => LibraryConfig {
            name: "naive-ui".to_string(),
            dependencies: vec![
                "naive-ui".to_string(),
                "unplugin-auto-import".to_string(),
                "unplugin-vue-components".to_string(),
            ],
            resolver_import: "import { NaiveUiResolver } from \"unplugin-vue-components/resolvers\";".to_string(),
            resolver_name: "NaiveUiResolver".to_string(),
        },
        Library::Vant => LibraryConfig {
            name: "vant".to_string(),
            dependencies: vec![
                "vant".to_string(),
                "unplugin-auto-import".to_string(),
                "unplugin-vue-components".to_string(),
            ],
            resolver_import: "import { VantResolver } from \"unplugin-vue-components/resolvers\";".to_string(),
            resolver_name: "VantResolver".to_string(),
        },
    }
}

/// 包信息结构体
#[derive(Debug, Serialize, Deserialize)]
pub struct PackageJson {
    pub dependencies: Option<serde_json::Map<String, serde_json::Value>>,
    pub devDependencies: Option<serde_json::Map<String, serde_json::Value>>,
}