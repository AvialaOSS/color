import Color from 'color';
import { Blend, Hct, argbFromHex, hexFromArgb } from '@material/material-color-utilities';
import { getColorString } from './utils.js';

const LIGHT_TONE_ANCHORS = [98, 96, 92, 86, 76, 64, 52, 40, 28, 18];
const DARK_TONE_ANCHORS = [14, 20, 28, 38, 50, 62, 74, 86, 93, 97];
const LIGHT_YELLOW_TONE_ANCHORS = [99, 97, 94, 89, 80, 70, 60, 50, 40, 30];
const DARK_YELLOW_TONE_ANCHORS = [18, 24, 32, 42, 54, 66, 77, 87, 94, 98];

const LIGHT_COLOR_CHROMA_ANCHORS = [0.08, 0.14, 0.24, 0.36, 0.5, 0.74, 1, 0.92, 0.78, 0.6];
const DARK_COLOR_CHROMA_ANCHORS = [1, 0.98, 0.94, 0.88, 0.8, 0.72, 0.62, 0.52, 0.42, 0.32];
const LIGHT_YELLOW_CHROMA_ANCHORS = [0.12, 0.18, 0.3, 0.46, 0.62, 0.82, 1.02, 1, 0.92, 0.8];
const DARK_YELLOW_CHROMA_ANCHORS = [1.02, 1, 0.98, 0.94, 0.9, 0.84, 0.76, 0.68, 0.58, 0.48];

