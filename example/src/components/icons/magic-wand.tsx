import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * MagicWand icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const MagicWandIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="m11.1 5.894l-.412.903l.671.732l1.356 1.48l-1.994-.227l-.986-.113l-.49.864l-.987 1.747l-.4-1.967l-.198-.972l-.973-.198l-1.966-.4l1.746-.989l.864-.489l-.112-.986l-.227-1.994L8.47 4.641l.732.67l.903-.411l1.826-.832zM7.02 1.276l2.465 2.26l3.043-1.387c.842-.384 1.708.483 1.325 1.324l-1.387 3.043l2.259 2.465c.625.682.069 1.774-.85 1.67l-3.323-.38l-1.646 2.911c-.456.805-1.666.613-1.85-.293l-.667-3.277l-3.277-.666c-.906-.185-1.098-1.395-.293-1.85l2.91-1.647l-.378-3.322c-.105-.92.987-1.476 1.669-.85M5.53 11.53a.75.75 0 1 0-1.06-1.06l-3.5 3.5a.75.75 0 1 0 1.06 1.06z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * MagicWand icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <MagicWandIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <MagicWandIcon size={48} color="#3b82f6" />
 * ```
 */
export const MagicWandIcon = withUniwind(MagicWandIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
