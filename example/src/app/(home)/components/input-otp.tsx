import { InputOTP, type InputOTPRef } from 'heroui-native';
import { useRef } from 'react';
import { Alert, View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

// ------------------------------------------------------------------------------

const BasicOTPContent = () => {
  const ref = useRef<InputOTPRef>(null);

  const onComplete = (code: string) => {
    Alert.alert('Completed', `Code: ${code}`);
    ref.current?.clear();
  };

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP
        ref={ref}
        maxLength={6}
        onComplete={onComplete}
        placeholder="000000"
      >
        <InputOTP.Group>
          {({ slots }) => (
            <>
              {slots.slice(0, 3).map((slot) => (
                <InputOTP.Slot key={slot.index} index={slot.index}>
                  <InputOTP.SlotPlaceholder />
                  <InputOTP.SlotValue />
                  <InputOTP.SlotCaret />
                </InputOTP.Slot>
              ))}
            </>
          )}
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          {({ slots }) => (
            <>
              {slots.slice(3, 6).map((slot) => (
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

const INPUT_OTP_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: 'Basic',
    content: <BasicOTPContent />,
  },
];

export default function InputOTPScreen() {
  return <UsageVariantFlatList data={INPUT_OTP_VARIANTS} />;
}
