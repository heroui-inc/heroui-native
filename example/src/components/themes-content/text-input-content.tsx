import { Ionicons } from '@expo/vector-icons';
import { Button, TextField } from 'heroui-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { DialogContent } from './dialog-content';

const StyledIonicons = withUniwind(Ionicons);

export const TextInputContent = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 6;

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      // Form is valid
      console.log('Form submitted successfully');
    }
  };

  return (
    <View className="gap-4">
      {/* Basic TextField */}
      <TextField isRequired isInvalid={emailError}>
        <TextField.Label>Email</TextField.Label>
        <TextField.Input
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError(false);
          }}
        />
        <TextField.Description>
          We'll never share your email with anyone else.
        </TextField.Description>
        <TextField.ErrorMessage>
          Please enter a valid email address
        </TextField.ErrorMessage>
      </TextField>

      {/* TextField with Icons */}
      <TextField isRequired isInvalid={passwordError} className="mb-8">
        <TextField.Label>New password</TextField.Label>
        <TextField.Input
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (passwordError) setPasswordError(false);
          }}
        >
          <TextField.InputStartContent className="pointer-events-none">
            <StyledIonicons
              name="lock-closed-outline"
              size={16}
              className="text-muted"
            />
          </TextField.InputStartContent>
          <TextField.InputEndContent>
            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <StyledIonicons
                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={16}
                className="text-muted"
              />
            </Pressable>
          </TextField.InputEndContent>
        </TextField.Input>
        <TextField.Description>
          Password must be at least 6 characters
        </TextField.Description>
        <TextField.ErrorMessage>
          Password must be at least 6 characters long
        </TextField.ErrorMessage>
      </TextField>

      {/* Submit Button */}
      <Button variant="primary" onPress={handleSubmit}>
        Update
      </Button>

      <DialogContent />
    </View>
  );
};
