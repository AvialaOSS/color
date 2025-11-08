const { generate } = require('../dist/index.js');

describe('generate function', () => {
  const testColor = '#3491FA';
  
  describe('Single color generation', () => {
    it('should generate single color at default index 6', () => {
      const color = generate(testColor);
      expect(color).toBe('#3491fa');
    });

    it('should generate color at specific index (light mode)', () => {
      const color1 = generate(testColor, { index: 1 });
      const color10 = generate(testColor, { index: 10 });
      
      expect(color1).toMatch(/^#[0-9a-f]{6}$/);
      expect(color10).toMatch(/^#[0-9a-f]{6}$/);
      expect(color1).not.toBe(color10); // 第1色应该比第10色亮
    });

    it('should generate color at specific index (dark mode)', () => {
      const color1 = generate(testColor, { index: 1, dark: true });
      const color10 = generate(testColor, { index: 10, dark: true });
      
      expect(color1).toMatch(/^#[0-9a-f]{6}$/);
      expect(color10).toMatch(/^#[0-9a-f]{6}$/);
      expect(color1).not.toBe(color10); // 暗色模式第1色应该比第10色暗
    });

    it('should handle all indices from 1 to 10', () => {
      for (let i = 1; i <= 10; i++) {
        const color = generate(testColor, { index: i });
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      }
    });
  });

  describe('Color list generation', () => {
    it('should generate 10 colors in light mode', () => {
      const colors = generate(testColor, { list: true });
      
      expect(Array.isArray(colors)).toBe(true);
      expect(colors).toHaveLength(10);
      colors.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it('should generate 10 colors in dark mode', () => {
      const colors = generate(testColor, { list: true, dark: true });
      
      expect(Array.isArray(colors)).toBe(true);
      expect(colors).toHaveLength(10);
      colors.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it('should have different colors in light vs dark mode', () => {
      const lightColors = generate(testColor, { list: true });
      const darkColors = generate(testColor, { list: true, dark: true });
      
      expect(lightColors).not.toEqual(darkColors);
    });

    it('should return 6th color matching the original color', () => {
      const colors = generate(testColor, { list: true });
      expect(colors[5]).toBe('#3491fa'); // index 6 is at position 5
    });
  });

  describe('Output format', () => {
    it('should output hex format by default', () => {
      const color = generate(testColor);
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('should output hex format when specified', () => {
      const color = generate(testColor, { format: 'hex' });
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('should output RGB format', () => {
      const color = generate(testColor, { format: 'rgb' });
      expect(color).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
    });

    it('should output HSL format', () => {
      const color = generate(testColor, { format: 'hsl' });
      expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
    });

    it('should output color list in RGB format', () => {
      const colors = generate(testColor, { list: true, format: 'rgb' });
      expect(colors).toHaveLength(10);
      colors.forEach(color => {
        expect(color).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
      });
    });

    it('should output color list in HSL format', () => {
      const colors = generate(testColor, { list: true, format: 'hsl' });
      expect(colors).toHaveLength(10);
      colors.forEach(color => {
        expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
      });
    });
  });

  describe('Different color inputs', () => {
    it('should handle different hex formats', () => {
      const color1 = generate('#FF0000');
      const color2 = generate('#ff0000');
      const color3 = generate('#F00'); // Short hex
      
      expect(color1).toMatch(/^#[0-9a-f]{6}$/);
      expect(color2).toMatch(/^#[0-9a-f]{6}$/);
      expect(color3).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('should handle RGB input', () => {
      const color = generate('rgb(52, 145, 250)');
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('should handle HSL input', () => {
      const color = generate('hsl(210, 95%, 59%)');
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('should handle color names', () => {
      const color = generate('blue');
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    });
  });

  describe('Different color hues', () => {
    const testColors = {
      red: '#F53F3F',
      orange: '#FF7D00',
      yellow: '#FADC19',
      green: '#00B42A',
      cyan: '#14C9C9',
      blue: '#3491FA',
      purple: '#722ED1',
      magenta: '#F5319D'
    };

    it('should generate valid palettes for all hue ranges', () => {
      Object.values(testColors).forEach(color => {
        const palette = generate(color, { list: true });
        expect(palette).toHaveLength(10);
        expect(palette[5].toLowerCase()).toBe(color.toLowerCase());
      });
    });

    it('should generate valid dark palettes for all hue ranges', () => {
      Object.values(testColors).forEach(color => {
        const palette = generate(color, { list: true, dark: true });
        expect(palette).toHaveLength(10);
        palette.forEach(c => {
          expect(c).toMatch(/^#[0-9a-f]{6}$/);
        });
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle pure white', () => {
      const colors = generate('#FFFFFF', { list: true });
      expect(colors).toHaveLength(10);
      colors.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it('should handle pure black', () => {
      const colors = generate('#000000', { list: true });
      expect(colors).toHaveLength(10);
      colors.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it('should handle gray colors', () => {
      const colors = generate('#808080', { list: true });
      expect(colors).toHaveLength(10);
      colors.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it('should be deterministic - same input produces same output', () => {
      const colors1 = generate(testColor, { list: true });
      const colors2 = generate(testColor, { list: true });
      expect(colors1).toEqual(colors2);
    });
  });

  describe('Options validation', () => {
    it('should work with empty options', () => {
      const color = generate(testColor, {});
      expect(color).toBe('#3491fa');
    });

    it('should work without options parameter', () => {
      const color = generate(testColor);
      expect(color).toBe('#3491fa');
    });

    it('should handle invalid format gracefully', () => {
      const color = generate(testColor, { format: 'invalid' });
      expect(color).toMatch(/^#[0-9a-f]{6}$/); // Should default to hex
    });
  });

  describe('Gradient progression', () => {
    it('should create lighter colors for indices < 6', () => {
      const baseColor = generate(testColor, { index: 6 });
      const lighterColor = generate(testColor, { index: 3 });
      
      // Both should be valid colors
      expect(baseColor).toMatch(/^#[0-9a-f]{6}$/);
      expect(lighterColor).toMatch(/^#[0-9a-f]{6}$/);
      expect(lighterColor).not.toBe(baseColor);
    });

    it('should create darker colors for indices > 6', () => {
      const baseColor = generate(testColor, { index: 6 });
      const darkerColor = generate(testColor, { index: 9 });
      
      expect(baseColor).toMatch(/^#[0-9a-f]{6}$/);
      expect(darkerColor).toMatch(/^#[0-9a-f]{6}$/);
      expect(darkerColor).not.toBe(baseColor);
    });

    it('should have smooth color transitions', () => {
      const colors = generate(testColor, { list: true });
      
      // All colors should be unique
      const uniqueColors = new Set(colors);
      expect(uniqueColors.size).toBe(10);
    });
  });
});
