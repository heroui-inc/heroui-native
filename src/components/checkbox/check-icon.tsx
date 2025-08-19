import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../providers/theme';
import { DEFAULT_CHECK_ICON_SIZE, DISPLAY_NAME } from './checkbox.constants';
import type { CheckboxIndicatorIconProps } from './checkbox.types';

export const CheckIcon: React.FC<CheckboxIndicatorIconProps> = (props) => {
  const { colors } = useTheme();

  const iconSize = DEFAULT_CHECK_ICON_SIZE;

  return (
    <Svg
      width={props.size ?? iconSize}
      height={props.size ?? iconSize}
      viewBox="0 0 24 24"
      fill={props.color ?? colors.accentForeground}
    >
      <Path
        fillRule="evenodd"
        d="M20.732 4.645a1.5 1.5 0 0 1 .163 2.116l-9 10.5a1.5 1.5 0 0 1-2.2.084l-5.25-5.25a1.5 1.5 0 0 1 2.121-2.121l3.892 3.891 7.96-9.287a1.5 1.5 0 0 1 2.114-.163"
        clipRule="evenodd"
      />
    </Svg>
  );
};

CheckIcon.displayName = DISPLAY_NAME.CHECKBOX_CHECK_ICON;
