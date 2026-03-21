import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { AlertIconProps } from './alert.types';

/**
 * Default info circle icon for the Alert indicator.
 * Used for "default", "accent", and "danger" status values.
 */
export const DefaultIcon: React.FC<AlertIconProps> = ({ size = 20, color }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={color}
      accessibilityElementsHidden={true}
      importantForAccessibility="no-hide-descendants"
    >
      <Path
        d="M8 13.5a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-9.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-.25 3a.75.75 0 0 0-1.5 0V11a.75.75 0 0 0 1.5 0z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Svg>
  );
};

DefaultIcon.displayName = 'HeroUINative.Alert.DefaultIcon';
