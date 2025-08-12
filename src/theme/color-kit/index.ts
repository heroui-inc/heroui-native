/**
 * Color manipulation utilities adapted from reanimated-color-picker
 *
 * Original source: https://github.com/alabsi91/reanimated-color-picker
 * Author: @alabsi91
 * License: MIT
 *
 * This code has been adapted for use in HeroUI Native with modifications
 * for TypeScript compatibility and integration with the theme system.
 */

import type {
  ColorFormats,
  ColorTypes,
  ConversionMethods,
  hslaT,
  hslT,
  hsvaT,
  hsvT,
  hwbaT,
  hwbT,
  rgbaT,
  rgbT,
  SupportedColorFormats,
} from './types';

// If you find yourself wondering why all of this is within a single function,
// the reason is that to execute each method on the UI thread, you must include the 'worklet' directive.
// Functions marked with this directive are transformed by the Reanimated Babel plugin
// into IIFE — IMMEDIATELY INVOKED FUNCTION EXPRESSION: `const fun = (function{})()`.
// Due to the presence of numerous methods,
// this transformation can lead to a slow initial execution.
// To address this issue, I consolidated them into a single worklet function.

export const colorKitUI = () => {
  'worklet';

  const NAMED_COLORS = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
  };

  const COLORS_REGEX: Record<ColorFormats, RegExp | RegExp[]> = {
    // #rgb
    hex3: /^#([A-Fa-f0-9]{3})$/,
    // #rgba
    hex4: /^#([A-Fa-f0-9]{3}[A-Fa-f0-9]{1})$/,
    // #rrggbb
    hex6: /^#([A-Fa-f0-9]{6})$/,
    // #rrggbbaa
    hex8: /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,

    hsl: [
      // hsl(360deg, 100%, 100%) hsl(360, 100%, 100%)
      /^hsl\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i,
      // hsl(360deg 100% 100%) hsl(360 100% 100%)
      /^hsl\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i,
    ],
    hsla: [
      // hsla(360deg, 100%, 100%, 1.0) hsla(360, 100%, 100%, 1.0) hsl(360deg, 100%, 100%, 1.0) hsl(360, 100%, 100%, 1.0)
      /^hsla?\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*(\d|\d\.\d+)\s*\)$/i,
      // hsla(360deg 100% 100% / 1.0) hsla(360 100% 100% / 1.0) hsl(360deg 100% 100% / 1.0) hsl(360 100% 100% / 1.0)
      /^hsla?\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\/\s*(\d|\d\.\d+)\s*\)$/i,
    ],

    hsv: [
      // hsv(360deg, 000%, 000%) hsv(360, 100%, 100%)
      /^hsv\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i,
      // hsv(360deg 000% 000%) hsv(360 100% 100%)
      /^hsv\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i,
    ],
    hsva: [
      // hsva(360deg, 100%, 100%, 1.0) hsva(360, 100%, 100%, 1.0) hsv(360deg, 100%, 100%, 1.0) hsv(360, 100%, 100%, 1.0)
      /^hsva?\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*(\d|\d\.\d+)\s*\)$/i,
      // hsva(360deg 100% 100% / 1.0) hsva(360 100% 100%  / 1.0) hsv(360deg 100% 100% / 1.0) hsv(360 100% 100%  / 1.0)
      /^hsva?\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\/\s*(\d|\d\.\d+)\s*\)$/i,
    ],

    hwb: [
      // hwb(360deg, 100%, 100%) hwb(360, 100%, 100%)
      /^hwb\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i,
      // hwb(360deg 100% 100%) hwb(360 100% 100%)
      /^hwb\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i,
    ],
    hwba: [
      // hwba(360deg, 100%, 100%, 1.0) hwba(360, 100%, 100%, 1.0) hwb(360deg, 100%, 100%, 1.0) hwb(360, 100%, 100%, 1.0)
      /^hwba?\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*(\d|\d\.\d+)\s*\)$/i,
      // hwb(360deg 100% 100% 1.0) hwb(360 100% 100% / 1.0) hwba(360deg 100% 100% 1.0) hwba(360 100% 100% / 1.0)
      /^hwba?\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\/\s*(\d|\d\.\d+)\s*\)$/i,
    ],

    rgb: [
      // rgb(255, 255, 255)
      /^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,
      // rgb(255 255 255)
      /^rgb\s*\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*\)$/i,
    ],
    rgba: [
      // rgba(255, 255, 255, 1.0) rgb(255, 255, 255, 1.0)
      /^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d.]+)\s*\)$/i,
      // rgba(255 255 255 / 1.0) rgb(255 255 255 / 1.0)
      /^rgba?\s*\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*\/\s*([\d.]+)\s*\)$/i,
    ],
  };

  // * MARK: General utilities

  const clamp = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(value, max));
  };

  const clampRGB = (value: number) => {
    return clamp(value, 0, 255);
  };

  const clampHue = (value: number) => {
    return clamp(value, 0, 360);
  };

  const clamp100 = (value: number) => {
    return clamp(value, 0, 100);
  };

  const clampAlpha = (value: number) => {
    return clamp(+value.toFixed(2), 0, 1);
  };

  const randomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const numberToHexString = (c: number): string => {
    c = clampRGB(Math.round(c));
    const hex = c.toString(16).padStart(2, '0');
    return hex;
  };

  const calculateHueValue = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  /** - Identify the color format of a given `string` or `object` */
  const detectColorFormat = (
    color: SupportedColorFormats
  ): ColorFormats | null => {
    // color int
    if (typeof color === 'number') {
      // eslint-disable-next-line no-bitwise
      if (color >>> 0 === color && color >= 0 && color <= 0xffffffff)
        return 'hex8';
      return null;
    }

    // color string
    if (typeof color === 'string') {
      color = color.trim().toLowerCase();
      for (const key in COLORS_REGEX) {
        const format = key as ColorFormats;
        const entry = COLORS_REGEX[format];
        if (Array.isArray(entry)) {
          for (let i = 0; i < entry.length; i++) {
            const regex = entry[i];
            if (regex && regex.test(color)) return format;
          }
          continue;
        }
        if (entry.test(color)) return format;
      }
    }

    // color object
    if (typeof color === 'object') {
      const rgbaKeys = ['r', 'g', 'b', 'a'] as (keyof rgbaT)[];
      const isRgbaOb = rgbaKeys.every(
        (k) =>
          color.hasOwnProperty(k) && typeof (color as rgbaT)[k] === 'number'
      );
      if (isRgbaOb) return 'rgba';

      const rgbKeys = ['r', 'g', 'b'] as (keyof rgbT)[];
      const isRgbOb = rgbKeys.every(
        (k) => color.hasOwnProperty(k) && typeof (color as rgbT)[k] === 'number'
      );
      if (isRgbOb) return 'rgb';

      const hslaKeys = ['h', 's', 'l', 'a'] as (keyof hslaT)[];
      const isHslaOb = hslaKeys.every(
        (k) =>
          color.hasOwnProperty(k) && typeof (color as hslaT)[k] === 'number'
      );
      if (isHslaOb) return 'hsla';

      const hslKeys = ['h', 's', 'l'] as (keyof hslT)[];
      const isHslOb = hslKeys.every(
        (k) => color.hasOwnProperty(k) && typeof (color as hslT)[k] === 'number'
      );
      if (isHslOb) return 'hsl';

      const hsvaKeys = ['h', 's', 'v', 'a'] as (keyof hsvaT)[];
      const isHsvaOb = hsvaKeys.every(
        (k) =>
          color.hasOwnProperty(k) && typeof (color as hsvaT)[k] === 'number'
      );
      if (isHsvaOb) return 'hsva';

      const hsvKeys = ['h', 's', 'v'] as (keyof hsvT)[];
      const isHsvOb = hsvKeys.every(
        (k) => color.hasOwnProperty(k) && typeof (color as hsvT)[k] === 'number'
      );
      if (isHsvOb) return 'hsv';

      const hwbaKeys = ['h', 'w', 'b', 'a'] as (keyof hwbaT)[];
      const isHwbaOb = hwbaKeys.every(
        (k) =>
          color.hasOwnProperty(k) && typeof (color as hwbaT)[k] === 'number'
      );
      if (isHwbaOb) return 'hwba';

      const hwbKeys = ['h', 'w', 'b'] as (keyof hwbT)[];
      const isHwbOb = hwbKeys.every(
        (k) => color.hasOwnProperty(k) && typeof (color as hwbT)[k] === 'number'
      );
      if (isHwbOb) return 'hwb';
    }

    return null;
  };

  // * MARK: RGB

  /** - Parse `RGB` or `RGBA` color string to an `object` */
  const RGB_string_to_object = (color: string): rgbaT => {
    color = color.trim().toLowerCase();
    const colorType = detectColorFormat(color);

    if (!colorType || !colorType.includes('rgb')) {
      console.error(
        '[colorKit.getRgbObject] is unable to parse the string into an `RGB` object. As a result, the color "black" will be returned instead.'
      );
      return { r: 0, g: 0, b: 0, a: 1 };
    }

    let matches: RegExpMatchArray | null = null;
    const entry = COLORS_REGEX[colorType];
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) {
        const regex = entry[i];
        if (regex && regex.test(color)) {
          matches = color.match(regex);
        }
      }
    } else {
      matches = color.match(entry);
    }

    if (!matches || matches.length < 4) {
      console.error(
        '[colorKit.getRgbObject] An error occurred while attempting to destructuring `RGB` values from the given string. As a result, the color "black" will be returned instead.'
      );
      return { r: 0, g: 0, b: 0, a: 1 };
    }

    const r = parseInt(matches[1] || '0', 10),
      g = parseInt(matches[2] || '0', 10),
      b = parseInt(matches[3] || '0', 10),
      a = parseFloat(matches[4] ?? '1');

    return {
      r: clampRGB(r),
      g: clampRGB(g),
      b: clampRGB(b),
      a: clampAlpha(a),
    };
  };

  /** - Ensure that the `RGB` object values are within the correct range and that it has the alpha channel */
  const normalize_RGB_object = (color: rgbaT | rgbT): rgbaT => {
    return {
      r: clampRGB(color.r),
      g: clampRGB(color.g),
      b: clampRGB(color.b),
      a: clampAlpha((color as rgbaT).a ?? 1),
    };
  };

  /** - Convert an `RGB` or `RGBA` color to its corresponding `Hex` color */
  const RGB_to_HEX = (color: string | rgbaT | rgbT): string => {
    const { r, g, b, a } =
      typeof color === 'string'
        ? RGB_string_to_object(color)
        : normalize_RGB_object(color);

    const red = numberToHexString(r),
      green = numberToHexString(g),
      blue = numberToHexString(b),
      alpha = a === 1 ? '' : numberToHexString(a * 255);

    return `#${red + green + blue + alpha}`;
  };

  /** - Convert `RGB` or `RGBA` color to an `RGBA` object representation */
  const RGB_to_RGB = (color: string | rgbaT | rgbT): rgbaT => {
    return typeof color === 'string'
      ? RGB_string_to_object(color)
      : normalize_RGB_object(color);
  };

  /** - Convert an `RGB` or `RGBA` color to an `HSLA` object representation */
  const RGB_to_HSLA = (color: string | rgbaT | rgbT): hslaT => {
    const rgb =
        typeof color === 'string'
          ? RGB_string_to_object(color)
          : normalize_RGB_object(color),
      r = rgb.r / 255,
      g = rgb.g / 255,
      b = rgb.b / 255,
      a = rgb.a;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);

    let h = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      if (max === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / d + 2;
      } else if (max === b) {
        h = (r - g) / d + 4;
      }

      h /= 6;
    }

    h = clampHue(h * 360);
    s = clamp100(s * 100);
    l = clamp100(l * 100);

    return { h, s, l, a: clampAlpha(a) };
  };

  /** - Convert `RGB` or `RGBA` color to an `HSVA` object representation */
  const RGB_to_HSVA = (color: string | rgbaT | rgbT): hsvaT => {
    const rgb =
        typeof color === 'string'
          ? RGB_string_to_object(color)
          : normalize_RGB_object(color),
      r = rgb.r / 255,
      g = rgb.g / 255,
      b = rgb.b / 255,
      a = rgb.a;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      d = max - min,
      v = max,
      s = max === 0 ? 0 : d / max;

    let h = 0;

    if (max === min) {
      h = 0;
    } else {
      if (max === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / d + 2;
      } else if (max === b) {
        h = (r - g) / d + 4;
      }

      h = h / 6;
    }

    return {
      h: clampHue(h * 360),
      s: clamp100(s * 100),
      v: clamp100(v * 100),
      a: clampAlpha(a),
    };
  };

  /** - Convert `RGB` or `RGBA` color to an `HWBA` object representation */
  const RGB_to_HWBA = (color: string | rgbaT | rgbT): hwbaT => {
    const rgb =
        typeof color === 'string'
          ? RGB_string_to_object(color)
          : normalize_RGB_object(color),
      red = rgb.r / 255,
      green = rgb.g / 255,
      blue = rgb.b / 255,
      a = rgb.a;

    const { h } = RGB_to_HSLA(color);

    const white = Math.min(red, green, blue) * 100;
    const black = (1 - Math.max(red, green, blue)) * 100;

    return {
      h: clampHue(h),
      w: clamp100(white),
      b: clamp100(black),
      a: clampAlpha(a),
    };
  };

  /** - Return the `RGB` color as a string, an array, or an object */
  const RGB_types = ({ r, g, b, a }: rgbaT): ColorTypes<rgbaT> => {
    return {
      string: (forceAlpha?: boolean) => {
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);

        // auto
        if (typeof forceAlpha === 'undefined') {
          if (typeof a === 'number' && a !== 1)
            return `rgba(${r}, ${g}, ${b}, ${a})`;
          return `rgb(${r}, ${g}, ${b})`;
        }

        if (forceAlpha) return `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;

        return `rgb(${r}, ${g}, ${b})`;
      },
      array: (roundValues = true) => {
        if (roundValues) {
          r = Math.round(r);
          g = Math.round(g);
          b = Math.round(b);
        }
        return [r, g, b, a];
      },
      object: (roundValues = true) => {
        if (roundValues) {
          r = Math.round(r);
          g = Math.round(g);
          b = Math.round(b);
        }
        return { r, g, b, a };
      },
    };
  };

  // * MARK: HSL

  /** - Parse `HSL` or `HSLA` color string to an `object` */
  const HSL_string_to_object = (color: string): hslaT => {
    color = color.trim().toLowerCase();
    const colorType = detectColorFormat(color);

    if (!colorType || !colorType.includes('hsl')) {
      console.error(
        '[colorKit.getHslObject] is unable to parse the string into an `HSL` object. As a result, the color "black" will be returned instead.'
      );
      return { h: 0, s: 0, l: 0, a: 1 };
    }

    let matches: RegExpMatchArray | null = null;
    const entry = COLORS_REGEX[colorType as 'hsl' | 'hsla'];
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) {
        const regex = entry[i];
        if (regex && regex.test(color)) {
          matches = color.match(regex);
        }
      }
    } else {
      matches = color.match(entry);
    }

    if (!matches || matches.length < 3) {
      console.error(
        '[colorKit.getHslObject] An error occurred while attempting to destructuring `HSL` values from the given string. As a result, the color "black" will be returned instead.'
      );
      return { h: 0, s: 0, l: 0, a: 1 };
    }

    const h = parseInt(matches[1] || '0', 10),
      s = parseInt(matches[2] || '0', 10),
      l = parseInt(matches[3] || '0', 10),
      a = parseFloat(matches[4] ?? '1');

    return {
      h: clampHue(h),
      s: clamp100(s),
      l: clamp100(l),
      a: clampAlpha(a),
    };
  };

  /** - Ensure that the `HSL` object values are within the correct range and that it has the alpha channel */
  const normalize_HSL_object = (color: hslaT | hslT): hslaT => {
    return {
      h: clampHue(color.h),
      s: clamp100(color.s),
      l: clamp100(color.l),
      a: clampAlpha((color as hslaT).a ?? 1),
    };
  };

  /** - Convert `HSL` or `HSLA` color to an `RGBA` object representation */
  const HSL_to_RGBA = (color: string | hslaT | hslT): rgbaT => {
    const hsla =
      typeof color === 'string'
        ? HSL_string_to_object(color)
        : normalize_HSL_object(color);

    const h = hsla.h / 360,
      s = hsla.s / 100,
      l = hsla.l / 100,
      a = hsla.a;

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s,
      p = 2 * l - q;

    const r = calculateHueValue(p, q, h + 1 / 3),
      g = calculateHueValue(p, q, h),
      b = calculateHueValue(p, q, h - 1 / 3);

    return {
      r: clampRGB(r * 255),
      g: clampRGB(g * 255),
      b: clampRGB(b * 255),
      a: clampAlpha(a),
    };
  };

  /** - Convert `HSL` or `HSLA` color to `HEX` color */
  const HSL_to_HEX = (color: string | hslaT | hslT): string => {
    const hsla =
      typeof color === 'string'
        ? HSL_string_to_object(color)
        : normalize_HSL_object(color);
    const rgb = HSL_to_RGBA(hsla);

    const r = numberToHexString(rgb.r),
      g = numberToHexString(rgb.g),
      b = numberToHexString(rgb.b),
      a = rgb.a === 1 ? '' : numberToHexString(rgb.a * 255);

    return `#${r + g + b + a}`;
  };

  /** - Convert `HSL` or `HSLA` color to an `HSVA` object representation */
  const HSL_to_HSVA = (color: string | hslaT | hslT): hsvaT => {
    const hsla =
      typeof color === 'string'
        ? HSL_string_to_object(color)
        : normalize_HSL_object(color);
    const h = hsla.h;

    const s = hsla.s / 100,
      l = hsla.l / 100,
      a = (hsla as hslaT).a ?? 1,
      v = l + s * Math.min(l, 1 - l),
      sNew = v === 0 ? 0 : 2 - (2 * l) / v;

    return {
      h: clampHue(h),
      s: clamp100(sNew * 100),
      v: clamp100(v * 100),
      a: clampAlpha(a),
    };
  };

  /** - Convert `HSL` or `HSLA` color to an `HWBA` object representation */
  const HSL_to_HWBA = (color: string | hslaT | hslT): hwbaT => {
    const hsva = HSL_to_HSVA(color);
    return HSV_to_HWBA(hsva);
  };

  /** - Convert `HSL` or `HSLA` color to an `HSLA` object representation */
  const HSL_to_HSL = (color: string | hslaT | hslT): hslaT => {
    return typeof color === 'string'
      ? HSL_string_to_object(color)
      : normalize_HSL_object(color);
  };

  /** - Return the `HSL` color as a string, an array, or an object */
  const HSL_types = ({ h, s, l, a }: hslaT): ColorTypes<hslaT> => {
    return {
      string: (forceAlpha?: boolean) => {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);

        // auto
        if (typeof forceAlpha === 'undefined') {
          if (typeof a === 'number' && a !== 1)
            return `hsla(${h}, ${s}%, ${l}%, ${a})`;
          return `hsl(${h}, ${s}%, ${l}%)`;
        }

        if (forceAlpha) return `hsla(${h}, ${s}%, ${l}%, ${a ?? 1})`;

        return `hsl(${h}, ${s}%, ${l}%)`;
      },
      array: (roundValues = true) => {
        if (roundValues) {
          h = Math.round(h);
          s = Math.round(s);
          l = Math.round(l);
        }
        return [h, s, l, a];
      },
      object: (roundValues = true) => {
        if (roundValues) {
          h = Math.round(h);
          s = Math.round(s);
          l = Math.round(l);
        }
        return { h, s, l, a };
      },
    };
  };

  // * MARK: HWB

  /** - Parse `HWB` or `HWBA` color strong to an `object` */
  const HWB_string_to_object = (color: string): hwbaT => {
    color = color.trim().toLowerCase();
    const colorType = detectColorFormat(color);

    if (!colorType || !colorType.includes('hwb')) {
      console.error(
        '[colorKit.getHwbObject] is unable to parse the string into an `HWB` object. As a result, the color "black" will be returned instead.'
      );
      return { h: 0, w: 0, b: 0, a: 1 };
    }

    let matches: RegExpMatchArray | null = null;
    const entry = COLORS_REGEX[colorType as 'hwb' | 'hwba'];
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) {
        const regex = entry[i];
        if (regex && regex.test(color)) {
          matches = color.match(regex);
        }
      }
    } else {
      matches = color.match(entry);
    }

    if (!matches || matches.length < 4) {
      console.error(
        '[colorKit.getHwbObject] An error occurred while attempting to destructuring `HWB` values from the given string. As a result, the color "black" will be returned instead.'
      );
      return { h: 0, w: 0, b: 0, a: 1 };
    }

    const h = parseInt(matches[1] || '0', 10),
      w = parseInt(matches[2] || '0', 10),
      b = parseInt(matches[3] || '0', 10),
      a = parseFloat(matches[4] ?? '1');

    return {
      h: clampHue(h),
      w: clamp100(w),
      b: clamp100(b),
      a: clampAlpha(a),
    };
  };

  /** - Ensure that the `HWB` object values are within the correct range and that it has the alpha channel */
  const normalize_HWB_object = (color: hwbaT | hwbT): hwbaT => {
    return {
      h: clampHue(color.h),
      w: clamp100(color.w),
      b: clamp100(color.b),
      a: clampAlpha((color as hwbaT).a ?? 1),
    };
  };

  /** - Convert `HWB` or `HWBA` color to an `RGBA` object representation */
  const HWB_to_RGBA = (color: hwbaT | hwbT | string): rgbaT => {
    const hwba =
      typeof color === 'string'
        ? HWB_string_to_object(color)
        : normalize_HWB_object(color);

    const h = hwba.h / 360,
      w = hwba.w / 100,
      b = hwba.b / 100,
      a = hwba.a;

    if (w + b >= 1) {
      const gray = clampRGB((w * 255) / (w + b));
      return {
        r: gray,
        g: gray,
        b: gray,
        a,
      };
    }

    const red = calculateHueValue(0, 1, h + 1 / 3) * (1 - w - b) + w,
      green = calculateHueValue(0, 1, h) * (1 - w - b) + w,
      blue = calculateHueValue(0, 1, h - 1 / 3) * (1 - w - b) + w;

    return {
      r: clampRGB(red * 255),
      g: clampRGB(green * 255),
      b: clampRGB(blue * 255),
      a: clampAlpha(a),
    };
  };

  /** - Convert `HWB` or `HWBA` color to an `Hex` color */
  const HWB_to_HEX = (color: hwbaT | hwbT | string): string => {
    const rgba = HWB_to_RGBA(color);
    return RGB_to_HEX(rgba);
  };

  /** - Convert `HWB` or `HWBA` color to an `HSVA` object representation */
  function HWB_to_HSVA(color: hwbaT | hwbT | string): hsvaT {
    const hwba =
      typeof color === 'string'
        ? HWB_string_to_object(color)
        : normalize_HWB_object(color);

    const h = hwba.h % 360,
      w = hwba.w / 100,
      b = hwba.b / 100,
      a = hwba.a;

    const v = (1 - b) * 100;
    let s = (1 - w / (v / 100)) * 100;
    s = isNaN(s) ? 0 : s;

    return {
      h: clampHue(h),
      s: clamp100(s),
      v: clamp100(v),
      a: clampAlpha(a),
    };
  }

  /** - Convert `HWB` or `HWBA` color to an `HSLA` object representation */
  const HWB_to_HSLA = (color: hwbaT | hwbT | string): hslaT => {
    const hsva = HWB_to_HSVA(color);
    return HSV_to_HSLA(hsva);
  };

  /** - Convert `HWB` or `HWBA` color to an `HWBA` object representation */
  const HWB_to_HWB = (color: hwbaT | hwbT | string): hwbaT => {
    return typeof color === 'string'
      ? HWB_string_to_object(color)
      : normalize_HWB_object(color);
  };

  /** - Return the `HWB` color as a string, an array, or an object */
  const HWB_types = ({ h, w, b, a }: hwbaT): ColorTypes<hwbaT> => {
    return {
      string: (forceAlpha?: boolean) => {
        h = Math.round(h);
        w = Math.round(w);
        b = Math.round(b);

        // auto
        if (typeof forceAlpha === 'undefined') {
          if (typeof a === 'number' && a !== 1)
            return `hwb(${h} ${w}% ${b}% / ${a})`;
          return `hwb(${h}, ${w}%, ${b}%)`;
        }

        if (forceAlpha) return `hwb(${h} ${w}% ${b}% / ${a ?? 1})`;

        return `hwb(${h} ${w}% ${b}%)`;
      },
      array: (roundValues = true) => {
        if (roundValues) {
          h = Math.round(h);
          w = Math.round(w);
          b = Math.round(b);
        }
        return [h, w, b, a];
      },
      object: (roundValues = true) => {
        if (roundValues) {
          h = Math.round(h);
          w = Math.round(w);
          b = Math.round(b);
        }
        return { h, w, b, a };
      },
    };
  };

  // * MARK: HSV

  /** - Parse `HSV` or `HSVA` color string to an `object` */
  const HSV_string_to_object = (color: string): hsvaT => {
    color = color.trim().toLowerCase();
    const colorType = detectColorFormat(color);

    if (!colorType || !colorType.includes('hsv')) {
      console.error(
        '[colorKit.getHsvObject] is unable to parse the string into an `HSV` object. As a result, the color "black" will be returned instead.'
      );
      return { h: 0, s: 0, v: 0, a: 1 };
    }

    let matches: RegExpMatchArray | null = null;
    const entry = COLORS_REGEX[colorType as 'hsv' | 'hsva'];
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) {
        const regex = entry[i];
        if (regex && regex.test(color)) {
          matches = color.match(regex);
        }
      }
    } else {
      matches = color.match(entry);
    }

    if (!matches || matches.length < 4) {
      console.error(
        '[colorKit.getHsvObject] An error occurred while attempting to destructuring `HSV` values from the given string. As a result, the color "black" will be returned instead.'
      );
      return { h: 0, s: 0, v: 0, a: 1 };
    }

    const h = parseInt(matches[1] || '0', 10),
      s = parseInt(matches[2] || '0', 10),
      v = parseInt(matches[3] || '0', 10),
      a = parseFloat(matches[4] ?? '1');

    return {
      h: clampHue(h),
      s: clamp100(s),
      v: clamp100(v),
      a: clampAlpha(a),
    };
  };

  /** - Ensure that the `HSV` object values are within the correct range and that it has the alpha channel */
  const normalize_HSV_object = (color: hsvaT | hsvT): hsvaT => {
    return {
      h: clampHue(color.h),
      s: clamp100(color.s),
      v: clamp100(color.v),
      a: clampAlpha((color as hsvaT).a ?? 1),
    };
  };

  /** - Convert `HSV` color to an `RGBA` object representation */
  const HSV_to_RGBA = (color: hsvaT | hsvT | string): rgbaT => {
    const hsva =
      typeof color === 'string'
        ? HSV_string_to_object(color)
        : normalize_HSV_object(color);

    const h = hsva.h / 360,
      s = hsva.s / 100,
      v = hsva.v / 100,
      a = hsva.a;

    const i = Math.floor(h * 6),
      f = h * 6 - i,
      p = v * (1 - s),
      q = v * (1 - f * s),
      t = v * (1 - (1 - f) * s);

    let r = 0,
      g = 0,
      b = 0;

    if (i % 6 === 0) {
      r = v;
      g = t;
      b = p;
    } else if (i % 6 === 1) {
      r = q;
      g = v;
      b = p;
    } else if (i % 6 === 2) {
      r = p;
      g = v;
      b = t;
    } else if (i % 6 === 3) {
      r = p;
      g = q;
      b = v;
    } else if (i % 6 === 4) {
      r = t;
      g = p;
      b = v;
    } else if (i % 6 === 5) {
      r = v;
      g = p;
      b = q;
    }

    return {
      r: clampRGB(r * 255),
      g: clampRGB(g * 255),
      b: clampRGB(b * 255),
      a: clampAlpha(a),
    };
  };

  /** - Convert `HSV` color to an `HSLA` object representation */
  const HSV_to_HSLA = (color: hsvaT | hsvT | string): hslaT => {
    const hsva =
      typeof color === 'string'
        ? HSV_string_to_object(color)
        : normalize_HSV_object(color);

    const h = hsva.h,
      s = hsva.s / 100,
      v = hsva.v / 100,
      a = hsva.a;

    const l = ((2 - s) * v) / 2,
      sl = s * v,
      sln = l !== 0 && l !== 1 ? sl / (l < 0.5 ? l * 2 : 2 - l * 2) : sl;

    return {
      h: clampHue(h),
      s: clamp100(sln * 100),
      l: clamp100(l * 100),
      a: clampAlpha(a),
    };
  };

  /** - Convert `HSV` color to an `Hex` color */
  const HSV_to_HEX = (color: hsvaT | hsvT | string): string => {
    const rgba = HSV_to_RGBA(color);
    const hex = RGB_to_HEX(rgba);
    return hex;
  };

  /** - Convert `HSV` color to an `HWBA` object representation */
  const HSV_to_HWBA = (color: hsvaT | hsvT | string): hwbaT => {
    const { h, s, v, a } =
      typeof color === 'string'
        ? HSV_string_to_object(color)
        : normalize_HSV_object(color);

    const w = (1 - s / 100) * v,
      b = (1 - v / 100) * 100;

    return {
      h: clampHue(h),
      w: clamp100(w),
      b: clamp100(b),
      a: clampAlpha(a),
    };
  };

  /** - Convert `HSV` color to an `HSVA` object representation */
  const HSV_to_HSV = (color: hsvaT | hsvT | string): hsvaT => {
    return typeof color === 'string'
      ? HSV_string_to_object(color)
      : normalize_HSV_object(color);
  };

  /** - Return the `HSV` color as a string, an array, or an object */
  const HSV_types = ({ h, s, v, a }: hsvaT): ColorTypes<hsvaT> => {
    return {
      string: (forceAlpha?: boolean) => {
        h = Math.round(h);
        s = Math.round(s);
        v = Math.round(v);

        // auto
        if (typeof forceAlpha === 'undefined') {
          if (typeof a === 'number' && a !== 1)
            return `hsva(${h}, ${s}%, ${v}%, ${a})`;
          return `hsv(${h}, ${s}%, ${v}%)`;
        }

        if (forceAlpha) return `hsva(${h}, ${s}%, ${v}%, ${a ?? 1})`;

        return `hsv(${h}, ${s}%, ${v}%)`;
      },
      array: (roundValues = true) => {
        if (roundValues) {
          h = Math.round(h);
          s = Math.round(s);
          v = Math.round(v);
        }
        return [h, s, v, a];
      },
      object: (roundValues = true) => {
        if (roundValues) {
          h = Math.round(h);
          s = Math.round(s);
          v = Math.round(v);
        }
        return { h, s, v, a };
      },
    };
  };

  // * MARK: HEX

  /** - Convert any `HEX` color to 8-digit `HEX` color (#rrggbbaa) */
  const normalize_HEX = (color: string | number): string => {
    if (typeof color === 'number') {
      return '#' + color.toString(16).padStart(8, '0');
    }

    color = color.trim().toLowerCase();
    const colorType = detectColorFormat(color);

    if (!colorType || !colorType.includes('hex')) {
      console.error(
        '[colorKit.normalizeHexColor] is unable to normalize the `HEX` string provided. As a result, the color "black" will be returned instead.'
      );
      return '#000000ff';
    }

    const hex = color.replace(/^#/, '').split('');

    if (hex.length === 3) return `#${hex.map((x) => x + x).join('')}ff`;
    if (hex.length === 4) return `#${hex.map((x) => x + x).join('')}`;
    if (hex.length === 6) return `#${hex.join('')}ff`;

    return color;
  };

  /** - Convert any `HEX` color to an `RGBA` object representation */
  const HEX_to_RGBA = (color: string | number): rgbaT => {
    const hex = normalize_HEX(color);

    let matches: RegExpMatchArray | null = null;
    const entry = COLORS_REGEX.hex8;
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) {
        const regex = entry[i];
        if (regex && regex.test(hex)) matches = hex.match(regex);
      }
    } else {
      matches = hex.match(entry);
    }

    if (!matches || matches.length < 4) {
      console.error(
        '[colorKit.HEX_RGBA] An error occurred while attempting to destructuring `HEX` values from the given string. As a result, the color "black" will be returned instead.'
      );
      return { r: 0, g: 0, b: 0, a: 1 };
    }

    const r = parseInt(matches[1] || '0', 16),
      g = parseInt(matches[2] || '0', 16),
      b = parseInt(matches[3] || '0', 16),
      a = parseInt(matches[4] || 'ff', 16) / 255;

    return {
      r: clampRGB(r),
      g: clampRGB(g),
      b: clampRGB(b),
      a: clampAlpha(a),
    };
  };

  /** - Convert any `HEX` color to an `HSVA` object representation */
  const HEX_to_HSVA = (color: string | number): hsvaT => {
    const rgb = HEX_to_RGBA(color);
    const hsva = RGB_to_HSVA(rgb);
    return hsva;
  };

  /** - Convert any `HEX` color to an `HSLA` object representation */
  const HEX_to_HSLA = (color: string): hslaT => {
    const rgb = HEX_to_RGBA(color);
    return RGB_to_HSLA(rgb);
  };

  /** - Convert any `HEX` color to an `HWBA` object representation */
  const HEX_to_HWBA = (color: string): hwbaT => {
    const rgba = HEX_to_RGBA(color);
    return RGB_to_HWBA(rgba);
  };

  // * MARK: Color conversions

  /** - Convert `HSL`, `HSV`, `HWB`, or `RGB` color to the `HEX` color format. */
  const HEX = (color: SupportedColorFormats): string => {
    // named color
    if (typeof color === 'string') {
      color = color.trim().toLowerCase();

      if (NAMED_COLORS.hasOwnProperty(color)) {
        color = NAMED_COLORS[color as keyof typeof NAMED_COLORS] as string;
      }
    }

    const colorType = detectColorFormat(color);

    // RGB to HEX
    if (colorType === 'rgb' || colorType === 'rgba') {
      return RGB_to_HEX(color as string | rgbT | rgbaT);
    }

    // HSL to HEX
    if (colorType === 'hsl' || colorType === 'hsla') {
      return HSL_to_HEX(color as string | hslaT | hslT);
    }

    // HSV to HEX
    if (colorType === 'hsv' || colorType === 'hsva') {
      return HSV_to_HEX(color as string | hsvaT | hsvT);
    }

    // HWB to HEX
    if (colorType === 'hwb' || colorType === 'hwba') {
      return HWB_to_HEX(color as string | hwbaT | hwbT);
    }

    // HEX
    if (colorType?.includes('hex')) {
      return normalize_HEX(color as string | number);
    }

    // ! error
    console.error(
      '[colorKit.HEX] An error occurred while attempting to convert the provided parameter into an `HEX` color. As a result, the default color "black" will be used instead.'
    );

    return '#000000';
  };

  /** - Convert `HSL`, `HSV`, `HWB`, or `HEX` color to the `RGB` color format. */
  const RGB = (color: SupportedColorFormats): ColorTypes<rgbaT> => {
    // named color
    if (typeof color === 'string') {
      color = color.trim().toLowerCase();

      if (NAMED_COLORS.hasOwnProperty(color)) {
        color = NAMED_COLORS[color as keyof typeof NAMED_COLORS] as string;
      }
    }

    const colorType = detectColorFormat(color);

    // HEX to RGB
    if (colorType?.includes('hex')) {
      const rgb = HEX_to_RGBA(color as string | number);
      return RGB_types(rgb);
    }

    // HSL to RGB
    if (colorType === 'hsl' || colorType === 'hsla') {
      const rgb = HSL_to_RGBA(color as string | hslaT | hslT);
      return RGB_types(rgb);
    }

    // HSV to RGB
    if (colorType === 'hsv' || colorType === 'hsva') {
      const rgb = HSV_to_RGBA(color as string | hsvaT | hsvT);
      return RGB_types(rgb);
    }

    // HWB to RGB
    if (colorType === 'hwb' || colorType === 'hwba') {
      const rgb = HWB_to_RGBA(color as string | hwbaT | hwbT);
      return RGB_types(rgb);
    }

    // RGB to normalized RGB
    if (colorType === 'rgb' || colorType === 'rgba') {
      const rgba = RGB_to_RGB(color as string | rgbaT | rgbT);
      return RGB_types(rgba);
    }

    // ! error
    console.error(
      '[colorKit.RGB] An error occurred while attempting to convert the provided parameter into an `RGB` color. As a result, the default color "black" will be used instead.'
    );

    return RGB_types({ r: 0, g: 0, b: 0, a: 1 });
  };

  /** - Convert `HEX`, `HSV`, `HWB`, or `RGB` color to the `HSL` color format. */
  const HSL = (color: SupportedColorFormats): ColorTypes<hslaT> => {
    // named color
    if (typeof color === 'string') {
      color = color.trim().toLowerCase();

      if (NAMED_COLORS.hasOwnProperty(color)) {
        color = NAMED_COLORS[color as keyof typeof NAMED_COLORS] as string;
      }
    }

    const colorType = detectColorFormat(color);

    // HEX to HSL
    if (colorType?.includes('hex')) {
      const hsla = HEX_to_HSLA(color as string);
      return HSL_types(hsla);
    }

    // RGB to HSL
    if (colorType === 'rgb' || colorType === 'rgba') {
      const hsla = RGB_to_HSLA(color as string | rgbaT | rgbT);
      return HSL_types(hsla);
    }

    // HSV to HSL
    if (colorType === 'hsv' || colorType === 'hsva') {
      const hsla = HSV_to_HSLA(color as string | hsvaT | hsvT);
      return HSL_types(hsla);
    }

    // HWB to HSL
    if (colorType === 'hwb' || colorType === 'hwba') {
      const hsla = HWB_to_HSLA(color as string | hwbaT | hwbT);
      return HSL_types(hsla);
    }

    // HSL to normalized HSL
    if (colorType === 'hsl' || colorType === 'hsla') {
      const hsla = HSL_to_HSL(color as string | hslaT | hslT);
      return HSL_types(hsla);
    }

    // ! error
    console.error(
      '[colorKit.HSL] An error occurred while attempting to convert the provided parameter into an `HSL` color. As a result, the default color "black" will be used instead.'
    );

    return HSL_types({ h: 0, s: 0, l: 0, a: 1 });
  };

  /** - Convert `HSL`, `HEX`, `HSV`, or `RGB` color to the `HWB` color format. */
  const HWB = (color: SupportedColorFormats): ColorTypes<hwbaT> => {
    // named color
    if (typeof color === 'string') {
      color = color.trim().toLowerCase();

      if (NAMED_COLORS.hasOwnProperty(color)) {
        color = NAMED_COLORS[color as keyof typeof NAMED_COLORS] as string;
      }
    }

    const colorType = detectColorFormat(color);

    // HEX to HWB
    if (colorType?.includes('hex')) {
      const hwba = HEX_to_HWBA(color as string);
      return HWB_types(hwba);
    }

    // RGB to HWB
    if (colorType === 'rgb' || colorType === 'rgba') {
      const hwba = RGB_to_HWBA(color as string | rgbaT | rgbT);
      return HWB_types(hwba);
    }

    // HSL to HWB
    if (colorType === 'hsl' || colorType === 'hsla') {
      const hwba = HSL_to_HWBA(color as string | hslaT | hslT);
      return HWB_types(hwba);
    }

    // HSV to HWB
    if (colorType === 'hsv' || colorType === 'hsva') {
      const hwba = HSV_to_HWBA(color as string | hsvaT | hsvT);
      return HWB_types(hwba);
    }

    // HWB to normalized HWB
    if (colorType === 'hwb' || colorType === 'hwba') {
      const hwba = HWB_to_HWB(color as string | hwbaT | hwbT);
      return HWB_types(hwba);
    }

    // ! error
    console.error(
      '[colorKit.HWB] An error occurred while attempting to convert the provided parameter into an `HWB` color. As a result, the default color "black" will be used instead.'
    );

    return HWB_types({ h: 0, w: 0, b: 100, a: 1 });
  };

  /** - Convert `HSL`, `HEX`, `HWB`, or `RGB` color to the `HSV` color format. */
  const HSV = (color: SupportedColorFormats): ColorTypes<hsvaT> => {
    // named color
    if (typeof color === 'string') {
      color = color.trim().toLowerCase();

      if (NAMED_COLORS.hasOwnProperty(color)) {
        color = NAMED_COLORS[color as keyof typeof NAMED_COLORS] as string;
      }
    }

    const colorType = detectColorFormat(color);

    // HEX to HSV
    if (colorType?.includes('hex')) {
      const hsva = HEX_to_HSVA(color as string);
      return HSV_types(hsva);
    }

    // RGB to HSV
    if (colorType === 'rgb' || colorType === 'rgba') {
      const hsva = RGB_to_HSVA(color as string | rgbaT | rgbT);
      return HSV_types(hsva);
    }

    // HSL to HSV
    if (colorType === 'hsl' || colorType === 'hsla') {
      const hsva = HSL_to_HSVA(color as string | hslaT | hslT);
      return HSV_types(hsva);
    }

    // HWB to HSV
    if (colorType === 'hwb' || colorType === 'hwba') {
      const hsva = HWB_to_HSVA(color as string | hwbaT | hwbT);
      return HSV_types(hsva);
    }

    // HSV to normalized HSV
    if (colorType === 'hsv' || colorType === 'hsva') {
      const hsva = HSV_to_HSV(color as string | hsvaT | hsvT);
      return HSV_types(hsva);
    }

    // ! error
    console.error(
      '[colorKit.HSV] An error occurred while attempting to convert the provided parameter into an `HSV` color. As a result, the default color "black" will be used instead.'
    );

    return HSV_types({ h: 0, s: 0, v: 0, a: 1 });
  };

  // * MARK: Color Information

  /** - Identify the color format of a given `string` or `object`, and return `null` for invalid colors. */
  const getFormat = (
    color: SupportedColorFormats
  ): ColorFormats | 'named' | null => {
    // color int
    if (typeof color === 'number') {
      // eslint-disable-next-line no-bitwise
      if (color >>> 0 === color && color >= 0 && color <= 0xffffffff)
        return 'hex8';
      return null;
    }

    // color string
    if (typeof color === 'string') {
      color = color.trim().toLowerCase();
      if (NAMED_COLORS.hasOwnProperty(color)) return 'named';

      for (const key in COLORS_REGEX) {
        const format = key as ColorFormats;
        const entry = COLORS_REGEX[format];
        if (Array.isArray(entry)) {
          for (let i = 0; i < entry.length; i++) {
            const regex = entry[i];
            if (regex && regex.test(color)) return format;
          }
          continue;
        }
        if (entry.test(color)) return format;
      }
    }

    // color object
    if (typeof color === 'object') {
      const rgbaKeys = ['r', 'g', 'b', 'a'] as (keyof rgbaT)[];
      const isRgbaOb = rgbaKeys.every(
        (k) =>
          color.hasOwnProperty(k) && typeof (color as rgbaT)[k] === 'number'
      );
      if (isRgbaOb) return 'rgba';

      const rgbKeys = ['r', 'g', 'b'] as (keyof rgbT)[];
      const isRgbOb = rgbKeys.every(
        (k) => color.hasOwnProperty(k) && typeof (color as rgbT)[k] === 'number'
      );
      if (isRgbOb) return 'rgb';

      const hslaKeys = ['h', 's', 'l', 'a'] as (keyof hslaT)[];
      const isHslaOb = hslaKeys.every(
        (k) =>
          color.hasOwnProperty(k) && typeof (color as hslaT)[k] === 'number'
      );
      if (isHslaOb) return 'hsla';

      const hslKeys = ['h', 's', 'l'] as (keyof hslT)[];
      const isHslOb = hslKeys.every(
        (k) => color.hasOwnProperty(k) && typeof (color as hslT)[k] === 'number'
      );
      if (isHslOb) return 'hsl';

      const hsvaKeys = ['h', 's', 'v', 'a'] as (keyof hsvaT)[];
      const isHsvaOb = hsvaKeys.every(
        (k) =>
          color.hasOwnProperty(k) && typeof (color as hsvaT)[k] === 'number'
      );
      if (isHsvaOb) return 'hsva';

      const hsvKeys = ['h', 's', 'v'] as (keyof hsvT)[];
      const isHsvOb = hsvKeys.every(
        (k) => color.hasOwnProperty(k) && typeof (color as hsvT)[k] === 'number'
      );
      if (isHsvOb) return 'hsv';

      const hwbaKeys = ['h', 'w', 'b', 'a'] as (keyof hwbaT)[];
      const isHwbaOb = hwbaKeys.every(
        (k) =>
          color.hasOwnProperty(k) && typeof (color as hwbaT)[k] === 'number'
      );
      if (isHwbaOb) return 'hwba';

      const hwbKeys = ['h', 'w', 'b'] as (keyof hwbT)[];
      const isHwbOb = hwbKeys.every(
        (k) => color.hasOwnProperty(k) && typeof (color as hwbT)[k] === 'number'
      );
      if (isHwbOb) return 'hwb';
    }

    return null;
  };

  /** - Get the `red` channel value of a given color. */
  const getRed = (color: SupportedColorFormats): number => {
    const { r } = RGB(color).object();
    return r;
  };

  /** - Get the `green` channel value of a given color. */
  const getGreen = (color: SupportedColorFormats): number => {
    const { g } = RGB(color).object();
    return g;
  };

  /** - Get the `blue` channel value of a given color. */
  const getBlue = (color: SupportedColorFormats): number => {
    const { b } = RGB(color).object();
    return b;
  };

  /** - Get the `hue` channel value of a given color. */
  const getHue = (color: SupportedColorFormats): number => {
    const { h } = HSL(color).object();
    return h;
  };

  /** - Get the `saturation` value of a given color. */
  const getSaturation = (color: SupportedColorFormats): number => {
    const { s } = HSL(color).object();
    return s;
  };

  /**
   * - Get color's HSL `luminosity` channel value.
   * - If you want the overall `luminosity` of a color use `getLuminanceWCAG` method.
   */
  const getLuminance = (color: SupportedColorFormats): number => {
    const { l } = HSL(color).object();
    return l;
  };

  /** - Get the HSV's `value` (brightness) channel value of a given color. */
  const getBrightness = (color: SupportedColorFormats): number => {
    const { v } = HSV(color).object();
    return v;
  };

  /** - Returns the perceived `luminance` of a color, from `0-1` as defined by Web Content Accessibility Guidelines (Version 2.0). */
  const getLuminanceWCAG = (color: SupportedColorFormats): number => {
    const { r, g, b } = RGB(color).object(false);
    const a = [r, g, b].map((v) =>
      v / 255 <= 0.03928
        ? v / 255 / 12.92
        : Math.pow((v / 255 + 0.055) / 1.055, 2.4)
    );
    return (a[0] || 0) * 0.2126 + (a[1] || 0) * 0.7152 + (a[2] || 0) * 0.0722;
  };

  /** - Returns a boolean indicating whether the color is considered "dark" or not */
  const isDark = (color: SupportedColorFormats): boolean => {
    const luminance = getLuminanceWCAG(color);
    return luminance < 0.5;
  };

  /** - Returns a boolean indicating whether the color is considered "light" or not */
  const isLight = (color: SupportedColorFormats): boolean => {
    const luminance = getLuminanceWCAG(color);
    return luminance >= 0.5;
  };

  /**
   * - Check if two colors are similar within a specified tolerance.
   *
   * @example
   *   const tolerance = 0;
   *   const isEqual = colorKit.areColorsEqual('#f00', 'red', tolerance); // true
   */
  const areColorsEqual = (
    color1: SupportedColorFormats,
    color2: SupportedColorFormats,
    tolerance = 0
  ): boolean => {
    const rgb1 = RGB(color1).object();
    const rgb2 = RGB(color2).object();

    const deltaR = rgb1.r - rgb2.r;
    const deltaG = rgb1.g - rgb2.g;
    const deltaB = rgb1.b - rgb2.b;
    const difference = Math.sqrt(
      deltaR * deltaR + deltaG * deltaG + deltaB * deltaB
    );

    return difference <= tolerance;
  };

  /** - Calculates the contrast ratio between two colors, useful for ensuring accessibility and readability. */
  const contrastRatio = (
    color1: SupportedColorFormats,
    color2: SupportedColorFormats
  ): number => {
    const luminance1 = getLuminanceWCAG(color1);
    const luminance2 = getLuminanceWCAG(color2);
    const contrast =
      (Math.max(luminance1, luminance2) + 0.05) /
      (Math.min(luminance1, luminance2) + 0.05);
    return Math.round(contrast * 100) / 100;
  };

  // * MARK: Color Manipulation

  const returnColorObject = (color: SupportedColorFormats) => {
    return {
      hex() {
        return HEX(color);
      },
      rgb() {
        return RGB(color);
      },
      hsl() {
        return HSL(color);
      },
      hsv() {
        return HSV(color);
      },
      hwb() {
        return HWB(color);
      },
    };
  };

  // * MARK: Red Manuipulation
  /** Set the `red` value of a color to a specific amount. */
  const setRed = (
    color: SupportedColorFormats,
    amount: number
  ): ConversionMethods => {
    const { g, b, a } = RGB(color).object();
    const newR = clampRGB(amount);
    const newColor = { r: newR, g, b, a };

    return returnColorObject(newColor);
  };

  /**
   * Increase the `red` value of a color by the given percentage/amount.
   *
   * @example
   *   increaseRed('rgb(100, 100, 100)', 20).hex();
   *   increaseRed('rgb(100, 100, 100)', '20%').rgb().string();
   */
  const increaseRed = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { r, g, b, a } = RGB(color).object();
    const red =
      typeof amount === 'string'
        ? r + r * (parseFloat(amount) / 100)
        : r + amount;
    const newR = clampRGB(red);
    const newColor = { r: newR, g, b, a };

    return returnColorObject(newColor);
  };

  /**
   * Decrease the `red` value of a color by the given percentage/amount
   *
   * @example
   *   decreaseRed('rgb(100, 100, 100)', 20).hex();
   *   decreaseRed('rgb(100, 100, 100)', '20%').rgb().string();
   */
  const decreaseRed = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { r, g, b, a } = RGB(color).object();
    const red =
      typeof amount === 'string'
        ? r - r * (parseFloat(amount) / 100)
        : r - amount;
    const newR = clampRGB(red);
    const newColor = { r: newR, g, b, a };

    return returnColorObject(newColor);
  };

  // * MARK: Green Manuipulation
  /** - Set the `green` value of a color to a specific amount. */
  const setGreen = (
    color: SupportedColorFormats,
    amount: number
  ): ConversionMethods => {
    const { r, b, a } = RGB(color).object();
    const newG = clampRGB(amount);
    const newColor = { r, g: newG, b, a };

    return returnColorObject(newColor);
  };

  /**
   * Increase the `green` value of a color by the given percentage.
   *
   * @example
   *   increaseGreen('rgb(100, 100, 100)', 20).hex();
   *   increaseGreen('rgb(100, 100, 100)', '20%').rgb().string();
   */
  const increaseGreen = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { r, g, b, a } = RGB(color).object();
    const green =
      typeof amount === 'string'
        ? g + g * (parseFloat(amount) / 100)
        : g + amount;
    const newG = clampRGB(green);
    const newColor = { r, g: newG, b, a };

    return returnColorObject(newColor);
  };

  /**
   * Decrease the `green` value of a color by the given percentage.
   *
   * @example
   *   decreaseGreen('rgb(100, 100, 100)', 20).hex();
   *   decreaseGreen('rgb(100, 100, 100)', '20%').rgb().string();
   */
  const decreaseGreen = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { r, g, b, a } = RGB(color).object();
    const green =
      typeof amount === 'string'
        ? g - g * (parseFloat(amount) / 100)
        : g - amount;
    const newG = clampRGB(green);
    const newColor = { r, g: newG, b, a };

    return returnColorObject(newColor);
  };

  // * MARK: Blue Manuipulation
  /** - Set the `blue` value of a color to a specific amount. */
  const setBlue = (
    color: SupportedColorFormats,
    amount: number
  ): ConversionMethods => {
    const { r, g, a } = RGB(color).object();
    const newB = clampRGB(amount);
    const newColor = { r, g, b: newB, a };

    return returnColorObject(newColor);
  };

  /**
   * Increase the `blue` value of a color by the given percentage.
   *
   * @example
   *   increaseBlue('rgb(100, 100, 100)', 20).hex();
   *   increaseBlue('rgb(100, 100, 100)', '20%').rgb().string();
   */
  const increaseBlue = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { r, g, b, a } = RGB(color).object();
    const blue =
      typeof amount === 'string'
        ? b + b * (parseFloat(amount) / 100)
        : b + amount;
    const newB = clampRGB(blue);
    const newColor = { r, g, b: newB, a };

    return returnColorObject(newColor);
  };

  /**
   * Decrease the `blue` value of a color by the given percentage.
   *
   * @example
   *   decreaseBlue('rgb(100, 100, 100)', 20).hex();
   *   decreaseBlue('rgb(100, 100, 100)', '20%').rgb().string();
   */
  const decreaseBlue = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { r, g, b, a } = RGB(color).object();
    const blue =
      typeof amount === 'string'
        ? b - b * (parseFloat(amount) / 100)
        : b - amount;
    const newB = clampRGB(blue);
    const newColor = { r, g, b: newB, a };

    return returnColorObject(newColor);
  };

  //* MARK: Alpha Manuipulation
  /** - Get the `alpha` value of a given color. */
  const getAlpha = (color: SupportedColorFormats): number => {
    const { a } = RGB(color).object();
    return a;
  };

  /** - Set the `alpha` value of a color to a specific amount. */
  const setAlpha = (
    color: SupportedColorFormats,
    amount: number
  ): ConversionMethods => {
    const { r, g, b } = RGB(color).object();
    const newA = clampAlpha(amount);
    const newColor = { r, g, b, a: newA };

    return returnColorObject(newColor);
  };

  /** Increase the `alpha` value of a color by the given percentage. */
  const increaseAlpha = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { r, g, b, a } = RGB(color).object();
    const alpha =
      typeof amount === 'string'
        ? a + a * (parseFloat(amount) / 100)
        : a + amount;
    const newA = clampAlpha(alpha);
    const newColor = { r, g, b, a: newA };

    return returnColorObject(newColor);
  };

  /** Decrease the `alpha` value of a color by the given percentage. */
  const decreaseAlpha = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { r, g, b, a } = RGB(color).object();
    const alpha =
      typeof amount === 'string'
        ? a - a * (parseFloat(amount) / 100)
        : a - amount;
    const newA = clampAlpha(alpha);
    const newColor = { r, g, b, a: newA };

    return returnColorObject(newColor);
  };

  // * MARK: Hue Manuipulation
  /** - Set the `hue` value of a color to a specific amount. */
  const setHue = (
    color: SupportedColorFormats,
    amount: number
  ): ConversionMethods => {
    const { s, l, a } = HSL(color).object();
    const newH = clampHue(amount);
    const newColor = { h: newH, s, l, a };

    return returnColorObject(newColor);
  };

  /**
   * Increase the `hue` value of a color by the given percentage/amount.
   *
   * @example
   *   increaseHue('rgb(100, 100, 100)', 20).hex();
   *   increaseHue('rgb(100, 100, 100)', '20%').rgb().string();
   */
  const increaseHue = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { h, s, l, a } = HSL(color).object();
    const hue =
      typeof amount === 'string'
        ? h + h * (parseFloat(amount) / 100)
        : h + amount;
    const newH = clampHue(hue);
    const newColor = { h: newH, s, l, a };

    return returnColorObject(newColor);
  };

  /**
   * Decrease the `hue` value of a color by the given percentage/amount.
   *
   * @example
   *   decreaseHue('rgb(100, 100, 100)', 20).hex();
   *   decreaseHue('rgb(100, 100, 100)', '20%').rgb().string();
   */
  const decreaseHue = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { h, s, l, a } = HSL(color).object();
    const hue =
      typeof amount === 'string'
        ? h - h * (parseFloat(amount) / 100)
        : h - amount;
    const newH = clampHue(hue);
    const newColor = { h: newH, s, l, a };

    return returnColorObject(newColor);
  };

  /**
   * - Spin the `hue` channel by a certain percentage/amount.
   *
   * @example
   *   spin('red', 20).hex();
   *   spin('rgb(255, 0, 0)', '20%').rgb().string();
   */
  const spin = (
    color: SupportedColorFormats,
    degree: number | string
  ): ConversionMethods => {
    const { h, s, l, a } = HSL(color).object();
    const spinDegree =
      typeof degree === 'string' ? s * (parseFloat(degree) / 100) : degree;
    const newColor = { h: Math.round((h + spinDegree) % 360), s, l, a };

    return returnColorObject(newColor);
  };

  // * MARK: Saturation Manuipulation
  /** - Set the `saturation` value of a color to a specific amount. */
  const setSaturation = (
    color: SupportedColorFormats,
    amount: number
  ): ConversionMethods => {
    const { h, l, a } = HSL(color).object();
    const newS = clamp100(amount);
    const saturatedColor = { h, s: newS, l, a };

    return returnColorObject(saturatedColor);
  };

  /**
   * - Increase the saturation of the given color by a certain percentage/amount.
   *
   * @example
   *   saturate('red', 20).hex();
   *   saturate('rgb(255, 0, 0)', '20%').rgb().string();
   */
  const saturate = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { h, s, l, a } = HSL(color).object();
    const saturation =
      typeof amount === 'string'
        ? s + s * (parseFloat(amount) / 100)
        : s + amount;
    const newS = clamp100(saturation);
    const saturatedColor = { h, s: newS, l, a };

    return returnColorObject(saturatedColor);
  };

  /**
   * - Decrease the saturation of the given color by a certain percentage/amount.
   *
   * @example
   *   saturate('red', 20).hex();
   *   saturate('rgb(255, 0, 0)', '20%').rgb().string();
   */
  const desaturate = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { h, s, l, a } = HSL(color).object();
    const saturation =
      typeof amount === 'string'
        ? s - s * (parseFloat(amount) / 100)
        : s - amount;
    const newS = clamp100(saturation);
    const desaturatedColor = { h, s: newS, l, a };

    return returnColorObject(desaturatedColor);
  };

  // * MARK: Brightness Manuipulation
  /** - Set HSL's `luminosity` channel for a given color to a specific amount. */
  const setLuminance = (
    color: SupportedColorFormats,
    amount: number
  ): ConversionMethods => {
    const { h, s, a } = HSL(color).object();
    const newL = clamp100(amount);
    const newColor = { h, s, l: newL, a };

    return returnColorObject(newColor);
  };

  /**
   * - Increase the brightness of the given color by a certain percentage/amount.
   *
   * @example
   *   brighten('red', 20).hex();
   *   brighten('rgb(255, 0, 0)', '20%').rgb().string();
   */
  const brighten = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { h, s, l, a } = HSL(color).object();
    const lum =
      typeof amount === 'string'
        ? l + l * (parseFloat(amount) / 100)
        : l + amount;
    const newL = clamp100(lum);
    const brightenedColor = { h, s, l: newL, a };

    return returnColorObject(brightenedColor);
  };

  /**
   * - Decrease the brightness of the given color by a certain percentage/amount.
   *
   * @example
   *   darken('red', 20).hex();
   *   darken('rgb(255, 0, 0)', '20%').rgb().string();
   */
  const darken = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { h, s, l, a } = HSL(color).object();
    const lum =
      typeof amount === 'string'
        ? l - l * (parseFloat(amount) / 100)
        : l - amount;
    const newL = clamp100(lum);
    const darkenedColor = { h, s, l: newL, a };

    return returnColorObject(darkenedColor);
  };

  /** - Set HSV's `value` (brightness) channel for a given color to a specific amount. */
  const setBrightness = (
    color: SupportedColorFormats,
    amount: number
  ): ConversionMethods => {
    const { h, s, a } = HSV(color).object();
    const newV = clamp100(amount);
    const newColor = { h, s, v: newV, a };

    return returnColorObject(newColor);
  };

  /** Increase HSV's `value` (brightness) channel value of a color by the given percentage/amount. */
  const increaseBrightness = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { h, s, v, a } = HSV(color).object();
    const value =
      typeof amount === 'string'
        ? v + v * (parseFloat(amount) / 100)
        : v + amount;
    const newV = clamp100(value);
    const newColor = { h, s, v: newV, a };

    return returnColorObject(newColor);
  };

  /** Decrease HSV's `value` (brightness) channel value of a color by the given percentage/amount. */
  const decreaseBrightness = (
    color: SupportedColorFormats,
    amount: number | string
  ): ConversionMethods => {
    const { h, s, v, a } = HSV(color).object();
    const value =
      typeof amount === 'string'
        ? v - v * (parseFloat(amount) / 100)
        : v - amount;
    const newV = clamp100(value);
    const newColor = { h, s, v: newV, a };

    return returnColorObject(newColor);
  };

  // * MARK: Color Utilities

  /**
   * - Blends two colors by a certain amount.
   *
   * @example
   *   blend('yellow', 'red', 50).hex(); // #ff8000
   */
  const blend = (
    color1: SupportedColorFormats,
    color2: SupportedColorFormats,
    percentage: number
  ): ConversionMethods => {
    percentage = percentage / 100;

    const rgba1 = RGB(color1).object();
    const rgba2 = RGB(color2).object();

    const r = clampRGB(rgba1.r * (1 - percentage) + rgba2.r * percentage),
      g = clampRGB(rgba1.g * (1 - percentage) + rgba2.g * percentage),
      b = clampRGB(rgba1.b * (1 - percentage) + rgba2.b * percentage),
      a = clampAlpha(rgba1.a * (1 - percentage) + rgba2.a * percentage);

    const blendedColor = { r, g, b, a };

    return returnColorObject(blendedColor);
  };

  /** - Invert (negate) a color, black becomes white, white becomes black, blue becomes orange and so on. */
  const invert = (color: SupportedColorFormats): ConversionMethods => {
    const { r, g, b, a } = RGB(color).object();
    const invertedColor = { r: 255 - r, g: 255 - g, b: 255 - b, a };
    return returnColorObject(invertedColor);
  };

  /** - Completely desaturate a color into grayscale. */
  const grayscale = (color: SupportedColorFormats): ConversionMethods => {
    const { r, g, b, a } = RGB(color).object();
    const gray = clampRGB(r * 0.3 + g * 0.59 + b * 0.11);
    const grayColor = { r: gray, g: gray, b: gray, a };

    return returnColorObject(grayColor);
  };

  /** - Generate a random color from `HSL` values. */
  const randomHslColor = ({
    h = [0, 360],
    s = [0, 100],
    l = [0, 100],
    a = [1, 1],
  } = {}): ConversionMethods => {
    const random = {
      h: clampHue(randomNumber(h[0] ?? 0, h[1] ?? 360)),
      s: clamp100(randomNumber(s[0] ?? 0, s[1] ?? 100)),
      l: clamp100(randomNumber(l[0] ?? 0, l[1] ?? 100)),
      a: clampAlpha(randomNumber(a[0] ?? 1, a[1] ?? 1)),
    };

    return returnColorObject(random);
  };

  /** - Generate a random color from `HSV` values. */
  const randomHsvColor = ({
    h = [0, 360],
    s = [0, 100],
    v = [0, 100],
    a = [1, 1],
  } = {}): ConversionMethods => {
    const random = {
      h: clampHue(randomNumber(h[0] ?? 0, h[1] ?? 360)),
      s: clamp100(randomNumber(s[0] ?? 0, s[1] ?? 100)),
      v: clamp100(randomNumber(v[0] ?? 0, v[1] ?? 100)),
      a: clampAlpha(randomNumber(a[0] ?? 1, a[1] ?? 1)),
    };

    return returnColorObject(random);
  };

  /** - Generate a random color from `RGB` values. */
  const randomRgbColor = ({
    r = [0, 255],
    g = [0, 255],
    b = [0, 255],
    a = [1, 1],
  } = {}): ConversionMethods => {
    const random = {
      r: clampRGB(randomNumber(r[0] ?? 0, r[1] ?? 255)),
      g: clampRGB(randomNumber(g[0] ?? 0, g[1] ?? 255)),
      b: clampRGB(randomNumber(b[0] ?? 0, b[1] ?? 255)),
      a: clampAlpha(randomNumber(a[0] ?? 1, a[1] ?? 1)),
    };

    return returnColorObject(random);
  };

  /** - Generate a random color from `HWB` values. */
  const randomHwbColor = ({
    h = [0, 360],
    w = [0, 100],
    b = [0, 100],
    a = [1, 1],
  } = {}): ConversionMethods => {
    const random = {
      h: clampHue(randomNumber(h[0] ?? 0, h[1] ?? 360)),
      w: clamp100(randomNumber(w[0] ?? 0, w[1] ?? 100)),
      b: clamp100(randomNumber(b[0] ?? 0, b[1] ?? 100)),
      a: clampAlpha(randomNumber(a[0] ?? 1, a[1] ?? 1)),
    };

    return returnColorObject(random);
  };

  /** - Returns the first color with the desired contrast ratio against the second color */
  const adjustContrast = (
    color1: SupportedColorFormats,
    color2: SupportedColorFormats,
    ratio = 4.5
  ): ConversionMethods => {
    const contrast = contrastRatio(color1, color2);
    const color1RGB = RGB(color1).object();
    const channels = ['r', 'g', 'b'] as const;

    function adjustLuminance(colorRGB: rgbaT, by: number) {
      const r = clampRGB(colorRGB.r + by);
      const g = clampRGB(colorRGB.g + by);
      const b = clampRGB(colorRGB.b + by);
      return { r, g, b, a: colorRGB.a };
    }

    let newColor = color1RGB;

    //* increase contrast
    if (ratio && contrast < ratio) {
      while (contrastRatio(newColor, color2) < ratio) {
        const adjustBy = isDark(color2) ? 1 : -1; // increase or decrease relative to the background color
        newColor = adjustLuminance(newColor, adjustBy);

        // break if the color reached the limit
        if (channels.every((e) => newColor[e] === 0)) break;
        if (channels.every((e) => newColor[e] === 255)) break;
      }
      //* decrease contrast
    } else if (ratio && contrast > ratio) {
      while (contrastRatio(newColor, color2) > ratio) {
        const adjustBy = !isDark(color2) ? 1 : -1; // increase or decrease relative to the background color
        newColor = adjustLuminance(newColor, adjustBy);

        // break if the color reached the limit
        if (channels.every((e) => newColor[e] === 0)) break;
        if (channels.every((e) => newColor[e] === 255)) break;
      }
    }

    return returnColorObject(newColor);
  };

  return {
    // color conversion
    HEX,
    RGB,
    HSL,
    HWB,
    HSV,
    // color information
    getFormat,
    getRed,
    getGreen,
    getBlue,
    getHue,
    getSaturation,
    getBrightness,
    getLuminance,
    getLuminanceWCAG,
    isDark,
    isLight,
    areColorsEqual,
    contrastRatio,

    // color manipulation
    setRed,
    increaseRed,
    decreaseRed,

    setGreen,
    increaseGreen,
    decreaseGreen,

    setBlue,
    increaseBlue,
    decreaseBlue,

    getAlpha,
    setAlpha,
    increaseAlpha,
    decreaseAlpha,

    setHue,
    increaseHue,
    decreaseHue,
    spin,

    setSaturation,
    saturate,
    desaturate,

    setLuminance,
    brighten,
    darken,
    setBrightness,
    increaseBrightness,
    decreaseBrightness,

    // color utilities
    blend,
    invert,
    grayscale,
    randomHslColor,
    randomHsvColor,
    randomRgbColor,
    randomHwbColor,
    adjustContrast,
  };
};

type ColorKit = ReturnType<typeof colorKitUI> & {
  /** - Initiates the asynchronous execution of a workletized colorKit function on the UI thread. */
  runOnUI: typeof colorKitUI;
};

const colorKit = colorKitUI() as ColorKit;
colorKit.runOnUI = colorKitUI;
export default colorKit;
