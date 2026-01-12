import { Description, TextField } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const BasicContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <TextField>
        <TextField.Label>Email address</TextField.Label>
        <TextField.Input
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Description nativeID="email-desc">
          We'll never share your email with anyone else.
        </Description>
      </TextField>
      <TextField>
        <TextField.Label>Password</TextField.Label>
        <TextField.Input placeholder="Create a password" secureTextEntry />
        <Description nativeID="password-desc">
          Use at least 8 characters with a mix of letters, numbers, and symbols.
        </Description>
      </TextField>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DESCRIPTION_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: 'Basic',
    content: <BasicContent />,
  },
];

export default function DescriptionScreen() {
  return <UsageVariantFlatList data={DESCRIPTION_VARIANTS} />;
}
