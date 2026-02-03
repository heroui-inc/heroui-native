import {
  ControlField,
  Description,
  Label,
  Separator,
  Surface,
} from 'heroui-native';
import React from 'react';
import { View } from 'react-native';

interface SwitchFieldProps {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
  title: string;
  description: string;
}

const SwitchField: React.FC<SwitchFieldProps> = ({
  isSelected,
  onSelectedChange,
  title,
  description,
}) => (
  <ControlField isSelected={isSelected} onSelectedChange={onSelectedChange}>
    <View className="flex-1">
      <Label>{title}</Label>
      <Description>{description}</Description>
    </View>
    <ControlField.Indicator />
  </ControlField>
);

export const SwitchContent = () => {
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(false);

  return (
    <Surface className="py-5">
      <SwitchField
        isSelected={emailNotifications}
        onSelectedChange={setEmailNotifications}
        title="Email Notifications"
        description="Receive updates and newsletters via email"
      />
      <Separator className="my-4" />
      <SwitchField
        isSelected={pushNotifications}
        onSelectedChange={setPushNotifications}
        title="Push Notifications"
        description="Get instant alerts on your device"
      />
    </Surface>
  );
};
