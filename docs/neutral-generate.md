# 灰阶色阶（neutral.generate）

`neutral.generate` 用于生成灰阶色阶（仅灰阶），适合用于背景/文本/边框等中性色体系。

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
  }
): string[]
```

## 示例

```js
import { neutral } from '@aviala-design/color';

const light = neutral.generate('#ffffff', '#000000', { steps: 12, curveGamma: 1.2 });
const dark = neutral.generate('#000000', '#ffffff', { steps: 12, curveGamma: 1.2 });
```

## 说明

- 为了保证“中性色”语义，本方法按 RGB 线性插值生成灰阶，并允许通过 `curveGamma` 控制分布曲线（`t^gamma`）
- Dark 模式通常可通过反向生成实现：`neutral.generate(end, start, ...)`

