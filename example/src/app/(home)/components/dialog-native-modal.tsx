import { Button, Dialog } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';

export default function DialogNativeModalScreen() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="pt-24 px-5">
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <Button variant="secondary" className="self-center">
            Basic dialog
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <View className="mb-5 gap-1.5">
              <Dialog.Title>Confirm Action</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to proceed with this action? This cannot
                be undone.
              </Dialog.Description>
            </View>
            <View className="flex-row justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onPress={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onPress={() => setIsOpen(false)}>
                Confirm
              </Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
}
