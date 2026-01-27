import { ControlField, Label, Switch, useThemeColor } from 'heroui-native';
import type { FC } from 'react';
import { View } from 'react-native';
import { BlurContainer } from './blur-container';

type Props = {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
};

export const StyledControlField: FC<Props> = ({
  isSelected,
  onSelectedChange,
}) => {
  const themeColorMuted = useThemeColor('muted');

  return (
    <BlurContainer className="mb-8">
      <ControlField
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
        className="h-full px-6"
      >
        <View className="flex-1">
          <Label className="text-gray-50 text-lg font-semibold">
            Enable Free Trial
          </Label>
        </View>
        <ControlField.Indicator>
          <Switch
            className="w-10"
            animation={{ backgroundColor: { value: ['white', 'white'] } }}
          >
            <Switch.Thumb
              className="size-5"
              animation={{
                backgroundColor: { value: [themeColorMuted, '#262626'] },
              }}
            />
          </Switch>
        </ControlField.Indicator>
      </ControlField>
    </BlurContainer>
  );
};
