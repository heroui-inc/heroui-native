import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * Magnifier icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const MagnifierIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M11.5 7a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-.82 4.74a6 6 0 1 1 1.06-1.06l2.79 2.79a.75.75 0 1 1-1.06 1.06z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * Magnifier icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <MagnifierIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <MagnifierIcon size={48} color="#3b82f6" />
 * ```
 */
export const MagnifierIcon = withUniwind(MagnifierIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
