import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { Description, Input, Label, TextField } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const BasicContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <TextField>
        <Label>{t`Email address`}</Label>
        <Input
          placeholder={t`Enter your email`}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Description nativeID="email-desc">
          {t`We'll never share your email with anyone else.`}
        </Description>
      </TextField>
      <TextField>
        <Label>{t`Password`}</Label>
        <Input placeholder={t`Create a password`} secureTextEntry />
        <Description nativeID="password-desc">
          {t`Use at least 8 characters with a mix of letters, numbers, and symbols.`}
        </Description>
      </TextField>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DESCRIPTION_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: msg`Basic`,
    content: <BasicContent />,
  },
];

export default function DescriptionScreen() {
  return <UsageVariantFlatList data={DESCRIPTION_VARIANTS} />;
}
