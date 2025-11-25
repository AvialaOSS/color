# 主题混合功能文档

主题混合功能基于 CIE Lab 颜色空间实现的 HCT (Hue, Chroma, Tone) 色彩空间，提供了强大的颜色调和与混合能力，特别适用于品牌色系统和主题定制。

> **💡 提示**：主题混合功能基于感知均匀的 Lab 色彩空间，能够生成更自然、协调的颜色组合，特别适合构建一致性强的设计系统。

## 功能概述

### 核心特性

- **CIE Lab 色彩空间**：基于人眼感知的色彩空间，提供准确的颜色转换
- **多种混合模式**：支持 Lab 空间混合、HCT 线性混合、仅色相混合
- **完整色彩系统**：一键生成包含控件色、语义色、主题色的完整界面色彩系统
- **暗色模式支持**：自动适配亮色和暗色两种模式
- **颜色和谐工具**：提供互补色、三角配色、类似色等配色方案
- **高度可定制**：支持自定义语义色、混合比例、亮度范围等参数

### 新增功能 (v0.3.0)

- **颜色差异计算**：`colorDifference` - 计算两色的感知差异 (Delta E)
- **颜色调整**：`adjustTone`、`adjustChroma`、`adjustHue`、`rotateHue`
- **配色方案**：`getComplementary`、`getTriadic`、`getSplitComplementary`、`getAnalogous`
- **混合模式**：`blendInHct` 支持 `lab`、`hct`、`hue-only` 三种模式
- **精确控制**：支持自定义色阶数量、亮度范围（minLightness/maxLightness）

### 适用场景

- **设计系统构建**：为组件库和设计系统生成一致的色彩规范
- **品牌色彩定制**：基于品牌主色生成完整的色彩体系
- **主题切换**：支持多主题和暗色模式的应用
- **界面色彩优化**：提升界面色彩的协调性和视觉层次
- **配色方案生成**：快速生成互补色、类似色等配色方案

## 快速开始

### 基础用法

```javascript
import { generateInterfaceColorSystem } from '@aviala-design/color';

// 生成完整的界面色彩系统
const colorSystem = generateInterfaceColorSystem('#165DFF');

console.log(colorSystem);
/*
输出:
{
  controls: { 'gray-1': '#f8f9fa', 'gray-2': '#f1f3f4', ... },
  semantic: { 'success-1': '#f6ffed', 'error-1': '#fff2f0', ... },
  theme: { 'theme-1': '#f0f5ff', 'theme-6': '#165DFF', ... }
}
*/
```

### 自定义配置

```javascript
// 完整自定义配置
const customSystem = generateInterfaceColorSystem('#165DFF', {
  isDark: false,
  baseGray: '#666666',
  // 控件色配置
  controlBlendRatio: 0.08,
  controlSteps: 12,
  controlMinLightness: 10,
  controlMaxLightness: 98,
  // 语义色配置
  semanticBlendRatio: 0.12,
  semanticSteps: 10,
  semanticColors: {
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff'
  },
  // 主题色配置
  themeSteps: 10,
  themeMinLightness: 15,
  themeMaxLightness: 95
});
```

### 配色方案生成

```javascript
import { getComplementary, getTriadic, getAnalogous } from '@aviala-design/color';

// 获取互补色
const complement = getComplementary('#FF0000'); // 青色

// 获取三角配色
const [c1, c2, c3] = getTriadic('#FF0000');

// 获取类似色
const analogous = getAnalogous('#FF0000', 5, 15); // 5 个颜色，间隔 15°
```

## API 说明

### 1. rgbToHct - RGB转HCT

将RGB颜色转换为HCT色彩空间（基于 CIE Lab 实现）。

```javascript
import { rgbToHct } from '@aviala-design/color';

const hct = rgbToHct('#3491FA');
console.log(hct); // { h: 278.7, c: 60.7, t: 59.8 }
// h: 色相 (0-360)，从 Lab 的 a*/b* 计算
// c: 色度，sqrt(a² + b²)
// t: 明度，即 L* 值 (0-100)
```

### 2. hctToRgb - HCT转RGB

