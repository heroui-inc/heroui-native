import { cn } from 'heroui-native';
import React, { useEffect, useRef } from 'react';
import { Alert, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {
  Group as InputOTPGroup,
  Root as InputOTPRoot,
  Slot as InputOTPSlot,
  useInputOTPContext,
  type RootRef,
} from '../../../../../src/primitives/input-otp';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

// Create InputOTP namespace for cleaner API
const InputOTP = {
  Root: InputOTPRoot,
  Group: InputOTPGroup,
  Slot: InputOTPSlot,
  useInputOTPContext,
};

// ------------------------------------------------------------------------------

/**
 * Slot component that renders a single OTP digit slot
 * Uses the InputOTP context to get slot data based on index
 */
function Slot({ index }: { index: number }) {
  const { slots } = useInputOTPContext();
  const slot = slots[index];

  if (!slot) {
    return null;
  }

  return (
    <View
      className={cn(
        'w-12 h-12 items-center justify-center border border-gray-200 rounded-lg bg-gray-50',
        {
          'border-blue-600 border-2': slot.isActive,
        }
      )}
    >
      {slot.char !== null && (
        <Text className="text-xl font-medium text-gray-900">{slot.char}</Text>
      )}
      {slot.hasFakeCaret && <FakeCaret />}
    </View>
  );
}

/**
 * Styled slot component with enhanced styling
 */
function StyledSlot({ index }: { index: number }) {
  const { slots } = useInputOTPContext();
  const slot = slots[index];

  if (!slot) {
    return null;
  }

  return (
    <View
      className={cn(
        'w-14 h-14 items-center justify-center border-2 rounded-xl bg-white',
        {
          'border-blue-500 bg-blue-50': slot.isActive,
          'border-gray-300': !slot.isActive,
        }
      )}
    >
      {slot.char !== null && (
        <Text className="text-2xl font-bold text-gray-900">{slot.char}</Text>
      )}
      {slot.hasFakeCaret && <FakeCaret />}
    </View>
  );
}

function FakeDash() {
  return (
    <View className="w-2 items-center justify-center">
      <View className="w-2 h-0.5 bg-gray-200 rounded-sm" />
    </View>
  );
}

function FakeCaret() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const baseStyle = {
    width: 2,
    height: 24,
    backgroundColor: '#2563EB',
    borderRadius: 1,
  };

  return (
    <View className="absolute w-full h-full items-center justify-center">
      <Animated.View style={[baseStyle, animatedStyle]} />
    </View>
  );
}

// ------------------------------------------------------------------------------

const BasicOTPContent = () => {
  const ref = useRef<RootRef>(null);

  const onComplete = (code: string) => {
    Alert.alert('Completed with code:', code);
    ref.current?.clear();
  };

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP.Root ref={ref} maxLength={6} onComplete={onComplete}>
        <InputOTP.Group className="flex-row gap-3 justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTP.Slot key={index} index={index}>
              <Slot index={index} />
            </InputOTP.Slot>
          ))}
        </InputOTP.Group>
      </InputOTP.Root>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DashedOTPContent = () => {
  const ref = useRef<RootRef>(null);

  const onComplete = (code: string) => {
    Alert.alert('Completed with code:', code);
    ref.current?.clear();
  };

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP.Root ref={ref} maxLength={6} onComplete={onComplete}>
        <InputOTP.Group className="flex-row gap-3 justify-center my-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <React.Fragment key={idx}>
              <InputOTP.Slot index={idx}>
                <Slot index={idx} />
              </InputOTP.Slot>
              {idx === 2 && <FakeDash />}
            </React.Fragment>
          ))}
        </InputOTP.Group>
      </InputOTP.Root>
    </View>
  );
};

// ------------------------------------------------------------------------------

const StyledOTPContent = () => {
  const ref = useRef<RootRef>(null);

  const onComplete = (code: string) => {
    Alert.alert('Completed with code:', code);
    ref.current?.clear();
  };

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP.Root ref={ref} maxLength={6} onComplete={onComplete}>
        <InputOTP.Group className="flex-row gap-3 justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTP.Slot key={index} index={index}>
              <StyledSlot index={index} />
            </InputOTP.Slot>
          ))}
        </InputOTP.Group>
      </InputOTP.Root>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ControlledOTPContent = () => {
  const ref = useRef<RootRef>(null);
  const [value, setValue] = React.useState('');

  const onComplete = (code: string) => {
    Alert.alert('Completed with code:', code);
    setValue('');
    ref.current?.clear();
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <View className="flex-1 px-5 items-center justify-center gap-4">
      <InputOTP.Root
        ref={ref}
        maxLength={6}
        value={value}
        onChange={handleChange as (value: string) => void}
        onComplete={onComplete}
      >
        <InputOTP.Group className="flex-row gap-3 justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTP.Slot key={index} index={index}>
              <Slot index={index} />
            </InputOTP.Slot>
          ))}
        </InputOTP.Group>
      </InputOTP.Root>
      <Text className="text-sm text-gray-600">
        Current value: {value || '(empty)'}
      </Text>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledOTPContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP.Root maxLength={6} isDisabled value="123456">
        <InputOTP.Group className="flex-row gap-3 justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTP.Slot key={index} index={index}>
              <Slot index={index} />
            </InputOTP.Slot>
          ))}
        </InputOTP.Group>
      </InputOTP.Root>
    </View>
  );
};

// ------------------------------------------------------------------------------

const InvalidOTPContent = () => {
  const ref = useRef<RootRef>(null);

  const onComplete = (code: string) => {
    Alert.alert('Completed with code:', code);
    ref.current?.clear();
  };

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP.Root ref={ref} maxLength={6} isInvalid onComplete={onComplete}>
        <InputOTP.Group className="flex-row gap-3 justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTP.Slot key={index} index={index}>
              <Slot index={index} />
            </InputOTP.Slot>
          ))}
        </InputOTP.Group>
      </InputOTP.Root>
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
    value: 'dashed',
    label: 'Dashed',
    content: <DashedOTPContent />,
  },
  {
    value: 'styled',
    label: 'Styled',
    content: <StyledOTPContent />,
  },
  {
    value: 'controlled',
    label: 'Controlled',
    content: <ControlledOTPContent />,
  },
  {
    value: 'disabled',
    label: 'Disabled',
    content: <DisabledOTPContent />,
  },
  {
    value: 'invalid',
    label: 'Invalid',
    content: <InvalidOTPContent />,
  },
];

export default function InputOTPScreen() {
  return <UsageVariantFlatList data={INPUT_OTP_VARIANTS} />;
}
