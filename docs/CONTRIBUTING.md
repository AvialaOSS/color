# 文档维护指南

## 📚 文档结构

本项目使用自动化工具保持文档与代码同步。文档分为两类：

### 1. 自动生成的文档

- **`docs/api-reference.md`** - API 参考文档（**请勿手动编辑**）
  - 从源代码的 JSDoc 注释自动生成
  - 运行 `npm run docs:generate` 更新

### 2. 手动维护的文档

- `README.md` - 项目介绍和快速开始
- `docs/getting-started.md` - 入门指南
- `docs/best-practices.md` - 最佳实践
- `docs/palette-generate.md` - 色板生成指南
- `docs/linear-generate.md` - 线性颜色生成指南
- `docs/image-color.md` - 图片取色指南
- `docs/theme-blend.md` - 主题混合指南

## 🔄 更新流程

### 更新 API 文档

当你修改了源代码并更新了 JSDoc 注释后：

```bash
# 1. 生成最新的 API 文档
npm run docs:generate

# 2. 验证文档同步
npm run docs:validate

# 3. 提交更改
git add docs/api-reference.md
git commit -m "docs: update API reference"
```

### 编写高质量的 JSDoc

为了生成完整的文档，请确保 JSDoc 包含：

```javascript
/**
 * 函数的简短描述
 * 
 * 可以有更详细的说明，支持多行
 * 
 * @param {string} color - 参数说明
 * @param {Object} options - 配置选项
 * @param {number} [options.index=6] - 可选参数
 * @returns {string} 返回值说明
 * 
 * @example
 * // 基础用法
 * generate('#FF0000')
 * 
 * @example
 * // 高级用法
 * generate('#FF0000', { list: true, dark: true })
 */
export function generate(color, options = {}) {
  // ...
}
```

## 🤖 自动化检查

### Pre-commit Hook

提交代码前会自动验证文档：

```bash
git commit -m "feat: add new feature"
# 自动运行: npm run docs:validate
```

如果验证失败，提交会被阻止。你需要：
1. 运行 `npm run docs:generate` 更新文档
2. 或完善 JSDoc 注释
3. 或使用 `git commit --no-verify` 跳过（不推荐）

### GitHub Actions

每个 Pull Request 都会自动：
- 验证文档是否与代码同步
- 检查 JSDoc 注释的完整性
- 如果需要更新文档，会在 PR 中添加提醒评论

## ✅ 文档检查清单

在发布新版本前，请确认：

- [ ] 所有导出的函数都有 JSDoc 注释
- [ ] JSDoc 包含完整的参数说明
- [ ] JSDoc 包含返回值说明
- [ ] 提供了使用示例 (@example)
- [ ] 运行 `npm run docs:generate` 生成最新文档
- [ ] 运行 `npm run docs:validate` 验证通过
- [ ] 更新了 CHANGELOG.md（如果适用）

## 🛠️ 可用命令

```bash
# 生成 API 文档
npm run docs:generate

# 验证文档同步
npm run docs:validate

# 同步 README 信息
npm run docs:sync-readme

# 类型检查（确保 JSDoc 正确）
npm run type-check
```

## 📝 文档编写建议

### 1. 保持简洁明了

- 使用简短的句子
- 避免行话，使用通俗易懂的语言
- 提供具体的示例

### 2. 示例优先

- 每个函数至少提供一个基础示例
- 复杂功能提供多个示例展示不同用法
- 示例代码要能直接运行

### 3. 及时更新

- 修改 API 时同步更新 JSDoc
- 新增功能及时补充文档
- 废弃功能标注 @deprecated

### 4. 关注用户体验

- 从用户角度思考
- 提供常见问题解答
- 说明参数的默认值和范围

## 🔗 相关资源

- [JSDoc 官方文档](https://jsdoc.app/)
- [TypeScript JSDoc 参考](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [如何编写优秀的技术文档](https://www.writethedocs.org/guide/)

## ❓ 常见问题

### Q: 为什么 API 文档不能手动编辑？

A: 为了保证文档与代码的一致性，API 文档完全从源代码生成。手动编辑会在下次生成时被覆盖。

### Q: 如何添加自定义内容到 API 文档？

A: 将内容添加到源代码的 JSDoc 注释中，然后重新生成文档。

### Q: 文档验证失败怎么办？

A: 运行 `npm run docs:validate` 查看详细错误信息，然后按提示修复。

### Q: 可以跳过文档验证吗？

A: 不推荐。但在紧急情况下可以使用 `git commit --no-verify`。

## 📧 反馈

如果你有文档改进建议，欢迎：
- 提交 Issue
- 发起 Pull Request
- 联系维护团队
