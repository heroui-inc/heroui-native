import { Button, Popover } from 'heroui-native';
import { View } from 'react-native';

export default function PopoverNativeModalScreen() {
  return (
    <View className="pt-24 px-5">
      <Popover>
        <Popover.Trigger>
          <Button variant="tertiary">Basic Popover</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay />
          <Popover.Content>
            <Popover.Close className="self-end -mb-2" />
            <View className="gap-2">
              <Popover.Title>Popover from Modal</Popover.Title>
              <Popover.Description>
                This popover is rendered from a native modal screen, testing the
                full window overlay functionality.
              </Popover.Description>
            </View>
            <View className="flex-row justify-end gap-3 mt-4">
              <Popover.Close asChild>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </Popover.Close>
              <Button size="sm">Confirm</Button>
            </View>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
