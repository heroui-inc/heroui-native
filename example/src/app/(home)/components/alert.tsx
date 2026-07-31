import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { Alert, Button, CloseButton, Spinner } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const DefaultAndAccentContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title maxFontSizeMultiplier={1.4}>
              {t`New features available`}
            </Alert.Title>
            <Alert.Description maxFontSizeMultiplier={1.4}>
              {t`Check out our latest updates including dark mode support and improved accessibility features.`}
            </Alert.Description>
          </Alert.Content>
        </Alert>
        <Alert status="accent">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title maxFontSizeMultiplier={1.4}>
              {t`Update available`}
            </Alert.Title>
            <Alert.Description maxFontSizeMultiplier={1.4}>
              {t`A new version of the application is available. Please refresh to get the latest features and bug fixes.`}
            </Alert.Description>
          </Alert.Content>
        </Alert>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SuccessWarningDangerContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert status="success">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title maxFontSizeMultiplier={1}>{t`Success`}</Alert.Title>
            <Alert.Description maxFontSizeMultiplier={1}>
              {t`Your profile information has been updated. Review the changes in your account settings.`}
            </Alert.Description>
          </Alert.Content>
        </Alert>
        <Alert status="warning">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title maxFontSizeMultiplier={1}>
              {t`Scheduled maintenance`}
            </Alert.Title>
            <Alert.Description maxFontSizeMultiplier={1}>
              {t`Our services will be unavailable on Sunday, March 15th from 2:00 AM to 6:00 AM UTC for scheduled maintenance.`}
            </Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert status="danger">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title maxFontSizeMultiplier={1}>
              {t`Unable to connect to server`}
            </Alert.Title>
            <Alert.Description maxFontSizeMultiplier={1}>
              {t`Unable to connect to the server. Check your internet connection and try again.`}
            </Alert.Description>
          </Alert.Content>
        </Alert>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithButtonsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert status="accent">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title maxFontSizeMultiplier={1}>
              {t`Update available`}
            </Alert.Title>
            <Alert.Description maxFontSizeMultiplier={1}>
              {t`A new version of the application is available. Please refresh to get the latest features and bug fixes.`}
            </Alert.Description>
          </Alert.Content>
          <Button size="sm" variant="primary">
            {t`Refresh`}
          </Button>
        </Alert>

        <Alert status="danger">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title maxFontSizeMultiplier={1}>
              {t`Unable to connect to server`}
            </Alert.Title>
            <Alert.Description maxFontSizeMultiplier={1}>
              {t`Unable to connect to the server. Check your internet connection and try again.`}
            </Alert.Description>
          </Alert.Content>
          <Button size="sm" variant="danger">
            {t`Retry`}
          </Button>
        </Alert>

        <Alert status="success" className="items-center">
          <Alert.Indicator className="pt-0" />
          <Alert.Content>
            <Alert.Title maxFontSizeMultiplier={1}>
              {t`Profile updated successfully`}
            </Alert.Title>
          </Alert.Content>
          <CloseButton />
        </Alert>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithCustomIndicatorContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert status="accent">
          <Alert.Indicator className="pt-px">
            <Spinner>
              <Spinner.Indicator iconProps={{ width: 20, height: 20 }} />
            </Spinner>
          </Alert.Indicator>
          <Alert.Content>
            <Alert.Title>{t`Processing your request`}</Alert.Title>
            <Alert.Description>
              {t`Please wait while we sync your data. This may take a few moments.`}
            </Alert.Description>
          </Alert.Content>
        </Alert>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ALERT_VARIANTS: UsageVariant[] = [
  {
    value: 'default',
    label: msg`Default & Accent`,
    content: <DefaultAndAccentContent />,
  },
  {
    value: 'success-warning-danger',
    label: msg`Success, Warning, Danger`,
    content: <SuccessWarningDangerContent />,
  },
  {
    value: 'title-only',
    label: msg`With buttons`,
    content: <WithButtonsContent />,
  },
  {
    value: 'with-custom-indicator',
    label: msg`With custom indicator`,
    content: <WithCustomIndicatorContent />,
  },
];

export default function AlertScreen() {
  return <UsageVariantFlatList data={ALERT_VARIANTS} />;
}
