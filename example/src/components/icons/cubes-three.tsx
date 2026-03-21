import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * CubesThree icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const CubesThreeIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M6.5 2h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1M4 3A2.5 2.5 0 0 1 6.5.5h3A2.5 2.5 0 0 1 12 3v3c0 .356-.074.694-.208 1H13a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 15H3a2.5 2.5 0 0 1-2.5-2.5v-3A2.5 2.5 0 0 1 3 7h1.208A2.5 2.5 0 0 1 4 6zm2.25 5.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm3.5 5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1H13a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * CubesThree icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <CubesThreeIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <CubesThreeIcon size={48} color="#3b82f6" />
 * ```
 */
export const CubesThreeIcon = withUniwind(CubesThreeIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
