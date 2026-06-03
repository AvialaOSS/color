const lib = require('../dist/index.js');

describe('Theme exports removed', () => {
  test('should not export theme helpers', () => {
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
});
