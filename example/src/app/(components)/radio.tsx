import { Radio, RadioGroup, Surface, useTheme } from 'heroui-native';
import { Check, CreditCard, Zap } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { SectionTitle } from '../../components/section-title';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function RadioScreen() {
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
  const [readOnlyState, setReadOnlyState] = React.useState('option1');

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
        <Radio value="option1">
          <Radio.Content>
            <Radio.Label>Option 1</Radio.Label>
          </Radio.Content>
        </Radio>
        <Radio value="option2">
          <Radio.Content>
            <Radio.Label>Option 2</Radio.Label>
          </Radio.Content>
        </Radio>
        <Radio value="option3">
          <Radio.Content>
            <Radio.Label>Option 3</Radio.Label>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <SectionTitle title="With Descriptions" />
      <RadioGroup
        value={withDescSelection}
        onValueChange={setWithDescSelection}
      >
        <Radio value="desc1">
          <Radio.Content>
            <Radio.Label>Standard Shipping</Radio.Label>
            <Radio.Description>
              Delivered in 5-7 business days
            </Radio.Description>
          </Radio.Content>
        </Radio>
        <Radio value="desc2">
          <Radio.Content>
            <Radio.Label>Express Shipping</Radio.Label>
            <Radio.Description>
              Delivered in 2-3 business days
            </Radio.Description>
          </Radio.Content>
        </Radio>
        <Radio value="desc3">
          <Radio.Content>
            <Radio.Label>Overnight Shipping</Radio.Label>
            <Radio.Description>Delivered next business day</Radio.Description>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <SectionTitle title="Color Variants" />
      <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
        <View className="gap-8">
          <Radio value="default" color="default">
            <Radio.Content>
              <Radio.Label>Default Color</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="success" color="success">
            <Radio.Content>
              <Radio.Label>Success Color</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="warning" color="warning">
            <Radio.Content>
              <Radio.Label>Warning Color</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="danger" color="danger">
            <Radio.Content>
              <Radio.Label>Danger Color</Radio.Label>
            </Radio.Content>
          </Radio>
        </View>
      </RadioGroup>

      <SectionTitle title="Indicator Alignment" />
      <RadioGroup
        value={alignmentSelection}
        onValueChange={setAlignmentSelection}
        className="gap-8"
      >
        <Radio value="start" alignIndicator="start">
          <Radio.Content>
            <Radio.Label>Indicator on Start (Left)</Radio.Label>
            <Radio.Description>
              The radio button appears on the left side
            </Radio.Description>
          </Radio.Content>
        </Radio>
        <Radio value="end" alignIndicator="end">
          <Radio.Content>
            <Radio.Label>Indicator on End (Right)</Radio.Label>
            <Radio.Description>
              The radio button appears on the right side (default)
            </Radio.Description>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <SectionTitle title="Disabled & Read-Only States" />
      <View className="gap-8">
        <Text className="text-sm text-muted-foreground">
          Disabled RadioGroup
        </Text>
        <RadioGroup
          value={disabledState}
          onValueChange={setDisabledState}
          isDisabled
        >
          <Radio value="option1">
            <Radio.Content>
              <Radio.Label>Disabled Option 1</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="option2">
            <Radio.Content>
              <Radio.Label>Disabled Option 2</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>

        <Text className="text-sm text-muted-foreground mt-4">
          Read-Only Options
        </Text>
        <RadioGroup value={readOnlyState} onValueChange={setReadOnlyState}>
          <Radio value="option1" isReadOnly>
            <Radio.Content>
              <Radio.Label>Read-only Option 1 (Selected)</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="option2" isReadOnly>
            <Radio.Content>
              <Radio.Label>Read-only Option 2</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>
      </View>

      <SectionTitle title="Validation & Error States" />
      <RadioGroup
        value={validationSelection}
        onValueChange={setValidationSelection}
        isInvalid={!validationSelection}
      >
        <Radio value="agree">
          <Radio.Content>
            <Radio.Label>I agree to the terms</Radio.Label>
            <Radio.Description>
              You must select this option to continue
            </Radio.Description>
          </Radio.Content>
        </Radio>
        <Radio value="disagree">
          <Radio.Content>
            <Radio.Label>I do not agree</Radio.Label>
          </Radio.Content>
        </Radio>
        <RadioGroup.ErrorMessage>
          Please select an option to continue
        </RadioGroup.ErrorMessage>
      </RadioGroup>

      <SectionTitle title="Custom Indicator Background" />
      <RadioGroup value={customIndicator} onValueChange={setCustomIndicator}>
        <Radio value="custom1">
          <Radio.Indicator
            className="w-8 h-8"
            colors={{
              selectedBorder: '#a855f7',
            }}
          >
            <Radio.IndicatorBackground>
              {customIndicator === 'custom1' && (
                <View className="absolute inset-0 rounded-full bg-purple-500" />
              )}
            </Radio.IndicatorBackground>
            <Radio.IndicatorThumb
              className="w-3.5 h-3.5"
              colors={{ selectedThumb: '#f3e8ff' }}
            />
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Label>Purple Background</Radio.Label>
          </Radio.Content>
        </Radio>

        <Radio value="custom2">
          <Radio.Indicator
            className="w-8 h-8"
            colors={{
              selectedBorder: '#3b82f6',
            }}
          >
            <Radio.IndicatorBackground
              colors={{ selectedBackground: '#3b82f6' }}
            />
            <Radio.IndicatorThumb
              className="w-3.5 h-3.5"
              colors={{ selectedThumb: '#dbeafe' }}
            />
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Label>Blue Background</Radio.Label>
          </Radio.Content>
        </Radio>

        <Radio value="custom3">
          <Radio.Indicator
            className="w-8 h-8"
            colors={{
              selectedBorder: '#10b981',
            }}
          >
            <Radio.IndicatorBackground>
              {customIndicator === 'custom3' && (
                <View className="absolute inset-0 rounded-full bg-emerald-500" />
              )}
            </Radio.IndicatorBackground>
            <Radio.IndicatorThumb
              className="w-3.5 h-3.5"
              colors={{ selectedThumb: '#d1fae5' }}
            />
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Label>Green Background</Radio.Label>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <SectionTitle title="Custom Indicator Thumb" />
      <RadioGroup value={customThumb} onValueChange={setCustomThumb}>
        <Radio value="icon">
          <Radio.Indicator>
            <Radio.IndicatorThumb>
              {customThumb === 'icon' && (
                <AnimatedView entering={FadeIn.duration(200)}>
                  <Check
                    size={12}
                    color={colors.accentForeground}
                    strokeWidth={4}
                  />
                </AnimatedView>
              )}
            </Radio.IndicatorThumb>
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Label>Checkmark Icon</Radio.Label>
          </Radio.Content>
        </Radio>

        <Radio value="zap">
          <Radio.Indicator>
            <Radio.IndicatorThumb>
              {customThumb === 'zap' && (
                <AnimatedView entering={FadeIn.duration(200)}>
                  <Zap
                    size={12}
                    color={colors.background}
                    fill={colors.background}
                  />
                </AnimatedView>
              )}
            </Radio.IndicatorThumb>
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Label>Lightning Icon</Radio.Label>
          </Radio.Content>
        </Radio>

        <Radio value="square">
          <Radio.Indicator>
            <Radio.IndicatorThumb>
              {customThumb === 'square' && (
                <AnimatedView
                  key="square"
                  entering={ZoomIn.springify().stiffness(300).damping(20)}
                  className="h-2.5 w-2.5 bg-accent-foreground"
                />
              )}
            </Radio.IndicatorThumb>
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Label>Square Thumb</Radio.Label>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <SectionTitle title="Payment Method Example" />
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <Radio value="card">
          <Radio.Content>
            <View className="flex-row items-center gap-1.5">
              <CreditCard size={16} color={colors.foreground} />
              <Radio.Label>Credit/Debit Card</Radio.Label>
            </View>
            <Radio.Description>
              Pay securely with your credit or debit card
            </Radio.Description>
          </Radio.Content>
        </Radio>

        <Radio value="paypal">
          <Radio.Content>
            <Radio.Label>PayPal</Radio.Label>
            <Radio.Description>
              Fast and secure payment with PayPal
            </Radio.Description>
          </Radio.Content>
        </Radio>

        <Radio value="bank">
          <Radio.Content>
            <Radio.Label>Bank Transfer</Radio.Label>
            <Radio.Description>
              Direct transfer from your bank account
            </Radio.Description>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <SectionTitle title="Shipping Speed Example" />
      <RadioGroup
        value={shippingSpeed}
        onValueChange={setShippingSpeed}
        className="gap-4"
      >
        <Surface>
          <Radio value="standard" alignIndicator="start">
            <Radio.Content className="flex-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Radio.Label>Standard Shipping</Radio.Label>
                  <Radio.Description>5-7 business days</Radio.Description>
                </View>
                <Text className="text-foreground font-semibold">Free</Text>
              </View>
            </Radio.Content>
          </Radio>
        </Surface>

        <Surface>
          <Radio value="express" alignIndicator="start">
            <Radio.Content className="flex-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Radio.Label>Express Shipping</Radio.Label>
                  <Radio.Description>2-3 business days</Radio.Description>
                </View>
                <Text className="text-foreground font-semibold">$9.99</Text>
              </View>
            </Radio.Content>
          </Radio>
        </Surface>

        <Surface>
          <Radio value="overnight" alignIndicator="start">
            <Radio.Content className="flex-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Radio.Label>Overnight Shipping</Radio.Label>
                  <Radio.Description>Next business day</Radio.Description>
                </View>
                <Text className="text-foreground font-semibold">$24.99</Text>
              </View>
            </Radio.Content>
          </Radio>
        </Surface>
      </RadioGroup>

      <SectionTitle title="Inline Radio Options" />
      <RadioGroup
        value={basicSelection}
        onValueChange={setBasicSelection}
        orientation="horizontal"
        className="self-center gap-10"
      >
        <Radio value="option1">
          <Radio.Content>
            <Radio.Label>Small</Radio.Label>
          </Radio.Content>
        </Radio>
        <Radio value="option2">
          <Radio.Content>
            <Radio.Label>Medium</Radio.Label>
          </Radio.Content>
        </Radio>
        <Radio value="option3">
          <Radio.Content>
            <Radio.Label>Large</Radio.Label>
          </Radio.Content>
        </Radio>
      </RadioGroup>
    </ScreenScrollView>
  );
}
