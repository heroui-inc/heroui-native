import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useToast } from 'heroui-native';
import { memo, useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';
import { useAppTheme } from '../../contexts/app-theme-context';
import { useAccessibilityInfo } from '../../helpers/hooks/use-accessability-info';
import { PaginationIndicator } from './pagination-indicator';
import type { UsageVariant } from './types';
import { UsageVariantsSelect } from './usage-variants-select';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface UsageVariantFlatListProps {
  data: UsageVariant[];
  scrollEnabled?: boolean;
}

type VariantItemProps = {
  item: UsageVariant;
  index: number;
  scrollY: SharedValue<number>;
  itemHeight: number;
  width: number;
  height: number;
};

const VariantItem = memo(
  ({ item, index, scrollY, itemHeight, width, height }: VariantItemProps) => {
    const { reduceTransparencyEnabled } = useAccessibilityInfo();

    const applyOpacity = reduceTransparencyEnabled || Platform.OS === 'android';

    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: applyOpacity
          ? interpolate(
              scrollY.get() / itemHeight,
              [index - 0.5, index, index + 0.5],
              [0, 1, 0],
              Extrapolation.CLAMP
            )
          : 1,
        transform: [
          {
            scale: interpolate(
              scrollY.get() / itemHeight,
              [index - 0.5, index, index + 0.5],
              [0.9, 1, 0.9],
              Extrapolation.CLAMP
            ),
          },
        ],
      };
    });

    return (
      <Animated.View style={[{ width, height }, animatedStyle]}>
        {item.content}
      </Animated.View>
    );
  }
);

VariantItem.displayName = 'VariantItem';

export const UsageVariantFlatList = ({
  data,
  scrollEnabled = true,
}: UsageVariantFlatListProps) => {
  const [currentVariant, setCurrentVariant] = useState<UsageVariant>(data[0]!);

  const { isDark } = useAppTheme();

  const { toast, isToastVisible } = useToast();

  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const itemHeight = height;

  const { reduceTransparencyEnabled } = useAccessibilityInfo();

  const applyBlur = Platform.OS === 'ios' && !reduceTransparencyEnabled;

  const listRef = useRef<FlatList<UsageVariant>>(null);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ item: UsageVariant }> }) => {
      if (viewableItems.length > 0 && viewableItems[0]) {
        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        setCurrentVariant(viewableItems[0].item);
      }
    },
    []
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.set(event.contentOffset.y);
      if (isToastVisible) {
        scheduleOnRN(toast.hide, 'all');
      }
    },
  });

  const animatedProps = useAnimatedProps(() => {
    if (data.length === 1) {
      return {
        intensity: 0,
      };
    }

    const inputRange: number[] = [];
    const outputRange: number[] = [];

    for (let i = 0; i < data.length; i++) {
      inputRange.push(i);
      outputRange.push(0);

      if (i < data.length - 1) {
        inputRange.push(i + 0.5);
        outputRange.push(30);
      }
    }

    return {
      intensity: interpolate(
        scrollY.get() / itemHeight,
        inputRange,
        outputRange
      ),
    };
  });

  return (
    <>
      <Animated.FlatList
        ref={listRef}
        data={data}
        renderItem={({ item, index }) => (
          <VariantItem
            item={item}
            index={index}
            scrollY={scrollY}
            itemHeight={itemHeight}
            width={width}
            height={height}
          />
        )}
        keyExtractor={(item) => item.value}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        scrollEnabled={scrollEnabled}
        keyboardShouldPersistTaps="handled"
      />
      {applyBlur && (
        <AnimatedBlurView
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          animatedProps={animatedProps}
          tint={
            isDark
              ? 'systemUltraThinMaterialDark'
              : 'systemUltraThinMaterialLight'
          }
        />
      )}
      <View
        className="absolute left-6"
        style={{ bottom: insets.bottom + 34 }}
        pointerEvents="none"
      >
        <View className="gap-1">
          {data.map((item, index) => (
            <PaginationIndicator
              key={index}
              index={index}
              label={item.label}
              scrollY={scrollY}
              itemSize={height}
            />
          ))}
        </View>
      </View>
      <UsageVariantsSelect
        data={data}
        variant={currentVariant}
        setVariant={setCurrentVariant}
        listRef={listRef}
      />
    </>
  );
};
