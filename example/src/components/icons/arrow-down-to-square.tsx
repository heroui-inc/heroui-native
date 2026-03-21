import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * ArrowDownToSquare icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const ArrowDownToSquareIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M8.53 11.78a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 1.06-1.06l1.22 1.22V1.75a.75.75 0 0 1 1.5 0v7.69l1.22-1.22a.75.75 0 1 1 1.06 1.06zM4.25 4a.75.75 0 1 1 0 1.5H4A1.5 1.5 0 0 0 2.5 7v5A1.5 1.5 0 0 0 4 13.5h8a1.5 1.5 0 0 0 1.5-1.5V7A1.5 1.5 0 0 0 12 5.5h-.25a.75.75 0 0 1 0-1.5H12a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * ArrowDownToSquare icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <ArrowDownToSquareIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <ArrowDownToSquareIcon size={48} color="#3b82f6" />
 * ```
 */
export const ArrowDownToSquareIcon = withUniwind(
  ArrowDownToSquareIconComponent,
  {
    color: {
      fromClassName: 'colorClassName',
      styleProperty: 'accentColor',
    },
  }
);
