import { FieldError, Input, Label, TextField } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const BasicAndRequiredContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <TextField>
        <Label>Username</Label>
        <Input placeholder="Choose a username" />
      </TextField>
      <TextField>
        <Label isRequired>Password</Label>
        <Input placeholder="Create a password" secureTextEntry />
      </TextField>
    </View>
  );
};

// ------------------------------------------------------------------------------

const InvalidAndDisabledContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <TextField isInvalid>
        <Label>Confirm password</Label>
        <Input
          placeholder="Confirm your password"
          secureTextEntry
          value="different"
          editable={false}
        />
        <FieldError>Passwords do not match</FieldError>
      </TextField>
      <TextField isDisabled>
        <Label>Subscription plan</Label>
        <Input value="Premium" />
      </TextField>
    </View>
  );
};

// ------------------------------------------------------------------------------

const LABEL_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: 'Basic & Required',
    content: <BasicAndRequiredContent />,
  },
  {
    value: 'invalid-disabled',
    label: 'Invalid & Disabled',
    content: <InvalidAndDisabledContent />,
  },
];

export default function LabelScreen() {
  return <UsageVariantFlatList data={LABEL_VARIANTS} />;
}
