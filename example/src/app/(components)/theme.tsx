import { Checkbox, FormField, Switch } from 'heroui-native';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function Theme() {
  const [notifications, setNotifications] = React.useState(false);
  const [terms, setTerms] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(true);

  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="gap-4">
        <FormField
          isSelected={notifications}
          onSelectedChange={setNotifications}
        >
          <FormField.Content>
            <FormField.Label>Enable notifications</FormField.Label>
            <FormField.Description>
              Receive push notifications about your account activity
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>

        <FormField
          isSelected={terms}
          onSelectedChange={setTerms}
          isValid={terms}
        >
          <FormField.Content>
            <FormField.Label>
              I agree to the terms and conditions
            </FormField.Label>
            <FormField.Description>
              By checking this box, you agree to our Terms of Service
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator className="mt-0.5">
            <Checkbox />
          </FormField.Indicator>
          <FormField.ErrorMessage>
            This field is required
          </FormField.ErrorMessage>
        </FormField>

        <FormField isSelected={newsletter} onSelectedChange={setNewsletter}>
          <FormField.Content>
            <FormField.Label>Subscribe to newsletter</FormField.Label>
          </FormField.Content>
          <FormField.Indicator>
            <Checkbox color="warning" />
          </FormField.Indicator>
        </FormField>
      </View>
    </ScrollView>
  );
}
