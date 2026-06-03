# API 参考

本版本对外保留两个明确域：`palette` 与 `neutral`。被移除能力清单与迁移表请参考 [迁移指南](./migration.md)。

## 目录

- [palette.generate](#palettegenerate)
- [neutral.generate](#neutralgenerate)
- [迁移指南](./migration.md)

## palette.generate

基于基础颜色生成色板（Light / Dark），或返回指定档位的单个颜色。

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

### 示例

```js
import { palette } from '@aviala-design/color';

const light = palette.generate('#165DFF', { list: true, steps: 12, curveGamma: 1.1 });
const dark = palette.generate('#165DFF', { list: true, dark: true, steps: 12, curveGamma: 1.1 });

const mixed = palette.generate('#F53F3F', { index: 6, mixColor: '#165DFF', mixRatio: 0.2 });
```

## neutral.generate

生成灰阶色阶（仅灰阶）。

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

### 示例

```js
import { neutral } from '@aviala-design/color';

const light = neutral.generate('#ffffff', '#000000', { steps: 12, curveGamma: 1.2 });
const dark = neutral.generate('#000000', '#ffffff', { steps: 12, curveGamma: 1.2 });
```

