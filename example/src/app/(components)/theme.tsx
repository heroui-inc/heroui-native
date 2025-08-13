import { ErrorField, TextField } from 'heroui-native';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function Theme() {
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleBlur = () => {
    setShowError(email !== '' && !isValidEmail);
  };

  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="p-4">
        <TextField>
          <TextField.Label>Email Address</TextField.Label>
          <TextField.Input
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            onBlur={handleBlur}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextField.Description>
            We'll use this to contact you
          </TextField.Description>
        </TextField>

        <ErrorField isValid={!showError} className="ml-1">
          Please enter a valid email address
        </ErrorField>
      </View>
    </ScrollView>
  );
}
