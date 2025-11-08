const { generate } = require('../dist/index.js');

describe('Palette generation algorithms', () => {
  describe('Light mode palette (palette.js)', () => {
    it('should generate exactly 10 colors', () => {
      const palette = generate('#3491FA', { list: true });
      expect(palette).toHaveLength(10);
    });

    it('should have the original color at index 6', () => {
      const testColor = '#3491FA';
      const palette = generate(testColor, { list: true });
      expect(palette[5].toLowerCase()).toBe(testColor.toLowerCase());
    });

    it('should create a gradient from light to dark', () => {
      const palette = generate('#3491FA', { list: true, format: 'rgb' });
      
      // Helper function to calculate brightness
      const getBrightness = (rgbStr) => {
        const match = rgbStr.match(/rgb\((\d+), (\d+), (\d+)\)/);
        if (!match) return 0;
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        return (r * 299 + g * 587 + b * 114) / 1000;
      };

      // First color should be brighter than last color
      const firstBrightness = getBrightness(palette[0]);
      const lastBrightness = getBrightness(palette[9]);
      
      expect(firstBrightness).toBeGreaterThan(lastBrightness);
    });

    it('should work with different hue ranges', () => {
      const colors = {
        red: '#F53F3F',      // 0-60
        orange: '#FF7D00',   // 0-60
        yellow: '#FADC19',   // 60-120
        green: '#00B42A',    // 120-180
        cyan: '#14C9C9',     // 180-240
        blue: '#3491FA',     // 240-300
        purple: '#722ED1',   // 300-360
        magenta: '#F5319D'   // 300-360
      };

      Object.entries(colors).forEach(([name, color]) => {
        const palette = generate(color, { list: true });
        expect(palette).toHaveLength(10);
        expect(palette[5].toLowerCase()).toBe(color.toLowerCase());
      });
    });

    it('should handle low saturation colors', () => {
      const grayPalette = generate('#808080', { list: true });
      expect(grayPalette).toHaveLength(10);
      grayPalette.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it('should handle high saturation colors', () => {
      const vivid = generate('#FF0000', { list: true });
      expect(vivid).toHaveLength(10);
      expect(vivid[5].toLowerCase()).toBe('#ff0000');
    });

    it('should handle very light colors', () => {
      const lightPalette = generate('#F0F0F0', { list: true });
      expect(lightPalette).toHaveLength(10);
      lightPalette.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it('should handle very dark colors', () => {
      const darkPalette = generate('#1A1A1A', { list: true });
      expect(darkPalette).toHaveLength(10);
      darkPalette.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it('should generate smooth transitions', () => {
      const palette = generate('#3491FA', { list: true });
      
      // All colors should be unique
      const uniqueColors = new Set(palette);
      expect(uniqueColors.size).toBe(10);
    });

    it('should be deterministic', () => {
      const palette1 = generate('#3491FA', { list: true });
      const palette2 = generate('#3491FA', { list: true });
      expect(palette1).toEqual(palette2);
    });
  });

  describe('Dark mode palette (palette-dark.js)', () => {
    it('should generate exactly 10 colors in dark mode', () => {
      const palette = generate('#3491FA', { list: true, dark: true });
      expect(palette).toHaveLength(10);
    });

    it('should create inverse gradient (dark to light)', () => {
      const palette = generate('#3491FA', { list: true, dark: true, format: 'rgb' });
      
      const getBrightness = (rgbStr) => {
        const match = rgbStr.match(/rgb\((\d+), (\d+), (\d+)\)/);
        if (!match) return 0;
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        return (r * 299 + g * 587 + b * 114) / 1000;
      };

      // In dark mode, first color should be darker than last color
      const firstBrightness = getBrightness(palette[0]);
      const lastBrightness = getBrightness(palette[9]);
      
      expect(firstBrightness).toBeLessThan(lastBrightness);
    });

    it('should differ from light mode palette', () => {
      const lightPalette = generate('#3491FA', { list: true });
      const darkPalette = generate('#3491FA', { list: true, dark: true });
      
      expect(lightPalette).not.toEqual(darkPalette);
      expect(lightPalette[0]).not.toBe(darkPalette[0]);
      expect(lightPalette[9]).not.toBe(darkPalette[9]);
    });

    it('should work with different hue ranges in dark mode', () => {
      const colors = {
        red: '#F53F3F',
        green: '#00B42A',
        blue: '#3491FA',
        purple: '#722ED1'
      };

      Object.entries(colors).forEach(([name, color]) => {
        const palette = generate(color, { list: true, dark: true });
        expect(palette).toHaveLength(10);
        palette.forEach(c => {
          expect(c).toMatch(/^#[0-9a-f]{6}$/);
        });
      });
    });

    it('should handle edge cases in dark mode', () => {
      // Very saturated color
      const saturated = generate('#FF0000', { list: true, dark: true });
      expect(saturated).toHaveLength(10);

      // Low saturation color
      const gray = generate('#808080', { list: true, dark: true });
      expect(gray).toHaveLength(10);
    });

    it('should be deterministic in dark mode', () => {
      const palette1 = generate('#3491FA', { list: true, dark: true });
      const palette2 = generate('#3491FA', { list: true, dark: true });
      expect(palette1).toEqual(palette2);
    });

    it('should generate different palettes for different hue adjustments', () => {
      // Test colors with different hue ranges
      const redPalette = generate('#F53F3F', { list: true, dark: true }); // 0-50
      const yellowPalette = generate('#FADC19', { list: true, dark: true }); // 50-191
      const bluePalette = generate('#3491FA', { list: true, dark: true }); // 191-360

      expect(redPalette).toHaveLength(10);
      expect(yellowPalette).toHaveLength(10);
      expect(bluePalette).toHaveLength(10);
      
      // They should all be different
      expect(redPalette).not.toEqual(yellowPalette);
      expect(yellowPalette).not.toEqual(bluePalette);
      expect(redPalette).not.toEqual(bluePalette);
    });
  });

  describe('Palette algorithm consistency', () => {
    it('should match known preset color palettes', () => {
      const presetTests = [
        { color: '#F53F3F', name: 'red' },
        { color: '#FF7D00', name: 'orange' },
        { color: '#00B42A', name: 'green' },
        { color: '#3491FA', name: 'blue' }
      ];

      presetTests.forEach(({ color, name }) => {
        const lightPalette = generate(color, { list: true });
        const darkPalette = generate(color, { list: true, dark: true });
        
        // Should generate valid palettes
        expect(lightPalette).toHaveLength(10);
        expect(darkPalette).toHaveLength(10);
        
        // Light mode index 6 should match original color
        expect(lightPalette[5].toLowerCase()).toBe(color.toLowerCase());
      });
    });

    it('should handle saturation adjustments correctly', () => {
      // Test with different saturation levels
      const highSat = generate('hsl(210, 95%, 59%)', { list: true });
      const medSat = generate('hsl(210, 50%, 59%)', { list: true });
      const lowSat = generate('hsl(210, 10%, 59%)', { list: true });

      expect(highSat).toHaveLength(10);
      expect(medSat).toHaveLength(10);
      expect(lowSat).toHaveLength(10);
      
      // All should be different
      expect(highSat).not.toEqual(medSat);
      expect(medSat).not.toEqual(lowSat);
    });

    it('should handle value/lightness adjustments correctly', () => {
      const bright = generate('hsl(210, 95%, 80%)', { list: true });
      const medium = generate('hsl(210, 95%, 50%)', { list: true });
      const dark = generate('hsl(210, 95%, 20%)', { list: true });

      expect(bright).toHaveLength(10);
      expect(medium).toHaveLength(10);
      expect(dark).toHaveLength(10);
      
      // All should be different
      expect(bright).not.toEqual(medium);
      expect(medium).not.toEqual(dark);
    });

    it('should respect color format in output', () => {
      const hexPalette = generate('#3491FA', { list: true, format: 'hex' });
      const rgbPalette = generate('#3491FA', { list: true, format: 'rgb' });
      const hslPalette = generate('#3491FA', { list: true, format: 'hsl' });

      hexPalette.forEach(c => expect(c).toMatch(/^#[0-9a-f]{6}$/));
      rgbPalette.forEach(c => expect(c).toMatch(/^rgb\(\d+, \d+, \d+\)$/));
      hslPalette.forEach(c => expect(c).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/));
    });
  });

  describe('Edge case handling', () => {
    it('should handle pure colors', () => {
      const pureRed = generate('#FF0000', { list: true });
      const pureGreen = generate('#00FF00', { list: true });
      const pureBlue = generate('#0000FF', { list: true });

      expect(pureRed[5]).toBe('#ff0000');
      expect(pureGreen[5]).toBe('#00ff00');
      expect(pureBlue[5]).toBe('#0000ff');
    });

    it('should handle monochrome colors', () => {
      const white = generate('#FFFFFF', { list: true });
      const black = generate('#000000', { list: true });
      
      expect(white).toHaveLength(10);
      expect(black).toHaveLength(10);
      
      white.forEach(c => expect(c).toMatch(/^#[0-9a-f]{6}$/));
      black.forEach(c => expect(c).toMatch(/^#[0-9a-f]{6}$/));
    });

    it('should not produce invalid hex values', () => {
      const testColors = [
        '#FF0000', '#00FF00', '#0000FF',
        '#FFFF00', '#FF00FF', '#00FFFF',
        '#123456', '#ABCDEF', '#FEDCBA'
      ];

      testColors.forEach(color => {
        const palette = generate(color, { list: true });
        palette.forEach(c => {
          expect(c).toMatch(/^#[0-9a-f]{6}$/);
        });
      });
    });
  });
});
