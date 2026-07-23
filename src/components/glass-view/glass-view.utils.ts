/**
 * Parsed RGBA color channels. RGB channels are 0–255; alpha is 0–1.
 */
type RgbaChannels = {
  r: number;
  g: number;
  b: number;
  a: number;
};

/**
 * Expands a single hex digit to two digits (`f` → `ff`).
 */
function expandHexDigit(digit: string): string {
  return `${digit}${digit}`;
}

/**
 * Parses a `#rgb`, `#rrggbb`, or `#rrggbbaa` color string into RGBA channels.
 * Returns `null` when the string is not a valid hex color.
 */
function parseHexColor(color: string): RgbaChannels | null {
  const hex = color.slice(1);

  if (hex.length === 3) {
    const r = Number.parseInt(expandHexDigit(hex[0] ?? ''), 16);
    const g = Number.parseInt(expandHexDigit(hex[1] ?? ''), 16);
    const b = Number.parseInt(expandHexDigit(hex[2] ?? ''), 16);
    if ([r, g, b].some((channel) => Number.isNaN(channel))) {
      return null;
    }
    return { r, g, b, a: 1 };
  }

  if (hex.length === 6 || hex.length === 8) {
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    if ([r, g, b].some((channel) => Number.isNaN(channel))) {
      return null;
    }
    if (hex.length === 6) {
      return { r, g, b, a: 1 };
    }
    const alphaByte = Number.parseInt(hex.slice(6, 8), 16);
    if (Number.isNaN(alphaByte)) {
      return null;
    }
    return { r, g, b, a: alphaByte / 255 };
  }

  return null;
}

/**
 * Parses an `rgb(...)` or `rgba(...)` color string into RGBA channels.
 * Returns `null` when the string is not a valid rgb/rgba color.
 */
function parseRgbColor(color: string): RgbaChannels | null {
  const match = color.match(
    /^rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*(?:,\s*([0-9.]+)\s*)?\)$/i
  );
  if (!match) {
    return null;
  }

  const r = Number.parseFloat(match[1] ?? '');
  const g = Number.parseFloat(match[2] ?? '');
  const b = Number.parseFloat(match[3] ?? '');
  const a = match[4] === undefined ? 1 : Number.parseFloat(match[4]);

  if ([r, g, b, a].some((channel) => Number.isNaN(channel))) {
    return null;
  }

  return { r, g, b, a };
}

/**
 * Parses a percentage-or-number token (`80%` → 0.8 with `percentScale` 0.01,
 * `0.8` → 0.8). Returns `null` for invalid numbers.
 */
function parseScaledNumber(token: string, percentScale: number): number | null {
  const isPercent = token.endsWith('%');
  const numeric = Number.parseFloat(isPercent ? token.slice(0, -1) : token);
  if (Number.isNaN(numeric)) {
    return null;
  }
  return isPercent ? numeric * percentScale : numeric;
}

/**
 * Parses an `oklch(L C H / A)` color string into RGBA channels, converting
 * through OKLab → LMS → linear sRGB per the OKLab reference implementation.
 * Returns `null` when the string is not a valid oklch color.
 *
 * Needed on web, where uniwind resolves theme variables via
 * `getComputedStyle` and custom properties keep their authored `oklch(...)`
 * form instead of being converted to rgb.
 */
function parseOklchColor(color: string): RgbaChannels | null {
  const match = color.match(
    /^oklch\(\s*([0-9.]+%?)\s+([0-9.]+%?)\s+(-?[0-9.]+)(?:deg)?\s*(?:\/\s*([0-9.]+%?)\s*)?\)$/i
  );
  if (!match) {
    return null;
  }

  /** Lightness: `100%` → 1; chroma percentage maps `100%` → 0.4 per spec. */
  const lightness = parseScaledNumber(match[1] ?? '', 0.01);
  const chroma = parseScaledNumber(match[2] ?? '', 0.004);
  const hueDegrees = Number.parseFloat(match[3] ?? '');
  const alpha = match[4] === undefined ? 1 : parseScaledNumber(match[4], 0.01);

  if (
    lightness === null ||
    chroma === null ||
    Number.isNaN(hueDegrees) ||
    alpha === null
  ) {
    return null;
  }

  const hueRadians = (hueDegrees * Math.PI) / 180;
  const labA = chroma * Math.cos(hueRadians);
  const labB = chroma * Math.sin(hueRadians);

  const lPrime = lightness + 0.3963377774 * labA + 0.2158037573 * labB;
  const mPrime = lightness - 0.1055613458 * labA - 0.0638541728 * labB;
  const sPrime = lightness - 0.0894841775 * labA - 1.291485548 * labB;

  const l = lPrime ** 3;
  const m = mPrime ** 3;
  const s = sPrime ** 3;

  const linearR = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const linearG = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const linearBChannel = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const toGammaByte = (channel: number): number =>
    Math.min(255, Math.max(0, linearChannelToSrgb(channel)));

  return {
    r: toGammaByte(linearR),
    g: toGammaByte(linearG),
    b: toGammaByte(linearBChannel),
    a: Math.min(1, Math.max(0, alpha)),
  };
}

