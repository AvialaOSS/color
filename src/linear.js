import Color from 'color';
import { getColorString } from './utils.js';

/**
 * 线性颜色生成器
 * 在两个颜色之间进行线性插值，生成指定数量的颜色
 * 特别适用于灰色系和单色调渐变
 * 
 * @param {string} startColor - 起始颜色
 * @param {string} endColor - 结束颜色
 * @param {{steps?: number, format?: string, includeEnds?: boolean}} options - 配置选项
 * @returns {string[]} 颜色数组
 * 
 * @example
 * import { generateLinear } from '@aviala-design/color';
 * 
 * // 生成从白色到黑色的10个颜色
 * const grayScale = generateLinear('#ffffff', '#000000', { steps: 10 });
 * // ['#ffffff', '#e3e3e3', '#c7c7c7', ..., '#000000']
 * 
 * @example
 * // 生成RGB格式的渐变
 * const gradient = generateLinear('#ff0000', '#0000ff', { 
 *   steps: 5, 
 *   format: 'rgb' 
 * });
 * // ['rgb(255, 0, 0)', 'rgb(191, 0, 63)', ..., 'rgb(0, 0, 255)']
 * 
 * @example
 * // 不包含端点的渐变
 * const middle = generateLinear('#ff0000', '#0000ff', { 
 *   steps: 3, 
 *   includeEnds: false 
 * });
 * // 只返回中间的颜色，不包含起始和结束颜色
 */
export function generateLinear(startColor, endColor, options = {}) {
  const { steps = 10, format = 'hex', includeEnds = true } = options;
  
  if (steps < 2) {
    throw new Error('步数必须至少为2');
  }
  
  const start = Color(startColor);
  const end = Color(endColor);
  
  const colors = [];
  
  // 计算实际的插值步数
  const actualSteps = includeEnds ? steps : steps + 2;
  const stepSize = 1 / (actualSteps - 1);
  
  for (let i = 0; i < actualSteps; i++) {
    const ratio = i * stepSize;
    
    // 在RGB空间进行线性插值
    const r = Math.round(start.red() + (end.red() - start.red()) * ratio);
    const g = Math.round(start.green() + (end.green() - start.green()) * ratio);
    const b = Math.round(start.blue() + (end.blue() - start.blue()) * ratio);
    
    const interpolatedColor = Color({ r, g, b });
    
    // 如果不包含端点，跳过第一个和最后一个颜色
    if (!includeEnds && (i === 0 || i === actualSteps - 1)) {
      continue;
    }
    
    colors.push(getColorString(interpolatedColor, format));
  }
  
  return colors;
}

/**
 * 生成灰色系线性渐变
 * 从白色到黑色或指定的灰色范围
 * 
 * @param {{startGray?: string, endGray?: string, steps?: number, format?: string}} options - 配置选项
 * @returns {string[]} 灰色系颜色数组
 * 
 * @example
 * import { generateGrayLinear } from '@aviala-design/color';
 * 
 * // 生成默认灰色渐变（白到黑，10个颜色）
 * const grays = generateGrayLinear();
 * // ['#ffffff', '#e3e3e3', ..., '#000000']
 * 
 * @example
 * // 自定义灰色范围
 * const customGrays = generateGrayLinear({
 *   startGray: '#f0f0f0',
 *   endGray: '#333333',
 *   steps: 5
 * });
 * 
 * @example
 * // 生成RGB格式的灰色
 * const rgbGrays = generateGrayLinear({ format: 'rgb', steps: 8 });
 */
export function generateGrayLinear(options = {}) {
  const { 
    startGray = '#ffffff', 
    endGray = '#000000', 
    steps = 10, 
    format = 'hex' 
  } = options;
  
  return generateLinear(startGray, endGray, { steps, format, includeEnds: true });
}

/**
 * 生成单色调线性渐变
 * 基于一个基础颜色，生成从浅到深的渐变
 * 
 * @param {string} baseColor - 基础颜色
 * @param {{steps?: number, format?: string, lightnessRange?: number, minLightness?: number, maxLightness?: number}} options - 配置选项
 * @returns {string[]} 单色调颜色数组
 * 
 * @example
 * import { generateMonochromeLinear } from '@aviala-design/color';
 * 
 * // 生成蓝色的单色调渐变
 * const blueShades = generateMonochromeLinear('#3491FA', { steps: 10 });
 * // 生成从浅蓝到深蓝的10个颜色，保持色相和饱和度
 * 
 * @example
 * // 自定义亮度范围（基于中心扩展模式）
 * const customShades = generateMonochromeLinear('#ff6b6b', {
 *   steps: 7,
 *   lightnessRange: 60  // 亮度变化范围
 * });
 * 
 * @example
 * // 直接指定最大和最小亮度（固定端点模式）
 * const fixedRange = generateMonochromeLinear('#3491FA', {
 *   steps: 12,
 *   minLightness: 10,   // 最深色接近黑色
 *   maxLightness: 98    // 最浅色接近白色
 * });
 * // 推荐用于需要接近纯白/纯黑的场景
 * 
 * @example
 * // 生成HSL格式
 * const hslShades = generateMonochromeLinear('#00b894', {
 *   format: 'hsl',
 *   steps: 5
 * });
 */
