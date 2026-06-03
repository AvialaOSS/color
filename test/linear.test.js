const lib = require('../dist/index.js');

describe('Gradient exports removed', () => {
  it('should not export gradient helpers', () => {
    expect(lib.generateLinear).toBeUndefined();
    expect(lib.generateGrayLinear).toBeUndefined();
    expect(lib.generateMonochromeLinear).toBeUndefined();
    expect(lib.generateLinearHSL).toBeUndefined();
  });
});
