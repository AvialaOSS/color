# 迁移指南（Breaking Changes）

本次版本更新将对外导出收敛为两个核心域：

- `palette.generate`：色板生成（Light / Dark）
- `neutral.generate`：中性色阶生成（默认灰阶，可选 tinted）

其余 Theme / Image / Presets 等能力已移除；Gradient 能力不再提供通用插值，但你仍可用 `neutral.generate` 生成中性色阶。

## 新 API

```js
import { palette, neutral } from '@aviala-design/color';

const list = palette.generate('#165DFF', { list: true });
const grays = neutral.generate('#ffffff', '#000000', { steps: 12 });
```

## 移除能力清单

- Theme：主题混合/界面色彩系统（theme-blend 全部导出）
- Image：图片取色（extractColorFromImage / extractColorFromFile）
- Gradient：渐变/插值（generateLinear / generateLinearHSL / generateMonochromeLinear）
- Presets：预设色（colorList / getPresetColors）
- Utils：工具函数（getRgbStr 等）

## 迁移表（旧 API → 新 API/替代方案）

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
