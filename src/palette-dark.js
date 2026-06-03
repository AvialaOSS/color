import Color from 'color';
import { Blend, Hct, argbFromHex, hexFromArgb } from '@material/material-color-utilities';
import { getColorString } from './utils.js';

// 暗色色板

function colorPaletteDark(originColor, i, format, steps = 10, curveGamma = 1, mixColor = '', mixRatio = 0) {
  const baseColor = Color(originColor);
  const safeSteps = Math.max(1, Math.min(24, Number(steps) || 10));
  const centerIndex = Math.floor(safeSteps / 2) + 1;
  const gamma = Math.max(0.1, Math.min(5, Number(curveGamma) || 1));
  const ratio = Math.max(0, Math.min(1, Number(mixRatio) || 0));

  let seedColor = baseColor;
  if (mixColor && ratio > 0) {
    const from = argbFromHex(baseColor.hex().toLowerCase());
    const to = argbFromHex(Color(mixColor).hex().toLowerCase());
    seedColor = Color(hexFromArgb(Blend.cam16Ucs(from, to, ratio)));
  }

  if (i === centerIndex) {
    return getColorString(seedColor, format);
  }

  const argb = argbFromHex(seedColor.hex().toLowerCase());
  const baseHct = Hct.fromInt(argb);

  const baseTone = baseHct.tone;
  const lightCount = centerIndex - 1;
  const darkCount = safeSteps - centerIndex;

  const ease = (t) => Math.pow(Math.max(0, Math.min(1, t)), gamma);
  const targetTone = i < centerIndex
    ? baseTone - baseTone * ease((centerIndex - i) / Math.max(1, lightCount))
    : baseTone + (100 - baseTone) * ease((i - centerIndex) / Math.max(1, darkCount));

  const hct = Hct.from(baseHct.hue, baseHct.chroma, Math.max(0, Math.min(100, targetTone)));
  const hex = hexFromArgb(hct.toInt());

  return getColorString(Color(hex), format);
}

export default colorPaletteDark;
