import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * Pencil icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const PencilIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M11.423 1A3.577 3.577 0 0 1 15 4.577c0 .27-.108.53-.3.722l-.528.529l-1.971 1.971l-5.059 5.059a3 3 0 0 1-1.533.82l-2.638.528a1 1 0 0 1-1.177-1.177l.528-2.638a3 3 0 0 1 .82-1.533l5.059-5.059l2.5-2.5c.191-.191.451-.299.722-.299m-2.31 4.009l-4.91 4.91a1.5 1.5 0 0 0-.41.766l-.38 1.903l1.902-.38a1.5 1.5 0 0 0 .767-.41l4.91-4.91a2.08 2.08 0 0 0-1.88-1.88m3.098.658a3.6 3.6 0 0 0-1.878-1.879l1.28-1.28c.995.09 1.788.884 1.878 1.88z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * Pencil icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <PencilIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <PencilIcon size={48} color="#3b82f6" />
 * ```
 */
export const PencilIcon = withUniwind(PencilIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
