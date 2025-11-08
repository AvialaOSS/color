/**
 * @typedef {Object} HCT
 * @property {number} h - 色相 (0-360)
 * @property {number} c - 色度 (0-200+)
 * @property {number} t - 色调/亮度 (0-100)
 */
/**
 * 将 RGB 颜色转换为 HCT 颜色空间
 * 这是一个简化的实现，实际的 HCT 转换需要复杂的 CAM16 计算
 * @param {string} rgb - RGB 颜色值，格式如 "#ff0000"
 * @returns {HCT} HCT 颜色对象 {h, c, t}
 *
 * @example
 * import { rgbToHct } from '@aviala-design/color';
 *
 * // 转换品牌色到 HCT 空间
 * const hct = rgbToHct('#3491FA');
 * console.log(hct); // { h: 210, c: 45, t: 60 }
 *
 * @example
 * // 用于颜色分析和处理
 * const primaryColor = rgbToHct('#FF5722');
 * if (primaryColor.t < 50) {
 *   console.log('这是深色');
 * }
 */
export function rgbToHct(rgb: string): HCT;
/**
 * 将 HCT 颜色转换为 RGB
 * @param {HCT} hct - HCT 颜色对象 {h, c, t}
 * @param {{maxChroma?: number}} [options] - 配置选项
 * @returns {string} RGB 颜色值，格式如 "#ff0000"
 *
 * @example
 * import { hctToRgb } from '@aviala-design/color';
 *
 * // 从 HCT 颜色空间转回 RGB
 * const rgb = hctToRgb({ h: 210, c: 45, t: 60 });
 * console.log(rgb); // '#3491FA'
 *
 * @example
 * // 在 HCT 空间调整颜色后转换
 * const hct = { h: 120, c: 50, t: 70 };
 * const rgb = hctToRgb(hct);
 * document.body.style.backgroundColor = rgb;
 */
export function hctToRgb(hct: HCT, options?: {
    maxChroma?: number;
}): string;
/**
 * 在 HCT 颜色空间中混合两种颜色
 * @param {string} color1 - 第一种颜色 (RGB)
 * @param {string} color2 - 第二种颜色 (RGB)
 * @param {number} ratio - 混合比例，0-1，0表示完全是color1，1表示完全是color2
 * @returns {string} 混合后的颜色 (RGB)
 *
 * @example
 * import { blendInHct } from '@aviala-design/color';
 *
 * // 混合品牌色和背景色
 * const blended = blendInHct('#3491FA', '#FFFFFF', 0.3);
 * // 30% 白色，70% 品牌色
 *
 * @example
 * // 创建悬停效果颜色
 * const primaryColor = '#FF5722';
 * const hoverColor = blendInHct(primaryColor, '#000000', 0.1);
 * // 混入 10% 黑色使颜色变深
 */
export function blendInHct(color1: string, color2: string, ratio?: number): string;
/**
 * 颜色调和 - 让目标颜色向主题色的色相靠拢
 * @param {string} themeColor - 主题色 (RGB)
 * @param {string} targetColor - 目标颜色 (RGB)
 * @param {number} harmonizeRatio - 调和强度，0-1，0表示不调和，1表示完全采用主题色的色相
 * @returns {string} 调和后的颜色 (RGB)
 *
 * @example
 * import { harmonizeColor } from '@aviala-design/color';
 *
 * // 让错误色与品牌色保持和谐
 * const themeColor = '#3491FA';  // 蓝色主题
 * const errorColor = '#FF0000';  // 红色
 * const harmonized = harmonizeColor(themeColor, errorColor, 0.15);
 * // 错误色会带有一点蓝色调，与主题更协调
 *
 * @example
 * // 调和语义色系
 * const primaryColor = '#6200EE';
 * const success = harmonizeColor(primaryColor, '#4CAF50');
 * const warning = harmonizeColor(primaryColor, '#FF9800');
 * const error = harmonizeColor(primaryColor, '#F44336');
 */
