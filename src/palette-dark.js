import { generatePalette } from './palette-core.js';

function colorPaletteDark(originColor, i, format, steps = 10, curveGamma = 1, mixColor = '', mixRatio = 0, meta = false) {
  return generatePalette(originColor, {
    dark: true,
    index: i,
    format,
    steps,
    curveGamma,
    mixColor,
    mixRatio,
    meta,
  });
}

export default colorPaletteDark;
