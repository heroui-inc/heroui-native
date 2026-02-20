import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * Moon icon component (outline variant) - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const MoonIconComponent: React.FC<IconProps> = ({
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
        d="M8 13.5a5.5 5.5 0 0 0 2.263-10.514a5.5 5.5 0 0 1-7.278 7.278A5.5 5.5 0 0 0 8 13.5M1.045 8.795a7.001 7.001 0 1 0 7.75-7.75l-.028-.003A7 7 0 0 0 8 1c-.527 0-.59.842-.185 1.18a4 4 0 0 1 .342.322A4 4 0 1 1 2.18 7.814C1.842 7.41 1 7.474 1 8a7 7 0 0 0 .045.794"
      />
    </Svg>
  );
};

/**
 * Moon icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <MoonIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <MoonIcon size={48} color="#3b82f6" />
 * ```
 */
export const MoonIcon = withUniwind(MoonIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
