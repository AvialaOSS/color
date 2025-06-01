const { generate, getRgbStr, getPresetColors } = require('../dist/index.js');

const presetColors = getPresetColors();

it('generate single color', () => {
  expect(generate('#f53f3f', { index: 1 })).toBe('#fde7e4');
  expect(generate('#f53f3f', { index: 1, dark: true })).toBe('#4d0008');
  expect(generate('#f53f3f', { index: 10 })).toBe('#4d020a');
  expect(generate('#f53f3f', { index: 10, dark: true })).toBe('#fdedeb');
});

it('get Rgb String', () => {
  expect(getRgbStr('#f53f3f')).toBe('245,63,63');
});

it('red', () => {
  expect(generate('#f53f3f', { list: true })).toEqual(presetColors.red.light);
  expect(generate('#f53f3f', { list: true, dark: true })).toEqual(presetColors.red.dark);
  expect(generate('#f53f3f', { list: true })).toEqual([
    '#fde7e4', '#fcc7c1',
    '#faa69e', '#f9837d',
    '#f7625d', '#f53f3f',
    '#cd282b', '#a2161d',
    '#760a11', '#4d020a'
  ]);

  expect(generate('#f53f3f', { list: true, dark: true })).toEqual([
    '#4d0008', '#76060d',
    '#a2161d', '#cd2f31',
    '#f54e4e', '#f76965',
    '#f98b86', '#faaea7',
    '#fccec9', '#fdedeb'
  ]);
});

it('orangered', () => {
  expect(generate('#f77234', { list: true })).toEqual(presetColors.orangered.light);
  expect(generate('#f77234', { list: true, dark: true })).toEqual(presetColors.orangered.dark);
  expect(generate('#f77234', { list: true })).toEqual([
    '#fef0e4', '#fcd8bf',
    '#fbc19a', '#faa776',
    '#f98e54', '#f77234',
    '#ce5521', '#a33913',
    '#762408', '#4d1202'
  ]);

  expect(generate('#f77234', { list: true, dark: true })).toEqual([
    '#4d1000', '#762205',
    '#a33914', '#ce5b29',
    '#f77e45', '#f9925a',
    '#faab7d', '#fbc5a1',
    '#fcdbc5', '#fef3ea'
  ]);
});

it('orange', () => {
  expect(generate('#ff7d00', { list: true })).toEqual(presetColors.orange.light);
  expect(generate('#ff7d00', { list: true, dark: true })).toEqual(presetColors.orange.dark);
  expect(generate('#ff7d00', { list: true })).toEqual([
    '#fff5e5', '#ffe0b5',
    '#ffca86', '#ffb157',
    '#ff982a', '#ff7d00',
    '#d56300', '#a74800',
    '#783200', '#4d1d00'
  ]);

  expect(generate('#ff7d00', { list: true, dark: true })).toEqual([
    '#4d1d00', '#783404',
    '#a74e0a', '#d56d13',
    '#ff8d1f', '#ff9626',
    '#ffb157', '#ffcb87',
    '#ffe1b8', '#fff6e8'
  ]);
});

it('gold', () => {
  expect(generate('#f7ba1e', { list: true })).toEqual(presetColors.gold.light);
  expect(generate('#f7ba1e', { list: true, dark: true })).toEqual(presetColors.gold.dark);
  expect(generate('#f7ba1e', { list: true })).toEqual([
    '#fefae4', '#fcf0ba',
    '#fbe691', '#fad869',
    '#f9cb42', '#f7ba1e',
    '#ce9613', '#a3700b',
    '#764f05', '#4d3001'
  ]);

  expect(generate('#f7ba1e', { list: true, dark: true })).toEqual([
    '#4d3000', '#764f04',
    '#a3710f', '#ce9a1f',
    '#f7c034', '#f9cb44',
    '#fad96c', '#fbe794',
    '#fcf1bd', '#fefbe8'
  ]);
});

it('yellow', () => {
  expect(generate('#fadc19', { list: true })).toEqual(presetColors.yellow.light);
  expect(generate('#fadc19', { list: true, dark: true })).toEqual(presetColors.yellow.dark);
  expect(generate('#fadc19', { list: true })).toEqual([
    '#fefee4', '#fdfbb9',
    '#fdf78f', '#fcef66',
    '#fbe83e', '#fadc19',
    '#d1b410', '#a48809',
    '#776004', '#4d3b01'
  ]);

  expect(generate('#fadc19', { list: true, dark: true })).toEqual([
    '#4d3b00', '#776107',
    '#a48a14', '#d1b726',
    '#fae13c', '#fbe94b',
    '#fcf074', '#fdf89d',
    '#fdfbc5', '#fefeef'
  ]);
});

it('lime', () => {
  expect(generate('#9fdb1d', { list: true })).toEqual(presetColors.lime.light);
  expect(generate('#9fdb1d', { list: true, dark: true })).toEqual(presetColors.lime.dark);
  expect(generate('#9fdb1d', { list: true })).toEqual([
    '#f6f8df', '#eaf3b4',
    '#dbee8a', '#c9e863',
    '#b6e23e', '#9fdb1d',
    '#7fb913', '#5e950b',
    '#416f05', '#284d01'
  ]);

  expect(generate('#9fdb1d', { list: true, dark: true })).toEqual([
    '#284d00', '#416f06',
    '#619512', '#85b924',
    '#a8db39', '#bae24b',
    '#cce870', '#ddee97',
    '#ebf3be', '#f7f8e7'
  ]);
});

