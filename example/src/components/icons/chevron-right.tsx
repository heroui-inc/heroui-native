import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * ChevronRight icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const ChevronRightIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M5.47 13.03a.75.75 0 0 1 0-1.06L9.44 8L5.47 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * ChevronRight icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <ChevronRightIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <ChevronRightIcon size={48} color="#3b82f6" />
 * ```
 */
export const ChevronRightIcon = withUniwind(ChevronRightIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
