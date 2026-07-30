import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import {
  cn,
  Description,
  FieldError,
  Input,
  Label,
  TextField,
} from 'heroui-native';
import { useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { EyeIcon } from '../../../components/icons/eye';
import { EyeSlashIcon } from '../../../components/icons/eye-slash';
import { LockIcon } from '../../../components/icons/lock';
import { WithStateToggle } from '../../../components/with-state-toggle';
import { useAppTheme } from '../../../contexts/app-theme-context';

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

const BasicTextFieldContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField isRequired>
          <Label>{t`Email`}</Label>
          <Input
            placeholder={t`Enter your email`}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Description>
            {t`We'll never share your email with anyone else.`}
          </Description>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TextFieldWithIconsContent = () => {
  const { t } = useLingui();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField isRequired>
          <Label>{t`Password`}</Label>
          <View className="w-full flex-row items-center">
            <Input
              className="flex-1 px-10"
              placeholder={t`Enter your password`}
              secureTextEntry={!isPasswordVisible}
            />
            <View className="absolute inset-s-3.5" pointerEvents="none">
              <LockIcon size={16} colorClassName="accent-field-placeholder" />
            </View>
            <Pressable
              className="absolute inset-e-4"
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
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
          </View>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const DisabledTextFieldContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <TextField>
            <Label>{t`Account ID`}</Label>
            <Input placeholder={t`Enter account ID`} value="ACC-2024-12345" />
            <Description>{t`Your unique account identifier`}</Description>
          </TextField>

          <TextField isDisabled>
            <Label>{t`User Role`}</Label>
            <Input placeholder={t`Role assignment`} value="Administrator" />
            <Description>{t`Contact support to change your role`}</Description>
          </TextField>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TextFieldWithValidationContent = () => {
  const { t } = useLingui();
  const [isTestFieldInvalid, setIsTestFieldInvalid] = useState(false);
  const [testFieldValue, setTestFieldValue] = useState('');

  return (
    <WithStateToggle
      isSelected={isTestFieldInvalid}
      onSelectedChange={setIsTestFieldInvalid}
      label={t`Simulate Error`}
      description={t`Toggle validation error state`}
    >
      <View className="flex-1 pt-[55%]">
        <KeyboardAvoidingContainer>
          <TextField isRequired isInvalid={isTestFieldInvalid}>
            <Label>{t`Promo Code`}</Label>
            <Input
              placeholder={t`Enter promo code`}
              value={testFieldValue}
              onChangeText={setTestFieldValue}
              autoCapitalize="characters"
            />
            <Description hideOnInvalid>
              {t`Enter a valid code to receive discount`}
            </Description>
            <FieldError>{t`This promo code is invalid or has expired`}</FieldError>
          </TextField>
        </KeyboardAvoidingContainer>
      </View>
    </WithStateToggle>
  );
};

const TextFieldWithCustomStylesContent = () => {
  const { t } = useLingui();
  const { isDark } = useAppTheme();

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField>
          <Label>{t`Gift Card Number`}</Label>
          <Input
            placeholder={t`Enter 16-digit gift card number`}
            keyboardType="number-pad"
            maxLength={16}
            className={cn(
              'border-[0.5px] border-neutral-900 bg-background rounded-none',
              isDark && 'border-neutral-100'
            )}
          />
          <Description>{t`Redeem your gift card at checkout`}</Description>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TEXT_FIELD_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-text-field',
    label: msg`Basic TextField`,
    content: <BasicTextFieldContent />,
  },
  {
    value: 'text-field-with-icons',
    label: msg`TextField with icons`,
    content: <TextFieldWithIconsContent />,
  },
  {
    value: 'disabled-text-field',
    label: msg`Disabled TextField`,
    content: <DisabledTextFieldContent />,
  },
  {
    value: 'text-field-with-validation',
    label: msg`TextField with validation`,
    content: <TextFieldWithValidationContent />,
  },
  {
    value: 'text-field-with-custom-styles',
    label: msg`TextField with custom styles`,
    content: <TextFieldWithCustomStylesContent />,
  },
];

export default function TextFieldScreen() {
  return <UsageVariantFlatList data={TEXT_FIELD_VARIANTS} />;
}
