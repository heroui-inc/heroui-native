import { Button, Surface, toast, type ToastOptions } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../../components/app-text';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { SectionTitle } from '../../components/section-title';

export default function ToastScreen() {
  const showToast = (options: ToastOptions) => {
    toast(options.title ?? '', options);
  };

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic Variants" />
      <View className="gap-8">
        <Surface className="p-4">
          <View className="gap-4">
            <Button
              variant="secondary"
              onPress={() =>
                showToast({
                  title: 'Default Toast',
                  description: 'This is a default toast notification.',
                })
              }
            >
              Show Default Toast
            </Button>
          </View>
        </Surface>

        <Surface className="p-4">
          <View className="gap-4">
            <Button
              variant="primary"
              onPress={() =>
                showToast({
                  title: 'Success!',
                  description: 'Your action was completed successfully.',
                  variant: 'success',
                })
              }
            >
              Show Success Toast
            </Button>
          </View>
        </Surface>

        <Surface className="p-4">
          <View className="gap-4">
            <Button
              variant="danger"
              onPress={() =>
                showToast({
                  title: 'Error!',
                  description: 'Something went wrong. Please try again.',
                  variant: 'danger',
                })
              }
            >
              Show Danger Toast
            </Button>
          </View>
        </Surface>

        <Surface className="p-4">
          <View className="gap-4">
            <Button
              variant="secondary"
              onPress={() =>
                showToast({
                  title: 'Warning!',
                  description: 'Please review your input before proceeding.',
                  variant: 'warning',
                })
              }
            >
              Show Warning Toast
            </Button>
          </View>
        </Surface>

        <Surface className="p-4">
          <View className="gap-4">
            <Button
              variant="secondary"
              onPress={() =>
                showToast({
                  title: 'Information',
                  description: 'Here is some helpful information for you.',
                  variant: 'default',
                })
              }
            >
              Show Info Toast
            </Button>
          </View>
        </Surface>
      </View>

      <SectionTitle title="Toast with Actions" />
      <View className="gap-8">
        <Surface className="p-4">
          <View className="gap-4">
            <Button
              variant="secondary"
              onPress={() =>
                showToast({
                  title: 'Action Required',
                  description: 'Please confirm your action to continue.',
                  action: {
                    label: 'Confirm',
                    onPress: () => console.log('Action confirmed!'),
                  },
                })
              }
            >
              Show Action Toast
            </Button>
          </View>
        </Surface>

        <Surface className="p-4">
          <View className="gap-4">
            <Button
              variant="secondary"
              onPress={() =>
                showToast({
                  title: 'Item Deleted',
                  description: 'The item has been moved to trash.',
                  action: {
                    label: 'Undo',
                    onPress: () => console.log('Undo action!'),
                  },
                })
              }
            >
              Show Undo Toast
            </Button>
          </View>
        </Surface>
      </View>

      <SectionTitle title="Custom Duration" />
      <View className="gap-8">
        <Surface className="p-4">
          <View className="gap-4">
            <Button
              variant="secondary"
              onPress={() =>
                showToast({
                  title: 'Quick Notice',
                  description: 'This toast will disappear quickly.',
                  duration: 2000,
                })
              }
            >
              Show Short Toast
            </Button>
          </View>
        </Surface>

        <Surface className="p-4">
          <View className="gap-4">
            <AppText className="text-foreground font-semibold">
              Long Duration
            </AppText>
            <AppText className="text-muted-foreground text-sm">
              Toast that stays visible longer (10 seconds)
            </AppText>
            <Button
              variant="secondary"
              onPress={() =>
                showToast({
                  title: 'Important Notice',
                  description: 'This toast will stay visible for 10 seconds.',
                  duration: 10000,
                })
              }
            >
              Show Long Toast
            </Button>
          </View>
        </Surface>
      </View>
    </ScreenScrollView>
  );
}
