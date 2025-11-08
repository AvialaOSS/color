import { default as generate } from './generate.js';
import { getRgbStr } from './utils.js';
import { extractColorFromImage, extractColorFromFile } from './image-color.js';
import { generateLinear, generateGrayLinear, generateMonochromeLinear, generateLinearHSL } from './linear.js';
import { rgbToHct, hctToRgb, blendInHct, harmonizeColor, generateThemeVariants, blendUIColors, generateThemePalette, generateControlColors, generateSemanticColors, generateThemeColors, generateInterfaceColorSystem } from './theme-blend.js';
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
export function getPresetColors(): {
    [key: string]: {
        light: string[];
        dark: string[];
        primary: string;
    };
};
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
export const colorList: {
    red: string;
    orangered: string;
    orange: string;
    gold: string;
    yellow: string;
    lime: string;
    green: string;
    cyan: string;
    blue: string;
    arcoblue: string;
    purple: string;
    pinkpurple: string;
    magenta: string;
};
export { generate, getRgbStr, extractColorFromImage, extractColorFromFile, generateLinear, generateGrayLinear, generateMonochromeLinear, generateLinearHSL, rgbToHct, hctToRgb, blendInHct, harmonizeColor, generateThemeVariants, blendUIColors, generateThemePalette, generateControlColors, generateSemanticColors, generateThemeColors, generateInterfaceColorSystem };
//# sourceMappingURL=index.d.ts.map