import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * NodesRight icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const NodesRightIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M11 2.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M14 4a3 3 0 1 0-5.895.79L6.15 5.908a3 3 0 1 0 0 4.185l1.955 1.117A3.003 3.003 0 0 0 11 15a3 3 0 1 0-2.15-5.092L6.895 8.79a3 3 0 0 0 0-1.58L8.85 6.092A3 3 0 0 0 14 4m-3 6.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M2.5 8a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * NodesRight icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <NodesRightIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <NodesRightIcon size={48} color="#3b82f6" />
 * ```
 */
export const NodesRightIcon = withUniwind(NodesRightIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