export function harmonizeColor(themeColor: string, targetColor: string, harmonizeRatio?: number): string;
/**
 * 生成主题色变体 - 基于主题色生成不同明度的颜色变体
 * @param {string} themeColor - 主题色 (RGB)
 * @param {number[]|{tones?: number[]}} [options] - 配置选项，可以是对象 {tones: [...]} 或直接传入数组
 * @returns {string[]} 主题色变体数组
 *
 * @example
 * import { generateThemeVariants } from '@aviala-design/color';
 *
 * // 生成默认的色调变体
 * const variants = generateThemeVariants('#3491FA');
 * // 返回 9 个色调的变体 (10, 20, 30, ..., 90)
 *
 * @example
 * // 自定义色调值
 * const customVariants = generateThemeVariants('#FF5722', {
 *   tones: [20, 40, 60, 80, 95]
 * });
 *
 * @example
 * // 数组形式传参
 * const variants = generateThemeVariants('#6200EE', [30, 50, 70]);
 */
export function generateThemeVariants(themeColor: string, options?: number[] | {
    tones?: number[];
}): string[];
/**
 * UI 元素颜色混合 - 为按钮、卡片等 UI 元素生成主题化颜色
 * @param {string} themeColor - 主题色
 * @param {{[key: string]: string}} uiColors - UI 颜色对象
 * @param {number} [blendRatio] - 混合强度
 * @returns {{[key: string]: string}} 混合后的 UI 颜色对象
 *
 * @example
 * import { blendUIColors } from '@aviala-design/color';
 *
 * // 为 UI 元素注入品牌色
 * const brandColor = '#3491FA';
 * const uiColors = {
 *   button: '#E0E0E0',
 *   card: '#F5F5F5',
 *   input: '#FFFFFF'
 * };
 * const themed = blendUIColors(brandColor, uiColors, 0.1);
 * // 所有 UI 颜色会带有品牌色调
 *
 * @example
 * // 创建主题化组件色板
 * const result = blendUIColors('#6200EE', {
 *   surface: '#FFFFFF',
 *   background: '#F5F5F5',
 *   divider: '#E0E0E0'
 * });
 */
export function blendUIColors(themeColor: string, uiColors: {
    [key: string]: string;
}, blendRatio?: number): {
    [key: string]: string;
};
/**
 * 生成基础控件颜色（灰色系1-12）
 * @param {string} themeColor - 主题颜色
 * @param {{baseGray?: string, blendRatio?: number, isDark?: boolean, steps?: number, lightnessRange?: number, minLightness?: number, maxLightness?: number}} [options] - 配置选项
 * @returns {{[key: string]: string}} 基础控件颜色对象
 *
 * @example
 * import { generateControlColors } from '@aviala-design/color';
 *
 * // 生成基础控件色板
 * const controls = generateControlColors('#3491FA');
 * console.log(controls['gray-1']);  // 最浅的灰色
 * console.log(controls['gray-12']); // 最深的灰色
 *
 * @example
 * // 深色模式控件色
 * const darkControls = generateControlColors('#FF5722', {
 *   isDark: true,
 *   blendRatio: 0.15
 * });
 *
 * @example
 * // 更细腻的灰度梯度（24 个等级）
 * const fineGrained = generateControlColors('#3491FA', {
 *   steps: 24
 * });
 *
 * @example
 * // 使用 lightnessRange（基于中心扩展）
 * const wideRange = generateControlColors('#3491FA', {
 *   lightnessRange: 90,  // 增加范围以接近纯白和纯黑
 *   steps: 12
 * });
 *
 * @example
 * // 直接指定最大/最小亮度（推荐：更精确控制）
 * const fixedRange = generateControlColors('#3491FA', {
 *   minLightness: 10,   // 最深色接近纯黑
 *   maxLightness: 98,   // 最浅色接近纯白
 *   steps: 12
 * });
 * // 最浅色更接近白色，最深色更接近黑色
 */
export function generateControlColors(themeColor: string, options?: {
    baseGray?: string;
    blendRatio?: number;
    isDark?: boolean;
    steps?: number;
    lightnessRange?: number;
    minLightness?: number;
    maxLightness?: number;
}): {
    [key: string]: string;
};
/**
 * 生成表意色（1-10）
 * @param {string} themeColor - 主题颜色
 * @param {{semanticColors?: {[key: string]: string}, blendRatio?: number, isDark?: boolean}} [options] - 配置选项
 * @returns {{[key: string]: string}} 表意色对象
 *
 * @example
 * import { generateSemanticColors } from '@aviala-design/color';
 *
 * // 生成默认的语义色系
 * const semantics = generateSemanticColors('#3491FA');
 * console.log(semantics.success1);  // 成功色最浅色调
 * console.log(semantics.error6);    // 错误色标准色调
 *
 * @example
 * // 自定义语义色基础色
 * const custom = generateSemanticColors('#6200EE', {
 *   semanticColors: {
 *     success: '#00C853',
 *     warning: '#FFB300',
 *     error: '#D50000',
 *     info: '#2979FF'
 *   },
 *   blendRatio: 0.1
 * });
 */
