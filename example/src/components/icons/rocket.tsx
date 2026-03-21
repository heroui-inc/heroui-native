import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';
import type { IconProps } from '../../helpers/types/icons';

const ROCKET_CLIP_PATH_ID = 'rocket-clip';

/**
 * Rocket icon component - React Native SVG implementation
 * Wrapped with withUniwind to enable className-based styling
 */
const RocketIconComponent: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect width={16} height={16} fill="none" />
      <G fill="none">
        <G clipPath={`url(#${ROCKET_CLIP_PATH_ID})`}>
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="m6.993 5.628l-.787-.157l-1.118-.224a1.13 1.13 0 0 0-1.024.31L2.837 6.785a1.15 1.15 0 0 0-.285.474l1.02.185a6.19 6.19 0 0 1 4.985 4.985l.185 1.02c.178-.055.34-.152.474-.285l1.227-1.227c.268-.268.384-.652.31-1.024l-.224-1.118l-.157-.787l.567-.568l1.243-1.242A4.5 4.5 0 0 0 13.5 4.015V2.5h-1.515a4.5 4.5 0 0 0-3.182 1.318L7.561 5.061zM12 9.5l1.243-1.243A6 6 0 0 0 15 4.015V2.5A1.5 1.5 0 0 0 13.5 1h-1.515a6 6 0 0 0-4.242 1.757L6.5 4l-1.118-.224a2.63 2.63 0 0 0-2.379.72L1.777 5.724A2.65 2.65 0 0 0 1 7.598c0 .522.373.97.887 1.063l1.417.258a4.69 4.69 0 0 1 3.777 3.777l.258 1.417c.093.514.54.887 1.063.887c.703 0 1.377-.28 1.875-.777l1.226-1.226a2.63 2.63 0 0 0 .72-2.38zm-8.06 2.571c-.311-.31-.76-.28-1.005-.036c-.233.233-.423.658-.527 1.247a5 5 0 0 0-.05.366q.184-.019.377-.053c.596-.106 1.017-.296 1.24-.52c.245-.244.275-.693-.036-1.004M5 11.011c-.873-.874-2.273-.89-3.126-.036C.777 12.07.802 14.094.837 14.712c.007.12.06.23.145.315a.5.5 0 0 0 .32.145c.622.032 2.652.046 3.734-1.035c.853-.854.837-2.253-.036-3.126m6.78-5.73a.75.75 0 0 0-1.06-1.061l-1.5 1.5a.75.75 0 0 0 1.06 1.06z"
          />
        </G>
        <Defs>
          <ClipPath id={ROCKET_CLIP_PATH_ID}>
            <Path fill={color} d="M0 0h16v16H0z" />
          </ClipPath>
        </Defs>
      </G>
    </Svg>
  );
};

/**
 * Rocket icon component wrapped with withUniwind for className-based styling
 *
 * Usage examples:
 * ```tsx
 * // Using className props:
 * <RocketIcon colorClassName="accent-blue-500" />
 *
 * // Using direct props:
 * <RocketIcon size={48} color="#3b82f6" />
 * ```
 */
export const RocketIcon = withUniwind(RocketIconComponent, {
  color: {
    fromClassName: 'colorClassName',
    styleProperty: 'accentColor',
  },
});
