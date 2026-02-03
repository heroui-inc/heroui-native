import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { Button, useSelect, useThemeColor } from 'heroui-native';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

const StyleAnimatedView = withUniwind(Animated.View);

export const CloseButton = () => {
  const insets = useSafeAreaInsets();
  const themeColorAccentForeground = useThemeColor('accent-foreground');
  const { isOpen, onOpenChange } = useSelect();
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.set(
      withTiming(isOpen ? 1 : 0, {
        duration: 250,
        easing: Easing.out(Easing.ease),
      })
    );
  }, [isOpen, animatedValue]);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(animatedValue.get(), [0, 1], [0, 1]);

    return {
      transform: [{ scale }],
    };
  });

  const listIconAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      animatedValue.get(),
      [0, 1],
      [0, 360],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      animatedValue.get(),
      [0, 1],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const closeIconAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      animatedValue.get(),
      [0, 1],
      [0, -360],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(animatedValue.value, [0, 1], [0, 1]);

    return {
      opacity,
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  return (
    <Button
      className="absolute right-6"
      style={[{ bottom: insets.bottom + 24 }, buttonAnimatedStyle]}
      size="lg"
      isIconOnly
      hitSlop={12}
      onPress={() => {
        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onOpenChange(false);
      }}
    >
      <StyleAnimatedView
        className="absolute items-center justify-center"
        style={listIconAnimatedStyle}
      >
        <FontAwesome6
          name="list-ul"
          size={20}
          color={themeColorAccentForeground}
        />
      </StyleAnimatedView>
      <StyleAnimatedView
        className="absolute items-center justify-center"
        style={closeIconAnimatedStyle}
      >
        <Ionicons name="close" size={24} color={themeColorAccentForeground} />
      </StyleAnimatedView>
    </Button>
  );
};
