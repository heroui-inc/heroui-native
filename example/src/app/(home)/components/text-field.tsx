import { Ionicons } from '@expo/vector-icons';
import { Button, TextField, useTheme } from 'heroui-native';
import { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function TextFieldScreen() {
  const { colors, isDark } = useTheme();

  const [isTestFieldInvalid, setIsTestFieldInvalid] = useState(false);
  const [testFieldValue, setTestFieldValue] = useState('');

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1 bg-background">
      <ScreenScrollView
        contentContainerClassName="gap-16"
        keyboardShouldPersistTaps="handled"
      >
        <SectionTitle title="Basic TextField" />
        <TextField>
          <TextField.Input placeholder="No label, just input" />
        </TextField>

        <SectionTitle title="TextField with Label and Description" />
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

        <SectionTitle title="Non-required field (no asterisk)" />
        <TextField>
          <TextField.Label>Company Name</TextField.Label>
          <TextField.Input placeholder="Optional field" />
          <TextField.Description>
            This field is optional - no asterisk shown
          </TextField.Description>
        </TextField>

        <SectionTitle title="TextField with Icons" />
        <TextField isRequired>
          <TextField.Label>Password</TextField.Label>
          <TextField.Input placeholder="Enter your password" secureTextEntry>
            <TextField.InputStartContent className="pointer-events-none">
              <Ionicons
                name="lock-closed-outline"
                size={16}
                color={colors.mutedForeground}
              />
            </TextField.InputStartContent>
            <TextField.InputEndContent className="pointer-events-none">
              <Ionicons
                name="eye-outline"
                size={16}
                color={colors.mutedForeground}
              />
            </TextField.InputEndContent>
          </TextField.Input>
        </TextField>

        <SectionTitle title="Disabled TextField" />
        <TextField isDisabled>
          <TextField.Label>Disabled Field</TextField.Label>
          <TextField.Input
            placeholder="This field is disabled"
            value="Cannot edit this"
          />
        </TextField>

        <SectionTitle title="TextField with multiline" />
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

        <SectionTitle title="TextField with custom styles" />
        <TextField>
          <TextField.Label>Custom Styled</TextField.Label>
          <TextField.Input
            placeholder="Custom colors"
            className="border-[2px]"
            colors={{
              blurBorder: isDark ? '#2563eb' : '#2563eb',
              focusBorder: isDark ? '#2563eb' : '#2563eb',
              blurBackground: isDark ? '#172554' : '#eff6ff',
              focusBackground: isDark ? '#172554' : '#eff6ff',
            }}
          />
        </TextField>

        <SectionTitle title="TestField With Validation State" />
        <View className="gap-8">
          <TextField isRequired isInvalid={isTestFieldInvalid}>
            <TextField.Label>Test Animation Transitions</TextField.Label>
            <TextField.Input
              placeholder="Type to see animations"
              value={testFieldValue}
              onChangeText={setTestFieldValue}
            />
            <TextField.Description>
              Click the button below to toggle valid/invalid state
            </TextField.Description>
            <TextField.ErrorMessage>
              This field has validation errors
            </TextField.ErrorMessage>
          </TextField>
          <Button
            onPress={() => setIsTestFieldInvalid(!isTestFieldInvalid)}
            variant="tertiary"
            size="sm"
            className="self-start"
          >
            {isTestFieldInvalid ? 'Make Valid' : 'Make Invalid'}
          </Button>
        </View>
      </ScreenScrollView>
    </KeyboardAvoidingView>
  );
}
