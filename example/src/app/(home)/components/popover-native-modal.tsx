import { Button, Popover } from 'heroui-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PopoverNativeModalScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="pt-24 px-5">
      <Popover>
        <Popover.Trigger>
          <Button variant="tertiary">Basic Popover</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay />
          <Popover.Content offset={insets.top + 20}>
            <Popover.Close className="self-end -mb-2" />
            <View className="gap-2">
              <Popover.Title>Popover from Modal</Popover.Title>
              <Popover.Description>
                This popover is rendered from a native modal screen, testing the
                full window overlay functionality.
              </Popover.Description>
            </View>
            <View className="flex-row justify-end gap-3 mt-8">
              <Popover.Close asChild>
                <Button skipLayoutAnimation variant="ghost" size="sm">
                  Cancel
                </Button>
              </Popover.Close>
              <Button skipLayoutAnimation size="sm">
                Confirm
              </Button>
            </View>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
