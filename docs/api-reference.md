# API 参考文档

> 🤖 此文档由 `npm run docs:generate` 自动生成，请勿手动编辑

> 最后更新时间: 2025/11/25 21:21:09

## 目录

- [色板生成](#色板生成)
  - [`generate`](#generate)
- [工具函数](#工具函数)
  - [`getRgbStr`](#getrgbstr)
  - [`getColorString`](#getcolorstring)
- [线性颜色生成](#线性颜色生成)
  - [`generateLinear`](#generatelinear)
  - [`generateGrayLinear`](#generategraylinear)
  - [`generateMonochromeLinear`](#generatemonochromelinear)
  - [`generateLinearHSL`](#generatelinearhsl)
- [图片取色](#图片取色)
  - [`extractColorFromImage`](#extractcolorfromimage)
  - [`extractColorFromFile`](#extractcolorfromfile)
- [主题混合 (HCT)](#主题混合-hct)
  - [`rgbToHct`](#rgbtohct)
  - [`hctToRgb`](#hcttorgb)
  - [`blendInHct`](#blendinhct)
  - [`colorDifference`](#colordifference)
  - [`adjustTone`](#adjusttone)
  - [`adjustChroma`](#adjustchroma)
  - [`adjustHue`](#adjusthue)
  - [`rotateHue`](#rotatehue)
  - [`getComplementary`](#getcomplementary)
  - [`getTriadic`](#gettriadic)
  - [`getSplitComplementary`](#getsplitcomplementary)
  - [`getAnalogous`](#getanalogous)
  - [`harmonizeColor`](#harmonizecolor)
  - [`generateThemeVariants`](#generatethemevariants)
  - [`blendUIColors`](#blenduicolors)
  - [`generateControlColors`](#generatecontrolcolors)
  - [`generateSemanticColors`](#generatesemanticcolors)
  - [`generateThemeColors`](#generatethemecolors)
  - [`generateInterfaceColorSystem`](#generateinterfacecolorsystem)
  - [`generateThemePalette`](#generatethemepalette)
- [入口导出](#入口导出)
  - [`getPresetColors`](#getpresetcolors)
  - [`colorList`](#colorlist)

---

## 色板生成

### `generate`

**签名：**
```typescript
function generate(color, options = {})
```

---

## 工具函数

### `getRgbStr`

将颜色转换为 RGB 字符串格式（逗号分隔，无空格）

**签名：**
```typescript
function getRgbStr(color)
```

**参数：**

- `color`: `string | import('color')` - 颜色值，支持任何 color.js 支持的格式

**返回值：**

- `string` - RGB 字符串，格式如 "255,0,0"

**示例：**

```javascript
getRgbStr('#FF0000') // '255,0,0'
getRgbStr('rgb(255, 0, 0)') // '255,0,0'
```

---

### `getColorString`

**签名：**
```typescript
function getColorString(color, format)
```

---

## 线性颜色生成

### `generateLinear`

线性颜色生成器 在两个颜色之间进行线性插值，生成指定数量的颜色 特别适用于灰色系和单色调渐变

**签名：**
```typescript
function generateLinear(startColor, endColor, options = {})
```

**参数：**

- `startColor`: `string` - 起始颜色
- `endColor`: `string` - 结束颜色

**返回值：**

- `string[]` - 颜色数组

**示例：**

```javascript
import { generateLinear } from '@aviala-design/color';

// 生成从白色到黑色的10个颜色
const grayScale = generateLinear('#ffffff', '#000000', { steps: 10 });
// ['#ffffff', '#e3e3e3', '#c7c7c7', ..., '#000000']

// 生成RGB格式的渐变
const gradient = generateLinear('#ff0000', '#0000ff', { 
  steps: 5, 
  format: 'rgb' 
});
// ['rgb(255, 0, 0)', 'rgb(191, 0, 63)', ..., 'rgb(0, 0, 255)']

// 不包含端点的渐变
const middle = generateLinear('#ff0000', '#0000ff', { 
  steps: 3, 
  includeEnds: false 
});
// 只返回中间的颜色，不包含起始和结束颜色
```

---

### `generateGrayLinear`

生成灰色系线性渐变 从白色到黑色或指定的灰色范围

**签名：**
```typescript
function generateGrayLinear(options = {})
```

**返回值：**

- `string[]` - 灰色系颜色数组

**示例：**

```javascript
import { generateGrayLinear } from '@aviala-design/color';

// 生成默认灰色渐变（白到黑，10个颜色）
const grays = generateGrayLinear();
// ['#ffffff', '#e3e3e3', ..., '#000000']

// 自定义灰色范围
const customGrays = generateGrayLinear({
  startGray: '#f0f0f0',
  endGray: '#333333',
  steps: 5
});

// 生成RGB格式的灰色
const rgbGrays = generateGrayLinear({ format: 'rgb', steps: 8 });
```

---

### `generateMonochromeLinear`

生成单色调线性渐变 基于一个基础颜色，生成从浅到深的渐变

**签名：**
```typescript
function generateMonochromeLinear(baseColor, options = {})
```

**参数：**

- `baseColor`: `string` - 基础颜色

**返回值：**

- `string[]` - 单色调颜色数组

**示例：**

```javascript
import { generateMonochromeLinear } from '@aviala-design/color';

// 生成蓝色的单色调渐变
const blueShades = generateMonochromeLinear('#3491FA', { steps: 10 });
// 生成从浅蓝到深蓝的10个颜色，保持色相和饱和度

// 自定义亮度范围（基于中心扩展模式）
const customShades = generateMonochromeLinear('#ff6b6b', {
  steps: 7,
  lightnessRange: 60  // 亮度变化范围
});

// 直接指定最大和最小亮度（固定端点模式）
const fixedRange = generateMonochromeLinear('#3491FA', {
  steps: 12,
  minLightness: 10,   // 最深色接近黑色
  maxLightness: 98    // 最浅色接近白色
});
// 推荐用于需要接近纯白/纯黑的场景

// 生成HSL格式
const hslShades = generateMonochromeLinear('#00b894', {
  format: 'hsl',
  steps: 5
});
```

---

### `generateLinearHSL`

在HSL空间进行线性插值 适用于需要更自然色彩过渡的场景

**签名：**
```typescript
function generateLinearHSL(startColor, endColor, options = {})
```

**参数：**

- `startColor`: `string` - 起始颜色
- `endColor`: `string` - 结束颜色

**返回值：**

- `string[]` - 颜色数组

**示例：**

```javascript
import { generateLinearHSL } from '@aviala-design/color';

// 在 HSL 空间生成从黄色到紫色的渐变
const gradient = generateLinearHSL('#FFD700', '#9B59B6', { steps: 8 });
// 通过色相环插值，产生更自然的彩虹效果

// 包含端点值
const withEnds = generateLinearHSL('#FF6B6B', '#4ECDC4', {
  steps: 5,
  includeEnds: true
});
// 结果的第一个是 #FF6B6B，最后一个是 #4ECDC4

// 输出为 RGB 格式
const rgbGradient = generateLinearHSL('hsl(0, 100%, 50%)', 'hsl(240, 100%, 50%)', {
  steps: 6,
  format: 'rgb'
});
```

---

## 图片取色

### `extractColorFromImage`

从图片中提取主色调

**签名：**
```typescript
function extractColorFromImage(image)
```

**参数：**

- `image`: `HTMLImageElement` - 图片元素

**返回值：**

- `Promise<string>` - 提取的主色调（十六进制格式）

**示例：**

```javascript
import { extractColorFromImage } from '@aviala-design/color';

// 从已加载的图片元素提取主色调
const img = document.getElementById('myImage');
const dominantColor = await extractColorFromImage(img);
console.log(dominantColor); // '#3491FA'

// 动态创建图片并提取颜色
const img = new Image();
img.crossOrigin = 'anonymous';
img.onload = async () => {
  const color = await extractColorFromImage(img);
  document.body.style.backgroundColor = color;
};
img.src = 'https://example.com/image.jpg';
```

---

### `extractColorFromFile`

获取图片的像素数据

**签名：**
```typescript
function extractColorFromFile(file)
```

**参数：**

- `image`: `HTMLImageElement` - 图片元素

**返回值：**

- `Promise<ImageData>` - 图片的像素数据

---

## 主题混合 (HCT)

### `rgbToHct`

主题色混合模块 基于 Material Design 3 的 HCT 颜色空间实现颜色混合和调和 HCT (Hue, Chroma, Tone) 颜色空间结合了 CAM16 和 CIE-Lab 的优势： - H (Hue): 色相，0-360度（使用 Lab 空间计算） - C (Chroma): 色度，颜色的鲜艳程度（使用 Lab 空间计算） - T (Tone): 色调/亮度，CIE L* 值 (0-100) 本实现使用 CIE Lab 颜色空间近似 HCT，提供准确的感知一致性

**签名：**
```typescript
function rgbToHct(rgb)
```

---

### `hctToRgb`

将 HCT 颜色转换为 RGB 使用 CIE Lab 颜色空间作为中间转换

**签名：**
```typescript
function hctToRgb(hct, options = {})
```

**参数：**

- `hct`: `HCT` - HCT 颜色对象 {h, c, t}

**返回值：**

- `string` - RGB 颜色值，格式如 "#ff0000"

**示例：**

```javascript
import { hctToRgb } from '@aviala-design/color';

// 从 HCT 颜色空间转回 RGB
const rgb = hctToRgb({ h: 278.7, c: 60.7, t: 59.8 });
console.log(rgb); // '#3491fa'

// 在 HCT 空间调整颜色后转换
const hct = { h: 120, c: 50, t: 70 };
const rgb = hctToRgb(hct);
document.body.style.backgroundColor = rgb;
```

---

### `blendInHct`

在 HCT 颜色空间中混合两种颜色 支持多种混合模式：Lab 空间混合（默认）、HCT 线性混合、色相混合

**签名：**
```typescript
function blendInHct(color1, color2, ratio = 0.5, options = {})
```

**参数：**

- `color1`: `string` - 第一种颜色 (RGB)
- `color2`: `string` - 第二种颜色 (RGB)
- `ratio`: `number` - 混合比例，0-1，0表示完全是color1，1表示完全是color2

**返回值：**

- `string` - 混合后的颜色 (RGB)

**示例：**

```javascript
import { blendInHct } from '@aviala-design/color';

// 混合品牌色和背景色（默认 Lab 空间混合）
const blended = blendInHct('#3491FA', '#FFFFFF', 0.3);

// 使用 HCT 线性混合
const blended = blendInHct('#FF0000', '#0000FF', 0.5, { mode: 'hct' });

// 只混合色相，保持第一个颜色的色度和明度
const blended = blendInHct('#FF0000', '#0000FF', 0.5, { mode: 'hue-only' });
```

---

### `colorDifference`

在 Lab 颜色空间中混合两种颜色 提供最感知一致的混合结果

**签名：**
```typescript
function colorDifference(color1, color2)
```

**参数：**

- `color1`: `string` - 第一种颜色 (RGB)
- `color2`: `string` - 第二种颜色 (RGB)
- `ratio`: `number` - 混合比例

**返回值：**

- `string` - 混合后的颜色 (RGB)

---

### `adjustTone`

调整颜色的明度（Tone）

**签名：**
```typescript
function adjustTone(color, tone)
```

**参数：**

- `color`: `string` - 输入颜色 (RGB)
- `tone`: `number` - 目标明度 (0-100)

**返回值：**

- `string` - 调整后的颜色 (RGB)

**示例：**

```javascript
import { adjustTone } from '@aviala-design/color';

// 将颜色调整到 80% 明度
const lighter = adjustTone('#3491FA', 80);
```

---

### `adjustChroma`

调整颜色的色度（Chroma）

**签名：**
```typescript
function adjustChroma(color, chroma)
```

**参数：**

- `color`: `string` - 输入颜色 (RGB)
- `chroma`: `number` - 目标色度

**返回值：**

- `string` - 调整后的颜色 (RGB)

**示例：**

```javascript
import { adjustChroma } from '@aviala-design/color';

// 降低颜色鲜艳度
const muted = adjustChroma('#FF0000', 30);
```

---

### `adjustHue`

调整颜色的色相（Hue）

**签名：**
```typescript
function adjustHue(color, hue)
```

**参数：**

- `color`: `string` - 输入颜色 (RGB)
- `hue`: `number` - 目标色相 (0-360)

**返回值：**

- `string` - 调整后的颜色 (RGB)

**示例：**

```javascript
import { adjustHue } from '@aviala-design/color';

// 将色相旋转到 120 度（绿色区域）
const green = adjustHue('#FF0000', 120);
```

---

### `rotateHue`

旋转颜色的色相

**签名：**
```typescript
function rotateHue(color, degrees)
```

**参数：**

- `color`: `string` - 输入颜色 (RGB)
- `degrees`: `number` - 旋转角度（可正可负）

**返回值：**

- `string` - 旋转后的颜色 (RGB)

**示例：**

```javascript
import { rotateHue } from '@aviala-design/color';

// 色相顺时针旋转 30 度
const rotated = rotateHue('#FF0000', 30);

// 色相逆时针旋转 45 度
const rotatedBack = rotateHue('#FF0000', -45);
```

---

### `getComplementary`

获取颜色的互补色

**签名：**
```typescript
function getComplementary(color)
```

**参数：**

- `color`: `string` - 输入颜色 (RGB)

**返回值：**

- `string` - 互补色 (RGB)

**示例：**

```javascript
import { getComplementary } from '@aviala-design/color';

const complement = getComplementary('#FF0000'); // 青色
```

---

### `getTriadic`

获取颜色的三角配色

**签名：**
```typescript
function getTriadic(color)
```

**参数：**

- `color`: `string` - 输入颜色 (RGB)

**返回值：**

- `[string, string, string]` - 三个颜色的数组

**示例：**

```javascript
import { getTriadic } from '@aviala-design/color';

const [c1, c2, c3] = getTriadic('#FF0000');
```

---

### `getSplitComplementary`

获取颜色的分裂互补色

**签名：**
```typescript
function getSplitComplementary(color, angle = 30)
```

**参数：**

- `color`: `string` - 输入颜色 (RGB)
- `angle` (可选): `number` - =30] - 分裂角度

**返回值：**

- `[string, string, string]` - 三个颜色的数组

**示例：**

```javascript
import { getSplitComplementary } from '@aviala-design/color';

const [c1, c2, c3] = getSplitComplementary('#FF0000');
```

---

### `getAnalogous`

获取颜色的类似色

**签名：**
```typescript
function getAnalogous(color, count = 3, angle = 30)
```

**参数：**

- `color`: `string` - 输入颜色 (RGB)
- `count` (可选): `number` - =3] - 颜色数量
- `angle` (可选): `number` - =30] - 每个颜色之间的角度

**返回值：**

- `string[]` - 类似色数组

**示例：**

```javascript
import { getAnalogous } from '@aviala-design/color';

const analogous = getAnalogous('#FF0000', 5, 15);
```

---

### `harmonizeColor`

颜色调和 - 让目标颜色向主题色的色相靠拢 使用 Lab 空间计算，保持感知一致性

**签名：**
```typescript
function harmonizeColor(themeColor, targetColor, harmonizeRatio = 0.15)
```

**参数：**

- `themeColor`: `string` - 主题色 (RGB)
- `targetColor`: `string` - 目标颜色 (RGB)
- `harmonizeRatio`: `number` - 调和强度，0-1，0表示不调和，1表示完全采用主题色的色相

**返回值：**

- `string` - 调和后的颜色 (RGB)

**示例：**

```javascript
import { harmonizeColor } from '@aviala-design/color';

// 让错误色与品牌色保持和谐
const themeColor = '#3491FA';  // 蓝色主题
const errorColor = '#FF0000';  // 红色
const harmonized = harmonizeColor(themeColor, errorColor, 0.15);
// 错误色会带有一点蓝色调，与主题更协调

// 调和语义色系
const primaryColor = '#6200EE';
const success = harmonizeColor(primaryColor, '#4CAF50');
const warning = harmonizeColor(primaryColor, '#FF9800');
const error = harmonizeColor(primaryColor, '#F44336');
```

---

### `generateThemeVariants`

生成主题色变体 - 基于主题色生成不同明度的颜色变体

**签名：**
```typescript
function generateThemeVariants(themeColor, options)
```

**参数：**

- `themeColor`: `string` - 主题色 (RGB)

**返回值：**

- `string[]` - 主题色变体数组

**示例：**

```javascript
import { generateThemeVariants } from '@aviala-design/color';

// 生成默认的色调变体
const variants = generateThemeVariants('#3491FA');
// 返回 9 个色调的变体 (10, 20, 30, ..., 90)

// 自定义色调值
const customVariants = generateThemeVariants('#FF5722', {
  tones: [20, 40, 60, 80, 95]
});

// 数组形式传参
const variants = generateThemeVariants('#6200EE', [30, 50, 70]);
```

---

### `blendUIColors`

UI 元素颜色混合 - 为按钮、卡片等 UI 元素生成主题化颜色

**签名：**
```typescript
function blendUIColors(themeColor, uiColors, blendRatio = 0.2)
```

**参数：**

- `themeColor`: `string` - 主题色
- `blendRatio` (可选): `number` - 混合强度

**返回值：**

- `{[key: string]: string` - } 混合后的 UI 颜色对象

**示例：**

```javascript
import { blendUIColors } from '@aviala-design/color';

// 为 UI 元素注入品牌色
const brandColor = '#3491FA';
const uiColors = {
  button: '#E0E0E0',
  card: '#F5F5F5',
  input: '#FFFFFF'
};
const themed = blendUIColors(brandColor, uiColors, 0.1);
// 所有 UI 颜色会带有品牌色调

// 创建主题化组件色板
const result = blendUIColors('#6200EE', {
  surface: '#FFFFFF',
  background: '#F5F5F5',
  divider: '#E0E0E0'
});
```

---

### `generateControlColors`

**签名：**
```typescript
function generateControlColors(themeColor, options = {})
```

---

### `generateSemanticColors`

**签名：**
```typescript
function generateSemanticColors(themeColor, options = {})
```

---

### `generateThemeColors`

**签名：**
```typescript
function generateThemeColors(themeColor, options = {})
```

---

### `generateInterfaceColorSystem`

**签名：**
```typescript
function generateInterfaceColorSystem(themeColor, options = {})
```

---

### `generateThemePalette`

**签名：**
```typescript
function generateThemePalette(themeColor, options = {})
```

---

## 入口导出

### `getPresetColors`

预设颜色常量 包含 13 种常用的品牌色和语义色

**签名：**
```typescript
function getPresetColors()
```

**示例：**

```javascript
import { colorList } from '@aviala-design/color';

// 使用预设颜色
console.log(colorList.blue); // '#3491FA'
console.log(colorList.green); // '#00B42A'
```

---

### `colorList`

预设颜色常量 包含 13 种常用的品牌色和语义色

**签名：**
```typescript
const colorList: {
 *   red: string,
 *   orangered: string,
 *   orange: string,
 *   gold: string,
 *   yellow: string,
 *   lime: string,
 *   green: string,
 *   cyan: string,
 *   blue: string,
 *   arcoblue: string,
 *   purple: string,
 *   pinkpurple: string,
 *   magenta: string
 * 
```

**返回值：**

- `{
 *   red: string,
 *   orangered: string,
 *   orange: string,
 *   gold: string,
 *   yellow: string,
 *   lime: string,
 *   green: string,
 *   cyan: string,
 *   blue: string,
 *   arcoblue: string,
 *   purple: string,
 *   pinkpurple: string,
 *   magenta: string
 * `

**示例：**

```javascript
import { colorList } from '@aviala-design/color';

// 使用预设颜色
console.log(colorList.blue); // '#3491FA'
console.log(colorList.green); // '#00B42A'
```

---


## 注意事项

- 本文档基于源代码中的 JSDoc 注释自动生成
- 如需更新文档，请修改源代码中的 JSDoc 注释后运行 `npm run docs:generate`
- 完整示例和教程请参考 `/docs` 目录下的其他文档
