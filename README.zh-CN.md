# ArcoDesign Color

ArcoDesign Color Utils - 一个强大的颜色处理工具库。

## 功能概述

本库提供两大核心功能：

1. **色盘生成**：根据给定颜色通过算法生成包含十个颜色的梯度色板，支持亮色模式和暗色模式。
2. **图片取色**：从图片中提取主色调，可用于生成与图片匹配的调色板或主题色。

## 安装

```bash
npm install @aviala-design/color```

## 基本使用

```js
import { generate, getPresetColors, getRgbStr, extractColorFromImage } from '@arco-design/color';

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