将HCT色彩空间转换为RGB颜色，支持色域映射。

```javascript
import { hctToRgb } from '@aviala-design/color';

const rgb = hctToRgb({ h: 278.7, c: 60.7, t: 59.8 });
console.log(rgb); // '#3491fa'

// 使用色域映射选项
const rgb2 = hctToRgb({ h: 120, c: 150, t: 50 }, { 
  gamutMapping: 'reduce-chroma' // 默认，逐步减少色度直到在色域内
});
```

### 3. blendInHct - 颜色混合（支持多种模式）

在色彩空间中混合两种颜色，支持三种混合模式。

```javascript
import { blendInHct } from '@aviala-design/color';

// Lab 空间混合（默认，最感知一致）
const labBlend = blendInHct('#FF0000', '#0000FF', 0.5);

// HCT 线性混合（保持色相连续性）
const hctBlend = blendInHct('#FF0000', '#0000FF', 0.5, { mode: 'hct' });

// 仅混合色相（保持第一个颜色的色度和明度）
const hueBlend = blendInHct('#FF0000', '#0000FF', 0.5, { mode: 'hue-only' });
```

### 4. harmonizeColor - 颜色调和

将目标色向主题色调和，保持颜色的和谐性。

```javascript
import { harmonizeColor } from '@aviala-design/color';

// 调和红色错误色与蓝色主题
const harmonized = harmonizeColor('#165DFF', '#F53F3F', 0.15);
console.log(harmonized); // 调和后的错误色

// 调和成功色
const successColor = harmonizeColor('#165DFF', '#00B42A', 0.15);
```

### 5. generateThemeVariants - 主题变体

基于主题色生成明度变体。

```javascript
import { generateThemeVariants } from '@aviala-design/color';

// 生成主题色变体
const variants = generateThemeVariants('#165DFF');
console.log(variants);
// 输出: ['#f0f5ff', '#d6e4ff', '#adc6ff', ...]

// 自定义明度范围
const customVariants = generateThemeVariants('#165DFF', {
  tones: [10, 20, 30, 40, 50, 60, 70, 80, 90]
});
```

### 6. blendUIColors - 界面色混合

将主题色混合到界面色中，创建统一的视觉风格。

```javascript
import { blendUIColors } from '@aviala-design/color';

const uiColors = {
  background: '#FFFFFF',
  surface: '#F7F8FA',
  border: '#E5E6EB',
  disabled: '#C9CDD4'
};

const blended = blendUIColors('#165DFF', uiColors, 0.05);
console.log(blended);
// 输出带有主题色调的界面色
```

### 8. generateControlColors - 基础控件颜色

生成基础控件颜色（灰色系1-12），适用于按钮、输入框、分割线等UI组件。

```javascript
import { generateControlColors } from '@aviala-design/color';

// 基础用法
const controlColors = generateControlColors('#165DFF');
console.log(controlColors);
/*
输出:
{
  'gray-1': '#f8f9fa',
  'gray-2': '#f1f3f4',
  'gray-3': '#e8eaed',
  // ... gray-4 到 gray-12
}
*/

// 自定义配置
const customControls = generateControlColors('#165DFF', {
  baseGray: '#666666',     // 基础灰色
  blendRatio: 0.08,        // 混合比例
  isDark: false            // 是否为暗色模式
});
```

### 7. generateSemanticColors - 表意色生成

生成表意色（1-10），为成功、警告、错误等状态提供完整的色阶。

```javascript
import { generateSemanticColors } from '@aviala-design/color';

// 基础用法
const semanticColors = generateSemanticColors('#165DFF');
console.log(semanticColors);
/*
输出:
{
  'success-1': '#f6ffed',
  'success-2': '#d9f7be',
  // ... success-3 到 success-10
  'warning-1': '#fffbe6',
  'warning-2': '#fff1b8',
  // ... warning-3 到 warning-10
  'error-1': '#fff2f0',
  'error-2': '#ffccc7',
  // ... error-3 到 error-10
  'info-1': '#f0f5ff',
  'info-2': '#d6e4ff'
  // ... info-3 到 info-10
}
*/

// 自定义语义色
const customSemantic = generateSemanticColors('#165DFF', {
  semanticColors: {
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
    purple: '#722ed1'      // 自定义颜色
  },
  blendRatio: 0.12,
  isDark: false
});
```

