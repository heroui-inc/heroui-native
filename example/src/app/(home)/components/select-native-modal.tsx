import { Button, Select } from 'heroui-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PopoverNativeModalScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="pt-24 px-5">
      <Select>
        <Select.Trigger asChild>
          <Button variant="tertiary">Basic Select</Button>
        </Select.Trigger>
        <Select.Portal>
          <Select.Overlay />
          <Select.Content offset={insets.top + 20} className="pb-6">
            <Select.Close className="self-end -mb-2 z-50" />
            <Select.Title>Select from Modal</Select.Title>
            <Select.Description>
              This select is rendered from a native modal screen, testing the
              full window overlay functionality.
            </Select.Description>
          </Select.Content>
        </Select.Portal>
      </Select>
    </View>
  );
}
