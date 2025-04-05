# 图片取色功能文档

## 功能概述

图片取色功能允许用户从图片中提取主色调，可用于生成与图片匹配的调色板或主题色。该功能支持两种使用方式：

1. 从已加载的图片元素中提取颜色
2. 从文件对象中提取颜色

## API 说明

### extractColorFromImage

从已加载的图片元素中提取主色调。

```javascript
async function extractColorFromImage(image: HTMLImageElement): Promise<string>
```

**参数：**
- `image`: HTMLImageElement - 已加载的图片元素

**返回值：**
- `Promise<string>` - 提取的主色调（十六进制格式，如 '#FF5733'）

**异常：**
- 当图片处理失败时抛出异常

### extractColorFromFile

从文件对象中读取图片并提取主色调。

```javascript
function extractColorFromFile(file: File): Promise<string>
```

**参数：**
- `file`: File - 图片文件对象

**返回值：**
- `Promise<string>` - 提取的主色调（十六进制格式，如 '#FF5733'）

**异常：**
- 当文件不是图片类型时抛出异常
- 当文件读取失败时抛出异常
- 当图片加载失败时抛出异常
- 当图片处理失败时抛出异常

## 实现原理

图片取色功能的实现主要包含以下步骤：

1. **图片加载与处理**：
   - 将图片绘制到 Canvas 上，并限制处理尺寸（最大 100x100 像素）以提高性能
   - 从 Canvas 获取图片的像素数据

2. **像素数据分析**：
   - 遍历所有像素，跳过透明像素
   - 对颜色进行量化处理，将 RGB 值量化到 16 个区间，减少颜色数量
   - 统计每种颜色的出现频率

3. **主色调提取**：
   - 按出现频率对颜色进行排序
   - 过滤掉灰色和接近白色/黑色的颜色（基于饱和度和亮度）
   - 选择过滤后出现频率最高的颜色作为主色调
   - 如果过滤后没有颜色，则使用原始像素中出现最多的颜色

### 像素量化算法详解

像素量化是减少图像中颜色数量的过程，对于提取主色调非常重要。我们的实现采用了以下步骤：

1. **颜色空间简化**：
   - 将 RGB 颜色空间从 256^3 种可能的颜色（每个通道 0-255）减少到 16^3 种颜色
   - 具体实现是将每个 RGB 通道值除以 16 并四舍五入，然后乘以 16：
     ```javascript
     const quantizedR = Math.round(r / 16) * 16;
     const quantizedG = Math.round(g / 16) * 16;
     const quantizedB = Math.round(b / 16) * 16;
     ```
   - 这种方法将 RGB 值映射到 16 个可能的值（0, 16, 32, ..., 240, 255），大幅减少了需要处理的颜色数量

2. **颜色频率统计**：
   - 使用 Map 数据结构高效统计每种量化后颜色的出现频率
   - 颜色以 `r,g,b` 字符串形式作为 Map 的键，出现次数作为值
   - 这种方法比数组遍历更高效，时间复杂度为 O(n)，其中 n 是像素总数

### 颜色过滤的数学原理

为了提取有意义的主色调，我们需要过滤掉视觉上不显著的颜色：

1. **饱和度计算**：
   - 饱和度表示颜色的纯度或鲜艳程度，计算公式为：
     ```
     saturation = (max - min) / max
     ```
     其中 max 和 min 分别是 RGB 三个通道中的最大值和最小值
   - 饱和度为 0 表示灰色（R=G=B），饱和度越高表示颜色越鲜艳

2. **亮度计算**：
   - 亮度表示颜色的明暗程度，我们使用简化公式：
     ```
     lightness = max / 255
     ```
     其中 max 是 RGB 三个通道中的最大值
   - 亮度为 0 表示黑色，亮度为 1 表示白色

3. **阈值选择依据**：
   - 饱和度阈值 0.15：经过实验，低于此值的颜色通常是视觉上不明显的灰色
   - 亮度下限 0.2：排除过暗的颜色，这些颜色在视觉上接近黑色
   - 亮度上限 0.8：排除过亮的颜色，这些颜色在视觉上接近白色
   - 这些阈值是经过多次测试确定的，能够在大多数图片中提取出视觉上最显著的颜色

## 性能优化

图片取色功能在处理大图片时可能面临性能挑战，我们采用了以下优化策略：

1. **图片尺寸限制**：
   - 将图片缩小到最大 100x100 像素进行处理，显著减少需要分析的像素数量
   - 对于主色调提取，这种缩小不会影响结果准确性，但能大幅提高处理速度
   ```javascript
   const width = Math.min(image.width, 100);
   const height = Math.min(image.height, 100);
   const ratio = Math.min(width / image.width, height / image.height);
   ```

2. **颜色量化**：
   - 通过量化减少颜色数量，不仅提高了主色调提取的准确性，还减少了需要处理的唯一颜色数量
   - 在最坏情况下，需要处理的颜色从 16,777,216 种(256^3)减少到 4,096 种(16^3)

3. **高效数据结构**：
   - 使用 Map 数据结构进行颜色频率统计，比数组遍历更高效
   - 避免了嵌套循环，将时间复杂度保持在 O(n)

4. **异步处理**：
   - 使用 Promise 和异步函数处理图片加载和颜色提取，避免阻塞主线程
   - 对于大图片，这种方法可以保持 UI 响应性

## 完整代码示例

以下是 `image-color.js` 的核心实现，展示了主色调提取的完整流程：

