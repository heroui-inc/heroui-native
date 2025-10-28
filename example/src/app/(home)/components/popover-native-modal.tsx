import { Button, Popover } from 'heroui-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PopoverNativeModalScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="pt-24 px-5">
      <Popover>
        <Popover.Trigger asChild>
          <Button variant="tertiary">Basic Popover</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay />
          <Popover.Content
            width="trigger"
            offset={insets.top + 20}
            className="pb-6"
          >
            <Popover.Close className="self-end -mb-2 z-50" />
            <Popover.Title>Popover from Modal</Popover.Title>
            <Popover.Description>
              This popover is rendered from a native modal screen, testing the
              full window overlay functionality.
            </Popover.Description>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
