import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, Popover } from 'heroui-native';
import { Platform, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

const WithTitleDescriptionContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <Popover>
        <Popover.Trigger asChild>
          <Button variant="secondary">Did you know?</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay />
          <Popover.Content
            width={320}
            placement="top"
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
};

// ------------------------------------------------------------------------------

const PresentationVariantsContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center gap-8">
      <Popover>
        <Popover.Trigger asChild>
          <Button variant="secondary">Quick Notification</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay />
          <Popover.Content
            width={300}
            className="gap-3"
            presentation="popover"
            placement="top"
          >
            <View className="items-start gap-2">
              <View className="flex-row items-center gap-3 self-stretch">
                <View className="size-10 items-center justify-center rounded-full bg-success/15">
                  <StyledIonicons
                    name="checkmark-circle"
                    size={24}
                    className="text-success"
                  />
                </View>
                <View className="flex-1">
                  <Popover.Title>Payment Successful</Popover.Title>
                  <AppText className="text-xs text-muted">
                    2 minutes ago
                  </AppText>
                </View>
              </View>
              <Popover.Description>
                Your payment of $49.99 has been processed successfully. Receipt
                sent to your email.
              </Popover.Description>
            </View>
            <Popover.Close asChild>
              <Button variant="secondary">Dismiss</Button>
            </Popover.Close>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
      <Popover>
        <Popover.Trigger asChild>
          <Button variant="secondary">More Options</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay className="bg-black/15" />
          <Popover.Content presentation="bottom-sheet">
            <View className="gap-4">
              <View className="mb-2">
                <Popover.Title className="text-center text-foreground">
                  Share Options
                </Popover.Title>
                <Popover.Description className="text-center text-muted">
                  Choose how you'd like to share this content
                </Popover.Description>
              </View>
              <View className="gap-2">
                <View className="flex-row items-center gap-3 p-3 rounded-lg">
                  <View className="size-10 items-center justify-center rounded-full bg-accent/10">
                    <StyledIonicons
                      name="share-social"
                      size={20}
                      className="text-accent"
                    />
                  </View>
                  <View className="flex-1">
                    <AppText className="text-base font-medium text-foreground">
                      Share Link
                    </AppText>
                    <AppText className="text-xs text-muted">
                      Send via messaging app
                    </AppText>
                  </View>
                </View>
                <View className="flex-row items-center gap-3 p-3 rounded-lg">
                  <View className="size-10 items-center justify-center rounded-full bg-warning/10">
                    <StyledIonicons
                      name="copy-outline"
                      size={20}
                      className="text-warning"
                    />
                  </View>
                  <View className="flex-1">
                    <AppText className="text-base font-medium text-foreground">
                      Copy Link
                    </AppText>
                    <AppText className="text-xs text-muted">
                      Copy to clipboard
                    </AppText>
                  </View>
                </View>
                <View className="flex-row items-center gap-3 p-3 rounded-lg">
                  <View className="size-10 items-center justify-center rounded-full bg-success/10">
                    <StyledIonicons
                      name="download-outline"
                      size={20}
                      className="text-success"
                    />
                  </View>
                  <View className="flex-1">
                    <AppText className="text-base font-medium text-foreground">
                      Save Offline
                    </AppText>
                    <AppText className="text-xs text-muted">
                      Download for later
                    </AppText>
                  </View>
                </View>
              </View>
              <Popover.Close asChild>
                <Button
                  variant="secondary"
                  size="lg"
                  className="self-stretch mt-2"
                >
                  Cancel
                </Button>
              </Popover.Close>
            </View>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PlacementPopover = ({
  placement,
}: {
  placement: 'top' | 'bottom' | 'left' | 'right';
}) => {
  const label = placement.charAt(0).toUpperCase() + placement.slice(1);

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="secondary" className="w-24">
          {label}
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content placement={placement} width={220} className="gap-2">
          <View className="flex-row items-center gap-2">
            <View className="size-8 items-center justify-center rounded-full bg-accent/15">
              <StyledIonicons
                name="location"
                size={16}
                className="text-accent"
              />
            </View>
            <AppText className="text-sm font-semibold text-foreground">
              Quick Tip
            </AppText>
          </View>
          <AppText className="text-xs text-muted leading-4">
            This popover appears on the {placement} side of the trigger button
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};

const PlacementOptionsContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="w-full gap-4">
        <View className="flex-row justify-between gap-4">
          <PlacementPopover placement="top" />
          <PlacementPopover placement="left" />
        </View>
        <View className="flex-row justify-between gap-4">
          <PlacementPopover placement="right" />
          <PlacementPopover placement="bottom" />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const AlignmentPopover = ({ align }: { align: 'start' | 'center' | 'end' }) => {
  const label = align.charAt(0).toUpperCase() + align.slice(1);

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="secondary" className="w-24">
          {label}
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content
          placement="top"
          align={align}
          width={200}
          className="gap-2"
        >
          <View className="flex-row items-center gap-2">
            <View className="size-8 items-center justify-center rounded-full bg-warning/15">
              <StyledIonicons
                name="git-compare-outline"
                size={16}
                className="text-warning"
              />
            </View>
            <AppText className="text-sm font-semibold text-foreground">
              Alignment
            </AppText>
          </View>
          <AppText className="text-xs text-muted">
            Aligned to the {align} of the trigger
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};

const AlignmentOptionsContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row gap-4">
        <AlignmentPopover align="start" />
        <AlignmentPopover align="center" />
        <AlignmentPopover align="end" />
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const NativeModalTestContent = () => {
  const router = useRouter();

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <Button
        variant="secondary"
        onPress={() => router.push('components/popover-native-modal')}
      >
        Popover from native modal
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const POPOVER_VARIANTS: UsageVariant[] = [
  {
    value: 'with-title-description',
    label: 'With title & description',
    content: <WithTitleDescriptionContent />,
  },
  {
    value: 'presentation-variants',
    label: 'Presentation variants',
    content: <PresentationVariantsContent />,
  },
  {
    value: 'placement-options',
    label: 'Placement options',
    content: <PlacementOptionsContent />,
  },
  {
    value: 'alignment-options',
    label: 'Alignment options',
    content: <AlignmentOptionsContent />,
  },
];

if (Platform.OS === 'ios') {
  POPOVER_VARIANTS.push({
    value: 'native-modal-test',
    label: 'Native modal test',
    content: <NativeModalTestContent />,
  });
}

export default function PopoverScreen() {
  return <UsageVariantFlatList data={POPOVER_VARIANTS} />;
}
