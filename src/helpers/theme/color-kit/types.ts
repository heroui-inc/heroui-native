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

type NAMED_COLORS = {
  readonly aliceblue: '#f0f8ff';
  readonly antiquewhite: '#faebd7';
  readonly aqua: '#00ffff';
  readonly aquamarine: '#7fffd4';
  readonly azure: '#f0ffff';
  readonly beige: '#f5f5dc';
  readonly bisque: '#ffe4c4';
  readonly black: '#000000';
  readonly blanchedalmond: '#ffebcd';
  readonly blue: '#0000ff';
  readonly blueviolet: '#8a2be2';
  readonly brown: '#a52a2a';
  readonly burlywood: '#deb887';
  readonly cadetblue: '#5f9ea0';
  readonly chartreuse: '#7fff00';
  readonly chocolate: '#d2691e';
  readonly coral: '#ff7f50';
  readonly cornflowerblue: '#6495ed';
  readonly cornsilk: '#fff8dc';
  readonly crimson: '#dc143c';
  readonly cyan: '#00ffff';
  readonly darkblue: '#00008b';
  readonly darkcyan: '#008b8b';
  readonly darkgoldenrod: '#b8860b';
  readonly darkgray: '#a9a9a9';
  readonly darkgreen: '#006400';
  readonly darkgrey: '#a9a9a9';
  readonly darkkhaki: '#bdb76b';
  readonly darkmagenta: '#8b008b';
  readonly darkolivegreen: '#556b2f';
  readonly darkorange: '#ff8c00';
  readonly darkorchid: '#9932cc';
  readonly darkred: '#8b0000';
  readonly darksalmon: '#e9967a';
  readonly darkseagreen: '#8fbc8f';
  readonly darkslateblue: '#483d8b';
  readonly darkslategrey: '#2f4f4f';
  readonly darkturquoise: '#00ced1';
  readonly darkviolet: '#9400d3';
  readonly deeppink: '#ff1493';
  readonly deepskyblue: '#00bfff';
  readonly dimgray: '#696969';
  readonly dimgrey: '#696969';
  readonly dodgerblue: '#1e90ff';
  readonly firebrick: '#b22222';
  readonly floralwhite: '#fffaf0';
  readonly forestgreen: '#228b22';
  readonly fuchsia: '#ff00ff';
  readonly gainsboro: '#dcdcdc';
  readonly ghostwhite: '#f8f8ff';
  readonly gold: '#ffd700';
  readonly goldenrod: '#daa520';
  readonly gray: '#808080';
  readonly green: '#008000';
  readonly greenyellow: '#adff2f';
  readonly grey: '#808080';
  readonly honeydew: '#f0fff0';
  readonly hotpink: '#ff69b4';
  readonly indianred: '#cd5c5c';
  readonly indigo: '#4b0082';
  readonly ivory: '#fffff0';
  readonly khaki: '#f0e68c';
  readonly lavender: '#e6e6fa';
  readonly lavenderblush: '#fff0f5';
  readonly lawngreen: '#7cfc00';
  readonly lemonchiffon: '#fffacd';
  readonly lightblue: '#add8e6';
  readonly lightcoral: '#f08080';
  readonly lightcyan: '#e0ffff';
  readonly lightgoldenrodyellow: '#fafad2';
  readonly lightgray: '#d3d3d3';
  readonly lightgreen: '#90ee90';
  readonly lightgrey: '#d3d3d3';
  readonly lightpink: '#ffb6c1';
  readonly lightsalmon: '#ffa07a';
  readonly lightseagreen: '#20b2aa';
  readonly lightskyblue: '#87cefa';
  readonly lightslategrey: '#778899';
  readonly lightsteelblue: '#b0c4de';
  readonly lightyellow: '#ffffe0';
  readonly lime: '#00ff00';
  readonly limegreen: '#32cd32';
  readonly linen: '#faf0e6';
  readonly magenta: '#ff00ff';
  readonly maroon: '#800000';
  readonly mediumaquamarine: '#66cdaa';
  readonly mediumblue: '#0000cd';
  readonly mediumorchid: '#ba55d3';
  readonly mediumpurple: '#9370db';
  readonly mediumseagreen: '#3cb371';
  readonly mediumslateblue: '#7b68ee';
  readonly mediumspringgreen: '#00fa9a';
  readonly mediumturquoise: '#48d1cc';
  readonly mediumvioletred: '#c71585';
  readonly midnightblue: '#191970';
  readonly mintcream: '#f5fffa';
  readonly mistyrose: '#ffe4e1';
  readonly moccasin: '#ffe4b5';
  readonly navajowhite: '#ffdead';
  readonly navy: '#000080';
  readonly oldlace: '#fdf5e6';
  readonly olive: '#808000';
  readonly olivedrab: '#6b8e23';
  readonly orange: '#ffa500';
  readonly orangered: '#ff4500';
  readonly orchid: '#da70d6';
  readonly palegoldenrod: '#eee8aa';
  readonly palegreen: '#98fb98';
  readonly paleturquoise: '#afeeee';
  readonly palevioletred: '#db7093';
  readonly papayawhip: '#ffefd5';
  readonly peachpuff: '#ffdab9';
  readonly peru: '#cd853f';
  readonly pink: '#ffc0cb';
  readonly plum: '#dda0dd';
  readonly powderblue: '#b0e0e6';
  readonly purple: '#800080';
  readonly rebeccapurple: '#663399';
  readonly red: '#ff0000';
  readonly rosybrown: '#bc8f8f';
  readonly royalblue: '#4169e1';
  readonly saddlebrown: '#8b4513';
  readonly salmon: '#fa8072';
  readonly sandybrown: '#f4a460';
  readonly seagreen: '#2e8b57';
  readonly seashell: '#fff5ee';
  readonly sienna: '#a0522d';
  readonly silver: '#c0c0c0';
  readonly skyblue: '#87ceeb';
  readonly slateblue: '#6a5acd';
  readonly slategray: '#708090';
  readonly snow: '#fffafa';
  readonly springgreen: '#00ff7f';
  readonly steelblue: '#4682b4';
  readonly tan: '#d2b48c';
  readonly teal: '#008080';
  readonly thistle: '#d8bfd8';
  readonly tomato: '#ff6347';
  readonly turquoise: '#40e0d0';
  readonly violet: '#ee82ee';
  readonly wheat: '#f5deb3';
  readonly white: '#ffffff';
  readonly whitesmoke: '#f5f5f5';
  readonly yellow: '#ffff00';
  readonly yellowgreen: '#9acd32';
};

