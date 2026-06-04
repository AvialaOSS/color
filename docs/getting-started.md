# 快速入门指南

欢迎使用 Aviala Design Color！本指南将帮助您快速上手使用这个强大的颜色工具库。

## 安装

### NPM 安装
```bash
npm install @aviala-design/color
```

### Yarn 安装
```bash
yarn add @aviala-design/color
```

### 浏览器直接使用（ESM）
```html
<script type="module">
  import { palette, neutral } from "https://unpkg.com/@aviala-design/color@latest/dist/index.mjs";
  console.log(palette.generate("#165DFF", { list: true }));
  console.log(neutral.generate("#ffffff", "#000000", { steps: 12 }));
</script>
```

## 基础使用

### ES6 模块导入
```javascript
import { palette, neutral } from '@aviala-design/color';
```

### CommonJS 导入
```javascript
const { palette } = require('@aviala-design/color');
```

浏览器场景建议直接使用 ESM（见上方示例）。

## 5分钟快速体验

### 1. 生成基础色盘

最简单的用法是基于一个颜色生成完整的色盘：

```javascript
import { palette, neutral } from '@aviala-design/color';

// 生成蓝色系色盘（支持 steps / curveGamma）
const bluePalette = palette.generate('#165DFF', { list: true, steps: 12, curveGamma: 1.1 });
console.log(bluePalette);
// 输出: [
//   '#E8F3FF', '#BEDAFF', '#94BFFF', '#6AA1FF', '#4080FF',
//   '#165DFF', '#0E42D2', '#0A2BA5', '#061A78', '#030D4B'
// ]

// 生成暗色模式色盘
const darkBluePalette = palette.generate('#165DFF', { list: true, dark: true });
console.log(darkBluePalette);
```

### 2. 使用预设颜色

预设色（Presets）已移除。建议在你的项目中维护自己的颜色常量，并按需生成色板：

### 3. 灰阶色阶（Neutral）

本版本提供中性色阶能力（默认灰阶，也支持 tinted neutrals），用于背景/文本/边框等中性色体系：

```js
import { neutral } from '@aviala-design/color';

const neutralLight = neutral.generate('#ffffff', '#000000', { steps: 12, curveGamma: 1.2 });
const neutralDark = neutral.generate('#000000', '#ffffff', { steps: 12, curveGamma: 1.2 });

const tintedNeutral = neutral.generate('#ffffff', '#000000', { steps: 12, curveGamma: 1.2, mixColor: '#165DFF', mixRatio: 0.2 });
```

通用渐变/插值（Gradient）已移除。可参考 [迁移指南](./migration.md) 选择替代方案。

### 4. 从图片提取颜色

图片取色（Image）已移除。可参考 [迁移指南](./migration.md) 选择替代方案。

### 5. 主题混合与品牌定制

主题混合/界面色彩系统（Theme）已移除。可参考 [迁移指南](./migration.md) 选择替代方案。

## 常见使用场景

### 场景1：设计系统色盘

为设计系统创建一致的颜色规范：

```javascript
import { palette } from '@aviala-design/color';

// 定义品牌主色
const brandColor = '#165DFF';

// 生成完整的设计系统色盘
const designSystem = {
  // 品牌色系
  primary: {
    light: palette.generate(brandColor, { list: true }),
    dark: palette.generate(brandColor, { list: true, dark: true })
  },
  
  // 功能色系
  success: {
    light: palette.generate('#00B42A', { list: true }),
    dark: palette.generate('#00B42A', { list: true, dark: true })
  },
  
  error: {
    light: palette.generate('#F53F3F', { list: true }),
    dark: palette.generate('#F53F3F', { list: true, dark: true })
  },
  
  warning: {
    light: palette.generate('#FF7D00', { list: true }),
    dark: palette.generate('#FF7D00', { list: true, dark: true })
  },
  
  neutral: {
    light: neutral.generate('#ffffff', '#000000', { steps: 10, curveGamma: 1.2 }),
    dark: neutral.generate('#000000', '#ffffff', { steps: 10, curveGamma: 1.2 })
  }
};

console.log('设计系统色盘:', designSystem);
```

### 场景2：数据可视化配色

为图表和数据可视化创建和谐的配色方案：

```javascript
import { palette } from '@aviala-design/color';

const categoricalBase = ['#165DFF', '#00B42A', '#FF7D00', '#722ED1', '#14C9C9', '#F5319D'];

const categorical = categoricalBase;
const categoricalLight = categoricalBase.map((c) => palette.generate(c, { index: 3 }));
const categoricalDark = categoricalBase.map((c) => palette.generate(c, { index: 8, dark: true }));

console.log({ categorical, categoricalLight, categoricalDark });
```

### 场景3：主题切换

实现亮色/暗色主题的动态切换：

