import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * ThreeDiagonal icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const ThreeDiagonalIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <G fill="none">
        <G clipPath="url(#SVGFd4lJeyK)">
          <Path
            fill={color}
            fillRule="evenodd"
            d="M6.702 3.013L8 3.5V2.386A2 2 0 0 1 10.702.513l3.351 1.257A3 3 0 0 1 16 4.579v4.035a2 2 0 0 1-2.702 1.873L12 10v1.114a2 2 0 0 1-2.702 1.873L8 12.5v1.114a2 2 0 0 1-2.702 1.873L1.947 14.23A3 3 0 0 1 0 11.421V7.386a2 2 0 0 1 2.702-1.873L4 6V4.886a2 2 0 0 1 2.702-1.873M5.5 6.563l.553.207A3 3 0 0 1 8 9.579v1.319l1.824.684a.5.5 0 0 0 .676-.468V7.079a1.5 1.5 0 0 0-.973-1.405L6.176 4.418a.5.5 0 0 0-.676.468zm4.553-2.293L9.5 4.062V2.386a.5.5 0 0 1 .676-.468l3.35 1.256c.586.22.974.78.974 1.405v4.035a.5.5 0 0 1-.676.468L12 8.398V7.079a3 3 0 0 0-1.947-2.809M1.5 11.421V7.386a.5.5 0 0 1 .676-.468l3.35 1.257c.586.219.974.779.974 1.404v4.035a.5.5 0 0 1-.676.468l-3.35-1.257a1.5 1.5 0 0 1-.974-1.404"
            clipRule="evenodd"
          />
        </G>
        <Defs>
          <ClipPath id="SVGFd4lJeyK">
            <Path fill={color} d="M0 0h16v16H0z" />
          </ClipPath>
        </Defs>
      </G>
    </Svg>
  );
};

/**
 * ThreeDiagonal icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <ThreeDiagonalIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <ThreeDiagonalIcon size={48} color="#3b82f6" />
 * ```
 */
export const ThreeDiagonalIcon = withUniwind(ThreeDiagonalIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
