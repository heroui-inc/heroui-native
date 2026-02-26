import {
  Description,
  InputGroup,
  Label,
  Select,
  Separator,
  TextField,
} from 'heroui-native';
import React, { useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { CreditCardIcon } from '../../../components/icons/credit-card';
import { EyeIcon } from '../../../components/icons/eye';
import { EyeSlashIcon } from '../../../components/icons/eye-slash';
import { GlobeIcon } from '../../../components/icons/globe';
import { LockIcon } from '../../../components/icons/lock';
import { MagnifierIcon } from '../../../components/icons/magnifier';
import { PersonIcon } from '../../../components/icons/person';

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

const BasicInputGroupContent = () => {
  const [value, setValue] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <InputGroup>
          <InputGroup.Prefix isDecorative>
            <LockIcon size={16} colorClassName="accent-field-placeholder" />
          </InputGroup.Prefix>
          <InputGroup.Input
            value={value}
            onChangeText={setValue}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
          />
          <InputGroup.Suffix>
            <Pressable
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              hitSlop={20}
            >
              {isPasswordVisible ? (
                <EyeSlashIcon
                  size={16}
                  colorClassName="accent-field-placeholder"
                />
              ) : (
                <EyeIcon size={16} colorClassName="accent-field-placeholder" />
              )}
            </Pressable>
          </InputGroup.Suffix>
        </InputGroup>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithPrefixOnlyContent = () => {
  const [value, setValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-4">
          <InputGroup>
            <InputGroup.Prefix isDecorative>
              <PersonIcon size={16} colorClassName="accent-field-placeholder" />
            </InputGroup.Prefix>
            <InputGroup.Input
              value={value}
              onChangeText={setValue}
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </InputGroup>

          <InputGroup>
            <InputGroup.Prefix isDecorative>
              <CreditCardIcon
                size={16}
                colorClassName="accent-field-placeholder"
              />
            </InputGroup.Prefix>
            <InputGroup.Input
              placeholder="4242 4242 4242 4242"
              keyboardType="number-pad"
            />
          </InputGroup>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithSuffixOnlyContent = () => {
  const [search, setSearch] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-4">
          <InputGroup>
            <InputGroup.Input
              value={search}
              onChangeText={setSearch}
              placeholder="Search products..."
            />
            <InputGroup.Suffix isDecorative>
              <MagnifierIcon
                size={16}
                colorClassName="accent-field-placeholder"
              />
            </InputGroup.Suffix>
          </InputGroup>

          <InputGroup>
            <InputGroup.Input placeholder="heroui.com" autoCapitalize="none" />
            <InputGroup.Suffix isDecorative>
              <GlobeIcon size={16} colorClassName="accent-field-placeholder" />
            </InputGroup.Suffix>
          </InputGroup>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithSelectPrefixContent = () => {
  const [phone, setPhone] = useState('');
  const [dialCode, setDialCode] = useState<DialCodeOption>(DIAL_CODES[0]!);

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField isRequired>
          <Label>Phone number</Label>
          <InputGroup>
            <InputGroup.Prefix className="flex-row">
              <Select
                presentation="bottom-sheet"
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
                  <AppText className="text-sm font-medium text-foreground">
                    {dialCode.code}
                  </AppText>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Overlay />
                  <Select.Content presentation="bottom-sheet">
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
              <Separator orientation="vertical" className="h-5" />
            </InputGroup.Prefix>
            <InputGroup.Input
              value={phone}
              onChangeText={setPhone}
              placeholder="(555) 000-0000"
              keyboardType="phone-pad"
            />
          </InputGroup>
          <Description>
            We'll send a verification code to this number
          </Description>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const INPUT_GROUP_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-input-group',
    label: 'Basic',
    content: <BasicInputGroupContent />,
  },
  {
    value: 'with-prefix-only',
    label: 'With prefix only',
    content: <WithPrefixOnlyContent />,
  },
  {
    value: 'with-suffix-only',
    label: 'With suffix only',
    content: <WithSuffixOnlyContent />,
  },
  {
    value: 'with-select-prefix',
    label: 'With select prefix',
    content: <WithSelectPrefixContent />,
  },
];

export default function InputGroupScreen() {
  return <UsageVariantFlatList data={INPUT_GROUP_VARIANTS} />;
}
