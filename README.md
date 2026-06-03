# Aviala Design Color

Aviala Design Color is a palette generator for design systems:

- `palette.generate`: Generate a palette from a seed color (light + dark)
- `neutral.generate`: Generate grayscale ramps (light + dark via reversing)

## Install

```bash
npm i @aviala-design/color
```

## Usage

```js
import { palette, neutral } from '@aviala-design/color';

const paletteLight = palette.generate('#165DFF', { list: true });
const paletteDark = palette.generate('#165DFF', { list: true, dark: true });

const graysLight = neutral.generate('#ffffff', '#000000', { steps: 12, curveGamma: 1.2 });
const graysDark = neutral.generate('#000000', '#ffffff', { steps: 12, curveGamma: 1.2 });

const mixed = palette.generate('#F53F3F', { index: 6, mixColor: '#165DFF', mixRatio: 0.2 });
```

## API

### palette.generate(color, options?)

```ts
palette.generate(
  color: string,
  options?: {
    steps?: number; // 1..24, default 10
    index?: number; // 1..steps, default centerIndex (e.g. 6 when steps=10)
    dark?: boolean;
    list?: boolean;
    format?: 'hex' | 'rgb' | 'hsl'; // default 'hex'
    curveGamma?: number; // 0.1..5, default 1
    mixColor?: string; // hex color
    mixRatio?: number; // 0..1, default 0
  }
): string | string[]
```

### neutral.generate(startGray, endGray, options?)

```ts
neutral.generate(
  startGray: string,
  endGray: string,
  options?: {
    steps?: number; // 1..24, default 10
    includeEnds?: boolean; // default true
    format?: 'hex' | 'rgb' | 'hsl'; // default 'hex'
    curveGamma?: number; // 0.1..5, default 1
  }
): string[]
```

## Breaking changes (feature removal)

This package no longer exports:

- Theme (Theme Blend / Interface Color System)
- Image (image color extraction)
- Gradient (linear generators; grayscale ramps are available via `neutral.generate`)
- Presets (colorList / getPresetColors)
- Utils (getRgbStr, etc.)

## Migration

| Old API | New API / Alternative |
| --- | --- |
| `generate(color, options)` | `palette.generate(color, options)` |
| `colorList` | Removed. Keep your own color constants in your app/library. |
| `getPresetColors()` | Removed. Generate palettes from your own color list via `palette.generate(color, { list: true })`. |
| `getRgbStr(color)` | Removed. Use `color` (already a dependency): `import Color from 'color'; Color(color).rgb().array().join(',')`. |
| `generateGrayLinear` | `neutral.generate('#ffffff', '#000000', options)` (grayscale ramps only) |
| `generateLinear*` / `generateMonochromeLinear` | Removed. Use a dedicated gradient lib (e.g. `d3-interpolate`, `chroma-js`) or implement interpolation in your project. |
| `extractColorFromImage` / `extractColorFromFile` | Removed. Use an image-palette lib (e.g. `color-thief`) or your own canvas pipeline. |
| `theme-blend` exports (HCT, theme palette, interface color system) | Removed. Use a specialized solution (e.g. Material color utilities) or keep it in a separate package. |
