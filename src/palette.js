import { generatePalette } from './palette-core.js';

function colorPalette(originColor, i, format, steps = 10, curveGamma = 1, mixColor = '', mixRatio = 0, meta = false, protectYellow = false) {
  return generatePalette(originColor, {
    index: i,
    format,
    steps,
    curveGamma,
    mixColor,
    mixRatio,
    meta,
    protectYellow,
  });
}

export default colorPalette;
