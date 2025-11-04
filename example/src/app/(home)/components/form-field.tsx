import {
  Checkbox,
  Divider,
  FormField,
  Surface,
  Switch,
  useThemeColor,
} from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
interface SwitchFieldProps {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
  title: string;
  description: string;
}

const SwitchField: React.FC<SwitchFieldProps> = ({
  isSelected,
  onSelectedChange,
  title,
  description,
}) => (
  <FormField isSelected={isSelected} onSelectedChange={onSelectedChange}>
    <FormField.Content>
      <FormField.Title>{title}</FormField.Title>
      <FormField.Description>{description}</FormField.Description>
    </FormField.Content>
    <FormField.Indicator>
      <Switch />
    </FormField.Indicator>
  </FormField>
);

const SwitchFormFieldSetContent = () => {
  const [fields, setFields] = React.useState({
    notifications: false,
    darkMode: false,
    autoUpdate: true,
  });

  const fieldConfigs: Record<
    keyof typeof fields,
    { title: string; description: string }
  > = {
    notifications: {
      title: 'Enable notifications',
      description: 'Receive push notifications about your account activity',
    },
    darkMode: {
      title: 'Dark mode',
      description: 'Switch between light and dark theme',
    },
    autoUpdate: {
      title: 'Auto-update',
      description: 'Automatically download and install updates',
    },
  };

  const handleFieldChange = (key: keyof typeof fields) => (value: boolean) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const fieldKeys = Object.keys(fields) as Array<keyof typeof fields>;

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Surface className="py-5 w-full">
        {fieldKeys.map((key, index) => (
          <React.Fragment key={key}>
            {index > 0 && <Divider className="my-4" />}
            <SwitchField
              isSelected={fields[key]}
              onSelectedChange={handleFieldChange(key)}
              title={fieldConfigs[key].title}
              description={fieldConfigs[key].description}
            />
          </React.Fragment>
        ))}
      </Surface>
    </View>
  );
};

// ------------------------------------------------------------------------------
interface CheckboxFieldProps {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
  title: string;
  description: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  isSelected,
  onSelectedChange,
  title,
  description,
}) => {
  const themeColorSurfaceTertiary = useThemeColor('surface-tertiary');

  return (
    <FormField
      isSelected={isSelected}
      onSelectedChange={onSelectedChange}
      alignIndicator="start"
      className="items-start"
    >
      <FormField.Indicator>
        <Checkbox
          className="size-5 rounded-md mt-0.5"
          animatedColors={{
            backgroundColor: { default: themeColorSurfaceTertiary },
          }}
        />
      </FormField.Indicator>
      <FormField.Content>
        <FormField.Title>{title}</FormField.Title>
        <FormField.Description>{description}</FormField.Description>
      </FormField.Content>
    </FormField>
  );
};

const CheckboxFormFieldSetContent = () => {
  const [fields, setFields] = React.useState({
    newsletter: true,
    marketing: false,
    terms: false,
  });

  const fieldConfigs: Record<
    keyof typeof fields,
    { title: string; description: string }
  > = {
    newsletter: {
      title: 'Subscribe to newsletter',
      description: 'Get weekly updates about new features and tips',
    },
    marketing: {
      title: 'Marketing communications',
      description: 'Receive promotional emails and special offers',
    },
    terms: {
      title: 'Accept terms and conditions',
      description: 'Agree to our Terms of Service and Privacy Policy',
    },
  };

  const handleFieldChange = (key: keyof typeof fields) => (value: boolean) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const fieldKeys = Object.keys(fields) as Array<keyof typeof fields>;

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Surface className="py-5 w-full">
        {fieldKeys.map((key, index) => (
          <React.Fragment key={key}>
            {index > 0 && <Divider className="my-4" />}
            <CheckboxField
              isSelected={fields[key]}
              onSelectedChange={handleFieldChange(key)}
              title={fieldConfigs[key].title}
              description={fieldConfigs[key].description}
            />
          </React.Fragment>
        ))}
      </Surface>
    </View>
  );
};

// ------------------------------------------------------------------------------
interface InlineFilterProps {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
  label: string;
}

const InlineFilter: React.FC<InlineFilterProps> = ({
  isSelected,
  onSelectedChange,
  label,
}) => (
  <FormField
    isSelected={isSelected}
    onSelectedChange={onSelectedChange}
    isInline
    alignIndicator="start"
    className="gap-2"
  >
    <FormField.Indicator>
      <Checkbox className="size-5 rounded-md" />
    </FormField.Indicator>
    <FormField.Content>
      <FormField.Title>{label}</FormField.Title>
    </FormField.Content>
  </FormField>
);

