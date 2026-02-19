import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * CreditCard icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const CreditCardIconComponent: React.FC<IconProps> = ({
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
        d="M12.5 4h-9A1.5 1.5 0 0 0 2 5.5h12A1.5 1.5 0 0 0 12.5 4M2 10.5V7h12v3.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 10.5m1.5-8a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-5a3 3 0 0 0-3-3zM4.25 9a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z"
      />
    </Svg>
  );
};

/**
 * CreditCard icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <CreditCardIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <CreditCardIcon size={48} color="#3b82f6" />
 * ```
 */
export const CreditCardIcon = withUniwind(CreditCardIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
