/**
 * 主题色混合模块
 * 基于 Material Design 3 的 HCT 颜色空间实现颜色混合和调和
 * 
 * HCT (Hue, Chroma, Tone) 颜色空间结合了 CAM16 和 CIE-Lab 的优势：
 * - H (Hue): 色相，0-360度（使用 Lab 空间计算）
 * - C (Chroma): 色度，颜色的鲜艳程度（使用 Lab 空间计算）
 * - T (Tone): 色调/亮度，CIE L* 值 (0-100)
 * 
 * 本实现使用 CIE Lab 颜色空间近似 HCT，提供准确的感知一致性
 */

import Color from 'color';
import { generateMonochromeLinear } from './linear.js';

/**
 * @typedef {Object} HCT
 * @property {number} h - 色相 (0-360)
 * @property {number} c - 色度 (0-150+)
 * @property {number} t - 色调/亮度 (0-100)，对应 CIE L*
 */

/**
 * @typedef {Object} LabColor
 * @property {number} l - L* 亮度 (0-100)
 * @property {number} a - a* 红绿轴 (-128 to 128)
 * @property {number} b - b* 黄蓝轴 (-128 to 128)
 */

/**
 * 将 RGB 颜色转换为 HCT 颜色空间
 * 使用 CIE Lab 颜色空间实现准确的感知一致性
 * 
 * @param {string} rgb - RGB 颜色值，格式如 "#ff0000"
 * @returns {HCT} HCT 颜色对象 {h, c, t}
 * 
 * @example
 * import { rgbToHct } from '@aviala-design/color';
 * 
 * // 转换品牌色到 HCT 空间
 * const hct = rgbToHct('#3491FA');
 * console.log(hct); // { h: 278.7, c: 60.7, t: 59.8 }
 * 
 * @example
 * // 用于颜色分析和处理
 * const primaryColor = rgbToHct('#FF5722');
 * if (primaryColor.t < 50) {
 *   console.log('这是深色');
 * }
 */
export function rgbToHct(rgb) {
  // 验证输入格式
  if (!rgb || typeof rgb !== 'string') {
    throw new Error('Invalid RGB color: must be a string');
  }
  
  // 使用 color 库解析颜色
  let color;
  try {
    color = Color(rgb);
  } catch (e) {
    throw new Error('Invalid RGB color format');
  }
  
  // 获取 Lab 值
  const l = color.l();
  const a = color.a();
  const b = color.b();
  
  // 从 Lab 计算色相（0-360度）
  let h = Math.atan2(b, a) * (180 / Math.PI);
  if (h < 0) h += 360;
  
  // 从 Lab 计算色度 (chroma = sqrt(a² + b²))
  const c = Math.sqrt(a * a + b * b);
  
  // Tone 直接使用 L* 值
  const t = l;
  
  return { 
    h: h, 
    c: c, 
    t: t 
  };
}

/**
 * 将 HCT 颜色转换为 RGB
 * 使用 CIE Lab 颜色空间作为中间转换
 * 
 * @param {HCT} hct - HCT 颜色对象 {h, c, t}
 * @param {{gamutMapping?: 'clamp' | 'reduce-chroma'}} [options] - 配置选项
 * @returns {string} RGB 颜色值，格式如 "#ff0000"
 * 
 * @example
 * import { hctToRgb } from '@aviala-design/color';
 * 
 * // 从 HCT 颜色空间转回 RGB
 * const rgb = hctToRgb({ h: 278.7, c: 60.7, t: 59.8 });
 * console.log(rgb); // '#3491fa'
 * 
 * @example
 * // 在 HCT 空间调整颜色后转换
 * const hct = { h: 120, c: 50, t: 70 };
 * const rgb = hctToRgb(hct);
 * document.body.style.backgroundColor = rgb;
 */
