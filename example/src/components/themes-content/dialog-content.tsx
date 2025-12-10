import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, Dialog } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import { DialogBlurBackdrop } from '../dialog-blur-backdrop';

const StyledIonicons = withUniwind(Ionicons);

export const DialogContent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog isOpen={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger asChild>
        <Button variant="danger-soft">Delete Account</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogBlurBackdrop />
        <Dialog.Content className="max-w-sm mx-auto">
          <Dialog.Close className="self-end -mb-2 z-50" />
          <View className="size-10 items-center justify-center rounded-full bg-overlay-foreground/5 mb-4">
            <StyledIonicons
              name="warning-outline"
              size={20}
              className="text-danger"
            />
          </View>
          <View className="mb-8 gap-1">
            <Dialog.Title>Delete Account</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently removed.
            </Dialog.Description>
          </View>
          <View className="gap-3">
            <Button
              variant="danger"
              onPress={() => {
                setDialogOpen(false);
                console.log('Account deleted');
              }}
            >
              Delete Account
            </Button>
            <Dialog.Close asChild>
              <Button variant="tertiary" className="bg-overlay-foreground/5">
                Cancel
              </Button>
            </Dialog.Close>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
