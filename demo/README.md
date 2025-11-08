# Demo 演示

## 📁 文件说明

### `index.html` - 基础演示
原始的色卡生成工具，展示基本功能：
- 预设颜色色板展示
- 自定义颜色生成
- 图片主色调提取

**访问**: `http://localhost:5173/demo/index.html`

---

### `advanced.html` - 高级功能演示 ⭐ 推荐
**全新的完整功能演示页面**，展示了 `@aviala-design/color` 的所有核心功能：

#### 🎨 色板生成
- 支持浅色/深色/双模式
- 多种输出格式（HEX、RGB、HSL）
- 实时预览和一键复制

#### 🌈 线性渐变
- **RGB 渐变**: 在 RGB 颜色空间中插值
- **HSL 渐变**: 在 HSL 颜色空间中插值，更自然的色彩过渡
- **灰度渐变**: 生成从白到黑的灰度色阶
- **单色调渐变**: 基于单一颜色生成从浅到深的渐变

#### 🎭 主题混合 (HCT 色彩空间)
- **完整主题系统**: 自动生成主题色、控件色、语义色
- **颜色混合**: 在 HCT 空间混合两种颜色，可调节混合比例
- **颜色调和**: 让目标颜色向主题色靠拢，保持色彩和谐

#### 🖼️ 图片取色
- 从上传的图片中自动提取主色调
- 基于提取的颜色自动生成完整色板
- 支持拖拽上传

#### 🎪 预设色板
- 13 种精心设计的预设颜色
- 每种颜色包含完整的浅色和深色色板
- 快速预览和复制

**访问**: `http://localhost:5173/demo/advanced.html`

---

## 🚀 快速开始

### 启动开发服务器
```bash
npm run dev
```

服务器将自动打开 `advanced.html` 页面。

### 访问其他演示
- 基础演示: http://localhost:5173/demo/index.html
- 高级演示: http://localhost:5173/demo/advanced.html

---

## ✨ 功能亮点

### 1. 响应式设计
- 完美适配桌面端和移动端
- 流畅的动画和交互效果

### 2. 直观的 UI
- Tab 标签页组织，清晰的功能分类
- 实时预览，所见即所得
- 一键复制颜色值

### 3. 完整的错误处理
- 友好的错误提示
- 输入验证
- 异常处理

### 4. 实用的功能
- 滑块调节参数
- 多种格式输出
- 颜色值快速复制

---

## 🎯 使用场景

### 设计师
- 快速生成品牌色色板
- 探索颜色搭配方案
- 从图片提取配色灵感

### 开发者
- 了解 API 使用方法
- 测试不同参数效果
- 集成参考示例

### 产品经理
- 直观展示颜色系统能力
- 快速验证设计方案
- 与团队协作讨论

---

## 📚 相关文档

- [API 文档](../docs/api-reference.md)
- [快速开始](../docs/getting-started.md)
- [最佳实践](../docs/best-practices.md)

---

## 🔧 技术栈

- **原生 JavaScript ES6+**: 无框架依赖
- **CSS Grid & Flexbox**: 现代化布局
- **ES Modules**: 模块化导入
- **Vite**: 开发服务器

---

## 💡 贡献

欢迎提交 Issue 和 Pull Request 来改进 Demo！

如果你有好的想法或发现了问题，请通过以下方式联系我们：
- [GitHub Issues](https://github.com/avialaOSS/color/issues)
- [GitHub Discussions](https://github.com/avialaOSS/color/discussions)
