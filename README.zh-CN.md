# ArcoDesign Color

Aviala Design Color - 一个强大的颜色处理工具库。

## 功能概述

本库提供四大核心功能：

1. **色盘生成**：根据给定颜色通过算法生成包含十个颜色的梯度色板，支持亮色模式和暗色模式。
2. **图片取色**：从图片中提取主色调，可用于生成与图片匹配的调色板或主题色。
3. **界面色彩系统**：基于主色生成完整的界面色彩系统，包括语义色彩（成功、警告、错误、信息）。
4. **主题混合**：基于 HCT 色彩空间的高级主题混合功能，支持多种混合模式。

## 安装

```bash
npm install @aviala-design/color```

## 基本使用

```js
import { 
  generate, 
  getPresetColors, 
  getRgbStr, 
  extractColorFromImage,
  generateInterfaceColorSystem,
  blendInHct,
  rgbToHct,
  hctToRgb
} from '@aviala-design/color';

// 生成色盘
const colorPalette = generate('#3491FA', { list: true });
console.log(colorPalette); // 返回包含10个颜色的数组

// 使用预设颜色
const { red, blue, arcoblue } = getPresetColors();
console.log(red.light); // 亮色模式下的红色色盘
console.log(blue.dark); // 暗色模式下的蓝色色盘
console.log(arcoblue.primary); // arco蓝的主色

// 获取RGB字符串
const rgbStr = getRgbStr('#F53F3F');
console.log(rgbStr); // 245,63,63

// 生成界面色彩系统
const colorSystem = generateInterfaceColorSystem('#3491FA');
console.log(colorSystem.success); // 成功色
console.log(colorSystem.warning); // 警告色
console.log(colorSystem.error); // 错误色
console.log(colorSystem.info); // 信息色

// 主题混合
const blended = blendInHct([64, 196, 255], [255, 87, 34], 'overlay', 0.5);
console.log(blended); // 混合后的RGB颜色
```

## API 详解

### 色盘生成功能

#### generate(color: string, options?: Object)

基于基础颜色生成色盘。

**参数：**
- `color`: string - 基础颜色，支持十六进制格式（如 '#FF5733'）
- `options`: Object - 可选配置项
  - `index`: number - 指定返回色盘中的第几个颜色，范围1-10，默认为6（基础颜色）
  - `dark`: boolean - 是否生成暗色模式的色盘，默认为false
  - `list`: boolean - 是否返回完整色盘列表，默认为false
  - `format`: string - 返回颜色的格式，可选值：'hex'（默认）、'rgb'、'hsl'

**返回值：**
- 当 `list` 为 true 时，返回 `string[]` - 包含10个颜色的数组
- 当 `list` 为 false 时，返回 `string` - 指定索引位置的单个颜色

**示例：**

```js
// 生成单个颜色
const baseColor = '#3491FA';
const color = generate(baseColor); // 返回基础颜色本身

// 生成亮色模式下的第3个颜色
const lightColor = generate(baseColor, { index: 3 });

// 生成暗色模式下的色盘
const darkPalette = generate(baseColor, { dark: true, list: true });

// 以RGB格式返回颜色
const rgbColor = generate(baseColor, { format: 'rgb' });
```

#### getPresetColors()

获取预设的14组颜色，包括一组中性灰。

**返回值：**
包含以下颜色的对象：
* `red` - 红色
* `orangered` - 橙红色
* `orange` - 橙色
* `gold` - 金色
* `yellow` - 黄色
* `lime` - 青柠色
* `green` - 绿色
* `cyan` - 青色
* `blue` - 蓝色
* `arcoblue` - arco蓝
* `purple` - 紫色
* `pinkpurple` - 粉紫色
* `magenta` - 品红色
* `gray` - 灰色

每种颜色包含以下属性：
- `light`: 亮色模式下的10个颜色数组
- `dark`: 暗色模式下的10个颜色数组
- `primary`: 主色（亮色模式下的第6个颜色）