```javascript
import { palette } from '@aviala-design/color';

class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.base = {
      primary: '#165DFF',
      success: '#00B42A',
      error: '#F53F3F',
      warning: '#FF7D00',
      neutral: {
        light: neutral.generate('#ffffff', '#000000', { steps: 10, curveGamma: 1.2 }),
        dark: neutral.generate('#000000', '#ffffff', { steps: 10, curveGamma: 1.2 })
      }
    };
  }
  
  // 获取当前主题的颜色
  getThemeColors() {
    const isDark = this.currentTheme === 'dark';
    
    return {
      primary: palette.generate(this.base.primary, { list: true, dark: isDark }),
      success: palette.generate(this.base.success, { list: true, dark: isDark }),
      error: palette.generate(this.base.error, { list: true, dark: isDark }),
      warning: palette.generate(this.base.warning, { list: true, dark: isDark }),
      neutral: isDark ? this.base.neutral.dark : this.base.neutral.light
    };
  }
  
  // 切换主题
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }
  
  // 应用主题到CSS变量
  applyTheme() {
    const colors = this.getThemeColors();
    const root = document.documentElement;
    
    // 设置CSS变量
    colors.primary.forEach((color, index) => {
      root.style.setProperty(`--primary-${index + 1}`, color);
    });
    
    colors.neutral.forEach((color, index) => {
      root.style.setProperty(`--neutral-${index + 1}`, color);
    });
  }
}

// 使用示例
const themeManager = new ThemeManager();
themeManager.applyTheme();

// 主题切换按钮
document.getElementById('theme-toggle').addEventListener('click', () => {
  themeManager.toggleTheme();
});
```

### 场景4：动态品牌色生成

根据用户输入动态生成品牌色系：

```javascript
import { palette } from '@aviala-design/color';

function generateBrandPalette(brandColor) {
  try {
    // 验证颜色格式
    const basePalette = palette.generate(brandColor, { list: true });
    
    // 生成扩展色盘
    const extendedPalette = {
      // 主色系
      primary: {
        light: basePalette,
        dark: palette.generate(brandColor, { list: true, dark: true })
      },
      
      // 辅助色系（基于主色的色相偏移）
      secondary: {
        light: palette.generate(shiftHue(brandColor, 30), { list: true }),
        dark: palette.generate(shiftHue(brandColor, 30), { list: true, dark: true })
      },
      
      // 强调色系
      accent: {
        light: palette.generate(shiftHue(brandColor, -60), { list: true }),
        dark: palette.generate(shiftHue(brandColor, -60), { list: true, dark: true })
      }
    };
    
    return extendedPalette;
  } catch (error) {
    throw new Error(`无法生成品牌色盘: ${error.message}`);
  }
}

// 色相偏移辅助函数
function shiftHue(color, degrees) {
  // 这里需要使用 color 库或其他颜色处理库
  // 简化示例，实际使用时需要实现色相偏移逻辑
  return color; // 占位符
}

// 使用示例
try {
  const brandPalette = generateBrandPalette('#FF6B35');
  console.log('品牌色盘:', brandPalette);
} catch (error) {
  console.error('生成失败:', error.message);
}
```

## 最佳实践

### 1. 颜色命名规范

```javascript
import { palette } from '@aviala-design/color';

// 推荐：语义化命名
const colors = {
  primary: palette.generate('#165DFF', { list: true }),
  success: palette.generate('#00B42A', { list: true }),
  warning: palette.generate('#FF7D00', { list: true }),
  error: palette.generate('#F53F3F', { list: true })
};

// 不推荐：颜色值命名
const colors = {
  blue: palette.generate('#165DFF', { list: true }),
  green: palette.generate('#00B42A', { list: true })
};
```

### 2. 响应式颜色使用

```css
/* CSS 变量配合使用 */
:root {
  --primary-1: #E8F3FF;
  --primary-6: #165DFF;
  --primary-10: #030D4B;
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary-1: #030D4B;
    --primary-6: #4080FF;
    --primary-10: #E8F3FF;
  }
}

.button {
  background-color: var(--primary-6);
  color: var(--primary-1);
}
```

### 3. 性能优化

```javascript
// 缓存常用色盘
const colorCache = new Map();

function getCachedPalette(color, options = {}) {
  const key = `${color}-${JSON.stringify(options)}`;
  
  if (!colorCache.has(key)) {
    colorCache.set(key, palette.generate(color, options));
  }
  
  return colorCache.get(key);
}

// 批量生成色盘
function generateMultiplePalettes(colors) {
  return Promise.all(
    colors.map(color => 
      Promise.resolve(palette.generate(color, { list: true }))
    )
  );
}
```

### 4. 错误处理

```javascript
// 颜色验证函数
function isValidColor(color) {
  try {
    palette.generate(color);
    return true;
  } catch {
    return false;
  }
}

// 安全的颜色生成
function safeGenerate(color, options = {}, fallback = '#165DFF') {
  try {
    return palette.generate(color, options);
  } catch (error) {
    console.warn(`颜色生成失败，使用备用颜色: ${error.message}`);
    return palette.generate(fallback, options);
  }
}
```

## 下一步

- 查看 [API 参考文档](./api-reference.md) 了解 `palette.generate`
- 阅读 [色盘生成文档](./palette-generate.md) 深入了解色盘算法
- 阅读 [迁移指南](./migration.md) 了解破坏性变更与替代方案
- 访问 [在线演示](../index.html) 体验色盘生成

## 获取帮助

如果您在使用过程中遇到问题：

1. 查看本文档的相关章节
2. 检查浏览器控制台的错误信息
3. 确认颜色格式是否正确
4. 查看 [GitHub Issues](https://github.com/aviala-design/color/issues)
5. 提交新的 Issue 或 Pull Request

祝您使用愉快！
