import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  useWindowDimensions,
  View,
  type CellRendererProps,
  type FlatListProps,
} from 'react-native';
import type { UsageVariant } from './types';
import { UsageVariantsSelect } from './usage-variants-select';

interface UsageVariantFlatListProps
  extends Omit<FlatListProps<UsageVariant>, 'data'> {
  data: UsageVariant[];
}

export const UsageVariantFlatList = ({
  data,
  ...props
}: UsageVariantFlatListProps) => {
  const [currentVariant, setCurrentVariant] = useState<UsageVariant>(data[0]!);

  const { width, height } = useWindowDimensions();
  const itemHeight = height;

  const listRef = useRef<FlatList<UsageVariant>>(null);

  const renderCell = useCallback(
    ({ children }: CellRendererProps<UsageVariant>) => {
      return <View style={{ width, height }}>{children}</View>;
    },
    [height, width]
  );

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

  return (
    <>
      <FlatList
        ref={listRef}
        data={data}
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
        CellRendererComponent={renderCell}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        {...props}
      />
      <UsageVariantsSelect
        data={data}
        variant={currentVariant}
        setVariant={setCurrentVariant}
        listRef={listRef}
      />
    </>
  );
};
