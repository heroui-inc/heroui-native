import { useLingui } from '@lingui/react/macro';
import {
  Description,
  Label,
  Radio,
  RadioGroup,
  Separator,
  Surface,
} from 'heroui-native';
import React from 'react';
import { View } from 'react-native';

export const RadioGroupContent = () => {
  const { t } = useLingui();
  const [frequency, setFrequency] = React.useState('daily');

  return (
    <Surface className="py-5">
      <RadioGroup
        value={frequency}
        onValueChange={setFrequency}
        className="gap-0"
      >
        <RadioGroup.Item value="instant">
          <Radio />
          <View className="flex-1">
            <Label>{t`Instant`}</Label>
            <Description>{t`Get notifications immediately`}</Description>
          </View>
        </RadioGroup.Item>
        <Separator className="my-4" />
        <RadioGroup.Item value="daily">
          <Radio />
          <View className="flex-1">
            <Label>{t`Daily`}</Label>
            <Description>{t`Once per day summary of all updates`}</Description>
          </View>
        </RadioGroup.Item>
        <Separator className="my-4" />
        <RadioGroup.Item value="weekly">
          <Radio />
          <View className="flex-1">
            <Label>{t`Weekly`}</Label>
            <Description>{t`Weekly digest every Monday morning`}</Description>
          </View>
        </RadioGroup.Item>
      </RadioGroup>
    </Surface>
  );
};
