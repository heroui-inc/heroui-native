import { Ionicons } from '@expo/vector-icons';
import { Button, TextField } from 'heroui-native';
import { useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { useAppTheme } from '../../../contexts/app-theme-context';

const StyledIonicons = withUniwind(Ionicons);

const KeyboardAvoidingContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { height } = useWindowDimensions();

  const { progress } = useReanimatedKeyboardAnimation();

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: progress.value === 1 ? -height * 0.15 : 0 }],
    };
  });

  return <Animated.View style={rStyle}>{children}</Animated.View>;
};

const BasicTextFieldContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField isRequired>
          <TextField.Label>Email</TextField.Label>
          <TextField.Input
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextField.Description>
            We'll never share your email with anyone else.
          </TextField.Description>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TextFieldWithIconsContent = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField isRequired>
          <TextField.Label>Password</TextField.Label>
          <TextField.Input
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
          >
            <TextField.InputStartContent className="pointer-events-none">
              <StyledIonicons
                name="lock-closed-outline"
                size={16}
                className="text-muted"
              />
            </TextField.InputStartContent>
            <TextField.InputEndContent>
              <Pressable
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <StyledIonicons
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={16}
                  className="text-muted"
                />
              </Pressable>
            </TextField.InputEndContent>
          </TextField.Input>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const DisabledTextFieldContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <TextField>
            <TextField.Label>Account ID</TextField.Label>
            <TextField.Input
              placeholder="Enter account ID"
              value="ACC-2024-12345"
            />
            <TextField.Description>
              Your unique account identifier
            </TextField.Description>
          </TextField>

          <TextField isDisabled>
            <TextField.Label>User Role</TextField.Label>
            <TextField.Input
              placeholder="Role assignment"
              value="Administrator"
            />
            <TextField.Description>
              Contact support to change your role
            </TextField.Description>
          </TextField>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const MultilineTextFieldContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField>
          <TextField.Label>Message</TextField.Label>
          <TextField.Input
            placeholder="Type your message here..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TextField.Description>Maximum 500 characters</TextField.Description>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TextFieldWithValidationContent = () => {
  const [isTestFieldInvalid, setIsTestFieldInvalid] = useState(false);
  const [testFieldValue, setTestFieldValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <TextField isRequired isInvalid={isTestFieldInvalid}>
            <TextField.Label>Promo Code</TextField.Label>
            <TextField.Input
              placeholder="Enter promo code"
              value={testFieldValue}
              onChangeText={setTestFieldValue}
              autoCapitalize="characters"
            />
            <TextField.Description>
              Enter a valid code to receive discount
            </TextField.Description>
            <TextField.ErrorMessage>
              This promo code is invalid or has expired
            </TextField.ErrorMessage>
          </TextField>
          <Button
            onPress={() => setIsTestFieldInvalid(!isTestFieldInvalid)}
            variant="secondary"
            size="sm"
            className="self-start"
          >
            {isTestFieldInvalid ? 'Clear Error' : 'Simulate Error'}
          </Button>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TextFieldWithCustomStylesContent = () => {
  const { isDark } = useAppTheme();

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField>
          <TextField.Label>Gift Card Number</TextField.Label>
          <TextField.Input
            placeholder="Enter 16-digit gift card number"
            keyboardType="number-pad"
            maxLength={16}
            className="border-[0.5px] rounded-none"
            selectionColor="#2563eb"
            colors={{
              blurBorder: isDark ? '#fafafa' : '#09090b',
              focusBorder: isDark ? '#fafafa' : '#09090b',
              blurBackground: isDark ? '#18181b' : '#fafafa',
              focusBackground: isDark ? '#18181b' : '#fafafa',
            }}
          />
          <TextField.Description>
            Redeem your gift card at checkout
          </TextField.Description>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TEXT_FIELD_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-text-field',
    label: 'Basic TextField',
    content: <BasicTextFieldContent />,
  },
  {
    value: 'text-field-with-icons',
    label: 'TextField with icons',
    content: <TextFieldWithIconsContent />,
  },
  {
    value: 'disabled-text-field',
    label: 'Disabled TextField',
    content: <DisabledTextFieldContent />,
  },
  {
    value: 'multiline-text-field',
    label: 'Multiline TextField',
    content: <MultilineTextFieldContent />,
  },
  {
    value: 'text-field-with-validation',
    label: 'TextField with validation',
    content: <TextFieldWithValidationContent />,
  },
  {
    value: 'text-field-with-custom-styles',
    label: 'TextField with custom styles',
    content: <TextFieldWithCustomStylesContent />,
  },
];

export default function TextFieldScreen() {
  return <UsageVariantFlatList data={TEXT_FIELD_VARIANTS} />;
}
