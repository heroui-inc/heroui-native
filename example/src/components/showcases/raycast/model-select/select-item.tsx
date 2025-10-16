import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { cn, Select, useSelect, useTheme } from 'heroui-native';
import { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../../app-text';
import { type ModelOption } from './types';

type Props = {
  data: ModelOption;
};

export const SelectItem: FC<Props> = ({ data }) => {
  const { colors } = useTheme();

  const { value: selectedValue } = useSelect();

  const isSelected = selectedValue?.value === data.value;

  return (
    <Select.Item
      key={data.value}
      value={data.value}
      label={data.label}
      className={cn(
        'pl-4 pr-3 py-4 rounded-xl',
        isSelected && 'bg-neutral-800/40'
      )}
      style={styles.container}
    >
      <View className="flex-row items-center gap-3 flex-1">
        <AppText className="text-2xl mr-3">{data.flag}</AppText>
        <AppText className="text-lg text-foreground font-medium flex-1">
          {data.label}
        </AppText>
      </View>
      <Select.ItemIndicator className="size-5 rounded-full items-center justify-center bg-foreground">
        <FontAwesome5 name="check" size={10} color={colors.background} />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

const styles = StyleSheet.create({
  container: {
    borderCurve: 'continuous',
  },
});
