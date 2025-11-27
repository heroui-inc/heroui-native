import { Button, useToast } from 'heroui-native';
import { View } from 'react-native';

export default function ToastNativeModalScreen() {
  const { toast } = useToast();

  return (
    <View className="pt-40 px-5 items-center justify-center gap-5">
      <Button
        variant="secondary"
        className="self-center"
        onPress={() => {
          toast.show({
            variant: 'success',
            duration: 2000,
            label: 'Payment successful',
            description:
              'Your subscription has been renewed. You will be charged $9.99/month. Thank you for your continued support.',
            actionLabel: 'Close',
            onActionPress: ({ hide }) => {
              hide();
            },
          });
        }}
      >
        Show toast
      </Button>
      <Button onPress={() => toast.hide('all')} variant="destructive-soft">
        Hide toast
      </Button>
    </View>
  );
}
