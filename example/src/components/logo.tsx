import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LogoProps {
  /**
   * Theme color for foreground/text color
   * Used as the fill color for the logo
   */
  themeColorForeground: string;
  /**
   * Width of the logo
   * @default 156
   */
  width?: number;
  /**
   * Height of the logo
   * @default 216
   */
  height?: number;
}

/**
 * Logo component - HeroUI logo SVG
 * Accepts themeColorForeground prop to dynamically color the logo based on theme
 */
export const Logo: React.FC<LogoProps> = ({
  themeColorForeground,
  width = 156,
  height = 216,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 156 216" fill="none">
      <Path
        d="M0 53.8589V118.386C0 121.436 1.56991 124.27 4.15274 125.883L48.2076 153.394C54.0785 157.061 61.6825 152.83 61.6825 145.897V91.657C61.6825 88.5364 63.3254 85.6473 66.0044 84.0569L92.8775 68.1038V207.119C92.8775 214.028 100.436 218.263 106.308 214.643L151.779 186.618C154.387 185.011 155.976 182.162 155.976 179.094V45.5999C155.976 38.7244 148.483 34.4848 142.609 38.0364L92.8775 68.1038V8.84686C92.8775 1.98996 85.4216 -2.25233 79.5467 1.26185L4.2967 46.2739C1.63197 47.8679 0 50.7488 0 53.8589Z"
        fill={themeColorForeground}
      />
    </Svg>
  );
};