### 8. generateThemeColors - 主题色生成

生成主题色（1-10），提供主题色的完整明度变化。

```javascript
import { generateThemeColors } from '@aviala-design/color';

// 基础用法
const themeColors = generateThemeColors('#165DFF');
console.log(themeColors);
/*
输出:
{
  'theme-1': '#f0f5ff',
  'theme-2': '#d6e4ff',
  'theme-3': '#adc6ff',
  'theme-4': '#85a5ff',
  'theme-5': '#597ef7',
  'theme-6': '#2f54eb',
  'theme-7': '#1d39c4',
  'theme-8': '#10239e',
  'theme-9': '#061178',
  'theme-10': '#030852'
}
*/

// 暗色模式
const darkThemeColors = generateThemeColors('#165DFF', {
  isDark: true
});
```

### 11. generateInterfaceColorSystem - 完整界面色彩系统

生成包含控件色、表意色、主题色的完整界面色彩系统。这是最常用的函数，能够一次性生成设计系统所需的所有颜色。

**函数签名：**
```typescript
function generateInterfaceColorSystem(
  themeColor: string,
  options?: InterfaceColorSystemOptions
): InterfaceColorSystem
```

**参数说明：**
- `themeColor`: string - 主题色（十六进制格式）
- `options`: InterfaceColorSystemOptions - 可选配置项

**返回值结构：**
```typescript
interface InterfaceColorSystem {
  controls: Record<string, string>;  // 控件色：gray-1 到 gray-12
  semantic: Record<string, string>;  // 语义色：success-1 到 success-10, warning-1 到 warning-10, 等
  theme: Record<string, string>;     // 主题色：theme-1 到 theme-10
}
```

**基础用法：**
```javascript
import { generateInterfaceColorSystem } from '@aviala-design/color';

// 基础用法
const colorSystem = generateInterfaceColorSystem('#165DFF');
console.log(colorSystem);
/*
输出:
{
  controls: {
    'gray-1': '#f8f9fa',    // 最浅的控件色
    'gray-2': '#f1f3f4',
    'gray-6': '#666666',    // 中等控件色
    'gray-12': '#1a1a1a'    // 最深的控件色
  },
  semantic: {
    'success-1': '#f6ffed', // 最浅的成功色
    'success-6': '#52c41a', // 标准成功色
    'success-10': '#135200', // 最深的成功色
    'error-1': '#fff2f0',   // 最浅的错误色
    'error-6': '#ff4d4f',   // 标准错误色
    // ... 其他语义色变体
  },
  theme: {
    'theme-1': '#f0f5ff',   // 最浅的主题色
    'theme-6': '#165DFF',   // 标准主题色
    'theme-10': '#030852'   // 最深的主题色
  }
}
*/

// 完整配置
const fullColorSystem = generateInterfaceColorSystem('#165DFF', {
  baseGray: '#666666',        // 自定义基础灰色
  isDark: false,              // 亮色模式
  semanticColors: {
    success: '#52c41a',       // 自定义成功色
    warning: '#faad14',       // 自定义警告色
    error: '#ff4d4f',         // 自定义错误色
    info: '#1890ff'           // 自定义信息色
  },
  controlBlendRatio: 0.08,    // 控件色混合比例
  semanticBlendRatio: 0.12    // 语义色混合比例
});

// 自定义语义色基准色
const customSemanticSystem = generateInterfaceColorSystem('#165DFF', {
  semanticColors: {
    success: '#00b96b',    // 自定义成功色
    warning: '#faad14',    // 保持默认警告色
    error: '#ff7875',      // 自定义错误色
    info: '#40a9ff'        // 自定义信息色
  }
});

// 品牌定制示例
const brandColorSystem = generateInterfaceColorSystem('#6366f1', {
  semanticColors: {
    success: '#10b981',    // 品牌绿色
    warning: '#f59e0b',    // 品牌橙色
    error: '#ef4444',      // 品牌红色
    info: '#3b82f6'        // 品牌蓝色
  },
  semanticBlendRatio: 0.15  // 增强主题色影响
});

// 部分自定义（只修改需要的颜色）
const partialCustomSystem = generateInterfaceColorSystem('#165DFF', {
  semanticColors: {
    success: '#52c41a',    // 默认
    warning: '#ff8c00',    // 仅自定义警告色
    error: '#ff4d4f',      // 默认
    info: '#1890ff'        // 默认
  }
});
```

