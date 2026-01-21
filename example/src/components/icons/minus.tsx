import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * Minus icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const MinusIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M1.75 8a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5h-11A.75.75 0 0 1 1.75 8"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * Minus icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <MinusIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <MinusIcon size={48} color="#3b82f6" />
 * ```
 */
export const MinusIcon = withUniwind(MinusIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
