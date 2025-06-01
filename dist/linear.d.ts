/**
 * 线性颜色生成器
 * 在两个颜色之间进行线性插值，生成指定数量的颜色
 * 特别适用于灰色系和单色调渐变
 *
 * @param {string} startColor - 起始颜色
 * @param {string} endColor - 结束颜色
 * @param {Object} options - 配置选项
 * @param {number} options.steps - 生成的颜色数量 (默认: 10)
 * @param {string} options.format - 颜色格式 'hex' | 'rgb' | 'hsl' (默认: 'hex')
 * @param {boolean} options.includeEnds - 是否包含起始和结束颜色 (默认: true)
 * @returns {string[]} 颜色数组
 */
export function generateLinear(startColor: string, endColor: string, options?: {
    steps: number;
    format: string;
    includeEnds: boolean;
}): string[];
/**
 * 生成灰色系线性渐变
 * 从白色到黑色或指定的灰色范围
 *
 * @param {Object} options - 配置选项
 * @param {string} options.startGray - 起始灰色 (默认: '#ffffff')
 * @param {string} options.endGray - 结束灰色 (默认: '#000000')
 * @param {number} options.steps - 生成的颜色数量 (默认: 10)
 * @param {string} options.format - 颜色格式 (默认: 'hex')
 * @returns {string[]} 灰色系颜色数组
 */
export function generateGrayLinear(options?: {
    startGray: string;
    endGray: string;
    steps: number;
    format: string;
}): string[];
/**
 * 生成单色调线性渐变
 * 基于一个基础颜色，生成从浅到深的渐变
 *
 * @param {string} baseColor - 基础颜色
 * @param {Object} options - 配置选项
 * @param {number} options.steps - 生成的颜色数量 (默认: 10)
 * @param {string} options.format - 颜色格式 (默认: 'hex')
 * @param {number} options.lightnessRange - 亮度范围 0-100 (默认: 80)
 * @returns {string[]} 单色调颜色数组
 */
export function generateMonochromeLinear(baseColor: string, options?: {
    steps: number;
    format: string;
    lightnessRange: number;
}): string[];
/**
 * 在HSL空间进行线性插值
 * 适用于需要更自然色彩过渡的场景
 *
 * @param {string} startColor - 起始颜色
 * @param {string} endColor - 结束颜色
 * @param {Object} options - 配置选项
 * @param {number} options.steps - 生成的颜色数量 (默认: 10)
 * @param {string} options.format - 颜色格式 (默认: 'hex')
 * @param {boolean} options.includeEnds - 是否包含起始和结束颜色 (默认: true)
 * @returns {string[]} 颜色数组
 */
export function generateLinearHSL(startColor: string, endColor: string, options?: {
    steps: number;
    format: string;
    includeEnds: boolean;
}): string[];
