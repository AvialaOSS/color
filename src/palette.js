import Color from 'color';
import { getColorString } from './utils.js';

// 色板

/**
 * 使用动态梯度算法生成单个色板颜色
 * @param {string} originColor - 基础颜色
 * @param {number} i - 色板索引 (1-10)
 * @param {string} format - 输出格式：'hex' | 'rgb' | 'hsl'
 * @returns {string} 生成的颜色字符串
 */
function colorPalette(originColor, i, format) {
  const color = Color(originColor);
  const h = color.hue();
  const s = color.saturationv();
  const v = color.value();

  // 根据色相区域动态调整步长
  /** @param {number} hue */
  const getHueStep = (hue) => {
    if (hue >= 60 && hue <= 240) {
      return 2.5; // 绿色-蓝色区域可以用更大的步长
    } else if ((hue >= 0 && hue < 60) || (hue > 300 && hue <= 360)) {
      return 1.5; // 红色区域使用较小的步长
    } else {
      return 2; // 其他区域使用默认步长
    }
  };
  
  const hueStep = getHueStep(h);
  const maxSaturationStep = 100;
  const minSaturationStep = 9;

  const maxValue = 100;
  const minValue = 30;

  /**
   * @param {boolean} isLight
   * @param {number} i
   */
  function getNewHue(isLight, i) {
    let hue;
    if (h >= 60 && h <= 240) {
      hue = isLight ? h - hueStep * i : h + hueStep * i;
    } else {
      hue = isLight ? h + hueStep * i : h - hueStep * i;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return Math.round(hue);
  }

  /**
   * @param {boolean} isLight
   * @param {number} i
   */
  function getNewSaturation(isLight, i) {
    let newSaturation;

    if (isLight) {
      // 改进的亮色饱和度计算，使过渡更平滑
      newSaturation = s <= minSaturationStep ? s : s - ((s - minSaturationStep) / 5.5) * Math.pow(i, 1.05);
    } else {
      // 改进的暗色饱和度计算，避免过饱和
      const maxS = Math.min(maxSaturationStep, s + 30);
      newSaturation = s + ((maxS - s) / 4.2) * Math.pow(i, 0.95);
    }
    return Math.max(0, Math.min(100, newSaturation)); // 确保在有效范围内
  }

  /**
   * @param {boolean} isLight
   * @param {number} i
   */
  function getNewValue(isLight, i) {
    if (isLight) {
      // 亮色明度调整，使过渡更自然
      return Math.min(maxValue, v + ((maxValue - v) / 5.2) * Math.pow(i, 0.9));
    } else {
      // 暗色明度调整，避免过暗
      return v <= minValue ? v : Math.max(minValue, v - ((v - minValue) / 4.2) * Math.pow(i, 1.05));
    }
  }

  const isLight = i < 6;
  const index = isLight ? 6 - i : i - 6;

  const retColor = i === 6
    ? color
    : Color({
        h: getNewHue(isLight, index),
        s: getNewSaturation(isLight, index),
        v: getNewValue(isLight, index),
      });
  
  return getColorString(retColor, format);
}

export default colorPalette;
