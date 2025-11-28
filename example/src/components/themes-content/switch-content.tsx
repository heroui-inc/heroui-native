import { Divider, FormField, Surface, Switch } from 'heroui-native';
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
    <View className="flex-shrink-0 flex-1">
      <FormField.Title>{title}</FormField.Title>
      <FormField.Description>{description}</FormField.Description>
    </View>
    <FormField.Indicator>
      <Switch />
    </FormField.Indicator>
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
