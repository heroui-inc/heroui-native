import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { FieldError, Input, Label, TextField } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const BasicAndRequiredContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <TextField>
        <Label>{t`Username`}</Label>
        <Input placeholder={t`Choose a username`} />
      </TextField>
      <TextField>
        <Label isRequired>{t`Password`}</Label>
        <Input placeholder={t`Create a password`} secureTextEntry />
      </TextField>
    </View>
  );
};

// ------------------------------------------------------------------------------

const InvalidAndDisabledContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <TextField isInvalid>
        <Label>{t`Confirm password`}</Label>
        <Input
          placeholder={t`Confirm your password`}
          secureTextEntry
          value="different"
          editable={false}
        />
        <FieldError>{t`Passwords do not match`}</FieldError>
      </TextField>
      <TextField isDisabled>
        <Label>{t`Subscription plan`}</Label>
        <Input value={t`Premium`} />
      </TextField>
    </View>
  );
};

// ------------------------------------------------------------------------------

const LABEL_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: msg`Basic & Required`,
    content: <BasicAndRequiredContent />,
  },
  {
    value: 'invalid-disabled',
    label: msg`Invalid & Disabled`,
    content: <InvalidAndDisabledContent />,
  },
];

export default function LabelScreen() {
  return <UsageVariantFlatList data={LABEL_VARIANTS} />;
}
