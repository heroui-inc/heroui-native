import Feather from '@expo/vector-icons/Feather';
import { Divider, Select, useSelect } from 'heroui-native';
import React, { useState, type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

const StyledFeather = withUniwind(Feather);

type SelectOption = {
  value: string;
  label: string;
};

const US_STATES: SelectOption[] = [
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
];

const AnimatedTrigger: FC = () => {
  const { progress } = useSelect();

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
    <View
      className="bg-surface h-[48px] w-[256px] px-3 rounded-2xl justify-center shadow-md shadow-black/5"
      style={styles.borderCurve}
    >
      <Animated.View
        style={[rContainerStyle, styles.borderCurve]}
        className="absolute -inset-1 border-[2.5px] border-accent rounded-[19px] pointer-events-none"
      />
      <Select.Value placeholder="Select a state" />
      <Animated.View style={rChevronStyle} className="absolute right-3">
        <StyledFeather name="chevron-down" size={18} className="text-muted" />
      </Animated.View>
    </View>
  );
};

type Props = {
  contentOffset?: number;
};

export function SelectButtonTrigger({ contentOffset }: Props) {
  const [basicValue, setBasicValue] = useState<SelectOption | undefined>();

  return (
    <Select value={basicValue} onValueChange={setBasicValue}>
      <Select.Trigger>
        <AnimatedTrigger />
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay />
        <Select.Content
          width="trigger"
          offset={contentOffset}
          className="w-[256px]"
        >
          <Select.ListLabel className="mb-2">Choose a state</Select.ListLabel>
          {US_STATES.map((state, index) => (
            <React.Fragment key={state.value}>
              <Select.Item value={state.value} label={state.label} />
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
