import Color from 'color';
import { getColorString } from './utils.js';

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

/**
 * 从文件中读取图片并提取颜色
 * @param {File} file - 图片文件
 * @returns {Promise<string>} - 提取的主色调（十六进制格式）
 */
export function extractColorFromFile(file) {
  return new Promise((resolve, reject) => {
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      reject(new Error('请选择图片文件'));
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const image = new Image();
        image.onload = async () => {
          try {
            const color = await extractColorFromImage(image);
            resolve(color);
          } catch (error) {
            reject(error);
          }
        };
        image.onerror = () => reject(new Error('图片加载失败'));
        image.src = event.target.result;
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsDataURL(file);
  });
}