### 12. generateThemePalette - 完整主题色板

生成包含所有颜色类型的完整主题色板。

```javascript
import { generateThemePalette } from '@aviala-design/color';

// 基础用法
const palette = generateThemePalette('#165DFF');
console.log(palette);
/*
输出:
{
  theme: '#165DFF',
  variants: ['#f0f5ff', '#d6e4ff', ...],
  semantic: {
    success: '#00B42A',
    warning: '#FF7D00',
    error: '#F53F3F',
    info: '#165DFF'
  },
  ui: {
    background: '#FFFFFF',
    surface: '#F7F8FA',
    border: '#E5E6EB',
    disabled: '#C9CDD4'
  }
}
*/

// 自定义配置
const customPalette = generateThemePalette('#165DFF', {
  semanticColors: {
    primary: '#165DFF',
    secondary: '#00B42A'
  },
  harmonizeRatio: 0.2,
  blendRatio: 0.1,
  generateVariants: true
});
```

## 配置选项

### ControlColorsOptions

```typescript
interface ControlColorsOptions {
  baseGray?: string;      // 基础灰色，默认 '#666666'
  blendRatio?: number;    // 混合比例，默认 0.08
  isDark?: boolean;       // 是否为暗色模式，默认 false
}
```

### SemanticColorsOptions

```typescript
interface SemanticColorsOptions {
  semanticColors?: Record<string, string>; // 自定义语义色
  blendRatio?: number;                     // 混合比例，默认 0.12
  isDark?: boolean;                        // 是否为暗色模式，默认 false
}
```

### ThemeColorsOptions

```typescript
interface ThemeColorsOptions {
  isDark?: boolean;       // 是否为暗色模式，默认 false
}
```

### InterfaceColorSystemOptions

```typescript
interface InterfaceColorSystemOptions {
  baseGray?: string;              // 基础灰色，默认 '#666666'
  isDark?: boolean;               // 是否为暗色模式，默认 false
  semanticColors?: Record<string, string>; // 自定义语义色
  controlBlendRatio?: number;     // 控件色混合比例，默认 0.08
  semanticBlendRatio?: number;    // 语义色混合比例，默认 0.12
}
```

### ThemePaletteOptions

```typescript
interface ThemePaletteOptions {
  semanticColors?: Record<string, string>; // 自定义语义色
  uiColors?: Record<string, string>;       // 自定义界面色
  harmonizeRatio?: number;                 // 调和比例 (0-1)
  blendRatio?: number;                     // 混合比例 (0-1)
  generateVariants?: boolean;              // 是否生成变体
  tones?: number[];                        // 自定义明度值
}
```

## 使用场景

### 1. 完整界面色彩系统

**React 组件库集成示例：**