**示例：**

```js
const { red, blue, arcoblue } = getPresetColors();

console.log(red.light); // 亮色模式下的红色色盘
console.log(blue.dark); // 暗色模式下的蓝色色盘
console.log(arcoblue.primary); // arco蓝的主色
```

#### getRgbStr(color: string)

获取指定颜色的RGB三通道字符串。

**参数：**
- `color`: string - 颜色值，支持十六进制格式

**返回值：**
- `string` - RGB三通道字符串，格式为 "r,g,b"

**示例：**

```js
const rgbStr = getRgbStr('#F53F3F');
console.log(rgbStr); // 245,63,63
```

### 图片取色功能

#### extractColorFromImage(image: HTMLImageElement)

从已加载的图片元素中提取主色调。

**参数：**
- `image`: HTMLImageElement - 已加载的图片元素

**返回值：**
- `Promise<string>` - 提取的主色调（十六进制格式）

**示例：**

```js
const image = document.getElementById('myImage');
extractColorFromImage(image).then(color => {
  console.log('提取的主色调:', color);
  // 可以用提取的颜色生成色盘
  const palette = generate(color, { list: true });
});
```

#### extractColorFromFile(file: File)

从文件对象中读取图片并提取主色调。

**参数：**
- `file`: File - 图片文件对象

**返回值：**
- `Promise<string>` - 提取的主色调（十六进制格式）

**示例：**

```js
// 在文件输入事件中使用
document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    extractColorFromFile(file).then(color => {
      console.log('提取的主色调:', color);
    });
  }
});
```

### 界面色彩系统功能

#### generateInterfaceColorSystem(primaryColor: string, options?: Object)

基于主色生成完整的界面色彩系统，包括语义色彩。

**参数：**
- `primaryColor`: string - 主色，支持十六进制格式（如 '#3491FA'）
- `options`: Object - 可选配置项
  - `successBase`: string - 自定义成功色基础色，默认为绿色
  - `warningBase`: string - 自定义警告色基础色，默认为橙色
  - `errorBase`: string - 自定义错误色基础色，默认为红色
  - `infoBase`: string - 自定义信息色基础色，默认为蓝色

**返回值：**
- `Object` - 包含完整色彩系统的对象
  - `primary`: string[] - 主色色盘（10个颜色）
  - `success`: string[] - 成功色色盘（10个颜色）
  - `warning`: string[] - 警告色色盘（10个颜色）
  - `error`: string[] - 错误色色盘（10个颜色）
  - `info`: string[] - 信息色色盘（10个颜色）

**示例：**

```js
// 生成默认界面色彩系统
const colorSystem = generateInterfaceColorSystem('#3491FA');
console.log(colorSystem.primary); // 主色色盘
console.log(colorSystem.success); // 成功色色盘
console.log(colorSystem.warning); // 警告色色盘
console.log(colorSystem.error); // 错误色色盘
console.log(colorSystem.info); // 信息色色盘

// 自定义语义色基础色
const customColorSystem = generateInterfaceColorSystem('#3491FA', {
  successBase: '#00C853',
  warningBase: '#FF9800',
  errorBase: '#F44336',
  infoBase: '#2196F3'
});
```

### 主题混合功能

#### rgbToHct(rgb: number[])

将 RGB 颜色转换为 HCT 色彩空间。

**参数：**
- `rgb`: number[] - RGB 颜色数组 [r, g, b]，范围 0-255

**返回值：**
- `number[]` - HCT 颜色数组 [h, c, t]，色相(0-360)、色度(0-100+)、色调(0-100)

#### hctToRgb(hct: number[])

将 HCT 颜色转换为 RGB 色彩空间。

**参数：**
- `hct`: number[] - HCT 颜色数组 [h, c, t]

**返回值：**
- `number[]` - RGB 颜色数组 [r, g, b]，范围 0-255

#### blendInHct(color1: number[], color2: number[], mode: string, ratio: number)

