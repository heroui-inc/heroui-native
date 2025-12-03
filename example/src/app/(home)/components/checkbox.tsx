import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Checkbox, Divider, FormField, Surface } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  type SharedValue,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const AnimatedView = Animated.createAnimatedComponent(View);
const StyleAnimatedView = withUniwind(Animated.View);
const StyledIonicons = withUniwind(Ionicons);
const StyledFontAwesome = withUniwind(FontAwesome);

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
    <FormField
      isSelected={isSelected}
      onSelectedChange={onSelectedChange}
      className="items-start"
    >
      <FormField.Indicator>
        <Checkbox className="mt-0.5" />
      </FormField.Indicator>
      <View className="flex-1">
        <FormField.Label className="text-lg">{title}</FormField.Label>
        <FormField.Description className="text-base">
          {description}
        </FormField.Description>
      </View>
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

const AnimatedCustomIndicator = ({
  isSelected,
  isPressed,
}: {
  isSelected: boolean | undefined;
  isPressed: SharedValue<boolean>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(isPressed.get() ? 0 : 3, { duration: 100 }),
      left: withTiming(isPressed.get() ? 0 : 3, { duration: 100 }),
      right: withTiming(isPressed.get() ? 0 : -3, { duration: 100 }),
      bottom: withTiming(isPressed.get() ? 0 : -3, { duration: 100 }),
    };
  });

  return (
    <StyleAnimatedView
      className="aspect-square items-center justify-center bg-pink-400 rounded-sm"
      style={animatedStyle}
    >
      {isSelected ? (
        <Animated.View
          key="selected"
          entering={ZoomIn.withInitialValues({ scale: 0.5 })}
        >
          <StyledFontAwesome
            name="check"
            size={14}
            className="text-white mb-[1px]"
          />
        </Animated.View>
      ) : (
        <Animated.View
          key="unselected"
          entering={ZoomIn.withInitialValues({ scale: 0.5 })}
        >
          <StyledFontAwesome
            name="times"
            size={16}
            className="text-white mb-0.5"
          />
        </Animated.View>
      )}
    </StyleAnimatedView>
  );
};

const CustomStylesContent = () => {
  const [customBackground, setCustomBackground] = React.useState(true);
  const [customIndicator, setCustomIndicator] = React.useState(true);
  const [customBoth, setCustomBoth] = React.useState(true);

  const isPressed = useSharedValue(false);

  const handlePressIn = () => {
    isPressed.set(true);
  };

  const handlePressOut = () => {
    isPressed.set(false);
  };

  return (
    <View className="flex-1 px-5 items-center justify-center gap-12">
      <Checkbox
        isSelected={customIndicator}
        onSelectedChange={setCustomIndicator}
        className="size-6 rounded-full bg-yellow-400 overflow-visible"
      >
        <Checkbox.Indicator
          className="bg-transparent"
          animation={{
            translateX: { value: [-3, 3] },
          }}
          style={{ transform: [{ translateY: -2 }] }}
          iconProps={{
            size: 32,
            strokeWidth: 1.5,
            color: 'blue',
            enterDuration: 350,
            exitDuration: 200,
          }}
        />
      </Checkbox>

      <Checkbox
        isSelected={customBackground}
        onSelectedChange={setCustomBackground}
        className="size-8 rounded-sm bg-indigo-800 overflow-visible"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        animation="disabled"
      >
        {({ isSelected }) => (
          <AnimatedCustomIndicator
            isSelected={isSelected}
            isPressed={isPressed}
          />
        )}
      </Checkbox>

      <Checkbox
        isSelected={customBoth}
        onSelectedChange={setCustomBoth}
        className="size-12 rounded-full bg-slate-200"
      >
        {({ isSelected }) => {
          return isSelected ? (
            <AnimatedView
              key="sunny"
              entering={FadeInLeft.springify()}
              className="absolute inset-0 items-center justify-center rounded-full bg-slate-200"
            >
              <Animated.View entering={ZoomIn.springify()}>
                <StyledIonicons
                  name="sunny"
                  size={24}
                  className="text-slate-800"
                />
              </Animated.View>
            </AnimatedView>
          ) : (
            <AnimatedView
              key="moon"
              entering={FadeInRight.springify()}
              className="absolute inset-0 items-center justify-center rounded-full bg-slate-800"
            >
              <Animated.View entering={ZoomIn.springify()}>
                <StyledIonicons
                  name="moon"
                  size={20}
                  className="text-slate-200"
                />
              </Animated.View>
            </AnimatedView>
          );
        }}
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