```javascript
import { generateInterfaceColorSystem } from '@aviala-design/color';

// 生成完整的界面色彩系统
const colorSystem = generateInterfaceColorSystem('#1890FF', {
  isDark: false,
  semanticColors: {
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff'
  }
});

// 转换为设计令牌
const designTokens = {
  colors: {
    // 主题色
    primary: {
      50: colorSystem.theme['theme-1'],
      100: colorSystem.theme['theme-2'],
      500: colorSystem.theme['theme-6'],  // 主色
      900: colorSystem.theme['theme-10']
    },
    // 中性色
    gray: {
      50: colorSystem.controls['gray-1'],
      100: colorSystem.controls['gray-2'],
      500: colorSystem.controls['gray-6'],
      900: colorSystem.controls['gray-12']
    },
    // 语义色
    success: {
      50: colorSystem.semantic['success-1'],
      500: colorSystem.semantic['success-6'],
      900: colorSystem.semantic['success-10']
    }
  }
};

// 应用到CSS变量
const cssVariables = {
  // 控件色
  '--color-gray-1': colorSystem.controls['gray-1'],
  '--color-gray-2': colorSystem.controls['gray-2'],
  '--color-gray-12': colorSystem.controls['gray-12'],
  
  // 表意色
  '--color-success-1': colorSystem.semantic['success-1'],
  '--color-success-6': colorSystem.semantic['success-6'],
  '--color-error-1': colorSystem.semantic['error-1'],
  '--color-error-6': colorSystem.semantic['error-6'],
  
  // 主题色
  '--color-primary-1': colorSystem.theme['theme-1'],
  '--color-primary-6': colorSystem.theme['theme-6'],
  '--color-primary-10': colorSystem.theme['theme-10']
};
```

### 2. 界面工具中的语义色配置

在提供的界面工具中，用户可以通过可视化界面自定义语义色基准色：

**使用步骤：**
1. 选择"界面色彩系统"模式
2. 在弹出的配置面板中输入自定义语义色：
   - 成功色 (success) - 默认: `#52c41a`
   - 警告色 (warning) - 默认: `#faad14`
   - 错误色 (error) - 默认: `#ff4d4f`
   - 信息色 (info) - 默认: `#1890ff`
3. 点击"生成主题混合"或按回车键
4. 系统将生成包含自定义语义色的完整界面色彩系统

**配置特性：**
- 支持部分自定义：只需填写要修改的颜色，其他保持默认
- 智能显示：只有选择界面色彩系统时才显示配置面板
- 便捷操作：所有输入框都支持回车键快速生成
- 实时预览：生成的颜色立即显示在界面中

```javascript
// 界面工具生成的代码示例
const customColorSystem = generateInterfaceColorSystem('#165DFF', {
  semanticColors: {
    success: '#00b96b',    // 用户自定义的成功色
    warning: '#faad14',    // 保持默认
    error: '#ff7875',      // 用户自定义的错误色
    info: '#1890ff'        // 保持默认
  }
});
```

### 3. 品牌色系统

```javascript
// 基于品牌主色生成完整色彩系统
const brandSystem = generateThemePalette('#1890FF', {
  harmonizeRatio: 0.15,
  generateVariants: true
});

// 应用到设计系统
const designTokens = {
  primary: brandSystem.theme,
  primaryLight: brandSystem.variants[2],
  primaryDark: brandSystem.variants[7],
  success: brandSystem.semantic.success,
  error: brandSystem.semantic.error
};
```

### 3. 暗色模式支持

```javascript
// 生成亮色和暗色两套色彩系统
function createDualTheme(primaryColor) {
  const lightSystem = generateInterfaceColorSystem(primaryColor, {
    isDark: false
  });
  
  const darkSystem = generateInterfaceColorSystem(primaryColor, {
    isDark: true
  });
  
  return {
    light: lightSystem,
    dark: darkSystem
  };
}

// 应用主题切换
const themes = createDualTheme('#1890FF');

// 根据用户偏好应用主题
function applyTheme(isDark) {
  const currentTheme = isDark ? themes.dark : themes.light;
  
  // 更新CSS变量
  Object.entries(currentTheme.controls).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value);
  });
  
  Object.entries(currentTheme.semantic).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value);
  });
  
  Object.entries(currentTheme.theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value);
  });
}
```

### 4. 组件库集成

