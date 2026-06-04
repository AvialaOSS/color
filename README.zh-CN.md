# Aviala Design Color

Aviala Design Color 是一个“色板生成器”，用于构建设计系统的颜色体系：

- `palette.generate`：基于输入色生成色板（同时支持 Light / Dark）
- `neutral.generate`：生成中性色阶（默认灰阶；可选 tinted，Dark 可通过反向生成）

## 安装

```bash
npm i @aviala-design/color
```

## 使用方式

```js
import { palette, neutral } from '@aviala-design/color';

const paletteLight = palette.generate('#165DFF', { list: true });
const paletteDark = palette.generate('#165DFF', { list: true, dark: true });

const graysLight = neutral.generate('#ffffff', '#000000', { steps: 12, curveGamma: 1.2 });
const graysDark = neutral.generate('#000000', '#ffffff', { steps: 12, curveGamma: 1.2 });
const tintedNeutral = neutral.generate('#ffffff', '#000000', { steps: 12, curveGamma: 1.2, mixColor: '#165DFF', mixRatio: 0.2 });

const mixed = palette.generate('#F53F3F', { index: 6, mixColor: '#165DFF', mixRatio: 0.2 });
```

## API

### palette.generate(color, options?)

```ts
palette.generate(
  color: string,
  options?: {
    steps?: number; // 1..24，默认 10
    index?: number; // 1..steps，默认中心档（例如 steps=10 时是 6）
    dark?: boolean;
    list?: boolean;
    format?: 'hex' | 'rgb' | 'hsl'; // 默认 'hex'
    curveGamma?: number; // 0.1..5，默认 1
    mixColor?: string; // hex
    mixRatio?: number; // 0..1，默认 0
  }
): string | string[]
```

### neutral.generate(startGray, endGray, options?)

```ts
neutral.generate(
  startGray: string,
  endGray: string,
  options?: {
    steps?: number; // 1..24，默认 10
    includeEnds?: boolean; // 默认 true
    format?: 'hex' | 'rgb' | 'hsl'; // 默认 'hex'
    curveGamma?: number; // 0.1..5，默认 1
    mixColor?: string; // hex
    mixRatio?: number; // 0..1，默认 0
  }
): string[]
```

## 破坏性变更（能力移除）

本包不再导出以下能力：

- Theme（主题混合/界面色彩系统）
- Image（图片取色）
- Gradient（线性/渐变生成；灰阶色阶可使用 `neutral.generate`）
- Presets（colorList / getPresetColors）
- Utils（getRgbStr 等）

## 迁移指南

| 旧 API | 新 API / 替代方案 |
| --- | --- |
| `generate(color, options)` | `palette.generate(color, options)` |
| `colorList` | 已移除。建议在你的业务/设计系统里维护自有色值常量。 |
| `getPresetColors()` | 已移除。对你的色值列表逐个调用 `palette.generate(color, { list: true })` 生成即可。 |
| `getRgbStr(color)` | 已移除。可直接使用 `color`（本库依赖）：`import Color from 'color'; Color(color).rgb().array().join(',')`。 |
| `generateGrayLinear` | `neutral.generate('#ffffff', '#000000', options)` |
| `generateLinear*` / `generateMonochromeLinear` | 已移除。建议使用专门的渐变库（如 `d3-interpolate`、`chroma-js`）或在项目中自行实现插值。 |
| `extractColorFromImage` / `extractColorFromFile` | 已移除。建议使用图片取色库（如 `color-thief`）或自行基于 canvas 实现。 |
| `theme-blend` 相关导出（HCT/主题色板/界面色彩系统） | 已移除。建议使用专门方案（如 Material color utilities）或拆分到独立包维护。 |
