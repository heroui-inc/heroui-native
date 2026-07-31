import { useLingui } from '@lingui/react/macro';
import { ControlField, Description, Label } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';

interface CheckboxFieldProps {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
  label: string;
  description: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  isSelected,
  onSelectedChange,
  label,
  description,
}) => (
  <ControlField
    isSelected={isSelected}
    onSelectedChange={onSelectedChange}
    className="gap-3"
  >
    <ControlField.Indicator variant="checkbox" />
    <View className="flex-1">
      <Label>{label}</Label>
      <Description>{description}</Description>
    </View>
  </ControlField>
);

export const CheckboxContent = () => {
  const { t } = useLingui();
  const [marketingEmails, setMarketingEmails] = React.useState(true);
  const [productUpdates, setProductUpdates] = React.useState(false);

  return (
    <View className="gap-4 px-4">
      <CheckboxField
        isSelected={marketingEmails}
        onSelectedChange={setMarketingEmails}
        label={t`Marketing & Promotions`}
        description={t`Special offers and exclusive deals`}
      />
      <CheckboxField
        isSelected={productUpdates}
        onSelectedChange={setProductUpdates}
        label={t`Product Updates`}
        description={t`New features and improvements`}
      />
    </View>
  );
};
