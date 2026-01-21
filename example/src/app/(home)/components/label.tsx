import { Label, TextField } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const BasicAndRequiredContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <TextField>
        <Label className="ml-1">Username</Label>
        <TextField.Input placeholder="Choose a username" />
      </TextField>
      <TextField>
        <Label isRequired className="ml-1">
          Password
        </Label>
        <TextField.Input placeholder="Create a password" secureTextEntry />
      </TextField>
    </View>
  );
};

// ------------------------------------------------------------------------------

const InvalidAndDisabledContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <TextField isInvalid>
        <Label isInvalid className="ml-1">
          Confirm password
        </Label>
        <TextField.Input
          placeholder="Confirm your password"
          secureTextEntry
          value="different"
          editable={false}
        />
        <TextField.ErrorMessage className="ml-0.5">
          Passwords do not match
        </TextField.ErrorMessage>
      </TextField>
      <TextField isDisabled>
        <Label className="ml-1">Subscription plan</Label>
        <TextField.Input value="Premium" />
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
