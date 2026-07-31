import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

/**
 * Props for the raw ChevronRight SVG component.
 *
 * `style` is forwarded to the underlying `<Svg>` so that `withUniwind` can apply
 * className-resolved styles (e.g. `rtl:-scale-x-100` to mirror the chevron in
 * right-to-left layouts). Without forwarding `style`, className transforms would
 * be silently dropped since the SVG root would never receive them.
 */
interface ChevronRightIconComponentProps extends IconProps {
  /** Style forwarded to the underlying SVG (used by withUniwind). */
  style?: StyleProp<ViewStyle>;
}

/**
 * ChevronRight icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const ChevronRightIconComponent: React.FC<ChevronRightIconComponentProps> = ({
  size = 20,
  color = 'currentColor',
  style,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" style={style}>
      <Rect width={16} height={16} fill="none" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M5.47 13.03a.75.75 0 0 1 0-1.06L9.44 8L5.47 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0"
        clipRule="evenodd"
      />
    </Svg>
  );
};

/**
 * ChevronRight icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <ChevronRightIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <ChevronRightIcon size={48} color="#3b82f6" />
 * ```
 *
 * To apply layout styles (e.g. `rtl:-scale-x-100`) wrap this component again at
 * the call site: `const StyledChevronRightIcon = withUniwind(ChevronRightIcon)`.
 * The `style` prop above forwards those resolved styles to the underlying SVG.
 */
export const ChevronRightIcon = withUniwind(ChevronRightIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
