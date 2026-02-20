import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * Palette icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const PaletteIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.012 10c.431.004.764-.15 1.002-.411c.244-.268.486-.762.486-1.589a5.5 5.5 0 1 0-5.17 5.491a4.3 4.3 0 0 1-.106-.89a2.37 2.37 0 0 1 .495-1.48c.386-.493.92-.763 1.448-.914C10.69 10.06 11.303 10 12 10zM8.43 14.01v-.005zM12 11.5c1.66.013 3-1.25 3-3.5a7 7 0 1 0-7 7c2.19 0 2.011-.83 1.827-1.68c-.194-.898-.393-1.82 2.173-1.82M9 5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m2 2.75a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4.75-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0M5.75 11a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
      />
    </Svg>
  );
};

/**
 * Palette icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <PaletteIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <PaletteIcon size={48} color="#3b82f6" />
 * ```
 */
export const PaletteIcon = withUniwind(PaletteIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
