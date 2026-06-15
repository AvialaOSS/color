import { generatePalette } from './palette-core.js';

function colorPalette(
  originColor,
  i,
  format,
  steps = 10,
  curveGamma = 1,
  mixColor = '',
  mixRatio = 0,
  meta = false,
  protectYellow = false,
  protectHueFamilies = undefined,
  protectHueStrength = 1
) {
  return generatePalette(originColor, {
    index: i,
    format,
    steps,
    curveGamma,
    mixColor,
    mixRatio,
    meta,
    protectYellow,
    protectHueFamilies,
    protectHueStrength,
  });
}

export default colorPalette;
