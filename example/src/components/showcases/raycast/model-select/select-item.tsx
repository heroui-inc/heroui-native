import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';
import { cn, Select, useSelect, useTheme } from 'heroui-native';
import { type FC } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { AppText } from '../../../app-text';
import { type ModelOption } from './types';

type Props = {
  data: ModelOption;
};

export const SelectItem: FC<Props> = ({ data }) => {
  const { colors, isDark } = useTheme();

  const { value: selectedValue } = useSelect();

  const isSelected = selectedValue?.value === data.value;

  return (
    <Select.Item
      key={data.value}
      value={data.value}
      label={data.label}
      className={cn(
        'pl-4 pr-3 py-4 rounded-xl overflow-hidden',
        isSelected &&
          Platform.OS === 'android' &&
          'bg-neutral-400/40 dark:bg-neutral-800/40'
      )}
      style={styles.container}
    >
      {isSelected && Platform.OS === 'ios' && (
        <View className="absolute inset-0">
          <BlurView
            tint={
              isDark
                ? 'systemUltraThinMaterialLight'
                : 'systemUltraThinMaterialDark'
            }
            intensity={isDark ? 10 : 20}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      )}
      <View className="flex-row items-center gap-3 flex-1">
        <AppText className="text-2xl mr-3">{data.emoji}</AppText>
        <AppText className="text-lg text-foreground font-medium flex-1">
          {data.label}
        </AppText>
      </View>
      <Select.ItemIndicator className="size-5 rounded-full items-center justify-center bg-muted dark:bg-foreground">
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
