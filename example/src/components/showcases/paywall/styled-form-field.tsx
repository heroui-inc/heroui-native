import { FormField, Switch, useThemeColor } from 'heroui-native';
import type { FC } from 'react';
import { BlurContainer } from './blur-container';

type Props = {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
};

export const StyledFormField: FC<Props> = ({
  isSelected,
  onSelectedChange,
}) => {
  const themeColorMuted = useThemeColor('muted');

  return (
    <BlurContainer className="mb-8">
      <FormField
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
        className="h-full px-6"
      >
        <FormField.Content>
          <FormField.Title className="text-gray-50 text-lg font-semibold">
            Enable Free Trial
          </FormField.Title>
        </FormField.Content>
        <FormField.Indicator>
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
        </FormField.Indicator>
      </FormField>
    </BlurContainer>
  );
};
