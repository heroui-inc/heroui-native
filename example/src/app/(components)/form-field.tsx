import { Checkbox, DropShadowView, FormField, Switch } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { SectionTitle } from '../../components/section-title';

export default function FormFieldScreen() {
  // Basic usage states
  const [notifications, setNotifications] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [autoUpdate, setAutoUpdate] = React.useState(true);

  // Checkbox states
  const [terms, setTerms] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(true);
  const [marketing, setMarketing] = React.useState(false);

  // Inline states
  const [option1, setOption1] = React.useState(true);
  const [option2, setOption2] = React.useState(false);
  const [option3, setOption3] = React.useState(true);

  // Vertical orientation states
  const [verticalSwitch, setVerticalSwitch] = React.useState(false);
  const [verticalCheckbox, setVerticalCheckbox] = React.useState(true);

  // Disabled and readonly states
  const [disabledSwitch, setDisabledSwitch] = React.useState(true);
  const [readonlySwitch, setReadonlySwitch] = React.useState(true);

  // Validation states
  const [privacyAccepted, setPrivacyAccepted] = React.useState(false);
  const [dataSharing, setDataSharing] = React.useState(false);

  // Different indicator alignments
  const [startAlign, setStartAlign] = React.useState(true);
  const [endAlign, setEndAlign] = React.useState(false);

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic Switch FormField" />
      <FormField isSelected={notifications} onSelectedChange={setNotifications}>
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

      <SectionTitle title="Switch Without Description" />
      <View className="gap-8">
        <FormField isSelected={darkMode} onSelectedChange={setDarkMode}>
          <FormField.Content>
            <FormField.Label>Dark mode</FormField.Label>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>

        <FormField isSelected={autoUpdate} onSelectedChange={setAutoUpdate}>
          <FormField.Content>
            <FormField.Label>Enable automatic updates</FormField.Label>
          </FormField.Content>
          <FormField.Indicator>
            <Switch color="success" />
          </FormField.Indicator>
        </FormField>
      </View>

      <SectionTitle title="Checkbox FormField" />
      <View className="gap-8">
        <FormField isSelected={newsletter} onSelectedChange={setNewsletter}>
          <FormField.Content>
            <FormField.Label>Subscribe to newsletter</FormField.Label>
            <FormField.Description>
              Get weekly updates about new features and tips
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Checkbox color="warning" />
          </FormField.Indicator>
        </FormField>

        <FormField isSelected={marketing} onSelectedChange={setMarketing}>
          <FormField.Content>
            <FormField.Label>Marketing communications</FormField.Label>
          </FormField.Content>
          <FormField.Indicator>
            <Checkbox />
          </FormField.Indicator>
        </FormField>
      </View>

      <SectionTitle title="Inline Layout (Compact)" />
      <View className="flex-row flex-wrap gap-6">
        <FormField isSelected={option1} onSelectedChange={setOption1} isInline>
          <FormField.Content>
            <FormField.Label>WiFi</FormField.Label>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>

        <FormField isSelected={option2} onSelectedChange={setOption2} isInline>
          <FormField.Content>
            <FormField.Label>Bluetooth</FormField.Label>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>

        <FormField isSelected={option3} onSelectedChange={setOption3} isInline>
          <FormField.Content>
            <FormField.Label>Location</FormField.Label>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>
      </View>

      <SectionTitle title="Vertical Orientation" />
      <View className="gap-8">
        <FormField
          isSelected={verticalSwitch}
          onSelectedChange={setVerticalSwitch}
          orientation="vertical"
        >
          <FormField.Content>
            <FormField.Label>Vertical Switch Layout</FormField.Label>
            <FormField.Description>
              The control appears above the text content in this layout
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>

        <FormField
          isSelected={verticalCheckbox}
          onSelectedChange={setVerticalCheckbox}
          orientation="vertical"
        >
          <FormField.Content>
            <FormField.Label>Vertical Checkbox Layout</FormField.Label>
            <FormField.Description>
              Perfect for cards or when you want the control to be prominent
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Checkbox color="danger" />
          </FormField.Indicator>
        </FormField>
      </View>

      <SectionTitle title="Indicator Alignment" />
      <View className="gap-8">
        <FormField
          isSelected={startAlign}
          onSelectedChange={setStartAlign}
          alignIndicator="start"
        >
          <FormField.Content>
            <FormField.Label>Control on the left</FormField.Label>
            <FormField.Description>
              The indicator is aligned to the start (left side)
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>

        <FormField
          isSelected={endAlign}
          onSelectedChange={setEndAlign}
          alignIndicator="end"
        >
          <FormField.Content>
            <FormField.Label>Control on the right (default)</FormField.Label>
            <FormField.Description>
              The indicator is aligned to the end (right side)
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Checkbox />
          </FormField.Indicator>
        </FormField>
      </View>

      <SectionTitle title="Disabled & Read-Only States" />
      <View className="gap-8">
        <FormField
          isSelected={disabledSwitch}
          onSelectedChange={setDisabledSwitch}
          isDisabled
        >
          <FormField.Content>
            <FormField.Label>Disabled control</FormField.Label>
            <FormField.Description>
              This entire field is disabled and cannot be interacted with
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
              This field is read-only. The value can be seen but not changed
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>
      </View>

      <SectionTitle title="Validation & Error States" />
      <View className="gap-8">
        <FormField
          isSelected={terms}
          onSelectedChange={setTerms}
          isInvalid={!terms}
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
          <FormField.Indicator>
            <Checkbox />
          </FormField.Indicator>
          <FormField.ErrorMessage>
            You must accept the terms to continue
          </FormField.ErrorMessage>
        </FormField>

        <FormField
          isSelected={privacyAccepted}
          onSelectedChange={setPrivacyAccepted}
          isInvalid={!privacyAccepted}
        >
          <FormField.Content>
            <FormField.Label>Accept Privacy Policy</FormField.Label>
            <FormField.Description>
              You must accept our privacy policy to create an account
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Checkbox isInvalid={false} />
          </FormField.Indicator>
          <FormField.ErrorMessage>
            Please accept the privacy policy to continue
          </FormField.ErrorMessage>
        </FormField>

        <FormField
          isSelected={dataSharing}
          onSelectedChange={setDataSharing}
          isInvalid={dataSharing}
        >
          <FormField.Content>
            <FormField.Label>Share usage data</FormField.Label>
            <FormField.Description>
              Help improve our product by sharing anonymous usage data
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
          <FormField.ErrorMessage>
            Warning: This will share your usage patterns
          </FormField.ErrorMessage>
        </FormField>
      </View>

      <SectionTitle title="Custom Styling" />
      <View className="gap-8">
        <FormField
          isSelected={notifications}
          onSelectedChange={setNotifications}
          className="bg-surface-2 p-4 rounded-lg border border-border"
        >
          <FormField.Content>
            <FormField.Label classNames={{ text: 'text-lg font-semibold' }}>
              Premium Feature
            </FormField.Label>
            <FormField.Description classNames={{ text: 'text-sm' }}>
              This is a premium feature with custom styling
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Switch color="success" />
          </FormField.Indicator>
        </FormField>

        <DropShadowView
          shadowSize="xl"
          shadowColor="orange"
          className="bg-white rounded-xl"
        >
          <FormField
            isSelected={darkMode}
            onSelectedChange={setDarkMode}
            className="bg-accent/10 p-4 rounded-xl"
          >
            <FormField.Content className="gap-1.5">
              <FormField.Label classNames={{ text: 'text-accent font-bold' }}>
                Highlighted Option
              </FormField.Label>
              <FormField.Description classNames={{ text: 'text-amber-600' }}>
                This option has custom background and text colors
              </FormField.Description>
            </FormField.Content>
            <FormField.Indicator>
              <Checkbox color="warning" />
            </FormField.Indicator>
          </FormField>
        </DropShadowView>
      </View>
    </ScreenScrollView>
  );
}
