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

### CDN 引入
```html
<script src="https://unpkg.com/@aviala-design/color@latest/dist/index.js"></script>
```

## 基础使用

### ES6 模块导入
```javascript
import { generate, getPresetColors } from '@aviala-design/color';
```

### CommonJS 导入
```javascript
const { generate, getPresetColors } = require('@aviala-design/color');
```

### 浏览器直接使用
```html
<script>
  const { generate, getPresetColors } = window.AvialadDesignColor;
</script>
```

## 5分钟快速体验

### 1. 生成基础色盘

最简单的用法是基于一个颜色生成完整的色盘：

```javascript
import { generate } from '@aviala-design/color';

// 生成蓝色系色盘
const bluePalette = generate('#165DFF', { list: true });
console.log(bluePalette);
// 输出: [
//   '#E8F3FF', '#BEDAFF', '#94BFFF', '#6AA1FF', '#4080FF',
//   '#165DFF', '#0E42D2', '#0A2BA5', '#061A78', '#030D4B'
// ]

// 生成暗色模式色盘
const darkBluePalette = generate('#165DFF', { list: true, dark: true });
console.log(darkBluePalette);
```

### 2. 使用预设颜色

库提供了14种精心设计的预设颜色：

```javascript
import { getPresetColors } from '@aviala-design/color';

const presetColors = getPresetColors();

// 获取红色系色盘
const redColors = presetColors.red;
console.log('红色主色调:', redColors.primary);     // '#F53F3F'
console.log('红色亮色系:', redColors.light);       // 10个亮色
console.log('红色暗色系:', redColors.dark);        // 10个暗色

// 遍历所有预设颜色
Object.keys(presetColors).forEach(colorName => {
  console.log(`${colorName}: ${presetColors[colorName].primary}`);
});
```

### 3. 线性颜色渐变

创建两个颜色之间的平滑过渡：

```javascript
import { generateLinear, generateGrayLinear } from '@aviala-design/color';

// 从红色到蓝色的渐变
const gradient = generateLinear('#FF0000', '#0000FF', { steps: 8 });
console.log(gradient);

// 生成灰色系渐变
const grayGradient = generateGrayLinear({ steps: 10 });
console.log(grayGradient);
```

### 4. 从图片提取颜色

从图片中自动提取主色调：

```javascript
import { extractColorFromFile, generate } from '@aviala-design/color';

// HTML: <input type="file" id="imageInput" accept="image/*">
const fileInput = document.getElementById('imageInput');

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      // 提取主色调
      const dominantColor = await extractColorFromFile(file);
      console.log('图片主色调:', dominantColor);
      
      // 基于主色调生成色盘
      const palette = generate(dominantColor, { list: true });
      console.log('生成的色盘:', palette);
    } catch (error) {
      console.error('处理失败:', error);
    }
  }
});
```

### 5. 主题混合与品牌定制

使用HCT色彩空间进行高级主题混合：

```javascript
import { generateThemePalette, generateInterfaceColorSystem } from '@aviala-design/color';

// 生成完整的主题色盘
const themePalette = generateThemePalette('#3491FA', {
  semanticColors: {
    success: '#00C853',
    warning: '#FF9800',
    error: '#F44336'
  },
  semanticBlendRatio: 0.1 // 10%的品牌色影响
});

console.log('控制色系:', themePalette.control);
console.log('语义色系:', themePalette.semantic);
console.log('主题色变体:', themePalette.theme);

// 生成界面色彩系统
const interfaceColors = generateInterfaceColorSystem('#3491FA', {
  semanticColors: {
    success: '#00C853',
    warning: '#FF9800',
    error: '#F44336'
  },
  semanticBlendRatio: 0.08,
  controlBlendRatio: 0.05
});

console.log('完整界面色彩系统:', interfaceColors);
```

## 常见使用场景

### 场景1：设计系统色盘

为设计系统创建一致的颜色规范：

```javascript
import { generate, getPresetColors } from '@aviala-design/color';

// 定义品牌主色
const brandColor = '#165DFF';

// 生成完整的设计系统色盘
const designSystem = {
  // 品牌色系
  primary: {
    light: generate(brandColor, { list: true }),
    dark: generate(brandColor, { list: true, dark: true })
  },
  
  // 功能色系
  success: {
    light: generate('#00B42A', { list: true }),
    dark: generate('#00B42A', { list: true, dark: true })
  },
  
  error: {
    light: generate('#F53F3F', { list: true }),
    dark: generate('#F53F3F', { list: true, dark: true })
  },
  
  warning: {
    light: generate('#FF7D00', { list: true }),
    dark: generate('#FF7D00', { list: true, dark: true })
  },
  
  // 使用预设灰色系
  neutral: getPresetColors().gray
};

console.log('设计系统色盘:', designSystem);
```

### 场景2：数据可视化配色

为图表和数据可视化创建和谐的配色方案：

