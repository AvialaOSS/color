import Color from 'color';
import { Blend, Hct, argbFromHex, hexFromArgb } from '@material/material-color-utilities';
import { getColorString } from './utils.js';

const LIGHT_TONE_ANCHORS = [98, 96, 92, 86, 76, 64, 52, 40, 28, 18];
const DARK_TONE_ANCHORS = [14, 20, 28, 38, 50, 62, 74, 86, 93, 97];

const LIGHT_COLOR_CHROMA_ANCHORS = [0.08, 0.14, 0.24, 0.36, 0.5, 0.74, 1, 0.92, 0.78, 0.6];
const DARK_COLOR_CHROMA_ANCHORS = [1, 0.98, 0.94, 0.88, 0.8, 0.72, 0.62, 0.52, 0.42, 0.32];

const LIGHT_NEUTRAL_CHROMA_ANCHORS = [0, 0.02, 0.04, 0.08, 0.12, 0.16, 0.12, 0.08, 0.04, 0];
const DARK_NEUTRAL_CHROMA_ANCHORS = [0, 0.02, 0.04, 0.08, 0.12, 0.16, 0.12, 0.08, 0.04, 0];

const NEUTRAL_CHROMA_THRESHOLD = 12;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function round(value) {
  return Math.round(value * 100) / 100;
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

function getChromaAnchors(isDark, isNeutral) {
  if (isNeutral) {
    return isDark ? DARK_NEUTRAL_CHROMA_ANCHORS : LIGHT_NEUTRAL_CHROMA_ANCHORS;
  }
  return isDark ? DARK_COLOR_CHROMA_ANCHORS : LIGHT_COLOR_CHROMA_ANCHORS;
}

function getToneAnchors(isDark) {
  return isDark ? DARK_TONE_ANCHORS : LIGHT_TONE_ANCHORS;
}

function getStepDescriptor(baseHct, stepIndex, options) {
  const progress = options.steps === 1 ? 0.5 : stepIndex / (options.steps - 1);
  const warped = warpProgress(progress, options.curveGamma);
  const tone = sampleAnchors(getToneAnchors(options.dark), warped);

  const isNeutral = baseHct.chroma <= NEUTRAL_CHROMA_THRESHOLD;
  const chromaRatio = sampleAnchors(getChromaAnchors(options.dark, isNeutral), warped);
  const chromaBase = isNeutral ? Math.min(baseHct.chroma, 10) : baseHct.chroma;
  const chroma = isNeutral
    ? Math.min(6, chromaBase * chromaRatio)
    : clamp(baseHct.chroma * chromaRatio, 0, 140);

  return {
    tone: round(tone),
    chroma: round(chroma),
    isNeutral,
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
