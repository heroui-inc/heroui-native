/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  cn,
  Description,
  FieldError,
  InputOTP,
  Label,
  REGEXP_ONLY_CHARS,
  useToast,
  type InputOTPRef,
} from 'heroui-native';
import { useRef, useState, type RefObject } from 'react';
import { View } from 'react-native';
import { WithOTPInputContent } from '../../../components/bottom-sheet/with-otp-input';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { simulatePress } from '../../../helpers/utils/simulate-press';

const useOnComplete = ({ ref }: { ref: RefObject<InputOTPRef | null> }) => {
  const { toast } = useToast();

  const onComplete = (code: string) => {
    toast.show({
      variant: 'success',
      label: 'Completed',
      description: `Code: ${code}`,
    });
    setTimeout(() => {
      ref.current?.clear();
    }, 1000);
  };

  return onComplete;
};

// ------------------------------------------------------------------------------

const BasicOTPContent = () => {
  const ref = useRef<InputOTPRef>(null);

  const onComplete = useOnComplete({ ref });

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View>
        <Label className="px-1">Verify account</Label>
        <Description className="px-1 mb-2.5">
          We've sent a code to a****@gmail.com
        </Description>
        <InputOTP ref={ref} maxLength={6} onComplete={onComplete}>
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
        <View className="flex-row items-center mt-2.5">
          <Description className="px-1">Didn't receive a code?</Description>
          <Button
            size="sm"
            variant="ghost"
            className="px-2"
            onPress={simulatePress}
          >
            Resend code
          </Button>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const FourDigitsOTPContent = () => {
  const ref = useRef<InputOTPRef>(null);

  const onComplete = useOnComplete({ ref });

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="gap-2">
        <Label className="px-1">Enter your PIN</Label>
        <InputOTP ref={ref} maxLength={4} onComplete={onComplete}>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
        </InputOTP>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithPlaceholderOTPContent = () => {
  const ref = useRef<InputOTPRef>(null);

  const onComplete = useOnComplete({ ref });

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="gap-2">
        <Label className="px-1">Enter verification code</Label>
        <InputOTP
          ref={ref}
          variant="secondary"
          maxLength={6}
          onComplete={onComplete}
          placeholder="——————"
        >
          <InputOTP.Group>
            {({ slots }) => (
              <>
                {slots.map((slot) => (
                  <InputOTP.Slot key={slot.index} index={slot.index} />
                ))}
              </>
            )}
          </InputOTP.Group>
        </InputOTP>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledStateOTPContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="gap-2">
        <Label className="px-1" isDisabled>
          Enter verification code
        </Label>
        <InputOTP maxLength={6} isDisabled>
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
};

// ------------------------------------------------------------------------------

const WithValidationOTPContent = () => {
  const [value, setValue] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const { toast } = useToast();

  const onSubmit = () => {
    if (value.length === 6) {
      if (value === '123456') {
        toast.show({
          variant: 'success',
          label: 'Verification Successful',
          description:
            'Your code has been verified successfully. You can proceed.',
        });
        setValue('');
        if (isInvalid) {
          setIsInvalid(false);
        }
      } else {
        setIsInvalid(true);
      }
    } else {
      toast.show({
        variant: 'warning',
        label: 'Incomplete Code',
        description:
          'Please enter all 6 digits to complete your verification code.',
      });
    }
  };

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="gap-5">
        <View>
          <Label className="px-1" isInvalid={isInvalid}>
            Verify account
          </Label>
          <Description className="px-1 mb-2.5">
            Hint: The code is 123456
          </Description>
          <InputOTP
            value={value}
            onChange={setValue}
            maxLength={6}
            isInvalid={isInvalid}
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
          <FieldError className="mt-2.5" isInvalid={isInvalid}>
            The code you entered is incorrect.
          </FieldError>
          <Button
            variant="secondary"
            className="self-start mt-5"
            onPress={onSubmit}
          >
            Submit
          </Button>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithPatternOTPContent = () => {
  const ref = useRef<InputOTPRef>(null);

  const onComplete = useOnComplete({ ref });

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View>
        <Label className="mb-1">Enter code (letters only)</Label>
        <Description className="mb-3">
          Only alphabetic characters are allowed
        </Description>
        <InputOTP
          ref={ref}
          maxLength={6}
          onComplete={onComplete}
          pattern={REGEXP_ONLY_CHARS}
          inputMode="text"
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
};

// ------------------------------------------------------------------------------

const CustomStylesOTPContent = () => {
  const ref = useRef<InputOTPRef>(null);

  const { toast } = useToast();

  const onComplete = (code: string) => {
    setTimeout(() => {
      toast.show({
        variant: 'success',
        label: 'Completed',
        description: `Code: ${code}`,
      });
    }, 0);
    setTimeout(() => {
      ref.current?.clear();
    }, 750);
  };

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP
        ref={ref}
        maxLength={6}
        placeholder="——————"
        onComplete={onComplete}
        className="w-full py-4 gap-8 rounded-3xl items-center justify-center bg-surface shadow-surface"
        style={{
          borderCurve: 'continuous',
        }}
      >
        <InputOTP.Group className="gap-0">
          {({ slots }) => (
            <>
              {slots.slice(0, 3).map((slot) => (
                <InputOTP.Slot
                  key={slot.index}
                  index={slot.index}
                  className={cn(
                    'bg-transparent shadow-none w-8',
                    slot.isActive && 'border-0'
                  )}
                >
                  <InputOTP.SlotPlaceholder />
                  <InputOTP.SlotValue className="text-2xl" />
                  <InputOTP.SlotCaret />
                </InputOTP.Slot>
              ))}
            </>
          )}
        </InputOTP.Group>
        <InputOTP.Group className="gap-0">
          {({ slots }) => (
            <>
              {slots.slice(3, 6).map((slot) => (
                <InputOTP.Slot
                  key={slot.index}
                  index={slot.index}
                  className={cn(
                    'bg-transparent shadow-none w-8',
                    slot.isActive && 'border-0'
                  )}
                >
                  <InputOTP.SlotPlaceholder />
                  <InputOTP.SlotValue className="text-2xl" />
                  <InputOTP.SlotCaret />
                </InputOTP.Slot>
              ))}
            </>
          )}
        </InputOTP.Group>
      </InputOTP>
    </View>
  );
};

// ------------------------------------------------------------------------------

const INPUT_OTP_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: 'Basic',
    content: <BasicOTPContent />,
  },
  {
    value: 'four-digits',
    label: 'Four Digits',
    content: <FourDigitsOTPContent />,
  },
  {
    value: 'with-placeholder',
    label: 'With Placeholder',
    content: <WithPlaceholderOTPContent />,
  },
  {
    value: 'disabled',
    label: 'Disabled',
    content: <DisabledStateOTPContent />,
  },
  {
    value: 'with-validation',
    label: 'With Validation',
    content: <WithValidationOTPContent />,
  },
  {
    value: 'with-pattern',
    label: 'With Pattern',
    content: <WithPatternOTPContent />,
  },
  {
    value: 'custom-styles',
    label: 'Custom Styles',
    content: <CustomStylesOTPContent />,
  },
  {
    value: 'with-bottom-sheet',
    label: 'With bottom sheet',
    content: <WithOTPInputContent />,
  },
];

export default function InputOTPScreen() {
  return <UsageVariantFlatList data={INPUT_OTP_VARIANTS} />;
}