export type ColorFormats =
  | 'hex3'
  | 'hex4'
  | 'hex6'
  | 'hex8'
  | 'hsl'
  | 'hsla'
  | 'rgb'
  | 'rgba'
  | 'hsva'
  | 'hsv'
  | 'hwba'
  | 'hwb';

export type ColorString = keyof NAMED_COLORS | (string & NonNullable<unknown>);

export type rgbaT = { r: number; g: number; b: number; a: number };
export type rgbT = Omit<rgbaT, 'a'>;

export type hslaT = { h: number; s: number; l: number; a: number };
export type hslT = Omit<hslaT, 'a'>;

export type hsvaT = { h: number; s: number; v: number; a: number };
export type hsvT = Omit<hsvaT, 'a'>;

export type hwbaT = { h: number; w: number; b: number; a: number };
export type hwbT = Omit<hwbaT, 'a'>;

export type SupportedColorFormats =
  | ColorString
  | rgbaT
  | rgbT
  | hslaT
  | hslT
  | hsvaT
  | hsvT
  | hwbaT
  | hwbT
  | number;

export type ColorTypes<T extends object> = {
  object: (roundValues?: boolean) => T;
  string: (alpha?: boolean) => string;
  array: (roundValues?: boolean) => number[];
};

export type ConversionMethods = {
  hex: () => string;
  rgb: () => ColorTypes<rgbaT>;
  hsl: () => ColorTypes<hslaT>;
  hsv: () => ColorTypes<hsvaT>;
  hwb: () => ColorTypes<hwbaT>;
};
