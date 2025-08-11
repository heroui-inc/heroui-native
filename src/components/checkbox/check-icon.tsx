import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';
import { DEFAULT_CHECK_ICON_SIZE, DISPLAY_NAME } from './checkbox.constants';
import type { CheckboxIndicatorIconProps } from './checkbox.types';

export const CheckIcon: React.FC<CheckboxIndicatorIconProps> = (props) => {
  const { theme, colors } = useTheme();

  const iconSize = DEFAULT_CHECK_ICON_SIZE;

  return (
    <Svg
      width={props.size ?? iconSize}
      height={props.size ?? iconSize}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M20 6L9 17L4 12"
        stroke={props.color ?? colors.accentForeground}
        strokeWidth={props.strokeWidth ?? (theme === 'dark' ? 4.5 : 3.5)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

CheckIcon.displayName = DISPLAY_NAME.CHECKBOX_CHECK_ICON;
