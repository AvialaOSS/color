#!/usr/bin/env node

/**
 * 自动生成 API 文档
 * 从源代码中的 JSDoc 注释提取信息并生成 Markdown 文档
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');
const DOCS_DIR = path.join(__dirname, '../docs');
const OUTPUT_FILE = path.join(DOCS_DIR, 'api-reference.md');

/**
 * 从源文件中提取 JSDoc 注释和函数签名
 */
function extractJSDocFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const exports = [];
  
  // 匹配导出函数及其 JSDoc
  const exportFunctionPattern = /\/\*\*[\s\S]*?\*\/\s*export\s+(?:async\s+)?function\s+(\w+)\s*\([^)]*\)/g;
  let match;
  
  while ((match = exportFunctionPattern.exec(content)) !== null) {
    const fullMatch = match[0];
    const functionName = match[1];
    
    // 提取 JSDoc 注释
    const jsdocMatch = fullMatch.match(/\/\*\*([\s\S]*?)\*\//);
    if (jsdocMatch) {
      const jsdoc = jsdocMatch[1];
      
      // 解析 JSDoc
      const description = extractDescription(jsdoc);
      const params = extractParams(jsdoc);
      const returns = extractReturns(jsdoc);
      const examples = extractExamples(jsdoc);
      const typedef = extractTypedef(jsdoc);
      
      exports.push({
        name: functionName,
        description,
        params,
        returns,
        examples,
        typedef,
        signature: extractSignature(fullMatch)
      });
    }
  }
  
  // 同时匹配导出常量（如 export const colorList = {...}）
  const exportConstPattern = /\/\*\*[\s\S]*?\*\/\s*export\s+const\s+(\w+)\s*=/g;
  
  while ((match = exportConstPattern.exec(content)) !== null) {
    const fullMatch = match[0];
    const constName = match[1];
    
    // 提取 JSDoc 注释
    const jsdocMatch = fullMatch.match(/\/\*\*([\s\S]*?)\*\//);
    if (jsdocMatch) {
      const jsdoc = jsdocMatch[1];
      
      // 解析 JSDoc
      const description = extractDescription(jsdoc);
      const examples = extractExamples(jsdoc);
      const typedef = extractTypedef(jsdoc);
      
      // 检查 @type 标记
      const typeMatch = jsdoc.match(/@type\s+\{([^}]+)\}/);
      const type = typeMatch ? typeMatch[1] : null;
      
      exports.push({
        name: constName,
        description,
        params: [],  // 常量没有参数
        returns: type ? { type, description: '' } : null,
        examples,
        typedef,
        signature: `const ${constName}`,
        isConst: true
      });
    }
  }
  
  return exports;
}

function extractDescription(jsdoc) {
  const lines = jsdoc.split('\n');
  const descLines = [];
  
  for (const line of lines) {
    const trimmed = line.replace(/^\s*\*\s?/, '').trim();
    if (trimmed && !trimmed.startsWith('@')) {
      descLines.push(trimmed);
    } else if (trimmed.startsWith('@')) {
      break;
    }
  }
  
  return descLines.join(' ');
}

function extractParams(jsdoc) {
  const params = [];
  const paramPattern = /@param\s+\{([^}]+)\}\s+(\[?[\w.]+\]?)\s*-?\s*(.*)/g;
  let match;
  
  while ((match = paramPattern.exec(jsdoc)) !== null) {
    params.push({
      type: match[1],
      name: match[2].replace(/[\[\]]/g, ''),
      optional: match[2].includes('['),
      description: match[3]
    });
  }
  
  return params;
}

function extractReturns(jsdoc) {
  const returnMatch = jsdoc.match(/@returns?\s+\{([^}]+)\}\s*-?\s*(.*)/);
  if (returnMatch) {
    return {
      type: returnMatch[1],
      description: returnMatch[2]
    };
  }
  return null;
}

function extractExamples(jsdoc) {
  const examples = [];
  const lines = jsdoc.split('\n');
  let inExample = false;
  let currentExample = [];
  
  for (const line of lines) {
    const trimmed = line.replace(/^\s*\*\s?/, '');
    
    if (trimmed.startsWith('@example')) {
      inExample = true;
      continue;
    }
    
    if (inExample) {
      if (trimmed.startsWith('@')) {
        if (currentExample.length > 0) {
          examples.push(currentExample.join('\n'));
          currentExample = [];
        }
        inExample = false;
      } else {
        currentExample.push(trimmed);
      }
    }
  }
  
  if (currentExample.length > 0) {
    examples.push(currentExample.join('\n'));
  }
  
  return examples;
}

function extractTypedef(jsdoc) {
  const typedefMatch = jsdoc.match(/@typedef\s+\{([^}]+)\}\s+(\w+)/);
  if (typedefMatch) {
    return {
      type: typedefMatch[1],
      name: typedefMatch[2]
    };
  }
  return null;
}

function extractSignature(fullMatch) {
  const signatureMatch = fullMatch.match(/export\s+(?:async\s+)?function\s+(.*)/);
  return signatureMatch ? signatureMatch[1] : '';
}

/**
 * 生成 Markdown 文档
 */