```javascript
// 为组件库生成完整的设计令牌
function generateDesignTokens(brandColor) {
  const colorSystem = generateInterfaceColorSystem(brandColor);
  
  return {
    // 基础色彩
    colors: {
      // 主品牌色
      primary: {
        50: colorSystem.theme['theme-1'],
        100: colorSystem.theme['theme-2'],
        200: colorSystem.theme['theme-3'],
        300: colorSystem.theme['theme-4'],
        400: colorSystem.theme['theme-5'],
        500: colorSystem.theme['theme-6'], // 主色
        600: colorSystem.theme['theme-7'],
        700: colorSystem.theme['theme-8'],
        800: colorSystem.theme['theme-9'],
        900: colorSystem.theme['theme-10']
      },
      
      // 中性色
      gray: {
        50: colorSystem.controls['gray-1'],
        100: colorSystem.controls['gray-2'],
        200: colorSystem.controls['gray-3'],
        300: colorSystem.controls['gray-4'],
        400: colorSystem.controls['gray-5'],
        500: colorSystem.controls['gray-6'],
        600: colorSystem.controls['gray-7'],
        700: colorSystem.controls['gray-8'],
        800: colorSystem.controls['gray-9'],
        900: colorSystem.controls['gray-10']
      },
      
      // 功能色
      success: {
        light: colorSystem.semantic['success-2'],
        main: colorSystem.semantic['success-6'],
        dark: colorSystem.semantic['success-8']
      },
      warning: {
        light: colorSystem.semantic['warning-2'],
        main: colorSystem.semantic['warning-6'],
        dark: colorSystem.semantic['warning-8']
      },
      error: {
        light: colorSystem.semantic['error-2'],
        main: colorSystem.semantic['error-6'],
        dark: colorSystem.semantic['error-8']
      }
    }
  };
}

// 使用示例
const tokens = generateDesignTokens('#1890FF');
console.log(tokens.colors.primary[500]); // 主品牌色
```

### 5. 动态主题生成

```javascript
// 动态主题生成
function createTheme(primaryColor) {
  const palette = generateThemePalette(primaryColor, {
    harmonizeRatio: 0.12,
    blendRatio: 0.08
  });
  
  return {
    colors: {
      primary: palette.theme,
      background: palette.ui.background,
      surface: palette.ui.surface,
      success: palette.semantic.success,
      warning: palette.semantic.warning,
      error: palette.semantic.error
    }
  };
}

// 应用不同主题
const blueTheme = createTheme('#1890FF');
const greenTheme = createTheme('#52C41A');
const purpleTheme = createTheme('#722ED1');
```

### 3. 语义色调和

```javascript
// 确保错误色与品牌色协调
const harmonizedError = harmonizeColor('#1890FF', '#FF4D4F', 0.15);

// 为不同状态生成协调的颜色
const statusColors = {
  info: harmonizeColor('#1890FF', '#1890FF', 0),
  success: harmonizeColor('#1890FF', '#52C41A', 0.12),
  warning: harmonizeColor('#1890FF', '#FAAD14', 0.12),
  error: harmonizeColor('#1890FF', '#FF4D4F', 0.15)
};
```

### 4. 渐进式品牌融入

```javascript
// 逐步将品牌色融入现有设计
const existingColors = {
  background: '#F5F5F5',
  card: '#FFFFFF',
  border: '#D9D9D9'
};

// 轻微融入品牌色
const subtleBranding = blendUIColors('#1890FF', existingColors, 0.03);

// 中等程度融入
const moderateBranding = blendUIColors('#1890FF', existingColors, 0.08);

// 强烈品牌化
const strongBranding = blendUIColors('#1890FF', existingColors, 0.15);
```

## 技术原理

### HCT 色彩空间

HCT (Hue, Chroma, Tone) 是 Google 开发的感知均匀色彩空间：

- **Hue (色相)**：0-360度，表示颜色的基本属性
- **Chroma (饱和度)**：0-150+，表示颜色的鲜艳程度
- **Tone (明度)**：0-100，表示颜色的明暗程度

### 调和算法

调和算法通过调整目标色的色相，使其向主题色靠近：

```javascript
// 简化的调和逻辑
function harmonize(themeHue, targetHue, ratio) {
  const angleDiff = Math.abs(themeHue - targetHue);
  const shortestPath = angleDiff > 180 ? 360 - angleDiff : angleDiff;
  return targetHue + (shortestPath * ratio * (themeHue > targetHue ? 1 : -1));
}
```

### 混合算法

混合算法在HCT空间中进行线性插值：

```javascript
// HCT空间混合
function blendHCT(color1, color2, ratio) {
  return {
    h: interpolate(color1.h, color2.h, ratio),
    c: interpolate(color1.c, color2.c, ratio),
    t: interpolate(color1.t, color2.t, ratio)
  };
}
```

