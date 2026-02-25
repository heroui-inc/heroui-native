import {
  Description,
  FieldError,
  InputField,
  Label,
  Select,
  Separator,
  TextField,
} from 'heroui-native';
import React, { useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { EyeIcon } from '../../../components/icons/eye';
import { EyeSlashIcon } from '../../../components/icons/eye-slash';
import { GlobeIcon } from '../../../components/icons/globe';
import { LockIcon } from '../../../components/icons/lock';
import { WithStateToggle } from '../../../components/with-state-toggle';

type DialCodeOption = {
  value: string;
  label: string;
  flag: string;
  code: string;
};

const DIAL_CODES: DialCodeOption[] = [
  { value: 'US', label: 'United States', flag: '🇺🇸', code: '+1' },
  { value: 'GB', label: 'United Kingdom', flag: '🇬🇧', code: '+44' },
  { value: 'CA', label: 'Canada', flag: '🇨🇦', code: '+1' },
  { value: 'AU', label: 'Australia', flag: '🇦🇺', code: '+61' },
  { value: 'DE', label: 'Germany', flag: '🇩🇪', code: '+49' },
  { value: 'FR', label: 'France', flag: '🇫🇷', code: '+33' },
  { value: 'JP', label: 'Japan', flag: '🇯🇵', code: '+81' },
  { value: 'IN', label: 'India', flag: '🇮🇳', code: '+91' },
  { value: 'BR', label: 'Brazil', flag: '🇧🇷', code: '+55' },
  { value: 'MX', label: 'Mexico', flag: '🇲🇽', code: '+52' },
];

const KeyboardAvoidingContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { height } = useWindowDimensions();

  const { progress } = useReanimatedKeyboardAnimation();

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(progress.get() === 1 ? -height * 0.15 : 0, {
            duration: 250,
          }),
        },
      ],
    };
  });

  return <Animated.View style={rStyle}>{children}</Animated.View>;
};

// ------------------------------------------------------------------------------

