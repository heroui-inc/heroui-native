import { Divider, FormField, Surface, Switch } from 'heroui-native';
import React from 'react';

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
    <FormField.Content>
      <FormField.Title>{title}</FormField.Title>
      <FormField.Description>{description}</FormField.Description>
    </FormField.Content>
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
