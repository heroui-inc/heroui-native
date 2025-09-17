import { LinearGradient } from 'expo-linear-gradient';
import { Button, Dialog, ScrollShadow } from 'heroui-native';
import { useState } from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { simulatePress } from '../../../helpers/utils/simulate-press';

export default function DialogScreen() {
  const [open, setOpen] = useState(false);

  const { height } = useWindowDimensions();

  return (
    <ScreenScrollView contentContainerClassName="gap-8">
      <View />
      {/* Basic Dialog */}
      <Dialog>
        <Dialog.Trigger>
          <Button variant="primary">Open Basic Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close />
            <Dialog.Title>Dialog Title</Dialog.Title>
            <Dialog.Description>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
              laudantium voluptates suscipit magnam nemo nesciunt repellat,
              explicabo, beatae nobis maxime, obcaecati non dolorum?
            </Dialog.Description>
            <View className="flex-row w-full gap-3 mt-4">
              <Button
                variant="primary"
                className="flex-1"
                onPress={simulatePress}
              >
                Confirm
              </Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>

      {/* Dialog with Custom Close Icon */}
      <Dialog>
        <Dialog.Trigger>
          <Button variant="secondary">Dialog with Custom Close Icon</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close iconProps={{ size: 24, color: '#ff0000' }} />
            <Dialog.Title>Confirm Action</Dialog.Title>
            <Dialog.Description>
              This action cannot be undone. Please confirm to proceed.
            </Dialog.Description>
            <View className="flex-row gap-3 mt-4">
              <Button variant="ghost" onPress={() => {}}>
                Cancel
              </Button>
              <Button variant="danger" onPress={() => {}}>
                Delete
              </Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>

      {/* Controlled Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button variant="tertiary">Open Controlled Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close />
            <Dialog.Title>Controlled Dialog</Dialog.Title>
            <Dialog.Description>
              This dialog's state is controlled by the parent component.
            </Dialog.Description>
            <Text className="text-foreground mt-4">
              Open state: {open ? 'Open' : 'Closed'}
            </Text>
            <Button
              variant="primary"
              className="mt-4"
              onPress={() => setOpen(false)}
            >
              Close Dialog
            </Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>

      {/* Dialog with Custom Content */}
      <View>
        <Dialog>
          <Dialog.Trigger>
            <Button variant="ghost">Open Custom Dialog</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
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
          </Dialog.Portal>
        </Dialog>
      </View>

      {/* Dialog with Long Content */}
      <Dialog>
        <Dialog.Trigger>
          <Button variant="primary">Open Scroll Content Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content className="rounded-2xl px-0">
            <Dialog.Close className="mr-4" />
            <Dialog.Title className="text-center mb-5">
              Upload Audio
            </Dialog.Title>
            <ScrollShadow
              LinearGradientComponent={LinearGradient}
              style={{ height: height * 0.35 }}
            >
              <ScrollView contentContainerClassName="px-6">
                <Text className="text-foreground/80 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                  {'\n\n'}
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                  {'\n\n'}
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                  {'\n\n'}
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt.
                  {'\n\n'}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                  {'\n\n'}
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                  {'\n\n'}
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                  {'\n\n'}
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt.
                </Text>
              </ScrollView>
            </ScrollShadow>
            <Button variant="ghost" className="self-center">
              <Button.LabelContent
                classNames={{ text: 'text-foreground font-semibold' }}
              >
                Agree to Terms
              </Button.LabelContent>
            </Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </ScreenScrollView>
  );
}