/**
 * Parses a CSS color string returned by `useThemeColor` into RGBA channels.
 * Supports `#rgb`, `#rrggbb`, `#rrggbbaa`, `rgb()`, `rgba()`, and
 * `oklch()` (the form web custom properties resolve to).
 * Returns `null` when the format is unsupported or invalid.
 */
function parseColor(color: string): RgbaChannels | null {
  const trimmed = color.trim();
  if (trimmed.length === 0) {
    return null;
  }
  if (trimmed.startsWith('#')) {
    return parseHexColor(trimmed);
  }
  if (trimmed.toLowerCase().startsWith('rgb')) {
    return parseRgbColor(trimmed);
  }
  if (trimmed.toLowerCase().startsWith('oklch')) {
    return parseOklchColor(trimmed);
  }
  return null;
}

/**
 * Formats RGB channels as a 6-digit opaque hex string (`#rrggbb`).
 */
function toOpaqueHex(r: number, g: number, b: number): string {
  const toByte = (channel: number): string =>
    Math.round(Math.min(255, Math.max(0, channel)))
      .toString(16)
      .padStart(2, '0');
  return `#${toByte(r)}${toByte(g)}${toByte(b)}`;
}

/**
 * Converts a gamma-encoded sRGB channel (0–255) to linear-light (0–1),
 * per the IEC 61966-2-1 sRGB transfer function.
 */
function srgbChannelToLinear(channel: number): number {
  const normalized = channel / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4);
}

/**
 * Converts a linear-light channel (0–1) back to gamma-encoded sRGB (0–255),
 * per the IEC 61966-2-1 sRGB transfer function.
 */
function linearChannelToSrgb(channel: number): number {
  const encoded =
    channel <= 0.0031308
      ? channel * 12.92
      : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
  return encoded * 255;
}

/**
 * Alpha-composites a foreground color over an opaque background and returns
 * the resulting opaque hex (`#rrggbb`).
 *
 * Used by `GlassView` on platforms without native backdrop blur: the glass
 * tint (e.g. `#ffffffbf`) is flattened over the theme `--background` so the
 * fallback layer approximates the frosted look without translucency.
 *
 * Channels are blended in linear-light space (sRGB values are decoded before
 * the lerp and re-encoded after). Blending gamma-encoded values directly
 * biases the mix darker whenever a light tint sits over a darker backdrop;
 * linear-light compositing is the physically correct model of light passing
 * through a translucent layer and better matches the native blur result.
 *
 * Returns `color` unchanged when either string cannot be parsed.
 *
 * @param color - Foreground color (may include alpha), from `useThemeColor`
 * @param background - Opaque background color to composite onto
 * @returns Opaque hex string approximating the composited result
 */
export function flattenColorOverBackground(
  color: string,
  background: string
): string {
  const foreground = parseColor(color);
  const backdrop = parseColor(background);

  if (!foreground || !backdrop) {
    return color;
  }

  const alpha = foreground.a;
  const compositeChannel = (fg: number, bg: number): number =>
    linearChannelToSrgb(
      alpha * srgbChannelToLinear(fg) + (1 - alpha) * srgbChannelToLinear(bg)
    );

  return toOpaqueHex(
    compositeChannel(foreground.r, backdrop.r),
    compositeChannel(foreground.g, backdrop.g),
    compositeChannel(foreground.b, backdrop.b)
  );
}
