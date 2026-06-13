# 色板生成（palette.generate）

`palette.generate` 用于基于输入色生成一组更适合 UI 的 tonal palette，并同时支持 Light / Dark 两种模式。

实现上采用 Material 的 HCT（Hue/Chroma/Tone）方案：保留输入色的 hue 作为主轴，同时联动调整 tone/chroma，避免色盘两端直接落到极端饱和度；并提供可调曲线、可选的“混入颜色”能力，以及基准色元信息输出。

## API

```ts
import { palette } from '@aviala-design/color';

palette.generate(
  color: string,
  options?: {
    steps?: number; // 1..24，默认 10
    index?: number; // 1..steps，默认中间档位
    dark?: boolean;
    list?: boolean;
    meta?: boolean; // 返回 colors/base/steps 元信息
    format?: 'hex' | 'rgb' | 'hsl'; // 默认 'hex'
    curveGamma?: number; // 0.1..5，默认 1
    mixColor?: string; // hex
    mixRatio?: number; // 0..1，默认 0
  }
): string | string[] | { color/base/step 或 colors/base/steps }
```

## 示例

```js
import { palette } from '@aviala-design/color';

const light = palette.generate('#165DFF', { list: true, steps: 12, curveGamma: 1.1 });
const dark = palette.generate('#165DFF', { list: true, dark: true, steps: 12, curveGamma: 1.1 });
const meta = palette.generate('#165DFF', { list: true, meta: true });

const token3 = palette.generate('#165DFF', { index: 3 });
const mixedSeed = palette.generate('#F53F3F', { index: 6, mixColor: '#165DFF', mixRatio: 0.2 });
const mixedList = palette.generate('#F53F3F', { list: true, mixColor: '#165DFF', mixRatio: 0.2 });
```

## 规则说明

- `steps` 决定档位数量，`index` 的默认值为中间档位，便于直接取中等强度的可用色
- Light 色盘默认按“亮 -> 暗”分布，Dark 色盘默认按“近黑 -> 近白”分布
- `curveGamma` 会影响 tone/chroma 在整条色盘里的分布密度：越大，变化越集中在中段；越小，两端变化更快
- 暗色色盘会更激进地调整 chroma，中性色输入则会生成更接近黑白序列的低色度结果
- `meta=true` 可返回标准化后的 `sourceColor`、混色后的 `seedColor`、最接近的生成档位以及每一步的 `tone/chroma`
- `mixColor/mixRatio` 会先在感知空间（CAM16-UCS）把 seed 混入另一个颜色，再基于混后的 seed 生成色板

