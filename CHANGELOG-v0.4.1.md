# @aviala-design/color v0.4.1 更新说明

> 本文档用于帮助 Figma 插件开发者了解 color 库的更新内容，以便同步更新插件功能。

## 📦 版本信息

- **版本**: 0.4.1
- **发布分支**: fixAndNewGen
- **npm 包名**: @aviala-design/color

---

## 🆕 新增功能

### 1. 新增 `generateNeutralColors` 函数

生成浅灰度色阶（neutral-1 到 neutral-6），用于页面背景、卡片、边框等 UI 元素。

```javascript
import { generateNeutralColors } from '@aviala-design/color';

const neutrals = generateNeutralColors('#165DFF');
// 返回:
// {
//   'neutral-1': '#ffffff',   // 页面背景（最浅，接近白色）
//   'neutral-2': '#fafafc',   // 卡片背景、输入框背景
//   'neutral-3': '#f5f5f9',   // hover 状态背景
//   'neutral-4': '#f1f0f6',   // 分割线、表格斑马纹
//   'neutral-5': '#ecebf3',   // 边框颜色
//   'neutral-6': '#e7e6f0'    // 禁用状态背景（最深的浅灰）
// }
```

**参数选项**:
```typescript
interface NeutralColorsOptions {
  steps?: number;           // 色阶数量，默认 6
  minLightness?: number;    // 最深灰的亮度，默认 92
  maxLightness?: number;    // 最浅灰的亮度，默认 100
  blendRatio?: number;      // 主题色混合比例，默认 0.03
  prefix?: string;          // 前缀名，默认 'neutral'
}
```

### 2. `generateInterfaceColorSystem` 返回值新增 `neutrals`

**重要变更**: 返回结构从 3 个字段变为 4 个字段。

```javascript
// v0.4.0 之前
const system = generateInterfaceColorSystem('#165DFF');
// { controls, semantic, theme }

// v0.4.1 之后
const system = generateInterfaceColorSystem('#165DFF');
// { controls, neutrals, semantic, theme }  ← 新增 neutrals
```

**完整返回结构**:
```typescript
interface InterfaceColorSystem {
  controls: Record<string, string>;  // gray-1 到 gray-12（控件色）
  neutrals: Record<string, string>;  // neutral-1 到 neutral-6（浅灰度背景色）← 新增
  semantic: Record<string, string>;  // success/warning/error/info 1-10
  theme: Record<string, string>;     // theme-1 到 theme-10
}
```

**新增配置参数**:
```typescript
// generateInterfaceColorSystem 新增的 options 参数
{
  neutralSteps?: number;         // 浅灰度色阶数量，默认 6
  neutralMinLightness?: number;  // 浅灰度最小亮度，默认 92
  neutralMaxLightness?: number;  // 浅灰度最大亮度，默认 100
  neutralBlendRatio?: number;    // 浅灰度主题色混合比例，默认 0.03
}
```

---

## 🔧 改进功能

### 1. 颜色梯度优化（固定端点亮度）

语义色和主题色默认使用固定端点亮度模式：
- `minLightness: 8` (接近黑色)
- `maxLightness: 97` (接近白色)

**效果**: 
- `-1` 色阶亮度约 97%（接近白色，适合做浅色背景）
- `-10` 色阶亮度约 8%（接近黑色，适合做深色文字）

这使得颜色梯度更符合设计直觉，类似 Ant Design 色板。

---

## 🎨 Figma 插件适配建议

### 需要新增的 UI

1. **浅灰度色阶展示区域**
   - 在主题系统结果中新增 "浅灰度 / Neutrals" 板块
   - 展示 neutral-1 到 neutral-6 的颜色卡片
   - 每个色卡显示：颜色名称、HEX 值、用途说明

2. **用途标签建议**
   | 色阶 | 英文名 | 中文用途 |
   |------|--------|----------|
   | neutral-1 | Page Background | 页面背景 |
   | neutral-2 | Card Background | 卡片背景 |
   | neutral-3 | Hover State | 悬停状态 |
   | neutral-4 | Divider | 分割线 |
   | neutral-5 | Border | 边框 |
   | neutral-6 | Disabled Background | 禁用背景 |

### 需要更新的参数面板

可选：添加浅灰度配置控件
- 色阶数量滑块 (2-12，默认 6)
- 主题色混合比例滑块 (0-10%，默认 3%)

### 需要更新的导出功能

1. **CSS 变量导出** - 新增 neutral 变量:
   ```css
   --neutral-1: #ffffff;
   --neutral-2: #fafafc;
   /* ... */
   ```

2. **Figma Styles 导出** - 新增 Neutral 颜色样式组

3. **JSON 导出** - 确保包含 `neutrals` 字段

---

## 📝 代码示例

### 完整使用示例

```javascript
import { 
  generateInterfaceColorSystem,
  generateNeutralColors 
} from '@aviala-design/color';

// 方式1：使用完整界面色彩系统（推荐）
const system = generateInterfaceColorSystem('#165DFF', {
  // 浅灰度配置
  neutralSteps: 6,
  neutralBlendRatio: 0.03
});

console.log(system.neutrals);
// { 'neutral-1': '#ffffff', 'neutral-2': '#fafafc', ... }

// 方式2：单独生成浅灰度
const neutrals = generateNeutralColors('#165DFF', {
  steps: 8,           // 自定义 8 级
  blendRatio: 0.05    // 更明显的主题色调
});
```

### 在 Figma 插件中的调用

```typescript
// 假设插件中已有的代码结构
const themeColor = figma.currentPage.selection[0].fills[0].color;
const hexColor = rgbToHex(themeColor);

// 生成完整色彩系统
const colorSystem = generateInterfaceColorSystem(hexColor);

// 现在可以访问 neutrals
const { controls, neutrals, semantic, theme } = colorSystem;

// 创建 Figma 颜色样式
Object.entries(neutrals).forEach(([name, hex]) => {
  const style = figma.createPaintStyle();
  style.name = `Neutrals/${name}`;
  style.paints = [{ type: 'SOLID', color: hexToRgb(hex) }];
});
```

---

## ⚠️ 破坏性变更

无破坏性变更。`generateInterfaceColorSystem` 新增的 `neutrals` 字段是向后兼容的，原有的 `controls`、`semantic`、`theme` 字段保持不变。

---

## 🔗 相关文件

- 源码: `src/theme-blend.js` - `generateNeutralColors` 函数
- 文档: `docs/theme-blend.md` - 完整 API 文档
- 示例: `demo/advanced.html` - 在线演示（主题系统标签页）

---

## 📋 检查清单

Figma 插件开发者请确认以下更新：

- [ ] 更新 `@aviala-design/color` 依赖到 0.4.1
- [ ] 在 UI 中新增浅灰度色阶展示区域
- [ ] 更新色彩系统结果解构，处理新的 `neutrals` 字段
- [ ] 更新导出功能，包含 neutral 颜色
- [ ] 可选：添加浅灰度参数配置 UI
- [ ] 测试生成结果是否正确显示 6 个浅灰度色阶
