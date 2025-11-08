# Aviala Design Color 文档

欢迎来到 Aviala Design Color 的完整文档！这里包含了使用本库所需的所有信息。

## 📚 文档结构

### 🚀 [快速开始](./getting-started.md)
新用户必读！包含安装指南、基础用法和5分钟快速体验，帮助您快速上手。

### 📖 [API 参考](./api-reference.md)
完整的 API 文档，包含所有函数的详细说明、参数、返回值和使用示例。

> 🤖 **注意**: API 参考文档由源代码自动生成，始终与代码保持同步。

### 🛠️ [文档维护](./CONTRIBUTING.md)
了解文档的维护流程、自动化工具和贡献指南。

### ⚡ [快速参考](./QUICK-REFERENCE.md)
文档工具的快速参考卡片，包含常用命令和工作流。

### 🎨 [色盘生成](./palette-generate.md)
深入了解色盘生成算法，学习如何创建和谐的颜色系统。

### 🌈 [线性颜色生成](./linear-generate.md)
掌握渐变色和线性插值技术，创建平滑的颜色过渡效果。

### 🖼️ [图片取色](./image-color.md)
学习从图片中提取主色调，用于生成匹配的调色板或主题色。

### 🎭 [主题混合](./theme-blend.md)
**新功能！** 基于 Material Design 3 的 HCT 色彩空间，提供强大的颜色调和与混合能力。

### ⭐ [最佳实践](./best-practices.md)
专业的颜色系统设计指南，包含可访问性、性能优化、主题设计等最佳实践。

## 🎯 按使用场景选择文档

### 🆕 初次使用
1. [快速开始](./getting-started.md) - 了解基础概念
2. [色盘生成](./palette-generate.md) - 学习核心功能
3. [最佳实践](./best-practices.md) - 掌握专业技巧

### 🔧 开发集成
1. [API 参考](./api-reference.md) - 查找具体函数
2. [最佳实践](./best-practices.md) - 了解架构设计
3. [主题混合](./theme-blend.md) - 实现高级功能

### 🎨 设计系统
1. [主题混合](./theme-blend.md) - 创建品牌色系统
2. [色盘生成](./palette-generate.md) - 构建颜色层次
3. [最佳实践](./best-practices.md) - 确保可访问性

### 📊 数据可视化
1. [线性颜色生成](./linear-generate.md) - 创建数据映射
2. [最佳实践](./best-practices.md) - 图表配色方案
3. [色盘生成](./palette-generate.md) - 分类数据配色

### 🖼️ 图片处理
1. [图片取色](./image-color.md) - 提取图片颜色
2. [主题混合](./theme-blend.md) - 生成匹配主题
3. [色盘生成](./palette-generate.md) - 扩展颜色方案

## 🆕 最新功能

### 主题混合 (Theme Blend)
- **HCT 色彩空间**：基于人眼感知的科学色彩模型
- **颜色调和**：让不同颜色保持视觉和谐
- **主题变体**：自动生成明度变体
- **语义色混合**：为状态色添加品牌色调
- **完整色板**：一键生成品牌主题系统

## 🔗 相关链接

- [在线演示](../index.html) - 体验所有功能
- [GitHub 仓库](https://github.com/aviala-design/color) - 源码和问题反馈
- [NPM 包](https://www.npmjs.com/package/@aviala-design/color) - 安装和版本信息

## 💡 使用建议

1. **从快速开始文档开始**，了解基本概念和用法
2. **根据具体需求**选择相应的功能文档深入学习
3. **参考最佳实践**确保代码质量和用户体验
4. **查阅 API 参考**获取详细的技术信息
5. **尝试在线演示**直观体验各种功能效果

## 📝 文档贡献

### 📚 文档类型

本项目的文档分为两类：

1. **自动生成的文档** 🤖
   - `api-reference.md` - 从源代码 JSDoc 自动生成
   - **请勿手动编辑**，运行 `npm run docs:generate` 更新

2. **手动维护的文档** ✏️
   - 所有其他 .md 文件
   - 欢迎直接编辑和改进

### 🔧 更新文档

如果您修改了源代码：

```bash
# 更新 API 文档
npm run docs:generate

# 验证文档同步
npm run docs:validate
```

详细信息请参阅 [文档维护指南](./CONTRIBUTING.md)。

### 💬 反馈和建议

如果您发现文档中的错误或有改进建议，欢迎：

1. 在 [GitHub Issues](https://github.com/aviala-design/color/issues) 中反馈
2. 提交 Pull Request 改进文档
3. 分享您的使用经验和最佳实践

感谢您使用 Aviala Design Color！🎨