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
export function generate(color: string, options?: GenerateOptions): string | string[];
export default generate;
export type GenerateOptions = {
    /**
     * - 色板索引 (1-10)，6 为主色
     */
    index?: number | undefined;
    /**
     * - 是否生成深色模式色板
     */
    dark?: boolean | undefined;
    /**
     * - 是否返回完整色板数组（10个颜色）
     */
    list?: boolean | undefined;
    /**
     * - 输出格式
     */
    format?: "hex" | "rgb" | "hsl" | undefined;
};
//# sourceMappingURL=generate.d.ts.map