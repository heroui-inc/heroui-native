import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * CircleInfoFill icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const CircleInfoFillIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-9.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0M8 7.75a.75.75 0 0 1 .75.75V11a.75.75 0 0 1-1.5 0V8.5A.75.75 0 0 1 8 7.75"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * CircleInfoFill icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <CircleInfoFillIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <CircleInfoFillIcon size={48} color="#3b82f6" />
 * ```
 */
export const CircleInfoFillIcon = withUniwind(CircleInfoFillIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