export function generateSemanticColors(themeColor: string, options?: {
    semanticColors?: {
        [key: string]: string;
    };
    blendRatio?: number;
    isDark?: boolean;
}): {
    [key: string]: string;
};
/**
 * 生成主题色（1-10）
 * @param {string} themeColor - 主题颜色
 * @param {{isDark?: boolean}} [options] - 配置选项
 * @returns {{[key: string]: string}} 主题色对象
 *
 * @example
 * import { generateThemeColors } from '@aviala-design/color';
 *
 * // 生成主题色色阶
 * const themeColors = generateThemeColors('#3491FA');
 * console.log(themeColors.theme1);   // 最浅色调
 * console.log(themeColors.theme6);   // 标准色调
 * console.log(themeColors.theme10);  // 最深色调
 *
 * @example
 * // 深色模式主题色
 * const darkTheme = generateThemeColors('#FF5722', { isDark: true });
 */
export function generateThemeColors(themeColor: string, options?: {
    isDark?: boolean;
}): {
    [key: string]: string;
};
/**
 * 生成完整的界面色彩系统
 * @param {string} themeColor - 主题颜色
 * @param {*} [options] - 配置选项
 * @returns {{controls: object, semantic: object, theme: object}} 包含三个部分的完整色彩系统
 *
 * @example
 * import { generateInterfaceColorSystem } from '@aviala-design/color';
 *
 * // 生成完整色彩系统
 * const colorSystem = generateInterfaceColorSystem('#3491FA');
 * console.log(colorSystem.controls);  // 灰色系 1-12
 * console.log(colorSystem.semantic);  // 语义色系
 * console.log(colorSystem.theme);     // 主题色系
 *
 * @example
 * // 深色模式色彩系统
 * const darkSystem = generateInterfaceColorSystem('#6200EE', {
 *   isDark: true,
 *   controlBlendRatio: 0.1,
 *   semanticBlendRatio: 0.15
 * });
 *
 * @example
 * // 使用 lightnessRange（中心扩展模式）
 * const customSystem = generateInterfaceColorSystem('#3491FA', {
 *   controlSteps: 24,           // 24 级灰度
 *   controlLightnessRange: 90,  // 更接近纯白/纯黑
 *   controlBlendRatio: 0.1
 * });
 *
 * @example
 * // 使用固定端点模式（推荐：精确控制最浅/最深色）
 * const preciseSystem = generateInterfaceColorSystem('#3491FA', {
 *   controlSteps: 12,
 *   controlMinLightness: 10,   // 最深色接近纯黑
 *   controlMaxLightness: 98    // 最浅色接近纯白
 * });
 * // 生成接近纯白到纯黑的灰度系统
 */
export function generateInterfaceColorSystem(themeColor: string, options?: any): {
    controls: object;
    semantic: object;
    theme: object;
};
/**
 * 生成完整的主题色板
 * @param {string} themeColor - 主题色
 * @param {*} [options] - 配置选项
 * @returns {{theme: object, controls: object, semantic: object, ui: object}} 完整的主题色板
 *
 * @example
 * import { generateThemePalette } from '@aviala-design/color';
 *
 * // 生成完整主题色板
 * const palette = generateThemePalette('#3491FA');
 * console.log(palette.theme);     // 主题色变体
 * console.log(palette.controls);  // 控件颜色
 * console.log(palette.semantic);  // 语义色系
 * console.log(palette.ui);        // UI 元素颜色
 *
 * @example
 * // 自定义完整色板
 * const customPalette = generateThemePalette('#6200EE', {
 *   isDark: true,
 *   semanticColors: {
 *     success: '#00C853',
 *     error: '#D50000'
 *   },
 *   harmonizeRatio: 0.2
 * });
 */
export function generateThemePalette(themeColor: string, options?: any): {
    theme: object;
    controls: object;
    semantic: object;
    ui: object;
};
export type HCT = {
    /**
     * - 色相 (0-360)
     */
    h: number;
    /**
     * - 色度 (0-200+)
     */
    c: number;
    /**
     * - 色调/亮度 (0-100)
     */
    t: number;
};
//# sourceMappingURL=theme-blend.d.ts.map