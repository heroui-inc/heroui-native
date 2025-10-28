import {
  Divider,
  Select,
  useSelect,
  useTheme,
  type SelectTriggerRef,
} from 'heroui-native';
import React, { useRef, useState, type FC } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { AppText } from '../app-text';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

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
];

const AnimatedTextInputBorder: FC = () => {
  const { progress } = useSelect();

  const rContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1, 2], [0, 1, 0]);
    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[rContainerStyle, styles.borderCurve]}
      className="absolute -inset-[4px] border-[2.5px] border-border rounded-[16px] pointer-events-none"
    />
  );
};

export function SearchableSelect() {
  const [value, setValue] = useState<SelectOption | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const { colors, isDark } = useTheme();

  const triggerRef = useRef<SelectTriggerRef>(null);

  const rTextInputStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isFocused ? colors.panel : colors.default),
    };
  });

  return (
    <Select
      value={value}
      onValueChange={(newValue) => {
        setValue(newValue);
        setSearchQuery('');
      }}
      defaultValue={US_STATES[1]}
    >
      <Select.Trigger ref={triggerRef}>
        <AnimatedTextInputBorder />
        <AnimatedTextInput
          value={isFocused ? searchQuery : searchQuery || value?.label}
          onChangeText={setSearchQuery}
          placeholder={
            isFocused ? (value?.label ?? 'Search state...') : 'Search state...'
          }
          placeholderTextColor={isDark ? colors.mutedForeground : colors.muted}
          className="w-[256px] h-11 px-3 rounded-lg border border-border bg-default flex-row items-center text-foreground"
          style={rTextInputStyle}
          onFocus={() => {
            setIsFocused(true);
            triggerRef.current?.open();
          }}
          onBlur={() => {
            setIsFocused(false);
            triggerRef.current?.close();
          }}
          selectionColor={isFocused ? colors.muted : 'transparent'}
        />
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay
          className="bg-transparent"
          onPress={() => KeyboardController.dismiss()}
        />
        <Select.Content
          width="trigger"
          className="px-0 border border-border rounded-xl"
        >
          {US_STATES.filter((state) =>
            state.label.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((state, index, filteredArray) => (
            <React.Fragment key={state.value}>
              <Select.Item
                value={state.value}
                label={state.label}
                className="px-4"
                onPress={() => KeyboardController.dismiss()}
              />
              {index < filteredArray.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          {US_STATES.filter((state) =>
            state.label.toLowerCase().includes(searchQuery.toLowerCase())
          ).length === 0 && (
            <View className="py-6 items-center">
              <AppText className="text-muted dark:text-muted-foreground">
                No states found
              </AppText>
            </View>
          )}
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
