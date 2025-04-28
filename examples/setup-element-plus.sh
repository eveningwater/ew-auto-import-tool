#!/bin/bash

# 安装依赖
echo "正在安装项目依赖..."
npm install

# 使用auto-import-tool配置Element Plus按需导入
echo "正在配置Element Plus按需导入..."
node ../dist/cli.js --library element-plus

# 启动开发服务器
echo "配置完成，正在启动开发服务器..."
npm run dev