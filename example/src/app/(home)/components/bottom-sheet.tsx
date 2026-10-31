import Ionicons from '@expo/vector-icons/Ionicons';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { useRouter } from 'expo-router';
import {
  BottomSheet,
  Button,
  Input,
  TextField,
  type BottomSheetRef,
  type InputRef,
} from 'heroui-native';
import { useCallback, useRef } from 'react';
import { Platform, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { ControlledByNameContent } from '../../../components/bottom-sheet/controlled-by-name';
import { OverlayBottomSheetContent } from '../../../components/bottom-sheet/overlay';
import { ScrollableWithDetentsContent } from '../../../components/bottom-sheet/scrollable-with-detents';
import { StackedBottomSheetContent } from '../../../components/bottom-sheet/stacked';
import { WithLegendListContent } from '../../../components/bottom-sheet/with-legend-list';
import { WithOTPInputContent } from '../../../components/bottom-sheet/with-otp-input';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { useAppTheme } from '../../../contexts/app-theme-context';

const StyledIonicons = withUniwind(Ionicons);

// ------------------------------------------------------------------------------

const BasicBottomSheetContent = () => {
  const { t } = useLingui();
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button variant="secondary" onPress={() => sheetRef.current?.present()}>
          {t`Basic bottom sheet`}
        </Button>
        <BottomSheet ref={sheetRef}>
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
            <BottomSheet.Title className="text-center">
              {t`Keep yourself safe`}
            </BottomSheet.Title>
            <BottomSheet.Description className="text-center">
              {t`Update your software to the latest version for better security and performance.`}
            </BottomSheet.Description>
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
        </BottomSheet>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithBlurOverlayContent = () => {
  const { t } = useLingui();
  const { isDark } = useAppTheme();
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button variant="secondary" onPress={() => sheetRef.current?.present()}>
          <Button.Label maxFontSizeMultiplier={1.2}>
            {t`Bottom sheet with blur overlay`}
          </Button.Label>
        </Button>
        <BottomSheet
          ref={sheetRef}
          dimBlur={isDark ? 'dark' : 'system-ultra-thin-material-dark'}
          dimOpacity={0.4}
        >
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
        </BottomSheet>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithTextInputContent = () => {
  const { t } = useLingui();
  const sheetRef = useRef<BottomSheetRef>(null);
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
          {t`Bottom sheet with autofocus input`}
        </Button>
        <BottomSheet ref={sheetRef} onWillPresent={handleWillPresent}>
          <View className="mb-6 flex-row items-start justify-between gap-4">
            <View className="flex-1 gap-2">
              <BottomSheet.Title>{t`Your email`}</BottomSheet.Title>
              <BottomSheet.Description>
                {t`The keyboard opens with the sheet. We'll send a verification code to this address.`}
              </BottomSheet.Description>
            </View>
            <BottomSheet.Close />
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

const BOTTOM_SHEET_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-bottom-sheet',
    label: msg`Basic bottom sheet`,
    content: <BasicBottomSheetContent />,
  },
  {
    value: 'with-blur-overlay',
    label: msg`With blur overlay`,
    content: <WithBlurOverlayContent />,
  },
  {
    value: 'stacked-bottom-sheets',
    label: msg`Stacked bottom sheets`,
    content: <StackedBottomSheetContent />,
  },
  {
    value: 'controlled-by-name',
    label: msg`Controlled by name`,
    content: <ControlledByNameContent />,
  },
  {
    value: 'overlay',
    label: msg`Dialog and toast above the sheet`,
    content: <OverlayBottomSheetContent />,
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
    label: msg`Bottom sheet with autofocus input`,
    content: <WithTextInputContent />,
  },
  {
    value: 'with-otp-input',
    label: msg`Bottom sheet with OTP input`,
    content: <WithOTPInputContent />,
  },
  {
    value: 'native-modal',
    label: msg`Bottom sheet from native modal`,
    content: <NativeModalBottomSheetContent />,
  },
];

export default function BottomSheetScreen() {
  const variants =
    Platform.OS === 'ios'
      ? BOTTOM_SHEET_VARIANTS
      : BOTTOM_SHEET_VARIANTS.filter(
          (variant) => variant.value !== 'native-modal'
        );

  return <UsageVariantFlatList data={variants} />;
}
