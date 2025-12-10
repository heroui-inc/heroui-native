import { Ionicons } from '@expo/vector-icons';
import { Toast, useThemeColor, type ToastComponentProps } from 'heroui-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

const StyleAnimatedView = withUniwind(Animated.View);
const StyledIonicons = withUniwind(Ionicons);

/**
 * Achievement toast component that displays a celebration notification
 * Shows achievement icon, title, and description with decorative elements
 */
export const AchievementToast = (props: ToastComponentProps) => {
  const { id, hide } = props;

  const themeColorWarning = useThemeColor('warning');

  /**
   * Auto-hide toast after 5 seconds
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      hide(id);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [hide, id]);

  /**
   * Animated values for confetti particles
   */
  const confetti1 = useSharedValue(0);
  const confetti2 = useSharedValue(0);
  const confetti3 = useSharedValue(0);
  const confetti4 = useSharedValue(0);

  /**
   * Start confetti animation on mount
   */
  useEffect(() => {
    confetti1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0, { duration: 800 })
      ),
      -1,
      false
    );
    confetti2.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      false
    );
    confetti3.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200 }),
        withTiming(0, { duration: 1200 })
      ),
      -1,
      false
    );
    confetti4.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900 }),
        withTiming(0, { duration: 900 })
      ),
      -1,
      false
    );
  }, [confetti1, confetti2, confetti3, confetti4]);

  /**
   * Animated styles for confetti particles
   */
  const confetti1Style = useAnimatedStyle(() => ({
    opacity: confetti1.value,
    transform: [
      {
        translateY: confetti1.value * -10,
      },
      {
        rotate: `${confetti1.value * 45}deg`,
      },
    ],
  }));

  const confetti2Style = useAnimatedStyle(() => ({
    opacity: confetti2.value,
    transform: [
      {
        translateY: confetti2.value * -8,
      },
      {
        rotate: `${confetti2.value * -30}deg`,
      },
    ],
  }));

  const confetti3Style = useAnimatedStyle(() => ({
    opacity: confetti3.value,
    transform: [
      {
        translateY: confetti3.value * -12,
      },
      {
        rotate: `${confetti3.value * 60}deg`,
      },
    ],
  }));

  const confetti4Style = useAnimatedStyle(() => ({
    opacity: confetti4.value,
    transform: [
      {
        translateY: confetti4.value * -6,
      },
      {
        rotate: `${confetti4.value * -45}deg`,
      },
    ],
  }));

  return (
    <Toast className="bg-[#F5F1E8] border-2 border-orange-200" {...props}>
      <View className="relative flex-row items-center gap-4 px-4 py-3">
        {/* Confetti decorative elements */}
        <StyleAnimatedView
          className="absolute right-8 top-2 size-2 rounded-full bg-orange-600/60"
          style={confetti1Style}
        />
        <StyleAnimatedView
          className="absolute right-12 top-4 size-1.5 rounded-full bg-orange-700/50"
          style={confetti2Style}
        />
        <StyleAnimatedView
          className="absolute right-6 bottom-3 size-2 rounded-full bg-orange-500/40"
          style={confetti3Style}
        />
        <StyleAnimatedView
          className="absolute right-10 bottom-2 size-1 rounded-full bg-orange-600/50"
          style={confetti4Style}
        />

        {/* Flame icon with star badge */}
        <View className="relative">
          <StyledIonicons name="flame" size={48} className="text-orange-500" />
          <View className="absolute -right-1 -top-1 size-6 items-center justify-center rounded-full bg-yellow-400">
            <View className="size-5 items-center justify-center">
              <StyledIonicons
                name="star"
                size={16}
                className="text-yellow-600"
              />
            </View>
          </View>
        </View>

        {/* Text content */}
        <View className="flex-1 flex-col gap-1">
          <Toast.Title className="text-xs font-medium text-[#2D3748]">
            New achievement!
          </Toast.Title>
          <Toast.Title className="text-base font-bold text-[#2D3748]">
            You're on a 1-day
          </Toast.Title>
          <Toast.Title className="text-base font-bold text-[#2D3748]">
            study streak
          </Toast.Title>
        </View>

        {/* Close button */}
        <Toast.Close
          className="absolute right-2 top-2"
          iconProps={{ color: themeColorWarning }}
        />
      </View>
    </Toast>
  );
};
