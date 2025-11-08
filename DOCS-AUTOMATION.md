# 📚 文档自动化系统

## 概述

本项目实施了完整的文档自动化解决方案，确保文档始终与代码同步。

## 🎯 解决的问题

- ✅ API 文档自动生成，无需手动维护
- ✅ 提交前自动验证文档同步性
- ✅ CI/CD 自动检查和提醒
- ✅ 强制开发者编写完整的 JSDoc 注释

## 🚀 快速开始

### 生成文档

```bash
npm run docs:generate
```

从源代码的 JSDoc 注释自动生成 `docs/api-reference.md`

### 验证文档

```bash
npm run docs:validate
```

检查：
- 所有导出函数是否都有文档
- JSDoc 注释是否完整
- 文档是否是最新的

### 更新全部

```bash
npm run docs:all
```

生成文档 + 同步 README 信息

## 📋 工作流程

### 1. 开发新功能

```bash
# 编写代码 + JSDoc 注释
vim src/myFeature.js

# 生成文档
npm run docs:generate

# 验证
npm run docs:validate

# 提交（自动触发 pre-commit hook）
git commit -m "feat: add myFeature"
```

### 2. Pull Request

- GitHub Actions 自动运行验证
- 如果文档需要更新，Bot 会在 PR 中评论
- 开发者更新后重新提交

### 3. 发布

```bash
# prepublishOnly 自动执行:
# - npm run build
# - npm run docs:all
npm publish
```

## 🛠️ 工具说明

### scripts/generate-docs.js

**功能**: 从 JSDoc 生成 Markdown 文档

**特性**:
- 解析所有导出函数
- 提取参数、返回值、示例
- 生成格式统一的文档
- 添加目录和导航

**输出**: `docs/api-reference.md`

### scripts/validate-docs.js

**功能**: 验证文档同步性

**检查项**:
1. 文档覆盖率（所有函数都有文档）
2. JSDoc 质量（参数、返回值、示例）
3. 文档时效性（是否需要更新）

**退出码**:
- 0: 验证通过
- 1: 发现错误

### scripts/sync-readme.js

**功能**: 同步 package.json 信息到 README

**同步内容**:
- 版本号
- npm badge
- 包名

## 🔍 自动化检查

### Git Hooks

- **Pre-commit**: 提交前验证文档
- 位置: `.husky/pre-commit`
- 失败时阻止提交

### GitHub Actions

- **Workflow**: `.github/workflows/docs-sync.yml`
- **触发**: PR 和 push 到 main/bugfix
- **操作**:
  - 验证文档同步
  - 检测需要更新时评论 PR

## ✍️ JSDoc 最佳实践

### 完整示例

```javascript
/**
 * 函数的简短描述
 * 
 * 可选的详细说明，可以有多段
 * 
 * @param {string} param1 - 参数说明
 * @param {{key?: string}} [options] - 可选配置对象
 * @returns {string} 返回值说明
 * 
 * @example
 * // 基础用法
 * myFunction('value')
 * 
 * @example
 * // 高级用法
 * myFunction('value', { key: 'option' })
 */
export function myFunction(param1, options = {}) {
  // ...
}
```

### 必需元素

- ✅ 函数描述
- ✅ `@param` 文档（所有参数）
- ✅ `@returns` 文档
- ✅ `@example` 示例（至少一个）

### 可选元素

- `@typedef` - 自定义类型
- `@throws` - 异常说明
- `@see` - 相关链接
- `@deprecated` - 废弃标记

## 📊 文档类型

### 🤖 自动生成

- `docs/api-reference.md`
- **不要手动编辑**
- 由 JSDoc 生成

### ✏️ 手动维护

- `README.md`
- `docs/getting-started.md`
- `docs/best-practices.md`
- 等其他教程文档

## 🔧 故障排查

### 验证失败

```
❌ 以下函数缺少文档: myFunction
```

**解决**: 在源代码中添加 JSDoc，然后运行 `npm run docs:generate`

### JSDoc 不完整

```
⚠️ myFunction: 缺少使用示例 (@example)
```

**解决**: 在 JSDoc 中添加 `@example` 标签

### 文档过时

```
⚠️ 源代码比文档更新
```

**解决**: 运行 `npm run docs:generate`

### 跳过验证

```bash
# 紧急情况下（不推荐）
git commit --no-verify
```

## 📚 相关文档

- [文档维护指南](./docs/CONTRIBUTING.md) - 详细的贡献指南
- [快速参考](./docs/QUICK-REFERENCE.md) - 命令速查表
- [完整解决方案](./docs/DOCS-SYNC-SOLUTION.md) - 技术方案说明

## 💡 提示

1. **始终编写 JSDoc**: 这是文档的唯一来源
2. **提供示例**: 示例比文字说明更有价值
3. **描述清晰**: 使用简洁明了的语言
4. **验证后提交**: 确保文档与代码同步

## 🎉 优势

- ✅ 文档永远不会过时
- ✅ 强制代码文档化
- ✅ 降低维护成本
- ✅ 提高代码质量
- ✅ 改善开发体验

---

需要帮助？查看 [完整文档](./docs/README.md) 或提交 [Issue](https://github.com/AvialaOSS/color/issues)。
