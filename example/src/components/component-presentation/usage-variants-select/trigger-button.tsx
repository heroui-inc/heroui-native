import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useSelect, useThemeColor } from 'heroui-native';
import { useEffect } from 'react';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

const StyleAnimatedView = withUniwind(Animated.View);

export const TriggerButton = () => {
  const insets = useSafeAreaInsets();
  const themeColorAccentForeground = useThemeColor('accent-foreground');
  const { isOpen } = useSelect();
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.set(
      withTiming(isOpen ? 0 : 1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      })
    );
  }, [isOpen, animatedValue]);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.get(), [0, 1], [0, 1]);

    return {
      opacity,
    };
  });

  return (
    <StyleAnimatedView
      className="absolute right-6 size-14 items-center justify-center rounded-full bg-accent"
      style={[{ bottom: insets.bottom + 24 }, animatedStyle]}
    >
      <FontAwesome6
        name="list-ul"
        size={20}
        color={themeColorAccentForeground}
      />
    </StyleAnimatedView>
  );
};
