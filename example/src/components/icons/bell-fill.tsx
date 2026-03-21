import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * BellFill icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const BellFillIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        d="M9.955 13.416a2 2 0 0 1-3.911 0c1.3.141 2.611.141 3.911 0M8 1a4.27 4.27 0 0 1 4.187 3.432l.619 3.096c.127.634.438 1.216.895 1.673l.436.436a1.24 1.24 0 0 1-.598 2.085l-1.462.338a18.1 18.1 0 0 1-8.154 0l-1.462-.338a1.24 1.24 0 0 1-.598-2.085L2.3 9.2a3.27 3.27 0 0 0 .895-1.673l.62-3.096A4.27 4.27 0 0 1 8 1"
      />
    </Svg>
  );
};

/**
 * BellFill icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <BellFillIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <BellFillIcon size={48} color="#3b82f6" />
 * ```
 */
export const BellFillIcon = withUniwind(BellFillIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