```javascript
import { generateLinear, getPresetColors } from '@aviala-design/color';

// 创建数据可视化配色方案
function createVisualizationPalette() {
  const presets = getPresetColors();
  
  // 分类数据配色（使用预设颜色的主色调）
  const categoricalColors = [
    presets.blue.primary,
    presets.green.primary,
    presets.orange.primary,
    presets.purple.primary,
    presets.cyan.primary,
    presets.magenta.primary
  ];
  
  // 连续数据配色（渐变色）
  const sequentialColors = generateLinear('#E8F4FD', '#165DFF', { steps: 9 });
  
  // 发散数据配色（双向渐变）
  const divergingColors = [
    ...generateLinear('#F53F3F', '#FFFFFF', { steps: 5, includeEnds: false }),
    '#FFFFFF',
    ...generateLinear('#FFFFFF', '#165DFF', { steps: 5, includeEnds: false })
  ];
  
  return {
    categorical: categoricalColors,
    sequential: sequentialColors,
    diverging: divergingColors
  };
}

const vizPalette = createVisualizationPalette();
console.log('可视化配色方案:', vizPalette);
```

### 场景3：主题切换

实现亮色/暗色主题的动态切换：

```javascript
import { generate, getPresetColors } from '@aviala-design/color';

class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.colors = getPresetColors();
  }
  
  // 获取当前主题的颜色
  getThemeColors() {
    const isDark = this.currentTheme === 'dark';
    
    return {
      primary: isDark ? this.colors.arcoblue.dark : this.colors.arcoblue.light,
      success: isDark ? this.colors.green.dark : this.colors.green.light,
      error: isDark ? this.colors.red.dark : this.colors.red.light,
      warning: isDark ? this.colors.orange.dark : this.colors.orange.light,
      neutral: isDark ? this.colors.gray.dark : this.colors.gray.light
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
import { generate, generateLinear } from '@aviala-design/color';

function generateBrandPalette(brandColor) {
  try {
    // 验证颜色格式
    const basePalette = generate(brandColor, { list: true });
    
    // 生成扩展色盘
    const extendedPalette = {
      // 主色系
      primary: {
        light: basePalette,
        dark: generate(brandColor, { list: true, dark: true })
      },
      
      // 辅助色系（基于主色的色相偏移）
      secondary: {
        light: generate(shiftHue(brandColor, 30), { list: true }),
        dark: generate(shiftHue(brandColor, 30), { list: true, dark: true })
      },
      
      // 强调色系
      accent: {
        light: generate(shiftHue(brandColor, -60), { list: true }),
        dark: generate(shiftHue(brandColor, -60), { list: true, dark: true })
      },
      
      // 渐变色组合
      gradients: {
        primary: generateLinear(basePalette[3], basePalette[7], { steps: 10 }),
        secondary: generateLinear(brandColor, shiftHue(brandColor, 60), { steps: 10 })
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
// 推荐：语义化命名
const colors = {
  primary: generate('#165DFF', { list: true }),
  success: generate('#00B42A', { list: true }),
  warning: generate('#FF7D00', { list: true }),
  error: generate('#F53F3F', { list: true })
};

// 不推荐：颜色值命名
const colors = {
  blue: generate('#165DFF', { list: true }),
  green: generate('#00B42A', { list: true })
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
    colorCache.set(key, generate(color, options));
  }
  
  return colorCache.get(key);
}

// 批量生成色盘
function generateMultiplePalettes(colors) {
  return Promise.all(
    colors.map(color => 
      Promise.resolve(generate(color, { list: true }))
    )
  );
}
```

### 4. 错误处理

```javascript
// 颜色验证函数
function isValidColor(color) {
  try {
    generate(color);
    return true;
  } catch {
    return false;
  }
}

// 安全的颜色生成
function safeGenerate(color, options = {}, fallback = '#165DFF') {
  try {
    return generate(color, options);
  } catch (error) {
    console.warn(`颜色生成失败，使用备用颜色: ${error.message}`);
    return generate(fallback, options);
  }
}
```

## 下一步

- 查看 [API 参考文档](./api-reference.md) 了解完整的API
- 阅读 [色盘生成文档](./palette-generate.md) 深入了解色盘算法
- 查看 [线性颜色生成文档](./linear-generate.md) 学习渐变色生成
- 阅读 [图片取色文档](./image-color.md) 了解图片颜色提取
- 学习 [主题混合文档](./theme-blend.md) 掌握高级颜色混合技术
- 访问 [在线演示](../index.html) 体验所有功能

## 获取帮助

如果您在使用过程中遇到问题：

1. 查看本文档的相关章节
2. 检查浏览器控制台的错误信息
3. 确认颜色格式是否正确
4. 查看 [GitHub Issues](https://github.com/aviala-design/color/issues)
5. 提交新的 Issue 或 Pull Request

祝您使用愉快！🎨