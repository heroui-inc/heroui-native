import { Button, InputOTP } from 'heroui-native';
import { useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

// ------------------------------------------------------------------------------

const BasicOTPContent = () => {
  const ref = useRef<React.ComponentRef<typeof InputOTP>>(null);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.focus();
    }, 1000);
  }, []);

  const onComplete = (code: string) => {
    Alert.alert('Completed', `Code: ${code}`);
    ref.current?.clear();
  };

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP ref={ref} maxLength={6} onComplete={onComplete}>
        <InputOTP.Group>
          {({ slots }) => (
            <>
              {slots.map((_, index) => (
                <InputOTP.Slot key={index} index={index} />
              ))}
            </>
          )}
        </InputOTP.Group>
      </InputOTP>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithSeparatorContent = () => {
  const ref = useRef<React.ComponentRef<typeof InputOTP>>(null);

  const onComplete = (code: string) => {
    Alert.alert('Completed', `Code: ${code}`);
    ref.current?.clear();
  };

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP ref={ref} maxLength={6} onComplete={onComplete}>
        <InputOTP.Group>
          <InputOTP.Slot index={0}>
            <InputOTP.SlotCaret />
          </InputOTP.Slot>
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

const WithPlaceholderContent = () => {
  const ref = useRef<React.ComponentRef<typeof InputOTP>>(null);

  const onComplete = (code: string) => {
    Alert.alert('Completed', `Code: ${code}`);
    ref.current?.clear();
  };

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP
        ref={ref}
        maxLength={6}
        placeholder="000000"
        onComplete={onComplete}
      >
        <InputOTP.Group>
          <InputOTP.Slot index={0}>
            <InputOTP.SlotCaret />
          </InputOTP.Slot>
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ControlledContent = () => {
  const ref = useRef<React.ComponentRef<typeof InputOTP>>(null);
  const [value, setValue] = useState('');

  const onComplete = (code: string) => {
    Alert.alert('Completed', `Code: ${code}`);
    setValue('');
    ref.current?.clear();
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <View className="flex-1 px-5 items-center justify-center gap-4">
      <InputOTP
        ref={ref}
        maxLength={6}
        value={value}
        onChange={handleChange}
        onComplete={onComplete}
      >
        <InputOTP.Group>
          <InputOTP.Slot index={0}>
            <InputOTP.SlotCaret />
          </InputOTP.Slot>
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP>
      <View className="px-4 py-2 rounded-lg bg-surface border border-border">
        <AppText className="text-sm text-muted">
          Current value: {value || '(empty)'}
        </AppText>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP maxLength={6} isDisabled value="123456">
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP>
    </View>
  );
};

// ------------------------------------------------------------------------------

const InvalidContent = () => {
  const ref = useRef<React.ComponentRef<typeof InputOTP>>(null);

  const onComplete = (code: string) => {
    Alert.alert('Completed', `Code: ${code}`);
    ref.current?.clear();
  };

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <InputOTP ref={ref} maxLength={6} isInvalid onComplete={onComplete}>
        <InputOTP.Group>
          <InputOTP.Slot index={0}>
            <InputOTP.SlotCaret />
          </InputOTP.Slot>
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithActionsContent = () => {
  const ref = useRef<React.ComponentRef<typeof InputOTP>>(null);
  const [value, setValue] = useState('');

  const onComplete = (code: string) => {
    Alert.alert('Completed', `Code: ${code}`);
    setValue('');
    ref.current?.clear();
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleFocus = () => {
    ref.current?.focus();
  };

  const handleClear = () => {
    setValue('');
    ref.current?.clear();
  };

  return (
    <View className="flex-1 px-5 items-center justify-center gap-4">
      <InputOTP
        ref={ref}
        maxLength={6}
        value={value}
        onChange={handleChange}
        onComplete={onComplete}
      >
        <InputOTP.Group>
          <InputOTP.Slot index={0}>
            <InputOTP.SlotCaret />
          </InputOTP.Slot>
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP>
      <View className="flex-row gap-2">
        <Button size="sm" variant="secondary" onPress={handleFocus}>
          Focus
        </Button>
        <Button size="sm" variant="secondary" onPress={handleClear}>
          Clear
        </Button>
      </View>
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
    value: 'with-separator',
    label: 'With separator',
    content: <WithSeparatorContent />,
  },
  {
    value: 'with-placeholder',
    label: 'With placeholder',
    content: <WithPlaceholderContent />,
  },
  {
    value: 'controlled',
    label: 'Controlled',
    content: <ControlledContent />,
  },
  {
    value: 'disabled',
    label: 'Disabled',
    content: <DisabledContent />,
  },
  {
    value: 'invalid',
    label: 'Invalid',
    content: <InvalidContent />,
  },
  {
    value: 'with-actions',
    label: 'With actions',
    content: <WithActionsContent />,
  },
];

export default function InputOTPScreen() {
  return <UsageVariantFlatList data={INPUT_OTP_VARIANTS} />;
}
