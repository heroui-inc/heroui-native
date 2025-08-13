import { Checkbox, useTheme } from 'heroui-native';
import { Minus, Plus } from 'lucide-react-native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

export default function Theme() {
  const [defaultCheck, setDefaultCheck] = React.useState(true);
  const [success, setSuccess] = React.useState(true);
  const [warning, setWarning] = React.useState(true);
  const [danger, setDanger] = React.useState(true);
  const [custom, setCustom] = React.useState(true);

  const { colors } = useTheme();
  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-row gap-4">
        <Checkbox
          isSelected={defaultCheck}
          onSelectedChange={setDefaultCheck}
        />

        <Checkbox
          isSelected={success}
          onSelectedChange={setSuccess}
          color="success"
        />

        <Checkbox
          isSelected={warning}
          onSelectedChange={setWarning}
          color="warning"
        />

        <Checkbox
          isSelected={danger}
          onSelectedChange={setDanger}
          color="danger"
        />

        <Checkbox
          isSelected={custom}
          onSelectedChange={setCustom}
          className="w-8 h-8"
        >
          <Checkbox.Indicator>
            {custom ? (
              <Animated.View key="selected" entering={ZoomIn}>
                <Minus
                  size={16}
                  color={colors.accentForeground}
                  strokeWidth={3}
                />
              </Animated.View>
            ) : (
              <Animated.View key="unselected" entering={ZoomIn}>
                <Plus size={16} color={colors.accent} strokeWidth={3} />
              </Animated.View>
            )}
          </Checkbox.Indicator>
        </Checkbox>
      </View>
    </ScrollView>
  );
}