const InlineLayoutCompactContent = () => {
  const [filters, setFilters] = React.useState({
    freeShipping: true,
    inStock: false,
    onSale: true,
    newArrivals: false,
    featured: false,
    topRated: false,
    clearance: false,
    bestSeller: true,
  });

  const filterLabels: Record<keyof typeof filters, string> = {
    freeShipping: 'Free Shipping',
    inStock: 'In Stock',
    onSale: 'On Sale',
    newArrivals: 'New Arrivals',
    featured: 'Featured',
    topRated: 'Top Rated',
    clearance: 'Clearance',
    bestSeller: 'Best Seller',
  };

  const handleFilterChange =
    (key: keyof typeof filters) => (value: boolean) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="flex-row flex-wrap gap-4 w-full">
        {(Object.keys(filters) as Array<keyof typeof filters>).map((key) => (
          <InlineFilter
            key={key}
            isSelected={filters[key]}
            onSelectedChange={handleFilterChange(key)}
            label={filterLabels[key]}
          />
        ))}
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledStateContent = () => {
  const [activeSwitch, setActiveSwitch] = React.useState(true);
  const [disabledSwitch, setDisabledSwitch] = React.useState(true);

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-8 w-full">
        <FormField isSelected={activeSwitch} onSelectedChange={setActiveSwitch}>
          <FormField.Content>
            <FormField.Title>Two-factor authentication</FormField.Title>
            <FormField.Description>
              Add an extra layer of security to your account
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>

        <FormField
          isSelected={disabledSwitch}
          onSelectedChange={setDisabledSwitch}
          isDisabled
        >
          <FormField.Content>
            <FormField.Title>Biometric authentication</FormField.Title>
            <FormField.Description>
              Requires device with fingerprint or face recognition support
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ValidationErrorStatesContent = () => {
  const [terms, setTerms] = React.useState(false);
  const [privacyAccepted, setPrivacyAccepted] = React.useState(false);
  const [dataSharing, setDataSharing] = React.useState(false);

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Animated.View
        className="gap-8 w-full h-[350px]"
        layout={LinearTransition}
      >
        <Animated.View layout={LinearTransition}>
          <FormField
            isSelected={terms}
            onSelectedChange={setTerms}
            isInvalid={!terms}
          >
            <FormField.Content>
              <FormField.Title>
                I agree to the terms and conditions
              </FormField.Title>
              <FormField.Description>
                By checking this box, you agree to our Terms of Service and
                Privacy Policy
              </FormField.Description>
            </FormField.Content>
            <FormField.Indicator>
              <Checkbox />
            </FormField.Indicator>
            <FormField.ErrorMessage>
              You must accept the terms to continue
            </FormField.ErrorMessage>
          </FormField>
        </Animated.View>

        <Animated.View layout={LinearTransition}>
          <FormField
            isSelected={privacyAccepted}
            onSelectedChange={setPrivacyAccepted}
            isInvalid={!privacyAccepted}
          >
            <FormField.Content>
              <FormField.Title>Accept Privacy Policy</FormField.Title>
              <FormField.Description>
                You must accept our privacy policy to create an account
              </FormField.Description>
            </FormField.Content>
            <FormField.Indicator>
              <Checkbox isInvalid={false} />
            </FormField.Indicator>
            <FormField.ErrorMessage>
              Please accept the privacy policy to continue
            </FormField.ErrorMessage>
          </FormField>
        </Animated.View>

        <Animated.View layout={LinearTransition}>
          <FormField
            isSelected={dataSharing}
            onSelectedChange={setDataSharing}
            isInvalid={dataSharing}
          >
            <FormField.Content>
              <FormField.Title>Share usage data</FormField.Title>
              <FormField.Description>
                Help improve our product by sharing anonymous usage data
              </FormField.Description>
            </FormField.Content>
            <FormField.Indicator>
              <Switch />
            </FormField.Indicator>
            <FormField.ErrorMessage>
              Warning: This will share your usage patterns
            </FormField.ErrorMessage>
          </FormField>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const FORM_FIELD_VARIANTS: UsageVariant[] = [
  {
    value: 'switch-form-field-set',
    label: 'Switch FormField set',
    content: <SwitchFormFieldSetContent />,
  },
  {
    value: 'checkbox-form-field-set',
    label: 'Checkbox FormField set',
    content: <CheckboxFormFieldSetContent />,
  },
  {
    value: 'inline-layout-compact',
    label: 'Inline compact layout',
    content: <InlineLayoutCompactContent />,
  },
  {
    value: 'disabled-state',
    label: 'Disabled state',
    content: <DisabledStateContent />,
  },
  {
    value: 'validation-error-states',
    label: 'Validation & error states',
    content: <ValidationErrorStatesContent />,
  },
];

export default function FormFieldScreen() {
  return <UsageVariantFlatList data={FORM_FIELD_VARIANTS} />;
}