在 HCT 色彩空间中混合两个颜色。

**参数：**
- `color1`: number[] - 第一个颜色的 RGB 数组
- `color2`: number[] - 第二个颜色的 RGB 数组
- `mode`: string - 混合模式，可选值：'multiply'、'screen'、'overlay'、'softLight'
- `ratio`: number - 混合比例，范围 0-1

**返回值：**
- `number[]` - 混合后的 RGB 颜色数组

**示例：**

```js
// RGB 到 HCT 转换
const hct = rgbToHct([64, 196, 255]);
console.log(hct); // [200, 45, 80]

// HCT 到 RGB 转换
const rgb = hctToRgb([200, 45, 80]);
console.log(rgb); // [64, 196, 255]

// 颜色混合
const blended = blendInHct(
  [64, 196, 255],  // 蓝色
  [255, 87, 34],   // 橙色
  'overlay',       // 叠加模式
  0.5              // 50% 混合
);
console.log(blended); // 混合后的颜色

// 不同混合模式示例
const multiply = blendInHct([255, 0, 0], [0, 255, 0], 'multiply', 0.5);
const screen = blendInHct([255, 0, 0], [0, 255, 0], 'screen', 0.5);
const softLight = blendInHct([255, 0, 0], [0, 255, 0], 'softLight', 0.5);
```

## 实现原理

### 色盘生成算法

色盘生成功能基于HSV颜色空间，通过动态调整色相(H)、饱和度(S)和明度(V)生成和谐的色盘：

1. **动态梯度算法**：根据基础颜色的HSV值，动态计算色盘中其他颜色的参数
2. **色相调整**：根据色相区域动态调整色相变化方向和步长
3. **饱和度和明度调整**：使用非线性函数确保过渡平滑
4. **暗色模式特殊处理**：基于亮色模式的算法，但进行了特殊调整以适应深色背景

### 图片取色算法

图片取色功能通过以下步骤提取主色调：

1. **图片处理**：将图片缩小并绘制到Canvas上
2. **像素量化**：将RGB颜色空间从256^3种可能的颜色减少到16^3种
3. **颜色频率统计**：统计每种颜色的出现频率
4. **主色调提取**：过滤掉灰色和接近白色/黑色的颜色，选择出现频率最高的颜色

### 界面色彩系统算法

界面色彩系统基于色彩理论和无障碍访问性原则：

1. **语义色彩映射**：将功能语义（成功、警告、错误、信息）映射到合适的色相区域
2. **色彩调和**：确保生成的语义色彩与主色形成和谐的色彩关系
3. **对比度优化**：自动调整颜色的明度以满足 WCAG 无障碍访问标准
4. **一致性保证**：所有语义色彩使用相同的饱和度和明度调整算法

### 主题混合算法

主题混合功能基于 Material Design 3 的 HCT 色彩空间：

1. **HCT 色彩空间**：使用色相(Hue)、色度(Chroma)、色调(Tone)三个维度描述颜色
2. **感知均匀性**：HCT 空间在视觉感知上更加均匀，混合结果更自然
3. **多种混合模式**：
   - **multiply**: 相乘混合，产生更深的颜色
   - **screen**: 屏幕混合，产生更亮的颜色
   - **overlay**: 叠加混合，结合相乘和屏幕的效果
   - **softLight**: 柔光混合，产生柔和的混合效果
4. **比例控制**：支持精确的混合比例控制，实现渐进式颜色过渡

## 版本历史

### v0.2.0 (最新)
- ✨ 新增界面色彩系统功能
- ✨ 新增基于 HCT 色彩空间的主题混合功能
- 📚 完善 API 文档和使用示例
- 🔧 优化代码结构和性能

### v0.1.1
- 🐛 修复色盘生成的边界情况
- 📚 更新文档和示例

### v0.1.0
- 🎉 初始版本发布
- ✨ 色盘生成功能
- ✨ 图片取色功能