## 最佳实践

### 1. 界面色彩系统设计原则

- **层次分明**：使用不同明度的颜色建立视觉层次
- **功能导向**：根据组件功能选择合适的色彩类别
- **一致性**：在整个应用中保持色彩使用的一致性
- **可访问性**：确保足够的对比度以满足无障碍要求
- **品牌一致性**：通过主题色混合保持品牌特色
- **情感传达**：合理使用语义色传达正确的情感信息

```javascript
// 推荐的色彩层次使用
const colorHierarchy = {
  // 主要操作：使用主题色6-8
  primaryButton: colorSystem.theme['theme-6'],
  
  // 次要操作：使用主题色2-4
  secondaryButton: colorSystem.theme['theme-2'],
  
  // 背景色：使用控件色1-3
  cardBackground: colorSystem.controls['gray-1'],
  
  // 边框：使用控件色3-5
  border: colorSystem.controls['gray-3'],
  
  // 文字：使用控件色8-12
  textPrimary: colorSystem.controls['gray-12'],
  textSecondary: colorSystem.controls['gray-8']
};
```

### 2. 调和比例选择

- **轻微调和 (5-10%)**：保持原色特性，仅增加品牌一致性
- **中等调和 (10-20%)**：平衡原色和品牌色，适合大多数场景
- **强烈调和 (20%+)**：明显的品牌化效果，适合重要元素

### 3. 语义色处理

```javascript
// 推荐的语义色调和比例
const semanticHarmonization = {
  success: 0.12,  // 成功色轻微调和
  warning: 0.15,  // 警告色中等调和
  error: 0.18,    // 错误色稍强调和
  info: 0.10      // 信息色轻微调和
};

// 语义色使用建议
const semanticUsage = {
  // 成功状态：使用success-1到success-3作为背景，success-6到success-8作为文字
  successBackground: colorSystem.semantic['success-1'],
  successText: colorSystem.semantic['success-7'],
  
  // 错误状态：使用error-1到error-3作为背景，error-6到error-8作为文字
  errorBackground: colorSystem.semantic['error-1'],
  errorText: colorSystem.semantic['error-7']
};
```

### 4. 暗色模式适配

```javascript
// 暗色模式下的色彩调整建议
const darkModeGuidelines = {
  // 背景色：使用较深的控件色
  background: colorSystem.controls['gray-12'],
  surface: colorSystem.controls['gray-11'],
  
  // 文字色：使用较浅的控件色
  textPrimary: colorSystem.controls['gray-1'],
  textSecondary: colorSystem.controls['gray-3'],
  
  // 主题色：在暗色模式下通常使用较浅的变体
  primary: colorSystem.theme['theme-4'], // 而不是theme-6
  
  // 语义色：适当调整明度以保持可读性
  success: colorSystem.semantic['success-4'],
  error: colorSystem.semantic['error-4']
};
```

### 3. 无障碍考虑

```javascript
// 确保对比度符合要求
function ensureContrast(backgroundColor, textColor, minRatio = 4.5) {
  const contrast = calculateContrast(backgroundColor, textColor);
  if (contrast < minRatio) {
    // 调整明度以满足对比度要求
    return adjustToneForContrast(textColor, backgroundColor, minRatio);
  }
  return textColor;
}
```

### 4. 性能优化

```javascript
// 缓存主题色板
const themeCache = new Map();

function getCachedTheme(primaryColor, options) {
  const key = `${primaryColor}-${JSON.stringify(options)}`;
  if (!themeCache.has(key)) {
    themeCache.set(key, generateThemePalette(primaryColor, options));
  }
  return themeCache.get(key);
}
```

## 注意事项

### 技术层面

1. **色彩空间转换**：RGB与HCT转换可能存在精度损失，建议在关键场景下进行测试
2. **显示器差异**：不同显示器的色彩表现可能有差异，建议在多种设备上验证
3. **性能考虑**：大量颜色转换时建议使用缓存，避免重复计算
4. **浏览器兼容性**：确保目标浏览器支持所使用的颜色格式
5. **色彩精度**：在需要精确色彩匹配的场景下，建议进行色彩校准

