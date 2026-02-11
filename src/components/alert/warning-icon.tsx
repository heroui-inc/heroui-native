import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { AlertIconProps } from './alert.types';

/**
 * Warning triangle icon for the Alert indicator.
 * Used for the "warning" status value.
 */
export const WarningIcon: React.FC<AlertIconProps> = ({ size = 20, color }) => {
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
        d="M7.134 2.994L2.217 11.5a1 1 0 0 0 .866 1.5h9.834a1 1 0 0 0 .866-1.5L8.866 2.993a1 1 0 0 0-1.732 0m3.03-.75c-.962-1.665-3.366-1.665-4.329 0L.918 10.749c-.963 1.666.24 3.751 2.165 3.751h9.834c1.925 0 3.128-2.085 2.164-3.751zM8 5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 8 5m1 5.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Svg>
  );
};

WarningIcon.displayName = 'HeroUINative.Alert.WarningIcon';
