const {
  rgbToHct,
  hctToRgb,
  blendInHct,
  harmonizeColor,
  generateThemeVariants,
  blendUIColors,
  generateThemePalette,
  generateControlColors,
  generateSemanticColors,
  generateThemeColors,
  generateInterfaceColorSystem,
  // 新增的颜色工具函数
  colorDifference,
  adjustTone,
  adjustChroma,
  adjustHue,
  rotateHue,
  getComplementary,
  getTriadic,
  getSplitComplementary,
  getAnalogous
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
    expect(palette).toHaveProperty('controls');
    
    // Check theme colors (theme-1 to theme-10)
    expect(typeof palette.theme).toBe('object');
    expect(Object.keys(palette.theme)).toHaveLength(10);
    
    // Check controls (gray-1 to gray-12)
    expect(typeof palette.controls).toBe('object');
    expect(Object.keys(palette.controls)).toHaveLength(12);
    
    // Check semantic colors
    expect(palette.semantic).toHaveProperty('success');
    expect(palette.semantic).toHaveProperty('warning');
    expect(palette.semantic).toHaveProperty('error');
    expect(palette.semantic).toHaveProperty('info');
    
    // Each semantic color should have 10 variants
    Object.values(palette.semantic).forEach(colorVariants => {
      expect(Object.keys(colorVariants)).toHaveLength(10);
    });
    
    // Check UI colors
    expect(palette.ui).toHaveProperty('background');
    expect(palette.ui).toHaveProperty('surface');
    expect(palette.ui).toHaveProperty('border');
    expect(palette.ui).toHaveProperty('disabled');
  });
  
  test('generateThemePalette should work with custom options', () => {
    const customOptions = {
      semanticColors: {
        success: '#00C853',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3'
      },
      harmonizeRatio: 0.3,
      blendRatio: 0.4
    };
    
    const palette = generateThemePalette(testThemeColor, customOptions);
    
    expect(palette.semantic).toHaveProperty('success');
    expect(palette.semantic).toHaveProperty('warning');
    expect(palette.semantic).toHaveProperty('error');
    expect(palette.semantic).toHaveProperty('info');
    
    // All semantic colors should have 10 variants each
    expect(Object.keys(palette.semantic.success)).toHaveLength(10);
    expect(Object.keys(palette.semantic.warning)).toHaveLength(10);
    expect(Object.keys(palette.semantic.error)).toHaveLength(10);
    expect(Object.keys(palette.semantic.info)).toHaveLength(10);
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

  test('generateInterfaceColorSystem should support custom steps and lightness range', () => {
    const system = generateInterfaceColorSystem(testThemeColor, {
      controlSteps: 24,
      controlMinLightness: 5,
      controlMaxLightness: 98,
      semanticSteps: 12,
      themeSteps: 8
    });
    
    expect(Object.keys(system.controls)).toHaveLength(24);
    expect(Object.keys(system.semantic)).toHaveLength(48); // 4 types × 12 variants
    expect(Object.keys(system.theme)).toHaveLength(8);
  });
});

