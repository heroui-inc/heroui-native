import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, Popover, useTheme } from 'heroui-native';
import { useState } from 'react';
import { Platform, View } from 'react-native';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function PopoverScreen() {
  const [controlledOpen, setControlledOpen] = useState(false);

  const { colors } = useTheme();
  const router = useRouter();

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      {/* Basic Popover */}
      <SectionTitle title="Basic Usage" />
      <View className="items-center">
        <Popover>
          <Popover.Trigger>
            <Button variant="tertiary" size="sm">
              Open Popover
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content>
              <AppText className="text-foreground">
                This is a basic popover with simple content
              </AppText>
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </View>

      {/* With Title and Description */}
      <SectionTitle title="With Title & Description" />
      <View className="items-center">
        <Popover>
          <Popover.Trigger>
            <Button variant="tertiary" size="sm">
              <Button.StartContent>
                <Ionicons
                  name="information-circle"
                  size={20}
                  color={colors.mutedForeground}
                />
              </Button.StartContent>
              <Button.LabelContent>Show Info</Button.LabelContent>
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content className="gap-1 w-[320px] rounded-xl px-6 py-4">
              <Popover.Close className="absolute top-3 right-3 z-50" />
              <Popover.Title>Information</Popover.Title>
              <Popover.Description>
                This popover includes a title and description to provide more
                structured information to users.
              </Popover.Description>
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </View>

      {/* Controlled State */}
      <SectionTitle title="Controlled State" />
      <View className="items-center gap-4">
        <AppText className="text-sm text-muted-foreground mb-2">
          Popover is {controlledOpen ? 'open' : 'closed'}
        </AppText>
        <Popover isOpen={controlledOpen} onOpenChange={setControlledOpen}>
          <Popover.Trigger>
            <Button variant="tertiary" size="sm">
              {controlledOpen ? 'Close' : 'Open'} Controlled
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content className="gap-1">
              <Popover.Title>Controlled Popover</Popover.Title>
              <Popover.Description className="mb-8">
                This popover's state is controlled externally.
              </Popover.Description>
              <Popover.Close asChild>
                <Button size="sm" variant="primary">
                  Close Popover
                </Button>
              </Popover.Close>
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </View>

      {/* Placements */}
      <SectionTitle title="Placement Options" />
      <View className="gap-4">
        <View className="flex-row justify-between gap-4">
          <Popover>
            <Popover.Trigger>
              <Button size="sm" variant="tertiary" className="w-24">
                Top
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Overlay />
              <Popover.Content placement="top">
                <AppText className="text-foreground">Top placement</AppText>
              </Popover.Content>
            </Popover.Portal>
          </Popover>

          <Popover>
            <Popover.Trigger>
              <Button size="sm" variant="tertiary" className="w-24">
                Left
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Overlay />
              <Popover.Content placement="left">
                <AppText className="text-foreground">Left Placement</AppText>
              </Popover.Content>
            </Popover.Portal>
          </Popover>
        </View>

        <View className="flex-row justify-between gap-4">
          <Popover>
            <Popover.Trigger>
              <Button size="sm" variant="tertiary" className="w-24">
                Right
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Overlay />
              <Popover.Content placement="right">
                <AppText className="text-foreground">Right placement</AppText>
              </Popover.Content>
            </Popover.Portal>
          </Popover>

          <Popover>
            <Popover.Trigger>
              <Button size="sm" variant="tertiary" className="w-24">
                Bottom
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Overlay />
              <Popover.Content placement="bottom">
                <AppText className="text-foreground">Bottom placement</AppText>
              </Popover.Content>
            </Popover.Portal>
          </Popover>
        </View>
      </View>

      {/* Alignment Options */}
      <SectionTitle title="Alignment Options" />
      <View className="flex-row justify-center gap-4">
        <Popover>
          <Popover.Trigger>
            <Button size="sm" variant="tertiary" className="w-24">
              Start
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content align="start">
              <AppText className="text-foreground">Start aligned</AppText>
            </Popover.Content>
          </Popover.Portal>
        </Popover>

        <Popover>
          <Popover.Trigger>
            <Button size="sm" variant="tertiary" className="w-24">
              Center
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content align="center">
              <AppText className="text-foreground">Center aligned</AppText>
            </Popover.Content>
          </Popover.Portal>
        </Popover>

        <Popover>
          <Popover.Trigger>
            <Button size="sm" variant="tertiary" className="w-24">
              End
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content align="end">
              <AppText className="text-foreground">End aligned</AppText>
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </View>

      {/* Native Modal Navigation */}
      {Platform.OS === 'ios' && (
        <>
          <SectionTitle title="Native Modal Test" />
          <View className="items-center">
            <Button
              variant="tertiary"
              size="sm"
              onPress={() => router.push('components/popover-native-modal')}
            >
              Popover from Native Modal
            </Button>
          </View>
        </>
      )}
    </ScreenScrollView>
  );
}
