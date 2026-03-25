import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomSheet, Button } from 'heroui-native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../app-text';

const StyledMaterialCommunityIcons = withUniwind(MaterialCommunityIcons);

const DELIVERY_WINDOWS = [
  {
    id: 'today-6-8',
    label: 'Today, 6:00 PM - 8:00 PM',
    fee: 'Free',
  },
  {
    id: 'tomorrow-8-10',
    label: 'Tomorrow, 8:00 AM - 10:00 AM',
    fee: '$4.99',
  },
  {
    id: 'tomorrow-12-2',
    label: 'Tomorrow, 12:00 PM - 2:00 PM',
    fee: '$2.99',
  },
] as const;

type DeliveryWindowId = (typeof DELIVERY_WINDOWS)[number]['id'];

export const StackedBottomSheetContent = () => {
  const [isRootOpen, setRootOpen] = useState(false);
  const [isDeliveryWindowSheetOpen, setDeliveryWindowSheetOpen] =
    useState(false);
  const [selectedWindowId, setSelectedWindowId] = useState<DeliveryWindowId>(
    DELIVERY_WINDOWS[0].id
  );

  const selectedWindow = DELIVERY_WINDOWS.find(
    (window) => window.id === selectedWindowId
  );

  const onRootOpenChange = useCallback((open: boolean) => {
    setRootOpen(open);

    if (!open) {
      setDeliveryWindowSheetOpen(false);
    }
  }, []);

  const onWindowSelect = useCallback((windowId: DeliveryWindowId) => {
    setSelectedWindowId(windowId);
    setDeliveryWindowSheetOpen(false);
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isRootOpen} onOpenChange={onRootOpenChange}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isRootOpen}>
              Stacked bottom sheet
            </Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content contentContainerClassName="gap-6">
              <View className="gap-4">
                <View className="items-center gap-3">
                  <View className="size-16 items-center justify-center rounded-full bg-blue-500/10">
                    <StyledMaterialCommunityIcons
                      name="bike-fast"
                      size={32}
                      className="text-blue-500"
                    />
                  </View>
                  <View className="items-center gap-2">
                    <BottomSheet.Title className="text-center">
                      Schedule your grocery delivery
                    </BottomSheet.Title>
                    <BottomSheet.Description className="text-center">
                      Let shoppers know when to arrive, then confirm the order
                      from the main sheet.
                    </BottomSheet.Description>
                  </View>
                </View>

                <View className="rounded-3xl border border-border bg-default-100 p-4">
                  <AppText className="text-sm font-medium text-muted">
                    Selected delivery window
                  </AppText>
                  <AppText className="mt-2 text-base font-medium text-foreground">
                    {selectedWindow?.label}
                  </AppText>
                  <AppText className="mt-1 text-sm text-muted">
                    Fee: {selectedWindow?.fee}
                  </AppText>
                </View>
              </View>

              <View className="gap-3">
                <Button
                  variant="secondary"
                  onPress={() => setDeliveryWindowSheetOpen(true)}
                >
                  Choose another window
                </Button>
                <Button onPress={() => setRootOpen(false)}>
                  Confirm $48.20 order
                </Button>
              </View>

              <BottomSheet.Sheet
                isOpen={isDeliveryWindowSheetOpen}
                onOpenChange={setDeliveryWindowSheetOpen}
                contentContainerClassName="gap-4"
              >
                <View className="gap-2">
                  <BottomSheet.Title>
                    Select a delivery window
                  </BottomSheet.Title>
                  <BottomSheet.Description>
                    This second sheet lets you adjust a single part of the flow
                    without dismissing the order summary underneath.
                  </BottomSheet.Description>
                </View>

                <View className="gap-3">
                  {DELIVERY_WINDOWS.map((window) => {
                    const isSelected = window.id === selectedWindowId;

                    return (
                      <Button
                        key={window.id}
                        variant={isSelected ? 'primary' : 'secondary'}
                        onPress={() => onWindowSelect(window.id)}
                      >
                        <View className="w-full flex-row items-center justify-between gap-3">
                          <Button.Label>{window.label}</Button.Label>
                          <AppText
                            className={
                              isSelected
                                ? 'text-primary-foreground'
                                : 'text-foreground'
                            }
                          >
                            {window.fee}
                          </AppText>
                        </View>
                      </Button>
                    );
                  })}
                </View>
              </BottomSheet.Sheet>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};