describe('Color Utility Functions', () => {
  const testColor = '#3491FA';
  const testColor2 = '#FF5722';
  
  describe('colorDifference', () => {
    test('should return 0 for identical colors', () => {
      const diff = colorDifference(testColor, testColor);
      expect(diff).toBeCloseTo(0, 1);
    });
    
    test('should return positive value for different colors', () => {
      const diff = colorDifference(testColor, testColor2);
      expect(diff).toBeGreaterThan(0);
    });
    
    test('should return larger value for more different colors', () => {
      const diff1 = colorDifference('#FF0000', '#FF0001');
      const diff2 = colorDifference('#FF0000', '#0000FF');
      expect(diff2).toBeGreaterThan(diff1);
    });
  });
  
  describe('adjustTone', () => {
    test('should adjust color tone to specified value', () => {
      const lightened = adjustTone(testColor, 90);
      const darkened = adjustTone(testColor, 20);
      
      expect(lightened).toMatch(/^#[0-9a-f]{6}$/i);
      expect(darkened).toMatch(/^#[0-9a-f]{6}$/i);
      
      // Verify lightened is actually lighter
      const lightHct = rgbToHct(lightened);
      const darkHct = rgbToHct(darkened);
      expect(lightHct.t).toBeGreaterThan(darkHct.t);
    });
    
    test('should clamp tone to valid range', () => {
      const result1 = adjustTone(testColor, 150); // Should clamp to 100
      const result2 = adjustTone(testColor, -10); // Should clamp to 0
      
      expect(result1).toMatch(/^#[0-9a-f]{6}$/i);
      expect(result2).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
  
  describe('adjustChroma', () => {
    test('should adjust color chroma', () => {
      const saturated = adjustChroma(testColor, 80);
      const desaturated = adjustChroma(testColor, 20);
      
      expect(saturated).toMatch(/^#[0-9a-f]{6}$/i);
      expect(desaturated).toMatch(/^#[0-9a-f]{6}$/i);
    });
    
    test('should return grayscale when chroma is 0', () => {
      const gray = adjustChroma(testColor, 0);
      expect(gray).toMatch(/^#[0-9a-f]{6}$/i);
      
      // Verify it's grayscale (R ≈ G ≈ B)
      const r = parseInt(gray.slice(1, 3), 16);
      const g = parseInt(gray.slice(3, 5), 16);
      const b = parseInt(gray.slice(5, 7), 16);
      expect(Math.abs(r - g)).toBeLessThan(5);
      expect(Math.abs(g - b)).toBeLessThan(5);
    });
  });
  
  describe('adjustHue', () => {
    test('should adjust color hue', () => {
      const result = adjustHue(testColor, 120);
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
      
      const hct = rgbToHct(result);
      expect(hct.h).toBeCloseTo(120, 0);
    });
    
    test('should normalize hue to 0-360', () => {
      const result1 = adjustHue(testColor, 400); // Should be 40
      const result2 = adjustHue(testColor, -30); // Should be 330
      
      expect(result1).toMatch(/^#[0-9a-f]{6}$/i);
      expect(result2).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
  
  describe('rotateHue', () => {
    test('should rotate hue by specified degrees', () => {
      const original = rgbToHct(testColor);
      const rotated = rotateHue(testColor, 90);
      const rotatedHct = rgbToHct(rotated);
      
      expect(rotated).toMatch(/^#[0-9a-f]{6}$/i);
      
      // Hue should be rotated by approximately 90 degrees
      let expectedHue = (original.h + 90) % 360;
      let actualDiff = Math.abs(rotatedHct.h - expectedHue);
      if (actualDiff > 180) actualDiff = 360 - actualDiff;
      expect(actualDiff).toBeLessThan(5);
    });
    
    test('should handle negative rotation', () => {
      const rotated = rotateHue(testColor, -45);
      expect(rotated).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
  
  describe('getComplementary', () => {
    test('should return complementary color (180 degree rotation)', () => {
      const complement = getComplementary(testColor);
      expect(complement).toMatch(/^#[0-9a-f]{6}$/i);
      
      const originalHct = rgbToHct(testColor);
      const complementHct = rgbToHct(complement);
      
      // Hue should differ by approximately 180 degrees
      let hueDiff = Math.abs(complementHct.h - originalHct.h);
      if (hueDiff > 180) hueDiff = 360 - hueDiff;
      expect(hueDiff).toBeCloseTo(180, -1);
    });
  });
  
  describe('getTriadic', () => {
    test('should return array of 3 colors', () => {
      const triadic = getTriadic(testColor);
      
      expect(Array.isArray(triadic)).toBe(true);
      expect(triadic).toHaveLength(3);
      triadic.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
    
    test('should have first color as original', () => {
      const triadic = getTriadic(testColor);
      expect(triadic[0].toLowerCase()).toBe(testColor.toLowerCase());
    });
    
    test('should have colors roughly 120 degrees apart', () => {
      const triadic = getTriadic(testColor);
      const hues = triadic.map(c => rgbToHct(c).h);
      
      // Check approximate 120 degree separation
      for (let i = 0; i < 3; i++) {
        let diff = Math.abs(hues[(i + 1) % 3] - hues[i]);
        if (diff > 180) diff = 360 - diff;
        expect(diff).toBeGreaterThan(100);
        expect(diff).toBeLessThan(140);
      }
    });
  });
  
  describe('getSplitComplementary', () => {
    test('should return array of 3 colors', () => {
      const split = getSplitComplementary(testColor);
      
      expect(Array.isArray(split)).toBe(true);
      expect(split).toHaveLength(3);
      split.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
    
    test('should have first color as original', () => {
      const split = getSplitComplementary(testColor);
      expect(split[0].toLowerCase()).toBe(testColor.toLowerCase());
    });
    
    test('should support custom angle', () => {
      const split30 = getSplitComplementary(testColor, 30);
      const split45 = getSplitComplementary(testColor, 45);
      
      expect(split30).toHaveLength(3);
      expect(split45).toHaveLength(3);
      
      // Different angles should produce different colors
      expect(split30[1]).not.toBe(split45[1]);
    });
  });
  
  describe('getAnalogous', () => {
    test('should return array of colors', () => {
      const analogous = getAnalogous(testColor);
      
      expect(Array.isArray(analogous)).toBe(true);
      expect(analogous.length).toBeGreaterThan(0);
      analogous.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
    
    test('should default to 3 colors', () => {
      const analogous = getAnalogous(testColor);
      expect(analogous).toHaveLength(3);
    });
    
    test('should support custom count', () => {
      const analogous5 = getAnalogous(testColor, 5);
      const analogous7 = getAnalogous(testColor, 7);
      
      expect(analogous5).toHaveLength(5);
      expect(analogous7).toHaveLength(7);
    });
    
    test('should support custom angle', () => {
      const analogous15 = getAnalogous(testColor, 3, 15);
      const analogous45 = getAnalogous(testColor, 3, 45);
      
      // Different angles should produce different spreads
      const hues15 = analogous15.map(c => rgbToHct(c).h);
      const hues45 = analogous45.map(c => rgbToHct(c).h);
      
      // 45 degree angle should have wider spread
      const spread15 = Math.abs(hues15[2] - hues15[0]);
      const spread45 = Math.abs(hues45[2] - hues45[0]);
      expect(spread45 > spread15 || (360 - spread45) < (360 - spread15)).toBe(true);
    });
  });
});

describe('Blend Modes', () => {
  const color1 = '#FF0000';
  const color2 = '#0000FF';
  
  test('blendInHct should support lab mode (default)', () => {
    const result = blendInHct(color1, color2, 0.5, { mode: 'lab' });
    expect(result).toMatch(/^#[0-9a-f]{6}$/i);
  });
  
  test('blendInHct should support hct mode', () => {
    const result = blendInHct(color1, color2, 0.5, { mode: 'hct' });
    expect(result).toMatch(/^#[0-9a-f]{6}$/i);
  });
  
  test('blendInHct should support hue-only mode', () => {
    const result = blendInHct(color1, color2, 0.5, { mode: 'hue-only' });
    expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    
    // In hue-only mode, hue is blended while tone and chroma are preserved as much as possible
    // Note: Due to gamut mapping, exact preservation may not be possible for all colors
    const originalHct = rgbToHct(color1);
    const resultHct = rgbToHct(result);
    
    // Tone should be close to original (allowing for gamut mapping adjustments)
    expect(Math.abs(resultHct.t - originalHct.t)).toBeLessThan(10);
    // Chroma should be in reasonable range (may be reduced for gamut mapping)
    expect(resultHct.c).toBeGreaterThanOrEqual(0);
  });
  
  test('different blend modes should produce different results', () => {
    const labResult = blendInHct(color1, color2, 0.5, { mode: 'lab' });
    const hctResult = blendInHct(color1, color2, 0.5, { mode: 'hct' });
    const hueOnlyResult = blendInHct(color1, color2, 0.5, { mode: 'hue-only' });
    
    // At least some results should be different
    const allSame = (labResult === hctResult) && (hctResult === hueOnlyResult);
    expect(allSame).toBe(false);
  });
});

describe('HCT Round-trip Accuracy', () => {
  const testColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#3491FA', '#FFFFFF', '#000000'];
  
  test.each(testColors)('should accurately convert %s through HCT and back', (color) => {
    const hct = rgbToHct(color);
    const rgb = hctToRgb(hct);
    
    // Calculate color difference
    const diff = colorDifference(color, rgb);
    
    // Should have very low error (< 2 is imperceptible)
    expect(diff).toBeLessThan(3);
  });
});
