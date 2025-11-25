<!-- 当前版本: 0.4.0 | 最后同步: 2025/11/25 21:21:09 -->
# Aviala Design Color

![npm version](https://img.shields.io/npm/v/@aviala-design/color) ![npm downloads](https://img.shields.io/npm/dm/@aviala-design/color) ![license](https://img.shields.io/npm/l/@aviala-design/color)

Aviala Design Color - A powerful color processing utility library.

This library provides four core functionalities:

1. **Color Palette Generation**: Generate gradient swatches containing ten colors using algorithms, supporting both light and dark modes.
2. **Image Color Extraction**: Extract dominant colors from images for generating matching palettes or theme colors.
3. **Interface Color System**: Generate complete interface color systems based on primary colors, including semantic colors (success, warning, error, info).
4. **Theme Blending**: Advanced theme blending functionality based on HCT color space with multiple blending modes, supporting complete interface color system generation with brand customization.

## Usage

```bash
npm i @aviala-design/color
```

```js
import { 
  generate, 
  getPresetColors,
  getRgbStr,
  extractColorFromImage,
  generateInterfaceColorSystem,
  generateThemePalette,
  blendInHct,
  rgbToHct,
  hctToRgb
} from '@aviala-design/color';

// Generate color palette
console.log(generate('#123456'));

// Get preset colors
console.log(getPresetColors());
// {
//   red: {...},
//   orangered: {...},
//   orange: {...},
//   gold: {...},
//   yellow: {...},
//   lime: {...},
//   green: {...},
//   cyan: {...},
//   blue: {...},
//   arcoblue: {...},
//   purple: {...},
//   pinkpurple: {...},
//   magenta: {...},
//   gray: {...}
// }

// Generate interface color system
const colorSystem = generateInterfaceColorSystem('#3491FA');
console.log(colorSystem.success); // Success colors
console.log(colorSystem.warning); // Warning colors
console.log(colorSystem.error); // Error colors
console.log(colorSystem.info); // Info colors

// Generate complete theme palette with brand customization
const themePalette = generateThemePalette('#3491FA', {
  semanticColors: {
    success: '#00C853',
    warning: '#FF9800',
    error: '#F44336'
  },
  semanticBlendRatio: 0.1 // 10% brand influence on semantic colors
});
console.log(themePalette.control); // Control colors (primary, gray)
console.log(themePalette.semantic); // Semantic colors with brand influence
console.log(themePalette.theme); // Theme color variations

// Theme blending
const blended = blendInHct([64, 196, 255], [255, 87, 34], 'overlay', 0.5);
console.log(blended); // Blended RGB color
```

## API

### generate(color: string, options: Object);

#### options.index {number | 1-10}

Index (starting from 1) of the gradient colors to be generated.

#### options.list {boolean}

Whether to generate color array containing the ten colors.

#### options.dark

Whether to generate colors for dark mode.

#### options.format {'hex' | 'rgb' | 'hsl'}

Color format.
### getPresetColors {Function}

Contains 14 preset sets of colors.

* `red`
* `orangered`
* `orange`
* `gold`
* `yellow`
* `lime`
* `green`
* `cyan`
* `blue`
* `arcoblue`
* `purple`
* `pinkpurple`
* `magenta`
* `gray`

```js
const { red } = getPresetColors();

console.log(red.light);
console.log(red.dark);
console.log(red.primary);
```

### getRgbStr(color: string)

For a given color, get the r, g, b value in string

```js
getRgbStr('#F53F3F') // 245,63,63
```

### generateInterfaceColorSystem(primaryColor: string, options?: Object)

Generate a complete interface color system based on a primary color, including semantic colors.

**Parameters:**
- `primaryColor`: string - Primary color in hex format (e.g., '#3491FA')
- `options`: Object - Optional configuration
  - `successBase`: string - Custom success color base, defaults to green
  - `warningBase`: string - Custom warning color base, defaults to orange
  - `errorBase`: string - Custom error color base, defaults to red
  - `infoBase`: string - Custom info color base, defaults to blue

**Returns:**
- `Object` - Complete color system object
  - `primary`: string[] - Primary color palette (10 colors)
  - `success`: string[] - Success color palette (10 colors)
  - `warning`: string[] - Warning color palette (10 colors)
  - `error`: string[] - Error color palette (10 colors)
  - `info`: string[] - Info color palette (10 colors)

```js
// Generate default interface color system
const colorSystem = generateInterfaceColorSystem('#3491FA');
console.log(colorSystem.primary); // Primary color palette
console.log(colorSystem.success); // Success color palette

// Custom semantic color bases
const customColorSystem = generateInterfaceColorSystem('#3491FA', {
  successBase: '#00C853',
  warningBase: '#FF9800',
  errorBase: '#F44336',
  infoBase: '#2196F3'
});
```

### generateThemePalette(themeColor: string, options?: Object)

Generate a complete theme palette with advanced brand customization and semantic color blending.

**Parameters:**
- `themeColor`: string - Primary theme color in hex format
- `options`: Object - Optional configuration
  - `semanticColors`: Object - Custom semantic color bases
    - `success`: string - Success color base
    - `warning`: string - Warning color base
    - `error`: string - Error color base
    - `info`: string - Info color base
  - `semanticBlendRatio`: number - Brand influence on semantic colors (0-1, default: 0.08)
  - `controlBlendRatio`: number - Brand influence on control colors (0-1, default: 0.05)

**Returns:**
- `Object` - Complete theme palette
  - `control`: Object - Control colors (primary, gray)
  - `semantic`: Object - Semantic colors with brand influence
  - `theme`: string[] - Theme color variations (10 colors)

```js
// Basic theme palette
const basicPalette = generateThemePalette('#3491FA');

// Advanced customization with brand influence
const brandPalette = generateThemePalette('#3491FA', {
  semanticColors: {
    success: '#00C853',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3'
  },
  semanticBlendRatio: 0.12, // 12% brand influence
  controlBlendRatio: 0.08   // 8% brand influence
});
console.log(brandPalette.semantic.success); // Brand-influenced success colors
```

### rgbToHct(rgb: number[])

Convert RGB color to HCT color space.

**Parameters:**
- `rgb`: number[] - RGB color array [r, g, b], range 0-255

**Returns:**
- `number[]` - HCT color array [h, c, t], hue(0-360), chroma(0-100+), tone(0-100)

### hctToRgb(hct: number[])

Convert HCT color to RGB color space.

**Parameters:**
- `hct`: number[] - HCT color array [h, c, t]

**Returns:**
- `number[]` - RGB color array [r, g, b], range 0-255

### blendInHct(color1: number[], color2: number[], mode: string, ratio: number)

Blend two colors in HCT color space.

**Parameters:**
- `color1`: number[] - First color RGB array
- `color2`: number[] - Second color RGB array
- `mode`: string - Blend mode: 'multiply', 'screen', 'overlay', 'softLight'
- `ratio`: number - Blend ratio, range 0-1

**Returns:**
- `number[]` - Blended RGB color array

```js
// RGB to HCT conversion
const hct = rgbToHct([64, 196, 255]);
console.log(hct); // [200, 45, 80]

// HCT to RGB conversion
const rgb = hctToRgb([200, 45, 80]);
console.log(rgb); // [64, 196, 255]

// Color blending
const blended = blendInHct(
  [64, 196, 255],  // Blue
  [255, 87, 34],   // Orange
  'overlay',       // Overlay mode
  0.5              // 50% blend
);
console.log(blended); // Blended color

// Different blend modes
const multiply = blendInHct([255, 0, 0], [0, 255, 0], 'multiply', 0.5);
const screen = blendInHct([255, 0, 0], [0, 255, 0], 'screen', 0.5);
const softLight = blendInHct([255, 0, 0], [0, 255, 0], 'softLight', 0.5);
```

### extractColorFromImage(image: HTMLImageElement)

Extract dominant color from a loaded image element.

**Parameters:**
- `image`: HTMLImageElement - Loaded image element

**Returns:**
- `Promise<string>` - Extracted dominant color (hex format)

```js
const image = document.getElementById('myImage');
extractColorFromImage(image).then(color => {
  console.log('Extracted color:', color);
  // Generate palette from extracted color
  const palette = generate(color, { list: true });
});
```

### extractColorFromFile(file: File)

Read image from file object and extract dominant color.

**Parameters:**
- `file`: File - Image file object

**Returns:**
- `Promise<string>` - Extracted dominant color (hex format)

```js
// Use in file input event
document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    extractColorFromFile(file).then(color => {
      console.log('Extracted color:', color);
    });
  }
});
```

## Version History

### v0.2.0 (Latest)
- ✨ Added interface color system functionality
- ✨ Added HCT color space-based theme blending
- 📚 Enhanced API documentation and examples
- 🔧 Optimized code structure and performance

### v0.1.1
- 🐛 Fixed edge cases in color palette generation
- 📚 Updated documentation and examples

### v0.1.0
- 🎉 Initial release
- ✨ Color palette generation
- ✨ Image color extraction