const YELLOW_PROTECTION_CENTER = 105;
const YELLOW_PROTECTION_WIDTH = 32;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function getHueDistance(a, b) {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

function mixValue(start, end, ratio) {
  return start + (end - start) * ratio;
}

function mixAnchors(baseAnchors, targetAnchors, ratio) {
  if (ratio <= 0) {
    return baseAnchors;
  }
  if (ratio >= 1) {
    return targetAnchors;
  }

  return baseAnchors.map((value, index) => mixValue(value, targetAnchors[index], ratio));
}

function getPreferredDarkBaseIndex(steps) {
  return clamp(Math.round(steps * 0.77), 1, steps);
}

function normalizeOptions(options = {}) {
  const steps = clamp(Number(options.steps) || 10, 1, 24);
  const centerIndex = Math.floor(steps / 2) + 1;
  const dark = Boolean(options.dark);
  const hasExplicitIndex = options.index !== undefined && options.index !== null && options.index !== '';
  const defaultIndex = dark ? getPreferredDarkBaseIndex(steps) : centerIndex;

  return {
    dark,
    list: Boolean(options.list),
    meta: Boolean(options.meta),
    format: options.format || 'hex',
    steps,
    centerIndex,
    hasExplicitIndex,
    index: clamp(hasExplicitIndex ? Number(options.index) : defaultIndex, 1, steps),
    curveGamma: clamp(Number(options.curveGamma) || 1, 0.1, 5),
    mixColor: typeof options.mixColor === 'string' ? options.mixColor : '',
    mixRatio: clamp(Number(options.mixRatio) || 0, 0, 1),
    protectYellow: Boolean(options.protectYellow),
  };
}

function getSeedColor(originColor, mixColor, mixRatio) {
  const baseColor = Color(originColor);

  if (!mixColor || mixRatio <= 0) {
    return baseColor;
  }

  const from = argbFromHex(baseColor.hex().toLowerCase());
  const to = argbFromHex(Color(mixColor).hex().toLowerCase());
  return Color(hexFromArgb(Blend.cam16Ucs(from, to, mixRatio)));
}

function warpProgress(t, gamma) {
  const clamped = clamp(t, 0, 1);
  if (clamped <= 0.5) {
    return 0.5 * Math.pow(clamped * 2, gamma);
  }
  return 1 - 0.5 * Math.pow((1 - clamped) * 2, gamma);
}

function sampleAnchors(anchors, t) {
  if (anchors.length === 1) {
    return anchors[0];
  }

  const scaled = clamp(t, 0, 1) * (anchors.length - 1);
  const leftIndex = Math.floor(scaled);
  const rightIndex = Math.min(anchors.length - 1, leftIndex + 1);
  const mix = scaled - leftIndex;

  return anchors[leftIndex] + (anchors[rightIndex] - anchors[leftIndex]) * mix;
}

function getYellowProtectionStrength(hue, enabled) {
  if (!enabled) {
    return 0;
  }

  const distance = getHueDistance(hue, YELLOW_PROTECTION_CENTER);
  if (distance >= YELLOW_PROTECTION_WIDTH) {
    return 0;
  }

  const normalized = 1 - distance / YELLOW_PROTECTION_WIDTH;
  return normalized * normalized;
}

function getChromaAnchors(baseHct, isDark, protectYellow) {
  const baseAnchors = isDark ? DARK_COLOR_CHROMA_ANCHORS : LIGHT_COLOR_CHROMA_ANCHORS;
  const yellowAnchors = isDark ? DARK_YELLOW_CHROMA_ANCHORS : LIGHT_YELLOW_CHROMA_ANCHORS;
  return mixAnchors(baseAnchors, yellowAnchors, getYellowProtectionStrength(baseHct.hue, protectYellow));
}

function getToneAnchors(baseHct, isDark, protectYellow) {
  const baseAnchors = isDark ? DARK_TONE_ANCHORS : LIGHT_TONE_ANCHORS;
  const yellowAnchors = isDark ? DARK_YELLOW_TONE_ANCHORS : LIGHT_YELLOW_TONE_ANCHORS;
  return mixAnchors(baseAnchors, yellowAnchors, getYellowProtectionStrength(baseHct.hue, protectYellow));
}

function getStepDescriptor(baseHct, stepIndex, options) {
  const progress = options.steps === 1 ? 0.5 : stepIndex / (options.steps - 1);
  const warped = warpProgress(progress, options.curveGamma);
  const tone = sampleAnchors(getToneAnchors(baseHct, options.dark, options.protectYellow), warped);

  const chromaRatio = sampleAnchors(getChromaAnchors(baseHct, options.dark, options.protectYellow), warped);
  const chroma = clamp(baseHct.chroma * chromaRatio, 0, 140);

  return {
    tone: round(tone),
    chroma: round(chroma),
    isNeutral: false,
  };
}

function createStepColor(baseHct, descriptor, format) {
  const hct = Hct.from(baseHct.hue, descriptor.chroma, descriptor.tone);
  return getColorString(Color(hexFromArgb(hct.toInt())), format);
}

function buildPalette(originColor, options = {}) {
  const normalized = normalizeOptions(options);
  const seedColor = getSeedColor(originColor, normalized.mixColor, normalized.mixRatio);
  const baseHct = Hct.fromInt(argbFromHex(seedColor.hex().toLowerCase()));
  const yellowProtectionStrength = getYellowProtectionStrength(baseHct.hue, normalized.protectYellow);

  const descriptors = Array.from({ length: normalized.steps }, (_, stepIndex) => {
    const descriptor = getStepDescriptor(baseHct, stepIndex, normalized);
    return {
      index: stepIndex + 1,
      ...descriptor,
      color: createStepColor(baseHct, descriptor, normalized.format),
    };
  });

  const closest = descriptors.reduce((best, current) => {
    const currentDistance = Math.abs(current.tone - baseHct.tone) + Math.abs(current.chroma - baseHct.chroma) * 0.35;
    const bestDistance = Math.abs(best.tone - baseHct.tone) + Math.abs(best.chroma - baseHct.chroma) * 0.35;
    return currentDistance < bestDistance ? current : best;
  }, descriptors[0]);
  const preferredBaseIndex = normalized.dark
    ? Math.max(closest.index, getPreferredDarkBaseIndex(normalized.steps))
    : closest.index;
  const base = descriptors[preferredBaseIndex - 1];

  return {
    options: normalized,
    descriptors,
    meta: {
      sourceColor: getColorString(Color(originColor), normalized.format),
      seedColor: getColorString(seedColor, normalized.format),
      sourceHex: Color(originColor).hex().toLowerCase(),
      seedHex: seedColor.hex().toLowerCase(),
      sourceTone: round(Hct.fromInt(argbFromHex(Color(originColor).hex().toLowerCase())).tone),
      seedTone: round(baseHct.tone),
      seedChroma: round(baseHct.chroma),
      closestIndex: closest.index,
      closestColor: closest.color,
      baseIndex: base.index,
      baseColor: base.color,
      dark: normalized.dark,
      steps: normalized.steps,
      isNeutral: closest.isNeutral,
      protectYellow: normalized.protectYellow,
      yellowProtectionApplied: yellowProtectionStrength > 0,
      yellowProtectionStrength: round(yellowProtectionStrength),
    },
  };
}

function finalizePaletteResult(palette) {
  const { options, descriptors, meta } = palette;
  const colors = descriptors.map((item) => item.color);
  const selectedIndex = options.hasExplicitIndex || options.list ? options.index : meta.baseIndex;
  const current = descriptors[selectedIndex - 1];

  if (!options.meta) {
    return options.list ? colors : current.color;
  }

  const payload = {
    ...meta,
  };

  if (options.list) {
    return {
      colors,
      base: payload,
      steps: descriptors.map(({ index, color, tone, chroma }) => ({
        index,
        color,
        tone,
        chroma,
      })),
    };
  }

  return {
    color: current.color,
    step: {
      index: current.index,
      tone: current.tone,
      chroma: current.chroma,
    },
    base: payload,
  };
}

export function generatePalette(originColor, options = {}) {
  return finalizePaletteResult(buildPalette(originColor, options));
}
