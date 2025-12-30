import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { BottomSheet, Button } from 'heroui-native';
import { useState } from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import { BottomSheetBlurOverlay } from '../../../components/bottom-sheet-blur-overlay';
import { BasicBottomSheetContent } from '../../../components/bottom-sheet/basic';
import { ScrollableWithSnapPointsContent } from '../../../components/bottom-sheet/scrollable-with-snap-points';
import { WithTextInputContent } from '../../../components/bottom-sheet/with-text-input';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledFontAwesome5 = withUniwind(FontAwesome5);

// ------------------------------------------------------------------------------

const DetachedBottomSheetContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary">Detached bottom sheet</Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content
              detached={true}
              bottomInset={insets.bottom + 12}
              className="mx-4"
              backgroundClassName="rounded-[32px]"
              contentContainerClassName="pb-4"
            >
              <View className="items-center mb-5">
                <View className="">
                  <StyledFontAwesome5
                    name="bitcoin"
                    size={48}
                    className="text-green-500"
                  />
                </View>
              </View>
              <View className="mb-6 items-center">
                <BottomSheet.Title className="text-center text-xl font-bold">
                  Oh! Your wallet is empty
                </BottomSheet.Title>
                <BottomSheet.Description className="text-center">
                  You'll need to top up to buy
                </BottomSheet.Description>
              </View>
              <Button
                variant="primary"
                className="bg-green-500 mb-2"
                onPress={() => setIsOpen(false)}
                pressableFeedbackVariant="none"
              >
                <Button.Label className="text-white font-semibold">
                  Add Cash
                </Button.Label>
              </Button>
              <View className="flex-row items-center justify-center">
                {['Apple Pay', 'Mastercard', 'Visa', 'Amex'].map(
                  (label, index, array) => (
                    <View key={label} className="flex-row items-center">
                      <AppText className="text-xs font-normal text-muted">
                        {label}
                      </AppText>
                      {index < array.length - 1 && (
                        <AppText className="text-xs font-normal text-muted mx-1.5">
                          •
                        </AppText>
                      )}
                    </View>
                  )
                )}
              </View>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithBlurOverlayContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary">Bottom sheet with blur overlay</Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheetBlurOverlay />
            <BottomSheet.Content>
              <View className="mb-10 gap-3 px-2">
                <BottomSheet.Title className="text-2xl font-semibold">
                  Delete account?
                </BottomSheet.Title>
                <BottomSheet.Description>
                  If you delete your account, you won't be able to restore it or
                  receive support.
                </BottomSheet.Description>
                <BottomSheet.Description>
                  Our app will no longer be able to provide support for any of
                  your trips, such as providing a refund or locking for lost
                  items.
                </BottomSheet.Description>
                <BottomSheet.Description>
                  For other deletion options, see our Privacy Policy.
                </BottomSheet.Description>
              </View>
              <View className="gap-3">
                <Button variant="danger" onPress={() => setIsOpen(false)}>
                  Delete forever
                </Button>
                <Button variant="tertiary" onPress={() => setIsOpen(false)}>
                  Cancel
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

const NativeModalBottomSheetContent = () => {
  const router = useRouter();

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button
          variant="secondary"
          onPress={() => router.push('components/bottom-sheet-native-modal')}
        >
          Bottom sheet from native modal
        </Button>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const BOTTOM_SHEET_VARIANTS_IOS: UsageVariant[] = [
  {
    value: 'basic-bottom-sheet',
    label: 'Basic bottom sheet',
    content: <BasicBottomSheetContent />,
  },
  {
    value: 'detached-bottom-sheet',
    label: 'Detached bottom sheet',
    content: <DetachedBottomSheetContent />,
  },
  {
    value: 'with-blur-overlay',
    label: 'With blur overlay',
    content: <WithBlurOverlayContent />,
  },
  {
    value: 'scrollable-with-snap-points',
    label: 'Scrollable with snap points',
    content: <ScrollableWithSnapPointsContent />,
  },
  {
    value: 'native-modal-bottom-sheet',
    label: 'Bottom sheet from native modal',
    content: <NativeModalBottomSheetContent />,
  },
  {
    value: 'with-text-input',
    label: 'Bottom sheet with text input',
    content: <WithTextInputContent />,
  },
];

const BOTTOM_SHEET_VARIANTS_ANDROID: UsageVariant[] = [
  {
    value: 'basic-bottom-sheet',
    label: 'Basic bottom sheet',
    content: <BasicBottomSheetContent />,
  },
  {
    value: 'detached-bottom-sheet',
    label: 'Detached bottom sheet',
    content: <DetachedBottomSheetContent />,
  },
  {
    value: 'scrollable-with-snap-points',
    label: 'Scrollable with snap points',
    content: <ScrollableWithSnapPointsContent />,
  },
  {
    value: 'with-text-input',
    label: 'Bottom sheet with text input',
    content: <WithTextInputContent />,
  },
];

export default function BottomSheetScreen() {
  return (
    <UsageVariantFlatList
      data={
        Platform.OS === 'ios'
          ? BOTTOM_SHEET_VARIANTS_IOS
          : BOTTOM_SHEET_VARIANTS_ANDROID
      }
    />
  );
}
