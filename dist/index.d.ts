import { default as generate } from './generate.js';
import { getRgbStr } from './utils.js';
import { extractColorFromImage, extractColorFromFile } from './image-color.js';
import { generateLinear, generateGrayLinear, generateMonochromeLinear, generateLinearHSL } from './linear.js';
import { rgbToHct, hctToRgb, blendInHct, harmonizeColor, generateThemeVariants, blendUIColors, generateThemePalette, generateControlColors, generateSemanticColors, generateThemeColors, generateInterfaceColorSystem } from './theme-blend.js';
export namespace colorList {
    let red: string;
    let orangered: string;
    let orange: string;
    let gold: string;
    let yellow: string;
    let lime: string;
    let green: string;
    let cyan: string;
    let blue: string;
    let arcoblue: string;
    let purple: string;
    let pinkpurple: string;
    let magenta: string;
}
export function getPresetColors(): {
    gray: {
        light: string[];
        dark: string[];
        primary: string;
    };
};
export { generate, getRgbStr, extractColorFromImage, extractColorFromFile, generateLinear, generateGrayLinear, generateMonochromeLinear, generateLinearHSL, rgbToHct, hctToRgb, blendInHct, harmonizeColor, generateThemeVariants, blendUIColors, generateThemePalette, generateControlColors, generateSemanticColors, generateThemeColors, generateInterfaceColorSystem };
