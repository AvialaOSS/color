import Color from 'color';
import { Blend, Hct, argbFromHex, hexFromArgb } from '@material/material-color-utilities';
import { getColorString } from './utils.js';

const LIGHT_TONE_ANCHORS = [98, 96, 92, 86, 76, 64, 52, 40, 28, 18];
const DARK_TONE_ANCHORS = [14, 20, 28, 38, 50, 62, 74, 86, 93, 97];
const LIGHT_PROTECTED_TONE_ANCHORS = [99, 97.5, 95, 91, 84, 76, 68, 58, 48, 36];
const DARK_PROTECTED_TONE_ANCHORS = [18, 24, 32, 42, 54, 66, 77, 87, 94, 98];

const LIGHT_COLOR_CHROMA_ANCHORS = [0.08, 0.14, 0.24, 0.36, 0.5, 0.74, 1, 0.92, 0.78, 0.6];
const DARK_COLOR_CHROMA_ANCHORS = [1, 0.98, 0.94, 0.88, 0.8, 0.72, 0.62, 0.52, 0.42, 0.32];
const LIGHT_PROTECTED_CHROMA_ANCHORS = [0.16, 0.24, 0.38, 0.54, 0.7, 0.88, 1.04, 1.02, 0.98, 0.9];
const DARK_PROTECTED_CHROMA_ANCHORS = [1.05, 1.03, 1, 0.97, 0.94, 0.9, 0.84, 0.76, 0.68, 0.58];

const HUE_FAMILY_CONFIG = {
  red: { center: 20, width: 40 },
  orange: { center: 75, width: 42 },
  yellow: { center: 112, width: 36 },
  green: { center: 155, width: 36 },
  cyan: { center: 195, width: 36 },
  blue: { center: 258, width: 32 },
  purple: { center: 305, width: 36 },
  magenta: { center: 340, width: 38 },
};

const HUE_FAMILY_NAMES = Object.keys(HUE_FAMILY_CONFIG);

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

  return baseAnchors.map((value, index) => mixValue(value, targetAnchors[index], ratio));
}

function normalizeHueFamilyInput(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string') {
    return value
      .split(/[,\s]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  if (value === true) {
    return ['yellow'];
  }
  return [];
}

function normalizeProtectHueFamilies(value, legacyProtectYellow) {
  const rawFamilies = normalizeHueFamilyInput(value);
  const legacyFamilies = rawFamilies.length === 0 && legacyProtectYellow ? ['yellow'] : [];
  const candidates = [...rawFamilies, ...legacyFamilies];
  return [...new Set(candidates.map((item) => String(item).toLowerCase()).filter((item) => HUE_FAMILY_NAMES.includes(item)))];
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
    protectHueFamilies: normalizeProtectHueFamilies(options.protectHueFamilies, options.protectYellow),
    protectHueStrength: clamp(Number(options.protectHueStrength) || 1, 0, 2),
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

function getHueFamilyStrength(hue, family) {
  const familyConfig = HUE_FAMILY_CONFIG[family];
  if (!familyConfig) {
    return 0;
  }

  const distance = getHueDistance(hue, familyConfig.center);
  if (distance >= familyConfig.width) {
    return 0;
  }

  const normalized = 1 - distance / familyConfig.width;
  return Math.pow(normalized, 0.7);
}

function getHueProtectionState(hue, families, strength) {
  if (!families.length || strength <= 0) {
    return {
      strength: 0,
      appliedFamilies: [],
    };
  }

  const appliedFamilies = families.filter((family) => getHueFamilyStrength(hue, family) > 0);
  const familyStrength = appliedFamilies.reduce(
    (maxStrength, family) => Math.max(maxStrength, getHueFamilyStrength(hue, family)),
    0
  );

  return {
    strength: clamp(familyStrength * strength, 0, 1.75),
    appliedFamilies,
  };
}

function getChromaAnchors(isDark, protectionState) {
  const baseAnchors = isDark ? DARK_COLOR_CHROMA_ANCHORS : LIGHT_COLOR_CHROMA_ANCHORS;
  const protectedAnchors = isDark ? DARK_PROTECTED_CHROMA_ANCHORS : LIGHT_PROTECTED_CHROMA_ANCHORS;
  return mixAnchors(baseAnchors, protectedAnchors, protectionState.strength);
}

function getToneAnchors(isDark, protectionState) {
  const baseAnchors = isDark ? DARK_TONE_ANCHORS : LIGHT_TONE_ANCHORS;
  const protectedAnchors = isDark ? DARK_PROTECTED_TONE_ANCHORS : LIGHT_PROTECTED_TONE_ANCHORS;
  return mixAnchors(baseAnchors, protectedAnchors, protectionState.strength);
}

function getStepDescriptor(baseHct, stepIndex, options, protectionState) {
  const progress = options.steps === 1 ? 0.5 : stepIndex / (options.steps - 1);
  const warped = warpProgress(progress, options.curveGamma);
  const tone = sampleAnchors(getToneAnchors(options.dark, protectionState), warped);

  const chromaRatio = sampleAnchors(getChromaAnchors(options.dark, protectionState), warped);
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
  const protectionState = getHueProtectionState(baseHct.hue, normalized.protectHueFamilies, normalized.protectHueStrength);

  const descriptors = Array.from({ length: normalized.steps }, (_, stepIndex) => {
    const descriptor = getStepDescriptor(baseHct, stepIndex, normalized, protectionState);
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
      protectHueFamilies: normalized.protectHueFamilies,
      protectHueStrength: normalized.protectHueStrength,
      hueProtectionApplied: protectionState.appliedFamilies.length > 0,
      hueProtectionStrength: round(protectionState.strength),
      hueProtectionFamiliesApplied: protectionState.appliedFamilies,
      protectYellow: normalized.protectHueFamilies.includes('yellow'),
      yellowProtectionApplied: protectionState.appliedFamilies.includes('yellow'),
      yellowProtectionStrength: round(
        protectionState.appliedFamilies.includes('yellow') ? protectionState.strength : 0
      ),
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
