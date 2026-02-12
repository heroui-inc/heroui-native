import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  Avatar,
  BottomSheet,
  Button,
  Description,
  InputOTP,
  Label,
  useToast,
  type InputOTPRef,
} from 'heroui-native';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';
import { AppText } from '../app-text';

/**
 * Formats a phone number for display
 */
const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  return phone;
};

/**
 * OTP Input component with enhanced UI
 *
 * InputOTP automatically handles keyboard interactions inside a bottom sheet
 * via the isBottomSheetAware prop (enabled by default).
 */
const BottomSheetInputOTP = memo(
  ({
    otpRef,
    value,
    onChange,
    onComplete,
    phoneNumber,
  }: {
    otpRef: React.RefObject<InputOTPRef | null>;
    value: string;
    onChange: (value: string) => void;
    onComplete: (code: string) => void;
    phoneNumber: string;
  }) => {
    return (
      <View className="gap-6 items-center">
        <Avatar size="lg" color="accent" variant="soft" alt="Verification icon">
          <Avatar.Fallback>
            <AppText className="text-2xl font-semibold">✓</AppText>
          </Avatar.Fallback>
        </Avatar>

        <View className="gap-1 items-center px-2">
          <Label className="text-2xl font-semibold text-center">
            Verify your phone number
          </Label>
          <Description className="text-base text-center text-muted">
            We sent a verification code to
          </Description>
          <AppText className="text-base font-semibold text-center mt-1">
            {formatPhoneNumber(phoneNumber)}
          </AppText>
        </View>

        <View className="w-full items-center">
          <InputOTP
            ref={otpRef}
            variant="secondary"
            maxLength={6}
            value={value}
            onChange={onChange}
            onComplete={onComplete}
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
      </View>
    );
  }
);

/**
 * Bottom sheet content component containing the OTP input
 * Manages OTP state, resend timer, and handles completion
 */
const OTPBottomSheetContent = () => {
  const otpRef = useRef<InputOTPRef>(null);
  const [otpValue, setOtpValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { toast } = useToast();

  const phoneNumber = '+12345678900';

  /**
   * Starts the resend timer countdown
   */
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [resendTimer]);

  /**
   * Handles OTP completion with loading state
   */
  const handleComplete = useCallback(
    async (_code: string) => {
      setIsVerifying(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsVerifying(false);
      toast.show({
        variant: 'success',
        label: 'Phone verified',
        description: 'Your phone number has been successfully verified.',
      });

      setTimeout(() => {
        setOtpValue('');
        otpRef.current?.clear();
      }, 2000);
    },
    [toast]
  );

  /**
   * Handles resend code action
   */
  const handleResend = useCallback(() => {
    if (resendTimer > 0) return;

    setResendTimer(60);
    setOtpValue('');
    otpRef.current?.clear();
    toast.show({
      variant: 'success',
      label: 'Code sent',
      description: 'A new verification code has been sent to your phone.',
    });
  }, [resendTimer, toast]);

  /**
   * Handles manual verification button press
   */
  const handleVerify = useCallback(() => {
    if (otpValue.length === 6) {
      handleComplete(otpValue);
    } else {
      toast.show({
        variant: 'warning',
        label: 'Incomplete code',
        description: 'Please enter all 6 digits to continue.',
      });
    }
  }, [otpValue, handleComplete, toast]);

  return (
    <BottomSheet.Content
      onClose={() => {
        KeyboardController.dismiss();
        setOtpValue('');
        setResendTimer(0);
      }}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="pb-safe-offset-3"
      >
        <BottomSheetInputOTP
          otpRef={otpRef}
          value={otpValue}
          onChange={setOtpValue}
          onComplete={handleComplete}
          phoneNumber={phoneNumber}
        />

        <View className="mt-8 gap-3">
          <Button
            variant="primary"
            onPress={handleVerify}
            isDisabled={isVerifying || otpValue.length !== 6}
          >
            {isVerifying ? 'Verifying...' : 'Verify Code'}
          </Button>

          <View className="flex-row items-center justify-center mt-2">
            <AppText className="text-sm text-muted text-center">
              Didn't receive the code?
            </AppText>
            <Button
              variant="ghost"
              size="sm"
              onPress={handleResend}
              isDisabled={resendTimer > 0}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend'}
            </Button>
          </View>
        </View>
        <View className="mt-8 px-2">
          <AppText className="text-xs text-muted text-center leading-5">
            By continuing, you agree to receive SMS messages for verification.
            Message and data rates may apply.
          </AppText>
        </View>
      </BottomSheetScrollView>
    </BottomSheet.Content>
  );
};

export const WithOTPInputContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isOpen}>
              Bottom sheet with OTP input
            </Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay onPress={() => KeyboardController.dismiss()} />
            <BottomSheet.Title className="sr-only">
              Phone Number Verification
            </BottomSheet.Title>
            <OTPBottomSheetContent />
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};
