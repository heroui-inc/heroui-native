import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ChevronDownIconProps {
  size?: number;
  color?: string;
}

/**
 * Chevron down icon component
 * Reusable SVG icon used in Select and Accordion components
 */
export const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  size = 16,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path
        fillRule="evenodd"
        d="M4.455 8.205a1.125 1.125 0 0 1 1.59 0L12 14.16l5.955-5.955a1.125 1.125 0 1 1 1.59 1.59l-6.75 6.75a1.125 1.125 0 0 1-1.59 0l-6.75-6.75a1.125 1.125 0 0 1 0-1.59"
        clipRule="evenodd"
      />
    </Svg>
  );
};

ChevronDownIcon.displayName = 'HeroUINative.ChevronDownIcon';
