import colorPalette from './palette.js';
import colorPaletteDark from './palette-dark.js';

/**
 * @typedef {Object} GenerateOptions
 * @property {number} [index=6] - 色板索引 (1-10)，6 为主色
 * @property {boolean} [dark=false] - 是否生成深色模式色板
 * @property {boolean} [list=false] - 是否返回完整色板数组（10个颜色）
 * @property {'hex' | 'rgb' | 'hsl'} [format='hex'] - 输出格式
 */

/**
 * 生成色板颜色
 * 
 * 可以生成单个颜色或完整的10色色板，支持浅色/深色模式
 * 
 * @param {string} color - 基础颜色，支持 hex、rgb、hsl 等格式
 * @param {GenerateOptions} [options={}] - 配置选项
 * @returns {string | string[]} 单个颜色字符串或色板数组
 * 
 * @example
 * // 生成主色（index 6）
 * generate('#3491FA') // '#3491fa'
 * 
 * @example
 * // 生成完整浅色色板
 * generate('#3491FA', { list: true })
 * // ['#e5f6fe', '#bfe7fd', ..., '#02184d']
 * 
 * @example
 * // 生成深色模式色板
 * generate('#3491FA', { list: true, dark: true })
 * 
 * @example
 * // 生成 RGB 格式
 * generate('#3491FA', { format: 'rgb' })
 * // 'rgb(52, 145, 250)'
 */
export function generate(color, options = {}) {
  const { dark, list, index = 6, format = 'hex' } = options;

  if (list) {
    const list = [];
    const func = dark ? colorPaletteDark : colorPalette;
    for(let i = 1; i <= 10; i++) {
      list.push(func(color, i, format));
    }
    return list;
  }
  return dark ? colorPaletteDark(color, index, format) : colorPalette(color, index, format);
}

export default generate;

