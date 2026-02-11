import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { AlertIconProps } from './alert.types';

/**
 * Success check circle icon for the Alert indicator.
 * Used for the "success" status value.
 */
export const SuccessIcon: React.FC<AlertIconProps> = ({ size = 20, color }) => {
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
        d="M13.5 8a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0m-3.9-1.55a.75.75 0 1 0-1.2-.9L7.419 8.858L6.03 7.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.13-.08z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Svg>
  );
};

SuccessIcon.displayName = 'HeroUINative.Alert.SuccessIcon';
