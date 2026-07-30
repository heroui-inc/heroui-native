import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
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
import { WithOTPInputContent } from '../../../components/bottom-sheet/with-otp-input';
import { WithTextInputContent } from '../../../components/bottom-sheet/with-text-input';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledFontAwesome5 = withUniwind(FontAwesome5);

// ------------------------------------------------------------------------------

const DetachedBottomSheetContent = () => {
  const { t } = useLingui();
  const [isOpen, setIsOpen] = useState(false);

  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isOpen}>
              <Button.Label maxFontSizeMultiplier={1.6}>
                {t`Detached bottom sheet`}
              </Button.Label>
            </Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content
              detached={true}
              bottomInset={insets.bottom + 12}
              className="mx-4"
              backgroundClassName="rounded-4xl"
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
                  {t`Oh! Your wallet is empty`}
                </BottomSheet.Title>
                <BottomSheet.Description className="text-center">
                  {t`You'll need to top up to buy`}
                </BottomSheet.Description>
              </View>
              <Button
                variant="primary"
                className="bg-green-500 mb-2"
                onPress={() => setIsOpen(false)}
                feedbackVariant="scale"
              >
                <Button.Label className="text-white font-semibold">
                  {t`Add Cash`}
                </Button.Label>
              </Button>
              <View className="flex-row items-center justify-center">
                {/* eslint-disable-next-line lingui/no-unlocalized-strings -- Payment network brand names. */}
                {['Apple Pay', 'Mastercard', 'Visa', 'Amex'].map(
                  (label, index, array) => (
                    <View key={label} className="flex-row items-center">
                      <AppText
                        className="text-xs font-normal text-muted"
                        maxFontSizeMultiplier={1.2}
                      >
                        {label}
                      </AppText>
                      {index < array.length - 1 && (
                        <AppText
                          className="text-xs font-normal text-muted mx-1.5"
                          maxFontSizeMultiplier={1.2}
                        >
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
  const { t } = useLingui();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isOpen}>
              <Button.Label maxFontSizeMultiplier={1.2}>
                {t`Bottom sheet with blur overlay`}
              </Button.Label>
            </Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheetBlurOverlay />
            <BottomSheet.Content>
              <View className="mb-10 gap-3 px-2">
                <BottomSheet.Title
                  className="text-2xl font-semibold"
                  maxFontSizeMultiplier={1.2}
                >
                  {t`Delete account?`}
                </BottomSheet.Title>
                <BottomSheet.Description maxFontSizeMultiplier={1.2}>
                  {t`If you delete your account, you won't be able to restore it or receive support.`}
                </BottomSheet.Description>
                <BottomSheet.Description maxFontSizeMultiplier={1.2}>
                  {t`Our app will no longer be able to provide support for any of your trips, such as providing a refund or locking for lost items.`}
                </BottomSheet.Description>
                <BottomSheet.Description maxFontSizeMultiplier={1.2}>
                  {t`For other deletion options, see our Privacy Policy.`}
                </BottomSheet.Description>
              </View>
              <View className="gap-3">
                <Button variant="danger" onPress={() => setIsOpen(false)}>
                  {t`Delete forever`}
                </Button>
                <Button variant="tertiary" onPress={() => setIsOpen(false)}>
                  {t`Cancel`}
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
  const { t } = useLingui();
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
          <Button.Label maxFontSizeMultiplier={1.2}>
            {t`Bottom sheet from native modal`}
          </Button.Label>
        </Button>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const BOTTOM_SHEET_VARIANTS_IOS: UsageVariant[] = [
  {
    value: 'basic-bottom-sheet',
    label: msg`Basic bottom sheet`,
    content: <BasicBottomSheetContent />,
  },
  {
    value: 'detached-bottom-sheet',
    label: msg`Detached bottom sheet`,
    content: <DetachedBottomSheetContent />,
  },
  {
    value: 'with-blur-overlay',
    label: msg`With blur overlay`,
    content: <WithBlurOverlayContent />,
  },
  {
    value: 'scrollable-with-snap-points',
    label: msg`Scrollable with snap points`,
    content: <ScrollableWithSnapPointsContent />,
  },
  {
    value: 'native-modal-bottom-sheet',
    label: msg`Bottom sheet from native modal`,
    content: <NativeModalBottomSheetContent />,
  },
  {
    value: 'with-text-input',
    label: msg`Bottom sheet with text input`,
    content: <WithTextInputContent />,
  },
  {
    value: 'with-otp-input',
    label: msg`Bottom sheet with OTP input`,
    content: <WithOTPInputContent />,
  },
];

const BOTTOM_SHEET_VARIANTS_ANDROID: UsageVariant[] = [
  {
    value: 'basic-bottom-sheet',
    label: msg`Basic bottom sheet`,
    content: <BasicBottomSheetContent />,
  },
  {
    value: 'detached-bottom-sheet',
    label: msg`Detached bottom sheet`,
    content: <DetachedBottomSheetContent />,
  },
  {
    value: 'scrollable-with-snap-points',
    label: msg`Scrollable with snap points`,
    content: <ScrollableWithSnapPointsContent />,
  },
  {
    value: 'with-text-input',
    label: msg`Bottom sheet with text input`,
    content: <WithTextInputContent />,
  },
  {
    value: 'with-otp-input',
    label: msg`Bottom sheet with OTP input`,
    content: <WithOTPInputContent />,
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
