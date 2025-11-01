import { memo, useCallback, useRef, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PaginationIndicator } from './pagination-indicator';
import type { UsageVariant } from './types';
import { UsageVariantsSelect } from './usage-variants-select';

interface UsageVariantFlatListProps {
  data: UsageVariant[];
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
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollY.value / itemHeight,
          [index - 0.5, index, index + 0.5],
          [0, 1, 0],
          Extrapolation.CLAMP
        ),
        transform: [
          {
            scale: interpolate(
              scrollY.value / itemHeight,
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

export const UsageVariantFlatList = ({ data }: UsageVariantFlatListProps) => {
  const [currentVariant, setCurrentVariant] = useState<UsageVariant>(data[0]!);

  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const itemHeight = height;

  const listRef = useRef<FlatList<UsageVariant>>(null);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ item: UsageVariant }> }) => {
      if (viewableItems.length > 0 && viewableItems[0]) {
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
    },
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
      />
      <View
        className="absolute left-6"
        style={{ bottom: insets.bottom + 32 }}
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
