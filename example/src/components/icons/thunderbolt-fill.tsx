import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * ThunderboltFill icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const ThunderboltFillIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        d="m14.61 6.914l-7.632 8.08a1.614 1.614 0 0 1-2.69-1.66L5.5 10H2.677A1.677 1.677 0 0 1 1.12 7.7l2.323-5.807A2.22 2.22 0 0 1 5.5.5h4c.968 0 1.637.967 1.298 1.873L10 4.5h3.569a1.431 1.431 0 0 1 1.04 2.414"
      />
    </Svg>
  );
};

/**
 * ThunderboltFill icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <ThunderboltFillIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <ThunderboltFillIcon size={48} color="#3b82f6" />
 * ```
 */
export const ThunderboltFillIcon = withUniwind(ThunderboltFillIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
