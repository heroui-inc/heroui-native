import { Checkbox, FormField } from 'heroui-native';
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
  <FormField
    isSelected={isSelected}
    onSelectedChange={onSelectedChange}
    alignIndicator="start"
    className="gap-3"
  >
    <FormField.Indicator>
      <Checkbox />
    </FormField.Indicator>
    <FormField.Content>
      <FormField.Title>{label}</FormField.Title>
      <FormField.Description>{description}</FormField.Description>
    </FormField.Content>
  </FormField>
);

export const CheckboxContent = () => {
  const [marketingEmails, setMarketingEmails] = React.useState(true);
  const [productUpdates, setProductUpdates] = React.useState(false);

  return (
    <View className="gap-4 px-4">
      <CheckboxField
        isSelected={marketingEmails}
        onSelectedChange={setMarketingEmails}
        label="Marketing & Promotions"
        description="Special offers and exclusive deals"
      />
      <CheckboxField
        isSelected={productUpdates}
        onSelectedChange={setProductUpdates}
        label="Product Updates"
        description="New features and improvements"
      />
    </View>
  );
};
