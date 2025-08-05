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
        <FormField isSelected={switchValue1} onSelectedChange={setSwitchValue1}>
          <FormField.Details>
            <FormField.Label>Enable notifications</FormField.Label>
            <FormField.Description>
              Receive push notifications about your account activity
            </FormField.Description>
          </FormField.Details>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>

        <FormField isSelected={switchValue2} onSelectedChange={setSwitchValue2}>
          <FormField.Details>
            <FormField.Label>Dark mode</FormField.Label>
          </FormField.Details>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>

        <FormField isSelected={switchValue3} onSelectedChange={setSwitchValue3}>
          <FormField.Details>
            <FormField.Label>Enable automatic updates</FormField.Label>
          </FormField.Details>
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
        >
          <FormField.Details>
            <FormField.Label>
              I agree to the terms and conditions
            </FormField.Label>
            <FormField.Description>
              By checking this box, you agree to our Terms of Service and
              Privacy Policy
            </FormField.Description>
          </FormField.Details>
          <FormField.Indicator>
            <Checkbox />
          </FormField.Indicator>
        </FormField>

        <FormField
          isSelected={checkboxValue2}
          onSelectedChange={setCheckboxValue2}
        >
          <FormField.Details>
            <FormField.Label>Subscribe to newsletter</FormField.Label>
          </FormField.Details>
          <FormField.Indicator>
            <Checkbox color="warning" />
          </FormField.Indicator>
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
          <FormField.Details>
            <FormField.Label>Disabled control</FormField.Label>
            <FormField.Description>
              This control is disabled
            </FormField.Description>
          </FormField.Details>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>

        <FormField
          isSelected={readonlySwitch}
          onSelectedChange={setReadonlySwitch}
          isReadOnly
        >
          <FormField.Details>
            <FormField.Label>Read-only control</FormField.Label>
            <FormField.Description>
              This control is read-only
            </FormField.Description>
          </FormField.Details>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>
      </View>
    </ScrollView>
  );
}
