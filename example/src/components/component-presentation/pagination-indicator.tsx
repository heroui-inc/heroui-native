import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { AppText } from '../app-text';

const AnimatedView = Animated.createAnimatedComponent(View);

export type PaginationIndicatorProps = {
  index: number;
  label: string;
  scrollY: SharedValue<number>;
  itemSize: number;
};

export function PaginationIndicator({
  index,
  scrollY,
  itemSize,
  label,
}: PaginationIndicatorProps) {
  const rBarStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.get() / itemSize,
        [index - 2, index - 1, index, index + 1, index + 2],
        [0.2, 0.5, 1, 0.5, 0.2],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          scaleX: interpolate(
            scrollY.get() / itemSize,
            [index - 2, index - 1, index, index + 1, index + 2],
            [1, 1.4, 2, 1.4, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const rLabelStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.get() / itemSize,
        [index - 0.5, index, index + 0.5],
        [0, 1, 0],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateX: interpolate(
            scrollY.get() / itemSize,
            [index - 2, index - 1, index, index + 1, index + 2],
            [1, 1.4, 2, 1.4, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <View className="flex-row items-center">
      <AnimatedView
        className="w-3 h-[2px] bg-foreground"
        style={[
          {
            transformOrigin: ['0%', '50%', 0],
          },
          rBarStyle,
        ]}
      />
      <Animated.View className="absolute left-8" style={rLabelStyle}>
        <AppText className="text-foreground text-lg font-normal">
          {label}
        </AppText>
      </Animated.View>
    </View>
  );
}
