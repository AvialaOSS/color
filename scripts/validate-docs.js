#!/usr/bin/env node

/**
 * 验证文档与代码的同步性
 * 检查文档中提到的 API 是否与源代码中的导出一致
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');
const DOCS_DIR = path.join(__dirname, '../docs');
const API_DOC = path.join(DOCS_DIR, 'api-reference.md');

// ANSI 颜色代码
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * 从源代码提取所有导出的函数名
 */
function extractExportedFunctions(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const functions = [];
  
  // 匹配 export function
  const exportFunctionPattern = /export\s+(?:async\s+)?function\s+(\w+)/g;
  let match;
  
  while ((match = exportFunctionPattern.exec(content)) !== null) {
    functions.push(match[1]);
  }
  
  // 匹配 export const
  const exportConstPattern = /export\s+const\s+(\w+)/g;
  while ((match = exportConstPattern.exec(content)) !== null) {
    functions.push(match[1]);
  }
  
  // 匹配 export { ... }
  const exportListPattern = /export\s+\{([^}]+)\}/g;
  while ((match = exportListPattern.exec(content)) !== null) {
    const exports = match[1].split(',').map(e => e.trim().split(/\s+as\s+/)[0]);
    functions.push(...exports);
  }
  
  return [...new Set(functions)]; // 去重
}

/**
 * 从文档中提取提到的函数名
 */
function extractDocumentedFunctions(docPath) {
  if (!fs.existsSync(docPath)) {
    return [];
  }
  
  const content = fs.readFileSync(docPath, 'utf-8');
  const functions = [];
  
  // 匹配 ### `functionName`
  const headerPattern = /###\s+`(\w+)`/g;
  let match;
  
  while ((match = headerPattern.exec(content)) !== null) {
    functions.push(match[1]);
  }
  
  return [...new Set(functions)];
}

/**
 * 检查 JSDoc 注释的完整性
 */
function checkJSDocCompleteness(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];
  
  // 查找所有导出函数
  const exportPattern = /export\s+(?:async\s+)?function\s+(\w+)\s*\(([^)]*)\)/g;
  let match;
  
  while ((match = exportPattern.exec(content)) !== null) {
    const functionName = match[1];
    const params = match[2];
    const startPos = match.index;
    
    // 向前查找 JSDoc
    const beforeFunc = content.substring(Math.max(0, startPos - 1000), startPos);
    const jsdocMatch = beforeFunc.match(/\/\*\*([\s\S]*?)\*\/\s*$/);
    
    if (!jsdocMatch) {
      issues.push({
        function: functionName,
        issue: '缺少 JSDoc 注释',
        severity: 'error'
      });
      continue;
    }
    
    const jsdoc = jsdocMatch[1];
    
    // 检查是否有描述
    const hasDescription = /^\s*\*\s+[^@\s]/m.test(jsdoc);
    if (!hasDescription) {
      issues.push({
        function: functionName,
        issue: '缺少函数描述',
        severity: 'warning'
      });
    }
    
    // 检查参数文档
    if (params.trim()) {
      const paramNames = params.split(',').map(p => {
        const match = p.trim().match(/^\s*(\w+)/);
        return match ? match[1] : null;
      }).filter(Boolean);
      
      const documentedParams = (jsdoc.match(/@param/g) || []).length;
      
      if (documentedParams < paramNames.length) {
        issues.push({
          function: functionName,
          issue: `参数文档不完整 (有 ${paramNames.length} 个参数，但只文档化了 ${documentedParams} 个)`,
          severity: 'warning'
        });
      }
    }
    
    // 检查返回值文档
    if (!/@returns?/.test(jsdoc)) {
      issues.push({
        function: functionName,
        issue: '缺少 @returns 文档',
        severity: 'warning'
      });
    }
    
    // 检查示例
    if (!/@example/.test(jsdoc)) {
      issues.push({
        function: functionName,
        issue: '缺少使用示例 (@example)',
        severity: 'info'
      });
    }
  }
  
  return issues;
}

/**
 * 主验证函数
 */
