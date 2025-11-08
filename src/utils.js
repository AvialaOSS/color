import Color from 'color';

/**
 * 将颜色转换为 RGB 字符串格式（逗号分隔，无空格）
 * @param {string | import('color')} color - 颜色值，支持任何 color.js 支持的格式
 * @returns {string} RGB 字符串，格式如 "255,0,0"
 * @example
 * getRgbStr('#FF0000') // '255,0,0'
 * getRgbStr('rgb(255, 0, 0)') // '255,0,0'
 */
export function getRgbStr(color) {
  const colorObj = Color(color).rgb().round();
  // @ts-ignore - color.js 类型定义不完整
  return colorObj.color.join(',');
}

/** @type {readonly ('hex' | 'rgb' | 'hsl')[]} */
const formats = ['hex', 'rgb', 'hsl'];

/**
 * 验证并返回有效的颜色格式
 * @param {string} [format] - 颜色格式
 * @returns {'hex' | 'rgb' | 'hsl'} 有效的颜色格式，默认为 'hex'
 */
function getFormat(format) {
  if (!format || !formats.includes(/** @type {any} */ (format))) {
    return 'hex';
  }
  return /** @type {'hex' | 'rgb' | 'hsl'} */ (format);
}

/**
 * 将 Color 对象转换为指定格式的字符串
 * @param {import('color')} color - Color 对象
 * @param {string} [format='hex'] - 输出格式：'hex' | 'rgb' | 'hsl'
 * @returns {string} 指定格式的颜色字符串
 * @example
 * getColorString(Color('#FF0000'), 'hex') // '#ff0000'
 * getColorString(Color('#FF0000'), 'rgb') // 'rgb(255, 0, 0)'
 */
export function getColorString(color, format) {
  const innerFormat = getFormat(format);

  if (innerFormat === 'hex') {
    return color[innerFormat]().toLowerCase();
  }
  return color[innerFormat]().round().string();
}