```javascript
import Color from 'color';

/**
 * 从图片中提取主色调
 * @param {HTMLImageElement} image - 图片元素
 * @returns {Promise<string>} - 提取的主色调（十六进制格式）
 */
export async function extractColorFromImage(image) {
  try {
    // 将图像数据转换为像素数组
    const imageData = await getImageData(image);
    const pixels = getPixelsFromImageData(imageData);
    
    // 量化处理像素数据
    const dominantColor = quantizePixels(pixels);
    
    return dominantColor;
  } catch (error) {
    console.error('提取图片颜色失败:', error);
    throw error;
  }
}

/**
 * 获取图片的像素数据
 * @param {HTMLImageElement} image - 图片元素
 * @returns {Promise<ImageData>} - 图片的像素数据
 */
async function getImageData(image) {
  return new Promise((resolve, reject) => {
    try {
      // 创建canvas元素
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      // 设置canvas尺寸
      const width = Math.min(image.width, 100); // 限制处理尺寸，提高性能
      const height = Math.min(image.height, 100);
      const ratio = Math.min(width / image.width, height / image.height);
      
      canvas.width = image.width * ratio;
      canvas.height = image.height * ratio;
      
      // 绘制图像到canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      
      // 获取像素数据
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      resolve(imageData);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 从ImageData中提取像素数组
 * @param {ImageData} imageData - 图片的像素数据
 * @returns {Array<{r: number, g: number, b: number, count: number}>} - 像素颜色数组
 */
function getPixelsFromImageData(imageData) {
  const data = imageData.data;
  const pixelMap = new Map(); // 用于统计颜色出现次数
  
  // 遍历像素数据
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    
    // 跳过透明像素
    if (a < 128) continue;
    
    // 简化颜色，减少颜色数量（将RGB值量化到16个区间）
    const quantizedR = Math.round(r / 16) * 16;
    const quantizedG = Math.round(g / 16) * 16;
    const quantizedB = Math.round(b / 16) * 16;
    
    const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;
    
    // 统计颜色出现次数
    if (pixelMap.has(colorKey)) {
      pixelMap.set(colorKey, pixelMap.get(colorKey) + 1);
    } else {
      pixelMap.set(colorKey, 1);
    }
  }
  
  // 转换为数组格式
  const pixels = [];
  pixelMap.forEach((count, colorKey) => {
    const [r, g, b] = colorKey.split(',').map(Number);
    pixels.push({ r, g, b, count });
  });
  
  return pixels;
}

/**
 * 量化像素数据，提取主色调
 * @param {Array<{r: number, g: number, b: number, count: number}>} pixels - 像素颜色数组
 * @returns {string} - 主色调（十六进制格式）
 */
function quantizePixels(pixels) {
  // 按出现频率排序
  pixels.sort((a, b) => b.count - a.count);
  
  // 过滤掉灰色和接近白色/黑色的颜色
  const filteredPixels = pixels.filter(pixel => {
    const { r, g, b } = pixel;
    
    // 计算色彩饱和度 (0-1)
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const saturation = max === 0 ? 0 : delta / max;
    
    // 计算亮度 (0-1)
    const lightness = max / 255;
    
    // 过滤掉灰色和接近白色/黑色的颜色
    return saturation > 0.15 && lightness > 0.2 && lightness < 0.8;
  });
  
  // 如果过滤后没有颜色，则使用原始像素中出现最多的颜色
  const dominantPixel = filteredPixels.length > 0 ? filteredPixels[0] : pixels[0];
  
  // 转换为十六进制颜色
  const color = Color({ r: dominantPixel.r, g: dominantPixel.g, b: dominantPixel.b });
  return color.hex();
}
```

### 与调色板生成功能的集成

图片取色功能可以与现有的调色板生成功能无缝集成，实现从图片到完整调色方案的转换：

```javascript
import { extractColorFromImage } from './image-color.js';
import { generate } from './index.js';

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
const palette = await generatePaletteFromImage(image, { list: true });

// 应用调色板到UI
applyPaletteToUI(palette);
```

## 使用示例

### 从图片元素提取颜色

```javascript
import { extractColorFromImage } from './src/image-color.js';

// 假设页面上有一个 id 为 "myImage" 的图片元素
const imageElement = document.getElementById('myImage');

// 确保图片已加载
imageElement.onload = async () => {
  try {
    const dominantColor = await extractColorFromImage(imageElement);
    console.log('提取的主色调:', dominantColor);
    
    // 使用提取的颜色生成调色板
    import { generate } from './src/index.js';
    const palette = generate(dominantColor, { list: true });
    console.log('生成的调色板:', palette);
  } catch (error) {
    console.error('颜色提取失败:', error);
  }
};
```

### 从文件提取颜色

```javascript
import { extractColorFromFile } from './src/image-color.js';

// 假设有一个文件输入元素
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const dominantColor = await extractColorFromFile(file);
      console.log('提取的主色调:', dominantColor);
      
      // 使用提取的颜色更新页面元素样式
      document.getElementById('colorPreview').style.backgroundColor = dominantColor;
      
      // 使用提取的颜色生成调色板
      import { generate } from './src/index.js';
      const palette = generate(dominantColor, { list: true });
      displayPalette(palette); // 假设有一个函数用于显示调色板
    } catch (error) {
      console.error('颜色提取失败:', error);
    }
  }
});
```

## 注意事项

1. 图片处理是在浏览器端进行的，对于大尺寸图片会自动缩小处理以提高性能
2. 提取的颜色会过滤掉灰色和接近白/黑的颜色，以获取更有特色的主色调
3. 该功能依赖于浏览器的 Canvas API，确保在支持 Canvas 的环境中使用
4. 处理跨域图片时可能会遇到 CORS 限制，请确保图片资源允许跨域访问