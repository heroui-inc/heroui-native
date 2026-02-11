import { Alert } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const DefaultContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Information</Alert.Title>
            <Alert.Description>
              This is a default alert with an informational message.
            </Alert.Description>
          </Alert.Content>
        </Alert>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const StatusesContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert status="default">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Default</Alert.Title>
            <Alert.Description>
              This is a default status alert.
            </Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert status="accent">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Accent</Alert.Title>
            <Alert.Description>
              This is an accent status alert.
            </Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert status="success">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Success</Alert.Title>
            <Alert.Description>
              Your changes have been saved successfully.
            </Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert status="warning">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Warning</Alert.Title>
            <Alert.Description>
              Your session is about to expire in 5 minutes.
            </Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert status="danger">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Danger</Alert.Title>
            <Alert.Description>
              Failed to save your changes. Please try again.
            </Alert.Description>
          </Alert.Content>
        </Alert>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TitleOnlyContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert status="default">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>A simple informational alert</Alert.Title>
          </Alert.Content>
        </Alert>

        <Alert status="success">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Operation completed</Alert.Title>
          </Alert.Content>
        </Alert>

        <Alert status="warning">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Proceed with caution</Alert.Title>
          </Alert.Content>
        </Alert>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DescriptionOnlyContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert status="default">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Description>
              Your profile information has been updated. Review the changes in
              your account settings.
            </Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert status="danger">
          <Alert.Indicator />
          <Alert.Content>
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

const WithoutIndicatorContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert status="default">
          <Alert.Content>
            <Alert.Title>No indicator</Alert.Title>
            <Alert.Description>
              This alert does not have an indicator icon.
            </Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert status="success">
          <Alert.Content>
            <Alert.Title>Saved</Alert.Title>
            <Alert.Description>
              All changes were saved without an icon.
            </Alert.Description>
          </Alert.Content>
        </Alert>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomStylingContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Alert
          status="accent"
          className="p-3 flex-row gap-2 rounded-3xl bg-accent-soft shadow-surface"
        >
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title className="text-accent">Custom accent</Alert.Title>
            <Alert.Description>
              This alert uses a custom soft accent background.
            </Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert
          status="danger"
          className="p-3 flex-row gap-2 rounded-3xl bg-danger-soft shadow-surface"
        >
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Critical error</Alert.Title>
            <Alert.Description>
              This alert uses a custom soft danger background.
            </Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert
          status="success"
          className="p-3 flex-row gap-2 rounded-3xl bg-success-soft shadow-surface"
        >
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>All systems go</Alert.Title>
            <Alert.Description>
              This alert uses a custom soft success background.
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
    label: 'Default',
    content: <DefaultContent />,
  },
  {
    value: 'statuses',
    label: 'Statuses',
    content: <StatusesContent />,
  },
  {
    value: 'title-only',
    label: 'Title only',
    content: <TitleOnlyContent />,
  },
  {
    value: 'description-only',
    label: 'Description only',
    content: <DescriptionOnlyContent />,
  },
  {
    value: 'without-indicator',
    label: 'Without indicator',
    content: <WithoutIndicatorContent />,
  },
  {
    value: 'custom-styling',
    label: 'Custom styling',
    content: <CustomStylingContent />,
  },
];

export default function AlertScreen() {
  return <UsageVariantFlatList data={ALERT_VARIANTS} />;
}
