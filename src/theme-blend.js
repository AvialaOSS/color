/**
 * 主题色混合模块
 * 基于 Material Design 3 的 HCT 颜色空间实现颜色混合和调和
 * 
 * HCT (Hue, Chroma, Tone) 颜色空间结合了 CAM16 和 CIE-Lab 的优势：
 * - H (Hue): 色相，0-360度
 * - C (Chroma): 色度，颜色的饱和度 
 * - T (Tone): 色调，亮度从黑色(0)到白色(100)
 */

/**
 * 将 RGB 颜色转换为 HCT 颜色空间
 * 这是一个简化的实现，实际的 HCT 转换需要复杂的 CAM16 计算
 * @param {string} rgb - RGB 颜色值，格式如 "#ff0000"
 * @returns {Object} HCT 颜色对象 {h, c, t}
 */
function rgbToHct(rgb) {
  // 移除 # 符号
  const hex = rgb.replace('#', '');
  
  // 转换为 RGB 值
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // 转换为 HSL 作为 HCT 的近似
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  // 计算色相 (Hue)
  let h = 0;
  if (diff !== 0) {
    if (max === r) {
      h = ((g - b) / diff) % 6;
    } else if (max === g) {
      h = (b - r) / diff + 2;
    } else {
      h = (r - g) / diff + 4;
    }
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  
  // 计算亮度 (Tone) - 使用感知亮度公式
  const tone = Math.round((0.299 * r + 0.587 * g + 0.114 * b) * 100);
  
  // 计算色度 (Chroma) - 基于饱和度和亮度
  const lightness = (max + min) / 2;
  const saturation = diff === 0 ? 0 : diff / (1 - Math.abs(2 * lightness - 1));
  const chroma = Math.round(saturation * Math.min(tone, 100 - tone));
  
  return { h, c: chroma, t: tone };
}

/**
 * 将 HCT 颜色转换为 RGB
 * @param {Object} hct - HCT 颜色对象 {h, c, t}
 * @returns {string} RGB 颜色值，格式如 "#ff0000"
 */
function hctToRgb(hct) {
  const { h, c, t } = hct;
  
  // 边界检查
  const hue = ((h % 360) + 360) % 360; // 确保色相在 0-360 范围内
  const chroma = Math.max(0, Math.min(150, c)); // 限制饱和度范围
  const tone = Math.max(0, Math.min(100, t)); // 限制明度范围
  
  // 将 HCT 转换回 HSL
  const lightness = tone / 100;
  const saturation = tone === 0 || tone === 100 ? 0 : chroma / Math.min(tone, 100 - tone);
  
  // HSL 转 RGB
  const chromaRgb = (1 - Math.abs(2 * lightness - 1)) * Math.min(1, saturation);
  const x = chromaRgb * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lightness - chromaRgb / 2;
  
  let r, g, b;
  
  if (hue >= 0 && hue < 60) {
    [r, g, b] = [chromaRgb, x, 0];
  } else if (hue >= 60 && hue < 120) {
    [r, g, b] = [x, chromaRgb, 0];
  } else if (hue >= 120 && hue < 180) {
    [r, g, b] = [0, chromaRgb, x];
  } else if (hue >= 180 && hue < 240) {
    [r, g, b] = [0, x, chromaRgb];
  } else if (hue >= 240 && hue < 300) {
    [r, g, b] = [x, 0, chromaRgb];
  } else {
    [r, g, b] = [chromaRgb, 0, x];
  }
  
  // 转换为 0-255 范围并格式化为十六进制
  const toHex = (val) => {
    const clampedVal = Math.max(0, Math.min(1, val + m));
    const hex = Math.round(clampedVal * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 在 HCT 颜色空间中混合两种颜色
 * @param {string} color1 - 第一种颜色 (RGB)
 * @param {string} color2 - 第二种颜色 (RGB)
 * @param {number} ratio - 混合比例，0-1，0表示完全是color1，1表示完全是color2
 * @returns {string} 混合后的颜色 (RGB)
 */
function blendInHct(color1, color2, ratio = 0.5) {
  const hct1 = rgbToHct(color1);
  const hct2 = rgbToHct(color2);
  
  // 处理色相的环形插值
  let h1 = hct1.h;
  let h2 = hct2.h;
  let hDiff = h2 - h1;
  
  if (Math.abs(hDiff) > 180) {
    if (hDiff > 0) {
      h1 += 360;
    } else {
      h2 += 360;
    }
  }
  
  const blendedH = (h1 + (h2 - h1) * ratio) % 360;
  const blendedC = hct1.c + (hct2.c - hct1.c) * ratio;
  const blendedT = hct1.t + (hct2.t - hct1.t) * ratio;
  
  return hctToRgb({
    h: blendedH < 0 ? blendedH + 360 : blendedH,
    c: Math.max(0, Math.round(blendedC)),
    t: Math.max(0, Math.min(100, Math.round(blendedT)))
  });
}

/**
 * 颜色调和 - 让目标颜色向主题色的色相靠拢
 * @param {string} themeColor - 主题色 (RGB)
 * @param {string} targetColor - 目标颜色 (RGB)
 * @param {number} harmonizeRatio - 调和强度，0-1，0表示不调和，1表示完全采用主题色的色相
 * @returns {string} 调和后的颜色 (RGB)
 */
function harmonizeColor(themeColor, targetColor, harmonizeRatio = 0.15) {
  const themeHct = rgbToHct(themeColor);
  const targetHct = rgbToHct(targetColor);
  
  // 调整目标颜色的色相向主题色靠拢
  let targetH = targetHct.h;
  let themeH = themeHct.h;
  let hDiff = themeH - targetH;
  
  // 处理色相环的最短路径
  if (Math.abs(hDiff) > 180) {
    if (hDiff > 0) {
      targetH += 360;
    } else {
      themeH += 360;
    }
    hDiff = themeH - targetH;
  }
  
  const harmonizedH = (targetH + hDiff * harmonizeRatio) % 360;
  
  return hctToRgb({
    h: harmonizedH < 0 ? harmonizedH + 360 : harmonizedH,
    c: targetHct.c, // 保持原有色度
    t: targetHct.t  // 保持原有色调
  });
}

/**
 * 生成主题色变体 - 基于主题色生成不同明度的颜色变体
 * @param {string} themeColor - 主题色 (RGB)
 * @param {Object|Array} options - 配置选项，可以是对象 {tones: [...]} 或直接传入数组
 * @returns {Array} 主题色变体数组
 */
function generateThemeVariants(themeColor, options = [10, 20, 30, 40, 50, 60, 70, 80, 90]) {
  const themeHct = rgbToHct(themeColor);
  
  // 支持两种参数格式：对象 {tones: [...]} 或直接数组
  let toneSteps;
  if (Array.isArray(options)) {
    toneSteps = options;
  } else if (options && options.tones && Array.isArray(options.tones)) {
    toneSteps = options.tones;
  } else {
    toneSteps = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  }
  
  return toneSteps.map(tone => {
    return hctToRgb({
      h: themeHct.h,
      c: themeHct.c,
      t: tone
    });
  });
}

/**
 * 表意色混合 - 为成功、警告、错误等状态色添加主题色调
 * @param {string} themeColor - 主题色
 * @param {Object} semanticColors - 表意色对象，如 {success: '#4caf50', warning: '#ff9800', error: '#f44336'}
 * @param {number} blendRatio - 混合强度
 * @returns {Object} 混合后的表意色对象
 */
function blendSemanticColors(themeColor, semanticColors, blendRatio = 0.15) {
  const result = {};
  
  for (const [key, color] of Object.entries(semanticColors)) {
    result[key] = harmonizeColor(themeColor, color, blendRatio);
  }
  
  return result;
}

/**
 * UI 元素颜色混合 - 为按钮、卡片等 UI 元素生成主题化颜色
 * @param {string} themeColor - 主题色
 * @param {Object} uiColors - UI 颜色对象
 * @param {number} blendRatio - 混合强度
 * @returns {Object} 混合后的 UI 颜色对象
 */
function blendUIColors(themeColor, uiColors, blendRatio = 0.2) {
  const result = {};
  
  for (const [key, color] of Object.entries(uiColors)) {
    result[key] = blendInHct(themeColor, color, blendRatio);
  }
  
  return result;
}

/**
 * 生成基础控件颜色（灰色系1-12）
 * @param {string} themeColor - 主题颜色
 * @param {Object} options - 配置选项
 * @returns {Object} 基础控件颜色对象
 */
export function generateControlColors(themeColor, options = {}) {
  const { baseGray = '#666666' } = options;
  const { blendRatio = 0.08, isDark = false } = options;
  
  const baseHct = rgbToHct(baseGray);
  const controlColors = {};
  
  // 生成12个灰色等级
  const toneSteps = isDark 
    ? [95, 90, 85, 80, 70, 60, 50, 40, 30, 20, 15, 10] // 暗色模式：从亮到暗
    : [10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95]; // 亮色模式：从暗到亮
  
  toneSteps.forEach((tone, index) => {
     const grayHct = {h: baseHct.h, c: baseHct.c, t: tone};
     const blendedColor = blendInHct(hctToRgb(grayHct), themeColor, blendRatio);
     controlColors[`gray-${index + 1}`] = blendedColor;
   });
  
  return controlColors;
}

/**
 * 生成表意色（1-10）
 * @param {string} themeColor - 主题颜色
 * @param {Object} options - 配置选项
 * @returns {Object} 表意色对象
 */
export function generateSemanticColors(themeColor, options = {}) {
  const { 
    semanticColors = {
      success: '#52c41a',
      warning: '#faad14', 
      error: '#ff4d4f',
      info: '#1890ff'
    },
    blendRatio = 0.12,
    isDark = false
  } = options;
  
  const result = {};
  
  Object.entries(semanticColors).forEach(([name, color]) => {
    const colorVariants = {};
    const baseHct = rgbToHct(color);
    
    // 生成10个色阶
    const toneSteps = isDark
      ? [90, 80, 70, 60, 50, 40, 30, 25, 20, 15] // 暗色模式
      : [15, 25, 35, 45, 55, 65, 75, 85, 90, 95]; // 亮色模式
    
    toneSteps.forEach((tone, index) => {
       const variantHct = {h: baseHct.h, c: baseHct.c, t: tone};
       const blendedColor = blendInHct(hctToRgb(variantHct), themeColor, blendRatio);
       colorVariants[`${name}-${index + 1}`] = blendedColor;
     });
    
    Object.assign(result, colorVariants);
  });
  
  return result;
}

/**
 * 生成主题色（1-10）
 * @param {string} themeColor - 主题颜色
 * @param {Object} options - 配置选项
 * @returns {Object} 主题色对象
 */
export function generateThemeColors(themeColor, options = {}) {
  const { isDark = false } = options;
  
  const baseHct = rgbToHct(themeColor);
  const themeColors = {};
  
  // 生成10个主题色阶
  const toneSteps = isDark
    ? [90, 80, 70, 60, 50, 40, 30, 25, 20, 15] // 暗色模式
    : [15, 25, 35, 45, 55, 65, 75, 85, 90, 95]; // 亮色模式
  
  toneSteps.forEach((tone, index) => {
    const themeHct = {h: baseHct.h, c: baseHct.c, t: tone};
    themeColors[`theme-${index + 1}`] = hctToRgb(themeHct);
  });
  
  return themeColors;
}

/**
 * 生成完整的界面色彩系统
 * @param {string} themeColor - 主题颜色
 * @param {Object} options - 配置选项
 * @returns {Object} 包含三个部分的完整色彩系统
 */
export function generateInterfaceColorSystem(themeColor, options = {}) {
  const { 
    baseGray = '#666666',
    isDark = false,
    semanticColors,
    controlBlendRatio = 0.08,
    semanticBlendRatio = 0.12
  } = options;
  
  return {
    // 1. 基础控件颜色（灰色系1-12）
    controls: generateControlColors(themeColor, { 
      baseGray,
      blendRatio: controlBlendRatio, 
      isDark 
    }),
    
    // 2. 表意色（1-10）
    semantic: generateSemanticColors(themeColor, { 
      semanticColors, 
      blendRatio: semanticBlendRatio, 
      isDark 
    }),
    
    // 3. 主题色（1-10）
    theme: generateThemeColors(themeColor, { isDark })
  };
}

/**
 * 生成完整的主题色板
 * @param {string} themeColor - 主题色
 * @param {Object} options - 配置选项
 * @returns {Object} 完整的主题色板
 */
function generateThemePalette(themeColor, options = {}) {
  const {
    semanticColors = {
      success: '#4caf50',
      warning: '#ff9800', 
      error: '#f44336',
      info: '#2196f3'
    },
    uiColors = {
      primary: themeColor,
      'primary-light': '#ffffff',
      'primary-lighter': '#f8f9ff',
      'primary-dark': '#000000',
      'primary-darker': '#0a0a0a',
      'accent': '#722ed1',
      'neutral-1': '#f7f8fa',
      'neutral-2': '#f2f3f5',
      'neutral-3': '#e5e6eb',
      'neutral-4': '#c9cdd4',
      'neutral-5': '#a9aeb8',
      'neutral-6': '#86909c',
      'background': '#ffffff',
      'surface': '#f8f9fa',
      'border': '#e5e6eb',
      'disabled': '#c9cdd4'
    },
    harmonizeRatio = 0.15,
    blendRatio = 0.12,
    generateVariants = true
  } = options;
  
  const palette = {
    theme: themeColor,
    semantic: blendSemanticColors(themeColor, semanticColors, harmonizeRatio),
    ui: blendUIColors(themeColor, uiColors, blendRatio)
  };
  
  if (generateVariants) {
    palette.variants = generateThemeVariants(themeColor);
  }
  
  return palette;
}

export {
  rgbToHct,
  hctToRgb,
  blendInHct,
  harmonizeColor,
  generateThemeVariants,
  blendSemanticColors,
  blendUIColors,
  generateThemePalette
};