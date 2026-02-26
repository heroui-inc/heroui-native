import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * SquareArticle icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const SquareArticleIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5 3h-7A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3m-7-1.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3zm6 6H5.43a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5.07a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1m-5.32-3h3.57a.75.75 0 0 1 0 1.5H5.18a.75.75 0 0 1 0-1.5"
      />
    </Svg>
  );
};

/**
 * SquareArticle icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <SquareArticleIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <SquareArticleIcon size={48} color="#3b82f6" />
 * ```
 */
export const SquareArticleIcon = withUniwind(SquareArticleIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
