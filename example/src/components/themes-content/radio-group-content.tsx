import { Divider, RadioGroup, Surface } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';

export const RadioGroupContent = () => {
  const [frequency, setFrequency] = React.useState('daily');

  return (
    <Surface className="py-5">
      <RadioGroup
        value={frequency}
        onValueChange={setFrequency}
        className="gap-0"
      >
        <RadioGroup.Item value="instant">
          <RadioGroup.Indicator />
          <View className="flex-1">
            <RadioGroup.Label>Instant</RadioGroup.Label>
            <RadioGroup.Description>
              Get notifications immediately
            </RadioGroup.Description>
          </View>
        </RadioGroup.Item>
        <Divider className="my-4" />
        <RadioGroup.Item value="daily">
          <RadioGroup.Indicator />
          <View className="flex-1">
            <RadioGroup.Label>Daily</RadioGroup.Label>
            <RadioGroup.Description>
              Once per day summary of all updates
            </RadioGroup.Description>
          </View>
        </RadioGroup.Item>
        <Divider className="my-4" />
        <RadioGroup.Item value="weekly">
          <RadioGroup.Indicator />
          <View className="flex-1">
            <RadioGroup.Label>Weekly</RadioGroup.Label>
            <RadioGroup.Description>
              Weekly digest every Monday morning
            </RadioGroup.Description>
          </View>
        </RadioGroup.Item>
      </RadioGroup>
    </Surface>
  );
};
