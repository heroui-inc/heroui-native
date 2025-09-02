import React from 'react';
import Svg, { Path } from 'react-native-svg';

export interface PersonIconProps {
  size?: number;
  color?: string;
}

export const PersonIcon: React.FC<PersonIconProps> = ({
  size = 16,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 4.5C10 5.60457 9.10457 6.5 8 6.5C6.89543 6.5 6 5.60457 6 4.5C6 3.39543 6.89543 2.5 8 2.5C9.10457 2.5 10 3.39543 10 4.5ZM11.5 4.5C11.5 6.433 9.933 8 8 8C6.067 8 4.5 6.433 4.5 4.5C4.5 2.567 6.067 1 8 1C9.933 1 11.5 2.567 11.5 4.5ZM2.5 12.5C2.5 12.2955 2.72027 11.6911 3.81956 11.0413C4.83752 10.4395 6.31979 10 8 10C9.68021 10 11.1625 10.4395 12.1804 11.0413C13.2797 11.6911 13.5 12.2955 13.5 12.5C13.5 13.0523 13.0523 13.5 12.5 13.5H3.5C2.94772 13.5 2.5 13.0523 2.5 12.5ZM8 8.5C4.15 8.5 1 10.5 1 12.5C1 13.8807 2.11929 15 3.5 15H12.5C13.8807 15 15 13.8807 15 12.5C15 10.5 11.85 8.5 8 8.5Z"
        fill={color}
      />
    </Svg>
  );
};
