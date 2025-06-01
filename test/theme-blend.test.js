const {
  rgbToHct,
  hctToRgb,
  blendInHct,
  harmonizeColor,
  generateThemeVariants,
  blendSemanticColors,
  blendUIColors,
  generateThemePalette,
  generateControlColors,
  generateSemanticColors,
  generateThemeColors,
  generateInterfaceColorSystem
} = require('../dist/index.js');

describe('Theme Blend Functions', () => {
  const testThemeColor = '#165DFF'; // Arco Blue
  const testTargetColor = '#F53F3F'; // Red
  
  test('rgbToHct should convert RGB to HCT', () => {
    const hct = rgbToHct(testThemeColor);
    expect(hct).toHaveProperty('h');
    expect(hct).toHaveProperty('c');
    expect(hct).toHaveProperty('t');
    expect(hct.h).toBeGreaterThanOrEqual(0);
    expect(hct.h).toBeLessThan(360);
    expect(hct.c).toBeGreaterThanOrEqual(0);
    expect(hct.t).toBeGreaterThanOrEqual(0);
    expect(hct.t).toBeLessThanOrEqual(100);
  });
  
  test('hctToRgb should convert HCT back to RGB', () => {
    const hct = rgbToHct(testThemeColor);
    const rgb = hctToRgb(hct);
    expect(rgb).toMatch(/^#[0-9a-f]{6}$/i);
  });
  
  test('blendInHct should blend two colors', () => {
    const blended = blendInHct(testThemeColor, testTargetColor, 0.5);
    expect(blended).toMatch(/^#[0-9a-f]{6}$/i);
    expect(blended).not.toBe(testThemeColor);
    expect(blended).not.toBe(testTargetColor);
  });
  
  test('harmonizeColor should harmonize target color with theme color', () => {
    const harmonized = harmonizeColor(testThemeColor, testTargetColor, 0.15);
    expect(harmonized).toMatch(/^#[0-9a-f]{6}$/i);
    expect(harmonized).not.toBe(testTargetColor);
  });
  
  test('generateThemeVariants should generate color variants', () => {
    const variants = generateThemeVariants(testThemeColor);
    expect(Array.isArray(variants)).toBe(true);
    expect(variants.length).toBe(9); // Default tone steps
    variants.forEach(color => {
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
  
  test('blendSemanticColors should blend semantic colors', () => {
    const semanticColors = {
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336'
    };
    
    const blended = blendSemanticColors(testThemeColor, semanticColors, 0.15);
    expect(blended).toHaveProperty('success');
    expect(blended).toHaveProperty('warning');
    expect(blended).toHaveProperty('error');
    
    Object.values(blended).forEach(color => {
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
  
  test('blendUIColors should blend UI colors', () => {
    const uiColors = {
      background: '#f5f5f5',
      surface: '#ffffff',
      border: '#e0e0e0'
    };
    
    const blended = blendUIColors(testThemeColor, uiColors, 0.2);
    expect(blended).toHaveProperty('background');
    expect(blended).toHaveProperty('surface');
    expect(blended).toHaveProperty('border');
    
    Object.values(blended).forEach(color => {
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
  
  test('generateThemePalette should generate complete theme palette', () => {
    const palette = generateThemePalette(testThemeColor);
    
    expect(palette).toHaveProperty('theme');
    expect(palette).toHaveProperty('semantic');
    expect(palette).toHaveProperty('ui');
    expect(palette).toHaveProperty('variants');
    
    expect(palette.theme).toBe(testThemeColor);
    expect(Array.isArray(palette.variants)).toBe(true);
    
    // Check semantic colors
    expect(palette.semantic).toHaveProperty('success');
    expect(palette.semantic).toHaveProperty('warning');
    expect(palette.semantic).toHaveProperty('error');
    expect(palette.semantic).toHaveProperty('info');
    
    // Check UI colors
    expect(palette.ui).toHaveProperty('background');
    expect(palette.ui).toHaveProperty('surface');
    expect(palette.ui).toHaveProperty('border');
    expect(palette.ui).toHaveProperty('disabled');
  });
  
  test('generateThemePalette should work with custom options', () => {
    const customOptions = {
      semanticColors: {
        primary: '#2196f3',
        secondary: '#4caf50'
      },
      harmonizeRatio: 0.3,
      blendRatio: 0.4,
      generateVariants: false
    };
    
    const palette = generateThemePalette(testThemeColor, customOptions);
    
    expect(palette.semantic).toHaveProperty('primary');
    expect(palette.semantic).toHaveProperty('secondary');
    expect(palette.semantic).not.toHaveProperty('success');
    expect(palette).not.toHaveProperty('variants');
  });
  
  test('generateControlColors should generate control colors', () => {
    const controls = generateControlColors('#666666', testThemeColor);
    
    expect(typeof controls).toBe('object');
    expect(Object.keys(controls)).toHaveLength(12);
    
    // Check that all gray colors are generated
    for (let i = 1; i <= 12; i++) {
      expect(controls).toHaveProperty(`gray-${i}`);
      expect(controls[`gray-${i}`]).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
  
  test('generateSemanticColors should generate semantic color variants', () => {
    const semantic = generateSemanticColors(testThemeColor);
    
    expect(typeof semantic).toBe('object');
    
    // Check default semantic colors (success, warning, error, info) with 10 variants each
    const expectedColors = ['success', 'warning', 'error', 'info'];
    expectedColors.forEach(colorName => {
      for (let i = 1; i <= 10; i++) {
        const variantName = `${colorName}-${i}`;
        expect(semantic).toHaveProperty(variantName);
        expect(semantic[variantName]).toMatch(/^#[0-9a-f]{6}$/i);
      }
    });
  });
  
  test('generateThemeColors should generate theme color variants', () => {
    const themeColors = generateThemeColors(testThemeColor);
    
    expect(typeof themeColors).toBe('object');
    expect(Object.keys(themeColors)).toHaveLength(10);
    
    // Check that all theme colors are generated
    for (let i = 1; i <= 10; i++) {
      expect(themeColors).toHaveProperty(`theme-${i}`);
      expect(themeColors[`theme-${i}`]).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
  
  test('generateInterfaceColorSystem should generate complete interface color system', () => {
    const system = generateInterfaceColorSystem(testThemeColor);
    
    expect(system).toHaveProperty('controls');
    expect(system).toHaveProperty('semantic');
    expect(system).toHaveProperty('theme');
    
    // Check controls (12 gray colors)
    expect(Object.keys(system.controls)).toHaveLength(12);
    
    // Check semantic (40 colors: 4 types × 10 variants)
    expect(Object.keys(system.semantic)).toHaveLength(40);
    
    // Check theme (10 colors)
    expect(Object.keys(system.theme)).toHaveLength(10);
    
    // Verify all colors are valid hex
    [...Object.values(system.controls), ...Object.values(system.semantic), ...Object.values(system.theme)].forEach(color => {
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
  
  test('generateInterfaceColorSystem should work with dark mode', () => {
    const system = generateInterfaceColorSystem(testThemeColor, { isDark: true });
    
    expect(system).toHaveProperty('controls');
    expect(system).toHaveProperty('semantic');
    expect(system).toHaveProperty('theme');
    
    // All should still have the same structure
    expect(Object.keys(system.controls)).toHaveLength(12);
    expect(Object.keys(system.semantic)).toHaveLength(40);
    expect(Object.keys(system.theme)).toHaveLength(10);
  });
});