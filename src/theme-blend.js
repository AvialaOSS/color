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
export function rgbToHct(rgb) {
  // 验证输入格式
  if (!rgb || typeof rgb !== 'string') {
    throw new Error('Invalid RGB color: must be a string');
  }
  
  // 移除 # 符号
  const hex = rgb.replace('#', '');
  
  // 验证十六进制格式
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error('Invalid RGB color format: must be #rrggbb or rrggbb');
  }
  
  // 转换为 RGB 值 - 使用 slice 替代 substr
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  
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
  
  // 计算色度 (Chroma) - 修复计算公式
  const lightness = (max + min) / 2;
  let saturation = 0;
  if (diff !== 0 && lightness !== 0 && lightness !== 1) {
    saturation = diff / (1 - Math.abs(2 * lightness - 1));
  }
  
  // 改进色度计算，避免除零错误
  let chroma = 0;
  if (tone > 0 && tone < 100) {
    chroma = Math.round(saturation * Math.min(tone, 100 - tone));
  }
  
  return { h, c: Math.max(0, chroma), t: Math.max(0, Math.min(100, tone)) };
}

/**
 * 将 HCT 颜色转换为 RGB
 * @param {Object} hct - HCT 颜色对象 {h, c, t}
 * @param {Object} options - 配置选项
 * @returns {string} RGB 颜色值，格式如 "#ff0000"
 */
export function hctToRgb(hct, options = {}) {
  // 验证输入
  if (!hct || typeof hct !== 'object' || hct.h === undefined || hct.c === undefined || hct.t === undefined) {
    throw new Error('Invalid HCT color: must be an object with h, c, t properties');
  }
  
  const { h, c, t } = hct;
  const { maxChroma = 200 } = options; // 允许更高的色度值，支持自定义
  
  // 边界检查
  const hue = ((h % 360) + 360) % 360; // 确保色相在 0-360 范围内
  const chroma = Math.max(0, Math.min(maxChroma, c)); // 动态限制色度范围
  const tone = Math.max(0, Math.min(100, t)); // 限制明度范围
  
  // 将 HCT 转换回 HSL，修复除零错误
  const lightness = tone / 100;
  let saturation = 0;
  if (tone > 0 && tone < 100 && chroma > 0) {
    const denominator = Math.min(tone, 100 - tone);
    saturation = denominator > 0 ? chroma / denominator : 0;
  }
  
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
export function blendInHct(color1, color2, ratio = 0.5) {
  // 验证输入
  if (!color1 || !color2) {
    throw new Error('Both colors are required for blending');
  }
  
  // 验证并限制混合比例
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  
  const hct1 = rgbToHct(color1);
  const hct2 = rgbToHct(color2);
  
  // 改进色相的环形插值算法
  let h1 = hct1.h;
  let h2 = hct2.h;
  let hDiff = h2 - h1;
  
  // 使用更精确的色相环形插值
  if (Math.abs(hDiff) > 180) {
    if (hDiff > 0) {
      h1 += 360;
    } else {
      h2 += 360;
    }
    hDiff = h2 - h1;
  }
  
  const blendedH = (h1 + hDiff * clampedRatio) % 360;
  const blendedC = hct1.c + (hct2.c - hct1.c) * clampedRatio;
  const blendedT = hct1.t + (hct2.t - hct1.t) * clampedRatio;
  
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
export function harmonizeColor(themeColor, targetColor, harmonizeRatio = 0.15) {
  // 验证输入
  if (!themeColor || !targetColor) {
    throw new Error('Both theme color and target color are required');
  }
  
  // 验证并限制调和比例
  const clampedRatio = Math.max(0, Math.min(1, harmonizeRatio));
  
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
  
  const harmonizedH = (targetH + hDiff * clampedRatio) % 360;
  
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
export function generateThemeVariants(themeColor, options = [10, 20, 30, 40, 50, 60, 70, 80, 90]) {
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
 * @param {Object} uiColors - UI 颜色对象
 * @param {number} blendRatio - 混合强度
 * @returns {Object} 混合后的 UI 颜色对象
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
  
  const result = {};
  
  for (const [key, color] of Object.entries(uiColors)) {
    try {
      result[key] = blendInHct(themeColor, color, clampedRatio);
    } catch (error) {
      console.warn(`Failed to blend color for key "${key}": ${error.message}`);
      result[key] = color; // 保持原色作为回退
    }
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
  // 验证输入
  if (!themeColor) {
    throw new Error('Theme color is required');
  }
  
  const { 
    baseGray = '#666666',
    blendRatio = 0.08,
    isDark = false
  } = options;
  
  // 验证混合比例
  const clampedBlendRatio = Math.max(0, Math.min(1, blendRatio));
    
  const baseHct = rgbToHct(baseGray);
  const controlColors = {};
  
  // 生成12个灰色等级
  const toneSteps = isDark 
    ? [95, 90, 85, 80, 70, 60, 50, 40, 30, 20, 15, 10] // 暗色模式：从亮到暗
    : [10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95]; // 亮色模式：从暗到亮
  
  toneSteps.forEach((tone, index) => {
     const grayHct = {h: baseHct.h, c: baseHct.c, t: tone};
     const blendedColor = blendInHct(hctToRgb(grayHct), themeColor, clampedBlendRatio);
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
    isDark = false
  } = options;
  
  // 验证语义色对象
  if (!semanticColors || typeof semanticColors !== 'object') {
    throw new Error('Semantic colors must be an object');
  }
  
  // 验证混合比例
  const clampedBlendRatio = Math.max(0, Math.min(1, blendRatio));
  
  const result = {};
  
  Object.entries(semanticColors).forEach(([name, color]) => {
    if (!color || typeof color !== 'string') {
      console.warn(`Invalid color for semantic color "${name}": ${color}`);
      return;
    }
    
    try {
      const colorVariants = {};
      const baseHct = rgbToHct(color);
      
      // 生成10个色阶
      const toneSteps = isDark
        ? [90, 80, 70, 60, 50, 40, 30, 25, 20, 15] // 暗色模式
        : [15, 25, 35, 45, 55, 65, 75, 85, 90, 95]; // 亮色模式
      
      toneSteps.forEach((tone, index) => {
         const variantHct = {h: baseHct.h, c: baseHct.c, t: tone};
         const blendedColor = blendInHct(hctToRgb(variantHct), themeColor, clampedBlendRatio);
         colorVariants[`${name}-${index + 1}`] = blendedColor;
       });
      
      Object.assign(result, colorVariants);
    } catch (error) {
      console.warn(`Failed to generate variants for semantic color "${name}": ${error.message}`);
    }
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
  // 验证输入
  if (!themeColor) {
    throw new Error('Theme color is required');
  }
  
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
  // 验证输入
  if (!themeColor) {
    throw new Error('Theme color is required');
  }
  
  const { 
    baseGray = '#666666',
    isDark = false,
    semanticColors,
    controlBlendRatio = 0.08,
    semanticBlendRatio = 0.12
  } = options;
  
  // 验证混合比例
  const clampedControlBlendRatio = Math.max(0, Math.min(1, controlBlendRatio));
  const clampedSemanticBlendRatio = Math.max(0, Math.min(1, semanticBlendRatio));
  
  return {
    // 1. 基础控件颜色（灰色系1-12）
    controls: generateControlColors(themeColor, { 
      baseGray,
      blendRatio: clampedControlBlendRatio, 
      isDark 
    }),
    
    // 2. 表意色（1-10）
    semantic: generateSemanticColors(themeColor, { 
      semanticColors, 
      blendRatio: clampedSemanticBlendRatio, 
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
  } = options;
  
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