export function generateMonochromeLinear(baseColor, options = {}) {
  const { 
    steps = 10, 
    format = 'hex', 
    lightnessRange = 80,
    minLightness = null,
    maxLightness = null
  } = options;
  
  const base = Color(baseColor);
  
  let finalMaxLightness, finalMinLightness;
  
  // 优先使用直接指定的端点值（固定端点模式）
  if (minLightness !== null && maxLightness !== null) {
    finalMaxLightness = Math.max(0, Math.min(100, maxLightness));
    finalMinLightness = Math.max(0, Math.min(100, minLightness));
  } else {
    // 否则使用基于中心扩展的模式（向后兼容）
    const baseLightness = base.lightness();
    finalMaxLightness = Math.min(95, baseLightness + lightnessRange / 2);
    finalMinLightness = Math.max(5, baseLightness - lightnessRange / 2);
  }
  
  // 创建起始和结束颜色（保持色相和饱和度，只改变亮度）
  const startColor = Color({
    h: base.hue(),
    s: base.saturationl(),
    l: finalMaxLightness
  });
  
  const endColor = Color({
    h: base.hue(),
    s: base.saturationl(),
    l: finalMinLightness
  });
  
  return generateLinear(startColor.hex(), endColor.hex(), { steps, format, includeEnds: true });
}

/**
 * 在HSL空间进行线性插值
 * 适用于需要更自然色彩过渡的场景
 * 
 * @param {string} startColor - 起始颜色
 * @param {string} endColor - 结束颜色
 * @param {{steps?: number, format?: string, includeEnds?: boolean}} options - 配置选项
 * @returns {string[]} 颜色数组
 * 
 * @example
 * import { generateLinearHSL } from '@aviala-design/color';
 * 
 * // 在 HSL 空间生成从黄色到紫色的渐变
 * const gradient = generateLinearHSL('#FFD700', '#9B59B6', { steps: 8 });
 * // 通过色相环插值，产生更自然的彩虹效果
 * 
 * @example
 * // 包含端点值
 * const withEnds = generateLinearHSL('#FF6B6B', '#4ECDC4', {
 *   steps: 5,
 *   includeEnds: true
 * });
 * // 结果的第一个是 #FF6B6B，最后一个是 #4ECDC4
 * 
 * @example
 * // 输出为 RGB 格式
 * const rgbGradient = generateLinearHSL('hsl(0, 100%, 50%)', 'hsl(240, 100%, 50%)', {
 *   steps: 6,
 *   format: 'rgb'
 * });
 */
export function generateLinearHSL(startColor, endColor, options = {}) {
  const { steps = 10, format = 'hex', includeEnds = true } = options;
  
  if (steps < 2) {
    throw new Error('步数必须至少为2');
  }
  
  const start = Color(startColor);
  const end = Color(endColor);
  
  const colors = [];
  
  // 计算实际的插值步数
  const actualSteps = includeEnds ? steps : steps + 2;
  const stepSize = 1 / (actualSteps - 1);
  
  // 处理色相的循环特性
  let startHue = start.hue() || 0;
  let endHue = end.hue() || 0;
  
  // 选择最短的色相路径
  const hueDiff = endHue - startHue;
  if (Math.abs(hueDiff) > 180) {
    if (hueDiff > 0) {
      startHue += 360;
    } else {
      endHue += 360;
    }
  }
  
  const startSat = start.saturationl();
  const endSat = end.saturationl();
  const startLight = start.lightness();
  const endLight = end.lightness();
  
  for (let i = 0; i < actualSteps; i++) {
    const ratio = i * stepSize;
    
    // 在HSL空间进行线性插值
    let h = startHue + (endHue - startHue) * ratio;
    const s = startSat + (endSat - startSat) * ratio;
    const l = startLight + (endLight - startLight) * ratio;
    
    // 确保色相在0-360范围内
    h = h % 360;
    if (h < 0) h += 360;
    
    const interpolatedColor = Color({ h, s, l });
    
    // 如果不包含端点，跳过第一个和最后一个颜色
    if (!includeEnds && (i === 0 || i === actualSteps - 1)) {
      continue;
    }
    
    colors.push(getColorString(interpolatedColor, format));
  }
  
  return colors;
}