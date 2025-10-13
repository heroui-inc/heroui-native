import { BlurView } from 'expo-blur';
import { Button, Divider, Select, useTheme } from 'heroui-native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

export default function PopoverNativeModalScreen() {
  const [basicValue, setBasicValue] = useState<SelectOption | undefined>();

  const { isDark } = useTheme();

  const insets = useSafeAreaInsets();

  return (
    <View className="pt-24 px-5">
      <Select
        value={basicValue}
        onValueChange={setBasicValue}
        defaultValue={US_STATES[1]}
      >
        <Select.Trigger asChild>
          <Button variant="tertiary" size="sm" className="w-48">
            <Select.Value placeholder="Select a state" />
          </Button>
        </Select.Trigger>
        <Select.Portal>
          <Select.Overlay className="bg-transparent" />
          <Select.Content
            offset={insets.top + 20}
            className="w-[240px] px-0 bg-transparent overflow-hidden border border-border"
          >
            <BlurView
              tint={
                isDark ? 'systemThickMaterialDark' : 'systemThickMaterialLight'
              }
              style={StyleSheet.absoluteFill}
            />
            <Select.ListLabel className="px-4 mb-2">
              Choose a state
            </Select.ListLabel>
            {US_STATES.slice(0, 6).map((state, index) => (
              <React.Fragment key={state.value}>
                <Select.Item
                  value={state.value}
                  label={state.label}
                  className="px-4"
                />
                {index < 5 && <Divider />}
              </React.Fragment>
            ))}
          </Select.Content>
        </Select.Portal>
      </Select>
    </View>
  );
}
