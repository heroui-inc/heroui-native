import { Checkbox, FormField, Switch } from 'heroui-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function FormFieldScreen() {
  const [switchValue1, setSwitchValue1] = React.useState(false);
  const [switchValue2, setSwitchValue2] = React.useState(true);
  const [switchValue3, setSwitchValue3] = React.useState(false);
  const [checkboxValue1, setCheckboxValue1] = React.useState(false);
  const [checkboxValue2, setCheckboxValue2] = React.useState(true);
  const [disabledSwitch, setDisabledSwitch] = React.useState(true);
  const [readonlySwitch, setReadonlySwitch] = React.useState(true);

  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center justify-center p-4"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        With Switch
      </Text>

      <View className="w-full max-w-lg gap-4 mb-6">
        <FormField
          isSelected={switchValue1}
          onSelectedChange={setSwitchValue1}
          isValid={!switchValue1}
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

        <View className="flex-row flex-wrap gap-x-6 gap-y-3">
          <FormField
            isSelected={switchValue2}
            onSelectedChange={setSwitchValue2}
            isInline
          >
            <FormField.Content>
              <FormField.Label>Dark mode</FormField.Label>
            </FormField.Content>
            <FormField.Indicator>
              <Switch />
            </FormField.Indicator>
          </FormField>
          <FormField
            isSelected={switchValue2}
            onSelectedChange={setSwitchValue2}
            isInline
          >
            <FormField.Content>
              <FormField.Label>Dark mode</FormField.Label>
            </FormField.Content>
            <FormField.Indicator>
              <Switch />
            </FormField.Indicator>
          </FormField>
        </View>

        <FormField isSelected={switchValue3} onSelectedChange={setSwitchValue3}>
          <FormField.Content>
            <FormField.Label>Enable automatic updates</FormField.Label>
          </FormField.Content>
          <FormField.Indicator>
            <Switch color="success" />
          </FormField.Indicator>
        </FormField>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        With Checkbox
      </Text>

      <View className="w-full max-w-lg gap-4 mb-6">
        <FormField
          isSelected={checkboxValue1}
          onSelectedChange={setCheckboxValue1}
          isValid={checkboxValue1}
          alignIndicator="start"
          className="items-start"
        >
          <FormField.Content>
            <FormField.Label>
              I agree to the terms and conditions
            </FormField.Label>
            <FormField.Description>
              By checking this box, you agree to our Terms of Service and
              Privacy Policy
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator className="mt-0.5">
            <Checkbox />
          </FormField.Indicator>
          <FormField.ErrorMessage className="ml-[31px] mt-1">
            This field is required
          </FormField.ErrorMessage>
        </FormField>

        <FormField
          isSelected={checkboxValue2}
          onSelectedChange={setCheckboxValue2}
          isValid={checkboxValue2}
        >
          <FormField.Content>
            <FormField.Label>Subscribe to newsletter</FormField.Label>
          </FormField.Content>
          <FormField.Indicator>
            <Checkbox color="warning" />
          </FormField.Indicator>
          <FormField.ErrorMessage>
            This field is required
          </FormField.ErrorMessage>
        </FormField>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        States
      </Text>

      <View className="w-full max-w-lg gap-4 mb-6">
        <FormField
          isSelected={disabledSwitch}
          onSelectedChange={setDisabledSwitch}
          isDisabled
        >
          <FormField.Content>
            <FormField.Label>Disabled control</FormField.Label>
            <FormField.Description>
              This control is disabled
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>

        <FormField
          isSelected={readonlySwitch}
          onSelectedChange={setReadonlySwitch}
          isReadOnly
        >
          <FormField.Content>
            <FormField.Label>Read-only control</FormField.Label>
            <FormField.Description>
              This control is read-only
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>
      </View>
    </ScrollView>
  );
}
