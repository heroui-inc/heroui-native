import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { cn, RadioGroup, Surface, useTheme } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function RadioGroupScreen() {
  // Basic radio states
  const [basicSelection, setBasicSelection] = React.useState('option1');

  // Color variants
  const [selectedColor, setSelectedColor] = React.useState('default');

  // With descriptions
  const [withDescSelection, setWithDescSelection] = React.useState('desc1');

  // Indicator alignment
  const [alignmentSelection, setAlignmentSelection] = React.useState('end');

  // States
  const [disabledState, setDisabledState] = React.useState('option1');

  // Validation
  const [validationSelection, setValidationSelection] = React.useState('');

  // Custom indicator
  const [customIndicator, setCustomIndicator] = React.useState('custom1');
  const [customThumb, setCustomThumb] = React.useState('icon');

  // Real-world examples
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [shippingSpeed, setShippingSpeed] = React.useState('standard');

  const { colors } = useTheme();

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic RadioGroup" />
      <RadioGroup value={basicSelection} onValueChange={setBasicSelection}>
        <RadioGroup.Item value="option1" color="danger">
          <RadioGroup.Title>Option 1</RadioGroup.Title>
          <RadioGroup.Indicator />
        </RadioGroup.Item>
        <RadioGroup.Item value="option2">
          <RadioGroup.Title>Option 2</RadioGroup.Title>
          <RadioGroup.Indicator />
        </RadioGroup.Item>
        <RadioGroup.Item value="option3">
          <RadioGroup.Title>Option 3</RadioGroup.Title>
          <RadioGroup.Indicator />
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="With Descriptions" />
      <RadioGroup
        value={withDescSelection}
        onValueChange={setWithDescSelection}
      >
        <RadioGroup.Item value="desc1">
          <RadioGroup.Title>Standard Shipping</RadioGroup.Title>
          <RadioGroup.Description>
            Delivered in 5-7 business days
          </RadioGroup.Description>
        </RadioGroup.Item>
        <RadioGroup.Item value="desc2">
          <RadioGroup.Title>Express Shipping</RadioGroup.Title>
          <RadioGroup.Description>
            Delivered in 2-3 business days
          </RadioGroup.Description>
        </RadioGroup.Item>
        <RadioGroup.Item value="desc3">
          <RadioGroup.Title>Overnight Shipping</RadioGroup.Title>
          <RadioGroup.Description>
            Delivered next business day
          </RadioGroup.Description>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Color Variants" />
      <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
        <View className="gap-8">
          <RadioGroup.Item value="default" color="default">
            <RadioGroup.Title>Default Color</RadioGroup.Title>
          </RadioGroup.Item>
          <RadioGroup.Item value="success" color="success">
            <RadioGroup.Title>Success Color</RadioGroup.Title>
          </RadioGroup.Item>
          <RadioGroup.Item value="warning" color="warning">
            <RadioGroup.Title>Warning Color</RadioGroup.Title>
          </RadioGroup.Item>
          <RadioGroup.Item value="danger" color="danger">
            <RadioGroup.Title>Danger Color</RadioGroup.Title>
          </RadioGroup.Item>
        </View>
      </RadioGroup>

      <SectionTitle title="Indicator Alignment" />
      <RadioGroup
        value={alignmentSelection}
        onValueChange={setAlignmentSelection}
        className="gap-8"
      >
        <RadioGroup.Item value="start">
          <RadioGroup.Title>Indicator on Start (Left)</RadioGroup.Title>
          <RadioGroup.Description>
            The radio button appears on the left side
          </RadioGroup.Description>
        </RadioGroup.Item>
        <RadioGroup.Item value="end">
          <RadioGroup.Title>Indicator on End (Right)</RadioGroup.Title>
          <RadioGroup.Description>
            The radio button appears on the right side (default)
          </RadioGroup.Description>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Disabled & Read-Only States" />
      <View className="gap-8">
        <AppText className="text-sm text-muted-foreground">
          Disabled RadioGroup
        </AppText>
        <RadioGroup
          value={disabledState}
          onValueChange={setDisabledState}
          isDisabled
        >
          <RadioGroup.Item value="option1">
            <RadioGroup.Title>Disabled Option 1</RadioGroup.Title>
          </RadioGroup.Item>
          <RadioGroup.Item value="option2">
            <RadioGroup.Title>Disabled Option 2</RadioGroup.Title>
          </RadioGroup.Item>
        </RadioGroup>
      </View>

      <SectionTitle title="Validation & Error States" />
      <RadioGroup
        value={validationSelection}
        onValueChange={setValidationSelection}
        isInvalid={!validationSelection}
      >
        <RadioGroup.Item value="agree">
          <RadioGroup.Title>I agree to the terms</RadioGroup.Title>
          <RadioGroup.Description>
            You must select this option to continue
          </RadioGroup.Description>
        </RadioGroup.Item>
        <RadioGroup.Item value="disagree">
          <RadioGroup.Title>I do not agree</RadioGroup.Title>
        </RadioGroup.Item>
        <RadioGroup.ErrorMessage>
          Please select an option to continue
        </RadioGroup.ErrorMessage>
      </RadioGroup>

      <SectionTitle title="Custom Indicator Background" />
      <RadioGroup value={customIndicator} onValueChange={setCustomIndicator}>
        <RadioGroup.Item value="custom1">
          <RadioGroup.Title>Purple Background</RadioGroup.Title>
          <RadioGroup.Indicator
            className={cn(
              'size-8',
              customIndicator === 'custom1' && 'bg-purple-500 border-purple-600'
            )}
          >
            <RadioGroup.IndicatorThumb
              className="size-3.5"
              colors={{ selectedThumb: '#f3e8ff' }}
            />
          </RadioGroup.Indicator>
        </RadioGroup.Item>

        <RadioGroup.Item value="custom2">
          <RadioGroup.Title>Blue Background</RadioGroup.Title>
          <RadioGroup.Indicator
            className={cn(
              'size-8',
              customIndicator === 'custom2' && 'bg-blue-500 border-blue-600'
            )}
          >
            <RadioGroup.IndicatorThumb
              className="size-3.5"
              colors={{ selectedThumb: '#dbeafe' }}
            />
          </RadioGroup.Indicator>
        </RadioGroup.Item>

        <RadioGroup.Item value="custom3">
          <RadioGroup.Title>Green Background</RadioGroup.Title>
          <RadioGroup.Indicator
            className={cn(
              'size-8',
              customIndicator === 'custom3' &&
                'bg-emerald-500 border-emerald-600'
            )}
          >
            <RadioGroup.IndicatorThumb
              className="size-3.5"
              colors={{ selectedThumb: '#d1fae5' }}
            />
          </RadioGroup.Indicator>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Custom Indicator Thumb" />
      <RadioGroup value={customThumb} onValueChange={setCustomThumb}>
        <RadioGroup.Item value="icon">
          <RadioGroup.Indicator>
            <RadioGroup.IndicatorThumb>
              {customThumb === 'icon' && (
                <AnimatedView entering={FadeIn.duration(200)}>
                  <FontAwesome
                    name="check"
                    size={12}
                    color={colors.accentForeground}
                  />
                </AnimatedView>
              )}
            </RadioGroup.IndicatorThumb>
          </RadioGroup.Indicator>
          <RadioGroup.Title>Checkmark Icon</RadioGroup.Title>
        </RadioGroup.Item>

        <RadioGroup.Item value="zap">
          <RadioGroup.Indicator>
            <RadioGroup.IndicatorThumb>
              {customThumb === 'zap' && (
                <AnimatedView entering={FadeIn.duration(200)}>
                  <Ionicons name="flash" size={12} color={colors.background} />
                </AnimatedView>
              )}
            </RadioGroup.IndicatorThumb>
          </RadioGroup.Indicator>
          <RadioGroup.Title>Lightning Icon</RadioGroup.Title>
        </RadioGroup.Item>

        <RadioGroup.Item value="square">
          <RadioGroup.Indicator>
            <RadioGroup.IndicatorThumb>
              {customThumb === 'square' && (
                <AnimatedView
                  key="square"
                  entering={ZoomIn.springify()}
                  className="h-2.5 w-2.5 bg-accent-foreground"
                />
              )}
            </RadioGroup.IndicatorThumb>
          </RadioGroup.Indicator>
          <RadioGroup.Title>Square Thumb</RadioGroup.Title>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Payment Method Example" />
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <RadioGroup.Item value="card">
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="card-outline" size={16} color={colors.foreground} />
            <RadioGroup.Title>Credit/Debit Card</RadioGroup.Title>
          </View>
          <RadioGroup.Description>
            Pay securely with your credit or debit card
          </RadioGroup.Description>
        </RadioGroup.Item>

        <RadioGroup.Item value="paypal">
          <RadioGroup.Title>PayPal</RadioGroup.Title>
          <RadioGroup.Description>
            Fast and secure payment with PayPal
          </RadioGroup.Description>
        </RadioGroup.Item>

        <RadioGroup.Item value="bank">
          <RadioGroup.Title>Bank Transfer</RadioGroup.Title>
          <RadioGroup.Description>
            Direct transfer from your bank account
          </RadioGroup.Description>
        </RadioGroup.Item>
      </RadioGroup>

      <SectionTitle title="Shipping Speed Example" />
      <RadioGroup
        value={shippingSpeed}
        onValueChange={setShippingSpeed}
        className="gap-4"
      >
        <Surface>
          <RadioGroup.Item value="standard">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <RadioGroup.Title>Standard Shipping</RadioGroup.Title>
                <RadioGroup.Description>
                  5-7 business days
                </RadioGroup.Description>
              </View>
              <AppText className="text-foreground font-semibold">Free</AppText>
            </View>
          </RadioGroup.Item>
        </Surface>

        <Surface>
          <RadioGroup.Item value="express">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <RadioGroup.Title>Express Shipping</RadioGroup.Title>
                <RadioGroup.Description>
                  2-3 business days
                </RadioGroup.Description>
              </View>
              <AppText className="text-foreground font-semibold">$9.99</AppText>
            </View>
          </RadioGroup.Item>
        </Surface>

        <Surface>
          <RadioGroup.Item value="overnight">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <RadioGroup.Title>Overnight Shipping</RadioGroup.Title>
                <RadioGroup.Description>
                  Next business day
                </RadioGroup.Description>
              </View>
              <AppText className="text-foreground font-semibold">
                $24.99
              </AppText>
            </View>
          </RadioGroup.Item>
        </Surface>
      </RadioGroup>

      <SectionTitle title="Inline Radio Options" />
      <RadioGroup
        value={basicSelection}
        onValueChange={setBasicSelection}
        className="self-center gap-10"
      >
        <RadioGroup.Item value="option1">
          <RadioGroup.Title>Small</RadioGroup.Title>
        </RadioGroup.Item>
        <RadioGroup.Item value="option2">
          <RadioGroup.Title>Medium</RadioGroup.Title>
        </RadioGroup.Item>
        <RadioGroup.Item value="option3">
          <RadioGroup.Title>Large</RadioGroup.Title>
        </RadioGroup.Item>
      </RadioGroup>
    </ScreenScrollView>
  );
}
