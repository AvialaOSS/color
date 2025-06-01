const { generateLinear, generateGrayLinear, generateMonochromeLinear, generateLinearHSL } = require('../dist/index.js');

describe('Linear Color Generation', () => {
  describe('generateLinear', () => {
    it('should generate linear interpolation between two colors', () => {
      const colors = generateLinear('#ff0000', '#0000ff', { steps: 5 });
      expect(colors).toHaveLength(5);
      expect(colors[0]).toBe('#ff0000'); // 起始颜色
      expect(colors[4]).toBe('#0000ff'); // 结束颜色
    });

    it('should generate colors without endpoints', () => {
      const colors = generateLinear('#ff0000', '#0000ff', { 
        steps: 3, 
        includeEnds: false 
      });
      expect(colors).toHaveLength(3);
      expect(colors[0]).not.toBe('#ff0000');
      expect(colors[2]).not.toBe('#0000ff');
    });

    it('should generate RGB format colors', () => {
      const colors = generateLinear('#ff0000', '#0000ff', { 
        steps: 3, 
        format: 'rgb' 
      });
      expect(colors[0]).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
    });

    it('should generate HSL format colors', () => {
      const colors = generateLinear('#ff0000', '#0000ff', { 
        steps: 3, 
        format: 'hsl' 
      });
      expect(colors[0]).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
    });

    it('should throw error for invalid steps', () => {
      expect(() => {
        generateLinear('#ff0000', '#0000ff', { steps: 1 });
      }).toThrow('步数必须至少为2');
    });
  });

  describe('generateGrayLinear', () => {
    it('should generate default gray scale', () => {
      const grays = generateGrayLinear();
      expect(grays).toHaveLength(10);
      expect(grays[0]).toBe('#ffffff'); // 白色
      expect(grays[9]).toBe('#000000'); // 黑色
    });

    it('should generate custom gray range', () => {
      const grays = generateGrayLinear({
        startGray: '#f0f0f0',
        endGray: '#333333',
        steps: 5
      });
      expect(grays).toHaveLength(5);
      expect(grays[0]).toBe('#f0f0f0');
      expect(grays[4]).toBe('#333333');
    });

    it('should generate RGB format grays', () => {
      const grays = generateGrayLinear({ format: 'rgb', steps: 3 });
      expect(grays[0]).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
    });
  });

  describe('generateMonochromeLinear', () => {
    it('should generate monochrome colors from base color', () => {
      const colors = generateMonochromeLinear('#3491FA');
      expect(colors).toHaveLength(10);
      // 第一个应该是最亮的，最后一个应该是最暗的
      expect(colors[0]).not.toBe(colors[9]);
    });

    it('should generate custom steps monochrome', () => {
      const colors = generateMonochromeLinear('#00B42A', { steps: 6 });
      expect(colors).toHaveLength(6);
    });

    it('should generate RGB format monochrome', () => {
      const colors = generateMonochromeLinear('#F53F3F', { 
        format: 'rgb', 
        steps: 3 
      });
      expect(colors[0]).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
    });

    it('should respect lightness range', () => {
      const colors = generateMonochromeLinear('#3491FA', {
        steps: 5,
        lightnessRange: 40
      });
      expect(colors).toHaveLength(5);
    });
  });

  describe('generateLinearHSL', () => {
    it('should generate HSL space interpolation', () => {
      const colors = generateLinearHSL('#ff0000', '#00ff00', { steps: 5 });
      expect(colors).toHaveLength(5);
      expect(colors[0]).toBe('#ff0000');
      expect(colors[4]).toBe('#00ff00');
    });

    it('should handle hue wrapping correctly', () => {
      // 测试色相环的最短路径
      const colors = generateLinearHSL('#ff0000', '#ff00ff', { steps: 3 });
      expect(colors).toHaveLength(3);
    });

    it('should generate without endpoints', () => {
      const colors = generateLinearHSL('#ffff00', '#ff00ff', {
        steps: 3,
        includeEnds: false
      });
      expect(colors).toHaveLength(3);
      expect(colors[0]).not.toBe('#ffff00');
      expect(colors[2]).not.toBe('#ff00ff');
    });

    it('should generate RGB format from HSL interpolation', () => {
      const colors = generateLinearHSL('#ff0000', '#00ff00', {
        steps: 3,
        format: 'rgb'
      });
      expect(colors[0]).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
    });

    it('should throw error for invalid steps', () => {
      expect(() => {
        generateLinearHSL('#ff0000', '#00ff00', { steps: 1 });
      }).toThrow('步数必须至少为2');
    });
  });

  describe('Integration tests', () => {
    it('should work with different color input formats', () => {
      // 测试不同的输入格式
      const hexColors = generateLinear('#ff0000', '#0000ff', { steps: 3 });
      const rgbColors = generateLinear('rgb(255,0,0)', 'rgb(0,0,255)', { steps: 3 });
      const hslColors = generateLinear('hsl(0,100%,50%)', 'hsl(240,100%,50%)', { steps: 3 });
      
      expect(hexColors).toHaveLength(3);
      expect(rgbColors).toHaveLength(3);
      expect(hslColors).toHaveLength(3);
    });

    it('should generate consistent results', () => {
      // 测试结果的一致性
      const colors1 = generateLinear('#ff0000', '#0000ff', { steps: 5 });
      const colors2 = generateLinear('#ff0000', '#0000ff', { steps: 5 });
      
      expect(colors1).toEqual(colors2);
    });

    it('should handle edge cases', () => {
      // 相同颜色
      const sameColors = generateLinear('#ff0000', '#ff0000', { steps: 3 });
      expect(sameColors).toEqual(['#ff0000', '#ff0000', '#ff0000']);
      
      // 最小步数
      const minColors = generateLinear('#ff0000', '#0000ff', { steps: 2 });
      expect(minColors).toHaveLength(2);
    });
  });
});