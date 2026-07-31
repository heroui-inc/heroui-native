import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { Button, Checkbox, ControlField, LinkButton } from 'heroui-native';
import React from 'react';
import { Alert, View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const TermsAndPrivacyContent = () => {
  const { t } = useLingui();
  const [isAgreed, setIsAgreed] = React.useState(false);

  const handleTermsPress = () => Alert.alert(t`Terms`, t`Navigate to Terms`);
  const handlePrivacyPress = () =>
    Alert.alert(t`Privacy`, t`Navigate to Privacy Policy`);

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
            <AppText className="text-sm text-muted">{t`I agree to the `}</AppText>
            <LinkButton size="sm" onPress={handleTermsPress}>
              <LinkButton.Label className="text-accent-soft-foreground">
                {t`Terms of Service`}
              </LinkButton.Label>
            </LinkButton>
            <AppText className="text-sm text-muted">{t` and `}</AppText>
            <LinkButton size="sm" onPress={handlePrivacyPress}>
              <LinkButton.Label className="text-accent-soft-foreground">
                {t`Privacy Policy`}
              </LinkButton.Label>
            </LinkButton>
          </View>
        </ControlField>
        <Button isDisabled={!isAgreed}>{t`Sign up`}</Button>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledStateContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center gap-4">
        <LinkButton>{t`Enabled`}</LinkButton>
        <LinkButton isDisabled>{t`Disabled`}</LinkButton>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const LINK_BUTTON_VARIANTS: UsageVariant[] = [
  {
    value: 'terms-and-privacy',
    label: msg`Terms & Privacy`,
    content: <TermsAndPrivacyContent />,
  },
  {
    value: 'disabled-state',
    label: msg`Disabled state`,
    content: <DisabledStateContent />,
  },
];

export default function LinkButtonScreen() {
  return <UsageVariantFlatList data={LINK_BUTTON_VARIANTS} />;
}
