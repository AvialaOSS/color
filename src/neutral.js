import Color from 'color';
import { getColorString } from './utils.js';

function generate(startGray = '#ffffff', endGray = '#000000', options = {}) {
  const { steps = 10, format = 'hex', includeEnds = true, curveGamma = 1 } = options;
  const stepCount = Math.max(1, Math.min(24, Number(steps) || 10));
  const gamma = Math.max(0.1, Math.min(5, Number(curveGamma) || 1));

  const start = Color(startGray);
  const end = Color(endGray);

  const total = includeEnds ? stepCount : stepCount + 2;
  const denom = Math.max(1, total - 1);

  const result = [];
  for (let i = 0; i < total; i++) {
    const t = Math.pow(i / denom, gamma);
    const r = Math.round(start.red() + (end.red() - start.red()) * t);
    const g = Math.round(start.green() + (end.green() - start.green()) * t);
    const b = Math.round(start.blue() + (end.blue() - start.blue()) * t);
    const c = getColorString(Color({ r, g, b }), format);
    if (!includeEnds && (i === 0 || i === total - 1)) continue;
    result.push(c);
  }

  return result;
}

export default { generate };
