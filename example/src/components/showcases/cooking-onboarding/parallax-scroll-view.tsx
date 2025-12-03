import { LinearGradient } from 'expo-linear-gradient';
import { colorKit, useThemeColor } from 'heroui-native';
import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

const StyleAnimatedView = withUniwind(Animated.View);

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  scrollEnabled?: boolean;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  scrollEnabled,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const themeColorBackground = useThemeColor('background');

  const headerHeight = height * 0.6;

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.get(),
        [-headerHeight, 0, headerHeight / 2],
        [1, 1, 0]
      ),
      transform: [
        {
          translateY: interpolate(
            scrollOffset.get(),
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.get(),
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
      contentContainerStyle={{ paddingBottom: insets.bottom + 12 }}
      scrollEnabled={scrollEnabled}
    >
      <StyleAnimatedView
        className="overflow-hidden"
        style={[{ height: headerHeight }, headerAnimatedStyle]}
      >
        {headerImage}
        <LinearGradient
          colors={[
            colorKit.setAlpha(themeColorBackground, 0).hex(),
            themeColorBackground,
          ]}
          style={styles.gradient}
        />
      </StyleAnimatedView>
      <View className="flex-1 p-4 overflow-hidden -mt-[100px] z-50">
        {children}
      </View>
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
