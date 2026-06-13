const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadThemeBlendModule() {
  const filePath = path.resolve(__dirname, '../src/theme-blend.js');
  const source = fs.readFileSync(filePath, 'utf8');
  const transformedSource = source.replace(/export function\s+/g, 'function ');
  const exportNames = [
    'rgbToHct',
    'hctToRgb',
    'blendInHct',
    'harmonizeColor',
    'generateThemeVariants',
    'blendUIColors',
    'generateControlColors',
    'generateSemanticColors',
    'generateThemeColors',
    'generateInterfaceColorSystem',
    'generateThemePalette'
  ];

  const sandbox = {
    module: { exports: {} },
    exports: {},
    require,
    console
  };

  vm.runInNewContext(
    `${transformedSource}\nmodule.exports = { ${exportNames.join(', ')} };`,
    sandbox,
    { filename: filePath }
  );

  return sandbox.module.exports;
}

describe('theme-blend internal flow', () => {
  const {
    harmonizeColor,
    generateSemanticColors,
    generateThemePalette
  } = loadThemeBlendModule();

  test('generateThemePalette applies harmonizeRatio before semantic blending', () => {
    const themeColor = '#165dff';
    const semanticColors = { success: '#52c41a' };
    const palette = generateThemePalette(themeColor, {
      semanticColors,
      harmonizeRatio: 0.3,
      blendRatio: 0,
      generateVariants: false
    });

    const expectedSemantic = generateSemanticColors(themeColor, {
      semanticColors: {
        success: harmonizeColor(themeColor, semanticColors.success, 0.3)
      },
      blendRatio: 0,
      isDark: false
    });

    expect(palette.semantic.success[5]).toBe(expectedSemantic['success-5']);
  });

  test('generateThemePalette uses blendRatio for semantic post-blend strength', () => {
    const themeColor = '#165dff';
    const semanticColors = { warning: '#faad14' };
    const palette = generateThemePalette(themeColor, {
      semanticColors,
      harmonizeRatio: 0.2,
      blendRatio: 0.25,
      generateVariants: false
    });

    const expectedSemantic = generateSemanticColors(themeColor, {
      semanticColors: {
        warning: harmonizeColor(themeColor, semanticColors.warning, 0.2)
      },
      blendRatio: 0.25,
      isDark: false
    });

    expect(palette.semantic.warning[5]).toBe(expectedSemantic['warning-5']);
  });

  test('changing harmonizeRatio does not affect ui or control blending', () => {
    const themeColor = '#165dff';
    const semanticColors = { error: '#ff4d4f' };
    const baseOptions = {
      semanticColors,
      blendRatio: 0.2,
      generateVariants: false
    };

    const lowHarmonize = generateThemePalette(themeColor, {
      ...baseOptions,
      harmonizeRatio: 0
    });
    const highHarmonize = generateThemePalette(themeColor, {
      ...baseOptions,
      harmonizeRatio: 0.4
    });

    expect(lowHarmonize.ui).toEqual(highHarmonize.ui);
    expect(lowHarmonize.controls).toEqual(highHarmonize.controls);
    expect(lowHarmonize.semantic.error[5]).not.toBe(highHarmonize.semantic.error[5]);
  });
});
