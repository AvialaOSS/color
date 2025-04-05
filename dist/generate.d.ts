export default generate;
/**
 * @param {string} color
 * @param {Object} options
 * @param {number} options.index 1 - 10 (default: 6)
 * @param {boolean} options.dark
 * @param {boolean} options.list
 * @param {string} options.format 'hex' | 'rgb' | 'hsl'
 *
 * @return string | string[]
 */
declare function generate(color: string, options?: {
    index: number;
    dark: boolean;
    list: boolean;
    format: string;
}): any;
