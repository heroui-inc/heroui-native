import { Ionicons } from '@expo/vector-icons';
import { Button, Popover, TextField, useTheme } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function PopoverScreen() {
  const [controlledOpen, setControlledOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const { colors } = useTheme();

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <View />

      {/* Basic Popover */}
      <SectionTitle title="Basic Usage" />
      <View className="items-center">
        <Popover>
          <Popover.Trigger>
            <Button variant="secondary">Open Popover</Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content>
              <AppText className="text-foreground">
                This is a basic popover with simple content.
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
            <Button variant="primary">
              <Button.StartContent>
                <Ionicons
                  name="information-circle"
                  size={20}
                  color={colors.accentForeground}
                />
              </Button.StartContent>
              <Button.LabelContent>Show Info</Button.LabelContent>
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content>
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
            <Button variant="tertiary">
              {controlledOpen ? 'Close' : 'Open'} Controlled
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content className="gap-4">
              <Popover.Title>Controlled Popover</Popover.Title>
              <Popover.Description>
                This popover's state is controlled externally.
              </Popover.Description>
              <Button
                size="sm"
                variant="primary"
                onPress={() => setControlledOpen(false)}
              >
                Close Popover
              </Button>
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </View>

      {/* Placements */}
      <SectionTitle title="Placement Options" />
      <View className="gap-8">
        <View className="flex-row justify-center gap-4">
          <Popover placement="top">
            <Popover.Trigger>
              <Button size="sm" variant="secondary">
                Top
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Overlay />
              <Popover.Content>
                <AppText className="text-foreground">Top placement</AppText>
              </Popover.Content>
            </Popover.Portal>
          </Popover>

          <Popover placement="bottom">
            <Popover.Trigger>
              <Button size="sm" variant="secondary">
                Bottom
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Overlay />
              <Popover.Content>
                <AppText className="text-foreground">Bottom placement</AppText>
              </Popover.Content>
            </Popover.Portal>
          </Popover>
        </View>

        <View className="flex-row justify-center gap-4">
          <Popover placement="left">
            <Popover.Trigger>
              <Button size="sm" variant="secondary">
                Left
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Overlay />
              <Popover.Content>
                <AppText className="text-foreground">Left placement</AppText>
              </Popover.Content>
            </Popover.Portal>
          </Popover>

          <Popover placement="right">
            <Popover.Trigger>
              <Button size="sm" variant="secondary">
                Right
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Overlay />
              <Popover.Content>
                <AppText className="text-foreground">Right placement</AppText>
              </Popover.Content>
            </Popover.Portal>
          </Popover>
        </View>
      </View>

      {/* Alignment Options */}
      <SectionTitle title="Alignment Options" />
      <View className="flex-row justify-center gap-4">
        <Popover align="start">
          <Popover.Trigger>
            <Button size="sm" variant="ghost">
              Start
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content>
              <AppText className="text-foreground">Start aligned</AppText>
            </Popover.Content>
          </Popover.Portal>
        </Popover>

        <Popover align="center">
          <Popover.Trigger>
            <Button size="sm" variant="ghost">
              Center
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content>
              <AppText className="text-foreground">Center aligned</AppText>
            </Popover.Content>
          </Popover.Portal>
        </Popover>

        <Popover align="end">
          <Popover.Trigger>
            <Button size="sm" variant="ghost">
              End
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content>
              <AppText className="text-foreground">End aligned</AppText>
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </View>

      {/* Without Overlay */}
      <SectionTitle title="Without Overlay" />
      <View className="items-center">
        <Popover>
          <Popover.Trigger>
            <Button variant="tertiary">No Overlay</Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content>
              <Popover.Close />
              <Popover.Title>No Overlay</Popover.Title>
              <Popover.Description>
                This popover appears without a background overlay, allowing
                interaction with the rest of the screen.
              </Popover.Description>
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </View>

      {/* Custom Content */}
      <SectionTitle title="Custom Content" />
      <View className="items-center">
        <Popover>
          <Popover.Trigger>
            <Button variant="primary">
              <Button.StartContent>
                <Ionicons
                  name="settings"
                  size={20}
                  color={colors.accentForeground}
                />
              </Button.StartContent>
              <Button.LabelContent>Settings</Button.LabelContent>
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content className="gap-4 p-6">
              <View className="gap-2">
                <AppText className="text-lg font-semibold text-foreground">
                  Quick Settings
                </AppText>
                <AppText className="text-sm text-muted-foreground">
                  Adjust your preferences
                </AppText>
              </View>

              <View className="h-px bg-border" />

              <View className="gap-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Ionicons
                      name="notifications"
                      size={16}
                      color={colors.mutedForeground}
                    />
                    <AppText className="text-foreground">Notifications</AppText>
                  </View>
                  <AppText className="text-accent">On</AppText>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Ionicons
                      name="moon"
                      size={16}
                      color={colors.mutedForeground}
                    />
                    <AppText className="text-foreground">Dark Mode</AppText>
                  </View>
                  <AppText className="text-accent">Auto</AppText>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Ionicons
                      name="language"
                      size={16}
                      color={colors.mutedForeground}
                    />
                    <AppText className="text-foreground">Language</AppText>
                  </View>
                  <AppText className="text-accent">English</AppText>
                </View>
              </View>

              <View className="h-px bg-border" />

              <View className="flex-row gap-2">
                <Button size="sm" variant="ghost" className="flex-1">
                  Cancel
                </Button>
                <Button size="sm" variant="primary" className="flex-1">
                  Save
                </Button>
              </View>
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </View>

      {/* Interactive Form */}
      <SectionTitle title="Interactive Form" />
      <View className="items-center">
        <Popover>
          <Popover.Trigger>
            <Button variant="secondary">
              <Button.StartContent>
                <Ionicons
                  name="chatbubble"
                  size={18}
                  color={colors.accentSoftForeground}
                />
              </Button.StartContent>
              <Button.LabelContent>Send Feedback</Button.LabelContent>
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content className="gap-4 p-6 min-w-[300px]">
              <View className="gap-2">
                <Popover.Title>Send Feedback</Popover.Title>
                <Popover.Description>
                  We'd love to hear your thoughts
                </Popover.Description>
              </View>

              <TextField
                placeholder="Type your feedback here..."
                value={feedbackText}
                onChangeText={setFeedbackText}
                multiline
                numberOfLines={3}
                className="min-h-[80px]"
              />

              <View className="flex-row gap-2 justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  onPress={() => setFeedbackText('')}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  isDisabled={!feedbackText.trim()}
                >
                  Send
                </Button>
              </View>
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </View>

      {/* Custom Offset */}
      <SectionTitle title="Custom Offset" />
      <View className="flex-row justify-center gap-4">
        <Popover offset={0}>
          <Popover.Trigger>
            <Button size="sm" variant="tertiary">
              No Gap
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content>
              <AppText className="text-foreground text-sm">
                No offset from trigger
              </AppText>
            </Popover.Content>
          </Popover.Portal>
        </Popover>

        <Popover offset={20}>
          <Popover.Trigger>
            <Button size="sm" variant="tertiary">
              Large Gap
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content>
              <AppText className="text-foreground text-sm">
                20px offset from trigger
              </AppText>
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </View>

      <View className="h-20" />
    </ScreenScrollView>
  );
}
