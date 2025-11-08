/**
 * 将颜色转换为 RGB 字符串格式（逗号分隔，无空格）
 * @param {string | import('color')} color - 颜色值，支持任何 color.js 支持的格式
 * @returns {string} RGB 字符串，格式如 "255,0,0"
 * @example
 * getRgbStr('#FF0000') // '255,0,0'
 * getRgbStr('rgb(255, 0, 0)') // '255,0,0'
 */
export function getRgbStr(color: string | import("color")): string;
/**
 * 将 Color 对象转换为指定格式的字符串
 * @param {import('color')} color - Color 对象
 * @param {string} [format='hex'] - 输出格式：'hex' | 'rgb' | 'hsl'
 * @returns {string} 指定格式的颜色字符串
 * @example
 * getColorString(Color('#FF0000'), 'hex') // '#ff0000'
 * getColorString(Color('#FF0000'), 'rgb') // 'rgb(255, 0, 0)'
 */
export function getColorString(color: import("color"), format?: string): string;
//# sourceMappingURL=utils.d.ts.map