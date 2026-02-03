import { LinearGradient } from 'expo-linear-gradient';
import {
  Button,
  ScrollShadow,
  Select,
  useSelect,
  useThemeColor,
} from 'heroui-native';
import { type FC, memo, useEffect, useMemo, useRef } from 'react';
import { FlatList } from 'react-native';

type SelectOption = {
  value: string;
  label: string;
};
const US_STATES: SelectOption[] = [
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
  { value: 'IL', label: 'Illinois' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'OH', label: 'Ohio' },
  { value: 'GA', label: 'Georgia' },
  { value: 'NC', label: 'North Carolina' },
];

const ITEM_HEIGHT = 44;

type PlacementContentListProps = {
  valueIndex: number;
};

const PlacementContentList: FC<PlacementContentListProps> = memo(
  ({ valueIndex }) => {
    const themeColorOverlay = useThemeColor('overlay');

    const listRef = useRef<FlatList>(null);

    useEffect(() => {
      if (valueIndex === 0) {
        setTimeout(() => {
          listRef.current?.scrollToIndex({
            index: 1,
            animated: true,
            viewPosition: 0.5,
          });
        }, 0);
        return;
      }
      setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: valueIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }, 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <ScrollShadow
        LinearGradientComponent={LinearGradient}
        color={themeColorOverlay}
      >
        <FlatList
          ref={listRef}
          data={US_STATES}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          initialScrollIndex={valueIndex}
          renderItem={({ item }) => (
            <Select.Item
              key={item.value}
              value={item.value}
              label={item.label}
              className="py-0"
              style={{
                height: ITEM_HEIGHT,
              }}
            />
          )}
        />
      </ScrollShadow>
    );
  }
);

const PlacementContent = () => {
  const { value } = useSelect();

  const valueIndex = useMemo(
    () => US_STATES.findIndex((item) => item.value === (value?.value ?? 'CA')),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return <PlacementContentList valueIndex={valueIndex} />;
};

type Props = {
  placeholder: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
};

export const PlacementSelect: FC<Props> = ({ placeholder, placement }) => {
  return (
    <Select>
      <Select.Trigger asChild>
        <Button variant="secondary" className="w-32">
          <Select.Value
            placeholder={placeholder}
            numberOfLines={1}
            className="text-accent"
          />
        </Button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay />
        <Select.Content
          presentation="popover"
          width={200}
          placement={placement}
          className="h-[150px]"
        >
          <PlacementContent />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
};
