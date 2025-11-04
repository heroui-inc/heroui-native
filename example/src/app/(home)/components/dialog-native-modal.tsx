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
            <Dialog.Close className="self-end -mb-2" />
            <View className="mb-5 gap-1.5">
              <Dialog.Title>Confirm Action</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to proceed with this action? This cannot
                be undone.
              </Dialog.Description>
            </View>
            <View className="flex-row justify-end gap-3">
              <Dialog.Close asChild>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button size="sm">Confirm</Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
}
