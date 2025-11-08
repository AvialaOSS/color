import { generateInterfaceColorSystem } from './src/index.js';

console.log('测试 baseGray 参数\n');

// 测试 1: 默认 baseGray
const system1 = generateInterfaceColorSystem('#3491FA', {
  isDark: false,
  controlBlendRatio: 0.08
});
console.log('1. 默认 baseGray (#666666):');
console.log('gray-1:', system1.controls['gray-1']);
console.log('gray-6:', system1.controls['gray-6']);
console.log('gray-12:', system1.controls['gray-12']);
console.log('');

// 测试 2: 自定义 baseGray - 中性灰
const system2 = generateInterfaceColorSystem('#3491FA', {
  isDark: false,
  controlBlendRatio: 0.08,
  baseGray: '#989898'
});
console.log('2. 中性灰 baseGray (#989898):');
console.log('gray-1:', system2.controls['gray-1']);
console.log('gray-6:', system2.controls['gray-6']);
console.log('gray-12:', system2.controls['gray-12']);
console.log('');

// 测试 3: 自定义 baseGray - 偏冷灰
const system3 = generateInterfaceColorSystem('#3491FA', {
  isDark: false,
  controlBlendRatio: 0.08,
  baseGray: '#7A8B99'
});
console.log('3. 偏冷灰 baseGray (#7A8B99):');
console.log('gray-1:', system3.controls['gray-1']);
console.log('gray-6:', system3.controls['gray-6']);
console.log('gray-12:', system3.controls['gray-12']);
console.log('');

// 测试 4: 偏暖灰
const system4 = generateInterfaceColorSystem('#3491FA', {
  isDark: false,
  controlBlendRatio: 0.08,
  baseGray: '#998877'
});
console.log('4. 偏暖灰 baseGray (#998877):');
console.log('gray-1:', system4.controls['gray-1']);
console.log('gray-6:', system4.controls['gray-6']);
console.log('gray-12:', system4.controls['gray-12']);
console.log('');

// 比较差异
console.log('\n=== 差异分析 ===');
console.log('gray-6 的不同 baseGray 效果:');
console.log('#666666:', system1.controls['gray-6']);
console.log('#989898:', system2.controls['gray-6']);
console.log('#7A8B99:', system3.controls['gray-6']);
console.log('#998877:', system4.controls['gray-6']);
