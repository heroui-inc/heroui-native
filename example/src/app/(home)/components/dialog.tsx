import { Button, Dialog } from 'heroui-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { simulatePress } from '../../../helpers/utils/simulate-press';

export default function DialogScreen() {
  const [open, setOpen] = useState(false);

  return (
    <ScreenScrollView contentContainerClassName="gap-8">
      <View />
      {/* Basic Dialog */}
      <Dialog>
        <Dialog.Trigger>
          <Button variant="primary">Open Basic Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Body className="gap-2">
            <Dialog.Title>Dialog Title</Dialog.Title>
            <Dialog.Description>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
              laudantium voluptates suscipit magnam nemo nesciunt repellat,
              explicabo, beatae nobis maxime, obcaecati non dolorum?
            </Dialog.Description>
          </Dialog.Body>
          <Dialog.Footer className="flex-row w-full gap-3">
            <Button
              variant="primary"
              className="flex-1"
              onPress={simulatePress}
            >
              Confirm
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      {/* Dialog without Close Button */}
      <Dialog>
        <Dialog.Trigger>
          <Button variant="secondary">Open Dialog without Close Button</Button>
        </Dialog.Trigger>
        <Dialog.Content isCloseVisible={false}>
          <Dialog.Header>
            <Dialog.Title>Confirm Action</Dialog.Title>
            <Dialog.Description>
              This action cannot be undone. Please confirm to proceed.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Button variant="ghost" onPress={() => {}}>
              Cancel
            </Button>
            <Button variant="danger" onPress={() => {}}>
              Delete
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      {/* Controlled Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button variant="tertiary">Open Controlled Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Controlled Dialog</Dialog.Title>
            <Dialog.Description>
              This dialog's state is controlled by the parent component.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <Text className="text-foreground">
              Open state: {open ? 'Open' : 'Closed'}
            </Text>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="primary" onPress={() => setOpen(false)}>
              Close Dialog
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      {/* Dialog with Custom Content */}
      <View>
        <Dialog>
          <Dialog.Trigger>
            <Button variant="ghost">Open Custom Dialog</Button>
          </Dialog.Trigger>
          <Dialog.Content className="max-w-sm">
            <View className="items-center py-6">
              <View className="h-20 w-20 rounded-full bg-primary/10 items-center justify-center mb-4">
                <Text className="text-4xl">🎉</Text>
              </View>
              <Dialog.Title>Success!</Dialog.Title>
              <Dialog.Description className="text-center mt-2">
                Your action has been completed successfully.
              </Dialog.Description>
              <Button variant="primary" className="mt-6 w-full">
                Got it
              </Button>
            </View>
          </Dialog.Content>
        </Dialog>
      </View>

      {/* Dialog with Long Content */}
      <Dialog>
        <Dialog.Trigger>
          <Button variant="primary">Open Long Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Terms and Conditions</Dialog.Title>
            <Dialog.Description>
              Please read and accept our terms
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <ScrollView className="max-h-60">
              <Text className="text-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
                {'\n\n'}
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
                {'\n\n'}
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
                {'\n\n'}
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.
              </Text>
            </ScrollView>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="secondary">Decline</Button>
            <Button variant="primary">Accept</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </ScreenScrollView>
  );
}
