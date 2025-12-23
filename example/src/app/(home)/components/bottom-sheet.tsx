/* eslint-disable react-native/no-inline-styles */
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from 'heroui-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import * as BottomSheetPrimitives from '../../../../../src/primitives/bottom-sheet';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

const BasicBottomSheetContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheetPrimitives.Root isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheetPrimitives.Trigger asChild>
            <Button variant="secondary">Basic Bottom Sheet</Button>
          </BottomSheetPrimitives.Trigger>
          <BottomSheetPrimitives.Portal snapPoints={['50%']}>
            <BottomSheetPrimitives.Content className="gap-4 px-6 py-5">
              <BottomSheetPrimitives.Close className="self-end -mb-2 z-50" />
              <View className="size-9 items-center justify-center rounded-full bg-overlay-foreground/5 mb-4">
                <StyledIonicons
                  name="albums-outline"
                  size={16}
                  className="text-warning"
                />
              </View>
              <View className="mb-8 gap-1.5">
                <BottomSheetPrimitives.Title>
                  Low Disk Space
                </BottomSheetPrimitives.Title>
                <BottomSheetPrimitives.Description>
                  You are running low on disk space. Delete unnecessary files to
                  free up space.
                </BottomSheetPrimitives.Description>
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
            </BottomSheetPrimitives.Content>
          </BottomSheetPrimitives.Portal>
        </BottomSheetPrimitives.Root>
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
        <BottomSheetPrimitives.Root isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheetPrimitives.Trigger asChild>
            <Button variant="secondary">Bottom Sheet with Overlay</Button>
          </BottomSheetPrimitives.Trigger>
          <BottomSheetPrimitives.Portal snapPoints={['60%']}>
            <BottomSheetPrimitives.Overlay />
            <BottomSheetPrimitives.Content className="gap-4 px-6 py-5">
              <BottomSheetPrimitives.Close className="self-end -mb-2 z-50" />
              <View className="size-9 items-center justify-center rounded-full bg-overlay-foreground/5 mb-4">
                <StyledIonicons
                  name="information-circle-outline"
                  size={16}
                  className="text-primary"
                />
              </View>
              <View className="mb-8 gap-1.5">
                <BottomSheetPrimitives.Title>
                  Information
                </BottomSheetPrimitives.Title>
                <BottomSheetPrimitives.Description>
                  This bottom sheet includes an overlay that can be tapped to
                  close.
                </BottomSheetPrimitives.Description>
              </View>
            </BottomSheetPrimitives.Content>
          </BottomSheetPrimitives.Portal>
        </BottomSheetPrimitives.Root>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ScrollableContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheetPrimitives.Root isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheetPrimitives.Trigger asChild>
            <Button variant="secondary">Scrollable Content</Button>
          </BottomSheetPrimitives.Trigger>
          <BottomSheetPrimitives.Portal snapPoints={['90%']}>
            <BottomSheetPrimitives.Content
              className="gap-4 px-6"
              style={{ paddingBottom: insets.bottom + 12 }}
            >
              <BottomSheetPrimitives.Close className="self-end -mb-2 z-50" />
              <View className="mb-4 gap-1.5">
                <BottomSheetPrimitives.Title>
                  Long Content
                </BottomSheetPrimitives.Title>
                <BottomSheetPrimitives.Description>
                  This bottom sheet contains scrollable content.
                </BottomSheetPrimitives.Description>
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
            </BottomSheetPrimitives.Content>
          </BottomSheetPrimitives.Portal>
        </BottomSheetPrimitives.Root>
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
        <BottomSheetPrimitives.Root isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheetPrimitives.Trigger asChild>
            <Button variant="secondary">Custom Snap Points</Button>
          </BottomSheetPrimitives.Trigger>
          <BottomSheetPrimitives.Portal
            snapPoints={['25%', '50%', '90%']}
            index={1}
          >
            <BottomSheetPrimitives.Content className="gap-4 px-6 py-5">
              <BottomSheetPrimitives.Close className="self-end -mb-2 z-50" />
              <View className="mb-4 gap-1.5">
                <BottomSheetPrimitives.Title>
                  Multiple Snap Points
                </BottomSheetPrimitives.Title>
                <BottomSheetPrimitives.Description>
                  Drag to adjust the height. This bottom sheet has three snap
                  points: 25%, 50%, and 90%.
                </BottomSheetPrimitives.Description>
              </View>
            </BottomSheetPrimitives.Content>
          </BottomSheetPrimitives.Portal>
        </BottomSheetPrimitives.Root>
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
