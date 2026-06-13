const lib = require('../dist/index.js');
const Color = require('color');

function normalizeHex(input) {
  return Color(input).hex().toLowerCase();
}

function lightness(input) {
  return Color(input).hsl().color[2];
}

function saturation(input) {
  return Color(input).hsl().color[1];
}

function expectMonotonic(values, direction) {
  for (let i = 1; i < values.length; i++) {
    if (direction === 'asc') {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    } else {
      expect(values[i]).toBeLessThanOrEqual(values[i - 1]);
    }
  }
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
  expect(normalizeHex(generate(base, { index: 1 }))).not.toBe(normalizeHex(generate(base, { index: 10 })));
  expect(normalizeHex(generate(base, { index: 1, dark: true }))).not.toBe(normalizeHex(generate(base, { index: 10, dark: true })));
});

it('palette.generate list (light/dark)', () => {
  const { generate } = lib.palette;
  const base = '#f53f3f';
  const lightList = generate(base, { list: true });
  expect(lightList).toHaveLength(10);
  expect(generate(base, { index: 1 })).toBe(lightList[0]);
  expect(generate(base, { index: 10 })).toBe(lightList[9]);
  expectMonotonic(lightList.map(lightness), 'desc');

  const darkList = generate(base, { list: true, dark: true });
  expect(darkList).toHaveLength(10);
  expect(generate(base, { index: 1, dark: true })).toBe(darkList[0]);
  expect(generate(base, { index: 10, dark: true })).toBe(darkList[9]);
  expectMonotonic(darkList.map(lightness), 'asc');
});

it('palette.generate softens saturation on palette ends', () => {
  const { generate } = lib.palette;
  const lightList = generate('#f53f3f', { list: true });
  const darkList = generate('#f53f3f', { list: true, dark: true });
  const centerLight = saturation(lightList[Math.floor(lightList.length / 2)]);
  const centerDark = saturation(darkList[Math.floor(darkList.length / 2)]);

  expect(saturation(lightList[0])).toBeLessThan(centerLight);
  expect(saturation(lightList[lightList.length - 1])).toBeLessThan(centerLight);
  expect(saturation(darkList[0])).toBeLessThan(centerDark);
});

it('palette.generate format', () => {
  const { generate } = lib.palette;
  expect(generate('#f53f3f', { index: 6, format: 'rgb' })).toMatch(/^rgb\(\d+,\s?\d+,\s?\d+\)$/);
  expect(generate('#f53f3f', { index: 6, format: 'hsl' })).toMatch(/^hsl\(\d+,\s?\d+%,\s?\d+%\)$/);
});

it('palette.generate mix', () => {
  const { generate } = lib.palette;
  const base = '#f53f3f';
  const mixed = generate(base, { index: 6, mixColor: '#165dff', mixRatio: 0.5 });
  expect(normalizeHex(mixed)).not.toBe(normalizeHex(base));
  expect(generate(base, { index: 6, dark: true, mixColor: '#165dff', mixRatio: 0.5 })).not.toBe(normalizeHex(base));
  const meta = generate(base, { list: true, mixColor: '#165dff', mixRatio: 0.5, meta: true });
  expect(meta.colors).toHaveLength(10);
  expect(normalizeHex(meta.base.sourceHex)).toBe(normalizeHex(base));
  expect(normalizeHex(meta.base.seedHex)).not.toBe(normalizeHex(base));
  expect(meta.base.closestIndex).toBeGreaterThanOrEqual(1);
  expect(meta.base.closestIndex).toBeLessThanOrEqual(10);
});

it('palette.generate meta exposes base color information', () => {
  const { generate } = lib.palette;
  const result = generate('#808080', { list: true, dark: true, meta: true });
  expect(result).toHaveProperty('colors');
  expect(result).toHaveProperty('base');
  expect(result).toHaveProperty('steps');
  expect(result.base.isNeutral).toBe(true);
  expect(result.base.closestColor).toBe(result.colors[result.base.closestIndex - 1]);
  expect(result.steps[0]).toHaveProperty('tone');
  expect(result.steps[0]).toHaveProperty('chroma');
});

it('palette.generate dark neutral palette runs from black to white', () => {
  const { generate } = lib.palette;
  const list = generate('#808080', { list: true, dark: true });
  const lightnessList = list.map(lightness);
  expectMonotonic(lightnessList, 'asc');
  expect(saturation(list[0])).toBeLessThan(5);
  expect(saturation(list[list.length - 1])).toBeLessThan(5);
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

it('neutral.generate mix', () => {
  const { generate } = lib.neutral;
  const mixed = generate('#ffffff', '#000000', { steps: 12, format: 'hex', mixColor: '#165dff', mixRatio: 0.3 });
  expect(mixed).toHaveLength(12);
  expect(mixed[0]).not.toBe('#ffffff');
  expect(mixed[11]).not.toBe('#000000');

  const reverse = generate('#000000', '#ffffff', { steps: 12, format: 'hex', mixColor: '#165dff', mixRatio: 0.3 });
  expect(reverse).toHaveLength(12);
  expect(mixed[0]).toBe(reverse[11]);
  expect(mixed[11]).toBe(reverse[0]);
});
