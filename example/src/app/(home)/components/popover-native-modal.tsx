import { Ionicons } from '@expo/vector-icons';
import { Button, Popover } from 'heroui-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';

const StyledIonicons = withUniwind(Ionicons);

export default function PopoverNativeModalScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="pt-24 px-5">
      <Popover>
        <Popover.Trigger asChild>
          <Button variant="secondary" className="self-center">
            Did you know?
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay />
          <Popover.Content
            width={320}
            offset={insets.top + 20}
            className="gap-3 px-6 py-5"
          >
            <Popover.Close className="absolute top-4 right-4 z-50" />
            <View className="flex-row items-center gap-3 mb-1">
              <View className="size-12 items-center justify-center rounded-full bg-warning/15">
                <StyledIonicons
                  name="rocket"
                  size={26}
                  className="text-warning"
                />
              </View>
              <View className="flex-1">
                <Popover.Title>Fun Fact!</Popover.Title>
              </View>
            </View>
            <Popover.Description className="text-sm">
              The first computer bug was an actual moth found trapped in a
              Harvard Mark II computer in 1947. Grace Hopper taped it to the log
              book with the note "First actual case of bug being found."
            </Popover.Description>
            <View className="flex-row items-center gap-2 mt-2 pt-2 border-t border-border">
              <StyledIonicons
                name="sparkles"
                size={14}
                className="text-accent"
              />
              <AppText className="text-xs text-muted">Tech History</AppText>
            </View>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
