import React from 'react';
import Animated, {
  Easing,
  useAnimatedProps,
  useDerivedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useThemeColor } from '../theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const DEFAULT_SIZE = 18;
const DURATION = 150;

interface CheckIconProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  isSelected?: boolean;
}

export const AnimatedCheckIcon: React.FC<CheckIconProps> = ({
  size = DEFAULT_SIZE,
  strokeWidth = 2.5,
  color,
  isSelected = false,
}) => {
  const themeColorForeground = useThemeColor('foreground');

  const checkProgress = useDerivedValue(() => {
    if (isSelected) {
      return withDelay(
        100,
        withTiming(1, { duration: DURATION, easing: Easing.out(Easing.ease) })
      );
    } else {
      return withTiming(0, { duration: DURATION });
    }
  });

  const animatedCheckProps = useAnimatedProps(
    () => ({
      strokeDasharray: size,
      strokeDashoffset: size * (1 - checkProgress.value),
    }),
    [checkProgress]
  );

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${DEFAULT_SIZE} ${DEFAULT_SIZE}`}
      fill="none"
    >
      <AnimatedPath
        d="M4 9.5L8 13L14 6"
        stroke={color ?? themeColorForeground}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        animatedProps={animatedCheckProps}
      />
    </Svg>
  );
};

AnimatedCheckIcon.displayName = 'HeroUINative.AnimatedCheckIcon';
