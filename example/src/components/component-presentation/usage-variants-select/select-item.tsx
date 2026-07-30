import { useLingui } from '@lingui/react/macro';
import { Select, useSelect } from 'heroui-native';
import { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../app-text';
import type { UsageVariant } from '../types';

type Props = {
  data: UsageVariant;
};

export const SelectItem: FC<Props> = ({ data }) => {
  const { t } = useLingui();
  const { value: selectedValue } = useSelect();

  const isSelected =
    !Array.isArray(selectedValue) && selectedValue?.value === data.value;

  return (
    <Select.Item
      key={data.value}
      value={data.value}
      label={t(data.label)}
      className="ps-4 pe-3 py-3 gap-3 rounded-2xl overflow-hidden self-start"
      style={styles.container}
    >
      {isSelected && <View className="absolute inset-0 bg-surface shadow-md" />}
      <AppText
        className="text-lg text-foreground font-medium"
        maxFontSizeMultiplier={1.2}
        numberOfLines={1}
      >
        {t(data.label)}
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
