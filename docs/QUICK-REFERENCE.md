# 📚 文档工具快速参考

## 常用命令

```bash
# 生成 API 文档（从 JSDoc）
npm run docs:generate

# 验证文档同步
npm run docs:validate

# 同步 README 信息
npm run docs:sync-readme

# 一键更新所有
npm run docs:all

# 类型检查
npm run type-check
```

## 工作流速查

### ✅ 添加新功能

```bash
# 1. 编写代码 + JSDoc
# 2. 生成文档
npm run docs:generate
# 3. 验证
npm run docs:validate
# 4. 提交
git commit -m "feat: ..."
```

### ✅ 修复 Bug

```bash
# 1. 修复代码
# 2. 更新 JSDoc（如有 API 变更）
# 3. 重新生成文档
npm run docs:generate
# 4. 提交
git commit -m "fix: ..."
```

### ✅ 发布版本

```bash
# prepublishOnly 会自动:
# - 构建代码
# - 生成文档
# - 同步 README
npm publish
```

## JSDoc 模板

### 基础函数

```javascript
/**
 * 函数简短描述
 * 
 * @param {string} param1 - 参数说明
 * @param {Object} [options] - 可选配置
 * @returns {string} 返回值说明
 * 
 * @example
 * functionName('value')
 */
```

### 带类型定义

```javascript
/**
 * @typedef {Object} Options
 * @property {number} [value] - 说明
 */

/**
 * 函数说明
 * 
 * @param {Options} options
 * @returns {string}
 */
```

### 复杂示例

```javascript
/**
 * 函数说明
 * 
 * @param {string} color - 颜色
 * @param {{index?: number, dark?: boolean}} [options]
 * @returns {string | string[]}
 * 
 * @example
 * // 基础用法
 * fn('#FF0000')
 * 
 * @example
 * // 高级用法
 * fn('#FF0000', { index: 1 })
 */
```

## 验证失败怎么办？

### ❌ 缺少文档

```
❌ 以下函数缺少文档: myFunction
```

**解决**: 
1. 在源代码中添加 JSDoc
2. 运行 `npm run docs:generate`

### ⚠️ JSDoc 不完整

```
⚠️ myFunction: 缺少使用示例 (@example)
```

**解决**: 在 JSDoc 中添加 `@example`

### ⚠️ 文档过时

```
⚠️ 源代码比文档更新
```

**解决**: 运行 `npm run docs:generate`

## 跳过验证（不推荐）

```bash
# 紧急情况下
git commit --no-verify
```

⚠️ **注意**: 这会跳过所有 Git hooks，包括文档验证

## 文件位置

```
📁 scripts/
  ├── generate-docs.js     # 生成工具
  ├── validate-docs.js     # 验证工具
  └── sync-readme.js       # README 同步

📁 docs/
  ├── api-reference.md     # 🤖 自动生成
  ├── CONTRIBUTING.md      # 维护指南
  └── *.md                 # ✏️ 手动维护

📁 .github/workflows/
  └── docs-sync.yml        # CI/CD 检查

📁 .husky/
  └── pre-commit           # Git 钩子
```

## 颜色含义

- 🔴 **红色 ❌**: 严重错误，必须修复
- 🟡 **黄色 ⚠️**: 警告，建议修复
- 🔵 **蓝色 ℹ️**: 信息，可选改进
- 🟢 **绿色 ✅**: 通过，无问题

## 获取帮助

- 📖 完整指南: `docs/CONTRIBUTING.md`
- 📝 解决方案: `docs/DOCS-SYNC-SOLUTION.md`
- 🐛 问题反馈: GitHub Issues