```javascript
// 性能优化示例
const colorCache = new Map();

function getCachedColorSystem(primaryColor, options) {
  const cacheKey = `${primaryColor}-${JSON.stringify(options)}`;
  
  if (!colorCache.has(cacheKey)) {
    colorCache.set(cacheKey, generateInterfaceColorSystem(primaryColor, options));
  }
  
  return colorCache.get(cacheKey);
}
```

### 设计层面

4. **文化差异**：不同文化对颜色的感知和偏好不同，需要考虑目标用户群体
5. **品牌一致性**：确保生成的颜色与品牌形象保持一致
6. **色彩数量控制**：避免在单个界面中使用过多颜色变体，保持简洁

### 无障碍性

7. **对比度检查**：始终检查生成颜色的对比度是否符合WCAG标准
8. **色盲友好**：考虑色盲用户，不要仅依赖颜色传达信息

```javascript
// 对比度检查示例
function checkContrast(backgroundColor, textColor) {
  // 简化的对比度计算（实际应用中建议使用专业库）
  const bgLuminance = getLuminance(backgroundColor);
  const textLuminance = getLuminance(textColor);
  
  const contrast = (Math.max(bgLuminance, textLuminance) + 0.05) / 
                   (Math.min(bgLuminance, textLuminance) + 0.05);
  
  return {
    ratio: contrast,
    passAA: contrast >= 4.5,    // WCAG AA标准
    passAAA: contrast >= 7      // WCAG AAA标准
  };
}
```

### 实施建议

9. **渐进式应用**：建议先在小范围内测试新的色彩系统，再逐步推广
10. **用户反馈**：收集用户对新色彩系统的反馈，及时调整
11. **文档维护**：保持色彩系统文档的更新，便于团队协作

## 与其他功能的区别

- **generate()**：基于色彩理论的梯度算法，适合UI组件
- **线性生成**：数学线性插值，适合渐变效果
- **主题混合**：基于感知的色彩调和，适合品牌色系统
- **图片取色**：从图片中提取主色调，适合内容驱动的配色

## 常见问题

### Q: 如何选择合适的混合比例？

**A:** 混合比例的选择取决于你想要的品牌化程度：
- **5-8%**：轻微的品牌化，保持原色特性
- **10-15%**：中等程度的品牌化，平衡效果
- **15-20%**：强烈的品牌化，明显的主题色影响

### Q: 三种混合模式有什么区别？

**A:** 
- **lab (默认)**：在 CIE Lab 色彩空间中进行线性混合，这是最平衡的选择，能保持感知上的平滑过渡
- **hct**：HCT 线性混合，分别对色相、彩度、明度进行线性插值，适合需要精确控制各属性的场景
- **hue-only**：仅混合色相，保持原始色彩的彩度和明度，适合保持语义色辨识度的场景

### Q: 如何选择混合模式？

**A:** 
- 大多数情况下使用默认的 `lab` 模式即可
- 如果希望语义色保持更高的辨识度，使用 `hue-only` 模式
- 如果需要更细致地控制色彩变化，使用 `hct` 模式

## 更新日志

### v2.0.0 (最新)

- **新增** CIE Lab 色彩空间支持，提供更精准的感知均匀混合
- **新增** 三种混合模式：`lab`、`hct`、`hue-only`
- **新增** 颜色工具函数：
  - `colorDifference()` - 计算两个颜色之间的 Delta E 感知差异
  - `adjustTone()` - 调整颜色明度
  - `adjustChroma()` - 调整颜色彩度
  - `adjustHue()` / `rotateHue()` - 调整/旋转色相
- **新增** 色彩和谐函数：
  - `getComplementary()` - 获取互补色
  - `getTriadic()` - 获取三角配色
  - `getSplitComplementary()` - 获取分裂互补色
  - `getAnalogous()` - 获取类似色
- **改进** HCT 转换精度，Delta E 误差趋近于 0
- **改进** 主题色生成的感知均匀性