function generateMarkdown(allExports) {
  let markdown = '# API 参考文档\n\n';
  markdown += '> 🤖 此文档由 `npm run docs:generate` 自动生成，请勿手动编辑\n\n';
  markdown += `> 最后更新时间: ${new Date().toLocaleString('zh-CN')}\n\n`;
  
  // 按文件分组
  const groups = {
    'generate.js': { title: '色板生成', exports: [] },
    'utils.js': { title: '工具函数', exports: [] },
    'linear.js': { title: '线性颜色生成', exports: [] },
    'image-color.js': { title: '图片取色', exports: [] },
    'theme-blend.js': { title: '主题混合 (HCT)', exports: [] },
    'index.js': { title: '入口导出', exports: [] }
  };
  
  for (const [file, data] of Object.entries(allExports)) {
    const basename = path.basename(file);
    if (groups[basename]) {
      groups[basename].exports = data;
    }
  }
  
  // 生成目录
  markdown += '## 目录\n\n';
  for (const [filename, group] of Object.entries(groups)) {
    if (group.exports.length > 0) {
      markdown += `- [${group.title}](#${group.title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')})\n`;
      for (const exp of group.exports) {
        markdown += `  - [\`${exp.name}\`](#${exp.name.toLowerCase()})\n`;
      }
    }
  }
  markdown += '\n---\n\n';
  
  // 生成详细文档
  for (const [filename, group] of Object.entries(groups)) {
    if (group.exports.length === 0) continue;
    
    markdown += `## ${group.title}\n\n`;
    
    for (const exp of group.exports) {
      markdown += `### \`${exp.name}\`\n\n`;
      
      if (exp.description) {
        markdown += `${exp.description}\n\n`;
      }
      
      // 函数签名或常量定义
      markdown += '**签名：**\n```typescript\n';
      if (exp.isConst) {
        // 对于常量，显示类型定义
        markdown += exp.returns ? `const ${exp.name}: ${exp.returns.type}\n` : `const ${exp.name}\n`;
      } else {
        markdown += `function ${exp.signature}\n`;
      }
      markdown += '```\n\n';
      
      // 参数（常量没有参数）
      if (!exp.isConst && exp.params.length > 0) {
        markdown += '**参数：**\n\n';
        for (const param of exp.params) {
          const optional = param.optional ? ' (可选)' : '';
          markdown += `- \`${param.name}\`${optional}: \`${param.type}\``;
          if (param.description) {
            markdown += ` - ${param.description}`;
          }
          markdown += '\n';
        }
        markdown += '\n';
      }
      
      // 返回值
      if (exp.returns) {
        markdown += '**返回值：**\n\n';
        markdown += `- \`${exp.returns.type}\``;
        if (exp.returns.description) {
          markdown += ` - ${exp.returns.description}`;
        }
        markdown += '\n\n';
      }
      
      // 示例
      if (exp.examples.length > 0) {
        markdown += '**示例：**\n\n';
        for (const example of exp.examples) {
          markdown += '```javascript\n';
          markdown += example.trim() + '\n';
          markdown += '```\n\n';
        }
      }
      
      markdown += '---\n\n';
    }
  }
  
  // 添加页脚
  markdown += '\n## 注意事项\n\n';
  markdown += '- 本文档基于源代码中的 JSDoc 注释自动生成\n';
  markdown += '- 如需更新文档，请修改源代码中的 JSDoc 注释后运行 `npm run docs:generate`\n';
  markdown += '- 完整示例和教程请参考 `/docs` 目录下的其他文档\n';
  
  return markdown;
}

/**
 * 主函数
 */
function main() {
  console.log('📚 开始生成 API 文档...\n');
  
  // 读取所有源文件
  const sourceFiles = [
    'generate.js',
    'utils.js',
    'linear.js',
    'image-color.js',
    'theme-blend.js',
    'index.js'
  ];
  
  const allExports = {};
  let totalExports = 0;
  
  for (const file of sourceFiles) {
    const filePath = path.join(SRC_DIR, file);
    if (fs.existsSync(filePath)) {
      console.log(`  📄 解析 ${file}...`);
      const exports = extractJSDocFromFile(filePath);
      allExports[file] = exports;
      totalExports += exports.length;
      console.log(`     ✓ 找到 ${exports.length} 个导出函数`);
    }
  }
  
  console.log(`\n✨ 共提取 ${totalExports} 个导出函数\n`);
  
  // 生成 Markdown
  console.log('📝 生成 Markdown 文档...');
  const markdown = generateMarkdown(allExports);
  
  // 写入文件
  fs.writeFileSync(OUTPUT_FILE, markdown, 'utf-8');
  console.log(`✅ 文档已生成: ${OUTPUT_FILE}\n`);
  
  // 统计信息
  const stats = {
    totalFunctions: totalExports,
    totalLines: markdown.split('\n').length,
    fileSize: (Buffer.byteLength(markdown, 'utf-8') / 1024).toFixed(2) + ' KB'
  };
  
  console.log('📊 统计信息:');
  console.log(`   - 函数总数: ${stats.totalFunctions}`);
  console.log(`   - 文档行数: ${stats.totalLines}`);
  console.log(`   - 文件大小: ${stats.fileSize}`);
  console.log('\n✨ 完成!\n');
}

main();
