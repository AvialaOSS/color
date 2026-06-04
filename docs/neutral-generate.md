# 中性色阶（neutral.generate）

`neutral.generate` 用于生成中性色阶。默认用法是灰阶，但也支持通过 `mixColor/mixRatio` 生成“带一点颜色的中性色”（tinted neutrals）。

## API

```ts
import { neutral } from '@aviala-design/color';

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

## 示例

```js
import { neutral } from '@aviala-design/color';

const light = neutral.generate('#ffffff', '#000000', { steps: 12, curveGamma: 1.2 });
const dark = neutral.generate('#000000', '#ffffff', { steps: 12, curveGamma: 1.2 });

const tinted = neutral.generate('#ffffff', '#000000', {
  steps: 12,
  curveGamma: 1.2,
  mixColor: '#165DFF',
  mixRatio: 0.2
});
```

## 说明

- 本方法按 RGB 线性插值生成色阶，并允许通过 `curveGamma` 控制分布曲线（`t^gamma`）
- Dark 模式通常可通过反向生成实现：`neutral.generate(end, start, ...)`
- 当提供 `mixColor/mixRatio` 时，会先把 start/end 分别在感知空间（CAM16-UCS）混入 `mixColor`，再基于混后的 start/end 生成色阶

