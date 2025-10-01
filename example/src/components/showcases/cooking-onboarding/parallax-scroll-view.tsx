import { LinearGradient } from 'expo-linear-gradient';
import { colorKit, useTheme } from 'heroui-native';
import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

type Props = PropsWithChildren<{
  headerImage: ReactElement;
}>;

export default function ParallaxScrollView({ children, headerImage }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  const { height } = useWindowDimensions();

  const { colors } = useTheme();

  const headerHeight = height * 0.6;

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        className="overflow-hidden"
        style={[{ height: headerHeight }, headerAnimatedStyle]}
      >
        {headerImage}
        <LinearGradient
          colors={[
            colorKit.setAlpha(colors.background, 0).hex(),
            colors.background,
          ]}
          style={styles.gradient}
        />
      </Animated.View>
      <View className="flex-1 p-8 gap-4 overflow-hidden">{children}</View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    pointerEvents: 'none',
  },
});
