import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { useAppLocale } from '../../contexts/app-locale-context';
import { AppText } from '../app-text';

const StyleAnimatedView = withUniwind(Animated.View);

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
  const { isRTL } = useAppLocale();

  /**
   * The bar and label grow/animate from the leading edge, which is the right
   * side in RTL. Anchor the scale transform and negate the horizontal offset
   * accordingly so the indicator mirrors correctly.
   */
  const barTransformOrigin: [string, string, number] = [
    isRTL ? '100%' : '0%',
    '50%',
    0,
  ];
  const labelDirection = isRTL ? -1 : 1;

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
          translateX:
            labelDirection *
            interpolate(
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
      <StyleAnimatedView
        className="w-3 h-0.5 bg-foreground"
        style={[
          {
            transformOrigin: barTransformOrigin,
          },
          rBarStyle,
        ]}
      />
      <StyleAnimatedView
        className="absolute inset-s-8 inset-e-0"
        style={rLabelStyle}
      >
        <AppText
          className="text-foreground text-lg font-normal text-left"
          maxFontSizeMultiplier={1.2}
          numberOfLines={1}
        >
          {label}
        </AppText>
      </StyleAnimatedView>
    </View>
  );
}
