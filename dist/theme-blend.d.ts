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
export function rgbToHct(rgb: string): Object;
/**
 * 将 HCT 颜色转换为 RGB
 * @param {Object} hct - HCT 颜色对象 {h, c, t}
 * @param {Object} options - 配置选项
 * @returns {string} RGB 颜色值，格式如 "#ff0000"
 */
export function hctToRgb(hct: Object, options?: Object): string;
/**
 * 在 HCT 颜色空间中混合两种颜色
 * @param {string} color1 - 第一种颜色 (RGB)
 * @param {string} color2 - 第二种颜色 (RGB)
 * @param {number} ratio - 混合比例，0-1，0表示完全是color1，1表示完全是color2
 * @returns {string} 混合后的颜色 (RGB)
 */
export function blendInHct(color1: string, color2: string, ratio?: number): string;
/**
 * 颜色调和 - 让目标颜色向主题色的色相靠拢
 * @param {string} themeColor - 主题色 (RGB)
 * @param {string} targetColor - 目标颜色 (RGB)
 * @param {number} harmonizeRatio - 调和强度，0-1，0表示不调和，1表示完全采用主题色的色相
 * @returns {string} 调和后的颜色 (RGB)
 */
export function harmonizeColor(themeColor: string, targetColor: string, harmonizeRatio?: number): string;
/**
 * 生成主题色变体 - 基于主题色生成不同明度的颜色变体
 * @param {string} themeColor - 主题色 (RGB)
 * @param {Object|Array} options - 配置选项，可以是对象 {tones: [...]} 或直接传入数组
 * @returns {Array} 主题色变体数组
 */
export function generateThemeVariants(themeColor: string, options?: Object | any[]): any[];
/**
 * UI 元素颜色混合 - 为按钮、卡片等 UI 元素生成主题化颜色
 * @param {string} themeColor - 主题色
 * @param {Object} uiColors - UI 颜色对象
 * @param {number} blendRatio - 混合强度
 * @returns {Object} 混合后的 UI 颜色对象
 */
export function blendUIColors(themeColor: string, uiColors: Object, blendRatio?: number): Object;
/**
 * 生成基础控件颜色（灰色系1-12）
 * @param {string} themeColor - 主题颜色
 * @param {Object} options - 配置选项
 * @returns {Object} 基础控件颜色对象
 */
export function generateControlColors(themeColor: string, options?: Object): Object;
/**
 * 生成表意色（1-10）
 * @param {string} themeColor - 主题颜色
 * @param {Object} options - 配置选项
 * @returns {Object} 表意色对象
 */
export function generateSemanticColors(themeColor: string, options?: Object): Object;
/**
 * 生成主题色（1-10）
 * @param {string} themeColor - 主题颜色
 * @param {Object} options - 配置选项
 * @returns {Object} 主题色对象
 */
export function generateThemeColors(themeColor: string, options?: Object): Object;
/**
 * 生成完整的界面色彩系统
 * @param {string} themeColor - 主题颜色
 * @param {Object} options - 配置选项
 * @returns {Object} 包含三个部分的完整色彩系统
 */
export function generateInterfaceColorSystem(themeColor: string, options?: Object): Object;
/**
 * 生成完整的主题色板
 * @param {string} themeColor - 主题色
 * @param {Object} options - 配置选项
 * @returns {Object} 完整的主题色板
 */
export function generateThemePalette(themeColor: string, options?: Object): Object;