function main() {
  console.log(`${colors.cyan}📋 开始验证文档同步性...${colors.reset}\n`);
  
  let hasErrors = false;
  let totalWarnings = 0;
  let totalInfo = 0;
  
  // 1. 检查导出的函数是否都有文档
  console.log(`${colors.blue}1️⃣  检查 API 文档覆盖率${colors.reset}\n`);
  
  const sourceFiles = ['generate.js', 'utils.js', 'linear.js', 'image-color.js', 'theme-blend.js', 'index.js'];
  const allExportedFunctions = new Set();
  
  for (const file of sourceFiles) {
    const filePath = path.join(SRC_DIR, file);
    if (fs.existsSync(filePath)) {
      const functions = extractExportedFunctions(filePath);
      functions.forEach(f => allExportedFunctions.add(f));
    }
  }
  
  const documentedFunctions = new Set(extractDocumentedFunctions(API_DOC));
  
  console.log(`   源代码中的导出函数: ${allExportedFunctions.size}`);
  console.log(`   文档中记录的函数: ${documentedFunctions.size}\n`);
  
  // 检查缺失的文档
  const missingDocs = [...allExportedFunctions].filter(f => !documentedFunctions.has(f));
  if (missingDocs.length > 0) {
    console.log(`   ${colors.red}❌ 以下函数缺少文档:${colors.reset}`);
    missingDocs.forEach(f => console.log(`      - ${f}`));
    console.log('');
    hasErrors = true;
  } else {
    console.log(`   ${colors.green}✅ 所有导出函数都有文档${colors.reset}\n`);
  }
  
  // 检查过时的文档
  const obsoleteDocs = [...documentedFunctions].filter(f => !allExportedFunctions.has(f));
  if (obsoleteDocs.length > 0) {
    console.log(`   ${colors.yellow}⚠️  以下文档可能已过时 (函数不存在):${colors.reset}`);
    obsoleteDocs.forEach(f => console.log(`      - ${f}`));
    console.log('');
    totalWarnings += obsoleteDocs.length;
  }
  
  // 2. 检查 JSDoc 注释的完整性
  console.log(`${colors.blue}2️⃣  检查 JSDoc 注释质量${colors.reset}\n`);
  
  let totalIssues = 0;
  
  for (const file of sourceFiles) {
    const filePath = path.join(SRC_DIR, file);
    if (!fs.existsSync(filePath)) continue;
    
    const issues = checkJSDocCompleteness(filePath);
    
    if (issues.length > 0) {
      console.log(`   ${colors.yellow}📄 ${file}${colors.reset}`);
      
      issues.forEach(issue => {
        const icon = issue.severity === 'error' ? '❌' : 
                     issue.severity === 'warning' ? '⚠️' : 'ℹ️';
        const color = issue.severity === 'error' ? colors.red :
                      issue.severity === 'warning' ? colors.yellow : colors.cyan;
        
        console.log(`      ${icon} ${color}${issue.function}${colors.reset}: ${issue.issue}`);
        
        if (issue.severity === 'error') hasErrors = true;
        if (issue.severity === 'warning') totalWarnings++;
        if (issue.severity === 'info') totalInfo++;
      });
      
      console.log('');
      totalIssues += issues.length;
    }
  }
  
  if (totalIssues === 0) {
    console.log(`   ${colors.green}✅ 所有 JSDoc 注释都完整${colors.reset}\n`);
  }
  
  // 3. 检查文档是否是最新的
  console.log(`${colors.blue}3️⃣  检查文档更新时间${colors.reset}\n`);
  
  if (fs.existsSync(API_DOC)) {
    const docContent = fs.readFileSync(API_DOC, 'utf-8');
    const isAutoGenerated = docContent.includes('🤖 此文档由') || docContent.includes('自动生成');
    
    if (!isAutoGenerated) {
      console.log(`   ${colors.yellow}⚠️  API 文档可能需要重新生成${colors.reset}`);
      console.log(`   ${colors.cyan}   提示: 运行 'npm run docs:generate' 生成最新文档${colors.reset}\n`);
      totalWarnings++;
    } else {
      const docStats = fs.statSync(API_DOC);
      const srcStats = sourceFiles.map(f => {
        const fp = path.join(SRC_DIR, f);
        return fs.existsSync(fp) ? fs.statSync(fp).mtimeMs : 0;
      });
      
      const newestSrc = Math.max(...srcStats);
      
      if (newestSrc > docStats.mtimeMs) {
        console.log(`   ${colors.yellow}⚠️  源代码比文档更新${colors.reset}`);
        console.log(`   ${colors.cyan}   提示: 运行 'npm run docs:generate' 更新文档${colors.reset}\n`);
        totalWarnings++;
      } else {
        console.log(`   ${colors.green}✅ 文档是最新的${colors.reset}\n`);
      }
    }
  } else {
    console.log(`   ${colors.red}❌ API 文档不存在${colors.reset}`);
    console.log(`   ${colors.cyan}   运行 'npm run docs:generate' 生成文档${colors.reset}\n`);
    hasErrors = true;
  }
  
  // 总结
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  console.log(`${colors.cyan}📊 验证总结${colors.reset}\n`);
  
  if (hasErrors) {
    console.log(`   ${colors.red}❌ 发现严重问题，需要修复${colors.reset}`);
  } else if (totalWarnings > 0) {
    console.log(`   ${colors.yellow}⚠️  发现 ${totalWarnings} 个警告${colors.reset}`);
  } else {
    console.log(`   ${colors.green}✅ 文档与代码完全同步！${colors.reset}`);
  }
  
  if (totalInfo > 0) {
    console.log(`   ${colors.cyan}ℹ️  ${totalInfo} 条建议${colors.reset}`);
  }
  
  console.log('');
  
  // 返回退出码
  process.exit(hasErrors ? 1 : 0);
}

main();
