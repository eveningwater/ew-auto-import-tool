#!/bin/bash

# 颜色定义
GREEN="\033[0;32m"
BLUE="\033[0;34m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
NC="\033[0m" # No Color

# 打印带颜色的消息
function print_message() {
  echo -e "${BLUE}===> ${1}${NC}"
}

# 检查命令是否存在
function check_command() {
  if ! command -v $1 &> /dev/null; then
    echo -e "${RED}错误: $1 未安装，请先安装它。${NC}"
    exit 1
  fi
}

# 检查必要的命令
check_command "cargo"
check_command "npm"

# 设置工作目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUST_DIR="$(dirname "$SCRIPT_DIR")"
EXAMPLE_PROJECT="my-vue-app"
EXAMPLE_DIR="$SCRIPT_DIR/$EXAMPLE_PROJECT"

print_message "开始运行 Auto Import Tool 示例"

# 编译 Rust 工具
print_message "编译 Rust 工具"
cd "$RUST_DIR"
cargo build --release
if [ $? -ne 0 ]; then
  echo -e "${RED}编译失败，请检查错误信息。${NC}"
  exit 1
fi
echo -e "${GREEN}编译成功!${NC}"

# 创建示例 Vue 项目
print_message "创建示例 Vue 项目"
cd "$SCRIPT_DIR"

# 如果项目已存在，询问是否删除
if [ -d "$EXAMPLE_PROJECT" ]; then
  echo -e "${YELLOW}警告: $EXAMPLE_PROJECT 目录已存在。${NC}"
  read -p "是否删除并重新创建? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf "$EXAMPLE_PROJECT"
  else
    echo -e "${YELLOW}使用现有项目继续。${NC}"
  fi
fi

# 如果项目不存在，创建新项目
if [ ! -d "$EXAMPLE_PROJECT" ]; then
  echo -e "${GREEN}创建新的 Vue + TypeScript 项目...${NC}"
  npm create vite@latest $EXAMPLE_PROJECT -- --template vue-ts
  cd "$EXAMPLE_PROJECT"
  npm install
else
  cd "$EXAMPLE_PROJECT"
fi

# 运行 Auto Import Tool
print_message "运行 Auto Import Tool 配置 Element Plus"
TOOL_PATH="$RUST_DIR/target/release/ew-auto-import-tool"

echo -e "${YELLOW}选择运行模式:${NC}"
echo "1) 自动模式 (使用 Element Plus)"
echo "2) 交互模式 (手动选择组件库)"
read -p "请选择 (1/2): " -n 1 -r
echo

if [[ $REPLY =~ ^[1]$ ]]; then
  "$TOOL_PATH" --library element-plus --path "$EXAMPLE_DIR"
else
  "$TOOL_PATH" --path "$EXAMPLE_DIR"
fi

# 创建示例组件
if [ $? -eq 0 ]; then
  print_message "创建示例组件以验证配置"
  
  # 创建一个使用组件库的示例组件
  cat > "$EXAMPLE_DIR/src/App.vue" << EOL
<template>
  <div class="container">
    <h1>Element Plus 自动导入示例</h1>
    <div class="card">
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">登录</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 注意：ElMessage 需要手动导入，但其他组件不需要
const username = ref('')
const password = ref('')

const handleSubmit = () => {
  if (!username.value || !password.value) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  ElMessage.success('登录成功!')
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
EOL

  print_message "示例创建完成"
  echo -e "${GREEN}现在你可以运行项目来测试自动导入功能:${NC}"
  echo -e "cd $EXAMPLE_PROJECT && npm run dev"
fi

print_message "示例运行完成"