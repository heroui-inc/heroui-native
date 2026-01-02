import { Checkbox, cn, FormField } from 'heroui-native';
import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../../contexts/app-theme-context';
import { AppText } from '../../app-text';

export function AppTabContent() {
  const { isDark } = useAppTheme();

  return (
    <View
      className="rounded-3xl border-2 border-yellow-500 overflow-hidden"
      style={styles.formField}
    >
      <FormField
        isSelected
        className={cn(' bg-neutral-50 px-5 py-4', isDark && 'bg-neutral-900')}
      >
        <View className="gap-2">
          <View className="flex-row items-center gap-3">
            <FormField.Indicator>
              <Checkbox className="size-6 rounded-full">
                <Checkbox.Indicator
                  className="bg-yellow-500"
                  iconProps={{
                    size: 16,
                    color: 'white',
                  }}
                  animation={{
                    translateX: { value: [0, 0] },
                  }}
                />
              </Checkbox>
            </FormField.Indicator>
            <AppText className="text-foreground text-lg font-black">
              Lifetime
            </AppText>
          </View>
          <AppText className="text-foreground/80 text-base font-medium">
            $14.99 one-time purchase
          </AppText>
        </View>
      </FormField>
    </View>
  );
}

const styles = StyleSheet.create({
  formField: {
    borderCurve: 'continuous',
  },
});
