/**
 * Converts HSL color string to RGBA with specified alpha
 * @param hsl - HSL color string in format "hsl(h s% l%)"
 * @param alpha - Alpha value between 0 and 1
 * @returns RGBA color string in format "rgba(r, g, b, a)"
 */
export function hslToRgba(hsl: string, alpha: number): string {
  // Extract HSL values from string
  const match = hsl.match(/hsl\(([^,\s]+)\s+([^%]+)%\s+([^%]+)%\)/);
  if (!match) {
    throw new Error(`Invalid HSL format: ${hsl}`);
  }

  const h = parseFloat(match[1]!);
  const s = parseFloat(match[2]!) / 100;
  const l = parseFloat(match[3]!) / 100;

  // Convert HSL to RGB
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // Convert to 0-255 range
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
