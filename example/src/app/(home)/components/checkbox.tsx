import { Ionicons } from '@expo/vector-icons';
import {
  Checkbox,
  cn,
  Divider,
  FormField,
  Surface,
  useThemeColor,
} from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOutDown,
  useAnimatedStyle,
  withTiming,
  ZoomIn,
  ZoomInDown,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const AnimatedView = Animated.createAnimatedComponent(View);
const StyledIonicons = withUniwind(Ionicons);

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
          className="mt-0.5"
          animatedColors={{
            backgroundColor: { default: themeColorSurfaceTertiary },
          }}
        />
      </FormField.Indicator>
      <FormField.Content>
        <FormField.Title className="text-lg">{title}</FormField.Title>
        <FormField.Description className="text-base">
          {description}
        </FormField.Description>
      </FormField.Content>
    </FormField>
  );
};

const BasicUsage = () => {
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

const StatesContent = () => {
  const [defaultState, setDefaultState] = React.useState(true);
  const [invalid, setInvalid] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row gap-8">
        <View className="items-center gap-2">
          <Checkbox
            isSelected={defaultState}
            onSelectedChange={setDefaultState}
          />
          <AppText className="text-xs text-muted">Default</AppText>
        </View>
        <View className="items-center gap-2">
          <Checkbox
            isSelected={invalid}
            onSelectedChange={setInvalid}
            isInvalid
          />
          <AppText className="text-xs text-muted">Invalid</AppText>
        </View>
        <View className="items-center gap-2">
          <Checkbox
            isSelected={disabled}
            onSelectedChange={setDisabled}
            isDisabled
          />
          <AppText className="text-xs text-muted">Disabled</AppText>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomStylesContent = () => {
  const [customBackground, setCustomBackground] = React.useState(true);
  const [customIndicator, setCustomIndicator] = React.useState(true);
  const [customBoth, setCustomBoth] = React.useState(true);

  const themeColorBackground = useThemeColor('background');

  const rThemeToggleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(customBoth ? 24.5 : -24.5, {
            duration: 200,
            easing: Easing.out(Easing.ease),
          }),
        },
      ],
    };
  }, [customBoth]);

  return (
    <View className="flex-1 px-5 items-center justify-center gap-12">
      <Checkbox
        isSelected={customIndicator}
        onSelectedChange={setCustomIndicator}
      >
        {({ isSelected }) => {
          return isSelected ? (
            <Animated.View key="selected" entering={ZoomIn}>
              <StyledIonicons
                name="remove"
                size={16}
                className="text-accent-foreground"
              />
            </Animated.View>
          ) : (
            <Animated.View
              key="default-1"
              entering={ZoomInDown.springify().damping(130).stiffness(1300)}
            >
              <Animated.View key="default-2" entering={ZoomIn.duration(175)}>
                <StyledIonicons name="add" size={18} className="text-accent" />
              </Animated.View>
            </Animated.View>
          );
        }}
      </Checkbox>

      <Checkbox
        isSelected={customBackground}
        onSelectedChange={setCustomBackground}
        className="size-8 rounded-xl"
        animatedColors={{
          backgroundColor: {
            selected: '#3730a3',
          },
        }}
      >
        <View className="absolute inset-0 bg-indigo-300 rounded-xl" />
        {customBackground && (
          <AnimatedView
            key="unselected"
            entering={FadeInDown.duration(150).easing(Easing.out(Easing.ease))}
            exiting={FadeOutDown.duration(150).easing(Easing.in(Easing.ease))}
            className="absolute size-12 bg-indigo-700/80 rounded-full"
          />
        )}
        <Checkbox.Indicator iconProps={{ size: 18 }} />
      </Checkbox>

      <Checkbox
        isSelected={customBoth}
        onSelectedChange={setCustomBoth}
        className="w-12 h-12 rounded-full"
        animatedColors={{
          borderColor: {
            default: themeColorBackground,
            selected: themeColorBackground,
          },
        }}
      >
        {({ isSelected }) => (
          <>
            <View
              className={cn(
                'absolute inset-0 bg-slate-200',
                customBoth && 'bg-slate-800'
              )}
            />
            <AnimatedView
              className="flex-row items-center flex-1"
              style={rThemeToggleStyle}
            >
              {isSelected ? (
                <>
                  <AnimatedView
                    key="selected"
                    entering={FadeIn}
                    className="size-14 bg-slate-200 rounded-full"
                  />
                  <View className="size-14" />
                </>
              ) : (
                <>
                  <View className="size-14" />
                  <AnimatedView
                    key="unselected"
                    entering={FadeIn}
                    className="size-14 bg-slate-800 rounded-full"
                  />
                </>
              )}
            </AnimatedView>
            <Checkbox.Indicator className="z-50">
              {isSelected ? (
                <AnimatedView key="check" entering={FadeInLeft.springify()}>
                  <Animated.View entering={ZoomIn.springify()}>
                    <StyledIonicons
                      name="sunny"
                      size={24}
                      className="text-slate-800"
                    />
                  </Animated.View>
                </AnimatedView>
              ) : (
                <AnimatedView key="x" entering={FadeInRight.springify()}>
                  <Animated.View entering={ZoomIn.springify()}>
                    <StyledIonicons
                      name="moon"
                      size={20}
                      className="text-slate-200"
                    />
                  </Animated.View>
                </AnimatedView>
              )}
            </Checkbox.Indicator>
          </>
        )}
      </Checkbox>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CHECKBOX_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-usage',
    label: 'Basic usage',
    content: <BasicUsage />,
  },
  {
    value: 'states',
    label: 'States',
    content: <StatesContent />,
  },
  {
    value: 'custom-styles',
    label: 'Custom styles',
    content: <CustomStylesContent />,
  },
];

export default function CheckboxScreen() {
  return <UsageVariantFlatList data={CHECKBOX_VARIANTS} />;
}
