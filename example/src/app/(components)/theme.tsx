import { Ionicons } from '@expo/vector-icons';
import { TextField, useTheme } from 'heroui-native';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function Theme() {
  const { colors } = useTheme();
  const [email, setEmail] = React.useState('');
  const isInvalidEmail =
    email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="gap-6">
        <TextField isRequired isInvalid={isInvalidEmail}>
          <TextField.Label>Email Address</TextField.Label>
          <TextField.Input
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          >
            <TextField.InputStartContent>
              <Ionicons
                name="mail-outline"
                size={16}
                color={colors.mutedForeground}
              />
            </TextField.InputStartContent>
          </TextField.Input>
          <TextField.Description>
            We'll send a confirmation to this email
          </TextField.Description>
          <TextField.ErrorMessage>
            Please enter a valid email address
          </TextField.ErrorMessage>
        </TextField>

        <TextField isRequired>
          <TextField.Label>Password</TextField.Label>
          <TextField.Input placeholder="Enter password" secureTextEntry>
            <TextField.InputStartContent>
              <Ionicons
                name="lock-closed-outline"
                size={16}
                color={colors.mutedForeground}
              />
            </TextField.InputStartContent>
            <TextField.InputEndContent>
              <Ionicons
                name="eye-outline"
                size={16}
                color={colors.mutedForeground}
              />
            </TextField.InputEndContent>
          </TextField.Input>
        </TextField>

        <TextField>
          <TextField.Label>Bio</TextField.Label>
          <TextField.Input
            placeholder="Tell us about yourself..."
            multiline
            numberOfLines={4}
          />
          <TextField.Description>
            Brief description for your profile
          </TextField.Description>
        </TextField>
      </View>
    </ScrollView>
  );
}
