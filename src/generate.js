import { generatePalette } from './palette-core.js';

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
function generate(color, options = {}) {
  const { dark, list, format = 'hex', meta = false } = options;
  const steps = Math.max(1, Math.min(24, Number(options.steps) || 10));
  const hasExplicitIndex = options.index !== undefined && options.index !== null && options.index !== '';
  const index = hasExplicitIndex ? Math.max(1, Math.min(steps, Number(options.index))) : undefined;
  const curveGamma = Math.max(0.1, Math.min(5, Number(options.curveGamma) || 1));
  const mixColor = typeof options.mixColor === 'string' ? options.mixColor : '';
  const mixRatio = Math.max(0, Math.min(1, Number(options.mixRatio) || 0));
  const protectYellow = Boolean(options.protectYellow);
  const protectHueFamilies = Array.isArray(options.protectHueFamilies) || typeof options.protectHueFamilies === 'string'
    ? options.protectHueFamilies
    : undefined;
  const protectHueStrength = Math.max(0, Math.min(2, Number(options.protectHueStrength) || 1));

  return generatePalette(color, {
    dark,
    list,
    meta,
    format,
    steps,
    index,
    curveGamma,
    mixColor,
    mixRatio,
    protectYellow,
    protectHueFamilies,
    protectHueStrength,
  });
}

export default generate;
