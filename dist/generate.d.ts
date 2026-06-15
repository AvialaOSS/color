export default generate;
/**
 * @param {string} color
 * @param {Object} options
 * @param {number} options.index 1 - 10 (default: 6)
 * @param {boolean} options.dark
 * @param {boolean} options.list
 * @param {boolean} options.meta
 * @param {boolean} options.protectYellow
 * @param {string|string[]} options.protectHueFamilies
 * @param {number} options.protectHueStrength
 * @param {string} options.format 'hex' | 'rgb' | 'hsl'
 *
 * @return {string|string[]|Object}
 */
declare function generate(color: string, options?: {
    index: number;
    dark: boolean;
    list: boolean;
    meta: boolean;
    protectYellow: boolean;
    protectHueFamilies: string | string[];
    protectHueStrength: number;
    format: string;
}): string | string[] | Object;
