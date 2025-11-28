import { Divider, FormField, Surface } from 'heroui-native';
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
  <FormField isSelected={isSelected} onSelectedChange={onSelectedChange}>
    <View className="flex-1">
      <FormField.Label>{title}</FormField.Label>
      <FormField.Description>{description}</FormField.Description>
    </View>
    <FormField.Indicator />
  </FormField>
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
      <Divider className="my-4" />
      <SwitchField
        isSelected={pushNotifications}
        onSelectedChange={setPushNotifications}
        title="Push Notifications"
        description="Get instant alerts on your device"
      />
    </Surface>
  );
};
