# 色盘生成功能文档

## 功能概述

色盘生成功能允许用户基于一个基础颜色生成一系列色调，形成完整的调色板。该功能支持两种模式：

1. 亮色模式：生成适合浅色背景的色调系列
2. 暗色模式：生成适合深色背景的色调系列

每个色盘包含10个颜色，从浅到深排列，可用于构建一致的UI主题、数据可视化或品牌色系统。

## API 说明

### generate

基于基础颜色生成色盘。

```javascript
function generate(color: string, options?: Object): string | string[]
```

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

## 实现原理

色盘生成功能的实现主要包含以下核心算法：

1. **动态梯度算法**：
   - 根据基础颜色的色相(H)、饱和度(S)和明度(V)，动态计算色盘中其他颜色的参数
   - 不同色相区域使用不同的步长，确保生成的色盘在视觉上更加和谐

2. **亮色模式生成**：
   - 对于索引小于6的颜色（浅色部分），降低饱和度并提高明度
   - 对于索引大于6的颜色（深色部分），提高饱和度并降低明度
   - 色相调整：根据色相区域动态调整色相变化方向和步长

3. **暗色模式生成**：
   - 基于亮色模式的算法，但进行了特殊调整以适应深色背景
   - 对饱和度进行特殊处理，确保在深色背景下颜色仍然清晰可辨
   - 保持足够的对比度，使色盘在暗色主题中表现良好

### 色相调整算法详解

色相调整是色盘生成的关键部分，我们根据不同的色相区域采用不同的调整策略：

1. **色相步长动态计算**：
   ```javascript
   function getHueStep(hue) {
     if (hue >= 60 && hue <= 240) {
       return 2.5; // 绿色-蓝色区域可以用更大的步长
     } else if ((hue >= 0 && hue < 60) || (hue > 300 && hue <= 360)) {
       return 1.5; // 红色区域使用较小的步长
     } else {
       return 2; // 其他区域使用默认步长
     }
   }
   ```

2. **色相变化方向**：
   - 对于绿色-蓝色区域(60°-240°)：
     - 亮色部分：色相减小
     - 深色部分：色相增加
   - 对于其他区域：
     - 亮色部分：色相增加
     - 深色部分：色相减小
   - 这种方法确保生成的颜色在视觉上更加和谐，避免出现不自然的色调

### 饱和度和明度调整算法

饱和度和明度的调整对于生成视觉上平衡的色盘至关重要：

1. **饱和度调整**：
   - 亮色部分：饱和度逐渐降低，使用非线性函数确保过渡平滑
     ```javascript
     newSaturation = s - ((s - minSaturationStep) / 5.5) * Math.pow(i, 1.05);
     ```
   - 深色部分：饱和度适度增加，但避免过饱和
     ```javascript
     newSaturation = s + ((maxS - s) / 4.2) * Math.pow(i, 0.95);
     ```

2. **明度调整**：
   - 亮色部分：明度逐渐增加，接近但不超过最大值
     ```javascript
     newValue = Math.min(maxValue, v + ((maxValue - v) / 5.2) * Math.pow(i, 0.9));
     ```
   - 深色部分：明度逐渐降低，但保持在最小阈值以上
     ```javascript
     newValue = Math.max(minValue, v - ((v - minValue) / 4.2) * Math.pow(i, 1.05));
     ```

3. **非线性调整**：
   - 使用幂函数(Math.pow)进行非线性调整，使色盘在视觉上更加均匀
   - 不同的指数值(0.9, 0.95, 1.05)用于微调不同参数的变化曲线

## 暗色模式特殊处理

暗色模式的色盘生成需要特殊处理，以确保在深色背景下的可见性和美观性：

1. **基于亮色模式反转**：
   - 暗色模式的第i个颜色基于亮色模式的第(10-i+1)个颜色
   ```javascript
   const lightColor = Color(colorPalette(originColor, 10 - i + 1));
   ```

2. **饱和度特殊处理**：
   - 根据色相区域动态调整基础饱和度
   ```javascript
   if (originBaseHue >= 0 && originBaseHue < 50) {
     return originBaseSaturation - 15;
   }
   if (originBaseHue >= 50 && originBaseHue < 191) {
     return originBaseSaturation - 20;
   }
   if (originBaseHue >= 191 && originBaseHue <= 360) {
     return originBaseSaturation - 15;
   }
   ```

3. **分段处理**：
   - 索引1-5：饱和度逐渐增加
   - 索引6：根据色相区域特殊调整
   - 索引7-10：饱和度逐渐减少

## 性能优化

色盘生成功能在设计时考虑了性能优化：

1. **懒加载策略**：
   - 只有在实际需要时才计算颜色值，避免不必要的计算
   - 预设颜色(如灰色系列)直接使用硬编码值，避免重复计算

2. **缓存机制**：
   - 通过 `getPresetColors()` 函数可以一次性获取所有预设颜色的色盘，适合需要频繁使用预设色盘的场景

