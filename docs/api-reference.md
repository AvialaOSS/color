# API 参考文档

本文档提供了 Aviala Design Color 库的完整 API 参考。

## 目录

- [核心函数](#核心函数)
  - [generate](#generate)
  - [getPresetColors](#getpresetcolors)
  - [getRgbStr](#getrgbstr)
- [线性颜色生成](#线性颜色生成)
  - [generateLinear](#generatelinear)
  - [generateGrayLinear](#generategraylinear)
  - [generateMonochromeLinear](#generatemonochromelinear)
  - [generateLinearHSL](#generatelinearhsl)
- [图片取色](#图片取色)
  - [extractColorFromImage](#extractcolorfromimage)
  - [extractColorFromFile](#extractcolorfromfile)
- [主题混合](#主题混合)
  - [rgbToHct](#rgbtohct)
  - [hctToRgb](#hcttorgb)
  - [blendInHct](#blendinhct)
  - [harmonizeColor](#harmonizecolor)
  - [generateThemeVariants](#generatethemevariants)
  - [blendUIColors](#blenduicolors)
  - [generateThemePalette](#generatethemepalette)
- [类型定义](#类型定义)
- [错误处理](#错误处理)

## 核心函数

### generate

基于基础颜色生成色盘的核心函数。

```typescript
function generate(color: string, options?: GenerateOptions): string | string[]
```

**参数：**
- `color`: string - 基础颜色，支持十六进制格式（如 '#FF5733'）
- `options`: GenerateOptions - 可选配置项

**GenerateOptions 接口：**
```typescript
interface GenerateOptions {
  index?: number;     // 指定返回色盘中的第几个颜色，范围1-10，默认为6
  dark?: boolean;     // 是否生成暗色模式的色盘，默认为false
  list?: boolean;     // 是否返回完整色盘列表，默认为false
  format?: 'hex' | 'rgb' | 'hsl'; // 返回颜色的格式，默认为'hex'
}
```

**返回值：**
- 当 `list` 为 true 时，返回 `string[]` - 包含10个颜色的数组
- 当 `list` 为 false 时，返回 `string` - 指定索引位置的单个颜色

**示例：**
```javascript
import { generate } from '@aviala-design/color';

// 获取基础颜色（索引6）
const baseColor = generate('#165DFF');
console.log(baseColor); // '#165DFF'

// 获取完整色盘
const palette = generate('#165DFF', { list: true });
console.log(palette); // ['#E8F3FF', '#BEDAFF', ...]

// 获取暗色模式色盘
const darkPalette = generate('#165DFF', { list: true, dark: true });

// 获取特定索引的颜色
const lightColor = generate('#165DFF', { index: 3 });
const darkColor = generate('#165DFF', { index: 8 });

// 获取RGB格式的颜色
const rgbColor = generate('#165DFF', { format: 'rgb' });
console.log(rgbColor); // 'rgb(22, 93, 255)'
```

### getPresetColors

获取预设的14种颜色色盘。

```typescript
function getPresetColors(): PresetColors
```

**返回值：**
```typescript
interface PresetColors {
  [colorName: string]: {
    light: string[];    // 亮色模式色盘（10个颜色）
    dark: string[];     // 暗色模式色盘（10个颜色）
    primary: string;    // 主色调
  }
}
```

**预设颜色列表：**
- `red` - 红色系
- `orangered` - 橙红色系
- `orange` - 橙色系
- `gold` - 金色系
- `yellow` - 黄色系
- `lime` - 青柠色系
- `green` - 绿色系
- `cyan` - 青色系
- `blue` - 蓝色系
- `arcoblue` - Arco蓝色系
- `purple` - 紫色系
- `pinkpurple` - 粉紫色系
- `magenta` - 品红色系
- `gray` - 灰色系

**示例：**
```javascript
import { getPresetColors } from '@aviala-design/color';

const colors = getPresetColors();

// 获取红色系色盘
console.log(colors.red.light);   // 亮色模式红色色盘
console.log(colors.red.dark);    // 暗色模式红色色盘
console.log(colors.red.primary); // 红色主色调 '#F53F3F'

// 遍历所有预设颜色
Object.entries(colors).forEach(([name, colorSet]) => {
  console.log(`${name}: ${colorSet.primary}`);
});
```

### getRgbStr

将颜色转换为RGB字符串格式。

```typescript
function getRgbStr(color: string): string
```

**参数：**
- `color`: string - 颜色值，支持十六进制格式

**返回值：**
- `string` - RGB值的字符串表示，格式为 "r,g,b"

**示例：**
```javascript
import { getRgbStr } from '@aviala-design/color';

const rgbString = getRgbStr('#F53F3F');
console.log(rgbString); // '245,63,63'

const rgbString2 = getRgbStr('#165DFF');
console.log(rgbString2); // '22,93,255'
```

## 线性颜色生成

### generateLinear

在两个颜色之间进行线性插值。

```typescript
function generateLinear(
  startColor: string, 
  endColor: string, 
  options?: LinearOptions
): string[]
```

**参数：**
- `startColor`: string - 起始颜色
- `endColor`: string - 结束颜色
- `options`: LinearOptions - 可选配置项

**LinearOptions 接口：**
```typescript
interface LinearOptions {
  steps?: number;        // 生成的颜色数量，默认为10
  includeEnds?: boolean; // 是否包含端点颜色，默认为true
  format?: 'hex' | 'rgb' | 'hsl'; // 返回颜色的格式，默认为'hex'
}
```

**示例：**
```javascript
import { generateLinear } from '@aviala-design/color';

// 基础用法
const colors = generateLinear('#ff0000', '#0000ff');
console.log(colors); // 从红色到蓝色的10个颜色

// 自定义步数
const colors5 = generateLinear('#ff0000', '#0000ff', { steps: 5 });

// 不包含端点
const middleColors = generateLinear('#ff0000', '#0000ff', {
  steps: 8,
  includeEnds: false
});

// RGB格式输出
const rgbColors = generateLinear('#ff0000', '#0000ff', {
  format: 'rgb'
});
```

### generateGrayLinear

生成灰色系线性渐变。

```typescript
function generateGrayLinear(options?: GrayLinearOptions): string[]
```

**GrayLinearOptions 接口：**
```typescript
interface GrayLinearOptions {
  startGray?: string;    // 起始灰色，默认为'#ffffff'
  endGray?: string;      // 结束灰色，默认为'#000000'
  steps?: number;        // 生成的颜色数量，默认为10
  includeEnds?: boolean; // 是否包含端点颜色，默认为true
  format?: 'hex' | 'rgb' | 'hsl'; // 返回颜色的格式，默认为'hex'
}
```

**示例：**
```javascript
import { generateGrayLinear } from '@aviala-design/color';

// 标准灰色系（白到黑）
const grayScale = generateGrayLinear();

// 自定义灰色范围
const customGray = generateGrayLinear({
  startGray: '#f0f0f0',
  endGray: '#333333',
  steps: 8
});
```

### generateMonochromeLinear

生成单色调线性渐变。

```typescript
function generateMonochromeLinear(
  baseColor: string, 
  options?: MonochromeLinearOptions
): string[]
```

**MonochromeLinearOptions 接口：**
```typescript
interface MonochromeLinearOptions {
  steps?: number;        // 生成的颜色数量，默认为10
  lightnessRange?: [number, number]; // 明度范围，默认为[0.1, 0.9]
  includeEnds?: boolean; // 是否包含端点颜色，默认为true
  format?: 'hex' | 'rgb' | 'hsl'; // 返回颜色的格式，默认为'hex'
}
```

**示例：**
```javascript
import { generateMonochromeLinear } from '@aviala-design/color';

// 基础单色调渐变
const monoColors = generateMonochromeLinear('#165DFF');

// 自定义明度范围
const customMono = generateMonochromeLinear('#165DFF', {
  lightnessRange: [0.2, 0.8],
  steps: 8
});
```

### generateLinearHSL

在HSL颜色空间中进行线性插值。

```typescript
function generateLinearHSL(
  startColor: string, 
  endColor: string, 
  options?: LinearOptions
): string[]
```

**参数和选项与 generateLinear 相同**

**示例：**
```javascript
import { generateLinearHSL } from '@aviala-design/color';

// HSL空间插值
const hslColors = generateLinearHSL('#ff0000', '#00ff00');

// 色相环渐变
const hueGradient = generateLinearHSL('#ff0000', '#ff0000', {
  steps: 12 // 生成色相环
});
```

## 图片取色

### extractColorFromImage

从已加载的图片元素中提取主色调。

```typescript
function extractColorFromImage(image: HTMLImageElement): Promise<string>
```

**参数：**
- `image`: HTMLImageElement - 已加载的图片元素

**返回值：**
- `Promise<string>` - 提取的主色调（十六进制格式）

**示例：**
```javascript
import { extractColorFromImage } from '@aviala-design/color';

const imageElement = document.getElementById('myImage');

imageElement.onload = async () => {
  try {
    const dominantColor = await extractColorFromImage(imageElement);
    console.log('主色调:', dominantColor); // '#FF5733'
  } catch (error) {
    console.error('提取失败:', error);
  }
};
```

### extractColorFromFile

从文件对象中读取图片并提取主色调。

```typescript
function extractColorFromFile(file: File): Promise<string>
```

**参数：**
- `file`: File - 图片文件对象

**返回值：**
- `Promise<string>` - 提取的主色调（十六进制格式）

**示例：**
```javascript
import { extractColorFromFile } from '@aviala-design/color';

const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const dominantColor = await extractColorFromFile(file);
      console.log('提取的主色调:', dominantColor);
    } catch (error) {
      console.error('提取失败:', error);
    }
  }
});
```

## 主题混合

### rgbToHct

将RGB颜色转换为HCT色彩空间。

```typescript
function rgbToHct(color: string): HCTColor
```

**参数：**
- `color`: string - RGB颜色值（支持hex、rgb格式）

**返回值：**
- `HCTColor` - HCT色彩空间对象 `{ h: number, c: number, t: number }`

**示例：**
```javascript
import { rgbToHct } from '@aviala-design/color';

const hct = rgbToHct('#165DFF');
console.log(hct); // { h: 225, c: 87, t: 64 }
```

### hctToRgb

将HCT色彩空间转换为RGB颜色。

```typescript
function hctToRgb(hct: HCTColor): string
```

**参数：**
- `hct`: HCTColor - HCT色彩空间对象

**返回值：**
- `string` - 十六进制颜色值

**示例：**
```javascript
import { hctToRgb } from '@aviala-design/color';

const rgb = hctToRgb({ h: 225, c: 87, t: 64 });
console.log(rgb); // '#165DFF'
```

### blendInHct

在HCT色彩空间中混合两种颜色。

```typescript
function blendInHct(
  color1: string, 
  color2: string, 
  ratio: number
): string
```

**参数：**
- `color1`: string - 第一种颜色
- `color2`: string - 第二种颜色
- `ratio`: number - 混合比例（0-1）

**返回值：**
- `string` - 混合后的颜色

**示例：**
```javascript
import { blendInHct } from '@aviala-design/color';

const blended = blendInHct('#165DFF', '#F53F3F', 0.5);
console.log(blended); // 混合后的颜色
```

### harmonizeColor

将目标色向主题色调和。

```typescript
function harmonizeColor(
  themeColor: string, 
  targetColor: string, 
  ratio: number
): string
```

**参数：**
- `themeColor`: string - 主题色
- `targetColor`: string - 目标色
- `ratio`: number - 调和比例（0-1）

**返回值：**
- `string` - 调和后的颜色

**示例：**
```javascript
import { harmonizeColor } from '@aviala-design/color';

const harmonized = harmonizeColor('#165DFF', '#F53F3F', 0.15);
console.log(harmonized); // 调和后的错误色
```

### generateThemeVariants

基于主题色生成明度变体。

```typescript
function generateThemeVariants(
  themeColor: string, 
  options?: ThemeVariantsOptions
): string[]
```

**参数：**
- `themeColor`: string - 主题色
- `options`: ThemeVariantsOptions - 可选配置

**返回值：**
- `string[]` - 主题变体数组

**示例：**
```javascript
import { generateThemeVariants } from '@aviala-design/color';

const variants = generateThemeVariants('#165DFF');
console.log(variants); // ['#f0f5ff', '#d6e4ff', ...]
```



### blendUIColors

将主题色混合到界面色中。

```typescript
function blendUIColors(
  themeColor: string, 
  uiColors: Record<string, string>, 
  ratio: number
): Record<string, string>
```

**参数：**
- `themeColor`: string - 主题色
- `uiColors`: Record<string, string> - 界面色对象
- `ratio`: number - 混合比例（0-1）

**返回值：**
- `Record<string, string>` - 混合后的界面色对象

**示例：**
```javascript
import { blendUIColors } from '@aviala-design/color';

const uiColors = {
  background: '#FFFFFF',
  surface: '#F7F8FA',
  border: '#E5E6EB'
};

const blended = blendUIColors('#165DFF', uiColors, 0.05);
```

### generateInterfaceColorSystem

生成完整的界面色彩系统，包含控件色、语义色和主题色。

```typescript
function generateInterfaceColorSystem(
  themeColor: string, 
  options?: InterfaceColorSystemOptions
): InterfaceColorSystem
```

**参数：**
- `themeColor`: string - 主题色
- `options`: InterfaceColorSystemOptions - 可选配置

**InterfaceColorSystemOptions 接口：**
```typescript
interface InterfaceColorSystemOptions {
  baseGray?: string;              // 基础灰色，默认 '#666666'
  isDark?: boolean;               // 是否为暗色模式，默认 false
  semanticColors?: Record<string, string>; // 自定义语义色
  controlBlendRatio?: number;     // 控件色混合比例，默认 0.08
  semanticBlendRatio?: number;    // 语义色混合比例，默认 0.12
}
```

**返回值：**
- `InterfaceColorSystem` - 界面色彩系统对象

**InterfaceColorSystem 接口：**
```typescript
interface InterfaceColorSystem {
  controls: Record<string, string>;  // 控件色 (gray-1 到 gray-12)
  semantic: Record<string, string>;  // 语义色 (success-1 到 success-10, warning-1 到 warning-10, 等)
  theme: Record<string, string>;     // 主题色 (theme-1 到 theme-10)
}
```

**示例：**
```javascript
import { generateInterfaceColorSystem } from '@aviala-design/color';

// 基础用法
const colorSystem = generateInterfaceColorSystem('#165DFF');

// 自定义语义色
const customSystem = generateInterfaceColorSystem('#165DFF', {
  semanticColors: {
    success: '#00b96b',
    warning: '#faad14',
    error: '#ff7875',
    info: '#1890ff'
  },
  isDark: false
});

console.log(customSystem);
/*
{
  controls: {
    'gray-1': '#ffffff',
    'gray-2': '#fafafa',
    // ... gray-3 到 gray-12
  },
  semantic: {
    'success-1': '#f6ffed',
    'success-2': '#d9f7be',
    // ... success-3 到 success-10
    'warning-1': '#fffbe6',
    // ... 其他语义色
  },
  theme: {
    'theme-1': '#f0f5ff',
    'theme-2': '#d6e4ff',
    // ... theme-3 到 theme-10
  }
}
*/
```

### generateThemePalette

生成完整的主题色板。

```typescript
function generateThemePalette(
  themeColor: string, 
  options?: ThemePaletteOptions
): ThemePalette
```

**参数：**
- `themeColor`: string - 主题色
- `options`: ThemePaletteOptions - 可选配置

**返回值：**
- `ThemePalette` - 完整主题色板对象

**示例：**
```javascript
import { generateThemePalette } from '@aviala-design/color';

const palette = generateThemePalette('#165DFF');
console.log(palette);
/*
{
  theme: '#165DFF',
  variants: ['#f0f5ff', '#d6e4ff', ...],
  semantic: { success: '...', warning: '...', error: '...' },
  ui: { background: '...', surface: '...', border: '...' }
}
*/
```

## 类型定义

```typescript
// 颜色格式类型
type ColorFormat = 'hex' | 'rgb' | 'hsl';

// 生成选项
interface GenerateOptions {
  index?: number;
  dark?: boolean;
  list?: boolean;
  format?: ColorFormat;
}

// 线性插值选项
interface LinearOptions {
  steps?: number;
  includeEnds?: boolean;
  format?: ColorFormat;
}

// 灰色线性选项
interface GrayLinearOptions extends LinearOptions {
  startGray?: string;
  endGray?: string;
}

// 单色调线性选项
interface MonochromeLinearOptions extends LinearOptions {
  lightnessRange?: [number, number];
}

// 预设颜色集合
interface ColorSet {
  light: string[];
  dark: string[];
  primary: string;
}

interface PresetColors {
  [colorName: string]: ColorSet;
}

// HCT色彩空间
interface HCTColor {
  h: number; // 色相 (0-360)
  c: number; // 饱和度 (0-150+)
  t: number; // 明度 (0-100)
}

// 主题变体选项
interface ThemeVariantsOptions {
  tones?: number[]; // 自定义明度值，默认 [10, 20, 30, 40, 50, 60, 70, 80, 90]
}

// 主题色板选项
interface ThemePaletteOptions {
  semanticColors?: Record<string, string>; // 自定义语义色
  uiColors?: Record<string, string>;       // 自定义界面色
  harmonizeRatio?: number;                 // 调和比例 (0-1)，默认 0.15
  blendRatio?: number;                     // 混合比例 (0-1)，默认 0.05
  generateVariants?: boolean;              // 是否生成变体，默认 true
  tones?: number[];                        // 自定义明度值
}

// 主题色板结果
interface ThemePalette {
  theme: string;                           // 主题色
  variants?: string[];                     // 主题变体
  semantic: Record<string, string>;       // 语义色
  ui: Record<string, string>;             // 界面色
}

// 界面色彩系统选项
interface InterfaceColorSystemOptions {
  baseGray?: string;                       // 基础灰色，默认 '#666666'
  isDark?: boolean;                        // 是否为暗色模式，默认 false
  semanticColors?: Record<string, string>; // 自定义语义色
  controlBlendRatio?: number;              // 控件色混合比例，默认 0.08
  semanticBlendRatio?: number;             // 语义色混合比例，默认 0.12
}

// 界面色彩系统结果
interface InterfaceColorSystem {
  controls: Record<string, string>;       // 控件色 (gray-1 到 gray-12)
  semantic: Record<string, string>;       // 语义色 (success-1 到 success-10, warning-1 到 warning-10, 等)
  theme: Record<string, string>;          // 主题色 (theme-1 到 theme-10)
}
```

## 错误处理

库中的函数可能抛出以下类型的错误：

### 颜色解析错误
```javascript
try {
  const colors = generate('invalid-color');
} catch (error) {
  console.error('无效的颜色格式:', error.message);
}
```

### 图片处理错误
```javascript
try {
  const color = await extractColorFromFile(file);
} catch (error) {
  if (error.message.includes('请选择图片文件')) {
    console.error('文件类型错误');
  } else if (error.message.includes('图片加载失败')) {
    console.error('图片损坏或格式不支持');
  } else {
    console.error('处理失败:', error.message);
  }
}
```

### 参数验证错误
```javascript
try {
  const colors = generateLinear('#ff0000', '#0000ff', { steps: -1 });
} catch (error) {
  console.error('参数错误:', error.message);
}
```

## 最佳实践

1. **颜色格式一致性**：在项目中保持颜色格式的一致性，建议使用十六进制格式作为标准。

2. **错误处理**：始终使用 try-catch 包装异步操作，特别是图片处理功能。

3. **性能优化**：对于大量颜色生成操作，考虑使用缓存机制。

4. **可访问性**：生成的颜色应确保足够的对比度，特别是在UI设计中。

5. **色盘使用**：在设计系统中，建议使用预设色盘作为基础，确保品牌一致性。