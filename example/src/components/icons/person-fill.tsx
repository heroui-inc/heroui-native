import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * PersonFill icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const PersonFillIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        d="M8 9c3.85 0 7 2.5 7 4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5C1 11.5 4.15 9 8 9m0-8a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7"
      />
    </Svg>
  );
};

/**
 * PersonFill icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <PersonFillIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <PersonFillIcon size={48} color="#3b82f6" />
 * ```
 */
export const PersonFillIcon = withUniwind(PersonFillIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
