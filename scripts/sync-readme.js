#!/usr/bin/env node

/**
 * 同步 package.json 信息到 README
 * 确保版本号、描述等信息在 README 中保持最新
 */

const fs = require('fs');
const path = require('path');

const PKG_PATH = path.join(__dirname, '../package.json');
const README_PATH = path.join(__dirname, '../README.md');

function main() {
  console.log('🔄 同步 package.json 信息到 README...\n');
  
  // 读取 package.json
  const pkg = JSON.parse(fs.readFileSync(PKG_PATH, 'utf-8'));
  
  // 读取 README
  let readme = fs.readFileSync(README_PATH, 'utf-8');
  
  // 更新版本号 badge
  const versionBadge = `![npm version](https://img.shields.io/npm/v/${pkg.name})`;
  readme = readme.replace(
    /!\[npm version\]\(https:\/\/img\.shields\.io\/npm\/v\/@aviala-design\/color\)/,
    versionBadge
  );
  
  // 如果没有版本 badge，添加到标题后
  if (!readme.includes('![npm version]')) {
    readme = readme.replace(
      /^(# .*)\n/m,
      `$1\n\n${versionBadge} ![npm downloads](https://img.shields.io/npm/dm/${pkg.name}) ![license](https://img.shields.io/npm/l/${pkg.name})\n`
    );
  }
  
  // 更新安装命令中的包名
  readme = readme.replace(
    /npm i @aviala-design\/color/g,
    `npm i ${pkg.name}`
  );
  
  // 添加版本信息注释
  const versionComment = `<!-- 当前版本: ${pkg.version} | 最后同步: ${new Date().toLocaleString('zh-CN')} -->`;
  if (!readme.includes('<!-- 当前版本:')) {
    readme = versionComment + '\n' + readme;
  } else {
    readme = readme.replace(/<!-- 当前版本:.*?-->/, versionComment);
  }
  
  // 写回 README
  fs.writeFileSync(README_PATH, readme, 'utf-8');
  
  console.log(`✅ README 已更新`);
  console.log(`   版本: ${pkg.version}`);
  console.log(`   包名: ${pkg.name}\n`);
}

main();