const BasicInputFieldContent = () => {
  const [value, setValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <InputField value={value} onChange={setValue}>
          <InputField.Input placeholder="Enter text" />
        </InputField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PhoneInputContent = () => {
  const [phone, setPhone] = useState('');
  const [dialCode, setDialCode] = useState<DialCodeOption>(DIAL_CODES[0]!);

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField isRequired>
          <Label>Phone number</Label>
          <InputField value={phone} onChange={setPhone}>
            <InputField.Addon>
              <Select
                value={dialCode}
                onValueChange={(value) => {
                  const found = DIAL_CODES.find(
                    (d) => d.value === value?.value
                  );
                  if (found) setDialCode(found);
                }}
              >
                <Select.Trigger
                  variant="unstyled"
                  className="flex-row items-center gap-1"
                >
                  <AppText className="text-base">{dialCode.flag}</AppText>
                  <AppText className="text-sm font-semibold text-foreground">
                    {dialCode.code}
                  </AppText>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Overlay />
                  <Select.Content
                    presentation="popover"
                    width={260}
                    placement="bottom"
                    align="start"
                  >
                    <Select.ListLabel>Select country</Select.ListLabel>
                    {DIAL_CODES.map((option, index) => (
                      <React.Fragment key={option.value}>
                        <Select.Item value={option.value} label={option.label}>
                          <AppText className="text-xl">{option.flag}</AppText>
                          <AppText className="text-sm text-muted w-10">
                            {option.code}
                          </AppText>
                          <AppText className="flex-1 text-base text-foreground">
                            {option.label}
                          </AppText>
                          <Select.ItemIndicator />
                        </Select.Item>
                        {index < DIAL_CODES.length - 1 && <Separator />}
                      </React.Fragment>
                    ))}
                  </Select.Content>
                </Select.Portal>
              </Select>
            </InputField.Addon>
            <Separator orientation="vertical" className="h-5 mx-1" />
            <InputField.Input
              placeholder="(555) 000-0000"
              keyboardType="phone-pad"
            />
          </InputField>
          <Description>
            We'll send a verification code to this number
          </Description>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithLeadingAddonContent = () => {
  const [value, setValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <InputField value={value} onChange={setValue}>
          <InputField.Addon
            pointerEvents="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <GlobeIcon size={16} colorClassName="accent-field-placeholder" />
          </InputField.Addon>
          <InputField.Input
            placeholder="Enter website URL"
            keyboardType="url"
            autoCapitalize="none"
          />
        </InputField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithLeadingAndTrailingAddonsContent = () => {
  const [value, setValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <InputField value={value} onChange={setValue}>
          <InputField.Addon
            pointerEvents="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <Text className="text-sm text-field-placeholder">$</Text>
          </InputField.Addon>
          <InputField.Input placeholder="0.00" keyboardType="decimal-pad" />
          <InputField.Addon
            pointerEvents="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <Text className="text-sm text-field-placeholder">USD</Text>
          </InputField.Addon>
        </InputField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithPasswordToggleContent = () => {
  const [value, setValue] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <InputField value={value} onChange={setValue}>
          <InputField.Addon
            pointerEvents="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <LockIcon size={16} colorClassName="accent-field-placeholder" />
          </InputField.Addon>
          <InputField.Input
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
          />
          <InputField.Addon>
            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <EyeSlashIcon
                  size={16}
                  colorClassName="accent-field-placeholder"
                />
              ) : (
                <EyeIcon size={16} colorClassName="accent-field-placeholder" />
              )}
            </Pressable>
          </InputField.Addon>
        </InputField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithTextFieldContent = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [value, setValue] = useState('');

  return (
    <WithStateToggle
      isSelected={isInvalid}
      onSelectedChange={setIsInvalid}
      label="Simulate Error"
      description="Toggle validation error state"
    >
      <View className="flex-1 pt-[55%]">
        <KeyboardAvoidingContainer>
          <TextField isRequired isInvalid={isInvalid}>
            <Label>Amount</Label>
            <InputField value={value} onChange={setValue}>
              <InputField.Addon
                pointerEvents="none"
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              >
                <Text className="text-sm text-field-placeholder">$</Text>
              </InputField.Addon>
              <InputField.Input placeholder="0.00" keyboardType="decimal-pad" />
            </InputField>
            <Description hideOnInvalid>
              Enter the transaction amount
            </Description>
            <FieldError>Please enter a valid amount</FieldError>
          </TextField>
        </KeyboardAvoidingContainer>
      </View>
    </WithStateToggle>
  );
};

// ------------------------------------------------------------------------------

const DisabledContent = () => {
  const [activeValue, setActiveValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <InputField value={activeValue} onChange={setActiveValue}>
            <InputField.Addon
              pointerEvents="none"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            >
              <GlobeIcon size={16} colorClassName="accent-field-placeholder" />
            </InputField.Addon>
            <InputField.Input placeholder="Active field" />
          </InputField>

          <InputField isDisabled value="heroui.com">
            <InputField.Addon
              pointerEvents="none"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            >
              <GlobeIcon size={16} colorClassName="accent-field-placeholder" />
            </InputField.Addon>
            <InputField.Input placeholder="Disabled field" />
          </InputField>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const INPUT_FIELD_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-input-field',
    label: 'Basic InputField',
    content: <BasicInputFieldContent />,
  },
  {
    value: 'phone-input',
    label: 'Phone number input',
    content: <PhoneInputContent />,
  },
  {
    value: 'with-leading-addon',
    label: 'With leading addon',
    content: <WithLeadingAddonContent />,
  },
  {
    value: 'with-leading-and-trailing-addons',
    label: 'With leading & trailing addons',
    content: <WithLeadingAndTrailingAddonsContent />,
  },
  {
    value: 'with-password-toggle',
    label: 'With password toggle',
    content: <WithPasswordToggleContent />,
  },
  {
    value: 'within-text-field',
    label: 'Within TextField',
    content: <WithTextFieldContent />,
  },
  {
    value: 'disabled',
    label: 'Disabled',
    content: <DisabledContent />,
  },
];

export default function InputFieldScreen() {
  return <UsageVariantFlatList data={INPUT_FIELD_VARIANTS} />;
}
