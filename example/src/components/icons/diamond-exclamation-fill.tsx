import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * DiamondExclamationFill icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const DiamondExclamationFillIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  const clipPathId = 'SVGFd4lJeyK';

  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <G fill="none">
        <G clipPath={`url(#${clipPathId})`}>
          <Path
            fill={color}
            fillRule="evenodd"
            d="M5.828.98a3 3 0 0 1 4.243 0l4.95 4.949a3 3 0 0 1 0 4.243l-4.95 4.95a3 3 0 0 1-4.243 0l-4.95-4.95a3 3 0 0 1 0-4.243zM7.95 9.55a1 1 0 1 0 0 2a1 1 0 0 0 0-2m0-5.25a.75.75 0 0 0-.75.75v2.5a.75.75 0 1 0 1.5 0v-2.5a.75.75 0 0 0-.75-.75"
            clipRule="evenodd"
          />
        </G>
        <Defs>
          <ClipPath id={clipPathId}>
            <Path fill={color} d="M0 0h16v16H0z" />
          </ClipPath>
        </Defs>
      </G>
    </Svg>
  );
};

/**
 * DiamondExclamationFill icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <DiamondExclamationFillIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <DiamondExclamationFillIcon size={48} color="#3b82f6" />
 * ```
 */
export const DiamondExclamationFillIcon = withUniwind(
  DiamondExclamationFillIconComponent,
  {
    color: {
      fromClassName: 'colorClassName',
      styleProperty: 'accentColor',
    },
  }
);
