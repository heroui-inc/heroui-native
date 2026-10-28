import Ionicons from '@expo/vector-icons/Ionicons';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { useRouter } from 'expo-router';
import {
  Button,
  Input,
  NativeBottomSheet,
  TextField,
  type InputRef,
  type NativeBottomSheetRef,
} from 'heroui-native';
import { useCallback, useRef } from 'react';
import { Platform, View } from 'react-native';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { OverlayNativeBottomSheetContent } from '../../../components/native-bottom-sheet/overlay';
import { ScrollableWithDetentsContent } from '../../../components/native-bottom-sheet/scrollable-with-detents';
import { StackedNativeBottomSheetContent } from '../../../components/native-bottom-sheet/stacked';
import { WithLegendListContent } from '../../../components/native-bottom-sheet/with-legend-list';
import { WithOTPInputNativeBottomSheetContent } from '../../../components/native-bottom-sheet/with-otp-input';
import { useAppTheme } from '../../../contexts/app-theme-context';

const StyledIonicons = withUniwind(Ionicons);

// ------------------------------------------------------------------------------

const BasicNativeBottomSheetContent = () => {
  const { t } = useLingui();
  const sheetRef = useRef<NativeBottomSheetRef>(null);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button variant="secondary" onPress={() => sheetRef.current?.present()}>
          {t`Basic native bottom sheet`}
        </Button>
        <NativeBottomSheet ref={sheetRef}>
          <View className="items-center mb-5">
            <View className="size-20 items-center justify-center rounded-full bg-green-500/10">
              <StyledIonicons
                name="shield-checkmark"
                size={40}
                className="text-green-500"
              />
            </View>
          </View>
          <View className="mb-8 gap-2 items-center">
            <NativeBottomSheet.Title className="text-center">
              {t`Keep yourself safe`}
            </NativeBottomSheet.Title>
            <NativeBottomSheet.Description className="text-center">
              {t`Update your software to the latest version for better security and performance.`}
            </NativeBottomSheet.Description>
          </View>
          <View className="gap-3">
            <Button onPress={() => sheetRef.current?.dismiss()}>
              {t`Update Now`}
            </Button>
            <Button
              variant="tertiary"
              onPress={() => sheetRef.current?.dismiss()}
            >
              {t`Later`}
            </Button>
          </View>
        </NativeBottomSheet>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithBlurBackgroundNativeBottomSheetContent = () => {
  const { t } = useLingui();
  const { isDark } = useAppTheme();
  const sheetRef = useRef<NativeBottomSheetRef>(null);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button variant="secondary" onPress={() => sheetRef.current?.present()}>
          <Button.Label maxFontSizeMultiplier={1.2}>
            {t`Native bottom sheet with blur overlay`}
          </Button.Label>
        </Button>
        <NativeBottomSheet
          ref={sheetRef}
          dimBlur={isDark ? 'dark' : 'system-ultra-thin-material-dark'}
          dimOpacity={0.4}
        >
          <View className="mb-10 gap-3 px-2">
            <NativeBottomSheet.Title
              className="text-2xl font-semibold"
              maxFontSizeMultiplier={1.2}
            >
              {t`Delete account?`}
            </NativeBottomSheet.Title>
            <NativeBottomSheet.Description maxFontSizeMultiplier={1.2}>
              {t`If you delete your account, you won't be able to restore it or receive support.`}
            </NativeBottomSheet.Description>
            <NativeBottomSheet.Description maxFontSizeMultiplier={1.2}>
              {t`Our app will no longer be able to provide support for any of your trips, such as providing a refund or locking for lost items.`}
            </NativeBottomSheet.Description>
            <NativeBottomSheet.Description maxFontSizeMultiplier={1.2}>
              {t`For other deletion options, see our Privacy Policy.`}
            </NativeBottomSheet.Description>
          </View>
          <View className="gap-3">
            <Button
              variant="danger"
              onPress={() => sheetRef.current?.dismiss()}
            >
              {t`Delete forever`}
            </Button>
            <Button
              variant="tertiary"
              onPress={() => sheetRef.current?.dismiss()}
            >
              {t`Cancel`}
            </Button>
          </View>
        </NativeBottomSheet>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithTextInputNativeBottomSheetContent = () => {
  const { t } = useLingui();
  const sheetRef = useRef<NativeBottomSheetRef>(null);
  const inputRef = useRef<InputRef>(null);

  /**
   * Stable listener, same shape as TrueSheet's `onWillPresent` example.
   * Focusing here raises the keyboard with the sheet on every present.
   * `autoFocus` only runs when the input mounts, so a later present stays blurred.
   */
  const handleWillPresent = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button variant="secondary" onPress={() => sheetRef.current?.present()}>
          {t`Native bottom sheet with autofocus input`}
        </Button>
        <NativeBottomSheet ref={sheetRef} onWillPresent={handleWillPresent}>
          <View className="mb-6 flex-row items-start justify-between gap-4">
            <View className="flex-1 gap-2">
              <NativeBottomSheet.Title>{t`Your email`}</NativeBottomSheet.Title>
              <NativeBottomSheet.Description>
                {t`The keyboard opens with the sheet. We'll send a verification code to this address.`}
              </NativeBottomSheet.Description>
            </View>
            <NativeBottomSheet.Close />
          </View>
          <TextField className="mb-6">
            <Input
              ref={inputRef}
              placeholder={t`name@example.com`}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </TextField>
          <Button onPress={() => sheetRef.current?.dismiss()}>
            {t`Send code`}
          </Button>
        </NativeBottomSheet>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const NativeModalNativeBottomSheetContent = () => {
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
          onPress={() =>
            router.push('components/native-bottom-sheet-native-modal')
          }
        >
          <Button.Label maxFontSizeMultiplier={1.2}>
            {t`Native bottom sheet from native modal`}
          </Button.Label>
        </Button>
      </View>
    </View>
  );
};

const NATIVE_BOTTOM_SHEET_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-native-bottom-sheet',
    label: msg`Basic native bottom sheet`,
    content: <BasicNativeBottomSheetContent />,
  },
  {
    value: 'with-blur-overlay',
    label: msg`With blur overlay`,
    content: <WithBlurBackgroundNativeBottomSheetContent />,
  },
  {
    value: 'stacked-native-bottom-sheets',
    label: msg`Stacked native bottom sheets`,
    content: <StackedNativeBottomSheetContent />,
  },
  {
    value: 'overlay',
    label: msg`Dialog and toast above the sheet`,
    content: <OverlayNativeBottomSheetContent />,
  },
  {
    value: 'scrollable-with-detents',
    label: msg`Scrollable with detents`,
    content: <ScrollableWithDetentsContent />,
  },
  {
    value: 'legend-list',
    label: msg`List`,
    content: <WithLegendListContent />,
  },
  {
    value: 'with-text-input',
    label: msg`Native bottom sheet with autofocus input`,
    content: <WithTextInputNativeBottomSheetContent />,
  },
  {
    value: 'with-otp-input',
    label: msg`Native bottom sheet with OTP input`,
    content: <WithOTPInputNativeBottomSheetContent />,
  },
  {
    value: 'native-modal',
    label: msg`Native bottom sheet from native modal`,
    content: <NativeModalNativeBottomSheetContent />,
  },
];

export default function NativeBottomSheetScreen() {
  const variants =
    Platform.OS === 'ios'
      ? NATIVE_BOTTOM_SHEET_VARIANTS
      : NATIVE_BOTTOM_SHEET_VARIANTS.filter(
          (variant) => variant.value !== 'native-modal'
        );

  return <UsageVariantFlatList data={variants} />;
}
