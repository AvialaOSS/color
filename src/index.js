import generate from './generate.js';
import { getRgbStr } from './utils.js';
import { extractColorFromImage, extractColorFromFile } from './image-color.js';
import { generateLinear, generateGrayLinear, generateMonochromeLinear, generateLinearHSL } from './linear.js';
import { 
  rgbToHct,
  hctToRgb,
  blendInHct,
  harmonizeColor,
  generateThemeVariants,
  blendUIColors,
  generateThemePalette,
  generateControlColors,
  generateSemanticColors,
  generateThemeColors,
  generateInterfaceColorSystem,
  // 新增的颜色工具函数
  colorDifference,
  adjustTone,
  adjustChroma,
  adjustHue,
  rotateHue,
  getComplementary,
  getTriadic,
  getSplitComplementary,
  getAnalogous
} from './theme-blend.js';

/**
 * 预设颜色常量
 * 
 * 包含 13 种常用的品牌色和语义色
 * 
 * @type {{
 *   red: string,
 *   orangered: string,
 *   orange: string,
 *   gold: string,
 *   yellow: string,
 *   lime: string,
 *   green: string,
 *   cyan: string,
 *   blue: string,
 *   arcoblue: string,
 *   purple: string,
 *   pinkpurple: string,
 *   magenta: string
 * }}
 * 
 * @example
 * import { colorList } from '@aviala-design/color';
 * 
 * // 使用预设颜色
 * console.log(colorList.blue); // '#3491FA'
 * console.log(colorList.green); // '#00B42A'
 */
export const colorList = {
  red: '#F53F3F',
  orangered: '#F77234',
  orange: '#FF7D00',
  gold: '#F7BA1E',
  yellow: '#FADC19',
  lime: '#9FDB1D',
  green: '#00B42A',
  cyan: '#14C9C9',
  blue: '#3491FA',
  arcoblue: '#165DFF',
  purple: '#722ED1',
  pinkpurple: '#D91AD9',
  magenta: '#F5319D',
};

/**
 * 获取所有预设颜色的色板
 * 
 * 为每种预设颜色生成完整的浅色和深色色板（各10个颜色）
 * 
 * @returns {{[key: string]: {light: string[], dark: string[], primary: string}}} 预设颜色色板对象
 * 
 * @example
 * import { getPresetColors } from '@aviala-design/color';
 * 
 * const presetColors = getPresetColors();
 * 
 * // 获取蓝色的浅色色板
 * console.log(presetColors.blue.light);
 * // ['#e5f6fe', '#bfe7fd', '#94d4fb', ...]
 * 
 * // 获取蓝色的深色色板
 * console.log(presetColors.blue.dark);
 * 
 * // 获取蓝色的主色
 * console.log(presetColors.blue.primary); // '#3491FA'
 * 
 * @example
 * // 获取所有可用的颜色名称
 * const colorNames = Object.keys(getPresetColors());
 * // ['red', 'orangered', 'orange', ..., 'gray']
 */
export function getPresetColors() {
  /** @type {any} */
  const presetColors = {};
  Object.keys(colorList).forEach((key) => {
    presetColors[key] = {};
    presetColors[key].light = generate(colorList[/** @type {keyof typeof colorList} */ (key)], { list: true });
    presetColors[key].dark = generate(colorList[/** @type {keyof typeof colorList} */ (key)], { list: true, dark: true });
    presetColors[key].primary = colorList[/** @type {keyof typeof colorList} */ (key)];
  });

  presetColors.gray = {};
  presetColors.gray.light = [
    '#f7f8fa',
    '#f2f3f5',
    '#e5e6eb',
    '#c9cdd4',
    '#a9aeb8',
    '#86909c',
    '#6b7785',
    '#4e5969',
    '#272e3b',
    '#1d2129',
  ];
  presetColors.gray.dark = [
    '#17171a',
    '#2e2e30',
    '#484849',
    '#5f5f60',
    '#78787a',
    '#929293',
    '#ababac',
    '#c5c5c5',
    '#dfdfdf',
    '#f6f6f6',
  ];
  presetColors.gray.primary = presetColors.gray.light[6];

  return presetColors;
}

/**
 * 生成色板颜色
 * 
 * 这是核心函数，可以生成单个颜色或完整的10色色板，支持浅色/深色模式
 * 
 * @param {string} color - 基础颜色，支持 hex、rgb、hsl 等格式
 * @param {{index?: number, dark?: boolean, list?: boolean, format?: 'hex' | 'rgb' | 'hsl'}} [options={}] - 配置选项
 * @returns {string | string[]} 单个颜色字符串或色板数组
 * 
 * @example
 * import { generate } from '@aviala-design/color';
 * 
 * // 生成主色（index 6）
 * generate('#3491FA'); // '#3491fa'
 * 
 * @example
 * // 生成完整浅色色板
 * const lightPalette = generate('#3491FA', { list: true });
 * // ['#e5f6fe', '#bfe7fd', '#94d4fb', ..., '#02184d']
 * 
 * @example
 * // 生成深色模式色板
 * const darkPalette = generate('#3491FA', { list: true, dark: true });
 * 
 * @example
 * // 生成指定索引的颜色
 * generate('#3491FA', { index: 1 }); // 最浅的颜色
 * generate('#3491FA', { index: 10 }); // 最深的颜色
 * 
 * @example
 * // 生成 RGB 格式
 * generate('#3491FA', { format: 'rgb' }); // 'rgb(52, 145, 250)'
 */
export { 
  generate, 
  getRgbStr, 
  extractColorFromImage, 
  extractColorFromFile,
  generateLinear,
  generateGrayLinear,
  generateMonochromeLinear,
  generateLinearHSL,
  rgbToHct,
  hctToRgb,
  blendInHct,
  harmonizeColor,
  generateThemeVariants,
  blendUIColors,
  generateThemePalette,
  generateControlColors,
  generateSemanticColors,
  generateThemeColors,
  generateInterfaceColorSystem,
  // 新增的颜色工具函数
  colorDifference,
  adjustTone,
  adjustChroma,
  adjustHue,
  rotateHue,
  getComplementary,
  getTriadic,
  getSplitComplementary,
  getAnalogous
};
