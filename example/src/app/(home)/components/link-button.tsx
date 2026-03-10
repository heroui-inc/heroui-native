import { Button, Checkbox, ControlField, LinkButton } from 'heroui-native';
import React from 'react';
import { Alert, View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const TermsAndPrivacyContent = () => {
  const [isAgreed, setIsAgreed] = React.useState(false);

  const handleTermsPress = () => Alert.alert('Terms', 'Navigate to Terms');
  const handlePrivacyPress = () =>
    Alert.alert('Privacy', 'Navigate to Privacy Policy');

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="w-full max-w-xs gap-6">
        <ControlField
          isSelected={isAgreed}
          onSelectedChange={setIsAgreed}
          className="items-start"
        >
          <ControlField.Indicator>
            <Checkbox className="mt-0.5" />
          </ControlField.Indicator>
          <View className="flex-row flex-wrap flex-1">
            <AppText className="text-sm text-muted">I agree to the </AppText>
            <LinkButton size="sm" onPress={handleTermsPress}>
              <LinkButton.Label className="text-accent">
                Terms of Service
              </LinkButton.Label>
            </LinkButton>
            <AppText className="text-sm text-muted"> and </AppText>
            <LinkButton size="sm" onPress={handlePrivacyPress}>
              <LinkButton.Label className="text-accent">
                Privacy Policy
              </LinkButton.Label>
            </LinkButton>
          </View>
        </ControlField>
        <Button isDisabled={!isAgreed}>Sign up</Button>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledStateContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center gap-4">
        <LinkButton>Enabled</LinkButton>
        <LinkButton isDisabled>Disabled</LinkButton>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const LINK_BUTTON_VARIANTS: UsageVariant[] = [
  {
    value: 'terms-and-privacy',
    label: 'Terms & Privacy',
    content: <TermsAndPrivacyContent />,
  },
  {
    value: 'disabled-state',
    label: 'Disabled state',
    content: <DisabledStateContent />,
  },
];

export default function LinkButtonScreen() {
  return <UsageVariantFlatList data={LINK_BUTTON_VARIANTS} />;
}
