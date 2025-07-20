import Color from 'color';
import { getColorString } from './utils.js';

/**
 * 线性颜色生成器
 * 在两个颜色之间进行线性插值，生成指定数量的颜色
 * 特别适用于灰色系和单色调渐变
 * 
 * @param {string} startColor - 起始颜色
 * @param {string} endColor - 结束颜色
 * @param {Object} options - 配置选项
 * @param {number} options.steps - 生成的颜色数量 (默认: 10)
 * @param {string} options.format - 颜色格式 'hex' | 'rgb' | 'hsl' (默认: 'hex')
 * @param {boolean} options.includeEnds - 是否包含起始和结束颜色 (默认: true)
 * @returns {string[]} 颜色数组
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
 * @param {Object} options - 配置选项
 * @param {string} options.startGray - 起始灰色 (默认: '#ffffff')
 * @param {string} options.endGray - 结束灰色 (默认: '#000000')
 * @param {number} options.steps - 生成的颜色数量 (默认: 10)
 * @param {string} options.format - 颜色格式 (默认: 'hex')
 * @returns {string[]} 灰色系颜色数组
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
 * @param {Object} options - 配置选项
 * @param {number} options.steps - 生成的颜色数量 (默认: 10)
 * @param {string} options.format - 颜色格式 (默认: 'hex')
 * @param {number} options.lightnessRange - 亮度范围 0-100 (默认: 80)
 * @returns {string[]} 单色调颜色数组
 */
export function generateMonochromeLinear(baseColor, options = {}) {
  const { steps = 10, format = 'hex', lightnessRange = 80 } = options;
  
  const base = Color(baseColor);
  const hsl = base.hsl();
  
  // 计算起始和结束亮度
  const baseLightness = base.lightness();
  const maxLightness = Math.min(95, baseLightness + lightnessRange / 2);
  const minLightness = Math.max(5, baseLightness - lightnessRange / 2);
  
  // 创建起始和结束颜色（保持色相和饱和度，只改变亮度）
  const startColor = Color({
    h: hsl.color[0],
    s: hsl.color[1],
    l: maxLightness
  });
  
  const endColor = Color({
    h: hsl.color[0],
    s: hsl.color[1],
    l: minLightness
  });
  
  return generateLinear(startColor.hex(), endColor.hex(), { steps, format, includeEnds: true });
}

/**
 * 在HSL空间进行线性插值
 * 适用于需要更自然色彩过渡的场景
 * 
 * @param {string} startColor - 起始颜色
 * @param {string} endColor - 结束颜色
 * @param {Object} options - 配置选项
 * @param {number} options.steps - 生成的颜色数量 (默认: 10)
 * @param {string} options.format - 颜色格式 (默认: 'hex')
 * @param {boolean} options.includeEnds - 是否包含起始和结束颜色 (默认: true)
 * @returns {string[]} 颜色数组
 */
export function generateLinearHSL(startColor, endColor, options = {}) {
  const { steps = 10, format = 'hex', includeEnds = true } = options;
  
  if (steps < 2) {
    throw new Error('步数必须至少为2');
  }
  
  const start = Color(startColor).hsl();
  const end = Color(endColor).hsl();
  
  const colors = [];
  
  // 计算实际的插值步数
  const actualSteps = includeEnds ? steps : steps + 2;
  const stepSize = 1 / (actualSteps - 1);
  
  // 处理色相的循环特性
  let startHue = start.color[0] || 0;
  let endHue = end.color[0] || 0;
  
  // 选择最短的色相路径
  const hueDiff = endHue - startHue;
  if (Math.abs(hueDiff) > 180) {
    if (hueDiff > 0) {
      startHue += 360;
    } else {
      endHue += 360;
    }
  }
  
  for (let i = 0; i < actualSteps; i++) {
    const ratio = i * stepSize;
    
    // 在HSL空间进行线性插值
    let h = startHue + (endHue - startHue) * ratio;
    const s = start.color[1] + (end.color[1] - start.color[1]) * ratio;
    const l = start.color[2] + (end.color[2] - start.color[2]) * ratio;
    
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