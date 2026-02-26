import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * SquarePlus icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const SquarePlusIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3m-3 1.5a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3zm7.25 1a.75.75 0 0 0-1.5 0v1.75H5.5a.75.75 0 1 0 0 1.5h1.75v1.75a.75.75 0 0 0 1.5 0V8.75h1.75a.75.75 0 0 0 0-1.5H8.75z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * SquarePlus icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <SquarePlusIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <SquarePlusIcon size={48} color="#3b82f6" />
 * ```
 */
export const SquarePlusIcon = withUniwind(SquarePlusIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
