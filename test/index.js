const lib = require('../dist/index.js');
const Color = require('color');

function normalizeHex(input) {
  return Color(input).hex().toLowerCase();
}

function lightness(input) {
  return Color(input).hsl().color[2];
}

it('export shape', () => {
  expect(lib).toHaveProperty('palette');
  expect(lib.palette).toHaveProperty('generate');
  expect(typeof lib.palette.generate).toBe('function');
  expect(lib).toHaveProperty('neutral');
  expect(lib.neutral).toHaveProperty('generate');
  expect(typeof lib.neutral.generate).toBe('function');
});

it('removed exports should not exist', () => {
  expect(lib.generate).toBeUndefined();
  expect(lib.getRgbStr).toBeUndefined();
  expect(lib.getPresetColors).toBeUndefined();
  expect(lib.colorList).toBeUndefined();

  expect(lib.extractColorFromImage).toBeUndefined();
  expect(lib.extractColorFromFile).toBeUndefined();

  expect(lib.generateLinear).toBeUndefined();
  expect(lib.generateGrayLinear).toBeUndefined();
  expect(lib.generateMonochromeLinear).toBeUndefined();
  expect(lib.generateLinearHSL).toBeUndefined();

  expect(lib.rgbToHct).toBeUndefined();
  expect(lib.hctToRgb).toBeUndefined();
  expect(lib.blendInHct).toBeUndefined();
  expect(lib.harmonizeColor).toBeUndefined();
  expect(lib.generateThemeVariants).toBeUndefined();
  expect(lib.blendUIColors).toBeUndefined();
  expect(lib.generateThemePalette).toBeUndefined();
  expect(lib.generateControlColors).toBeUndefined();
  expect(lib.generateSemanticColors).toBeUndefined();
  expect(lib.generateThemeColors).toBeUndefined();
  expect(lib.generateInterfaceColorSystem).toBeUndefined();
});

it('palette.generate single color', () => {
  const { generate } = lib.palette;
  const base = '#f53f3f';
  const baseHex = normalizeHex(base);

  expect(generate(base, { index: 6 })).toBe(baseHex);
  expect(generate(base, { index: 6, dark: true })).toBe(baseHex);

  expect(generate(base, { index: 1 })).not.toBe(baseHex);
  expect(generate(base, { index: 10 })).not.toBe(baseHex);
  expect(generate(base, { index: 1, dark: true })).not.toBe(baseHex);
  expect(generate(base, { index: 10, dark: true })).not.toBe(baseHex);
});

it('palette.generate list (light/dark)', () => {
  const { generate } = lib.palette;
  const base = '#f53f3f';
  const baseHex = normalizeHex(base);
  const baseL = lightness(baseHex);

  const lightList = generate(base, { list: true });
  expect(lightList).toHaveLength(10);
  expect(lightList[5]).toBe(baseHex);
  expect(generate(base, { index: 1 })).toBe(lightList[0]);
  expect(generate(base, { index: 10 })).toBe(lightList[9]);

  for (let idx = 0; idx < 5; idx++) {
    expect(lightness(lightList[idx])).toBeGreaterThanOrEqual(baseL);
  }
  for (let idx = 6; idx < 10; idx++) {
    expect(lightness(lightList[idx])).toBeLessThanOrEqual(baseL);
  }

  const darkList = generate(base, { list: true, dark: true });
  expect(darkList).toHaveLength(10);
  expect(darkList[5]).toBe(baseHex);
  expect(generate(base, { index: 1, dark: true })).toBe(darkList[0]);
  expect(generate(base, { index: 10, dark: true })).toBe(darkList[9]);

  for (let idx = 0; idx < 5; idx++) {
    expect(lightness(darkList[idx])).toBeLessThanOrEqual(baseL);
  }
  for (let idx = 6; idx < 10; idx++) {
    expect(lightness(darkList[idx])).toBeGreaterThanOrEqual(baseL);
  }
});

it('palette.generate format', () => {
  const { generate } = lib.palette;
  expect(generate('#f53f3f', { index: 6, format: 'rgb' })).toMatch(/^rgb\(\d+,\s?\d+,\s?\d+\)$/);
  expect(generate('#f53f3f', { index: 6, format: 'hsl' })).toMatch(/^hsl\(\d+,\s?\d+%,\s?\d+%\)$/);
});

it('palette.generate mix', () => {
  const { generate } = lib.palette;
  const base = '#f53f3f';
  const baseHex = normalizeHex(base);
  const mixed = generate(base, { index: 6, mixColor: '#165dff', mixRatio: 0.5 });
  expect(mixed).not.toBe(baseHex);
  expect(generate(base, { index: 6, dark: true, mixColor: '#165dff', mixRatio: 0.5 })).toBe(mixed);
  const list = generate(base, { list: true, mixColor: '#165dff', mixRatio: 0.5 });
  expect(list[5]).toBe(mixed);
});

it('neutral.generate gray linear', () => {
  const { generate } = lib.neutral;
  const list = generate('#ffffff', '#000000', { steps: 12, format: 'hex' });
  expect(list).toHaveLength(12);
  expect(list[0]).toBe('#ffffff');
  expect(list[11]).toBe('#000000');
  for (let i = 1; i < list.length; i++) {
    expect(lightness(list[i])).toBeLessThanOrEqual(lightness(list[i - 1]));
  }
});

it('neutral.generate curveGamma', () => {
  const { generate } = lib.neutral;
  const linear = generate('#ffffff', '#000000', { steps: 12, format: 'hex', curveGamma: 1 });
  const curved = generate('#ffffff', '#000000', { steps: 12, format: 'hex', curveGamma: 2 });
  expect(lightness(curved[1])).toBeGreaterThan(lightness(linear[1]));
});
