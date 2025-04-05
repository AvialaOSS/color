import { default as generate } from './generate.js';
import { getRgbStr } from './utils.js';
import { extractColorFromImage, extractColorFromFile } from './image-color.js';
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
export { generate, getRgbStr, extractColorFromImage, extractColorFromFile };
