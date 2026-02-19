import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * Bell icon component (outline variant) - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const BellIconComponent: React.FC<IconProps> = ({
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
        d="m4.665 7.822l.62-3.096a2.77 2.77 0 0 1 5.43 0l.62 3.096a4.8 4.8 0 0 0 1.305 2.44l.194.193a.567.567 0 0 1-.273.953l-.821.19a16.6 16.6 0 0 1-7.48 0l-.82-.19a.567.567 0 0 1-.274-.953l.194-.193a4.77 4.77 0 0 0 1.305-2.44m-1.47-.294l.619-3.096a4.27 4.27 0 0 1 8.372 0l.62 3.096c.126.634.438 1.216.895 1.673l.194.194a2.066 2.066 0 0 1-.997 3.475l-.821.19q-1.053.24-2.12.358a2 2 0 0 1-3.913 0a18 18 0 0 1-2.12-.359l-.822-.19a2.067 2.067 0 0 1-.997-3.474L2.3 9.2c.457-.457.769-1.04.895-1.673"
      />
    </Svg>
  );
};

/**
 * Bell icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <BellIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <BellIcon size={48} color="#3b82f6" />
 * ```
 */
export const BellIcon = withUniwind(BellIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