it('green', () => {
  expect(generate('#00b42a', { list: true })).toEqual(presetColors.green.light);
  expect(generate('#00b42a', { list: true, dark: true })).toEqual(presetColors.green.dark);
  expect(generate('#00b42a', { list: true })).toEqual([
    '#d8f1d9', '#a3e6a8',
    '#73db7f', '#47cf5b',
    '#20c241', '#00b42a',
    '#009b2c', '#008129',
    '#006625', '#004d1f'
  ]);

  expect(generate('#00b42a', { list: true, dark: true })).toEqual([
    '#004d1f', '#046628',
    '#0a8130', '#139b39',
    '#1db440', '#27c246',
    '#4fcf62', '#7bdb86',
    '#aae6af', '#def1de'
  ]);
});

it('cyan', () => {
  expect(generate('#14c9c9', { list: true })).toEqual(presetColors.cyan.light);
  expect(generate('#14c9c9', { list: true, dark: true })).toEqual(presetColors.cyan.dark);
  expect(generate('#14c9c9', { list: true })).toEqual([
    '#dcf5f0', '#adede3',
    '#82e5d9', '#59dcd1',
    '#34d3ce', '#14c9c9',
    '#0da3ab', '#08818c',
    '#035d6b', '#01404d'
  ]);

  expect(generate('#14c9c9', { list: true, dark: true })).toEqual([
    '#00404d', '#065d6b',
    '#11828c', '#1fa4ab',
    '#30c9c9', '#3fd3ce',
    '#65dcd2', '#8ee5da',
    '#b9ede5', '#e6f5f2'
  ]);
});

it('blue', () => {
  expect(generate('#3491fa', { list: true })).toEqual(presetColors.blue.light);
  expect(generate('#3491fa', { list: true, dark: true })).toEqual(presetColors.blue.dark);
  expect(generate('#3491fa', { list: true })).toEqual([
    '#e5f6fe', '#bfe7fd',
    '#9bd5fd', '#77c0fc',
    '#54aafb', '#3491fa',
    '#216dd1', '#124aa4',
    '#082f77', '#02184d'
  ]);

  expect(generate('#3491fa', { list: true, dark: true })).toEqual([
    '#00174d', '#052d77',
    '#134ba4', '#2972d1',
    '#469afa', '#5aadfb',
    '#7dc3fc', '#a1d8fd',
    '#c5e9fd', '#e9f7fe'
  ]);
});

it('arcoblue', () => {
  expect(generate('#165dff', { list: true })).toEqual(presetColors.arcoblue.light);
  expect(generate('#165dff', { list: true, dark: true })).toEqual(presetColors.arcoblue.dark);
  expect(generate('#165dff', { list: true })).toEqual([
    '#e5f2ff', '#badaff',
    '#8fc0ff', '#65a0ff',
    '#3c80ff', '#165dff',
    '#0e43d5', '#082aa7',
    '#031978', '#010b4d'
  ]);

  expect(generate('#165dff', { list: true, dark: true })).toEqual([
    '#000a4d', '#041a78',
    '#0e2fa7', '#1d4ed5',
    '#306fff', '#3c80ff',
    '#68a2ff', '#93c2ff',
    '#bedcff', '#eaf4ff'
  ]);
});

it('purple', () => {
  expect(generate('#722ed1', { list: true })).toEqual(presetColors.purple.light);
  expect(generate('#722ed1', { list: true, dark: true })).toEqual(presetColors.purple.dark);
  expect(generate('#722ed1', { list: true })).toEqual([
    '#ecdef7', '#d6b6f0',
    '#be90e9', '#a56ce2',
    '#8b4bda', '#722ed1',
    '#561eb1', '#3d1190',
    '#28086d', '#17024d'
  ]);

  expect(generate('#722ed1', { list: true, dark: true })).toEqual([
    '#16004d', '#26056d',
    '#3e1390', '#5a25b1',
    '#7b3dd1', '#8e51da',
    '#a973e2', '#c297e9',
    '#d9bef0', '#efe6f7'
  ]);
});

it('pinkpurple', () => {
  expect(generate('#d91ad9', { list: true })).toEqual(presetColors.pinkpurple.light);
  expect(generate('#d91ad9', { list: true, dark: true })).toEqual(presetColors.pinkpurple.dark);
  expect(generate('#d91ad9', { list: true })).toEqual([
    '#f8dff4', '#f2b2ea',
    '#ed88e3', '#e760de',
    '#e03bdb', '#d91ad9',
    '#b211b8', '#8b0a94',
    '#64046f', '#42014d'
  ]);

  expect(generate('#d91ad9', { list: true, dark: true })).toEqual([
    '#42004d', '#64036f',
    '#8b0d94', '#b21cb8',
    '#d92ed9', '#e03cdb',
    '#e766de', '#ed91e4',
    '#f2bdeb', '#f8ecf6'
  ]);
});

it('magenta', () => {
  expect(generate('#f5319d', { list: true })).toEqual(presetColors.magenta.light);
  expect(generate('#f5319d', { list: true, dark: true })).toEqual(presetColors.magenta.dark);
  expect(generate('#f5319d', { list: true })).toEqual([
    '#fde4ef', '#fcbeda',
    '#fa98c8', '#f974b6',
    '#f751aa', '#f5319d',
    '#cd1f85', '#a21168',
    '#76084d', '#4d0232'
  ]);

  expect(generate('#f5319d', { list: true, dark: true })).toEqual([
    '#4d0031', '#76084d',
    '#a2176a', '#cd2b8a',
    '#f545a6', '#f756ad',
    '#f97ab9', '#fa9ecb',
    '#fcc2dc', '#fde6f0'
  ]);
});
