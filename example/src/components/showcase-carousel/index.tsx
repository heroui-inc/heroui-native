import { useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {
  ShowcaseItem,
  type ShowcaseItemData,
} from '../showcases/showcase-item';
import { PaginationIndicator } from './pagination-indicator';

export type Props = {
  data: ShowcaseItemData[];
};

export function Carousel({ data }: Props) {
  const { width, height } = useWindowDimensions();

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.set(e.contentOffset.y);
  });

  return (
    <>
      <Animated.FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        snapToInterval={height}
        decelerationRate="fast"
        renderItem={({ item, index }) => (
          <View style={{ width, height }}>
            <ShowcaseItem
              item={item}
              index={index}
              scrollY={scrollY}
              itemSize={height}
            />
          </View>
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />

      <View
        className="absolute top-1/2 right-3 gap-1.5 z-50"
        pointerEvents="none"
      >
        {data.map((_, index) => (
          <PaginationIndicator
            key={index}
            index={index}
            scrollY={scrollY}
            itemSize={height}
          />
        ))}
      </View>
    </>
  );
}