3. **高效的颜色转换**：
   - 使用 Color 库进行高效的颜色空间转换
   - 只在最终输出时进行格式转换，中间计算过程保持在HSV颜色空间

## 完整代码示例

以下是 `generate.js` 的核心实现，展示了色盘生成的完整流程：

```javascript
import colorPalette from './palette.js';
import colorPaletteDark from './palette-dark.js';

/**
 * @param {string} color
 * @param {Object} options
 * @param {number} options.index 1 - 10 (default: 6)
 * @param {boolean} options.dark
 * @param {boolean} options.list
 * @param {string} options.format 'hex' | 'rgb' | 'hsl'
 * 
 * @return string | string[]
 */
function generate(color, options = {}) {
  const { dark, list, index = 6, format = 'hex' } = options;

  if (list) {
    const list = [];
    const func = dark ? colorPaletteDark : colorPalette;
    for(let i = 1; i <= 10; i++) {
      list.push(func(color, i, format));
    }
    return list;
  }
  return dark ? colorPaletteDark(color, index, format) : colorPalette(color, index, format);
}

export default generate;
```

## 使用示例

### 生成单个颜色

```javascript
import { generate } from './src/index.js';

// 使用默认选项（返回索引为6的颜色，即基础颜色本身）
const baseColor = '#3491FA';
const color = generate(baseColor);
console.log('生成的颜色:', color); // 输出: #3491FA

// 生成亮色模式下的第3个颜色
const lightColor = generate(baseColor, { index: 3 });
console.log('亮色模式第3个颜色:', lightColor); // 输出类似: #7EB9FC

// 生成暗色模式下的第8个颜色
const darkColor = generate(baseColor, { index: 8, dark: true });
console.log('暗色模式第8个颜色:', darkColor); // 输出类似: #1D4980
```

### 生成完整色盘

```javascript
import { generate } from './src/index.js';

// 生成亮色模式的完整色盘
const baseColor = '#00B42A';
const lightPalette = generate(baseColor, { list: true });
console.log('亮色模式色盘:', lightPalette);
// 输出10个颜色的数组，从浅到深排列

// 生成暗色模式的完整色盘
const darkPalette = generate(baseColor, { list: true, dark: true });
console.log('暗色模式色盘:', darkPalette);
// 输出10个颜色的数组，适合暗色背景

// 生成RGB格式的色盘
const rgbPalette = generate(baseColor, { list: true, format: 'rgb' });
console.log('RGB格式色盘:', rgbPalette);
// 输出格式如: rgb(0, 180, 42)
```

### 使用预设颜色

```javascript
import { colorList, getPresetColors } from './src/index.js';

// 获取所有预设颜色
console.log('可用的预设颜色:', Object.keys(colorList));
// 输出: ['red', 'orangered', 'orange', 'gold', 'yellow', 'lime', 'green', 'cyan', 'blue', 'arcoblue', 'purple', 'pinkpurple', 'magenta']

// 使用预设颜色生成色盘
const purplePalette = generate(colorList.purple, { list: true });
console.log('紫色色盘:', purplePalette);

// 获取所有预设色盘
const allPresetColors = getPresetColors();
console.log('所有预设色盘:', allPresetColors);
// 包含所有预设颜色的亮色和暗色色盘
```

### 与图片取色功能结合

```javascript
import { extractColorFromImage } from './src/image-color.js';
import { generate } from './src/index.js';

/**
 * 从图片生成调色板
 * @param {HTMLImageElement} image - 图片元素
 * @param {Object} options - 调色板生成选项
 * @returns {Promise<Object|Array>} - 生成的调色板
 */
async function generatePaletteFromImage(image, options = {}) {
  // 从图片提取主色调
  const baseColor = await extractColorFromImage(image);
  
  // 使用主色调生成调色板
  return generate(baseColor, options);
}

// 使用示例
const image = document.getElementById('myImage');

// 确保图片已加载
image.onload = async () => {
  try {
    // 生成亮色模式色盘
    const lightPalette = await generatePaletteFromImage(image, { list: true });
    console.log('图片亮色调色板:', lightPalette);
    
    // 生成暗色模式色盘
    const darkPalette = await generatePaletteFromImage(image, { list: true, dark: true });
    console.log('图片暗色调色板:', darkPalette);
    
    // 应用色盘到UI
    applyPaletteToUI(lightPalette, darkPalette);
  } catch (error) {
    console.error('生成调色板失败:', error);
  }
};
```

## 注意事项

1. 色盘生成算法经过精心调整，以确保生成的颜色在视觉上和谐、平衡
2. 不同色相区域使用不同的算法参数，红色区域的调整更为谨慎，因为人眼对红色变化更敏感
3. 暗色模式的色盘不是简单地降低亮色模式的亮度，而是经过特殊算法处理，以确保在深色背景下的可见性
4. 预设颜色已经过精心选择，覆盖了常见的UI场景，可以直接使用
5. 生成的色盘可以与CSS变量结合使用，轻松实现主题切换功能
6. 当需要自定义颜色时，建议选择饱和度适中的颜色作为基础颜色，这样生成的色盘效果最佳