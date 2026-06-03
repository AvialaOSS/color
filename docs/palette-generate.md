# 色板生成（palette.generate）

`palette.generate` 用于基于输入色生成一组“同色相/同风格”的色板，并同时支持 Light / Dark 两种模式。

实现上采用 Material 的 HCT（Hue/Chroma/Tone）方案：固定输入色的 hue/chroma，通过调整 tone 生成不同档位；并提供可调曲线与可选的“混入颜色”能力。

## API

```ts
import { palette } from '@aviala-design/color';

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

## 示例

```js
import { palette } from '@aviala-design/color';

const light = palette.generate('#165DFF', { list: true, steps: 12, curveGamma: 1.1 });
const dark = palette.generate('#165DFF', { list: true, dark: true, steps: 12, curveGamma: 1.1 });

const token3 = palette.generate('#165DFF', { index: 3 });

const mixedSeed = palette.generate('#F53F3F', { index: 6, mixColor: '#165DFF', mixRatio: 0.2 });
const mixedList = palette.generate('#F53F3F', { list: true, mixColor: '#165DFF', mixRatio: 0.2 });
```

## 规则说明

- `steps` 决定档位数量，`index` 的默认值为中心档（`centerIndex = floor(steps/2) + 1`）
- `dark=true` 不是简单反转列表，而是围绕中心档在 tone 方向上做相反分布，保证暗色语义
- `curveGamma` 控制 tone 分布曲线：越大，越集中在中心附近；越小，两侧变化更快
- `mixColor/mixRatio` 会先在感知空间（CAM16-UCS）把 seed 混入另一个颜色，再基于混后的 seed 生成色板

