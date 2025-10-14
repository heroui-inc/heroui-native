/* eslint-disable react-native/no-inline-styles */
import Feather from '@expo/vector-icons/Feather';
import { BlurView } from 'expo-blur';
import { cn, Divider, Select, useSelect, useTheme } from 'heroui-native';
import React, { useState, type FC } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

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

const AnimatedTrigger: FC = () => {
  const { progress, selectState } = useSelect();

  const { colors, isDark } = useTheme();

  const rContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1, 2], [0, 1, 0]);
    return {
      opacity,
    };
  });

  const rChevronStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, 1, 2], [0, -180, 0]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  return (
    <Animated.View
      className="bg-default border border-border rounded-lg h-11 w-[256px] px-3 justify-center"
      style={[
        styles.borderCurve,
        {
          transitionProperty: 'backgroundColor',
          transitionDuration: 400,
          backgroundColor:
            selectState === 'open' ? colors.panel : colors.default,
        },
      ]}
    >
      <Animated.View
        style={[rContainerStyle, styles.borderCurve]}
        className="absolute -inset-[5px] border-[2.5px] border-border rounded-[16px] pointer-events-none"
      />
      <Select.Value placeholder="Select a state" />
      <Animated.View style={rChevronStyle} className="absolute right-3">
        <Feather
          name="chevron-down"
          size={18}
          color={isDark ? colors.mutedForeground : colors.muted}
        />
      </Animated.View>
    </Animated.View>
  );
};

type Props = {
  contentOffset?: number;
};

export function SelectButtonTrigger({ contentOffset }: Props) {
  const [basicValue, setBasicValue] = useState<SelectOption | undefined>();
  const { isDark } = useTheme();

  return (
    <Select value={basicValue} onValueChange={setBasicValue}>
      <Select.Trigger>
        <AnimatedTrigger />
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay className="bg-transparent" />
        <Select.Content
          offset={contentOffset}
          className={cn(
            'w-[256px] px-0 border border-border rounded-xl',
            Platform.OS === 'ios' && 'bg-panel/5'
          )}
        >
          <View className="absolute inset-0 rounded-xl overflow-hidden">
            {Platform.OS === 'ios' && (
              <BlurView
                tint={
                  isDark
                    ? 'systemThickMaterialDark'
                    : 'systemThickMaterialLight'
                }
                style={StyleSheet.absoluteFill}
              />
            )}
          </View>
          <Select.ListLabel className="px-4 mb-2">
            Choose a state
          </Select.ListLabel>
          {US_STATES.map((state, index) => (
            <React.Fragment key={state.value}>
              <Select.Item
                value={state.value}
                label={state.label}
                className="px-4"
              />
              {index < US_STATES.length - 1 && <Divider />}
            </React.Fragment>
          ))}
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
