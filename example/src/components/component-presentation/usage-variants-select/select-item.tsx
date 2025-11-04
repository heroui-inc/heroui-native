import { Select, useSelect } from 'heroui-native';
import { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../app-text';
import type { UsageVariant } from '../types';

type Props = {
  data: UsageVariant;
};

export const SelectItem: FC<Props> = ({ data }) => {
  const { value: selectedValue } = useSelect();

  const isSelected = selectedValue?.value === data.value;

  return (
    <Select.Item
      key={data.value}
      value={data.value}
      label={data.label}
      className="pl-4 pr-3 py-3 gap-3 rounded-2xl overflow-hidden self-start"
      style={styles.container}
    >
      {isSelected && <View className="absolute inset-0 bg-surface shadow-md" />}
      <AppText className="text-lg text-foreground font-medium">
        {data.label}
      </AppText>
      <Select.ItemIndicator />
    </Select.Item>
  );
};

const styles = StyleSheet.create({
  container: {
    borderCurve: 'continuous',
  },
});
