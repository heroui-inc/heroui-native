import {
  Checkbox,
  ControlField,
  Description,
  FieldError,
  Label,
  Separator,
  Surface,
} from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyleAnimatedView = withUniwind(Animated.View);
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
  <ControlField isSelected={isSelected} onSelectedChange={onSelectedChange}>
    <View className="flex-1">
      <Label>{title}</Label>
      <Description>{description}</Description>
    </View>
    <ControlField.Indicator />
  </ControlField>
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
            {index > 0 && <Separator className="my-4" />}
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
  return (
    <ControlField
      isSelected={isSelected}
      onSelectedChange={onSelectedChange}
      className="items-start"
    >
      <ControlField.Indicator>
        <Checkbox className="size-5 rounded-md mt-0.5">
          <Checkbox.Indicator iconProps={{ size: 16 }} />
        </Checkbox>
      </ControlField.Indicator>
      <View className="flex-1">
        <Label>{title}</Label>
        <Description>{description}</Description>
      </View>
    </ControlField>
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
            {index > 0 && <Separator className="my-4" />}
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
  <ControlField
    isSelected={isSelected}
    onSelectedChange={onSelectedChange}
    className="gap-2"
  >
    <ControlField.Indicator>
      <Checkbox className="size-5 rounded-md" />
    </ControlField.Indicator>
    <Label>{label}</Label>
  </ControlField>
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
        <ControlField
          isSelected={activeSwitch}
          onSelectedChange={setActiveSwitch}
        >
          <View className="flex-1">
            <Label>Two-factor authentication</Label>
            <Description>
              Add an extra layer of security to your account
            </Description>
          </View>
          <ControlField.Indicator />
        </ControlField>

        <ControlField
          isSelected={disabledSwitch}
          onSelectedChange={setDisabledSwitch}
          isDisabled
        >
          <View className="flex-1">
            <Label>Biometric authentication</Label>
            <Description>
              Requires device with fingerprint or face recognition support
            </Description>
          </View>
          <ControlField.Indicator />
        </ControlField>
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
      <StyleAnimatedView
        className="gap-8 w-full h-[350px]"
        layout={LinearTransition}
      >
        <Animated.View layout={LinearTransition}>
          <ControlField
            isSelected={terms}
            onSelectedChange={setTerms}
            isInvalid={!terms}
            isRequired
          >
            <View className="flex-1">
              <Label>I agree to the terms and conditions</Label>
              <Description isInvalid={false}>
                By checking this box, you agree to our Terms of Service and
                Privacy Policy
              </Description>
            </View>
            <ControlField.Indicator variant="checkbox" />
          </ControlField>
        </Animated.View>

        <Animated.View layout={LinearTransition}>
          <ControlField
            isSelected={privacyAccepted}
            onSelectedChange={setPrivacyAccepted}
            isInvalid={!privacyAccepted}
          >
            <View className="flex-1">
              <Label isInvalid={false}>Accept Privacy Policy</Label>
              <Description hideOnInvalid>
                The privacy policy has been accepted
              </Description>
              <FieldError>
                Please accept the privacy policy to continue
              </FieldError>
            </View>
            <ControlField.Indicator>
              <Checkbox isInvalid={false} />
            </ControlField.Indicator>
          </ControlField>
        </Animated.View>

        <Animated.View layout={LinearTransition}>
          <ControlField
            isSelected={dataSharing}
            onSelectedChange={setDataSharing}
            isInvalid={dataSharing}
            className="flex-col items-start gap-1"
          >
            <View className="flex-row items-center gap-2">
              <View className="flex-1">
                <Label isInvalid={false}>Share usage data</Label>
                <Description isInvalid={false}>
                  Help improve our product by sharing anonymous usage data and
                  improving our products.
                </Description>
              </View>
              <ControlField.Indicator />
            </View>
            <FieldError>
              Warning: This will share your usage patterns
            </FieldError>
          </ControlField>
        </Animated.View>
      </StyleAnimatedView>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CONTROL_FIELD_VARIANTS: UsageVariant[] = [
  {
    value: 'switch-control-field-set',
    label: 'Switch ControlField set',
    content: <SwitchFormFieldSetContent />,
  },
  {
    value: 'checkbox-control-field-set',
    label: 'Checkbox ControlField set',
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

export default function ControlFieldScreen() {
  return <UsageVariantFlatList data={CONTROL_FIELD_VARIANTS} />;
}
