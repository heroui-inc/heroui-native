import {
  Description,
  Label,
  RadioGroup,
  Separator,
  Surface,
} from 'heroui-native';
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
            <Label>Instant</Label>
            <Description>Get notifications immediately</Description>
          </View>
        </RadioGroup.Item>
        <Separator className="my-4" />
        <RadioGroup.Item value="daily">
          <RadioGroup.Indicator />
          <View className="flex-1">
            <Label>Daily</Label>
            <Description>Once per day summary of all updates</Description>
          </View>
        </RadioGroup.Item>
        <Separator className="my-4" />
        <RadioGroup.Item value="weekly">
          <RadioGroup.Indicator />
          <View className="flex-1">
            <Label>Weekly</Label>
            <Description>Weekly digest every Monday morning</Description>
          </View>
        </RadioGroup.Item>
      </RadioGroup>
    </Surface>
  );
};
