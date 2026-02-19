import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ChevronRightIconProps {
  size?: number;
  color?: string;
}

/**
 * Chevron right icon component
 * Reusable SVG icon used in ListGroup and navigation components.
 * Path derived from chevron-down-icon rotated 90° clockwise.
 */
export const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
  size = 16,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path
        fillRule="evenodd"
        d="M8.205 19.545a1.125 1.125 0 0 1 0-1.59L14.16 12l-5.955-5.955a1.125 1.125 0 1 1 1.59-1.59l6.75 6.75a1.125 1.125 0 0 1 0 1.59l-6.75 6.75a1.125 1.125 0 0 1-1.59 0"
        clipRule="evenodd"
      />
    </Svg>
  );
};

ChevronRightIcon.displayName = 'HeroUINative.ChevronRightIcon';
