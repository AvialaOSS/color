const { getRgbStr } = require('../dist/index.js');

describe('utils functions', () => {
  describe('getRgbStr', () => {
    it('should convert hex color to RGB string', () => {
      expect(getRgbStr('#FF0000')).toBe('255,0,0');
      expect(getRgbStr('#00FF00')).toBe('0,255,0');
      expect(getRgbStr('#0000FF')).toBe('0,0,255');
    });

    it('should handle lowercase hex colors', () => {
      expect(getRgbStr('#ff0000')).toBe('255,0,0');
      expect(getRgbStr('#00ff00')).toBe('0,255,0');
      expect(getRgbStr('#0000ff')).toBe('0,0,255');
    });

    it('should handle short hex format', () => {
      expect(getRgbStr('#F00')).toBe('255,0,0');
      expect(getRgbStr('#0F0')).toBe('0,255,0');
      expect(getRgbStr('#00F')).toBe('0,0,255');
    });

    it('should handle RGB input', () => {
      expect(getRgbStr('rgb(255, 0, 0)')).toBe('255,0,0');
      expect(getRgbStr('rgb(128, 128, 128)')).toBe('128,128,128');
    });

    it('should handle HSL input', () => {
      const rgbStr = getRgbStr('hsl(0, 100%, 50%)');
      expect(rgbStr).toBe('255,0,0'); // Red in HSL
    });

    it('should handle color names', () => {
      expect(getRgbStr('red')).toBe('255,0,0');
      expect(getRgbStr('blue')).toBe('0,0,255');
      expect(getRgbStr('green')).toBe('0,128,0');
      expect(getRgbStr('white')).toBe('255,255,255');
      expect(getRgbStr('black')).toBe('0,0,0');
    });

    it('should handle grayscale colors', () => {
      expect(getRgbStr('#808080')).toBe('128,128,128');
      expect(getRgbStr('#FFFFFF')).toBe('255,255,255');
      expect(getRgbStr('#000000')).toBe('0,0,0');
    });

    it('should round RGB values', () => {
      // Test with a color that might produce decimal values
      const rgbStr = getRgbStr('#3491FA');
      const parts = rgbStr.split(',');
      parts.forEach(part => {
        const value = parseInt(part);
        expect(Number.isInteger(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(255);
      });
    });

    it('should return comma-separated format without spaces', () => {
      const rgbStr = getRgbStr('#FF5733');
      expect(rgbStr).toMatch(/^\d+,\d+,\d+$/);
      expect(rgbStr).not.toContain(' ');
    });

    it('should handle preset colors', () => {
      const presetColors = {
        red: '#F53F3F',
        blue: '#3491FA',
        green: '#00B42A',
        purple: '#722ED1'
      };

      Object.values(presetColors).forEach(color => {
        const rgbStr = getRgbStr(color);
        expect(rgbStr).toMatch(/^\d+,\d+,\d+$/);
        
        const parts = rgbStr.split(',').map(Number);
        expect(parts).toHaveLength(3);
        parts.forEach(value => {
          expect(value).toBeGreaterThanOrEqual(0);
          expect(value).toBeLessThanOrEqual(255);
        });
      });
    });

    it('should be deterministic', () => {
      const color = '#3491FA';
      const result1 = getRgbStr(color);
      const result2 = getRgbStr(color);
      expect(result1).toBe(result2);
    });

    it('should handle edge cases', () => {
      // Near-white
      const nearWhite = getRgbStr('#FEFEFE');
      expect(nearWhite).toBe('254,254,254');

      // Near-black
      const nearBlack = getRgbStr('#010101');
      expect(nearBlack).toBe('1,1,1');

      // Mid-gray
      const midGray = getRgbStr('#7F7F7F');
      expect(midGray).toMatch(/^\d+,\d+,\d+$/);
    });

    it('should convert the same color consistently regardless of input format', () => {
      const hexRgb = getRgbStr('#FF0000');
      const rgbRgb = getRgbStr('rgb(255, 0, 0)');
      const hslRgb = getRgbStr('hsl(0, 100%, 50%)');
      const nameRgb = getRgbStr('red');

      expect(hexRgb).toBe('255,0,0');
      expect(rgbRgb).toBe('255,0,0');
      expect(hslRgb).toBe('255,0,0');
      expect(nameRgb).toBe('255,0,0');
    });

    it('should handle complex colors', () => {
      const complexColors = [
        '#3491FA', // Blue
        '#F77234', // Orange red
        '#9FDB1D', // Lime
        '#D91AD9', // Pink purple
        '#14C9C9'  // Cyan
      ];

      complexColors.forEach(color => {
        const rgbStr = getRgbStr(color);
        expect(rgbStr).toMatch(/^\d+,\d+,\d+$/);
        
        const [r, g, b] = rgbStr.split(',').map(Number);
        expect(r).toBeGreaterThanOrEqual(0);
        expect(r).toBeLessThanOrEqual(255);
        expect(g).toBeGreaterThanOrEqual(0);
        expect(g).toBeLessThanOrEqual(255);
        expect(b).toBeGreaterThanOrEqual(0);
        expect(b).toBeLessThanOrEqual(255);
      });
    });
  });
});
