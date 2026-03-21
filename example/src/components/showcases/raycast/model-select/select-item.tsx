import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';
import { cn, Select, useSelect } from 'heroui-native';
import { type FC } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { useAppTheme } from '../../../../contexts/app-theme-context';
import { AppText } from '../../../app-text';
import { type ModelOption } from './types';

const StyledFontAwesome5 = withUniwind(FontAwesome5);

type Props = {
  data: ModelOption;
};

export const SelectItem: FC<Props> = ({ data }) => {
  const { isDark } = useAppTheme();

  const { value: selectedValue } = useSelect();

  const isSelected = selectedValue?.value === data.value;
  const isSelectedAndroid = isSelected && Platform.OS === 'android';

  return (
    <Select.Item
      key={data.value}
      value={data.value}
      label={data.label}
      className={cn(
        'pl-4 pr-3 py-4 rounded-2xl overflow-hidden',
        isSelectedAndroid && 'bg-neutral-400/40',
        isSelectedAndroid && isDark && 'bg-neutral-800/40'
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
      <Select.ItemIndicator
        className={cn(
          'size-5 rounded-full items-center justify-center bg-muted',
          isDark && 'bg-foreground'
        )}
      >
        <StyledFontAwesome5
          name="check"
          size={10}
          className="text-background"
        />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

const styles = StyleSheet.create({
  container: {
    borderCurve: 'continuous',
  },
});