export function hctToRgb(hct, options = {}) {
  // 验证输入
  if (!hct || typeof hct !== 'object' || hct.h === undefined || hct.c === undefined || hct.t === undefined) {
    throw new Error('Invalid HCT color: must be an object with h, c, t properties');
  }
  
  const { gamutMapping = 'reduce-chroma' } = options;
  
  let { h, c, t } = hct;
  
  // 规范化值
  h = ((h % 360) + 360) % 360;
  c = Math.max(0, c);
  t = Math.max(0, Math.min(100, t));
  
  // 将 HCT 转换为 Lab
  const hRad = h * (Math.PI / 180);
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);
  
  // 使用 color 库从 Lab 创建颜色
  try {
    let color = Color.lab(t, a, b);
    
    // 色域映射：确保颜色在 sRGB 范围内
    if (gamutMapping === 'reduce-chroma') {
      // 逐步减少色度直到颜色在色域内
      let currentChroma = c;
      let rgb = color.rgb().array();
      
      while ((rgb[0] < 0 || rgb[0] > 255 || rgb[1] < 0 || rgb[1] > 255 || rgb[2] < 0 || rgb[2] > 255) && currentChroma > 0) {
        currentChroma -= 1;
        const newA = currentChroma * Math.cos(hRad);
        const newB = currentChroma * Math.sin(hRad);
        color = Color.lab(t, newA, newB);
        rgb = color.rgb().array();
      }
    }
    
    // Clamp RGB 值到有效范围
    const rgb = color.rgb().array();
    const r = Math.max(0, Math.min(255, Math.round(rgb[0])));
    const g = Math.max(0, Math.min(255, Math.round(rgb[1])));
    const bVal = Math.max(0, Math.min(255, Math.round(rgb[2])));
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bVal.toString(16).padStart(2, '0')}`;
  } catch (e) {
    // 回退：直接 clamp
    const color = Color.lab(t, a, b);
    return color.hex().toLowerCase();
  }
}

/**
 * 在 HCT 颜色空间中混合两种颜色
 * 支持多种混合模式：Lab 空间混合（默认）、HCT 线性混合、色相混合
 * 
 * @param {string} color1 - 第一种颜色 (RGB)
 * @param {string} color2 - 第二种颜色 (RGB)
 * @param {number} ratio - 混合比例，0-1，0表示完全是color1，1表示完全是color2
 * @param {{mode?: 'lab' | 'hct' | 'hue-only'}} [options] - 混合选项
 * @returns {string} 混合后的颜色 (RGB)
 * 
 * @example
 * import { blendInHct } from '@aviala-design/color';
 * 
 * // 混合品牌色和背景色（默认 Lab 空间混合）
 * const blended = blendInHct('#3491FA', '#FFFFFF', 0.3);
 * 
 * @example
 * // 使用 HCT 线性混合
 * const blended = blendInHct('#FF0000', '#0000FF', 0.5, { mode: 'hct' });
 * 
 * @example
 * // 只混合色相，保持第一个颜色的色度和明度
 * const blended = blendInHct('#FF0000', '#0000FF', 0.5, { mode: 'hue-only' });
 */
export function blendInHct(color1, color2, ratio = 0.5, options = {}) {
  // 验证输入
  if (!color1 || !color2) {
    throw new Error('Both colors are required for blending');
  }
  
  const { mode = 'lab' } = options;
  
  // 验证并限制混合比例
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  
  if (mode === 'lab') {
    // Lab 空间混合 - 最感知一致的混合方式
    return blendInLab(color1, color2, clampedRatio);
  } else if (mode === 'hue-only') {
    // 只混合色相，保持第一个颜色的色度和明度
    return blendHueOnly(color1, color2, clampedRatio);
  } else {
    // HCT 线性混合
    return blendInHctLinear(color1, color2, clampedRatio);
  }
}

/**
 * 在 Lab 颜色空间中混合两种颜色
 * 提供最感知一致的混合结果
 * 
 * @param {string} color1 - 第一种颜色 (RGB)
 * @param {string} color2 - 第二种颜色 (RGB)
 * @param {number} ratio - 混合比例
 * @returns {string} 混合后的颜色 (RGB)
 */
function blendInLab(color1, color2, ratio) {
  const c1 = Color(color1);
  const c2 = Color(color2);
  
  const l1 = c1.l(), a1 = c1.a(), b1 = c1.b();
  const l2 = c2.l(), a2 = c2.a(), b2 = c2.b();
  
  const l = l1 + (l2 - l1) * ratio;
  const a = a1 + (a2 - a1) * ratio;
  const b = b1 + (b2 - b1) * ratio;
  
  const result = Color.lab(l, a, b);
  return result.hex().toLowerCase();
}

/**
 * 在 HCT 空间进行线性插值混合
 * 
 * @param {string} color1 - 第一种颜色 (RGB)
 * @param {string} color2 - 第二种颜色 (RGB)
 * @param {number} ratio - 混合比例
 * @returns {string} 混合后的颜色 (RGB)
 */
function blendInHctLinear(color1, color2, ratio) {
  const hct1 = rgbToHct(color1);
  const hct2 = rgbToHct(color2);
  
  // 色相的环形插值
  const blendedH = interpolateHue(hct1.h, hct2.h, ratio);
  const blendedC = hct1.c + (hct2.c - hct1.c) * ratio;
  const blendedT = hct1.t + (hct2.t - hct1.t) * ratio;
  
  return hctToRgb({
    h: blendedH,
    c: Math.max(0, blendedC),
    t: Math.max(0, Math.min(100, blendedT))
  });
}

/**
 * 只混合色相，保持第一个颜色的色度和明度
 * 
 * @param {string} color1 - 第一种颜色 (RGB)
 * @param {string} color2 - 第二种颜色 (RGB)
 * @param {number} ratio - 混合比例
 * @returns {string} 混合后的颜色 (RGB)
 */
function blendHueOnly(color1, color2, ratio) {
  const hct1 = rgbToHct(color1);
  const hct2 = rgbToHct(color2);
  
  const blendedH = interpolateHue(hct1.h, hct2.h, ratio);
  
  return hctToRgb({
    h: blendedH,
    c: hct1.c,  // 保持第一个颜色的色度
    t: hct1.t   // 保持第一个颜色的明度
  });
}

/**
 * 色相环形插值 - 选择最短路径
 * 
 * @param {number} h1 - 起始色相
 * @param {number} h2 - 目标色相
 * @param {number} ratio - 插值比例
 * @returns {number} 插值后的色相
 */
function interpolateHue(h1, h2, ratio) {
  let diff = h2 - h1;
  
  // 选择最短路径
  if (diff > 180) {
    diff -= 360;
  } else if (diff < -180) {
    diff += 360;
  }
  
  let result = h1 + diff * ratio;
  
  // 规范化到 0-360
  if (result < 0) result += 360;
  if (result >= 360) result -= 360;
  
  return result;
}

/**
 * 计算两个颜色在 Lab 空间中的感知色差 (Delta E)
 * 值越小表示颜色越接近，一般认为 < 2 为几乎不可察觉的差异
 * 
 * @param {string} color1 - 第一种颜色 (RGB)
 * @param {string} color2 - 第二种颜色 (RGB)
 * @returns {number} Delta E 值
 * 
 * @example
 * import { colorDifference } from '@aviala-design/color';
 * 
 * const diff = colorDifference('#FF0000', '#FF0001');
 * console.log(diff); // 很小的值，几乎相同
 */
export function colorDifference(color1, color2) {
  const c1 = Color(color1);
  const c2 = Color(color2);
  
  const l1 = c1.l(), a1 = c1.a(), b1 = c1.b();
  const l2 = c2.l(), a2 = c2.a(), b2 = c2.b();
  
  // CIE76 Delta E 公式
  return Math.sqrt(
    Math.pow(l2 - l1, 2) + 
    Math.pow(a2 - a1, 2) + 
    Math.pow(b2 - b1, 2)
  );
}

/**
 * 调整颜色的明度（Tone）
 * 
 * @param {string} color - 输入颜色 (RGB)
 * @param {number} tone - 目标明度 (0-100)
 * @returns {string} 调整后的颜色 (RGB)
 * 
 * @example
 * import { adjustTone } from '@aviala-design/color';
 * 
 * // 将颜色调整到 80% 明度
 * const lighter = adjustTone('#3491FA', 80);
 */
export function adjustTone(color, tone) {
  const hct = rgbToHct(color);
  return hctToRgb({
    h: hct.h,
    c: hct.c,
    t: Math.max(0, Math.min(100, tone))
  });
}

/**
 * 调整颜色的色度（Chroma）
 * 
 * @param {string} color - 输入颜色 (RGB)
 * @param {number} chroma - 目标色度
 * @returns {string} 调整后的颜色 (RGB)
 * 
 * @example
 * import { adjustChroma } from '@aviala-design/color';
 * 
 * // 降低颜色鲜艳度
 * const muted = adjustChroma('#FF0000', 30);
 */
export function adjustChroma(color, chroma) {
  const hct = rgbToHct(color);
  return hctToRgb({
    h: hct.h,
    c: Math.max(0, chroma),
    t: hct.t
  });
}

/**
 * 调整颜色的色相（Hue）
 * 
 * @param {string} color - 输入颜色 (RGB)
 * @param {number} hue - 目标色相 (0-360)
 * @returns {string} 调整后的颜色 (RGB)
 * 
 * @example
 * import { adjustHue } from '@aviala-design/color';
 * 
 * // 将色相旋转到 120 度（绿色区域）
 * const green = adjustHue('#FF0000', 120);
 */
export function adjustHue(color, hue) {
  const hct = rgbToHct(color);
  return hctToRgb({
    h: ((hue % 360) + 360) % 360,
    c: hct.c,
    t: hct.t
  });
}

/**
 * 旋转颜色的色相
 * 
 * @param {string} color - 输入颜色 (RGB)
 * @param {number} degrees - 旋转角度（可正可负）
 * @returns {string} 旋转后的颜色 (RGB)
 * 
 * @example
 * import { rotateHue } from '@aviala-design/color';
 * 
 * // 色相顺时针旋转 30 度
 * const rotated = rotateHue('#FF0000', 30);
 * 
 * // 色相逆时针旋转 45 度
 * const rotatedBack = rotateHue('#FF0000', -45);
 */
export function rotateHue(color, degrees) {
  const hct = rgbToHct(color);
  let newHue = hct.h + degrees;
  newHue = ((newHue % 360) + 360) % 360;
  return hctToRgb({
    h: newHue,
    c: hct.c,
    t: hct.t
  });
}

/**
 * 获取颜色的互补色
 * 
 * @param {string} color - 输入颜色 (RGB)
 * @returns {string} 互补色 (RGB)
 * 
 * @example
 * import { getComplementary } from '@aviala-design/color';
 * 
 * const complement = getComplementary('#FF0000'); // 青色
 */
export function getComplementary(color) {
  return rotateHue(color, 180);
}

/**
 * 获取颜色的三角配色
 * 
 * @param {string} color - 输入颜色 (RGB)
 * @returns {[string, string, string]} 三个颜色的数组
 * 
 * @example
 * import { getTriadic } from '@aviala-design/color';
 * 
 * const [c1, c2, c3] = getTriadic('#FF0000');
 */
export function getTriadic(color) {
  return [
    color,
    rotateHue(color, 120),
    rotateHue(color, 240)
  ];
}

/**
 * 获取颜色的分裂互补色
 * 
 * @param {string} color - 输入颜色 (RGB)
 * @param {number} [angle=30] - 分裂角度
 * @returns {[string, string, string]} 三个颜色的数组
 * 
 * @example
 * import { getSplitComplementary } from '@aviala-design/color';
 * 
 * const [c1, c2, c3] = getSplitComplementary('#FF0000');
 */
export function getSplitComplementary(color, angle = 30) {
  return [
    color,
    rotateHue(color, 180 - angle),
    rotateHue(color, 180 + angle)
  ];
}

/**
 * 获取颜色的类似色
 * 
 * @param {string} color - 输入颜色 (RGB)
 * @param {number} [count=3] - 颜色数量
 * @param {number} [angle=30] - 每个颜色之间的角度
 * @returns {string[]} 类似色数组
 * 
 * @example
 * import { getAnalogous } from '@aviala-design/color';
 * 
 * const analogous = getAnalogous('#FF0000', 5, 15);
 */
export function getAnalogous(color, count = 3, angle = 30) {
  const colors = [];
  const startAngle = -angle * Math.floor(count / 2);
  
  for (let i = 0; i < count; i++) {
    colors.push(rotateHue(color, startAngle + angle * i));
  }
  
  return colors;
}

/**
 * 颜色调和 - 让目标颜色向主题色的色相靠拢
 * 使用 Lab 空间计算，保持感知一致性
 * 
 * @param {string} themeColor - 主题色 (RGB)
 * @param {string} targetColor - 目标颜色 (RGB)
 * @param {number} harmonizeRatio - 调和强度，0-1，0表示不调和，1表示完全采用主题色的色相
 * @returns {string} 调和后的颜色 (RGB)
 * 
 * @example
 * import { harmonizeColor } from '@aviala-design/color';
 * 
 * // 让错误色与品牌色保持和谐
 * const themeColor = '#3491FA';  // 蓝色主题
 * const errorColor = '#FF0000';  // 红色
 * const harmonized = harmonizeColor(themeColor, errorColor, 0.15);
 * // 错误色会带有一点蓝色调，与主题更协调
 * 
 * @example
 * // 调和语义色系
 * const primaryColor = '#6200EE';
 * const success = harmonizeColor(primaryColor, '#4CAF50');
 * const warning = harmonizeColor(primaryColor, '#FF9800');
 * const error = harmonizeColor(primaryColor, '#F44336');
 */
export function harmonizeColor(themeColor, targetColor, harmonizeRatio = 0.15) {
  // 验证输入
  if (!themeColor || !targetColor) {
    throw new Error('Both theme color and target color are required');
  }
  
  // 验证并限制调和比例
  const clampedRatio = Math.max(0, Math.min(1, harmonizeRatio));
  
  // 使用只调整色相的混合模式
  return blendHueOnly(targetColor, themeColor, clampedRatio);
}

/**
 * 生成主题色变体 - 基于主题色生成不同明度的颜色变体
 * @param {string} themeColor - 主题色 (RGB)
 * @param {number[]|{tones?: number[]}} [options] - 配置选项，可以是对象 {tones: [...]} 或直接传入数组
 * @returns {string[]} 主题色变体数组
 * 
 * @example
 * import { generateThemeVariants } from '@aviala-design/color';
 * 
 * // 生成默认的色调变体
 * const variants = generateThemeVariants('#3491FA');
 * // 返回 9 个色调的变体 (10, 20, 30, ..., 90)
 * 
 * @example
 * // 自定义色调值
 * const customVariants = generateThemeVariants('#FF5722', {
 *   tones: [20, 40, 60, 80, 95]
 * });
 * 
 * @example
 * // 数组形式传参
 * const variants = generateThemeVariants('#6200EE', [30, 50, 70]);
 */
export function generateThemeVariants(themeColor, options) {
  // 验证主题色输入
  if (!themeColor) {
    throw new Error('Theme color is required');
  }
  
  const themeHct = rgbToHct(themeColor);
  
  // 支持两种参数格式：对象 {tones: [...]} 或直接数组
  let toneSteps;
  if (Array.isArray(options)) {
    toneSteps = options;
  } else if (options && options.tones && Array.isArray(options.tones)) {
    toneSteps = options.tones;
  } else {
    // 默认值
    toneSteps = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  }
  
  // 验证色调数组
  if (!Array.isArray(toneSteps) || toneSteps.length === 0) {
    throw new Error('Tone steps must be a non-empty array');
  }
  
  // 验证并限制色调值范围
  const validToneSteps = toneSteps.filter(tone => {
    return typeof tone === 'number' && tone >= 0 && tone <= 100;
  });
  
  if (validToneSteps.length === 0) {
    throw new Error('No valid tone values found (must be numbers between 0-100)');
  }
  
  return validToneSteps.map(tone => {
    return hctToRgb({
      h: themeHct.h,
      c: themeHct.c,
      t: tone
    });
  });
}



/**
 * UI 元素颜色混合 - 为按钮、卡片等 UI 元素生成主题化颜色
 * @param {string} themeColor - 主题色
 * @param {{[key: string]: string}} uiColors - UI 颜色对象
 * @param {number} [blendRatio] - 混合强度
 * @returns {{[key: string]: string}} 混合后的 UI 颜色对象
 * 
 * @example
 * import { blendUIColors } from '@aviala-design/color';
 * 
 * // 为 UI 元素注入品牌色
 * const brandColor = '#3491FA';
 * const uiColors = {
 *   button: '#E0E0E0',
 *   card: '#F5F5F5',
 *   input: '#FFFFFF'
 * };
 * const themed = blendUIColors(brandColor, uiColors, 0.1);
 * // 所有 UI 颜色会带有品牌色调
 * 
 * @example
 * // 创建主题化组件色板
 * const result = blendUIColors('#6200EE', {
 *   surface: '#FFFFFF',
 *   background: '#F5F5F5',
 *   divider: '#E0E0E0'
 * });
 */
export function blendUIColors(themeColor, uiColors, blendRatio = 0.2) {
  // 验证输入
  if (!themeColor) {
    throw new Error('Theme color is required');
  }
  
  if (!uiColors || typeof uiColors !== 'object') {
    throw new Error('UI colors must be an object');
  }
  
  // 验证并限制混合比例
  const clampedRatio = Math.max(0, Math.min(1, blendRatio));
  
  /** @type {{[key: string]: string}} */
  const result = {};
  
  for (const [key, color] of Object.entries(uiColors)) {
    try {
      result[key] = blendInHct(themeColor, color, clampedRatio);
    } catch (error) {
      const err = /** @type {Error} */ (error);
      console.warn(`Failed to blend color for key "${key}": ${err.message}`);
      result[key] = color; // 保持原色作为回退
    }
  }
  
  return result;
}

/**
 * 生成基础控件颜色（灰色系1-12）
 * @param {string} themeColor - 主题颜色
 * @param {{baseGray?: string, blendRatio?: number, isDark?: boolean, steps?: number, lightnessRange?: number, minLightness?: number, maxLightness?: number}} [options] - 配置选项
 * @returns {{[key: string]: string}} 基础控件颜色对象
 * 
 * @example
 * import { generateControlColors } from '@aviala-design/color';
 * 
 * // 生成基础控件色板
 * const controls = generateControlColors('#3491FA');
 * console.log(controls['gray-1']);  // 最浅的灰色
 * console.log(controls['gray-12']); // 最深的灰色
 * 
 * @example
 * // 深色模式控件色
 * const darkControls = generateControlColors('#FF5722', {
 *   isDark: true,
 *   blendRatio: 0.15
 * });
 * 
 * @example
 * // 更细腻的灰度梯度（24 个等级）
 * const fineGrained = generateControlColors('#3491FA', {
 *   steps: 24
 * });
 * 
 * @example
 * // 使用 lightnessRange（基于中心扩展）
 * const wideRange = generateControlColors('#3491FA', {
 *   lightnessRange: 90,  // 增加范围以接近纯白和纯黑
 *   steps: 12
 * });
 * 
 * @example
 * // 直接指定最大/最小亮度（推荐：更精确控制）
 * const fixedRange = generateControlColors('#3491FA', {
 *   minLightness: 10,   // 最深色接近纯黑
 *   maxLightness: 98,   // 最浅色接近纯白
 *   steps: 12
 * });
 * // 最浅色更接近白色，最深色更接近黑色
 */
export function generateControlColors(themeColor, options = {}) {
  // 验证输入
  if (!themeColor) {
    throw new Error('Theme color is required');
  }
  
  const { 
    baseGray = '#989898',
    blendRatio = 0.08,
    isDark = false,
    steps = 12,  // 默认 12 个等级，可以增加到 24、36 等以获得更细腻的梯度
    lightnessRange = 85,  // 亮度变化范围（中心扩展模式），默认 85
    minLightness = null,  // 最小亮度（固定端点模式），优先级高于 lightnessRange
    maxLightness = null   // 最大亮度（固定端点模式），优先级高于 lightnessRange
  } = options;
  
  // 验证混合比例
  const clampedBlendRatio = Math.max(0, Math.min(1, blendRatio));
  
  // 验证步数
  const validSteps = Math.max(2, Math.min(100, Math.round(steps)));
  
  // 步骤1: 混合基础灰色和主题色，得到一个带有主题色倾向的基准灰
  const blendedBase = blendInHct(baseGray, themeColor, clampedBlendRatio);
  
  // 步骤2: 使用单色调渐变算法生成指定数量的亮度等级
  /** @type {{steps: number, format: string, lightnessRange?: number, minLightness?: number, maxLightness?: number}} */
  const monochromeOptions = { 
    steps: validSteps, 
    format: 'hex'
  };
  
  // 优先使用固定端点模式（minLightness + maxLightness）
  if (minLightness !== null && maxLightness !== null) {
    monochromeOptions.minLightness = minLightness;
    monochromeOptions.maxLightness = maxLightness;
  } else {
    // 否则使用中心扩展模式（lightnessRange）
    const validLightnessRange = Math.max(20, Math.min(95, lightnessRange));
    monochromeOptions.lightnessRange = validLightnessRange;
  }
  
  const colors = generateMonochromeLinear(blendedBase, monochromeOptions);
  
  // 步骤3: 根据深色/浅色模式排序
  const sortedColors = isDark ? colors.reverse() : colors;
  
  /** @type {{[key: string]: string}} */
  const controlColors = {};
  sortedColors.forEach((color, index) => {
    controlColors[`gray-${index + 1}`] = color;
  });
  
  return controlColors;
}

/**
 * 生成表意色（1-10）
 * @param {string} themeColor - 主题颜色
 * @param {{semanticColors?: {[key: string]: string}, blendRatio?: number, isDark?: boolean, steps?: number, lightnessRange?: number, minLightness?: number, maxLightness?: number}} [options] - 配置选项
 * @returns {{[key: string]: string}} 表意色对象
 * 
 * @example
 * import { generateSemanticColors } from '@aviala-design/color';
 * 
 * // 生成默认的语义色系
 * const semantics = generateSemanticColors('#3491FA');
 * console.log(semantics.success1);  // 成功色最浅色调
 * console.log(semantics.error6);    // 错误色标准色调
 * 
 * @example
 * // 自定义语义色基础色
 * const custom = generateSemanticColors('#6200EE', {
 *   semanticColors: {
 *     success: '#00C853',
 *     warning: '#FFB300',
 *     error: '#D50000',
 *     info: '#2979FF'
 *   },
 *   blendRatio: 0.1
 * });
 * 
 * @example
 * // 使用固定端点模式获得更广的亮度范围
 * const wideRange = generateSemanticColors('#3491FA', {
 *   minLightness: 10,
 *   maxLightness: 95,
 *   steps: 10
 * });
 */
export function generateSemanticColors(themeColor, options = {}) {
  // 验证输入
  if (!themeColor) {
    throw new Error('Theme color is required');
  }
  
  const { 
    semanticColors = {
      success: '#52c41a',
      warning: '#faad14', 
      error: '#ff4d4f',
      info: '#1890ff'
    },
    blendRatio = 0.00,
    isDark = false,
    steps = 10,  // 默认生成 10 个色阶
    lightnessRange = 80,  // 亮度变化范围（中心扩展模式）
    minLightness = null,  // 最小亮度（固定端点模式）
    maxLightness = null   // 最大亮度（固定端点模式）
  } = options;
  
  // 验证语义色对象
  if (!semanticColors || typeof semanticColors !== 'object') {
    throw new Error('Semantic colors must be an object');
  }
  
  // 验证混合比例
  const clampedBlendRatio = Math.max(0, Math.min(1, blendRatio));
  
  // 验证步数
  const validSteps = Math.max(2, Math.min(100, Math.round(steps)));
  
  /** @type {{[key: string]: string}} */
  const result = {};
  
  Object.entries(semanticColors).forEach(([name, color]) => {
    if (!color || typeof color !== 'string') {
      console.warn(`Invalid color for semantic color "${name}": ${color}`);
      return;
    }
    
    try {
      // 步骤1: 使用 HCT 颜色空间混合品牌色和语义色主色
      const blendedBase = blendInHct(color, themeColor, clampedBlendRatio);
      
      // 步骤2: 使用单色调渐变算法生成完整色盘
      /** @type {{steps: number, format: string, lightnessRange?: number, minLightness?: number, maxLightness?: number}} */
      const monochromeOptions = { 
        steps: validSteps, 
        format: 'hex'
      };
      
      // 优先使用固定端点模式
      if (minLightness !== null && maxLightness !== null) {
        monochromeOptions.minLightness = minLightness;
        monochromeOptions.maxLightness = maxLightness;
      } else {
        // 否则使用中心扩展模式
        const validLightnessRange = Math.max(20, Math.min(95, lightnessRange));
        monochromeOptions.lightnessRange = validLightnessRange;
      }
      
      const colors = generateMonochromeLinear(blendedBase, monochromeOptions);
      
      // 步骤3: 根据深色/浅色模式排序
      const sortedColors = isDark ? colors.reverse() : colors;
      
      // 将颜色分配到结果对象
      sortedColors.forEach((colorValue, index) => {
        result[`${name}-${index + 1}`] = colorValue;
      });
    } catch (error) {
      const err = /** @type {Error} */ (error);
      console.warn(`Failed to generate variants for semantic color "${name}": ${err.message}`);
    }
  });
  
  return result;
}

/**
 * 生成主题色（1-10）
 * @param {string} themeColor - 主题颜色
 * @param {{isDark?: boolean, steps?: number, lightnessRange?: number, minLightness?: number, maxLightness?: number}} [options] - 配置选项
 * @returns {{[key: string]: string}} 主题色对象
 * 
 * @example
 * import { generateThemeColors } from '@aviala-design/color';
 * 
 * // 生成主题色色阶
 * const themeColors = generateThemeColors('#3491FA');
 * console.log(themeColors.theme1);   // 最浅色调
 * console.log(themeColors.theme6);   // 标准色调
 * console.log(themeColors.theme10);  // 最深色调
 * 
 * @example
 * // 深色模式主题色
 * const darkTheme = generateThemeColors('#FF5722', { isDark: true });
 * 
 * @example
 * // 使用固定端点模式
 * const wideRange = generateThemeColors('#3491FA', {
 *   minLightness: 15,
 *   maxLightness: 95,
 *   steps: 10
 * });
 */
export function generateThemeColors(themeColor, options = {}) {
  // 验证输入
  if (!themeColor) {
    throw new Error('Theme color is required');
  }
  
  const { 
    isDark = false,
    steps = 10,  // 默认生成 10 个色阶
    lightnessRange = 80,  // 亮度变化范围（中心扩展模式）
    minLightness = null,  // 最小亮度（固定端点模式）
    maxLightness = null   // 最大亮度（固定端点模式）
  } = options;
  
  // 验证步数
  const validSteps = Math.max(2, Math.min(100, Math.round(steps)));
  
  // 使用单色调渐变算法生成主题色色阶
  /** @type {{steps: number, format: string, lightnessRange?: number, minLightness?: number, maxLightness?: number}} */
  const monochromeOptions = { 
    steps: validSteps, 
    format: 'hex'
  };
  
  // 优先使用固定端点模式
  if (minLightness !== null && maxLightness !== null) {
    monochromeOptions.minLightness = minLightness;
    monochromeOptions.maxLightness = maxLightness;
  } else {
    // 否则使用中心扩展模式
    const validLightnessRange = Math.max(20, Math.min(95, lightnessRange));
    monochromeOptions.lightnessRange = validLightnessRange;
  }
  
  const colors = generateMonochromeLinear(themeColor, monochromeOptions);
  
  // 根据深色/浅色模式排序
  const sortedColors = isDark ? colors.reverse() : colors;
  
  /** @type {{[key: string]: string}} */
  const themeColors = {};
  sortedColors.forEach((color, index) => {
    themeColors[`theme-${index + 1}`] = color;
  });
  
  return themeColors;
}

/**
 * 生成完整的界面色彩系统
 * @param {string} themeColor - 主题颜色
 * @param {*} [options] - 配置选项
 * @returns {{controls: object, semantic: object, theme: object}} 包含三个部分的完整色彩系统
 * 
 * @example
 * import { generateInterfaceColorSystem } from '@aviala-design/color';
 * 
 * // 生成完整色彩系统
 * const colorSystem = generateInterfaceColorSystem('#3491FA');
 * console.log(colorSystem.controls);  // 灰色系 1-12
 * console.log(colorSystem.semantic);  // 语义色系
 * console.log(colorSystem.theme);     // 主题色系
 * 
 * @example
 * // 深色模式色彩系统
 * const darkSystem = generateInterfaceColorSystem('#6200EE', {
 *   isDark: true,
 *   controlBlendRatio: 0.1,
 *   semanticBlendRatio: 0.15
 * });
 * 
 * @example
 * // 使用 lightnessRange（中心扩展模式）
 * const customSystem = generateInterfaceColorSystem('#3491FA', {
 *   controlSteps: 24,           // 24 级灰度
 *   controlLightnessRange: 90,  // 更接近纯白/纯黑
 *   controlBlendRatio: 0.1
 * });
 * 
 * @example
 * // 使用固定端点模式（推荐：精确控制最浅/最深色）
 * const preciseSystem = generateInterfaceColorSystem('#3491FA', {
 *   controlSteps: 12,
 *   controlMinLightness: 10,   // 最深色接近纯黑
 *   controlMaxLightness: 98,   // 最浅色接近纯白
 *   semanticMinLightness: 15,  // 语义色最深
 *   semanticMaxLightness: 95,  // 语义色最浅
 *   themeMinLightness: 15,     // 主题色最深
 *   themeMaxLightness: 95      // 主题色最浅
 * });
 * // 生成接近纯白到纯黑的灰度系统
 */
export function generateInterfaceColorSystem(themeColor, options = {}) {
  // 验证输入
  if (!themeColor) {
    throw new Error('Theme color is required');
  }
  
  const { 
    baseGray = '#666666',
    isDark = false,
    semanticColors,
    controlBlendRatio = 0.08,
    semanticBlendRatio = 0.12,
    controlSteps = 12,  // 控件色灰度等级数
    controlLightnessRange = 85,  // 控件色亮度变化范围（中心扩展模式）
    controlMinLightness = null,  // 控件色最小亮度（固定端点模式）
    controlMaxLightness = null,  // 控件色最大亮度（固定端点模式）
    semanticSteps = 10,  // 语义色等级数
    semanticLightnessRange = 80,  // 语义色亮度变化范围
    semanticMinLightness = null,  // 语义色最小亮度
    semanticMaxLightness = null,  // 语义色最大亮度
    themeSteps = 10,  // 主题色等级数
    themeLightnessRange = 80,  // 主题色亮度变化范围
    themeMinLightness = null,  // 主题色最小亮度
    themeMaxLightness = null   // 主题色最大亮度
  } = options;
  
  // 验证混合比例
  const clampedControlBlendRatio = Math.max(0, Math.min(1, controlBlendRatio));
  const clampedSemanticBlendRatio = Math.max(0, Math.min(1, semanticBlendRatio));
  
  /** @type {{baseGray: string, blendRatio: number, isDark: boolean, steps: number, lightnessRange?: number, minLightness?: number, maxLightness?: number}} */
  const controlOptions = {
    baseGray,
    blendRatio: clampedControlBlendRatio, 
    isDark,
    steps: controlSteps
  };
  
  // 优先使用固定端点模式
  if (controlMinLightness !== null && controlMaxLightness !== null) {
    controlOptions.minLightness = controlMinLightness;
    controlOptions.maxLightness = controlMaxLightness;
  } else {
    controlOptions.lightnessRange = controlLightnessRange;
  }
  
  /** @type {{semanticColors?: any, blendRatio: number, isDark: boolean, steps: number, lightnessRange?: number, minLightness?: number, maxLightness?: number}} */
  const semanticOptions = {
    semanticColors,
    blendRatio: clampedSemanticBlendRatio,
    isDark,
    steps: semanticSteps
  };
  
  if (semanticMinLightness !== null && semanticMaxLightness !== null) {
    semanticOptions.minLightness = semanticMinLightness;
    semanticOptions.maxLightness = semanticMaxLightness;
  } else {
    semanticOptions.lightnessRange = semanticLightnessRange;
  }
  
  /** @type {{isDark: boolean, steps: number, lightnessRange?: number, minLightness?: number, maxLightness?: number}} */
  const themeOptions = {
    isDark,
    steps: themeSteps
  };
  
  if (themeMinLightness !== null && themeMaxLightness !== null) {
    themeOptions.minLightness = themeMinLightness;
    themeOptions.maxLightness = themeMaxLightness;
  } else {
    themeOptions.lightnessRange = themeLightnessRange;
  }
  
  return {
    // 1. 基础控件颜色（灰色系1-12或更多）
    controls: generateControlColors(themeColor, controlOptions),
    
    // 2. 表意色（1-10或更多）
    semantic: generateSemanticColors(themeColor, semanticOptions),
    
    // 3. 主题色（1-10或更多）
    theme: generateThemeColors(themeColor, themeOptions)
  };
}

/**
 * 生成完整的主题色板
 * @param {string} themeColor - 主题色
 * @param {*} [options] - 配置选项
 * @returns {{theme: object, controls: object, semantic: object, ui: object}} 完整的主题色板
 * 
 * @example
 * import { generateThemePalette } from '@aviala-design/color';
 * 
 * // 生成完整主题色板
 * const palette = generateThemePalette('#3491FA');
 * console.log(palette.theme);     // 主题色变体
 * console.log(palette.controls);  // 控件颜色
 * console.log(palette.semantic);  // 语义色系
 * console.log(palette.ui);        // UI 元素颜色
 * 
 * @example
 * // 自定义完整色板
 * const customPalette = generateThemePalette('#6200EE', {
 *   isDark: true,
 *   semanticColors: {
 *     success: '#00C853',
 *     error: '#D50000'
 *   },
 *   harmonizeRatio: 0.2
 * });
 */
export function generateThemePalette(themeColor, options = {}) {
  // 验证输入
  if (!themeColor) {
    throw new Error('Theme color is required');
  }
  
  const {
    semanticColors = {
      success: '#52c41a',
      warning: '#faad14',
      error: '#ff4d4f',
      info: '#1890ff'
    },
    uiColors = {
      background: '#ffffff',
      surface: '#fafafa',
      border: '#d9d9d9',
      disabled: '#f5f5f5'
    },
    harmonizeRatio = 0.15,
    blendRatio = 0.12,
    isDark = false
  } = /** @type {any} */ (options);
  
  // 验证并限制比例参数
  const clampedHarmonizeRatio = Math.max(0, Math.min(1, harmonizeRatio));
  const clampedBlendRatio = Math.max(0, Math.min(1, blendRatio));
  
  // 生成主题色阶（1-10）
  const themeColors = generateThemeColors(themeColor, { isDark });
  
  // 生成中性色阶（1-12）
  const controlColors = generateControlColors(themeColor, { 
    blendRatio: clampedBlendRatio * 0.5, // 中性色混合比例稍低
    isDark 
  });
  
  // 生成语义色变体
  const semanticVariants = generateSemanticColors(themeColor, { 
    semanticColors, 
    blendRatio: clampedHarmonizeRatio,
    isDark 
  });
  
  // 将扁平的语义色变体重新组织为嵌套结构
  /** @type {any} */
  const semantic = {};
  Object.entries(semanticColors).forEach(([name]) => {
    semantic[name] = {};
    for (let i = 1; i <= 10; i++) {
      const key = `${name}-${i}`;
      if (semanticVariants[key]) {
        semantic[name][i] = semanticVariants[key];
      }
    }
  });
  
  const palette = {
    theme: themeColors,     // 主题色阶 theme-1 到 theme-10
    controls: controlColors, // 中性色阶 gray-1 到 gray-12
    semantic,               // 功能色系
    ui: blendUIColors(themeColor, uiColors, clampedBlendRatio)
  };
  
  return palette;
}