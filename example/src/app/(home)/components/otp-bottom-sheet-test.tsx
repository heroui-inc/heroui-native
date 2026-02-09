import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  BottomSheet,
  Button,
  Description,
  InputOTP,
  Label,
  useBottomSheetInputHandlers,
  useToast,
  type InputOTPRef,
} from 'heroui-native';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';
import { AppText } from '../../../components/app-text';

const BottomSheetInputOTP = memo(
  ({
    otpRef,
    value,
    onChange,
    onComplete,
  }: {
    otpRef: React.RefObject<InputOTPRef | null>;
    value: string;
    onChange: (value: string) => void;
    onComplete: (code: string) => void;
  }) => {
    const { onFocus, onBlur } = useBottomSheetInputHandlers();

    return (
      <View className="gap-2 items-center">
        <Label className="px-1">Verify account</Label>
        <Description className="px-1 mb-2.5">
          Enter the 6-digit code sent to your device
        </Description>
        <InputOTP
          ref={otpRef}
          variant="secondary"
          maxLength={6}
          value={value}
          onChange={onChange}
          onComplete={onComplete}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Group>
        </InputOTP>
      </View>
    );
  }
);

/**
 * Bottom sheet content component containing the OTP input
 * Manages OTP state and handles completion
 */
const OTPBottomSheetContent = () => {
  const otpRef = useRef<InputOTPRef>(null);
  const [otpValue, setOtpValue] = useState('');
  const { toast } = useToast();

  const snapPoints = useMemo(() => ['50%', '90%'], []);

  /**
   * Handles OTP completion
   */
  const handleComplete = useCallback(
    (code: string) => {
      toast.show({
        variant: 'success',
        label: 'OTP Verified',
        description: `Code entered: ${code}`,
      });
      setTimeout(() => {
        setOtpValue('');
        otpRef.current?.clear();
      }, 2000);
    },
    [toast]
  );

  return (
    <BottomSheet.Content
      snapPoints={snapPoints}
      enableOverDrag={false}
      enableDynamicSizing={false}
      contentContainerClassName="px-5 pt-6 pb-8"
      keyboardBehavior="extend"
      onClose={() => {
        KeyboardController.dismiss();
      }}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-1"
      >
        <View className="flex-1 justify-center">
          <BottomSheetInputOTP
            otpRef={otpRef}
            value={otpValue}
            onChange={setOtpValue}
            onComplete={handleComplete}
          />
          <View className="mt-6 gap-3">
            <Button
              variant="primary"
              onPress={() => {
                if (otpValue.length === 6) {
                  handleComplete(otpValue);
                } else {
                  toast.show({
                    variant: 'warning',
                    label: 'Incomplete Code',
                    description: 'Please enter all 6 digits',
                  });
                }
              }}
            >
              Verify Code
            </Button>
            <Button
              variant="tertiary"
              onPress={() => {
                setOtpValue('');
                otpRef.current?.clear();
              }}
            >
              Clear
            </Button>
          </View>
          <View className="mt-8">
            <AppText className="text-sm text-muted text-center">
              Test keyboard avoidance by tapping the OTP input field. The bottom
              sheet should adjust its position to keep the input visible above
              the keyboard.
            </AppText>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet.Content>
  );
};

/**
 * Main component that renders the bottom sheet trigger and portal
 */
export default function OTPBottomSheetTestScreen() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center px-5">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isOpen}>
              Open OTP Bottom Sheet
            </Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay onPress={() => KeyboardController.dismiss()} />
            <BottomSheet.Title className="sr-only">
              OTP Verification
            </BottomSheet.Title>
            <OTPBottomSheetContent />
          </BottomSheet.Portal>
        </BottomSheet>
        <View className="mt-6 px-4">
          <AppText className="text-sm text-muted text-center">
            This screen tests keyboard avoidance behavior when using InputOTP
            inside a BottomSheet. Tap the button above to open the bottom sheet
            and test the keyboard interaction.
          </AppText>
        </View>
      </View>
    </View>
  );
}
