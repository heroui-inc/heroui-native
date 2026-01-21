import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * Receipt icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const ReceiptIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M6.3 2L3.9.5L2 2v13.5l1.5-.776L4.9 14l2.4 1.5L9.7 14l2.4 1.5L14 14V.5l-1.5.776L11.1 2L8.7.5zm2.4.269L7.095 3.272l-.795.497l-.795-.497l-1.504-.94l-.501.395v10.308l.71-.367l.76-.393l.725.453L7.3 13.731l1.605-1.003l.795-.497l.795.497l1.504.94l.501-.395V2.965l-.71.367l-.76.393l-.725-.453zM5 6.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 6.5m.75 2.25a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * Receipt icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <ReceiptIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <ReceiptIcon size={48} color="#3b82f6" />
 * ```
 */
export const ReceiptIcon = withUniwind(ReceiptIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
