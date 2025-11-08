import Color from 'color';
import colorPalette from './palette.js';
import { getColorString } from './utils.js';

// 暗色色板

/**
 * 使用动态梯度算法生成暗色模式单个色板颜色
 * @param {string} originColor - 基础颜色
 * @param {number} i - 色板索引 (1-10)
 * @param {string} format - 输出格式：'hex' | 'rgb' | 'hsl'
 * @returns {string} 生成的颜色字符串
 */
function colorPaletteDark(originColor, i, format) {
  const lightColor = Color(colorPalette(originColor, 10 - i + 1, 'hex'));
  const originBaseColor = Color(originColor);

  const originBaseHue = originBaseColor.hue();
  const originBaseSaturation = originBaseColor.saturationv();
  
  /**
   * @param {number} _index
   * @returns {number}
   */
  function getNewSaturation(_index) {
    if (_index < 6) {
      return baseSaturation + (6 - _index) * step1to5;
    }
    if (_index === 6) {
      if (originBaseHue >= 0 && originBaseHue < 50) {
        return originBaseSaturation - 15;
      }
      if (originBaseHue >= 50 && originBaseHue < 191) {
        return originBaseSaturation - 20;
      }
      if (originBaseHue >= 191 && originBaseHue <= 360) {
        return originBaseSaturation - 15;
      }
    }

    return baseSaturation - step * (_index - 6);
  }
  
  const baseColor = Color({
    h: originBaseColor.hue(),
    s: getNewSaturation(6),
    v: originBaseColor.value(),
  });

  const baseSaturation = baseColor.saturationv();
  const step = Math.ceil((baseSaturation - 9) / 4);
  const step1to5 = Math.ceil((100 - baseSaturation) / 5);

  const retColor = Color({
    h: lightColor.hue(),
    s: getNewSaturation(i),
    v: lightColor.value(),
  });

  return getColorString(retColor, format);
}

export default colorPaletteDark;