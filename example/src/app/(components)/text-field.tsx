import { Ionicons } from '@expo/vector-icons';
import { Button, TextField, useTheme } from 'heroui-native';
import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';

export default function TextFieldScreen() {
  const { colors, isDark } = useTheme();
  const [email, setEmail] = useState('');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // State for animation testing
  const [isTestFieldValid, setIsTestFieldValid] = useState(true);
  const [testFieldValue, setTestFieldValue] = useState('');

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView
        className="bg-background"
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-8 p-6">
          {/* Animation Test Field */}
          <View className="gap-3">
            <TextField isRequired isValid={isTestFieldValid}>
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
              onPress={() => setIsTestFieldValid(!isTestFieldValid)}
              variant="tertiary"
              size="sm"
              fullWidth={false}
            >
              <Button.Label>
                {isTestFieldValid ? 'Make Invalid' : 'Make Valid'}
              </Button.Label>
            </Button>
          </View>

          {/* Basic TextField */}
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

          {/* TextField with Icons */}
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

          {/* Optional TextField */}
          <TextField>
            <TextField.Label>Optional Field</TextField.Label>
            <TextField.Input placeholder="This field is optional" />
          </TextField>

          {/* Disabled TextField */}
          <TextField isDisabled>
            <TextField.Label>Disabled Field</TextField.Label>
            <TextField.Input
              placeholder="This field is disabled"
              value="Cannot edit this"
            />
          </TextField>

          {/* TextField with only Input */}
          <TextField>
            <TextField.Input placeholder="No label, just input" />
          </TextField>

          {/* Non-required field (no asterisk) */}
          <TextField>
            <TextField.Label>Company Name</TextField.Label>
            <TextField.Input placeholder="Optional field" />
            <TextField.Description>
              This field is optional - no asterisk shown
            </TextField.Description>
          </TextField>

          {/* TextField with multiline */}
          <TextField>
            <TextField.Label>Message</TextField.Label>
            <TextField.Input
              placeholder="Type your message here..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <TextField.Description>
              Maximum 500 characters
            </TextField.Description>
          </TextField>

          {/* TextField with custom styles */}
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

          {/* TextField with search icon */}
          <TextField>
            <TextField.Label>Search</TextField.Label>
            <TextField.Input placeholder="Search...">
              <TextField.InputStartContent>
                <Ionicons
                  name="search-outline"
                  size={16}
                  color={colors.mutedForeground}
                />
              </TextField.InputStartContent>
            </TextField.Input>
          </TextField>

          {/* TextField with validation */}
          <TextField isRequired isValid={email === '' || isValidEmail}>
            <TextField.Label>Email with Validation</TextField.Label>
            <TextField.Input
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextField.Description>
              We'll send a confirmation to this email
            </TextField.Description>
            <TextField.ErrorMessage>
              Please enter a valid email address
            </TextField.ErrorMessage>
          </TextField>

          {/* TextField with custom error */}
          <TextField isRequired isValid={false}>
            <TextField.Label>Required Field</TextField.Label>
            <TextField.Input placeholder="This field has an error" />
            <TextField.ErrorMessage>
              Please enter a valid email address
            </TextField.ErrorMessage>
          </TextField>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
