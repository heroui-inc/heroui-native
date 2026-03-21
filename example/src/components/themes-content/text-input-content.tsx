import {
  Button,
  Description,
  FieldError,
  Input,
  Label,
  TextField,
} from 'heroui-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { EyeIcon } from '../icons/eye';
import { EyeSlashIcon } from '../icons/eye-slash';
import { LockIcon } from '../icons/lock';
import { DialogContent } from './dialog-content';

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
        <Label>Email</Label>
        <Input
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError(false);
          }}
        />
        <Description hideOnInvalid>
          We'll never share your email with anyone else.
        </Description>
        <FieldError>Please enter a valid email address</FieldError>
      </TextField>

      {/* TextField with Icons */}
      <TextField isRequired isInvalid={passwordError} className="mb-8">
        <Label>New password</Label>
        <View className="w-full flex-row items-center">
          <Input
            className="flex-1 px-10"
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError(false);
            }}
          />
          <View className="absolute left-3.5" pointerEvents="none">
            <LockIcon size={16} colorClassName="accent-field-placeholder" />
          </View>
          <Pressable
            className="absolute right-4"
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
        <Description hideOnInvalid>
          Password must be at least 6 characters
        </Description>
        <FieldError>Password must be at least 6 characters long</FieldError>
      </TextField>

      {/* Submit Button */}
      <Button variant="primary" onPress={handleSubmit}>
        Update
      </Button>

      <DialogContent />
    </View>
  );
};
