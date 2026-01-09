/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  cn,
  InputOTP,
  REGEXP_ONLY_CHARS,
  useToast,
  type InputOTPRef,
} from 'heroui-native';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

// ------------------------------------------------------------------------------

const BasicOTPContent = () => {
  const ref = useRef<InputOTPRef>(null);

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

  return (
    <View className="flex-1 px-5 items-center justify-center">
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
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithPlaceholderOTPContent = () => {
  const ref = useRef<InputOTPRef>(null);

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

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP
        ref={ref}
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
  );
};

// ------------------------------------------------------------------------------

const DisabledStateOTPContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
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
        toast.show({
          variant: 'danger',
          label: 'Invalid Code',
          description: 'The code you entered is incorrect. Please try again.',
        });
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
        <Button size="sm" className="self-start" onPress={onSubmit}>
          Submit
        </Button>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithPatternOTPContent = () => {
  const ref = useRef<InputOTPRef>(null);

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

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP
        ref={ref}
        maxLength={6}
        onComplete={onComplete}
        pattern={REGEXP_ONLY_CHARS}
        inputMode="text"
        textInputProps={{
          autoCapitalize: 'none',
        }}
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
        className="w-full py-4 gap-8 rounded-2xl items-center justify-center border-2 border-pink-950/5 bg-pink-300/5"
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
                  <InputOTP.SlotPlaceholder className="text-pink-950/50" />
                  <InputOTP.SlotValue className="text-2xl text-pink-950" />
                  <InputOTP.SlotCaret className="bg-pink-950/50" />
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
                  <InputOTP.SlotPlaceholder className="text-pink-950/50" />
                  <InputOTP.SlotValue className="text-2xl text-pink-950" />
                  <InputOTP.SlotCaret className="bg-pink-950/50" />
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
    value: 'custom-styles',
    label: 'Custom Styles',
    content: <CustomStylesOTPContent />,
  },
  {
    value: 'basic',
    label: 'Basic',
    content: <BasicOTPContent />,
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
];

export default function InputOTPScreen() {
  return <UsageVariantFlatList data={INPUT_OTP_VARIANTS} />;
}
