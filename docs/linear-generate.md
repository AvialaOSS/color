# 线性颜色生成功能文档

线性颜色生成功能提供了在两个颜色之间进行线性插值的能力，特别适用于灰色系和单色调渐变的生成。

## 功能概述

### 1. generateLinear - 基础线性插值
在两个颜色之间进行RGB空间的线性插值。

```javascript
import { generateLinear } from '@arco-design/color';

// 基础用法：从红色到蓝色生成10个颜色
const colors = generateLinear('#ff0000', '#0000ff');
console.log(colors);
// 输出: ['#ff0000', '#e6001a', '#cc0033', ...]

// 自定义步数
const colors5 = generateLinear('#ff0000', '#0000ff', { steps: 5 });

// 不包含端点颜色
const colorsMiddle = generateLinear('#ff0000', '#0000ff', { 
  steps: 8, 
  includeEnds: false 
});

// 生成RGB格式
const rgbColors = generateLinear('#ff0000', '#0000ff', { 
  format: 'rgb' 
});
```

### 2. generateGrayLinear - 灰色系线性渐变
专门用于生成灰色系渐变，从白色到黑色或自定义灰色范围。

```javascript
import { generateGrayLinear } from '@arco-design/color';

// 标准灰色系（白色到黑色）
const grayScale = generateGrayLinear();
console.log(grayScale);
// 输出: ['#ffffff', '#e6e6e6', '#cccccc', ...]

// 自定义灰色范围
const customGray = generateGrayLinear({
  startGray: '#f0f0f0',
  endGray: '#333333',
  steps: 8
});

// 生成HSL格式的灰色系
const hslGray = generateGrayLinear({
  format: 'hsl',
  steps: 6
});
```

### 3. generateMonochromeLinear - 单色调线性渐变
基于一个基础颜色，生成从浅到深的单色调渐变。

```javascript
import { generateMonochromeLinear } from '@arco-design/color';

// 基于蓝色生成单色调渐变
const blueMonochrome = generateMonochromeLinear('#3491FA');
console.log(blueMonochrome);

// 自定义亮度范围
const customMonochrome = generateMonochromeLinear('#00B42A', {
  steps: 8,
  lightnessRange: 60  // 亮度变化范围
});

// 生成RGB格式
const rgbMonochrome = generateMonochromeLinear('#F53F3F', {
  format: 'rgb',
  steps: 12
});
```

### 4. generateLinearHSL - HSL空间线性插值
在HSL颜色空间进行线性插值，提供更自然的色彩过渡。

```javascript
import { generateLinearHSL } from '@arco-design/color';

// HSL空间插值（更自然的色彩过渡）
const hslColors = generateLinearHSL('#ff0000', '#00ff00');
console.log(hslColors);

// 彩虹渐变效果
const rainbow = generateLinearHSL('#ff0000', '#ff0000', {
  steps: 12  // 色相环一圈
});

// 不包含端点的HSL插值
const hslMiddle = generateLinearHSL('#ffff00', '#ff00ff', {
  steps: 6,
  includeEnds: false
});
```

## API 参数说明

### generateLinear(startColor, endColor, options)

**参数：**
- `startColor` (string): 起始颜色，支持hex、rgb、hsl等格式
- `endColor` (string): 结束颜色，支持hex、rgb、hsl等格式
- `options` (object): 配置选项
  - `steps` (number): 生成的颜色数量，默认10
  - `format` (string): 输出格式 'hex' | 'rgb' | 'hsl'，默认'hex'
  - `includeEnds` (boolean): 是否包含起始和结束颜色，默认true

**返回值：** `string[]` - 颜色数组

### generateGrayLinear(options)

**参数：**
- `options` (object): 配置选项
  - `startGray` (string): 起始灰色，默认'#ffffff'
  - `endGray` (string): 结束灰色，默认'#000000'
  - `steps` (number): 生成的颜色数量，默认10
  - `format` (string): 输出格式，默认'hex'

**返回值：** `string[]` - 灰色系颜色数组

### generateMonochromeLinear(baseColor, options)

**参数：**
- `baseColor` (string): 基础颜色
- `options` (object): 配置选项
  - `steps` (number): 生成的颜色数量，默认10
  - `format` (string): 输出格式，默认'hex'
  - `lightnessRange` (number): 亮度变化范围0-100，默认80

**返回值：** `string[]` - 单色调颜色数组

### generateLinearHSL(startColor, endColor, options)

**参数：**
- `startColor` (string): 起始颜色
- `endColor` (string): 结束颜色
- `options` (object): 配置选项
  - `steps` (number): 生成的颜色数量，默认10
  - `format` (string): 输出格式，默认'hex'
  - `includeEnds` (boolean): 是否包含起始和结束颜色，默认true

**返回值：** `string[]` - 颜色数组

## 使用场景

### 1. 灰色系设计
```javascript
// 为UI设计生成一套完整的灰色系
const uiGrays = generateGrayLinear({
  startGray: '#fafafa',
  endGray: '#262626',
  steps: 10
});
```

### 2. 品牌色扩展
```javascript
// 基于品牌主色生成完整色板
const brandColors = generateMonochromeLinear('#1890ff', {
  steps: 10,
  lightnessRange: 70
});
```

### 3. 渐变背景
```javascript
// 为CSS渐变生成颜色停止点
const gradientStops = generateLinear('#ff6b6b', '#4ecdc4', {
  steps: 5,
  format: 'rgb'
});
```

### 4. 数据可视化
```javascript
// 为图表生成颜色映射
const chartColors = generateLinearHSL('#ff0000', '#00ff00', {
  steps: 20,
  includeEnds: false
});
```

## 注意事项

1. **颜色空间选择**：RGB插值适合大多数场景，HSL插值在色相变化较大时提供更自然的过渡
2. **步数限制**：最小步数为2，建议根据实际需求选择合适的步数
3. **格式兼容性**：输入颜色支持多种格式，输出格式可自定义
4. **性能考虑**：大量颜色生成时建议缓存结果

## 与现有功能的区别

- **generate()**: 基于色彩理论的动态梯度算法，适合UI组件
- **线性生成**: 数学线性插值，适合渐变和数据可视化
- **灰色系**: 专门优化的灰色生成，确保视觉层次清晰