import { Alert, Button, CloseButton, Spinner } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const DefaultAndAccentContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>New features available</Alert.Title>
            <Alert.Description>
              Check out our latest updates including dark mode support and
              improved accessibility features.
            </Alert.Description>
          </Alert.Content>
        </Alert>
        <Alert status="accent">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Update available</Alert.Title>
            <Alert.Description>
              A new version of the application is available. Please refresh to
              get the latest features and bug fixes.
            </Alert.Description>
          </Alert.Content>
        </Alert>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SuccessWarningDangerContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert status="success">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Success</Alert.Title>
            <Alert.Description>
              Your profile information has been updated. Review the changes in
              your account settings.
            </Alert.Description>
          </Alert.Content>
        </Alert>
        <Alert status="warning">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Scheduled maintenance</Alert.Title>
            <Alert.Description>
              Our services will be unavailable on Sunday, March 15th from 2:00
              AM to 6:00 AM UTC for scheduled maintenance.
            </Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert status="danger">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Unable to connect to server</Alert.Title>
            <Alert.Description>
              Unable to connect to the server. Check your internet connection
              and try again.
            </Alert.Description>
          </Alert.Content>
        </Alert>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithButtonsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert status="accent">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Update available</Alert.Title>
            <Alert.Description>
              A new version of the application is available. Please refresh to
              get the latest features and bug fixes.
            </Alert.Description>
          </Alert.Content>
          <Button size="sm" variant="primary">
            Refresh
          </Button>
        </Alert>

        <Alert status="danger">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Unable to connect to server</Alert.Title>
            <Alert.Description>
              Unable to connect to the server. Check your internet connection
              and try again.
            </Alert.Description>
          </Alert.Content>
          <Button size="sm" variant="danger">
            Retry
          </Button>
        </Alert>

        <Alert status="success" className="items-center">
          <Alert.Indicator className="pt-0" />
          <Alert.Content>
            <Alert.Title>Profile updated successfully</Alert.Title>
          </Alert.Content>
          <CloseButton />
        </Alert>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithCustomIndicatorContent = () => {
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
            <Alert.Title>Processing your request</Alert.Title>
            <Alert.Description>
              Please wait while we sync your data. This may take a few moments.
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
    label: 'Default & Accent',
    content: <DefaultAndAccentContent />,
  },
  {
    value: 'success-warning-danger',
    label: 'Success, Warning, Danger',
    content: <SuccessWarningDangerContent />,
  },
  {
    value: 'title-only',
    label: 'With buttons',
    content: <WithButtonsContent />,
  },
  {
    value: 'with-custom-indicator',
    label: 'With custom indicator',
    content: <WithCustomIndicatorContent />,
  },
];

export default function AlertScreen() {
  return <UsageVariantFlatList data={ALERT_VARIANTS} />;
}
