import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * HeartFill icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const HeartFillIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M4.76 1.5c-1.278 0-2.365.459-3.127 1.296C.878 3.624.5 4.758.5 6.013c0 2.18 1.11 3.917 2.52 5.268c1.404 1.345 3.17 2.368 4.632 3.133a.75.75 0 0 0 .693.002c1.463-.757 3.228-1.788 4.633-3.14c1.41-1.355 2.522-3.098 2.522-5.263c0-1.26-.38-2.393-1.136-3.221c-.763-.835-1.85-1.293-3.124-1.293c-1.076 0-1.966.399-2.643 1.151A4.5 4.5 0 0 0 8 3.504a4.5 4.5 0 0 0-.597-.854C6.726 1.898 5.836 1.5 4.76 1.5"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * HeartFill icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <HeartFillIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <HeartFillIcon size={48} color="#3b82f6" />
 * ```
 */
export const HeartFillIcon = withUniwind(HeartFillIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
