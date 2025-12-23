import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheet, Button } from 'heroui-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

const BasicBottomSheetContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary">Basic Bottom Sheet</Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content snapPoints={['50%']}>
              <BottomSheet.Close className="self-end -mb-2 z-50" />
              <View className="size-9 items-center justify-center rounded-full bg-overlay-foreground/5 mb-4">
                <StyledIonicons
                  name="albums-outline"
                  size={16}
                  className="text-warning"
                />
              </View>
              <View className="mb-8 gap-1.5">
                <BottomSheet.Title>Low Disk Space</BottomSheet.Title>
                <BottomSheet.Description>
                  You are running low on disk space. Delete unnecessary files to
                  free up space.
                </BottomSheet.Description>
              </View>
              <View className="flex-row justify-end gap-3">
                <Button
                  variant="tertiary"
                  className="bg-overlay-foreground/5"
                  onPress={() => setIsOpen(false)}
                >
                  Confirm
                </Button>
              </View>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithOverlayContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary">Bottom Sheet with Overlay</Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content snapPoints={['60%']}>
              <BottomSheet.Close className="self-end -mb-2 z-50" />
              <View className="size-9 items-center justify-center rounded-full bg-overlay-foreground/5 mb-4">
                <StyledIonicons
                  name="information-circle-outline"
                  size={16}
                  className="text-primary"
                />
              </View>
              <View className="mb-8 gap-1.5">
                <BottomSheet.Title>Information</BottomSheet.Title>
                <BottomSheet.Description>
                  This bottom sheet includes an overlay that can be tapped to
                  close.
                </BottomSheet.Description>
              </View>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ScrollableContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary">Scrollable Content</Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content snapPoints={['90%']}>
              <BottomSheet.Close className="self-end -mb-2 z-50" />
              <View className="mb-4 gap-1.5">
                <BottomSheet.Title>Long Content</BottomSheet.Title>
                <BottomSheet.Description>
                  This bottom sheet contains scrollable content.
                </BottomSheet.Description>
              </View>
              <View className="gap-4">
                {Array.from({ length: 20 }).map((_, index) => (
                  <View
                    key={index}
                    className="p-4 rounded-lg bg-overlay-foreground/5"
                  >
                    <Text className="text-foreground">
                      Item {index + 1} - Scroll to see more content
                    </Text>
                  </View>
                ))}
              </View>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomSnapPointsContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary">Custom Snap Points</Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content snapPoints={['25%', '50%', '90%']} index={1}>
              <BottomSheet.Close className="self-end -mb-2 z-50" />
              <View className="mb-4 gap-1.5">
                <BottomSheet.Title>Multiple Snap Points</BottomSheet.Title>
                <BottomSheet.Description>
                  Drag to adjust the height. This bottom sheet has three snap
                  points: 25%, 50%, and 90%.
                </BottomSheet.Description>
              </View>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const BOTTOM_SHEET_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-bottom-sheet',
    label: 'Basic Bottom Sheet',
    content: <BasicBottomSheetContent />,
  },
  {
    value: 'with-overlay',
    label: 'With Overlay',
    content: <WithOverlayContent />,
  },
  {
    value: 'scrollable-content',
    label: 'Scrollable Content',
    content: <ScrollableContent />,
  },
  {
    value: 'custom-snap-points',
    label: 'Custom Snap Points',
    content: <CustomSnapPointsContent />,
  },
];

export default function BottomSheetScreen() {
  return <UsageVariantFlatList data={BOTTOM_SHEET_VARIANTS} />;
}
