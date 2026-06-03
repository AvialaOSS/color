import colorPalette from './palette.js';
import colorPaletteDark from './palette-dark.js';

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
function generate(color, options = {}) {
  const { dark, list, format = 'hex' } = options;
  const steps = Math.max(1, Math.min(24, Number(options.steps) || 10));
  const centerIndex = Math.floor(steps / 2) + 1;
  const index = Math.max(1, Math.min(steps, Number(options.index) || centerIndex));
  const curveGamma = Math.max(0.1, Math.min(5, Number(options.curveGamma) || 1));
  const mixColor = typeof options.mixColor === 'string' ? options.mixColor : '';
  const mixRatio = Math.max(0, Math.min(1, Number(options.mixRatio) || 0));

  if (list) {
    const list = [];
    const func = dark ? colorPaletteDark : colorPalette;
    for (let i = 1; i <= steps; i++) {
      list.push(func(color, i, format, steps, curveGamma, mixColor, mixRatio));
    }
    return list;
  }
  return dark
    ? colorPaletteDark(color, index, format, steps, curveGamma, mixColor, mixRatio)
    : colorPalette(color, index, format, steps, curveGamma, mixColor, mixRatio);
}

export default generate;
